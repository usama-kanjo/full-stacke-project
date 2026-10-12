# KanjoLab Client — Ön Yüz (Frontend)

[**English**](../../client/README.md) | **Türkçe** | [**العربية**](README.ar.md)

*KanjoLab için Next.js 16 ön yüzü — Atomic Design Pattern ile geliştiriliyor.*

---

## Genel Bakış

Client, **Next.js 16 (App Router) + React 19** ile yazılmış, **TypeScript** (strict mod) tabanlı bir uygulamadır. **Atomic Design Pattern** kullanır, **CSS Modules** ile bileşen bazlı stillendirme yapar; merkezi **design token** sistemi, form doğrulama için **zod**, API çağrıları için **Axios** ve toast bildirimleri için **Sonner** kullanır.

**Mevcut durum:** Tasarım sistemi ve tüm auth bileşenleri tamamlandı. Auth akışı, dashboard, profil ve ayarlar sayfaları bitti. Sıradaki: sipariş yönetimi.

## Kullanılan Teknolojiler

- **Framework:** Next.js 16 (App Router), React 19
- **Dil:** TypeScript (strict)
- **Stil:** CSS Modules + design token'ları (renk, spacing, tipografi, z-index, transition)
- **Mimari:** Atomic Design Pattern (`atoms` → `molecules` → `organisms` → `templates` → `pages`)
- **HTTP Client:** Axios (interceptor'larla)
- **Bildirimler:** Sonner (toast)
- **Doğrulama:** zod (`lib/schemas/` içinde merkezi şemalar)
- **Bileşen Geliştirme:** Storybook 10
- **Kod İskeleti:** Plop
- **Lint:** @antfu/eslint-config (sadece named export'lar)

## Proje Yapısı

```
client/src/
├── app/                    # Next.js App Router sayfaları
│   ├── layout.tsx          # Kök layout (AuthProvider + Toaster)
│   ├── page.tsx            # "/" → AuthTemplate + AuthModal
│   └── dashboard/          # Dashboard (Home, Profile, Settings)
├── assets/                 # Statik dosyalar (fontlar, vb.)
├── components/
│   ├── atoms/              # En küçük UI birimleri
│   ├── molecules/          # Atomların birleşimleri
│   ├── organisms/          # Karmaşık bölümler
│   ├── templates/          # Sayfa düzenleri
│   ├── pages/              # Tam sayfa bileşenleri
│   └── index.ts            # Barrel export
├── tokens/                 # Design token'ları (renk, spacing, tipografi)
├── types/                  # TypeScript tip tanımları
├── lib/                    # API client + zod şemaları
├── services/               # API servis katmanı
├── hooks/                  # Özel React hook'ları (useAuth, useForm, useDebounce)
└── context/                # React Context sağlayıcıları (AuthProvider)
```

### Bileşen Envanteri

- **Atomlar (7):** Button, Badge, Input, Label, Icon, Spinner, Typography
- **Moleküller (10):** FormField, PasswordInput, Card, Avatar, Modal, Toast, Tabs, Dropdown, Checkbox, Toggle
- **Organizmalar (11):** AuthModal, LoginForm, RegisterForm, EmailVerificationForm, ForgotPasswordForm, ResetPasswordForm, Header, Sidebar, ProfileCompletionForm, DashboardHome, DashboardProfile, DashboardSettings
- **Templates:** AuthTemplate, DashboardTemplate, MainLayout
- **Pages:** Home

## Kullanılabilir Script'ler

| Script | Açıklama |
| -------- | ---------- |
| `yarn dev` | Next.js dev sunucusunu **port 3001**'de başlatır |
| `yarn build` | Production build |
| `yarn start` | Production build'i çalıştırır |
| `yarn lint` | ESLint çalıştırır |
| `yarn typecheck` | TypeScript tip kontrolü (`tsc --noEmit`) |
| `yarn storybook` | Storybook'u **port 6006**'da başlatır |
| `yarn build-storybook` | Storybook statik sitesini oluşturur |
| `yarn plop` | Interaktif bileşen iskelet oluşturucu |
| `yarn plop:atom` | Yeni atom bileşeni oluşturur |
| `yarn plop:molecule` | Yeni molekül bileşeni oluşturur |
| `yarn plop:organism` | Yeni organizma bileşeni oluşturur |
| `yarn plop:page` | Yeni sayfa oluşturur |

## Ortam Değişkenleri

Client kökünde `.env.local` dosyası oluşturun:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1
```

| Değişken | Varsayılan | Açıklama |
| ---------- | ------------ | ---------- |
| `NEXT_PUBLIC_API_URL` | `http://localhost:3000/api/v1` | Sunucu API'sinin temel URL'si |

## Storybook

```bash
yarn storybook
# → http://localhost:6006
```

## Code Generation (Plop)

```bash
yarn plop      # Interaktif — generator seç
yarn plop:atom # → src/components/atoms/ComponentName/ (index.tsx + .module.css + .stories.tsx)
```

## Test & Kalite

```bash
yarn lint       # ESLint
yarn typecheck  # TypeScript strict kontrol
```

Proje genelindeki kalite kapısı (`lint` + `typecheck` + gitleaks) depo kökünden `yarn validate` komutuyla çalışır.

## İlgili Bağlantılar

- [Ana README](../../README.md)
- [Server README](../../server/README.md)
- [Kullanıcı Rehberi](../../wiki/User-Guide.md)

