# Active Context

## Current Focus
Authentication system is fully implemented on the backend (register, login, email verification, password management, profile completion). The frontend has basic login/register pages but there are **discrepancies between client-side API calls and actual server endpoints**.

## Recent Changes
- Memory Bank created and populated with full project scan
- Identified server-side auth flow working correctly
- Identified client-server API mismatches (see Known Issues)

## Active Decisions
- Auth uses JWT in httpOnly cookies (not localStorage) for security
- Email verification uses 6-digit code (not URL token) for simplicity
- Direct assignment model for orders (no bidding system)
- Turkish UI with English backend messages

## Known Issues
1. **Client authService.ts calls non-existent routes**: `getProfile` hits `/auth/profile` (should be `/user/profile` or `/dentist/profile`), `emailVerify` hits `GET /user/verify-email/:token` but server expects `POST /user/verify-email` with `{ verificationCode }` in body, `resendVerificationEmail` hits `/user/resend-verification-email` but server expects `POST /user/resend-code`
2. **Typo in directory name**: `rigister` instead of `register` (applies to both page route and component folder)
3. **Broken icon imports**: Register form imports `EyeIconeeee` and `GoogleIconeeee` which likely don't exist in Icons.tsx
4. **Order management**: Schema exists but no routes, controllers, or services implemented yet
5. **No role-based route guards**: Dashboard doesn't check user role or redirect unauthenticated users
6. **Test scripts (dist/scripts/test/)**: Test suite exists but source is compiled-only; no source TypeScript found for tests

## Next Steps
- [ ] Fix client-server API mismatches in authService.ts
- [ ] Fix import errors in register form (icons)
- [ ] Implement order management CRUD
- [ ] Add role-based access middleware
- [ ] Add dashboard authentication guard
- [ ] Add comprehensive error pages
- [ ] Write proper tests
