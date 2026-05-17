# System Patterns

## Architecture
The application follows a Client-Server architecture:
- **Client**: Next.js 16 (App Router) + React 19, TypeScript, CSS Modules
- **Server**: Express.js 5 with clean layered architecture

## Server Architecture (Layered)
```
src/
├── config/          # DB connection (Prisma), JWT config
├── controllers/     # Request handlers (thin, delegates to services)
├── middlewares/     # Auth (protect/softProtect), Error handling, Validation
├── routes/v1/      # Route definitions (user, dentist, technician)
├── services/       # Business logic (auth, user, dentist, technician, email)
├── types/          # Express type augmentation (req.user)
├── utils/          # ApiError class
└── validators/     # express-validator chains
```

## Client Architecture (Next.js App Router)
```
client/src/
├── app/            # Pages (auth/login, auth/rigister, dashboard/, etc.)
├── components/     # UI components (LoginForm, SignUpForm, Header, Sidebar, etc.)
├── lib/            # Axios instance configuration
├── services/       # API service layer (authService)
└── types/          # TypeScript types (user, settings)
```

## Data Flow
```
Client (Axios)  →  API Routes (/api/v1/user/*)  →  Controllers  →  Services  →  Prisma ORM  →  PostgreSQL
```

## Authentication Flow
1. Register → JWT token set in httpOnly cookie → Redirect to email verification
2. Verify email with 6-digit code → New JWT token issued (isVerified: true)
3. Complete profile (choose role + fill details)
4. Login → JWT token set in httpOnly cookie → Dashboard
5. All protected routes use `protect` middleware (checks cookie/Bearer token)
6. `softProtect` middleware used for email verification (optional auth context)

## Key Design Decisions
- **JWT in httpOnly cookies**: Prevents XSS access, with Bearer token fallback for non-browser clients
- **Service layer pattern**: Controllers are thin, business logic lives in services
- **Error handling**: Centralized `globalError` middleware with dev/prod modes; custom `ApiError` class with status code
- **Email modes**: `ONLINE` (real Gmail SMTP) and `OFFLINE` (console.log for development)
- **Password validation**: Must contain uppercase letter + number, min 8 chars
- **Profile completion**: Uses Prisma `$transaction` to atomically create Dentist/Technician + update User
- **CSS Modules**: Per-component scoped styling
- **Code style**: ESLint with `@antfu/eslint-config`
