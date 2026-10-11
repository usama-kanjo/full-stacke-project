> 🔗 [[06-yol-haritasi|◀ 6. 12 Aylık Yol Haritası]] · [[PLAN-2026-10_Ekim__2027-09_Eylul-AYLIK-YOL-HARITASI|🏠 Yol Haritası]] · [[06-faz-1-altyapi|▶ 🔵 FAZ 1 — ALTYAPI: DAĞITIM + CI + TEST]]

# 🔴 FAZ 0 — ACİL GÜVENLİK (Ekim 2026, ~80 saat)

**Hedef:** Uygulamayı internete açmadan önce kapatılması zorunlu açıkları kapat.
**Başarı ölçütü:** Kullanıcı hesabı çalınabilir değil, sırlar sızmış değil, sıfırlama akışı çalışıyor.

## 0.1 Sır rotasyonu (4 saat) — İLK İŞ
| Varlık | Nerede | Aksiyon |
|--------|--------|---------|
| Neon DB şifresi | `server/.backup-env:23` | Neon panelinden rotasyon, `DATABASE_URL` güncelle |
| Gmail app password | `server/.backup-env:10-12` | Google hesabından iptal et, yenisini üret |
| `JWT_SECRET` | `server/.env:5` | 64+ karakter yeni secret, `.env` güncelle |
| MongoDB Atlas (ölü) | `server/.backup-env:24-25` | Sil (artık kullanılmıyor) |
| LAN Postgres (ölü) | `server/.backup-env:25` | Sil |
| Commit'lenmiş JWT | git geçmişi `62534bf` | Eski JWT'leri geçersiz kıl (secret rotasyonu zaten yapar) |

**Kontrol:** `server/.backup-env` dosyasını **sil**. `git log --all --diff-filter=A -- '*.env' '*.txt'` ile geçmişte başka sır var mı kontrol et.
**Çıktı:** Tüm sırlar rotasyonda, `server/.backup-env` yok.

**Durum — ✅ YAPILDI:** Neon/Gmail/`JWT_SECRET` rotasyonu yapıldı; `server/.backup-env` silindi (doğrulandı).

**Otomasyon — ✅ YAPILDI:** Sır taraması `gitleaks` ile otomatikleştirildi.
- `.gitleaks.toml` — tarama kural seti + allowlist
- `.husky/pre-commit` — commit öncesi staged tarama (`gitleaks git --staged`)
- `.github/workflows/gitleaks.yml` — CI'da tüm git geçmişi taraması
- `.gitleaksignore` — yalnızca eski `62534bf` bulgusu bastırıldı (rotasyonla geçersiz kılındı)

## 0.2 `.env.example` yaz (1 saat)
```bash
# server/.env.example
# ---- Server ----
PORT="3000"
NODE_ENV="development"

# ---- Database ----
DATABASE_URL="postgresql://user:password@localhost:5432/kanjolab?sslmode=require"

# ---- Auth / JWT ----
# Generate with: openssl rand -hex 32  (64 characters)
JWT_SECRET=""
JWT_EXPIRES_IN="15m"
JWT_REFRESH_EXPIRES_IN="30d"
JWT_COOKIE_EXPIRES="30"
COOKIE_DOMAIN=""

# ---- Email (Gmail app password) ----
EMAIL_USERNAME=""
EMAIL_PASSWORD=""
EMAIL_FROM=""
SEND_MSG_METHOD="OFFLINE"   # ONLINE | OFFLINE

# ---- App / Branding ----
COMPANY_NAME="KanjoLab"
BASE_URL="http://localhost:3000"
SUPPORT_EMAIL="support@kanjolab.com"

# ---- CORS (comma-separated) ----
CORS_ORIGINS="http://localhost:3000,http://localhost:3001"

# ---- S3 / Dosya depolama (Faz 8) ----
S3_ENDPOINT=""
S3_BUCKET=""
S3_ACCESS_KEY_ID=""
S3_SECRET_ACCESS_KEY=""

# ---- Sentry (Faz 2) ----
SENTRY_DSN=""
```

**Durum — ✅ YAPILDI:** `server/.env.example` yazıldı (S3/Sentry placeholder dahil).

## 0.3 Forgot-password akışını düzelt (2 saat)
`client/src/components/organisms/AuthModal/AuthModal.tsx:97-113` — servis hiç çağrılmıyor.

```ts
const handleForgotPassword = useCallback(
  async (data: { email: string }) => {
    setIsLoading(true);
    try {
      await authService.forgotPassword({ email: data.email });
      setSharedEmail(data.email);
      navigate("reset-password");
      toast.success(t("auth.forgot.success"));
    } catch (err) {
      toast.error(err instanceof Error ? err.message : t("common.error"));
    } finally {
      setIsLoading(false);
    }
  },
  [navigate, t],
);
```

**Kabul kriteri:** Gerçek bir email ile `forgot-password` → email geliyor → kod giriliyor → yeni parola ile giriş yapılabiliyor.
**Not:** `AuthModal.tsx:119`'daki dinamik `import()`'ı da statik import'a çevir (P2-8).

## 0.4 Rate limiting (8 saat)
`express-rate-limit` kur, `server/src/middlewares/rateLimitMiddleware.ts` oluştur.

| Endpoint | Limit | Neden |
|----------|-------|-------|
| `POST /user/login` | 5 / 15dk / IP | Kaba kuvvet parola |
| `POST /user/register` | 3 / saat / IP | Toplu hesap açma |
| `POST /user/verify-email` | 10 / 15dk / IP | Kod tahmini |
| `POST /user/resend-code` | 3 / saat / e-posta | E-posta bombalama |
| `POST /user/forgot-password` | 3 / saat / e-posta | E-posta bombalama |
| `POST /user/reset-password` | 5 / 15dk / IP | Kod tahmini |
| Genel (tüm API) | 300 / 15dk / IP | Genel koruma |

**Kabul kriteri:** 6. login denemesinde 429 döner. Test yazılıyor.

## 0.5 Güvenli rastgelelik + kod hash'leme (8 saat)
**a) `server/src/utils/crypto.ts` oluştur:**
```ts
import { randomInt, createHash } from "node:crypto";

export function generateSecureCode(length = 6): string {
  const max = 10 ** length;
  return randomInt(0, max).toString().padStart(length, "0");
}

export function hashCode(code: string): string {
  return createHash("sha256").update(code).digest("hex");
}
```

**b) `emailService.ts:18`** → `generateSecureCode()` kullan
**c) `authService.ts`** → `emailVerificationCode` ve `passwordResetCode` alanlarına `hashCode()` yaz, karşılaştırma `timingSafeEqual` ile

**d) Deneme sayacı:** `User` modeline `emailVerificationAttempts Int @default(0)` ve `passwordResetAttempts Int @default(0)` ekle. 5 hatalı denemeden sonra kodu geçersizleştir.

**e) Migration:** `add_secure_codes` — yeni alanlar + eski düz metin kodları temizle

**Kabul kriteri:** 5 hatalı kod denemesinden sonra 6. deneme "kod geçersiz" hatası verir, doğru kod da çalışmaz (yeniden isteme zorlar).

## 0.6 JWT: kısa ömür + refresh token (12 saat)
```ts
// config/jwt.ts
export const jwtConfig = {
  accessTokenExpires: process.env.JWT_EXPIRES_IN ?? "15m",      // 90d -> 15m
  refreshTokenExpires: process.env.JWT_REFRESH_EXPIRES_IN ?? "30d",
  cookieExpiresDays: Number(process.env.JWT_COOKIE_EXPIRES ?? 30),
};
```

**Yeni endpoint'ler:**

| Method | Yol | Açıklama |
|--------|-----|----------|
| `POST` | `/api/v1/user/refresh` | Access token yeniler |
| `POST` | `/api/v1/user/logout-all` | Tüm oturumları kapatır |

**Refresh token:** `validTokens` kolonuna hash'lenmiş refresh token listesi yaz. `maxActiveSessions` (3) kontrolü ile sınırla. Mevcut kolonlar kullanılacak (P2-10 çözülür).

**`sessionService.ts` oluştur** — cookie oluşturma mantığını 3 gözden kaldır:
```ts
// services/sessionService.ts
export function setAuthCookies(res: Response, accessToken: string, refreshToken: string) { ... }
export function clearAuthCookies(res: Response) { ... }  // ESKİ clearCookie DÜZELTMESİ
```

**`clearAuthCookies` P0-10 fix'i:**
```ts
res.clearCookie("token", {
  httpOnly: true,
  secure: isProduction,
  sameSite: "lax",
  path: "/",
  ...(isProduction && { domain: cookieDomain }),
});
```
> `clearCookie` eşleşen option'ları şart. Şu an verilmediği için prod'da token kalıyor.

**Kabul kriteri:** 16 dakika sonra API 401 döner, `refresh` ile yeni token alır, oturum sürer. Logout sonrası cookie gerçekten silinir.

## 0.7 `authorize()` rol middleware'i (6 saat) — **Order öncesi şart**
```ts
// middlewares/authMiddleware.ts
export function authorize(...allowedRoles: Role[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      next(new ApiError("Authentication required", 401));
      return;
    }
    if (!allowedRoles.includes(req.user.role as Role)) {
      next(new ApiError("You do not have permission for this action", 403));
      return;
    }
    next();
  };
}
```

**Uygulama:**
```ts
// routes/v1/dentistRoute.ts
router.get("/profile", protect, authorize("DENTIST"), dentistController.getProfile);
router.put("/profile", protect, authorize("DENTIST"), updateDentistValidator, dentistController.updateProfile);
```

**JWT payload'a `role` ekle.** (Şu an sadece `{id, email, isVerified}` var — `schema.prisma:26` `role` nullable olduğu için, tamamlanmamış profile `null` gelir, `protect` bunu 403 vermeli.)

**Kabul kriteri:** `LAB_TECHNICIAN` token'ıyla `GET /dentist/profile` → 403 (şu an 404, şimdi bilinçli olarak 403 olmalı). Profil tamamlanmamış kullanıcı → 403 "complete your profile".

## 0.8 Ek güvenlik sertleştirmeleri (8 saat)
| İş | Dosya | Detay |
|----|-------|-------|
| `helmet` kur | `index.ts` | CSP, HSTS, `X-Frame-Options` |
| `x-powered-by` kapat | `index.ts` | `app.disable("x-powered-by")` |
| `trust proxy` | `index.ts` | `app.set("trust proxy", 1)` |
| CORS env'den | `index.ts:19` | `CORS_ORIGINS` virgülle ayrılmış liste |
| CORS `maxAge` | `index.ts` | 86400 (preflight cache) |
| `softProtect` boş catch fix | `authMiddleware.ts:82` | `catch` yerine explicit 401 |
| Prisma hata eşleme | `errorMiddleware.ts` | P2002→409, P2025→404, P2003→400 |
| Body limit | `index.ts` | `express.json({ limit: "100kb" })` |
| Doğrulama: 3 endpoint | `userValidator.ts` | `verify-email`, `PUT /dentist/profile`, `PUT /technician/profile` |
| Maksimum uzunluk | `userValidator.ts` | Tüm string alanlara `isLength({ max })` |
| E-posta HTML kaçış | `emailService.ts` | `escapeHtml(userName)` |
| Kullanılmayan dep sil | `package.json` | `date-fns`, `slugify`, `@prisma/client` |
| `start` script düzelt | `package.json:11` | `npm` → `yarn` |
| `prisma/seed.ts` yaz | `server/prisma/seed.ts` | Kırık `db:seed` script'i |
| 9 dağınık `console.log` | `services/*.ts` | Tek logger modülü |

**Ek (✅ YAPILDI) — `gitleaks` sır taraması:**

| İş | Dosya | Detay |
|----|-------|-------|
| `gitleaks` kur + config | `.gitleaks.toml` | Tarama kural seti + allowlist |
| Pre-commit hook | `.husky/pre-commit` | `gitleaks git --staged` (commit'i engeller) |
| CI taraması | `.github/workflows/gitleaks.yml` | Tüm geçmiş, push/PR'da |
| Legacy bastırma | `.gitleaksignore` | Yalnızca eski `62534bf` JWT bulgusu |

**Faz 0 çıktısı:** 11 P0 maddesi tamamı, P1-2, P1-3, P1-10, P2-12, P2-16, P2-17 çözülmüş.

## Ay 1 kontrol listesi
- [x] Tüm sırlar rotasyonda
- [x] `server/.backup-env` silindi
- [x] `.env.example` yazıldı
- [x] `gitleaks` kuruldu (pre-commit + CI), sır taraması aktif
- [ ] Forgot-password uçtan uca test edildi
- [ ] Rate limit testleri yazıldı ve geçiyor
- [ ] 6 haneli kod artık hash'li, `crypto.randomInt` ile üretiliyor
- [ ] Kod deneme limiti çalışıyor
- [ ] Access token 15dk, refresh 30gün
- [ ] Logout cookie'yi gerçekten siliyor
- [ ] `authorize()` çalışıyor, 403 dönüyor
- [ ] `helmet` + CORS env + trust proxy
- [ ] **Bu ay bitmeden 2. aya geçme**

---

> 🔗 [[06-yol-haritasi|◀ 6. 12 Aylık Yol Haritası]] · [[PLAN-2026-10_Ekim__2027-09_Eylul-AYLIK-YOL-HARITASI|🏠 Yol Haritası]] · [[06-faz-1-altyapi|▶ 🔵 FAZ 1 — ALTYAPI: DAĞITIM + CI + TEST]]
