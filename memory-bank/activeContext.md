# Active Context

## Current Branch
`refactor/frontend-rewrite`

## Current Focus
Rewriting the frontend from scratch using **Atomic Design Pattern**. Old client components have been completely cleaned out. Building a systematic, scalable frontend architecture from the ground up.

The server is fully functional — we are only focusing on the frontend.

## Recent Changes
- **COMPLETE DESIGN SYSTEM OVERHAUL** — Premium Dental Lab aesthetic
  - Colors: Cold blue → Warm gold/terracotta/cream palette
  - Typography: Inter → Lalezar (display/Arabic) + Fraunces (serif/English) + Sora (body)
  - CSS: Added geometric diamond pattern overlay + noise texture
  - Warm-toned shadows, gold focus rings, refined transitions
- **All 7 atom components redesigned** with new aesthetic:
  - **Button**: Gold gradient primary, terracotta secondary, shimmer animation, bounce transition, refined hover/active states
  - **Badge**: Warm semantic colors, uppercase label style
  - **Input**: Gold focus glow, warmer backgrounds, larger border radius
  - **Label**: Uppercase letter-spacing, warm typography
  - **Spinner**: Default gold color
  - **Typography**: Lalezar for h1/h2, Fraunces for h3-h5, Sora uppercase for h6/body
  - **Icon**: Works with warm palette via currentColor
- **Card molecule**: Updated gold hover border
- **Design Tokens** (spacing.ts): Added half-step tokens (2.5, 3.5), warm shadows, bounce transition, gold shadow
- Previous changes (Plop, Storybook, etc.) still in place

## Hard Rules
- **Package Manager: yarn ONLY** — Never use npm. All installs, scripts, and workspace commands use yarn.
- **Branch Scope Discipline** — When a branch is created for a specific task (e.g., `refactor/frontend-rewrite`), ONLY work on that scope. Never touch unrelated code (e.g., backend while on a frontend branch). This prevents merge conflicts.

## Active Decisions
- **Atomic Design Pattern**: `atoms/` → `molecules/` → `organisms/` → `templates/` → `pages/` hierarchy
- **Each component in its own folder**: `ComponentName/index.tsx` + `ComponentName.module.css`
- **CSS Modules** for styling
- **Design Tokens** for consistent design language
- **Server API is unchanged** — client is built to match existing endpoints
- **AuthContext** for global auth state (Context API)
- **Custom hooks** for logic/UI separation (useAuth, useForm)
- **Storybook** for component development and documentation
- **Plop** for code scaffolding to enforce consistency
- **zod** for client-side form validation
- **@antfu/eslint-config** for code quality
- **Future: i18n** — Arabic + English UI support
- **Future: WebSocket** — Socket.IO for real-time notifications
- **Future: Global State Management** — beyond simple Context API

## Known Issues (Backend)
- Server is working, not touching it

## Known Issues (Frontend — To Be Resolved in This Branch)
1. Old `authService.ts` endpoints did not match the server — to be rewritten from scratch
2. `rigister` typo — to be fixed in atomic design rewrite
3. Broken icon imports — resolved with new Icon atom
4. Missing auth guard — to be added with AuthContext + protected routes
5. Order management frontend does not exist yet — future task

## Next Steps
- [x] Plop generator templates created (atom, molecule, organism)
- [x] Atomic Design folder structure created
- [x] Design tokens system created (colors, spacing, typography)
- [x] All atom components (Button, Badge, Input, Label, Icon, Spinner, Typography)
- [x] Current molecule components (FormField, PasswordInput, Card)
- [ ] Additional molecule components (Avatar, Toast/Alert, Modal/Dialog, Tabs, Dropdown, Checkbox/Radio, Toggle)
- [ ] Axios + Sonner installation
- [ ] Organism components (LoginForm, RegisterForm, Header, Sidebar, EmailVerificationForm, ForgotPasswordForm, ResetPasswordForm, ProfileCompletionForm)
- [ ] Templates (AuthTemplate, DashboardTemplate)
- [ ] AuthContext + useAuth hook
- [ ] API client layer + auth service
- [ ] Login page
- [ ] Register page
- [ ] Email verification page
- [ ] Forgot/Reset password pages
- [ ] Profile completion page
- [ ] Dashboard layout + pages
- [ ] Global state management
- [ ] WebSocket notifications (frontend + backend)
- [ ] i18n — Arabic + English UI support
