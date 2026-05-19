# KanjoLab - Dental Lab Order Management System

*A web-based platform for managing dental prosthesis orders between dentists and laboratory technicians.*

---

## 🇬🇧 English

### What is this project?

**KanjoLab** is a comprehensive **dental lab order management system** that digitizes the workflow between dentists and laboratory technicians. It consists of a Next.js client and an Express server.

### Features

- **User Management:** Registration, login, email verification (6-digit code), password reset, profile completion
- **Role-Based System:** Dentist (DENTIST) and Lab Technician (LAB_TECHNICIAN) roles
- **Dentist Panel:** Clinic management, order creation for prosthetic work
- **Technician Panel:** Lab management, specialties
- **Order Management:** Work type, tooth number, shade code, urgency, pricing, deadline tracking
- **Email Notifications:** Verification codes and password reset via Gmail SMTP or offline console mode

### Tech Stack

#### Client
- **Next.js 16 & React 19** with TypeScript — SSR/RSC support
- **Axios** — HTTP client
- **Sonner** — Toast notifications

#### Server
- **Node.js & Express.js 5** — ESM modules
- **PostgreSQL & Prisma ORM** — Database & migrations
- **JWT & cookie-parser** — Auth & session management
- **bcryptjs** — Password hashing
- **express-validator** — Input validation
- **nodemailer** — Email (Gmail SMTP)

### API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/v1/user/register` | Register a new user |
| POST | `/api/v1/user/login` | Login |
| POST | `/api/v1/user/verify-email` | Verify email with 6-digit code |
| POST | `/api/v1/user/resend-code` | Resend verification code |
| POST | `/api/v1/user/logout` | Logout |
| POST | `/api/v1/user/complete-profile` | Complete profile (select role) |
| PUT | `/api/v1/user/change-password` | Change password |
| POST | `/api/v1/user/forgot-password` | Request password reset code |
| POST | `/api/v1/user/reset-password` | Reset password with code |
| GET/PUT | `/api/v1/dentist/profile` | Dentist profile |
| GET/PUT | `/api/v1/technician/profile` | Technician profile |

### How to Run

```bash
# 1. Start the server
cd server
cp .env.example .env    # Edit .env file
npm install
npx prisma migrate dev  # Run database migrations
npm run dev             # http://localhost:3000

# 2. Start the client
cd client
npm install
npm run dev             # http://localhost:3001
```

### Code Generation (Plop)

The client uses **Plop** to scaffold components following the Atomic Design pattern.

| Command | Creates |
|---|---|
| `yarn plop` | Interactive — choose a generator |
| `yarn plop:atom` | `src/components/atoms/ComponentName/` (index.tsx + .module.css + .stories.tsx) |
| `yarn plop:molecule` | `src/components/molecules/ComponentName/` (same 3 files) |
| `yarn plop:organism` | `src/components/organisms/ComponentName/` (same 3 files) |
| `yarn plop:page` | `src/app/page-name/page.tsx` (page only) |

Example:
```bash
yarn plop:atom        # Prompts: "Component name (PascalCase):"
# Enter: Button
# → src/components/atoms/Button/index.tsx
# → src/components/atoms/Button/Button.module.css
# → src/components/atoms/Button/Button.stories.tsx
```

### Database Schema

- **User** → email, password, role, verification status
- **Dentist** → clinic name, address, phone
- **Technician** → lab name, specialties
- **Order** → patient info, tooth number, work type, shade, status, price, deadline

---

## 🇹🇷 Türkçe

### Bu Projede Ne Var?

**KanjoLab**, diş hekimleri (dentist) ve laboratuvar teknisyenleri arasındaki protez sipariş sürecini dijitalleştiren tam kapsamlı bir sipariş yönetim sistemidir. İstemci (Next.js) ve sunucu (Express) olmak üzere iki ana bölümden oluşur.

### Özellikler

- **Kullanıcı Yönetimi:** Kayıt, giriş, email doğrulama (6 haneli kod), şifre sıfırlama, profil tamamlama
- **Rol Tabanlı Sistem:** Dişçi (DENTIST) ve laboratuvar teknisyeni (LAB_TECHNICIAN) rolleri
- **Dişçi Paneli:** Klinik bilgileri yönetimi, protez siparişi oluşturma
- **Teknisyen Paneli:** Laboratuvar bilgileri yönetimi, uzmanlık alanları
- **Sipariş Yönetimi:** Vakaya özel iş tanımı, diş numarası, renk kodu, aciliyet durumu, fiyatlandırma, deadline takibi
- **Email Bildirimleri:** Doğrulama kodu ve şifre sıfırlama email gönderimi (Gmail SMTP / OFFLINE konsol modu)

### Kullanılan Teknolojiler

#### Client (İstemci - Frontend)
- **Next.js 16 & React 19** — TypeScript ile modern, SSR/RSC destekli arayüz
- **Axios** — API haberleşmesi
- **Sonner** — Kullanıcı bildirimleri (toast)

#### Server (Sunucu - Backend)
- **Node.js & Express.js 5** — ESM modül sistemi ile modern sunucu
- **PostgreSQL & Prisma ORM** — Veritabanı yönetimi ve migrasyonlar
- **JWT & cookie-parser** — Oturum yönetimi ve kimlik doğrulama
- **bcryptjs** — Şifre hash'leme
- **express-validator** — Veri doğrulama
- **nodemailer** — Email gönderimi (Gmail SMTP)
- **date-fns** — Tarih işlemleri

### API Uç Noktaları

| Metot | Route | Açıklama |
|-------|-------|----------|
| POST | `/api/v1/user/register` | Kayıt ol |
| POST | `/api/v1/user/login` | Giriş yap |
| POST | `/api/v1/user/verify-email` | Email doğrula |
| POST | `/api/v1/user/resend-code` | Doğrulama kodunu yeniden gönder |
| POST | `/api/v1/user/logout` | Çıkış yap |
| POST | `/api/v1/user/complete-profile` | Profili tamamla (rol seç) |
| PUT | `/api/v1/user/change-password` | Şifre değiştir |
| POST | `/api/v1/user/forgot-password` | Şifre sıfırlama kodu gönder |
| POST | `/api/v1/user/reset-password` | Şifre sıfırla |
| GET/PUT | `/api/v1/dentist/profile` | Dişçi profili |
| GET/PUT | `/api/v1/technician/profile` | Teknisyen profili |

### Nasıl Çalıştırılır?

```bash
# 1. Sunucuyu başlat
cd server
cp .env.example .env    # .env dosyasını düzenleyin
npm install
npx prisma migrate dev  # Veritabanı migrasyonu
npm run dev             # http://localhost:3000

# 2. İstemciyi başlat
cd client
npm install
npm run dev             # http://localhost:3001
```

### Code Generation (Plop) — Bileşen Oluşturma

Client projesinde **Plop** ile Atomic Design bileşenlerini hızlıca oluşturabilirsin.

| Komut | Ne oluşturur? |
|---|---|
| `yarn plop` | Interaktif — generator seçmeni bekler |
| `yarn plop:atom` | `src/components/atoms/BilesenAdi/` (index.tsx + .module.css + .stories.tsx) |
| `yarn plop:molecule` | `src/components/molecules/BilesenAdi/` (aynı 3 dosya) |
| `yarn plop:organism` | `src/components/organisms/BilesenAdi/` (aynı 3 dosya) |
| `yarn plop:page` | `src/app/sayfa-adi/page.tsx` (sadece sayfa) |

Örnek:
```bash
yarn plop:atom
# Sorus: "Component name (PascalCase):"
# Cevap: Button
# → src/components/atoms/Button/index.tsx
# → src/components/atoms/Button/Button.module.css
# → src/components/atoms/Button/Button.stories.tsx
```

### Veritabanı Şeması

- **User** → email, şifre, rol, doğrulama durumu
- **Dentist** → dişçi profili (klinik adı, adres, telefon)
- **Technician** → teknisyen profili (laboratuvar adı, uzmanlıklar)
- **Order** → sipariş (hasta, diş numarası, iş tipi, renk, durum, fiyat, deadline)
