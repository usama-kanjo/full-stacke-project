# KanjoLab - Dental Lab Order Management System

*A web-based platform for managing dental prosthesis orders between dentists and laboratory technicians.*

Current branch: **`refactor/frontend-rewrite`** — Frontend being rewritten from scratch using Atomic Design Pattern.

---

## 🇬🇧 English

### What is this project?

**KanjoLab** is a comprehensive **dental lab order management system** that digitizes the workflow between dentists and laboratory technicians. It consists of a Next.js client and an Express server.

### Current Status

- **Backend** (Express 5 + Prisma + PostgreSQL) — **Fully working**, all auth and profile endpoints complete
- **Frontend** (Next.js 16 + React 19) — **Being rewritten** with Atomic Design Pattern. Design system, all atoms, and core molecules are built; pages and auth flows are in progress

### What's Built (Frontend)

#### Design System
- **Design Tokens** — Centralized colors, spacing, typography, z-index, transitions
- **Premium Dental Lab Palette** — Warm gold/terracotta/cream tones, Lalezar + Fraunces + Sora typography

#### Atoms (7/7 complete)
Button, Badge, Input, Label, Icon, Spinner, Typography

#### Molecules (10/10 complete)
FormField, PasswordInput, Card, Avatar, Toast, Modal, Tabs, Dropdown, Checkbox, Toggle

#### Next (In Progress)
- Auth pages (Login, Register, Email Verification, Password Reset)
- Dashboard layout (Header + Sidebar)
- AuthContext + API client
- Organism components

### Tech Stack

#### Client (Frontend)
- **Next.js 16 & React 19** with TypeScript — App Router
- **CSS Modules** — Component-scoped styling
- **Atomic Design Pattern** — `atoms/` → `molecules/` → `organisms/` → `templates/` → `pages/`
- **Storybook 10** — Component development & documentation
- **Plop** — Code scaffolding for consistent components
- **zod** — Client-side form validation
- **@antfu/eslint-config** — Code quality

#### Server (Backend — Complete)
- **Node.js & Express.js 5** — ESM modules
- **PostgreSQL & Prisma ORM** — Database & migrations
- **JWT & cookie-parser** — Auth & session management
- **bcryptjs** — Password hashing
- **express-validator** — Input validation
- **nodemailer** — Email (Gmail SMTP)

#### Planned Dependencies
- **Axios** — HTTP client (planned)
- **Sonner** — Toast notifications (planned)
- **Socket.IO** — Real-time notifications (planned)
- **next-intl / react-i18next** — Arabic + English i18n (planned)

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

**Important:** This project uses **yarn** as package manager — never use npm.

```bash
# 1. Install dependencies (root + workspaces)
yarn install

# 2. Start the server (port 3000)
yarn server

# 3. Start the client (port 3001, separate terminal)
yarn client

# Or run both together
yarn dev
```

#### Storybook (UI Component Development)
```bash
yarn workspace client storybook
# → http://localhost:6006
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
yarn plop:atom
# → "Component name (PascalCase):" → Button
# → src/components/atoms/Button/index.tsx
# → src/components/atoms/Button/Button.module.css
# → src/components/atoms/Button/Button.stories.tsx
```

### Database Schema

- **User** → email, password, role, verification status
- **Dentist** → clinic name, address, phone
- **Technician** → lab name, specialties
- **Order** → patient info, tooth number, work type, shade, status, price, deadline

### GitHub Issues

All open issues are tracked in the [memory bank](memory-bank/activeContext.md) and synced with GitHub. When a PR/commit references an issue (e.g., `Closes #5`), it's automatically accepted.

### Project Rules
- **Package Manager:** yarn ONLY — never use npm
- **Branch Scope:** Only work on the current branch's scope to avoid merge conflicts

---

## 🇹🇷 Türkçe

### Bu Projede Ne Var?

**KanjoLab**, diş hekimleri (dentist) ve laboratuvar teknisyenleri arasındaki protez sipariş sürecini dijitalleştiren tam kapsamlı bir sipariş yönetim sistemidir. İstemci (Next.js) ve sunucu (Express) olmak üzere iki ana bölümden oluşur.

### Mevcut Durum

- **Backend** (Express 5 + Prisma + PostgreSQL) — **Tamamen çalışıyor**, tüm auth ve profil endpoint'leri hazır
- **Frontend** (Next.js 16 + React 19) — **Yeniden yazılıyor**, Atomic Design Pattern ile. Tüm atom ve molekül bileşenleri tamam, sayfalar ve auth akışı geliştirme aşamasında

### Ne Yapıldı? (Frontend)

#### Tasarım Sistemi
- **Design Tokens** — Merkezi renk, spacing, tipografi, z-index, transition tanımları
- **Premium Dental Lab Paleti** — Sıcak altın/terakota/krem tonları, Lalezar + Fraunces + Sora tipografi

#### Atomlar (7/7 tamam)
Button, Badge, Input, Label, Icon, Spinner, Typography

#### Moleküller (10/10 tamam)
FormField, PasswordInput, Card, Avatar, Toast, Modal, Tabs, Dropdown, Checkbox, Toggle

#### Sıradaki (Geliştiriliyor)
- Auth sayfaları (Giriş, Kayıt, Email Doğrulama, Şifre Sıfırlama)
- Dashboard layout (Header + Sidebar)
- AuthContext + API client
- Organism bileşenleri

### Kullanılan Teknolojiler

#### Client (İstemci — Frontend)
- **Next.js 16 & React 19** — TypeScript ile, App Router
- **CSS Modules** — Bileşen bazlı stillendirme
- **Atomic Design Pattern** — `atoms/` → `molecules/` → `organisms/` → `templates/` → `pages/`
- **Storybook 10** — Bileşen geliştirme & dokümantasyon
- **Plop** — Kod iskelet oluşturma aracı
- **zod** — Form validasyonu
- **@antfu/eslint-config** — Kod kalitesi

#### Server (Sunucu — Backend, Tamamlandı)
- **Node.js & Express.js 5** — ESM modül sistemi
- **PostgreSQL & Prisma ORM** — Veritabanı yönetimi ve migrasyonlar
- **JWT & cookie-parser** — Oturum yönetimi ve kimlik doğrulama
- **bcryptjs** — Şifre hash'leme
- **express-validator** — Veri doğrulama
- **nodemailer** — Email gönderimi (Gmail SMTP)

#### Planlanan Bağımlılıklar
- **Axios** — HTTP client (planlandı)
- **Sonner** — Toast bildirimleri (planlandı)
- **Socket.IO** — Gerçek zamanlı bildirimler (planlandı)
- **next-intl / react-i18next** — Arapça + İngilizce dil desteği (planlandı)

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

**Önemli:** Bu proje **yarn** paket yöneticisini kullanır — npm kullanmayın.

```bash
# 1. Bağımlılıkları yükle (kök + workspace'ler)
yarn install

# 2. Sunucuyu başlat (port 3000)
yarn server

# 3. İstemciyi başlat (port 3001, ayrı terminal)
yarn client

# Veya ikisini birlikte çalıştır
yarn dev
```

#### Storybook (UI Bileşen Geliştirme)
```bash
yarn workspace client storybook
# → http://localhost:6006
```

### Code Generation (Plop) — Bileşen Oluşturma

| Komut | Ne oluşturur? |
|---|---|
| `yarn plop` | Interaktif — generator seçmeni bekler |
| `yarn plop:atom` | `src/components/atoms/BilesenAdi/` (index.tsx + .module.css + .stories.tsx) |
| `yarn plop:molecule` | `src/components/molecules/BilesenAdi/` (aynı 3 dosya) |
| `yarn plop:organism` | `src/components/organisms/BilesenAdi/` (aynı 3 dosya) |
| `yarn plop:page` | `src/app/sayfa-adi/page.tsx` (sadece sayfa) |

### Veritabanı Şeması

- **User** → email, şifre, rol, doğrulama durumu
- **Dentist** → dişçi profili (klinik adı, adres, telefon)
- **Technician** → teknisyen profili (laboratuvar adı, uzmanlıklar)
- **Order** → sipariş (hasta, diş numarası, iş tipi, renk, durum, fiyat, deadline)

### GitHub Issue'lar

Tüm açık issue'lar [memory bank](memory-bank/activeContext.md)'te takip edilir ve GitHub ile senkronizedir. Bir PR/commit bir issue'ya referans verdiğinde (örn. `Closes #5`), otomatik olarak kabul edilir.

### Proje Kuralları
- **Paket Yöneticisi:** Sadece yarn — npm kullanmayın
- **Branch Scope:** Sadece mevcut branch'in kapsamındaki işler yapılır, merge conflict'lerini önlemek için
