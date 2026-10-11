# KanjoLab Server — Backend

**English** | [**Türkçe**](../docs/server/README.tr.md) | [**العربية**](../docs/server/README.ar.md)

*Express.js 5 backend for KanjoLab — API, authentication, and database layer (fully working).*

---

## Overview

The server is an **Express.js 5** application written in **TypeScript (ESM)**. It uses **Prisma ORM 7** with **PostgreSQL** for the database, **JWT** (httpOnly cookie + Bearer fallback) for authentication, **bcryptjs** for password hashing, **express-validator** for input validation, and **nodemailer** for email delivery.

**Current status:** Fully working — all auth and profile endpoints are complete. The frontend is being rewritten to match this API.

## Tech Stack

- **Runtime:** Node.js (ESM, `"type": "module"`)
- **Framework:** Express.js 5
- **Language:** TypeScript
- **Database:** PostgreSQL via Prisma ORM 7 (`@prisma/adapter-pg`)
- **Auth:** jsonwebtoken 9 (httpOnly cookie + Bearer fallback), bcryptjs
- **Validation:** express-validator 7
- **Email:** nodemailer 8 (Gmail SMTP, ONLINE/OFFLINE modes)
- **Dev Tools:** tsx (watch mode), Prisma Studio

## Project Structure

```
server/
├── prisma/                 # Prisma schema + migrations
├── prisma.config.ts        # Prisma CLI datasource config
├── scripts/                # Utility scripts (tests, hashing)
└── src/
    ├── config/             # DB connection (Prisma), JWT config
    ├── controllers/        # Request handlers (thin, delegate to services)
    ├── generated/          # Generated Prisma client
    ├── middlewares/        # Auth (protect/softProtect), error handling
    ├── routes/v1/          # Route definitions
    │   ├── userRoute.ts
    │   ├── dentistRoute.ts
    │   └── technicianRoute.ts
    ├── services/           # Business logic (auth, user, profiles, email)
    ├── types/              # Express type augmentation (req.user)
    ├── utils/              # ApiError class
    ├── validators/         # express-validator chains
    └── index.ts            # Entry point
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `yarn dev` | Start dev server with hot reload (**port 3000**) |
| `yarn dev:offline` | Start dev server in offline email mode (codes → console) |
| `yarn build` | Compile TypeScript |
| `yarn start` | Build + run in production mode |
| `yarn test` | Run the compiled test suite |
| `yarn hash` | Generate a password hash |
| `yarn lint` | Lint source code |
| `yarn typecheck` | TypeScript type checking (`tsc --noEmit`) |
| `yarn db:generate` | Regenerate the Prisma client |
| `yarn db:migrate` | Run development migrations |
| `yarn db:migrate:prod` | Run production migrations |
| `yarn db:push` | Push schema to the database |
| `yarn db:studio` | Open Prisma Studio (**port 5555**) |
| `yarn db:seed` | Seed the database |

## Environment Variables

Copy `.env.example` to `.env` in the server root:

```bash
cp server/.env.example server/.env
```

| Variable | Description |
|----------|-------------|
| `PORT` / `NODE_ENV` | Server port (default 3000) and environment |
| `DATABASE_URL` | PostgreSQL connection string |
| `JWT_SECRET` | JWT signing secret (`openssl rand -hex 32`) |
| `JWT_EXPIRES_IN` | Access token expiry (default `15m`) |
| `JWT_REFRESH_EXPIRES_IN` | Refresh token expiry (default `30d`) |
| `JWT_COOKIE_EXPIRES` / `COOKIE_DOMAIN` | Cookie lifetime and domain |
| `EMAIL_USERNAME` / `EMAIL_PASSWORD` | Gmail SMTP app credentials |
| `SEND_MSG_METHOD` | `ONLINE` (real emails) or `OFFLINE` (console logs) |
| `COMPANY_NAME` / `SUPPORT_EMAIL` | Sender identity and support contact |
| `BASE_URL` | Client base URL for links in emails |
| `CORS_ORIGINS` | Comma-separated list of allowed origins |
| `S3_*` | S3 storage config (Faz 8, optional) |
| `SENTRY_DSN` | Sentry error tracking (Faz 2, optional) |

## API Endpoints

**Base URL:** `http://localhost:3000/api/v1`

### User / Auth

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

### Dentist

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/v1/dentist/profile` | Get dentist profile |
| PUT | `/api/v1/dentist/profile` | Update dentist profile |

### Technician

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/v1/technician/profile` | Get technician profile |
| PUT | `/api/v1/technician/profile` | Update technician profile |

Full request/response documentation: [`../wiki/API-Documentation.md`](../wiki/API-Documentation.md).

## Database (Prisma)

Eight migrations track the schema:

1. `init` — Initial schema
2. `update_relations_to_one_to_many` — Relation fixes
3. `add_role_to_user` — Role field on User
4. `fix_user_role_relation` — Relation fix
5. `sifirdan_yabildi` — Schema rebuild
6. `user_add_email_verification_code` — Email verification fields
7. `editing_role` — Role enum/field adjustments
8. `add_token_management` — Token management additions

### Models

- **User** — email, passwordHash, role, verification & token fields
- **Dentist** — fullName, phone, clinicName, clinicAddress, clinicCity, orders[]
- **Technician** — fullName, phone, labName, labAddress, labCity, specialties[], orders[]
- **Order** — patient info, toothNumber, workType, shade, status (enum), price, deadline

## Testing & Quality

```bash
yarn lint       # ESLint
yarn typecheck  # TypeScript strict check
yarn test       # Compiled test suite
```

## Related

- [Root README](../README.md)
- [Client README](../client/README.md)
- [API Documentation](../wiki/API-Documentation.md)