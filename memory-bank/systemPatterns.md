# System Patterns

## Architecture Overview

```
Client (Next.js 16 - Atomic Design)  →  API (Express 5)  →  Services  →  Prisma ORM  →  PostgreSQL
                                                        ↕
                                           WebSocket (Socket.IO — planned)
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
│   ├── layout.tsx
│   └── page.tsx
├── assets/              # Static assets (images, fonts, etc.)
│   └── fonts/
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
│   │   └── PasswordInput/  # Input + EyeToggle
│   ├── organisms/       # Complex, independent sections (to be built)
│   │   └── (empty)
│   ├── templates/       # Page layouts
│   │   └── MainLayout/  # (empty — ready for implementation)
│   └── pages/           # Full page components
│       └── Home/        # (empty — ready for implementation)
├── tokens/              # Design tokens (colors, spacing, typography)
│   ├── colors.ts
│   ├── spacing.ts
│   ├── typography.ts
│   ├── tokens.css
│   └── index.ts
├── types/               # TypeScript type definitions
│   └── css.d.ts
├── lib/                 # Axios instance, utility functions (planned)
├── services/            # API service layer (planned)
├── hooks/               # Custom React hooks (planned)
└── context/             # React Context providers (planned)
```

## Data Flow

```
Page → Template → Organism → Service (Axios) → API Route → Controller → Service → DB
                                       ↕
                                Global State (state management — planned)
                                       ↕
                              WebSocket Notifications (planned)
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

## Code Quality Patterns

- **No `any` type** — TypeScript strict mode, every type must be explicit or properly inferred
- **Early returns** — Avoid nested conditionals, return early for edge cases
- **Destructuring** — Props, state, and API responses are always destructured
- **Default exports for single-export files** — Per `import/prefer-default-export` rule in `@antfu/eslint-config`. Named exports for files with multiple exports.
- **Small functions** — Functions do one thing. If a function exceeds ~20 lines, split it.
- **Self-documenting code** — Variable/function names explain intent. Comments only for non-obvious logic
- **Consistent error handling** — API errors → toast notifications; validation errors → form field errors
- **Separation of concerns** — UI logic (components) ≠ business logic (hooks/services) ≠ data fetching (API layer)

### Design Tokens

- Centralized design tokens in `client/src/tokens/`
- CSS custom properties in `tokens.css` for runtime use
- TypeScript constants for programmatic use (colors.ts, spacing.ts, typography.ts)

### Code Generation (Plop)

- Plopfile at `client/plopfile.js`
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

### Future Architecture Additions

- **Global State Management**: TBD (Context API / Zustand / Redux)
- **WebSocket**: Socket.IO for real-time notifications
- **i18n**: next-intl or react-i18next for Arabic + English UI
