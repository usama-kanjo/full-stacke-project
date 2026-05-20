# System Patterns

## Architecture Overview
```
Client (Next.js 16 - Atomic Design)  →  API (Express 5)  →  Services  →  Prisma ORM  →  PostgreSQL
```

## Server Architecture (Unchanged — Working)
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

## Client Architecture (NEW — Atomic Design Pattern)

```
client/src/
├── app/                 # Next.js App Router pages (thin)
├── assets/              # Static assets (images, fonts, etc.)
├── components/
│   ├── atoms/           # Smallest reusable UI units
│   │   ├── Button/
│   │   ├── Badge/
│   │   ├── Input/
│   │   ├── Label/
│   │   ├── Icon/
│   │   ├── Spinner/
│   │   └── Typography/
│   ├── molecules/       # Groups formed by combining atoms
│   │   ├── FormField/   # Label + Input + ErrorMessage
│   │   ├── Card/
│   │   ├── NavItem/
│   │   ├── PasswordInput/  # Input + EyeToggle
│   │   └── Toast/
│   ├── organisms/       # Complex, independent sections
│   │   ├── Header/
│   │   ├── Sidebar/
│   │   ├── LoginForm/
│   │   ├── RegisterForm/
│   │   ├── EmailVerificationForm/
│   │   ├── ForgotPasswordForm/
│   │   ├── ResetPasswordForm/
│   │   └── ProfileCompletionForm/
│   ├── templates/       # Page layouts
│   │   ├── AuthTemplate/       # Common layout for auth pages
│   │   ├── MainLayout/        # Main application layout
│   │   └── DashboardTemplate/ # Header + Sidebar + Content area
│   └── pages/           # Full page components
│       └── Home/
├── tokens/              # Design tokens (colors, spacing, typography)
├── lib/                 # Axios instance, utility functions
├── services/            # API service layer (authService, userService, etc.)
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
- **Atoms**: Independent UI elements with a single responsibility. They do not convey meaning on their own.
- **Molecules**: Groups that combine atoms to serve a single function (e.g., FormField = Label + Input + Error).
- **Organisms**: Distinct UI sections combining molecules and atoms (e.g., LoginForm).
- **Templates**: Content-independent layouts that arrange organisms on a page.
- **Pages**: Template + real content = complete page.

### Component Rules
- Each component in its own folder: `ComponentName/index.tsx` + `ComponentName.module.css`
- Props types inline or in `ComponentName.types.ts` (optional)
- Each component has a single responsibility
- State is lifted up as much as possible

### Design Tokens
- Centralized design tokens in `client/src/tokens/`
- CSS custom properties in `tokens.css` for runtime use
- TypeScript constants for programmatic use (colors.ts, spacing.ts, typography.ts)

### Code Generation (Plop)
- Plop generators for scaffolding atoms, molecules, organisms
- Each generated component includes: index.tsx, module.css, stories.tsx, index.ts
- Reduces boilerplate and enforces consistency

### JWT Auth (Unchanged)
- JWT stored in httpOnly cookie (XSS protection)
- Bearer token fallback for non-browser clients
- `protect` middleware on all protected routes

### Error Handling (Unchanged)
- Backend: Centralized `globalError` middleware, dev/prod modes, custom `ApiError` class
- Frontend: Axios interceptor + toast notifications

### Email Modes (Unchanged)
- `ONLINE`: Real Gmail SMTP
- `OFFLINE`: console.log (development)
