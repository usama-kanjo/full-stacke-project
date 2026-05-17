# KanjoLab - Diş Protez Laboratuvarı Sipariş Yönetim Sistemi

*Dentistler ve laboratuvar teknisyenleri arasında diş protez siparişlerini yönetmek için web tabanlı platform.*

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

### Veritabanı Şeması

- **User** → email, şifre, rol, doğrulama durumu
- **Dentist** → dişçi profili (klinik adı, adres, telefon)
- **Technician** → teknisyen profili (laboratuvar adı, uzmanlıklar)
- **Order** → sipariş (hasta, diş numarası, iş tipi, renk, durum, fiyat, deadline)

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

### Database Schema

- **User** → email, password, role, verification status
- **Dentist** → clinic name, address, phone
- **Technician** → lab name, specialties
- **Order** → patient info, tooth number, work type, shade, status, price, deadline
