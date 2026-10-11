# KanjoLab Server — Arka Uç (Backend)

[**English**](../../server/README.md) | **Türkçe** | [**العربية**](README.ar.md)

*KanjoLab için Express.js 5 arka ucu — API, kimlik doğrulama ve veritabanı katmanı (tamamen çalışıyor).*

---

## Genel Bakış

Sunucu, **TypeScript (ESM)** ile yazılmış bir **Express.js 5** uygulamasıdır. Veritabanı için **PostgreSQL** ile **Prisma ORM 7**, kimlik doğrulama için **JWT** (httpOnly cookie + Bearer yedek), şifre hash'leme için **bcryptjs**, girdi doğrulama için **express-validator** ve email gönderimi için **nodemailer** kullanır.

**Mevcut durum:** Tamamen çalışıyor — tüm auth ve profil endpoint'leri hazır. Frontend bu API'ye uyumlu olarak yeniden yazılıyor.

## Kullanılan Teknolojiler

- **Runtime:** Node.js (ESM, `"type": "module"`)
- **Framework:** Express.js 5
- **Dil:** TypeScript
- **Veritabanı:** PostgreSQL via Prisma ORM 7 (`@prisma/adapter-pg`)
- **Auth:** jsonwebtoken 9 (httpOnly cookie + Bearer yedek), bcryptjs
- **Doğrulama:** express-validator 7
- **Email:** nodemailer 8 (Gmail SMTP, ONLINE/OFFLINE modları)
- **Dev Araçları:** tsx (watch modu), Prisma Studio

## Proje Yapısı

```
server/
├── prisma/                 # Prisma şeması + migrasyonlar
├── prisma.config.ts        # Prisma CLI datasource yapılandırması
├── scripts/                # Yardımcı script'ler (test, hash)
└── src/
    ├── config/             # DB bağlantısı (Prisma), JWT yapılandırması
    ├── controllers/        # İstek işleyicileri (ince, servislere delege eder)
    ├── generated/          # Üretilen Prisma client
    ├── middlewares/        # Auth (protect/softProtect), hata yönetimi
    ├── routes/v1/          # Route tanımları
    │   ├── userRoute.ts
    │   ├── dentistRoute.ts
    │   └── technicianRoute.ts
    ├── services/           # İş mantığı (auth, user, profiller, email)
    ├── types/              # Express tip eklemeleri (req.user)
    ├── utils/              # ApiError sınıfı
    ├── validators/         # express-validator zincirleri
    └── index.ts            # Giriş noktası
```

## Kullanılabilir Script'ler

| Script | Açıklama |
|--------|----------|
| `yarn dev` | Dev sunucusunu hot-reload ile başlatır (**port 3000**) |
| `yarn dev:offline` | Dev sunucusunu offline email modunda başlatır (kodlar → konsol) |
| `yarn build` | TypeScript'i derler |
| `yarn start` | Derler + production modunda çalıştırır |
| `yarn test` | Derlenmiş test takımını çalıştırır |
| `yarn hash` | Şifre hash'i üretir |
| `yarn lint` | Kaynak kodu lint'ler |
| `yarn typecheck` | TypeScript tip kontrolü (`tsc --noEmit`) |
| `yarn db:generate` | Prisma client'ı yeniden üretir |
| `yarn db:migrate` | Geliştirme migrasyonlarını çalıştırır |
| `yarn db:migrate:prod` | Production migrasyonlarını çalıştırır |
| `yarn db:push` | Şemayı veritabanına iletir |
| `yarn db:studio` | Prisma Studio'yu açar (**port 5555**) |
| `yarn db:seed` | Veritabanını seed'ler |

## Ortam Değişkenleri

Sunucu kökünde `.env.example` dosyasını `.env` olarak kopyalayın:

```bash
cp server/.env.example server/.env
```

| Değişken | Açıklama |
|----------|----------|
| `PORT` / `NODE_ENV` | Sunucu portu (varsayılan 3000) ve ortam |
| `DATABASE_URL` | PostgreSQL bağlantı dizesi |
| `JWT_SECRET` | JWT imza gizli anahtarı (`openssl rand -hex 32`) |
| `JWT_EXPIRES_IN` | Erişim token'ı süresi (varsayılan `15m`) |
| `JWT_REFRESH_EXPIRES_IN` | Yenileme token'ı süresi (varsayılan `30d`) |
| `JWT_COOKIE_EXPIRES` / `COOKIE_DOMAIN` | Cookie ömrü ve domain |
| `EMAIL_USERNAME` / `EMAIL_PASSWORD` | Gmail SMTP uygulama kimlik bilgileri |
| `SEND_MSG_METHOD` | `ONLINE` (gerçek email) veya `OFFLINE` (konsola log) |
| `COMPANY_NAME` / `SUPPORT_EMAIL` | Gönderen kimliği ve destek iletişimi |
| `BASE_URL` | Emaillerdeki linkler için client temel URL'si |
| `CORS_ORIGINS` | İzin verilen origin'lerin virgülle ayrılmış listesi |
| `S3_*` | S3 depolama yapılandırması (Faz 8, opsiyonel) |
| `SENTRY_DSN` | Sentry hata takibi (Faz 2, opsiyonel) |

## API Uç Noktaları

**Temel URL:** `http://localhost:3000/api/v1`

### User / Auth

| Metot | Route | Açıklama |
|-------|-------|----------|
| POST | `/api/v1/user/register` | Yeni kullanıcı kaydı |
| POST | `/api/v1/user/login` | Giriş yap |
| POST | `/api/v1/user/verify-email` | 6 haneli kod ile email doğrula |
| POST | `/api/v1/user/resend-code` | Doğrulama kodunu yeniden gönder |
| POST | `/api/v1/user/logout` | Çıkış yap |
| POST | `/api/v1/user/complete-profile` | Profili tamamla (rol seç) |
| PUT | `/api/v1/user/change-password` | Şifre değiştir |
| POST | `/api/v1/user/forgot-password` | Şifre sıfırlama kodu iste |
| POST | `/api/v1/user/reset-password` | Kod ile şifre sıfırla |

### Dentist

| Metot | Route | Açıklama |
|-------|-------|----------|
| GET | `/api/v1/dentist/profile` | Dişçi profilini getir |
| PUT | `/api/v1/dentist/profile` | Dişçi profilini güncelle |

### Technician

| Metot | Route | Açıklama |
|-------|-------|----------|
| GET | `/api/v1/technician/profile` | Teknisyen profilini getir |
| PUT | `/api/v1/technician/profile` | Teknisyen profilini güncelle |

Tam istek/yanıt dokümantasyonu: [`../../wiki/API-Documentation.md`](../../wiki/API-Documentation.md).

## Veritabanı (Prisma)

Şemayı sekiz migrasyon takip eder:

1. `init` — İlk şema
2. `update_relations_to_one_to_many` — İlişki düzeltmeleri
3. `add_role_to_user` — User'a rol alanı
4. `fix_user_role_relation` — İlişki düzeltmesi
5. `sifirdan_yabildi` — Şema yeniden kurulumu
6. `user_add_email_verification_code` — Email doğrulama alanları
7. `editing_role` — Rol enum/alansal düzenlemeler
8. `add_token_management` — Token yönetimi eklemeleri

### Modeller

- **User** — email, passwordHash, rol, doğrulama ve token alanları
- **Dentist** — fullName, phone, clinicName, clinicAddress, clinicCity, orders[]
- **Technician** — fullName, phone, labName, labAddress, labCity, specialties[], orders[]
- **Order** — hasta bilgisi, toothNumber, workType, shade, status (enum), price, deadline

## Test & Kalite

```bash
yarn lint       # ESLint
yarn typecheck  # TypeScript strict kontrol
yarn test       # Derlenmiş test takımı
```

## İlgili Bağlantılar

- [Ana README](../../README.md)
- [Client README](../../client/README.md)
- [API Dokümantasyonu](../../wiki/API-Documentation.md)