# KanjoLab — 12 Aylık Yol Haritası

**Dönem:** 1 Ekim 2026 → 30 Eylül 2027
**Hazırlayan:** Usama (tek geliştirici, haftada 20-30 saat)
**Plan versiyonu:** 1.0
**Başlangıç branch'i:** `refactor/frontend-rewrite`
**Hedef pazar:** Orta Doğu / Arap ülkeleri (Arapça + İngilizce, RTL zorunlu)
**Hedef altyapı:** Docker + VPS (Hetzner/DigitalOcean) + Managed PostgreSQL

---

## İçindekiler

| # | Bölüm | Açıklama |
|---|-------|----------|
| 0 | [Bu Doküman Nasıl Kullanılır](#0-bu-doküman-nasıl-kullanılır) | Kurallar, güncelleme protokolü |
| 1 | [Yönetici Özeti](#1-yönetici-özeti) | Tek sayfa özet |
| 2 | [Başlangıç Noktası Analizi](#2-başlangıç-noktası-analizi) | Mevcut durum envanteri |
| 3 | [Kritik Açıklar Listesi](#3-kritik-açıklar-listesi) | P0/P1/P2 toplu liste |
| 4 | [Ürün Tanımı ve Kapsam](#4-ürün-tanımı-ve-kapsam) | Ne in/out |
| 5 | [Mimari Hedefler](#5-mimari-hedefler) | Frontend/backend/güvenlik/RTL/deploy |
| 6 | [12 Aylık Yol Haritası](#6-12-aylık-yol-haritası) | Ana bölüm — ay ay detay |
| 7 | [Riskler ve Azaltma Planı](#7-riskler-ve-azaltma-planı) | Risk kaydı |
| 8 | [Definition of Done](#8-definition-of-done) | "Bitti" tanımı |
| 9 | [Çalışma Ritüeli](#9-çalışma-ritüeli) | Haftalık/aylık rutin |
| 10 | [Karar Kaydı (ADR)](#10-karar-kaydı-adr) | Değişmez kararlar |
| 11 | [Ekler](#11-ekler) | Kontrol listeleri, kaynaklar |

---

## 0. Bu Doküman Nasıl Kullanılır

### Temel prensip
Bu doküman **yol haritasıdır, sözleşme değildir.** Gerçek veriler her zaman gerçeği yener. Her ay sonunda sapma varsa bu doküman güncellenir.

### Güncelleme protokolü
| Tetikleyici | Aksiyon |
|-------------|---------|
| Bir ayın işleri bitti | O ay bölümüne "Tamamlandı" damgası + sapma notu |
| Kapsam değişikliği kararı | "Kapsam Kararları" bölümüne ekle, gerekçe yaz |
| Yeni risk doğdu | Bölüm 7'ye risk + azaltma ekle |
| Plan revizyonu | Versiyon numarasını artır, değişiklik geçmişine yaz |

### Kurallar
1. **Faz 0 ve Faz 1 asla ertelenmez.** Bunlar "yaygın sürmek" değil, "var olmak" içindir.
2. **Faz 3 (Order Management) yoksa proje tamamlanmamış sayılır.** Diğer her şey bunun etrafında süs.
3. **Aylık saat bütçesi aşılmaz.** Taşma = kapsam kes, kapsam genişletme = erteleme.
4. **Her ay sonunda 1 gün ay sonu / planlama günü ayrılır.**

### Zaman çizelgesi özeti

```
2026                                    2027
Eki Kas Ara Oca Şub Mar May Haz Tem Ağu Eyl
 |   |   |   |   |   |   |   |   |   |   |
 F0  F1  F2a F2b F3a F3b F3c F4  F5  F6  F7
 └─80┘└70┘└─60──────────┘└────280────┘└80┘└70┘└160┘└80┘
 ▲                                                                  
 Acil     Temel    ÜRÜN      Dosya   Mobil   Sıkılaş.  Lans
```

---

## 1. Yönetici Özeti

### Durum tek cümleyle
**Kod kalitesi çok iyi, ama ürünün kendisi henüz yok.**

### İyi haberler
- Frontend'de `0` tane `any`, `0` `@ts-ignore`, `0` `console.log`, `0` TODO
- Tüm CSS renkleri design token'dan geliyor, hardcoded renk sayısı **0**
- TypeScript `strict: true` ve gerçekten uyuluyor
- 13 server endpoint'in **13'ünün** de client karşılığı var — API sürüklemesi yok
- Kullanılmayan runtime dependency: **0**
- Auth akışı (register → verify → profile → login) uçtan uca çalışıyor
- 31 component, 29'unda Storybook story var
- Vercel React best practices uygulanmış

### Kötü haberler
- **Order Management %0** — Prisma'da model var, sunucuda **hiçbir endpoint yok**, client'ta **hiçbir UI yok**
- Sidebar'daki `/dashboard/orders` linki **404'e gidiyor**
- **Test: 0.** Ne client'ta ne server'da test framework yok
- **CI: yok.** Tek workflow bir AI yorum botu, build/lint/test çalıştırmıyor
- **Deployment: yok.** Dockerfile yok, hiçbir platform tanımı yok
- **Responsive: yok.** 2.161 satır CSS'te **tek bir `@media` sorgusu yok**
- **Rate limit yok, helmet yok, role kontrolü yok**
- Doğrudan `localhost` dışında hiç çalışmadı

### En kritik 3 tespit
1. **Şifreler sızdı** — `server/.backup-env` içinde canlı Neon DB şifresi, canlı Gmail app password, JWT secret düz metin. Ayrıca git geçmişinde commit edilmiş bir JWT var.
2. **Parola sıfırlama tamamen çalışmıyor** — servis hiç çağrılmıyor, kullanıcıya "kod gönderildi" yalanı söyleniyor.
3. **Hesap çalma kapısı açık** — 6 haneli kod, sınırlamasız deneme, `Math.random()`, kodlar düz metin saklanıyor.

### Strateji
> **Önce var ol (güvenlik + deploy + test), sonra büyü (order yönetimi), sonra parlat (mobil, i18n, lansman).**

12 aylık toplam bütçe: **~880 saat** (brüt kapasite ~1.300 saat, efektif kullanım ~%65 → 850 saat). **Tampon yok.** Bu yüzden Faz 0 ve Faz 1 ertelenemez.

---

## 2. Başlangıç Noktası Analizi

### 2.1 Mevcut envanter

#### Sunucu (13 endpoint, Express 5 + Prisma 7 + PostgreSQL)
| Alan | Durum | Not |
|------|-------|-----|
| Kimlik doğrulama | ✅ Tam | register, login, verify, resend, logout, forgot, reset, change |
| Profil tamamlama | ✅ Tam | Dentist / Technician, Prisma transaction |
| Profil CRUD | ✅ Tam | dentist + technician, GET/PUT |
| Validasyon | ⚠️ Eksik | 3 endpoint validasyonsuz |
| Rate limiting | ❌ Yok | 13 endpoint'in hiçbirinde yok |
| Security header | ❌ Yok | helmet kurulu değil |
| Loglama | ❌ Yok | morgan/pole yok, 9 adet dağınık console.log |
| Health check | ❌ Yok | `/health` endpoint'i yok |
| Graceful shutdown | ⚠️ Yarım | Sadece unhandledRejection; SIGTERM yok, $disconnect yok |
| Test | ❌ Yok | Manuel smoke script, assertion yok, CI'da çalışmaz |
| Docker | ❌ Yok | Dockerfile, compose yok |
| CI | ❌ Yok | build/lint/test yok |
| Order API | ❌ Yok | Model var, endpoint yok |

#### İstemci (31 component, Next.js 16 + React 19)
| Alan | Durum | Not |
|------|-------|-----|
| Atom | ✅ 7/7 | Button, Badge, Input, Label, Icon, Spinner, Typography |
| Molecule | ✅ 10/10 | FormField, PasswordInput, Card, Avatar, Toast, Modal, Tabs, Dropdown, Checkbox, Toggle |
| Organism | ✅ 12/12 | AuthModal + 5 form, Header, Sidebar, DashboardHome, DashboardProfile, DashboardSettings |
| Template | ✅ 2/2 | AuthTemplate, DashboardTemplate |
| Route | ⚠️ 4 route | `/`, `/dashboard`, `/dashboard/profile`, `/dashboard/settings` |
| Middleware | ❌ Yok | `middleware.ts` yok — route koruması yok |
| Loading/Error UI | ❌ Yok | `loading.tsx`, `error.tsx`, `not-found.tsx` yok |
| Test | ❌ Yok | Vitest/RTL/Jest yok, 0 test dosyası |
| Responsive | ❌ Yok | 0 `@media` sorgusu |
| i18n | ❌ Yok | next-intl yok, metinler İngilizce gömülü |
| RTL | ❌ Yok | `dir` yok, 34 fiziksel CSS özelliği |
| Ölü component | ⚠️ 7 tane | Avatar, Card, Checkbox, Dropdown, Tabs, Toast, Toggle — sadece Storybook'dan erişilebilir |

#### Veritabanı
| Model | Durum | Not |
|-------|-------|-----|
| `User` | ✅ | 12 alan, 2 index, email unique |
| `Dentist` | ✅ | 8 alan, 1:1 User |
| `Technician` | ✅ | 9 alan, `specialties String[]` |
| `Order` | ⚠️ Model var, kullanım yok | 13 alan, 3 index — **hiç kullanılmıyor** |
| Enum `Role` | ✅ | DENTIST, LAB_TECHNICIAN |
| Enum `OrderStatus` | ⚠️ Model var, kullanım yok | PENDING, IN_PROGRESS, COMPLETED, CANCELLED |

**8 migration var**, `add_token_management` migration'ı `maxActiveSessions` ve `validTokens` eklemiş ama **bunlar `schema.prisma`'da yok ve kodda hiç kullanılmıyor.** Faz 0'da devreye alınacak.

### 2.2 Sağlamlık derecelendirmesi

| Alan | Not | Yön |
|------|-----|-----|
| Kod hijyeni (frontend) | A | ↑ |
| API sözleşmesi tutarlılığı | A− | = |
| Katmanlı mimari (backend) | B | ↑ |
| Doğrulama kapsamı (backend) | C | ↑ |
| Yetkilendirme (authorization) | F | ↑ |
| Hata yönetimi & gözlemlenebilirlik | F | ↑ |
| Test kapsamı | F | ↑ |
| CI/CD | F | ↑ |
| Dağıtım hazırlığı | F | ↑ |
| Mobil/duyarlı tasarım | F | ↑ |
| Erişilebilirlik (a11y) | D | ↑ |
| Uluslararasılaşma (i18n/RTL) | F | ↑ |

**A → F gradyanı, kod hijyeninin A olması diğerlerini kurtarmıyor.** Güvenlik ve teslim altyapısı en zayıf halka ve en pahalı hata.

---

## 3. Kritik Açıklar Listesi

### P0 — Yayın engeli (herhangi birine dokunmadan önce çözülmeli)

| # | Sorun | Konum | Etki |
|---|-------|-------|------|
| P0-1 | Canlı Neon DB şifresi, Gmail app password, JWT secret düz metin dosyada | `server/.backup-env:6,10-12,23` | Tam ele geçirme |
| P0-2 | Commit edilmiş JWT (geçmişte) | `git 62534bf` → `server/scripts/token.txt` | Oturum ele geçirme |
| P0-3 | Forgot-password servisi hiç çağrılmıyor | `client/src/components/organisms/AuthModal/AuthModal.tsx:97-113` | Kullanıcı şifre sıfırlayamıyor |
| P0-4 | Rate limit yok (login, verify, forgot, resend) | `server/src/index.ts:23-35` | Hesap çalma, e-posta bombalama |
| P0-5 | 6 haneli kod `Math.random()` ile üretiliyor | `server/src/services/emailService.ts:18` | Kod tahmin edilebilir |
| P0-6 | Kodlar düz metin DB'de | `schema.prisma:30,35` | DB sızıntısı = tüm hesaplar |
| P0-7 | Kod deneme limiti yok, hatalı denemede geçersizleşmiyor | `authService.ts:83-89, 284-289` | 1M kombinasyon deneme |
| P0-8 | JWT 90 gün, refresh/iptal yok | `config/jwt.ts:5` | Uzun ömürlü ele geçirilebilir token |
| P0-9 | `authorize()` rol kontrolü yok | `server/src/middlewares/authMiddleware.ts` | Order yazılınca IDOR riski |
| P0-10 | `logout` cookie'yi temizlemiyor | `server/src/services/authService.ts:211-222` | Çıkış yapınca oturum açık kalıyor |
| P0-11 | Doğrulama limiti yok + CSRF/CORS env'siz | `server/src/index.ts:19` | CORS kırık, korumasız |

### P1 — Yüksek (ilk 2 ayda)

| # | Sorun | Konum | Etki |
|---|-------|-------|------|
| P1-1 | `middleware.ts` yok, session yenilenemiyor | `client/src/app/dashboard/page.tsx:18-27` | Sayfa yenileyince oturum düşer, UI flash eder |
| P1-2 | `verify-email` validasyonsuz | `server/src/routes/v1/userRoute.ts:20` | Tip kontrolü yok |
| P1-3 | `PUT /dentist/profile` ve `PUT /technician/profile` validasyonsuz | `dentistRoute.ts:10`, `technicianRoute.ts:10` | Sınırsız uzunluk, veri kirliliği |
| P1-4 | Axios interceptor HTTP status'u siliyor | `client/src/lib/api.ts:9-15` | 401/403/404 ayırt edilemiyor |
| P1-5 | DashboardSettings 6 karakter istiyor, sunucu 8+büyükharf+rakam | `DashboardSettings.tsx:28-31,91` | Garanti 422 hatası |
| P1-6 | `updateProfile` dönüş tipi `user` içeriyor, sunucu döndürmüyor | `authService.ts:34-42` vs `dentistService.ts:48-57` | Kayıt sonrası profil bozuluyor |
| P1-7 | 0 test, 0 CI | tüm repo | Regresyon bulunamıyor |
| P1-8 | 0 `@media` sorgusu | tüm `.module.css` | Mobilde kullanılamaz |
| P1-9 | `/dashboard/orders` 404 | `Sidebar.tsx:18-19,26` | Kullanıcı ölü linke tıklıyor |
| P1-10 | `softProtect` boş catch → 500 | `authMiddleware.ts:82` | 401 yerine 500 |
| P1-11 | `specialties` API ile güncellenemiyor | `technicianService.ts:37-68` | Profil eksik kalıyor |
| P1-12 | Para birimi `TRY` sabit | `schema.prisma:106` | Arap pazarı için yanlış |

### P2 — Orta (3-6. ay)

| # | Sorun | Konum | Etki |
|---|-------|-------|------|
| P2-1 | 7 ölü component (~700 satır) | `molecules/{Avatar,Card,Checkbox,Dropdown,Tabs,Toast,Toggle}` | Bakım yükü |
| P2-2 | Ölü token TS dosyaları, `tokens.css` ile çakışıyor | `client/src/tokens/*.ts` | Sessiz kayma |
| P2-3 | `components/index.ts` 2 component'i atlıyor | `client/src/components/index.ts:20-29` | Barrel yalan söylüyor |
| P2-4 | `declare module "*.css"` tüm tip güvenliğini kapatıyor | `client/src/types/css.d.ts:1` | CSS module typo yakalanmıyor |
| P2-5 | Boş `templates/MainLayout/` klasörü | — | Ölü kod |
| P2-6 | Storybook `@storybook/react` import ediyor, dependency değil | `.storybook/preview.ts:1` | Phantom dependency |
| P2-7 | Storybook 3 hex'i token'dan okumuyor | `.storybook/preview.ts:10-12` | Kayma riski |
| P2-8 | `useCallback` içinde dinamik `import()` | `AuthModal.tsx:119` | Bundle analizi kaybı |
| P2-9 | Profil tamamlama modalı kapatılamıyor | `app/dashboard/page.tsx:55` | `onClose={() => {}}` |
| P2-10 | `maxActiveSessions` / `validTokens` DB'de ama kodda yok | migration 8 | Ölü kolon |
| P2-11 | `prisma/seed.ts` yok, `db:seed` script'i kırık | `server/package.json:22` | Script hata verir |
| P2-12 | Prisma hataları 500 dönüyor, P2002 eşlenmiyor | `errorMiddleware.ts` | Bilgi sızıntısı |
| P2-13 | `trust proxy` ayarlanmamış | `server/src/index.ts` | Reverse proxy arkasında yanlış IP |
| P2-14 | Root'ta `test` script'i yok | `package.json:10-16` | `yarn test` çalışmıyor |
| P2-15 | Client'ta `typecheck` script'i yok | `client/package.json` | Manuel `tsc` gerekli |
| P2-16 | Kullanılmayan sunucu dependency: `date-fns`, `slugify`, `@prisma/client` | `server/package.json` | Bundle şişkinliği |
| P2-17 | `start` script'i `npm` kullanıyor | `server/package.json:11` | yarn-only kuralına aykırı |
| P2-18 | A11y denetimi yapılmamış | tüm component'ler | Erişilebilirlik |

---

## 4. Ürün Tanımı ve Kapsam

### 4.1 Ürün tek cümle
**Diş hekimleri ile diş laboratuvarı teknisyenleri arasında protez/diş işi siparişlerini dijitalleştiren yönetim platformu.**

### 4.2 Kullanıcı rolleri ve yolculukları

#### DENTIST (Diş Hekimi)
```
Kayıt → E-posta doğrulama → Profil (klinik adı, adres, şehir)
   ↓
Sipariş oluştur (hasta adı, diş no, iş tipi, renk gölgesi, aciliyet, deadline, fiyat, fotoğraf)
   ↓
Sipariş listesi → durumu takip et → teknisyene ata
   ↓
Hazır olduğunda bildirim al → teslim al
   ↓
Profil güncelle / şifre değiştir
```

#### LAB_TECHNICIAN (Diş Teknisyeni)
```
Kayıt → E-posta doğrulama → Profil (laboratuvar adı, uzmanlıklar)
   ↓
Bana atanan siparişler (dashboard) → kabul et / başla
   ↓
Durum güncelle (IN_PROGRESS → COMPLETED)
   ↓
Profil güncelle / şifre değiştir
```

### 4.3 MVP kapsamı (Lansman sürümü — Ay 12 sonunda)

**Dahil (MUST):**
- [x] Kayıt / giriş / e-posta doğrulama / parola sıfırlama
- [x] Rol seçimi ile profil tamamlama
- [x] Sipariş oluşturma (doktor)
- [x] Sipariş listeleme + filtre + sayfalama
- [x] Sipariş detayı
- [x] Teknisyene atama (doktor)
- [x] Durum güncelleme (teknisyen): PENDING → IN_PROGRESS → COMPLETED / CANCELLED
- [x] Sipariş fotoğraf yükleme
- [x] Profil görüntüleme / düzenleme
- [x] Parola değiştirme
- [x] E-posta bildirimleri
- [x] Arapça + İngilizce, RTL
- [x] Mobil uyumlu
- [x] Denetim kaydı (audit log)

**Harici (MUST NOT):**
- [ ] Gerçek ödeme entegrasyonu (Stripe/HyperPay) → MVP sonrası
- [ ] Yerleşik sohbet/mesajlaşma → MVP sonrası
- [ ] Teknisyeni puanlama/oy sistemi → MVP sonrası
- [ ] Çoklu şube desteği → MVP sonrası
- [ ] Raporlama/analitik dashboard → MVP sonrası
- [ ] API (dış entegrasyon için public) → MVP sonrası

### 4.4 Kesilen şeyler ve gerekçeleri

| Kesilen | Gerekçe | Yerine ne konuluyor |
|--------|---------|---------------------|
| **Socket.IO / WebSocket** | Gerçek zamanlı bildirim ~10 kat maliyet, e-posta %90 değeri veriyor | E-posta + sayfa yenileme polling (Faz 8) |
| **Zustand / Redux** | Mevcut Context + React Query yeterli, global store gereksiz karmaşıklık | React Query (veri) + mevcut AuthContext (oturum) |
| **Atomic Design takıntısı** | 7 ölü component bu pattern'ın aşırı geldiğinin kanıtı. Feature bazlı daha hızlı | `components/ui` + `features/orders` |
| **Storybook %100 kapsam** | Kullanıcıya değer üretmiyor | Kritik component'larda (%60) story |
| **Landing page sıfırdan** | Zaman kaybı | Şablon kullan |
| **`app/pages` klasörü** | App Router zaten var, `pages/` klasörü ölü | App Router |

### 4.5 Eklenen (mevcut planında yoktu)

| Eklenen | Neden | Faz |
|--------|-------|-----|
| **Dosya yükleme** (hasta fotoğrafı / ölçü) | Diş labının **olmazsa olmaz** ihtiyacı. Fotoğrafsız diş işi yapılmaz | Ay 8 |
| **Denetim kaydı (audit log)** | Sağlık verisi. Kim neyi ne zaman değiştirdi? | Ay 8 |
| **Sürüm geçmişi (timeline)** | İş takibi ve itiraz çözümü için | Ay 5 |
| **Testler ve CI** | 12 aylık solo çalışmada tek güvenlik ağı | Ay 2 |
| **Sentry** | Kullanıcı hataya düşerse nasıl haberin olacak? | Ay 2 |

---

## 5. Mimari Hedefler

### 5.1 Frontend hedef yapısı

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

### 5.2 Backend hedef yapısı

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

### 5.3 Güvenlik modeli (Faz 0 sonrası hedef)

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

### 5.4 RTL ve i18n mimarisi

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

### 5.5 Deployment mimarisi

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

### 5.6 CI/CD hedefi

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

## 6. 12 Aylık Yol Haritası

---

### 🔴 FAZ 0 — ACİL GÜVENLİK (Ekim 2026, ~80 saat)

**Hedef:** Uygulamayı internete açmadan önce kapatılması zorunlu açıkları kapat.
**Başarı ölçütü:** Kullanıcı hesabı çalınabilir değil, sırlar sızmış değil, sıfırlama akışı çalışıyor.

#### 0.1 Sır rotasyonu (4 saat) — İLK İŞ
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

#### 0.2 `.env.example` yaz (1 saat)
```bash
# server/.env.example
DATABASE_URL="postgresql://user:password@host:5432/dbname?sslmode=require"
JWT_SECRET=""                        # openssl rand -hex 64 ile üret
JWT_EXPIRES_IN="15m"                 # access token
JWT_REFRESH_EXPIRES_IN="30d"         # refresh token
JWT_COOKIE_EXPIRES="30"
COOKIE_DOMAIN=""
EMAIL_USERNAME=""
EMAIL_PASSWORD=""
EMAIL_FROM=""
COMPANY_NAME="KanjoLab"
SEND_MSG_METHOD="OFFLINE"            # ONLINE | OFFLINE
BASE_URL="http://localhost:3001"
SUPPORT_EMAIL="destek@kanjolab.com"
NODE_ENV="development"
PORT="3000"
CORS_ORIGINS="http://localhost:3001" # YENİ - virgülle ayrılmış
S3_ENDPOINT=""                       # Faz 8
S3_BUCKET=""
S3_ACCESS_KEY_ID=""
S3_SECRET_ACCESS_KEY=""
SENTRY_DSN=""                        # Faz 2
```

#### 0.3 Forgot-password akışını düzelt (2 saat)
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

#### 0.4 Rate limiting (8 saat)
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

#### 0.5 Güvenli rastgelelik + kod hash'leme (8 saat)
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

#### 0.6 JWT: kısa ömür + refresh token (12 saat)
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

#### 0.7 `authorize()` rol middleware'i (6 saat) — **Order öncesi şart**
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

#### 0.8 Ek güvenlik sertleştirmeleri (8 saat)
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

**Faz 0 çıktısı:** 11 P0 maddesi tamamı, P1-2, P1-3, P1-10, P2-12, P2-16, P2-17 çözülmüş.

#### Ay 1 kontrol listesi
- [ ] Tüm sırlar rotasyonda
- [ ] `server/.backup-env` silindi
- [ ] `.env.example` yazıldı
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

### 🔵 FAZ 1 — ALTYAPI: DAĞITIM + CI + TEST (Kasım 2026, ~70 saat)

**Hedef:** Uygulama internette erişilebilir olsun ve değişikliklerin güvenliğini garantileyelim.
**Başarı ölçütü:** `git push` → otomatik test + build + staging deploy. Raporlama hatası Sentry'de görünüyor.

#### 1.1 Docker + VPS (24 saat) — **TIMEBOX: 1 HAFTA**
```yaml
# docker-compose.yml
services:
  app:
    build: ./client
    restart: unless-stopped
    environment:
      - NEXT_PUBLIC_API_URL=https://api.kanjolab.com
    env_file: .env.production

  api:
    build: ./server
    restart: unless-stopped
    env_file: ./server/.env.production
    environment:
      - NODE_ENV=production
      - PORT=3000
    healthcheck:
      test: ["CMD", "node", "-e", "fetch('http://localhost:3000/api/v1/health').then(r=>process.exit(r.ok?0:1))"]
      interval: 30s
      timeout: 5s
      retries: 3

  nginx:
    image: nginx:alpine
    restart: unless-stopped
    ports: ["80:80", "443:443"]
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
      - ./nginx/certbot:/etc/letsencrypt:ro
```

**Yapılacaklar:**
1. `client/Dockerfile` (multi-stage, non-root `USER`, `NEXT_TELEMETRY_DISABLED=1`)
2. `server/Dockerfile` (multi-stage, `prisma generate` build'de, `prisma migrate deploy` entrypoint'te)
3. `.dockerignore` (her iki tarafta)
4. `nginx/nginx.conf` — reverse proxy, gzip, static cache, security header
5. `certbot` — Let's Encrypt, auto-renew (cron)
6. **Cloudflare** DNS + proxy + SSL
7. Neon/Supabase'den managed PostgreSQL
8. **Otomatik DB yedeği** (Neon otomatik + haftalık `pg_dump` indirme)
9. Uptime monitor (UptimeRobot/Hacker News, ücretsiz)

**Health check endpoint'i ekle:**
```ts
// routes/v1/healthRoute.ts — Faz 1
router.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok", uptime: process.uptime() });
});
// Ayrı: /health/ready — DB bağlantısını kontrol eder
```

**Kabul kriteri:** `https://kanjolab.com` ve `https://api.kanjolab.com` açılıyor, SSL geçerli, sunucu yeniden başlatılınca kendi kendine ayağa kalkıyor.

> ⚠️ **TUZAK:** Bu iş 1 haftada bitmezse **Vercel'e geç** ve geri dön. nginx + SSL + Docker debug 3 hafta yiyebilir, ürünün 1/3'ü kaybolur. Haftalık kontrol koy.

#### 1.2 CI pipeline (12 saat)
`.github/workflows/ci.yml`:
```yaml
name: CI
on: { pull_request: {}, push: { branches: [main] } }
jobs:
  client:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
      - uses: actions/setup-node@v4
        with: { node-version: 22, cache: yarn }
      - run: yarn install --frozen-lockfile
      - run: yarn workspace client typecheck
      - run: yarn workspace client lint
      - run: yarn workspace client test
      - run: yarn workspace client build
  server:
    # aynı yapı + server typecheck/lint/test
```

**Ayrıca:**
- `deploy.yml` — main'e merge → staging'e otomatik deploy → smoke test → manuel onay → production
- **GitHub branch protection** — `ci.yml` yeşil olmadan merge engellensin (ayarlamayı unutma, bu anahtar)
- `opencode.yml`'den `id-token: write` kaldır, action'ı SHA'ya pinle (P: güvenlik)
- Dependabot'a `github-actions` ekle

**Kabul kriteri:** Bilerek kırık bir PR aç → CI kırmızı → merge engelleniyor.

#### 1.3 Test altyapısı (24 saat)
**Client — Vitest + React Testing Library:**
```bash
yarn workspace client add -D vitest @vitest/coverage-v8 @testing-library/react \
  @testing-library/user-event @testing-library/jest-dom jsdom
```
`vitest.config.ts`, `client/src/test/setup.ts`, `test` + `typecheck` script'leri ekle.

**İlk testler (gerçek değer katan):**
| Test | Neden |
|------|-------|
| `lib/schemas/*.test.ts` | Saf fonksiyon, hızlı, yüksek getiri |
| `hooks/useForm.test.ts` | 123 satır, saf mantık, debounce + touched + submit |
| `lib/utils.test.ts` | Biçimlendirme yardımcıları |
| `hooks/useAuth.test.tsx` | Provider + context |
| `components/ui/Button.test.tsx` | Etkileşim + varyant |

**Server — Vitest + Supertest + ayrı test DB:**
```bash
yarn workspace server add -D vitest supertest @vitest/coverage-v8
```
- `server/.env.test` — **ayrı** veritabanı (`kanjolab_test`), asla üretim DB'sine bağlanma
- Global setup: migration çalıştır, test sonrası truncate
- `app.ts` ayrı dosyaya taşı (`index.ts` sadece bootstrap) → test edilebilir Express app
- Testler: `authorize` middleware, validator'lar, error middleware, auth akışı

**Kabul kriteri:** `yarn test` root'tan çalışıyor, her iki workspace test koşuyor, coverage raporu üretiliyor.

#### 1.4 Hata izleme (6 saat)
- Sentry: client + server
- `sentry.client.config.ts` / `sentry.server.config.ts`
- `NEXT_PUBLIC_SENTRY_DSN` + server `SENTRY_DSN`
- Source map upload (production'da stack trace okunabilir olsun)
- **Kritik:** hata bildirimlerini gerçek bir hatayla test et (Sentry'ye düştüğünü gör)

#### 1.5 App Router sözleşmeleri (4 saat)
| Dosya | Ne yapar |
|------|----------|
| `app/loading.tsx` | Sayfa yüklenirken skeleton |
| `app/error.tsx` | Hata sınırı + "tekrar dene" |
| `app/not-found.tsx` | **Markalı 404** — şu an Next'in çıplak 404'ü |
| `app/global-error.tsx` | Root layout hatası |

`not-found.tsx` özellikle önemli — Sidebar'daki ölü linkler şu an çıplak 404'e düşüyor.

**Ay 2 kontrol listesi:**
- [ ] Site HTTPS üzerinden erişilebilir
- [ ] Sunucu yeniden başlatılınca kendini toparlıyor
- [ ] Otomatik DB yedeği çalışıyor
- [ ] CI yeşil, merge engelli
- [ ] `yarn test` root'tan çalışıyor
- [ ] Test DB üretim DB'den ayrı
- [ ] Sentry gerçek hatayı yakaladı
- [ ] Markalı 404 var

---

### 🟣 FAZ 2 — RTL + i18n + MİMARİ GEÇİŞ (Aralık 2026, ~60 saat)

**Hedef:** Arap pazarı desteğini **temel olarak** kuralım. Sonradan eklenen özellik olmasın.
**Başarı ölçütü:** Tüm mevcut ekranlar `dir="rtl"` altında doğru görünüyor, İngilizce/Arapça arasında geçiş çalışıyor.

> ⚠️ **Bu fazı sonraya atlamak en pahalı hatadır.** Şu an 34 fiziksel CSS özelliği var. Yazdığın her yeni component'le bu sayı artar. Ay 6'da dönüştürürsen 40+ dosyaya dokunursun. **Şimdi 60 saat, sonra 150 saat.**

#### 2.1 Mimarî geçiş: Atomic Design → feature-based (12 saat)
7 ölü component'ı sil, kalanı düzleştir.

| Eski | Yeni |
|------|------|
| `components/atoms/Button` | `components/ui/Button` |
| `components/molecules/FormField` | `components/ui/FormField` |
| `components/molecules/Modal` | `components/ui/Modal` |
| `components/atoms/*` (7) | `components/ui/*` (7) |
| `components/organisms/LoginForm` | `features/auth/LoginForm` |
| `components/organisms/DashboardProfile` | `features/profile/DashboardProfile` |
| `components/templates/AuthTemplate` | `app/[locale]/(marketing)/layout.tsx` |
| `components/templates/DashboardTemplate` | `app/[locale]/dashboard/layout.tsx` |
| **7 ölü component** | **SİL** (`Avatar`, `Card`, `Checkbox`, `Dropdown`, `Tabs`, `Toast`, `Toggle`) |

**Ayrıca:** `tokens/*.ts` ölü dosyalarını sil (P2-2), `tokens.css` tek kaynak olsun. `types/css.d.ts`'yi `*.module.css` için daralt (P2-4). Boş `templates/MainLayout/` sil (P2-5).

**Kabul kriteri:** Build geçiyor, görsel regresyon yok, ölü component sayısı 0.

#### 2.2 CSS → Mantıksal özellikler (8 saat)
**Önce kural yaz, sonra uygula** (`docs/frontend-conventions.md`):
```css
/* ❌ Yasak */
margin-left, margin-right, padding-left, padding-right,
text-align: left|right, left:, right:,
border-left, border-right, float, flex-direction: row-reverse

/* ✅ Zorunlu */
margin-inline-start|end, padding-inline-start|end,
text-align: start|end, inset-inline-start|end,
border-inline-start|end, text-align: start
```

**Yönlendirme için yeni token:**
```css
:root { --dir-flip: 1; }
[dir="rtl"] { --dir-flip: -1; }
```
```css
/* ❌ */ transform: translateX(-100%);
/* ✅ */ transform: translateX(calc(var(--dir-flip) * -100%));
```

**Mevcut 34 örneği dönüştür** (7 dosya: `Modal`, `AuthModal`, `Sidebar`, `Toast`, `Dropdown`, `DashboardHome`, `AuthTemplate`)

**Kabul kriteri:** `grep -rn 'margin-left\|padding-right\|text-align: left' client/src --include='*.css'` → **0 sonuç**.

#### 2.3 Responsive altyapı (8 saat) — **tek bir @media bile yok**
Breakpoint token'ları:
```css
:root {
  --bp-sm: 480px;    /* telefon */
  --bp-md: 768px;    /* tablet */
  --bp-lg: 1024px;   /* dizüstü */
  --bp-xl: 1280px;   /* masaüstü */
}
```
**Kural:** Mobil önce (mobile-first). `min-width` kullan, `max-width` değil.

6 sabit genişlik düzeltilecek: `Modal` (400/560/720), `DashboardProfile` (720), `DashboardSettings` (600), `AuthTemplate` (480), `DashboardHome` (220), `Sidebar` (260).

**Kabul kriteri:** 375px genişlikte hiçbir yatay kaydırma çubuğu yok.

#### 2.4 i18n altyapısı (16 saat)
```bash
yarn workspace client add next-intl
```
- `src/i18n/request.ts` — next-intl yapılandırması
- `src/messages/ar.json` + `src/messages/en.json` — **aynı anahtar yapısı**
- `app/[locale]/layout.tsx` — `<html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>`
- Dil değiştirici (Header'da TR bayrağı / AR bayrağı)
- **Araç:** `scripts/check-i18n.mjs` — eksik anahtar kontrolü, CI'da çalışsın

**Çeviri sırası:** Arapça önce (birincil pazar), sonra İngilizce.

**Kabul kriteri:** Dil değiştirince tüm metinler değişiyor, `<html dir>` değişiyor, eksik anahtar varsa CI kırmızı.

#### 2.5 Font iyileştirme (4 saat)
Lalezar **sadece display**. Arapça gövde fontu şart.
```ts
// app/layout.tsx — next/font
import { IBM_Plex_Sans_Arabic, Fraunces, Sora } from "next/font/google";
```
- Arapça: `IBM Plex Sans Arabic` (400/500/600/700)
- Latin gövde: `Sora` (mevcut)
- Display: `Lalezar` (mevcut, `.ttf` olarak)
- `next/font` → otomatik alt küme + `size-adjust` ile sıfır layout shift

**Ay 3 kontrol listesi:**
- [ ] Mimari geçiş bitti, ölü component 0
- [ ] CSS'te fiziksel özellik 0
- [ ] 375px'te yatay kaydırma yok
- [ ] `<html dir>` dili takip ediyor
- [ ] Eksik çeviri anahtarı CI'da yakalanıyor
- [ ] Arapça gövde fontu yüklü, layout shift yok

---

### 💎 FAZ 3 — ÜRÜN: ORDER MANAGEMENT (Ocak → Mart 2027, ~280 saat)

**Hedef:** Projeyi bir "login demosu"ndan **gerçek bir ürüne** dönüştürmek.
**Başarı ölçütü:** Bir diş hekimi sipariş oluşturur, teknisyen görür ve tamamlar.

> **Bu faz bitmeden "bitti" deme.** Diğer her şey bunun etrafında süs.

**Ay ay bölüm:**

---

#### Ay 4 (Ocak 2027) — Order Sunucu Temeli (~90 saat)

##### 4.1 Order domain modeli (8 saat)
`prisma/schema.prisma` — değişiklikler:
```prisma
model Order {
  // ...mevcut alanlar
  urgency     Urgency        @default(NORMAL)    // String -> enum
  currency    String?                            // nullable yap
  price       Decimal?      @db.Decimal(10, 2)
  
  // YENİ
  assignedAt      DateTime?
  startedAt       DateTime?
  completedAt     DateTime?
  cancelledAt     DateTime?
  cancelReason    String?
  
  attachments     OrderAttachment[]
  statusHistory   OrderStatusHistory[]
  
  @@index([dentistId, status])
  @@index([technicianId, status])
  @@index([createdAt])
}

enum Urgency { LOW NORMAL HIGH URGENT }

model OrderStatusHistory {
  id          Int      @id @default(autoincrement())
  orderId     Int
  fromStatus  OrderStatus?
  toStatus    OrderStatus
  changedById Int
  note        String?
  createdAt   DateTime @default(now())
  order       Order    @relation(fields: [orderId], references: [id], onDelete: Cascade)
  changedBy   User     @relation(fields: [changedById], references: [id])
  @@index([orderId, createdAt])
}

model AuditLog {
  id         Int      @id @default(autoincrement())
  userId     Int?
  action     String   // "order.create", "order.assign", ...
  entity     String   // "Order"
  entityId   Int?
  metadata   Json?
  ipAddress  String?
  createdAt  DateTime @default(now())
  user       User?    @relation(fields: [userId], references: [id], onDelete: SetNull)
  @@index([entity, entityId])
  @@index([userId, createdAt])
}
```

**Düzeltmeler aynı anda:**
- `Order.dentistId` / `technicianId` → `onDelete: Restrict` (P0: kullanıcı silinemez, cascade yüzünden FK ihlali)
- `Order.description` zaten `Text`
- `Technician.specialties` API ile güncellenebilir hale geliyor (P1-11)
- `User.preferredCurrency String @default("AED")` — Arap pazarı için (P1-12)

##### 4.2 Order servis + yetkilendirme (20 saat)
```ts
// services/orderService.ts — HER sorgu sahiplik kontrolü içerir
export async function listOrders(userId: number, role: Role, filters: OrderFilters) {
  return prisma.order.findMany({
    where: {
      // KRİTİK: DENTIST kendi siparişlerini, TEKNİSYEN atananları görür
      ...(role === "DENTIST" ? { dentistId: userId } : { technicianId: userId }),
      ...filters,
    },
    include: { dentist: {...}, technician: {...}, _count: { select: { attachments: true } } },
    orderBy: { createdAt: "desc" },
    skip: (filters.page - 1) * filters.limit,
    take: filters.limit,
  });
}
```

**Kural:** Kullanıcı ID'si **istemciden asla alınmaz** — her zaman `req.user`'dan türetilir. `orderId` path'ten gelir ama `where` içinde `dentistId: req.user.dentistId` de bulunur. **Bu, IDOR'a karşı tek savunma.**

**Durum makinesi:**
```
PENDING ──assign──▶ PENDING (technicianId set)
PENDING ──start────▶ IN_PROGRESS   (teknisyen)
IN_PROGRESS ──complete─▶ COMPLETED (teknisyen)
PENDING ──cancel──▶ CANCELLED     (doktor)
IN_PROGRESS ──cancel──▶ CANCELLED (doktor, gerekçe zorunlu)
COMPLETED/CANCELLED ──▶ değiştirilemez (terminal durum)
```

##### 4.3 Order endpoint'leri (16 saat)
| Method | Yol | Yetki | Açıklama |
|--------|-----|-------|----------|
| `GET` | `/api/v1/order` | her iki rol | Liste + filtre + sayfalama |
| `GET` | `/api/v1/order/:id` | sahip | Detay |
| `POST` | `/api/v1/order` | `DENTIST` | Oluştur |
| `PUT` | `/api/v1/order/:id` | `DENTIST` (sahip) | Güncelle (PENDING'de) |
| `DELETE` | `/api/v1/order/:id` | `DENTIST` (sahip) | Sil (PENDING'de) → soft delete tercih et |
| `PATCH` | `/api/v1/order/:id/assign` | `DENTIST` (sahip) | Teknisyen ata |
| `PATCH` | `/api/v1/order/:id/status` | sahip (rol bazlı) | Durum değiştir |
| `GET` | `/api/v1/order/:id/history` | sahip | Durum geçmişi |
| `GET` | `/api/v1/technician/available` | `DENTIST` | Atanabilir teknisyenler |

**Filtre parametreleri:** `status`, `technicianId`, `urgency`, `from`, `to`, `search` (hasta adı/sipariş no), `page`, `limit`, `sort`

##### 4.4 Validasyon + test (14 saat)
`validators/orderValidator.ts` — her alan için `isLength({max})`, enum kontrolü, `toothNumber` format doğrulaması, `price` pozitif, `deadline` gelecekte.

**Testler (önemli — bu fazın cankı):**
| Test | Kapsam |
|------|--------|
| `orderService` birim testleri | Filtreleme, sahiplik, durum makinesi |
| `authorize("DENTIST")` | 403 kontrolü |
| **IDOR testleri** | Doktor B, Doktor A'nın siparişine erişemez |
| Endpoint testleri | 201/400/401/403/404/422 |
| Durum makinesi | Her geçersiz geçiş reddedilmeli |

**Ay 4 çıktısı:** Sunucu tarafı hazır, testler yeşil, IDOR koruması kanıtlanmış.

---

#### Ay 5 (Şubat 2027) — Order İstemci: Liste + Oluşturma (~95 saat)

##### 5.1 Order UI bileşenleri (30 saat)
```
features/orders/
├── OrderList/
│   ├── OrderList.tsx           # tablo + filtre çubuğu + sayfalama
│   ├── OrderTable.tsx
│   ├── OrderFilters.tsx
│   ├── OrderStatusBadge.tsx
│   ├── OrderUrgencyBadge.tsx
│   └── OrderCard.tsx           # mobil görünüm
├── OrderForm/
│   ├── OrderForm.tsx           # oluşturma sihirbazı
│   ├── steps/PatientStep.tsx
│   ├── steps/WorkStep.tsx      # diş no, iş tipi, renk
│   ├── steps/DetailsStep.tsx   # deadline, fiyat, açıklama
│   └── steps/ReviewStep.tsx
├── OrderDetail/
│   ├── OrderDetail.tsx
│   ├── OrderTimeline.tsx       # durum geçmişi
│   └── OrderAssignment.tsx     # teknisyen ata
└── hooks/
    ├── useOrders.ts            # React Query
    ├── useOrderMutations.ts
    └── useOrderFilters.ts
```

##### 5.2 Form + zod şemaları (20 saat)
```ts
// schemas/order.ts
export const orderSchema = z.object({
  patientName: z.string().min(2).max(100),
  toothNumber: z.string().max(50).optional(),
  workType: z.string().min(2).max(100),
  shade: z.string().max(20).optional(),
  urgency: z.enum(["LOW", "NORMAL", "HIGH", "URGENT"]),
  description: z.string().max(2000).optional(),
  price: z.coerce.number().positive().max(9999999).optional(),
  currency: z.string().length(3),
  deadline: z.coerce.date().optional(),
  technicianId: z.coerce.number().int().positive().optional(),
});
```

`useForm` hook'u bu şemayı kullanır. Çok adımlı sihirbaz için adım bazlı validasyon.

**Yerelleştirme:** Tüm alan etiketleri `ar.json`/`en.json` içinde. **Para birimi `Intl.NumberFormat(locale, { style: "currency", currency })`** — elle birleştirme yok.

##### 5.3 Liste sayfası + filtreler (25 saat)
- Sunucu taraflı filtreleme (debounce'lu arama)
- Sayfalama (cursor tercih edilir — offset büyük veride yavaşlar)
- Boş durum (hiç sipariş yok / filtre sonucu yok)
- Yükleniyor skeleton
- Hata durumu + tekrar dene
- **Mobil: tablo → kart dönüşümü** (375px'te tablo kullanılamaz)

##### 5.4 React Query entegrasyonu (12 saat)
```bash
yarn workspace client add @tanstack/react-query
```
- `QueryClientProvider` root layout'ta
- `queryClient.ts` — varsayılan `staleTime`, `retry` politikası
- `useOrders` — `useQuery` + key: `["orders", filters]`
- Mutation sonrası invalidation
- **Optimistic update** — durum değişikliğinde anında UI güncellemesi

##### 5.5 Sihirbaz (8 saat)
4 adım: Hasta → İş → Detaylar → Onay. İleri/geri, adım doğrulama, taslak kaydetme (localStorage — PII uyarısı: yalnızca oturum sonu, sunucuya yazma).

**Ay 5 çıktısı:** Doktor sipariş oluşturabilir, listeleyebilir, filtreleyebilir.

---

#### Ay 6 (Mart 2027) — Detay + Atama + Durum (~95 saat)

##### 6.1 Detay sayfası (25 saat)
- Tüm alanları göster (locale'e göre)
- Durum rozeti + zaman çizelgesi
- Doktor için: düzenleme (PENDING durumundayken), silme, atama
- Teknisyen için: durum güncelleme butonları, not ekleme
- **Yazdırma görünümü** (lab kağıdı — pratik ve düşük maliyetli)

##### 6.2 Teknisyen atama (20 saat)
- Mevcut teknisyenleri listele (uzmanlık, iş yükü, tamamlanan sipariş sayısı)
- İş yüküne göre otomatik öneri
- Atama sonrası e-posta bildirimi (`notificationService`)

##### 6.3 Durum yönetimi (20 saat)
- **Doktor:** iptal (gerekçe zorunlu)
- **Teknisyen:** başla (PENDING→IN_PROGRESS), tamamla (IN_PROGRESS→COMPLETED)
- Optimistic update + rollback hata durumunda
- WebSocket yok → **sayfa yenileme düğmesi + `refetchInterval: 60s`** yeterli

##### 6.4 Order testleri (20 saat)
| Test | Kapsam |
|------|--------|
| `OrderList` | Filtre, sayfalama, boş durum |
| `OrderForm` | Adım doğrulama, hata mesajları (ar/en) |
| `OrderDetail` | Rol bazlı buton görünürlüğü |
| `useOrders` | Loading/error/success durumları |
| **IDOR (istemci)** | Doktor rolü teknisyen butonlarını görmüyor |

##### 6.5 İlk gerçek kullanıcı testi (10 saat)
- 1 diş hekimi + 1 teknisyen ile uçtan uca senaryo
- Yarım kalan her yeri not al
- Bulunan her hatayı düzelt

**Ay 6 çıktısı:** **Sipariş yönetimi uçtan uca çalışıyor.** Bu fazın sonunda proje bir demo değil, gerçek bir ürün.

---

### 🟢 FAZ 4 — DOSYA YÜKLEME + BİLDİRİM (Nisan 2027, ~80 saat)

**Hedef:** Diş laboratuvarının gerçekten ihtiyaç duyduğu şeyi eklemek.
**Başarı ölçütü:** Doktor siparişe hasta fotoğrafı yükleyebiliyor, teknisyen görebiliyor.

#### 4.1 Depolama altyapısı (16 saat)
- **Cloudflare R2** (S3 uyumlu, egress ücretsiz) veya AWS S3
- `uploadService.ts` — presigned URL üretimi (dosya sunucudan geçmesin)
- `OrderAttachment` modeli
- Kısıtlamalar: **max 10 dosya/sipariş, max 5MB/dosya**, yalnızca `image/jpeg`, `image/png`, `image/webp`, `application/pdf`
- **Sunucu tarafı magic byte kontrolü** (uzantıya güvenme)
- `Content-Disposition: attachment` — inline render XSS riski

#### 4.2 Dosya yükleme arayüzü (24 saat)
- Sürükle-bırak + dosya seçici
- Yükleme ilerlemesi (progress bar)
- Önizleme (lightbox)
- Mobil: **kamera ile çek** (`<input type="file" accept="image/*" capture="environment">`) — diş hekimi telefondan fotoğraf çeker
- Silme (yetki kontrolü ile)

#### 4.3 Görsel optimizasyonu (12 saat)
- Sunucu tarafında yeniden boyutlandırma (`sharp`)
- WebP dönüştürme
- Thumbnail üretme
- **Sonuç:** telefon fotoğrafı 4MB → 300KB. Mobil veri tasarrufu.

#### 4.4 E-posta bildirimleri (20 saat)
`notificationService.ts` — `nodemailer` ile şablonlu e-posta.

| Tetikleyici | Alıcı | Konu |
|--------------|--------|-------|
| Sipariş oluşturuldu | teknisyen (varsa) | "Yeni sipariş atandı" |
| Sipariş atandı | teknisyen | "Size sipariş atandı" |
| Durum değişti → COMPLETED | doktor | "Siparişiniz hazır" |
| Sipariş iptal edildi | teknisyen | "Sipariş iptal edildi" |
| Deadline yaklaşıyor (24 saat) | teknisyen | "Deadline yaklaşıyor" |
| Profil tamamlandı | kullanıcı | "Hoş geldiniz" |

**Kurallar:** Kuyruk (basit DB tablosu veya BullMQ), hata durumunda tekrar deneme, **çok dilli şablonlar** (ar/en), unsubscribe bağlantısı.

#### 4.5 Denetim kaydı (8 saat)
Her kritik eylem `AuditLog`'a yazılır: `order.create`, `order.assign`, `order.status_change`, `order.delete`, `auth.login`, `auth.password_reset`, `profile.update`.

**Neden:** Sağlık verisi. "Bu siparişi kim ne zaman iptal etti?" sorusuna cevap verebilmelisin.

**Ay 4 (Faz) çıktısı:** Dosya yükleme + bildirimler + audit log çalışıyor.

---

### 🟡 FAZ 5 — MOBİL + UX (Mayıs 2027, ~70 saat)

**Hedef:** Teknisyen telefonla, doktor telefonda rahat çalışsın.
**Başarı ölçütü:** 375px'te tüm temel akışlar kullanılabilir.

#### 5.1 Mobil navigasyon (14 saat)
- `< 768px`: Sidebar → **bottom navigation bar** (Siparişler / Profil / Ayarlar / Çıkış)
- `≥ 768px`: Mevcut sidebar
- Hızlı aksiyon FAB (bottom-right, "+" butonu — yeni sipariş)

#### 5.2 Duyarlı bileşenler (22 saat)
- `DashboardHome` — kart ızgarası mobilde tek sütun
- `OrderList` — tablo → kart dönüşümü
- `Modal` — mobilde tam ekran (`100dvh`)
- `FormField` — dokunma hedefi ≥ 44×44px
- `Header` — hamburger menü

#### 5.3 Dokunma ve erişilebilirlik (14 saat)
- Dokunma hedefleri ≥ 44×44px (WCAG 2.5.5)
- `prefers-reduced-motion` desteği
- Klavye odağı görünür (`:focus-visible`)
- Form hataları `aria-describedby` ile ilişkilendirilmiş
- `aria-live` ile dinamik mesaj duyuruları
- Renk kontrastı ≥ 4.5:1
- **Otomatik a11y kontrolü:** `eslint-plugin-jsx-a11y` + CI

#### 5.4 Performans (20 saat)
- Route bazlı kod bölme (order listesi = ana paket, detay = lazy)
- Görseller: `next/image`, `sizes`, AVIF/WebP
- `loading.tsx` skeleton'ları
- `useMemo`/`useCallback` — Vercel kuralları
- **Ölçüm:** Lighthouse hedefi — Performans ≥ 90, LCP < 2.5s, CLS < 0.1
- 10.000 sipariş ile liste performans testi

**Ay 5 çıktısı:** Mobilde tam kullanılabilir, Lighthouse yeşil.

---

### ⚫ FAZ 6 — SIKILAŞTIRMA (Haziran → Temmuz 2027, ~160 saat)

**Hedef:** Lansmandan önce kaliteyi ve güvenliği doğrulamak.
**Başarı ölçütü:** Test kapsamı hedefi, güvenlik denetimi temiz, KVKK metinları hazır.

#### 6.1 Test kapsamı derinleştirme (60 saat)
| Alan | Hedef kapsam |
|------|--------------|
| `orderService` | %90 |
| Auth servisleri | %85 |
| `authorize` middleware | %100 |
| Validasyon şemaları | %100 |
| Kritik React bileşenleri | %70 |
| Endpoint entegrasyon | Ana akışlar %100 |
| **Toplam** | **≥ %75** |

**E2E (Playwright) — 8 senaryo:**
1. Kayıt → doğrulama → profil → dashboard
2. Giriş → dashboard
3. Parola sıfırlama
4. Doktor: sipariş oluştur
5. Doktor: sipariş listele + filtrele
6. Doktor: teknisyene ata
7. Teknisyen: durum güncelle
8. **Güvenlik: Doktor B, Doktor A'nın siparişine erişemez (403)**

#### 6.2 Güvenlik denetimi (40 saat)
Kendi kodunu kendin denetle (veya bağımsız gözle):

| Kontrol | Araç / Yöntem |
|---------|---------------|
| Bağımlılık zafiyetleri | `yarn audit`, Dependabot |
| Yetkilendizasyon boşlukları | Her endpoint için rol matrisi testi |
| IDOR | Her `:id` endpoint'i için sahiplik testi |
| Girdi doğrulama | Her endpoint'e geçersiz/çok büyük/homografik girdi |
| CSRF | `sameSite` + origin kontrolü |
| SQL injection | Parametrik sorgu (Prisma) — doğrula |
| XSS | `dangerouslySetInnerHTML` yok; e-posta HTML kaçışı |
| Sır sızıntısı | `gitleaks` taraması, git geçmişi |
| Header'lar | Helmet + CSP `report-only` ile dene |
| Dosya yükleme | Magic byte, yürütme yok, path traversal yok |
| Session yönetimi | Token ömrü, iptal, eşzamanlı oturum limiti |

**Ayrıca:**
- CSP'yi `Content-Security-Policy-Report-Only` ile önce dene, sonra zorla
- Sentry'den 2 hafta izle, sessiz hata çıkar
- **Bulunan her zafiyet için regresyon testi yaz**

#### 6.3 KVKK / Gizlilik / yasal (24 saat)
Sağlık verisi işliyorsun — bu **yasal yükümlülük**:
- `privacy-policy.md` — hangi veri, neden, ne kadar süre
- `terms-of-service.md`
- `cookie-policy.md` (httpOnly cookie + hangi çerezler)
- **KVKK Aydınlatma Metni** (Türkiye) veya eşdeğeri
- **Veri saklama politikası** — hasta verisi ne kadar süre tutulur?
- **Veri silme hakkı** — kullanıcı hesabını ve verisini silebiliyor mu?
- Hesap silme endpoint'i (KVKK gereği)

> ⚠️ Arap pazarı hedeflediğin için **katılımcı ülkelere göre** (KSA, BAE, Mısır) yerel mevzuat da kontrol edilmeli. Bu konuda profesyonel hukuk desteği al.

#### 6.4 Ölçek ve performans (36 saat)
- 10.000 sipariş yükle, liste performansını ölç
- Gerekirse: `dentistId + createdAt` bileşik index, cursor pagination
- Yavaş sorgu tespiti (`prisma.$on("query")`)
- N+1 sorgu kontrolü
- Yüksek yük testi (k6, 100 eşzamanlı kullanıcı)

**Ay 6-7 çıktısı:** Test kapsamı ≥ %75, güvenlik denetimi temiz, KVKK metinları hazır, 10k siparişte performans kabul edilebilir.

---

### 🔥 FAZ 7 — LANSMAN (Ağustos → Eylül 2027, ~80 saat)

**Hedef:** Gerçek kullanıcıya açmak, geri bildirim almak.
**Başarı ölçütü:** 3 gerçek kullanıcı, 10 gerçek sipariş, 0 kritik hata.

#### 7.1 Landing page (16 saat)
**Şablon kullan, sıfırdan yapma.** Zaten var olan bir şablonu 2 günde uyarlarsın.
- Hero + özellik listesi
- Arapça + İngilizce
- Kayıt CTA'sı
- **Kayıt öncesi fiyat/lansman teklifi (founding users)** — ilk 10 kullanıcıya ücretsiz/indirimli

#### 7.2 Onboarding (12 saat)
- İlk giriş turu (3-4 adım, `joyride` benzeri)
- Boş durum ekranları eyleme dönük ("İlk siparişinizi oluşturun →" butonu)
- Demo veri: `prisma/seed.ts` ile 5 örnek sipariş, 3 teknisyen
- **İlk deneyim her şeyi belirler** — boş ekran = terk edilen kullanıcı

#### 7.3 Analitik (10 saat)
- Basit, gizlilik dostu: **Umami** veya **Plausible** (GA4'ün cookie izni sorunu yok)
- Ölçülecek olaylar: kayıt, profil tamamlama, ilk sipariş, sipariş tamamlama, dosya yükleme
- **Gerçek KPI:** ilk siparişe kadar geçen süre, ayrılma oranı

#### 7.4 Pilot — 3 kullanıcı (24 saat)
- 1 diş hekimi + 2 teknisyen (gerçek, Arap ülkelerinden)
- **8 hafta boyunca haftalık geri bildirim** (pilot MVP'den sonra başlar, bu yüzden Ay 8'de başla)
- Her hafta: ne çalışıyor / ne çalışmıyor / eksik ne
- İlk 10 siparişi bu kullanıcılarla gerçekten yap

**Kritik:** Pilotu **Faz 7'nin başında** başlat, sonunda değil. Aylarca bekleyip son anda test etme.

#### 7.5 Lansman (18 saat)
- [ ] Tüm P0/P1 kapandı
- [ ] Test kapsamı ≥ %75
- [ ] Güvenlik denetimi temiz
- [ ] KVKK metinları yayında
- [ ] Yedekleme + geri yükleme **gerçekten test edilmiş**
- [ ] İzleme + alarm (UptimeRobot + Sentry)
- [ ] `status` sayfası
- [ ] Destek kanalı (e-posta veya WhatsApp — Arap pazarında WhatsApp standart)
- [ ] Rollback planı
- [ ] Smoke test sonrası yayın

**Kabul kriteri:** Gerçek bir diş hekimi, gerçek bir hasta için, gerçek bir sipariş açtı ve teknisyen tamamladı. **Sonuç gerçek.**

---

## 7. Riskler ve Azaltma Planı

| # | Risk | Olasılık | Etki | Azaltma | Tetikleyici |
|---|------|----------|-----|--------|-------------|
| R1 | **Yalnızlık / motivasyon kaybı** | Yüksek | Çok yüksek | Haftalık ilerleme günlüğü, küçük kazanımları commit et, bir mentor bul | 2 hafta üst üste hiç ilerleme yoksa |
| R2 | **Kapsam kayması** ("şunu da ekleyeyim") | Yüksek | Yüksek | Aylık bütçeyi yazılı tut, faz dışı istek → "Sonraki ay listesine" | Her ay başında kapsam kilidi |
| R3 | **nginx/Docker tuzağı** (3 hafta kaybetme) | Yüksek | Yüksek | 1 hafta timebox, bitmezse Vercel'e geç | 1 haftada SSL çalışmıyorsa |
| R4 | **Order yetkilendirme açığı (IDOR)** | Orta | Çok yüksek | `authorize()` Faz 0'da, IDOR testleri Ay 4/6'da | Her yeni endpoint'te test zorunlu |
| R5 | **Aylık bütçe aşımı** | Yüksek | Orta | Aşırsa kapsam kes, kapsam genişletme | Ay sonunda >%110 saat |
| R6 | **Sağlık verisi sızıntısı** | Düşük | Felaket | Audit log, azamiyet, KVKK metinleri, şifreleme | Kullanıcı sayısı >50 |
| R7 | **Sır sızıntısı tekrarı** | Orta | Çok yüksek | `.env` asla commit edilmez, `gitleaks` CI'da | Yeni secret eklendiğinde |
| R8 | **Bağımlılık zafiyeti** | Orta | Yüksek | Dependabot + `yarn audit` CI'da | Haftalık tarama |
| R9 | **Teknik borç birikimi** | Orta | Orta | Her ay 1 gün "teknik borç" ayrılmazsa ertelenen iş patlar | Ay sonu |
| R10 | **İlk müşteri bulamama** | Orta | Yüksek | Ay 8'de pilot başlat, meslek odaları/sosyal medya | 4 haftada bulunamazsa |
| R11 | **Sağlık problemi / hayat değişikliği** | Düşük | Çok yüksek | Her faz bağımsız tamamlanabilir olsun, commit'ler çalışır durumda | — |
| R12 | **Veritabanı kaybı** | Düşük | Felaket | Otomatik yedek + **geri yükleme testi** | Ay 2'de test et |

### Yönetim stratejisi
- **Her pazartesi:** 15 dakika haftalık planlama
- **Her ay sonunda:** 1 gün ay değerlendirme + plan güncelleme
- **Her çeyrekte:** 1 gün yön yeniden değerlendirme, planı gerçek veriye göre düzelt
- **Kural:** Plan değişikliği değişikliğin gerekçesiyle birlikte yazılır

---

## 8. Definition of Done

Bir iş "bitti" sayılmak için **hepsi** sağlanmalıdır:

### Kod kalitesi
- [ ] `yarn typecheck` — hatasız
- [ ] `yarn lint` — 0 hata, 0 uyarı
- [ ] `yarn test` — hepsi geçiyor
- [ ] `0` tane `any`, `@ts-ignore`, `console.log`, `TODO`
- [ ] Tüm hata yolları toast gösteriyor
- [ ] Tüm formlar merkezi zod şeması kullanıyor
- [ ] Tüm API hataları `ApiError` tipinde

### Güvenlik
- [ ] Yetki kontrolü test edildi (403)
- [ ] Sahiplik kontrolü test edildi (IDOR testi)
- [ ] Girdi doğrulama mevcut
- [ ] Hassas veri loglanmıyor
- [ ] Sır kaynak koda sızmamış

### Kullanıcı deneyimi
- [ ] Yükleniyor durumu var
- [ ] Boş durum var ve eyleme dönük
- [ ] Hata durumu var ve "tekrar dene" sunuyor
- [ ] Klavye ile gezilebilir
- [ ] 375px'te kullanılabilir
- [ ] `dir="rtl"` altında doğru

### Uluslararasılaşma
- [ ] Tüm metinler çeviride (anahtar eksik 0)
- [ ] Tarih/para `Intl` ile biçimleniyor
- [ ] Arapça font yüklü

### Teslim
- [ ] CI yeşil
- [ ] Build başarılı
- [ ] Staging'e deploy edildi ve smoke test geçti
- [ ] Storybook (kritik bileşenler)
- [ ] README güncel

### Test
- [ ] Yeni kodun testi var
- [ ] Kritik akışlar E2E testiyle
- [ ] Kapsam hedefi karşılandı

---

## 9. Çalışma Ritüeli

### Haftalık döngü
| Gün | Aktivite |
|-----|----------|
| Pazartesi | 15 dk: haftalık planlama, 3 iş seç (bitti ölçütü tanımlı) |
| Salı-Perşum | Kod yazma, teslim, düzeltme |
| Cuma | Refactor, teknik borç, dokümantasyon, `git push` |
| Cuma sonu | İlerleme günlüğü — ne yaptın, ne engellendi, hafta sonu yapacak mısın |

### Aylık döngü
| Zaman | Aktivite |
|-------|----------|
| Ayın 1. günü | Bu dokümanın ilgili ay bölümünü aç, işleri netleştir |
| Ayın son günü | 1 gün: ne bitti, ne kalmadı, saat harcaması, sapma notu |
| Ayın son günü | 1 gün: sonraki ayın planı + GitHub issue'ları |
| Ayın son günü | **Kapsam kilidi**: sonraki ay değişiklikler |

### Yapılacaklar (TODO) yöntemi
- GitHub Issues = tek doğruluk kaynağı (memory bank ile senkron)
- Her issue: kabul kriteri + tahmini saat + bağlı issue
- Kapalı issue = commit referansı
- **Süreç hala varsa** açık kalsın

### Sürüm stratejisi
- `main` → üretim
- `develop` → staging
- `feat/<issue-no>-<ad>` → özellik
- Haftalık `develop` → `main` merge (sürekli entegrasyon)

---

## 10. Karar Kaydı (ADR)

Bu kararlar tartışıldı ve **değiştirilmediği sürece** geçerlidir. Değiştirmek için gerekçe yazılmalıdır.

### ADR-001: Arap pazar birincil
**Karar:** Arap ülkeleri birincil pazar. Arapça + İngilizce, RTL zorunlu.
**Gerekçe:** Kullanıcı beyanı. RTL sonradan eklenemez; temelde kurulmalıdır.
**Etki:** Faz 2'de RTL+i18n temeli atılır. Her yeni component logical property kullanır.
**Sonuç:** MVP İngilizce-only olmaz. RTL her ekran ve bileşende test edilir.

### ADR-002: Docker + VPS, managed PostgreSQL
**Karar:** Uygulama Docker ile VPS'te, veritabanı Neon/Supabase'da.
**Gerekçe:** Tam kontrol + düşük maliyet; ama DB işletmesi tek başına 1 ay yer, oyuna değmez. Neon zaten kullanılıyor.
**Etki:** 24 saat kurulum. Nginx/SSL için 1 hafta timebox.
**Geri dönüş tetikleyicisi:** 1 haftada SSL çalışmazsa Vercel'e geçilir.

### ADR-003: WebSocket yok
**Karar:** Socket.IO iptal. E-posta + polling ile bildirim.
**Gerekçe:** Gerçek zamanlı bildirim %90 değeri %10 maliyetle verir. Tek başına ~80 saat kazandırır.
**Etki:** 80 saat order yönetimine aktarıldı. `refetchInterval: 60s` yeterli.

### ADR-004: Feature-based mimari (Atomic Design değil)
**Karar:** `components/ui` + `features/*`. Atomic Design kaldırıldı.
**Gerekçe:** 7 ölü component bu pattern'ın aşırı geldiğinin kanıtı. Feature bazlı yeni ekran eklemede daha hızlı.
**Etki:** 12 saat refactor. Yeni ekran = 1 klasör, yönlendirme otomatik.
**Geri dönüş:** Feature >50 bileşene ulaşırsa yeniden değerlendir.

### ADR-005: Global state yok (Zustand/Redux)
**Karar:** React Query (sunucu durumu) + AuthContext (oturum). Redux/Zustand yok.
**Gerekçe:** Yeterli. Global store karmaşıklığı 8 aydır kazanç sağlamıyor.
**Etki:** Sadece gerçekten global olan durum (tema, dil tercihi) Context'te.

### ADR-006: Sahiplik kontrolü servis katmanında
**Karar:** Kullanıcı ID'si istemciden asla alınmaz. `where` ifadesinde `req.user`'dan türetilir.
**Gerekçe:** IDOR'a karşı tek savunma hattı. Controller katmanında kontrol yapılırsa bir endpoint unutabilir.
**Etki:** Her liste/tekil sorgusunda zorunlu test. Ay 4 ve Ay 6'da IDOR testleri.

### ADR-007: Access token 15 dakika + refresh 30 gün
**Karar:** Kısa access token, refresh token `validTokens` DB'de hash'li, eşzamanlı oturum limiti 3.
**Gerekçe:** 90 günlük token kabul edilemez. Mevcut `validTokens`/`maxActiveSessions` kolonları kullanıldı.
**Etki:** Refresh akışı zorunlu hale geldi. `sessionService` oluşturuldu.

### ADR-008: 6 haneli kodlar hash'li + deneme limitli
**Karar:** `crypto.randomInt` ile üretim, SHA-256 ile saklama, 5 deneme sonrası geçersizleştirme.
**Gerekçe:** Düz metin kod + sınırsız deneme = hesap çalma. Sağlık verisi taşıyor.
**Etki:** Migration gerekli. Şifre sıfırlama akışı yeniden yazıldı.

### ADR-009: Test ve CI Faz 1'de
**Karar:** 12 aylık solo çalışmada test altyapısı ertelenemez.
**Gerekçe:** Ay 8'de yazdığın kod Ay 9'da bozuldu ve bulamadın = 1 hafta kayıp. Test altyapısı 24 saatlik yatırım.
**Etki:** Her PR CI'da test koşuyor. Kapsam hedefi: Faz 6 sonunda ≥ %75.

### ADR-010: Para birimi kullanıcı tercihi
**Karar:** `TRY` sabit değer kaldırıldı. `preferredCurrency` profile eklendi.
**Gerekçe:** Arap pazarı AED/SAR/EGP kullanıyor. `Intl.NumberFormat` ile gösterim.
**Etki:** Yeni enum/migration. Tüm para alanları 3 haneli kod.

### ADR-011: Storybook tam kapsam değil
**Karar:** Kritik bileşenlerde story (%60). Kalanında yazılmaz.
**Gerekçe:** Storybook kullanıcıya değer üretmiyor. Zaman order yönetimine aktarıldı.
**Etki:** 7 ölü component silindi.

### ADR-012: Dosya yükleme Faz 4'te (planda yoktu)
**Karar:** R2/S3 presigned URL ile hasta fotoğrafı yükleme.
**Gerekçe:** Diş laboratuvarı fotoğrafsız çalışamaz. Bu, ürünü "güzel demo"dan "kullanılabilir ürün"e çeviren özellik.
**Etki:** MVP kapsamına girdi. 80 saat.

### ADR-003 (ek): Manuel smoke script yerine gerçek test
**Karar:** `server/scripts/test/` (interaktif, canlı DB, assertion'sız) silinecek, yerine Vitest + Supertest.
**Gerekçe:** Şu anki "test" CI'da çalışmaz, gerçek kullanıcı oluşturur, assertion içermez.
**Etki:** Faz 1'de. `prisma/seed.ts` ile değiştirilir.

---

## 11. Ekler

### 11.1 Ay 1 (Faz 0) kontrol listesi — hızlı referans
```
□ Sır rotasyonu: Neon, Gmail, JWT_SECRET
□ server/.backup-env silindi
□ .env.example yazıldı
□ forgot-password düzeltildi ve test edildi
□ express-rate-limit kuruldu (7 kural)
□ crypto.randomInt + hashCode
□ Deneme sayacı + migration
□ JWT 15dk + refresh token
□ sessionService (cookie tek yerde)
□ clearCookie düzeltildi
□ authorize() middleware + route'lara bağlandı
□ helmet + CORS env + trust proxy + x-powered-by
□ softProtect 401
□ Prisma hata eşlemesi
□ 3 endpoint validasyonu
□ Logger modülü (9 console.log)
□ Kullanılmayan dependency'ler silindi
□ prisma/seed.ts
□ Tüm testler geçiyor
```

### 11.2 Ay 12 lansman kontrol listesi
```
□ Tüm P0/P1 kapandı
□ Test kapsamı ≥ %75
□ E2E: 8 senaryo geçiyor
□ IDOR testleri geçiyor
□ Güvenlik denetimi temiz
□ gitleaks temiz
□ CSP zorlanıyor
□ Rate limit aktif
□ Yedekleme + GERİ YÜKLEME test edilmiş
□ KVKK/gizlilik/terimler yayında
□ Hesap silme çalışıyor
□ Lighthouse ≥ 90
□ 375px kontrol edildi
□ RTL kontrol edildi
□ Tüm çeviriler tamam
□ Analytics çalışıyor
□ Monitoring + alarm
□ Rollback planı yazılı
□ Smoke test geçti
□ 3 pilot kullanıcı geri bildirimi alındı
□ Gerçek sipariş tamamlandı
```

### 11.3 Saat bütçesi özeti
| Faz | Ay | Saat | Kümülatif |
|-----|-----|------|-----------|
| Faz 0 — Acil güvenlik | Ekim 2026 | 80 | 80 |
| Faz 1 — Altyapı | Kasım 2026 | 70 | 150 |
| Faz 2 — RTL/i18n/mimari | Aralık 2026 | 60 | 210 |
| Faz 3 — Order (Ay 4) | Ocak 2027 | 90 | 300 |
| Faz 3 — Order (Ay 5) | Şubat 2027 | 95 | 395 |
| Faz 3 — Order (Ay 6) | Mart 2027 | 95 | 490 |
| Faz 4 — Dosya/bildirim | Nisan 2027 | 80 | 570 |
| Faz 5 — Mobil/UX | Mayıs 2027 | 70 | 640 |
| Faz 6 — Sıkılaştırma | Haziran-Temmuz 2027 | 160 | 800 |
| Faz 7 — Lansman | Ağustos-Eylül 2027 | 80 | **880** |

**Brüt kapasite:** 52 hafta × 25 saat = 1.300 saat
**Efektif kapasite (%65):** ~845 saat
**Planlanan:** 880 saat
**Fark:** -35 saat (~%4) — **yönetilebilir ama pay yok**

> **Bu, planın neden kapsamı kesmeyi gerektirdiğinin sayısal kanıtı.** Faz 7 (lansman) esnetilebilir; Faz 0 ve Faz 3 değil.

### 11.4 Faydalı kaynaklar
| Konu | Kaynak |
|------|--------|
| OWASP ASVS | https://owasp.org/www-project-application-security-verification-standard/ |
| OWASP Top 10 | https://owasp.org/www-project-top-ten/ |
| Next.js i18n | https://next-intl.dev |
| React Query | https://tanstack.com/query |
| Vercel React best practices | (projede `.agents/skills/vercel-react-best-practices`) |
| RTL CSS | https://rtlstyling.com |
| Vitest | https://vitest.dev |
| Playwright | https://playwright.dev |
| KVKK | https://www.kvkk.gov.tr |

---

## 12. Revizyon Geçmişi

| Versiyon | Tarih | Değişiklik |
|----------|-------|-----------|
| 1.0 | 2026-09-29 | İlk sürüm. Mevcut durum analizi, 12 aylık yol haritası, ADR'ler. |

---

**Bu doküman yaşayan bir belgedir. Her ay sonunda güncellenir.**

*Hazırlayan: Usama — tek geliştirici, 12 ay, gerçek bir ürün.*
