# Tech Context

## Technologies

### Backend (server/) — Unchanged, Working
- **Runtime**: Node.js (ESM, `"type": "module"`)
- **Framework**: Express 5 (`^5.1.0`)
- **Language**: TypeScript
- **Database ORM**: Prisma 7 (`^7.8.0`, PostgreSQL provider) with `@prisma/adapter-pg`
- **Prisma Config**: `prisma.config.ts` at server root (replaces `url` in schema.prisma)
- **Generated Client**: `src/generated/prisma/` (import with `.js` extension for ESM)
- **Auth**: `jsonwebtoken` 9, `bcryptjs` 3
- **Validation**: `express-validator` 7
- **Email**: `nodemailer` 8 (Gmail SMTP)
- **Dev Tools**: `tsx` (TypeScript execution), Prisma Studio

### Frontend (client/) — BEING REWRITTEN
- **Framework**: Next.js 16 (`^16.2.6`, App Router)
- **Language**: TypeScript (`^6.0.3`)
- **UI Library**: React 19 (`^19.2.6`)
- **Styling**: CSS Modules (`.module.css`)
- **Architecture**: Atomic Design Pattern
- **Storybook**: `@storybook/nextjs ^10.4.0`, configured and working
- **Code Generator**: Plop (`plopfile.js`) with custom `.hbs` templates
- **Design Tokens**: Custom tokens system (colors, spacing, typography, z-index, transitions)
- **Barrel Export**: `components/index.ts` re-exports all 10 components
- **Linting**: `@antfu/eslint-config`
- **Validation**: zod (`^4.4.3`) with centralized schemas in `lib/schemas/`
- **Validation Helper**: `formatZodErrors` in `lib/schemas/index.ts` — converts Zod issues to `Record<string, string>`

### Planned / Future Dependencies
- **HTTP Client**: Axios (withCredentials: true)
- **Notifications**: Sonner (toast library)
- **WebSocket**: Socket.IO (real-time notifications)
- **Global State Management**: TBD (Context API / Zustand / Redux)
- **i18n**: next-intl or react-i18next (Arabic + English)

## Development Setup
- **Package Manager**: yarn ONLY — never use npm (workspaces)
- **Server Dev**: `yarn server` (tsx watch, port 3000)
- **Client Dev**: `yarn client` (next dev -p 3001)
- **Full Dev**: `yarn dev` (concurrently runs both)
- **Storybook**: `yarn workspace client storybook`

## NPM Scripts (Server)
| Script | Command |
|--------|---------|
| dev | `tsx watch src/index.ts` |
| dev:offline | `SEND_MSG_METHOD=OFFLINE tsx watch src/index.ts` |
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
- `SEND_MSG_METHOD` — "ONLINE" or "OFFLINE" (console)
- `BASE_URL` — Client base URL (default: http://localhost:3001/)
- `SUPPORT_EMAIL` — Support email address (default: destek@kanjo.com)
- `COOKIE_DOMAIN` — Cookie domain (default: localhost)
- `NODE_ENV` — "development" or "production"
- `PORT` — Server port (default: 3000)

## Client Source Details
- **Tokens**: `spacing.ts` exports `spacingTokens`, `zIndexTokens`, and `transitionTokens`
- **CSS**: `tokens.css` includes global CSS reset and body base styles alongside custom properties
- **Fonts**: `assets/fonts/primary.ttf` — custom "Lalezar" font used in design tokens
- **Components barrel export**: `components/index.ts` re-exports all atoms (7) and molecules (3)
- **Validation Schemas**: `lib/schemas/` — centralized Zod schemas for auth forms (login, register, email verification, password reset) and profile completion
- **Validation Helper**: `formatZodErrors()` in `lib/schemas/index.ts` parses Zod issues into field-keyed error map

## Client Environment
- `NEXT_PUBLIC_API_URL` — API base URL (default: http://localhost:3000/api/v1)

## Prisma 7 Migration Notes
- `prisma.config.ts` created at `server/prisma.config.ts` — defines datasource URL for CLI
- `schema.prisma` removed `url` from `datasource` block, changed generator to `prisma-client-js` with `output = "../src/generated/prisma"`
- `@prisma/adapter-pg` + `pg` added for runtime database connection
- `database.ts` uses `PrismaPg` adapter in `PrismaClient({ adapter })`
- All imports from `@prisma/client` changed to `../generated/prisma/index.js`

## Unused Dependencies (server/package.json)
- `date-fns` — installed but not used anywhere in source
- `slugify` — installed but not used anywhere in source

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
