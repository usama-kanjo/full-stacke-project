# Progress

## Branch: `refactor/frontend-rewrite`

## GitHub Issues Mapping
Each milestone item maps to a GitHub issue for auto-accept:

| Issue | Title | Status in Repo |
|-------|-------|----------------|
| #2 | Clinic creation page | OPEN |
| #5 | Build clinic creation form UI | OPEN |
| #6 | Add clinic listing and detail pages | OPEN |
| #31 | Implement Authentication Pages | OPEN |
| #32 | Add Profile Completion UI | OPEN |
| #33 | Build Dashboard Layout | OPEN |
| #34 | Set Up API Client | OPEN |
| #35 | Implement Auth Context | OPEN |
| #36 | Add Toast Notifications | OPEN |
| #37 | Expand Atomic Design Hierarchy | OPEN |
| #38 | Add Frontend Testing Suite | OPEN |

---

## What Works
### Backend (Server — Fully Working, Not Touched)
- [x] Express 5 server with TypeScript (ESM)
- [x] Prisma ORM (PostgreSQL, 8 migrations)
- [x] User registration + bcrypt hashing
- [x] Email verification (6-digit code, ONLINE/OFFLINE)
- [x] Resend verification code
- [x] JWT token (httpOnly cookie + Bearer fallback)
- [x] Login/Logout
- [x] Forgot/Reset password (6-digit code)
- [x] Change password (authenticated)
- [x] Profile completion (Dentist/Technician via Prisma transaction)
- [x] Dentist profile CRUD
- [x] Technician profile CRUD
- [x] Input validation (express-validator)
- [x] Centralized error handling (dev/prod)
- [x] CORS configuration
- [x] Custom test scripts

### Frontend (Client — Being Written From Scratch)
- [x] Next.js 16 App Router setup (clean)
- [x] `.storybook` configuration
- [x] **Plop** code generator with `.hbs` templates
- [x] **Design Tokens** system (colors, spacing, typography) — **Premium Dental Lab palette**
- [x] **@antfu/eslint-config** linting setup
- [x] **zod** client-side validation library
- [x] **Button** atom — Gold gradient/terracotta variants, shimmer animation, bounce transitions
- [x] **Badge** atom — Warm semantic colors, uppercase
- [x] **Input** atom — Gold focus glow, warm bg
- [x] **Label** atom — Uppercase, warm tones
- [x] **Icon** atom — Clean SVG, palette-aware
- [x] **Spinner** atom — Default gold
- [x] **Typography** atom — Lalezar + Fraunces + Sora
- [x] **Card** molecule — Gold hover border
- [x] **FormField** molecule
- [x] **PasswordInput** molecule
- [x] **Avatar** molecule component
- [x] **Toast/Alert** molecule component
- [x] **Modal/Dialog** molecule component
- [x] **Tabs** molecule component
- [x] **Dropdown** molecule component
- [x] **Checkbox/Radio** molecule component
- [x] **Toggle** molecule component
- [x] Axios + Sonner (installed)
- [x] API client + auth service (lib/api.ts + services/authService.ts)
- [x] AuthContext + useAuth hook + useAuthModal hook
- [x] **AuthModal** organism — Step management, slide animasyon
- [x] **LoginForm**, **RegisterForm**, **EmailVerificationForm** organisms
- [x] **ForgotPasswordForm**, **ResetPasswordForm** organisms
- [x] **Header** organism — Logo + Giriş Yap butonu / kullanıcı menüsü
- [x] **ProfileCompletionForm** organism — Rol seçimi, conditional alanlar
- [x] **Sidebar** organism — Role-based nav menü
- [x] **DashboardHome** organism — Dashboard overview
- [x] **AuthTemplate** — Landing page layout
- [x] **DashboardTemplate** — Sidebar + Header + content layout
- [x] Root page (/) — Auth modal flow (slide geçişleri)
- [x] Dashboard page (/dashboard) — Profile completion check on mount
- [ ] Global state management (future)
- [ ] WebSocket notifications (frontend + backend)
- [ ] i18n — Arabic + English UI support
- [ ] WebSocket notifications (frontend + backend)
- [ ] i18n — Arabic + English UI support

### Database (Schema — Fully Working)
- [x] User model
- [x] Dentist model
- [x] Technician model
- [x] Order model (with OrderStatus enum)
- [x] All indexes and relations

## Milestones

### Milestone 1: Foundation (Atomic Structure)
- [x] Folder structure created
- [x] Design tokens system
- [x] Plop generator
- [x] All atom components + Storybook stories
- [x] Core molecule components (FormField, PasswordInput, Card)
- [x] Additional molecule components (Avatar, Toast/Alert, Modal/Dialog, Tabs, Dropdown, Checkbox/Radio, Toggle)

### Milestone 2: Auth Flow (Modal-based)
- [x] AuthModal with step management (form → form slide transitions)
- [x] LoginForm, RegisterForm, EmailVerificationForm
- [x] ForgotPasswordForm, ResetPasswordForm
- [x] AuthContext with global state
- [x] Axios interceptor + error handling
- [x] Profile completion check on dashboard mount
- [x] API client + auth service layer

### Milestone 3: Dashboard
- [x] Dashboard layout (Header + Sidebar)
- [x] Dashboard home page
- [ ] Dashboard profile
- [ ] Dashboard settings

### Milestone 4: Order Management (Future)
- [ ] Order list, create, detail pages
- [ ] Role-based routing

### Milestone 5: Global State Management
- [ ] Evaluate state management approach (Context API / Zustand / Redux)
- [ ] Implement global state layer

### Milestone 6: WebSocket Notifications
- [ ] Backend WebSocket setup (Socket.IO)
- [ ] Frontend WebSocket integration
- [ ] Real-time notification system

### Milestone 7: i18n (Arabic + English)
- [ ] i18n library setup (next-intl / react-i18next)
- [ ] English translations
- [ ] Arabic translations
- [ ] RTL layout support

## Known Issues
- Backend: No issues
- Frontend: Still in early stages — old components cleaned out, new ones being built
