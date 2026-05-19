# System Patterns

## Architecture Overview
```
Client (Next.js 16 - Atomic Design)  →  API (Express 5)  →  Services  →  Prisma ORM  →  PostgreSQL
```

## Server Architecture (Değişmiyor - Çalışır Durumda)
```
server/src/
├── config/          # DB connection (Prisma), JWT config
├── controllers/     # Request handlers (thin, delegates to services)
├── middlewares/     # Auth (protect/softProtect), Error handling, Validation
├── routes/v1/      # Route definitions (user, dentist, technician)
├── services/       # Business logic (auth, user, dentist, technician, email)
├── types/          # Express type augmentation (req.user)
├── utils/          # ApiError class
└── validators/     # express-validator chains
```

## Client Architecture (YENİ — Atomic Design Pattern)

```
client/src/
├── app/                 # Next.js App Router sayfaları (thin pages)
├── components/
│   ├── atoms/           # En küçük, yeniden kullanılabilir UI birimleri
│   │   ├── Button/
│   │   ├── Input/
│   │   ├── Label/
│   │   ├── Icon/
│   │   ├── Spinner/
│   │   └── Typography/
│   ├── molecules/       # Atomların birleşimiyle oluşan gruplar
│   │   ├── FormField/   # Label + Input + ErrorMessage
│   │   ├── Card/
│   │   ├── NavItem/
│   │   ├── PasswordInput/  # Input + EyeToggle
│   │   └── Toast/
│   ├── organisms/       # Karmaşık, bağımsız bölümler
│   │   ├── Header/
│   │   ├── Sidebar/
│   │   ├── LoginForm/
│   │   ├── RegisterForm/
│   │   ├── EmailVerificationForm/
│   │   ├── ForgotPasswordForm/
│   │   ├── ResetPasswordForm/
│   │   └── ProfileCompletionForm/
│   └── templates/       # Sayfa düzenleri / layout'lar
│       ├── AuthTemplate/      # Login/Register gibi auth sayfaları için ortak layout
│       └── DashboardTemplate/ # Header + Sidebar + Content alanı
├── lib/                 # Axios instance, utility fonksiyonlar
├── services/            # API servis katmanı (authService, userService, etc.)
├── hooks/               # Custom React hooks (useAuth, useForm, etc.)
├── context/             # React Context providers (AuthContext, etc.)
└── types/               # TypeScript type definitions
```

## Data Flow
```
Page → Template → Organism → Service (Axios) → API Route → Controller → Service → DB
                                       ↕
                                Context / Hooks (state management)
```

## Key Design Decisions

### Atomic Design
- **Atoms**: Tek bir sorumluluğu olan, bağımsız UI elementleri. Kendi başlarına bir anlam ifade etmezler.
- **Molecules**: Atomları bir araya getiren, tek bir işlevi olan gruplar. (örn. FormField = Label + Input + Error)
- **Organisms**: Molekülleri ve atomları birleştiren, belirgin bir UI bölümü. (örn. LoginForm)
- **Templates**: Organism'leri sayfa düzenine yerleştiren, içerikten bağımsız layout'lar.
- **Pages**: Template + gerçek içerik = tam sayfa.

### Component Kuralları
- Her component kendi klasöründe: `ComponentName/index.tsx` + `ComponentName.module.css`
- Props tipleri `ComponentName.types.ts` (opsiyonel, küçükse inline)
- Her component tek bir sorumluluğa sahip
- State management mümkün olduğunca yukarı taşınır (lifting state up)

### JWT Auth (Değişmiyor)
- JWT httpOnly cookie'de saklanır (XSS koruması)
- Bearer token fallback (non-browser client'lar için)
- `protect` middleware tüm korumalı route'larda

### Error Handling (Değişmiyor)
- Backend: Merkezi `globalError` middleware, dev/prod modları, custom `ApiError` class
- Frontend: Axios interceptor + toast notifications

### Email Modes (Değişmiyor)
- `ONLINE`: Gerçek Gmail SMTP
- `OFFLINE`: console.log (geliştirme)
