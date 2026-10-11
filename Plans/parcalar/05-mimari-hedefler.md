> 🔗 [[04-urun-tanimi-ve-kapsam|◀ 4. Ürün Tanımı ve Kapsam]] · [[PLAN-2026-10_Ekim__2027-09_Eylul-AYLIK-YOL-HARITASI|🏠 Yol Haritası]] · [[06-yol-haritasi|▶ 6. 12 Aylık Yol Haritası]]

# 5. Mimari Hedefler

## 5.1 Frontend hedef yapısı

```
client/src/
├── app/
│   ├── [locale]/                    # next-intl locale segmenti
│   │   ├── layout.tsx
│   │   ├── page.tsx                  # /
│   │   ├── error.tsx
│   │   ├── not-found.tsx
│   │   ├── loading.tsx
│   │   └── dashboard/
│   │       ├── layout.tsx            # server-side koruma
│   │       ├── loading.tsx
│   │       ├── error.tsx
│   │       ├── page.tsx              # /[locale]/dashboard
│   │       ├── orders/
│   │       │   ├── page.tsx          # liste
│   │       │   ├── loading.tsx
│   │       │   ├── new/page.tsx      # oluştur
│   │       │   └── [id]/
│   │       │       ├── page.tsx      # detay
│   │       │       └── loading.tsx
│   │       ├── profile/page.tsx
│   │       └── settings/page.tsx
│   └── middleware.ts                 # locale + auth yönlendirme
├── components/
│   └── ui/                           # düz component'ler (atoms+molecules birleşik)
│       ├── Button/  Input/  Modal/  Card/  Badge/  Icon/ ...
├── features/
│   ├── auth/                         # LoginForm, RegisterForm, ...
│   ├── orders/                       # OrderList, OrderForm, OrderDetail, StatusBoard
│   ├── profile/
│   └── settings/
├── hooks/                            # useAuth, useForm, useOrders, useDebounce
├── lib/                              # api.ts, queryClient.ts, utils.ts
├── services/                         # authService, orderService, profileService
├── schemas/                          # zod şemaları
├── messages/                         # ar.json, en.json (i18n)
├── tokens/                           # design tokens (tek kaynak)
└── types/
```

**Geçiş notu:** `atoms/` → `molecules/` → `organisms/` yapısı `components/ui` + `features/*` altına taşınacak. Bir yarım günlük refactor (Ay 3, Faz 2a).

## 5.2 Backend hedef yapısı

```
server/src/
├── index.ts                          # yalnızca bootstrap
├── app.ts                            # express app kurulumu (test edilebilir)
├── config/
│   ├── env.ts                        # doğrulanmış env şeması
│   ├── database.ts
│   └── jwt.ts
├── controllers/                      # ince: HTTP giriş/çıkış
│   ├── authController.ts
│   ├── orderController.ts            # YENİ
│   ├── uploadController.ts           # YENİ
│   └── ...
├── middlewares/
│   ├── authMiddleware.ts             # protect, softProtect, authorize
│   ├── errorMiddleware.ts
│   ├── rateLimitMiddleware.ts        # YENİ
│   ├── validatorMiddleware.ts
│   ├── requestLogger.ts              # YENİ
│   └── uploadMiddleware.ts           # YENİ
├── routes/v1/
│   ├── index.ts                      # YENİ - router toplayıcı
│   ├── userRoute.ts
│   ├── orderRoute.ts                 # YENİ
│   ├── uploadRoute.ts                # YENİ
│   ├── dentistRoute.ts
│   └── technicianRoute.ts
├── services/
│   ├── authService.ts
│   ├── orderService.ts               # YENİ
│   ├── uploadService.ts              # YENİ
│   ├── notificationService.ts        # YENİ - e-posta bildirimleri
│   ├── auditService.ts               # YENİ
│   └── ...
├── validators/
│   ├── userValidator.ts
│   ├── orderValidator.ts             # YENİ
│   └── ...
├── utils/
│   ├── apiError.ts
│   ├── crypto.ts                     # YENİ - güvenli rastgelelik
│   └── password.ts                   # YENİ - merkezi bcrypt round
└── types/
```

**Kritik kural:** Controller'da iş mantığı **yasak**. Cookie oluşturma da controller'da kalmayacak (şu an 3 yerde tekrar ediyor) — `sessionService` taşınacak.

## 5.3 Güvenlik modeli (Faz 0 sonrası hedef)

```
İstek gelir
  → helmet (güvenlik header'ları)
  → cors (env'den izinli origin listesi)
  → requestLogger (request ID + süre)
  → rateLimit (endpoint bazlı: login 5/dk, verify 3/dk, forgot 3/dk, genel 100/dk)
  → express.json (limit: 100kb)
  → validator (gövde doğrulama)
  → protect (JWT: httpOnly cookie veya Bearer)
  → authorize('DENTIST') (rol kontrolü — endpoint bazlı)
  → ownership kontrolü (servis katmanında: where: { dentistId: req.user.dentistId })
  → controller (yalnızca HTTP)
  → servis (iş mantığı + sahiplik doğrulaması)
  → errorHandler (tek nokta, gizli hata)
```

**Kural:** Sahiplik kontrolü **servis** katmanında, `where` ifadesinin içinde. IDOR'a karşı tek savunma hattı bu.

**Token stratejisi (Faz 0):**

| Token | Süre | Nerede | Amaç |
|-------|------|--------|------|
| Access token | 15 dakika | httpOnly cookie | API çağrıları |
| Refresh token | 30 gün | httpOnly cookie, `validTokens` DB'de | Oturum uzatma |
| `maxActiveSessions` | 3 | DB (mevcut kolon) | Eşzamanlı oturum sınırı |

Eski `validTokens` ve `maxActiveSessions` kolonları Faz 0'da devreye alınacak — zaten migration'da var.

## 5.4 RTL ve i18n mimarisi

**Karar:** Arap pazar birincil → RTL **temel karar**, sonradan eklenen özellik değil.

**Kurallar:**

1. **CSS'te fiziksel özellik yasak.** Sadece mantıksal:
   ```css
   /* YANLIŞ */ margin-left: 16px; text-align: left; left: 0;
   /* DOĞRU  */ margin-inline-start: 16px; text-align: start; inset-inline-start: 0;
   ```
2. **Yönlendirmeler `dir` ile:** `transform: translateX(...)` yerine `translateX(calc(var(--dir) * 1rem))` veya `[dir="rtl"]` varyantı
3. **Sayı/para birimi:** `Intl.NumberFormat` ve `Intl.DateTimeFormat` ile locale'e göre
4. **Tarih:** ISO 8601 sakla, gösterimde `Intl` kullan — asla elle ayrıştırma
5. **Font:** Arapça **gövde** fontu şart (Lalezar sadece display)
6. **Test:** Her ekran `dir="rtl"` altında kontrol edilmeli

**Font önerisi:** `IBM Plex Sans Arabic` (gövde, 400/500/600/700) + `Lalezar` (display, mevcut) + `Sora`/`Inter` (Latin gövde). `next/font` ile alt küme + sıfır layout shift.

**Çoklu para birimi:** `Order.currency` nullable yapılacak, kullanıcı profiline `preferredCurrency` eklenecek. MVP'de: AED, SAR, EGP, USD, TRY.

## 5.5 Deployment mimarisi

```
                    ┌─────────────────────────┐
                    │   Cloudflare (ücretsiz) │  DNS + CDN + SSL + DDoS
                    └───────────┬─────────────┘
                                │ HTTPS
                    ┌───────────▼─────────────┐
   [GitHub push] →  │   Hetzner/DigitalOcean   │
                    │   ┌───────────────────┐  │
                    │   │ nginx (reverse)   │  │  :80/:443
                    │   │ + certbot (SSL)   │  │
                    │   ├───────────────────┤  │
                    │   │ app container     │  │  Node.js
                    │   │ (Next.js :3001)   │  │
                    │   ├───────────────────┤  │
                    │   │ api container     │  │  Express
                    │   │ (Node :3000)      │  │
                    │   └───────────────────┘  │
                    └───────────┬─────────────┘
                                │ DATABASE_URL
                    ┌───────────▼─────────────┐
                    │  Neon / Supabase (PG)   │  otomatik yedek
                    └─────────────────────────┘
                                │
                    ┌───────────▼─────────────┐
                    │  S3 / R2 (Cloudflare)   │  dosya depolama
                    └─────────────────────────┘
```

**Neden managed Postgres:** Yedekleme, failover, sürüm yükseltme tek başına 1 ay yer. Neon zaten `.backup-env`'de kullanılmış, comfort zone içinde. Aylık ~$20.

**Neden Cloudflare:** Ücretsiz SSL, CDN, temel DDoS koruması, DNS. Tek başına en yüksek getirili karar.

**Ops kuralı (timebox):** nginx + SSL + Docker setup için **maksimum 1 hafta**. Bitmezse Vercel'e geç. Bu iş kolay görünüyor ama 3 hafta yiyor — tek başına en büyük tuzak.

## 5.6 CI/CD hedefi

```
git push / PR aç
  → yarn install --frozen-lockfile
  → client: typecheck && lint && test && build
  → server: typecheck && lint && test
  → docker build (her ikisi)
  → main'e merge olursa: deploy staging
  → staging smoke test
  → manuel onay → production deploy
  → health check + Sentry doğrulama
```

Zorunlu: **PR'da yeşil olmadan merge yok.** Bunu branch protection ile ayarla.

---

> 🔗 [[04-urun-tanimi-ve-kapsam|◀ 4. Ürün Tanımı ve Kapsam]] · [[PLAN-2026-10_Ekim__2027-09_Eylul-AYLIK-YOL-HARITASI|🏠 Yol Haritası]] · [[06-yol-haritasi|▶ 6. 12 Aylık Yol Haritası]]
