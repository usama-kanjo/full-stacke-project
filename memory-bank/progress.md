# Progress

## What Works
### Backend (Server - Complete)
- [x] Express 5 server setup with TypeScript
- [x] Prisma ORM connected to PostgreSQL (8 migrations applied)
- [x] User registration with email + password (bcrypt hashing)
- [x] Email verification with 6-digit code (ONLINE/OFFLINE modes)
- [x] Resend verification code
- [x] JWT token generation (httpOnly cookie + Bearer fallback)
- [x] Login with email/password
- [x] Logout (cookie clearing)
- [x] Forgot password (6-digit code via email)
- [x] Reset password with code
- [x] Change password (authenticated)
- [x] Profile completion (Dentist or Lab Technician via Prisma transaction)
- [x] Dentist profile CRUD (get/update)
- [x] Technician profile CRUD (get/update)
- [x] Input validation (express-validator chains)
- [x] Centralized error handling (dev/prod modes)
- [x] CORS configuration
- [x] Custom test scripts (auth, password, profile flows)

### Frontend (Client - Partial)
- [x] Next.js 16 App Router setup
- [x] Axios instance with credentials
- [x] Login page (Turkish UI)
- [x] Register page (Turkish UI)
- [x] Forgot password page
- [x] Email verification page (dynamic [token] route)
- [x] Dashboard layout (Header + Sidebar)
- [x] Dashboard main page (placeholder data)
- [x] Dashboard profile page
- [x] Dashboard settings page

### Database (Schema Complete)
- [x] User model (with verification & reset fields)
- [x] Dentist model
- [x] Technician model
- [x] Order model (with OrderStatus enum)
- [x] All indexes and relations

## What's Left to Build
### High Priority
- [ ] Fix client-side authService.ts API mismatches (wrong endpoints)
- [ ] Fix broken icon imports in register form (EyeIconeeee, GoogleIconeeee)
- [ ] Add authentication guard to dashboard pages (redirect to login if no cookie)
- [ ] Implement 404 / error pages properly

### Medium Priority
- [ ] Order management (create, read, update, delete, status tracking)
- [ ] Role-based access control middleware (restrict dentist vs technician endpoints)
- [ ] Assign technician to order flow
- [ ] Technician order view (assigned orders)

### Low Priority
- [ ] Admin panel
- [ ] Real-time notifications (WebSocket)
- [ ] File upload (patient images/X-rays)
- [ ] Multi-language support (tr/en/ar - types already defined)
- [ ] Dark mode / theme switching (types already defined)
- [ ] Google OAuth integration (UI buttons exist)

## Known Issues
1. **Client-server API mismatch**: `authService.ts` calls routes that don't match server implementation (see activeContext.md)
2. **Typo**: `rigister` instead of `register` throughout client
3. **Broken icon imports**: `EyeIconeeee`, `GoogleIconeeee` in register component
4. **Order management**: Schema exists but no implementation
5. **No auth guard**: Dashboard accessible without login
6. **Test scripts**: Only in compiled `dist/`, no source TypeScript in `scripts/test/`
