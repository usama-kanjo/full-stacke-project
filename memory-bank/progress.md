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
- [x] `.storybook` configuration — all stories fixed and verified
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
- [x] **AuthModal** organism — Each auth form is a self-contained modal popup
- [x] **LoginForm**, **RegisterForm**, **EmailVerificationForm** organisms
- [x] **ForgotPasswordForm**, **ResetPasswordForm** organisms
- [x] **Header** organism — Logo + Sign In button / user menu
- [x] **ProfileCompletionForm** organism — Role selection, conditional fields
- [x] **Sidebar** organism — Role-based navigation menu
- [x] **DashboardHome** organism — Dashboard overview (emoji → SVG Icon)
- [x] **AuthTemplate** — Landing page layout
- [x] **DashboardTemplate** — Sidebar + Header + content layout
- [x] Self-contained modal auth flow (each form opens as own modal)
- [x] Dashboard page (/dashboard) — Profile completion check on mount
- [x] **Vercel React best practices** applied across all 22+ components
- [x] **Storybook** runtime errors fixed, missing stories added
- [x] **Emoji → SVG Icon** migration (Sidebar, ProfileCompletionForm, DashboardHome)
- [x] **Zod validation schemas** in `lib/schemas/` — centralized form validation
- [x] **UI Translation** — Turkish → English across all components
- [x] **DashboardProfile** organism — view/edit profile with role-based fields
- [x] **DashboardSettings** organism — change password form
- [x] **Profile page** (`/dashboard/profile`) — fetches role-specific profile
- [x] **Settings page** (`/dashboard/settings`) — change password with validation
- [ ] Global state management (future)
- [ ] WebSocket notifications (frontend + backend) (future)
- [ ] i18n — Arabic + English UI support (future)

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

### Milestone 2: Auth Flow (Self-Contained Modal Popups)
- [x] AuthModal — renders each auth form as independent modal
- [x] LoginForm, RegisterForm, EmailVerificationForm (self-contained modals)
- [x] ForgotPasswordForm, ResetPasswordForm (self-contained modals)
- [x] AuthContext with global state
- [x] Axios interceptor + error handling
- [x] Profile completion check on dashboard mount
- [x] API client + auth service layer
- [x] Zod schemas created in `lib/schemas/` — all forms use centralized validation
- [x] Vercel React best practices applied
- [x] Storybook stories fixed for all components

### Milestone 3: Dashboard
- [x] Dashboard layout (Header + Sidebar)
- [x] Dashboard home page
- [x] Dashboard profile (view/edit with role-based fields)
- [x] Dashboard settings (change password)

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

## Code Quality Audit
- [ ] No `any` types remain in frontend code
- [ ] All components follow single responsibility principle
- [ ] All handlers are wrapped in useCallback
- [ ] All expensive computations use useMemo
- [ ] All components use early return pattern
- [ ] All API errors show toast notifications
- [ ] All form validation uses centralized zod schemas
- [x] Default exports for single-export files (per `import/prefer-default-export` rule)
- [ ] All CSS uses design tokens (no hardcoded values)
- [ ] Storybook stories exist for every component

## Known Issues
- Backend: No issues
- Frontend: Auth flow, dashboard, profile, and settings pages complete. Next up: order management, global state, WebSocket, i18n.
- **Code quality baseline**: Above checklist must be satisfied before considering any milestone "complete".
