# Progress

## Branch: `refactor/frontend-rewrite`

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
- [x] **Design Tokens** system (colors, spacing, typography)
- [x] **@antfu/eslint-config** linting setup
- [x] **zod** client-side validation library
- [x] **Button** atom component (3 variants, 3 sizes, loading, disabled)
- [x] **Badge** atom component (3 variants)
- [x] Atomic Design folder structure created
- [ ] More atom components (Input, Label, Icon, Spinner, Typography)
- [ ] Molecule components (FormField, PasswordInput, Card)
- [ ] Organism components (LoginForm, RegisterForm, Header, Sidebar)
- [ ] Templates (AuthTemplate, DashboardTemplate, MainLayout)
- [ ] AuthContext + useAuth hook
- [ ] Axios instance + apiClient
- [ ] Auth service (server-compatible)
- [ ] Login page
- [ ] Register page
- [ ] Email verification page
- [ ] Forgot/Reset password pages
- [ ] Profile completion page
- [ ] Dashboard layout + pages

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
- [x] Button atom component + Storybook
- [x] Badge atom component + Storybook
- [ ] All atom components
- [ ] Storybook stories for all atoms

### Milestone 2: Auth Flow (Pages)
- [ ] All auth pages (login, register, verify, password reset, profile completion)
- [ ] AuthContext with global state
- [ ] Axios interceptor + error handling

### Milestone 3: Dashboard
- [ ] Dashboard layout (Header + Sidebar)
- [ ] Dashboard home page
- [ ] Dashboard profile
- [ ] Dashboard settings

### Milestone 4: Order Management (Future)
- [ ] Order list, create, detail pages
- [ ] Role-based routing

## Known Issues
- Backend: No issues
- Frontend: Still in early stages — old components cleaned out, new ones being built
