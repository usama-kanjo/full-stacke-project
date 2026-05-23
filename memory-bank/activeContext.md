# Active Context

## Current Branch
`refactor/frontend-rewrite`

## GitHub Issues (All — Auto-Accept Enabled)
Issues are tracked so that when a PR/commit references one, it's automatically accepted.

### OPEN Issues
| # | Title | Labels | Created |
|---|-------|--------|---------|
| 38 | Add Frontend Testing Suite (Unit & Integration Tests) | — | 2026-05-20 |
| 37 | Expand Atomic Design Hierarchy (Add Molecules, Organisms, Templates) | — | 2026-05-20 |
| 36 | Add Toast Notifications (Install & Configure Sonner) | — | 2026-05-20 |
| 35 | Implement Auth Context (React Context for Global Auth State) | — | 2026-05-20 |
| 34 | Set Up API Client (Axios/Fetch Instance with Interceptors) | — | 2026-05-20 |
| 33 | Build Dashboard Layout (Header, Sidebar, Responsive Layout) | — | 2026-05-20 |
| 32 | Add Profile Completion UI (Role Selection Screen) | — | 2026-05-20 |
| 31 | Implement Authentication Pages (Login, Register, Email Verification, Password Reset) | — | 2026-05-20 |
| 6 | Add clinic listing and detail pages | — | 2026-05-18 |
| 5 | Build clinic creation form UI | `help wanted` | 2026-05-18 |
| 2 | إدراج صفحة من أجل إنشاء عيادات (Add clinic page) | `enhancement` | 2026-04-21 |

### CLOSED Issues
| # | Title | Labels | Created |
|---|-------|--------|---------|
| 4 | Create backend API for clinic CRUD | — | 2026-05-18 |
| 3 | Design database schema for clinics | — | 2026-05-18 |

### Auto-Accept Rule
When a PR or commit references an issue number (e.g., `Closes #5`, `Fixes #31`), the linked work is automatically accepted. This memory bank serves as the source of truth for all active/open issues.

---

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
- **7 new molecule components** created with Premium Dental Lab aesthetic:
  - **Avatar**: Image + initials fallback, 4 sizes (sm/md/lg/xl), gold border
  - **Toast**: Success/error/warning/info, slide-in animation, auto-dismiss, close button
  - **Modal**: Overlay + backdrop-filter blur, scale-in animation, sm/md/lg, ESC close
  - **Tabs**: Horizontal tab list, gold active indicator, disabled tab support
  - **Dropdown**: Custom select with options list, click-outside-to-close, gold focus
  - **Checkbox/Radio**: Styled control, gold checked state, label + error support
  - **Toggle**: iOS-style switch, sm/md sizes, bounce animation
- **Barrel export**: Updated `components/index.ts` with all new molecules
- **Plop template**: Fixed `index.ts.hbs` to include named exports
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
- [x] All molecule components (FormField, PasswordInput, Card, Avatar, Toast, Modal, Tabs, Dropdown, Checkbox, Toggle)
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
