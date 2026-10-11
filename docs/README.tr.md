# KanjoLab — Diş Protez Laboratuvarı Sipariş Yönetim Sistemi

[**English**](../README.md) | **Türkçe** | [**العربية**](README.ar.md)

*Diş hekimleri ile laboratuvar teknisyenleri arasındaki protez sipariş sürecini yönetmek için web tabanlı bir platform.*

---

## İçindekiler

- [Bu proje nedir?](#bu-proje-nedir)
- [Mevcut Durum](#mevcut-durum)
- [Özellikler](#özellikler)
- [Kullanılan Teknolojiler](#kullanılan-teknolojiler)
- [Proje Yapısı](#proje-yapısı)
- [Hızlı Başlangıç](#hızlı-başlangıç)
- [Kullanılabilir Script'ler](#kullanılabilir-scriptler)
- [API Uç Noktaları](#api-uç-noktaları)
- [Code Generation (Plop)](#code-generation-plop)
- [Veritabanı Şeması](#veritabanı-şeması)
- [Dokümantasyon](#dokümantasyon)
- [Proje Kuralları](#proje-kuralları)
- [Lisans](#lisans)

---

## Bu proje nedir?

**KanjoLab**, diş hekimleri ile laboratuvar teknisyenleri arasındaki protez sipariş sürecini dijitalleştiren kapsamlı bir **diş protez laboratuvarı sipariş yönetim sistemidir**. Diş hekimleri, protez/diş iş siparişlerini oluşturur ve oluşturuldukları andan tamamlanana kadar tüm durum takibiyle birlikte doğrudan laboratuvar teknisyenlerine atar.

Bu depo, iki paket içeren bir **monorepo**dur (`yarn workspaces`):

| Paket | Yol | Açıklama |
|-------|-----|----------|
| **client** | [`client/`](../client/README.md) | Next.js 16 ön uç (Atomic Design Pattern) |
| **server** | [`server/`](../server/README.md) | Express.js 5 arka uç (API, kimlik doğrulama, veritabanı) |

## Mevcut Durum

- **Backend** (Express 5 + Prisma + PostgreSQL) — **Tamamen çalışıyor**, tüm auth ve profil endpoint'leri hazır
- **Frontend** (Next.js 16 + React 19) — **Yeniden yazılıyor**, Atomic Design Pattern ile. Tasarım sistemi, tüm atom, molekül ve organizma bileşenleri tamamlandı; auth akışı, dashboard, profil ve ayarlar sayfaları bitti. Sıradaki: sipariş (order) yönetimi.

## Özellikler

- **Güvenli Kimlik Doğrulama** — Kayıt, giriş, 6 haneli kod ile email doğrulama, şifre sıfırlama
- **Rol Tabanlı Erişim** — Dişçi ve Laborant rolleri, ayrı profiller ve görünümler
- **Profil Yönetimi** — Kayıt sonrası role özel alanlarla profili tamamlama (dişçi için klinik bilgileri, teknisyen için laboratuvar bilgileri)
- **Dashboard** — Rol tabanlı menü, profil görüntüleme/düzenleme ve ayarlar sayfaları
- **Sipariş Yönetimi** — *(yakında)* — Diş protez iş siparişleri oluşturma, atama, takip ve tamamlama
- **Email Bildirimleri** — Doğrulama kodları ve şifre sıfırlama emailleri SMTP üzerinden (gerçek veya konsola yazdırma modu)
- **Bileşen Sistemi** — Storybook, Plop iskelet oluşturucu, tasarım token'ları ve zod doğrulama

## Kullanılan Teknolojiler

#### Client (İstemci — Frontend, Geliştiriliyor)

- **Next.js 16 & React 19** — TypeScript ile, App Router
- **CSS Modules** — Bileşen bazlı stillendirme
- **Atomic Design Pattern** — `atoms/` → `molecules/` → `organisms/` → `templates/` → `pages/`
- **Axios** — Interceptor'lı HTTP client
- **Sonner** — Toast bildirimleri
- **Storybook 10** — Bileşen geliştirme & dokümantasyon
- **Plop** — Kod iskelet oluşturma aracı
- **zod** — Form doğrulaması
- **@antfu/eslint-config** — Kod kalitesi

#### Server (Sunucu — Backend, Tamamlandı)

- **Node.js & Express.js 5** — ESM modül sistemi
- **PostgreSQL & Prisma ORM v7** — Veritabanı yönetimi ve migrasyonlar
- **JWT & cookie-parser** — Oturum yönetimi ve kimlik doğrulama (httpOnly cookie + Bearer yedek)
- **bcryptjs** — Şifre hash'leme
- **express-validator** — Veri doğrulama
- **nodemailer** — Email gönderimi (Gmail SMTP, ONLINE/OFFLINE modları)

#### Planlanan Bağımlılıklar

- **Socket.IO** — Gerçek zamanlı bildirimler (planlandı)
- **next-intl / react-i18next** — Arapça + İngilizce arayüz dili desteği (planlandı)

## Proje Yapısı

```
authInMern/
├── client/                     # Next.js 16 ön uç
│   └── src/
│       ├── app/                # Sayfalar (App Router)
│       ├── assets/             # Statik dosyalar (fontlar, vb.)
│       ├── components/
│       │   ├── atoms/          # En küçük UI birimleri (Button, Input, vb.)
│       │   ├── molecules/      # Atomların birleşimi (FormField, Card, vb.)
│       │   ├── organisms/      # Karmaşık bölümler (AuthModal, Header, vb.)
│       │   ├── templates/      # Sayfa düzenleri (Auth, Dashboard)
│       │   └── pages/          # Tam sayfa bileşenleri
│       ├── tokens/             # Tasarım token'ları (renk, spacing, tipografi)
│       ├── types/              # TypeScript tip tanımları
│       ├── lib/                # API client, zod şemaları
│       ├── services/           # API servis katmanı
│       ├── hooks/              # Özel React hook'ları
│       └── context/            # React Context sağlayıcıları
├── server/                     # Express.js arka uç
│   └── src/
│       ├── config/             # DB & JWT yapılandırması
│       ├── controllers/        # İstek işleyicileri
│       ├── middlewares/        # Auth, hata, doğrulama
│       ├── routes/v1/          # API route tanımları
│       ├── services/           # İş mantığı
│       ├── types/              # TypeScript tip eklemeleri
│       ├── utils/              # ApiError sınıfı
│       └── validators/         # express-validator zincirleri
├── wiki/                       # Proje dokümantasyonu (Home, Installation, API, FAQ…)
├── docs/                       # Çevrilmiş README'ler (English, العربية)
└── memory-bank/                # Proje dokümantasyonu ve issue takibi
```

## Hızlı Başlangıç

**Önemli:** Bu proje **yarn** paket yöneticisini kullanır — npm kullanmayın.

```bash
# 1. Depoyu klonla ve bağımlılıkları yükle (kök + workspace'ler)
git clone https://github.com/usama-kanjo/full-stacke-project.git
cd authInMern
yarn install

# 2. Ortam değişkenlerini ayarla
cp server/.env.example server/.env
echo "NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1" > client/.env.local

# 3. Veritabanı migrasyonlarını çalıştır
cd server
yarn db:migrate
cd ..

# 4. Sunucuyu başlat (port 3000)
yarn server

# 5. İstemciyi başlat (port 3001, ayrı terminal)
yarn client

# Veya ikisini birlikte çalıştır
yarn dev
```

Ayrıntılı kurulum için [Kurulum Rehberi](../wiki/Installation.md)'ne bakın.

#### Storybook (UI Bileşen Geliştirme)

```bash
yarn workspace client storybook
# → http://localhost:6006
```

## Kullanılabilir Script'ler

### Kök (yarn workspaces)

| Script | Açıklama |
|--------|----------|
| `yarn dev` | Sunucu + istemciyi birlikte çalıştırır |
| `yarn server` | Sunucu dev modu (port 3000) |
| `yarn client` | İstemci dev modu (port 3001) |
| `yarn build` | Tüm workspace'leri derler |
| `yarn lint` | Tüm workspace'leri lint'ler |
| `yarn typecheck` | Tüm workspace'leri tip kontrolünden geçirir |
| `yarn validate` | Lint + typecheck + gitleaks sır taraması |

Tam script referansı: [`client/README.md`](../client/README.md) ve [`server/README.md`](../server/README.md).

## API Uç Noktaları

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

Tüm istek/yanıt örnekleri: [`wiki/API-Documentation.md`](../wiki/API-Documentation.md).

## Code Generation (Plop)

İstemci, Atomic Design paternine uygun bileşen oluşturmak için **Plop** kullanır.

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
# → "Component name (PascalCase):" → Button
# → src/components/atoms/Button/index.tsx
# → src/components/atoms/Button/Button.module.css
# → src/components/atoms/Button/Button.stories.tsx
```

## Veritabanı Şeması

- **User** → email, şifre, rol, doğrulama durumu
- **Dentist** → dişçi profili (klinik adı, adres, telefon)
- **Technician** → teknisyen profili (laboratuvar adı, uzmanlıklar)
- **Order** → sipariş (hasta, diş numarası, iş tipi, renk, durum, fiyat, deadline)

## Dokümantasyon

Detaylı rehberler için [`wiki/`](../wiki/) klasörüne bakın:

| Doküman | Açıklama |
|---------|----------|
| [Kurulum Rehberi](../wiki/Installation.md) | Adım adım kurulum talimatları |
| [API Dokümantasyonu](../wiki/API-Documentation.md) | İstek/yanıt örnekleriyle tüm endpoint'ler |
| [Kullanıcı Rehberi](../wiki/User-Guide.md) | Uçtan uca kullanım rehberi |
| [SSS](../wiki/FAQ.md) | Sıkça sorulan sorular |

### README Çevirileri (📄 Docs)

| Dil | Dosya |
|-----|-------|
| **English** | [`../README.md`](../README.md) |
| **العربية** | [`README.ar.md`](README.ar.md) |

## Proje Kuralları

- **Paket Yöneticisi:** Sadece yarn — npm kullanmayın
- **Branch Scope:** Sadece mevcut branch'in kapsamındaki işler yapılır, merge conflict'lerini önlemek için
- **Branch Per Change:** Her iş için ayrı branch açılır, `--no-ff` ile merge edilir
- **Kod Kalitesi:** TypeScript strict, `any` yok, sadece named export'lar; `yarn validate` ile lint + typecheck zorunlu

## Lisans

ISC — bkz. [LICENSE](../LICENSE)