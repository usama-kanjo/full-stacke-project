# Tech Context

## Technologies

### Backend (server/)
- **Runtime**: Node.js (ESM, `"type": "module"`)
- **Framework**: Express 5 (`^5.1.0`)
- **Language**: TypeScript 5.7
- **Database ORM**: Prisma 6 (PostgreSQL provider)
- **Auth**: `jsonwebtoken` 9, `bcryptjs` 3
- **Validation**: `express-validator` 7
- **Email**: `nodemailer` 7 (Gmail SMTP)
- **Dev Tools**: `tsx` (TypeScript execution), Prisma Studio
- **Testing**: Custom test scripts under `scripts/test/`

### Frontend (client/)
- **Framework**: Next.js 16.0.1 (App Router)
- **Language**: TypeScript 5
- **UI Library**: React 19.2.0
- **HTTP Client**: Axios 1.13 (withCredentials: true)
- **Notifications**: Sonner 2
- **Styling**: CSS Modules (`.module.css`)

## Development Setup
- **Package Manager**: npm
- **Server Dev**: `npm run dev` (tsx watch, port 3000)
- **Client Dev**: `npm run dev` (next dev -p 3001)
- **Build**: `npm run build` (tsc compilation)

## NPM Scripts (Server)
| Script | Command |
|--------|---------|
| dev | `tsx watch src/index.ts` |
| dev:offline | `SEND_MSG_METOD=OFFLINE tsx watch src/index.ts` |
| build | `tsc && tsc -p tsconfig.scripts.json` |
| start | build + production node |
| test | `tsc && node dist/scripts/test/index.js` |
| lint | `eslint src/` |
| typecheck | `tsc --noEmit` |
| db:generate | `prisma generate` |
| db:migrate | `prisma migrate dev` |
| db:studio | `prisma studio` |

## Environment Variables (server/.env)
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - JWT signing secret
- `JWT_EXPIRES_IN` - Token expiry (default: "90d")
- `JWT_COOKIE_EXPIRES` - Cookie expiry in days (default: 90)
- `EMAIL_USERNAME` / `EMAIL_PASSWORD` - Gmail SMTP credentials
- `EMAIL_FROM` / `COMPANY_NAME` - Sender identity
- `SEND_MSG_METOD` - "ONLINE" (send real emails) or "OFFLINE" (log to console)
- `NODE_ENV` - "development" or "production"
- `COOKIE_DOMAIN` - Custom domain for production cookies
- `PORT` - Server port (default: 3000)

## Client Environment
- `NEXT_PUBLIC_API_URL` - API base URL (default: http://localhost:3000/api/v1)

## Constraints
- **Ports**: Frontend 3001, Backend 3000
- **CORS**: Allowed origin `http://localhost:3001` with credentials
- **Path alias**: `@/*` maps to `./client/src/*` on frontend

## Prisma Migrations (8 total)
1. `20251024064715_init` - Initial schema
2. `20251026120423_update_relations_to_one_to_many` - Relation fixes
3. `20251026131249_add_role_to_user` - Role field on User
4. `20251026133232_fix_user_role_relation` - Role relation fix
5. `20260412162638_sifirdan_yabildi` - Schema rebuild
6. `20260412165429_user_add_email_verification_code` - Email verification fields
7. `20260412184221_editing_role` - Role enum/field adjustments
8. `20260417182039_add_token_management` - Token management additions
