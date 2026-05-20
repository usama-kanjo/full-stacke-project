# Tech Context

## Technologies

### Backend (server/) — Unchanged, Working
- **Runtime**: Node.js (ESM, `"type": "module"`)
- **Framework**: Express 5 (`^5.1.0`)
- **Language**: TypeScript
- **Database ORM**: Prisma 7 (PostgreSQL provider)
- **Auth**: `jsonwebtoken` 9, `bcryptjs` 3
- **Validation**: `express-validator` 7
- **Email**: `nodemailer` 8 (Gmail SMTP)
- **Dev Tools**: `tsx` (TypeScript execution), Prisma Studio

### Frontend (client/) — BEING REWRITTEN
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **UI Library**: React 19
- **HTTP Client**: Axios (withCredentials: true)
- **Notifications**: Sonner
- **Styling**: CSS Modules (`.module.css`)
- **Architecture**: Atomic Design Pattern
- **Storybook**: `.storybook/` configured and working
- **Code Generator**: Plop (scaffolding) with custom templates
- **Design Tokens**: Custom tokens system (colors, spacing, typography)
- **Linting**: `@antfu/eslint-config`
- **Validation**: zod

## Development Setup
- **Package Manager**: yarn (workspaces)
- **Server Dev**: `yarn server` (tsx watch, port 3000)
- **Client Dev**: `yarn client` (next dev -p 3001)
- **Full Dev**: `yarn dev` (concurrently runs both)
- **Storybook**: `yarn workspace client storybook`

## NPM Scripts (Server)
| Script | Command |
|--------|---------|
| dev | `tsx watch src/index.ts` |
| dev:offline | `SEND_MSG_METOD=OFFLINE tsx watch src/index.ts` |
| build | `tsc && tsc -p tsconfig.scripts.json` |
| test | `tsc && node dist/scripts/test/index.js` |
| lint | `eslint src/` |
| typecheck | `tsc --noEmit` |
| db:generate | `prisma generate` |
| db:migrate | `prisma migrate dev` |
| db:studio | `prisma studio` |

## Environment Variables (server/.env)
- `DATABASE_URL` — PostgreSQL connection string
- `JWT_SECRET` — JWT signing secret
- `JWT_EXPIRES_IN` — Token expiry (default: "90d")
- `JWT_COOKIE_EXPIRES` — Cookie expiry in days (default: 90)
- `EMAIL_USERNAME` / `EMAIL_PASSWORD` — Gmail SMTP credentials
- `EMAIL_FROM` / `COMPANY_NAME` — Sender identity
- `SEND_MSG_METOD` — "ONLINE" or "OFFLINE" (console)
- `NODE_ENV` — "development" or "production"
- `PORT` — Server port (default: 3000)

## Client Environment
- `NEXT_PUBLIC_API_URL` — API base URL (default: http://localhost:3000/api/v1)

## Constraints
- **Ports**: Frontend 3001, Backend 3000
- **CORS**: Allowed origin `http://localhost:3001` with credentials
- **Path alias**: `@/*` maps to `./client/src/*`

## Prisma Migrations (8 total — Unchanged)
1. `init` — Initial schema
2. `update_relations_to_one_to_many` — Relation fixes
3. `add_role_to_user` — Role field on User
4. `fix_user_role_relation` — Role relation fix
5. `sifirdan_yabildi` — Schema rebuild
6. `user_add_email_verification_code` — Email verification fields
7. `editing_role` — Role enum/field adjustments
8. `add_token_management` — Token management additions
