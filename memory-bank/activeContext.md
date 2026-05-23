# Active Context

## Current Branch
`refactor/frontend-rewrite`

## Current Focus
Rewriting the frontend from scratch using **Atomic Design Pattern**. Old client components have been completely cleaned out. Building a systematic, scalable frontend architecture from the ground up.

The server is fully functional — we are only focusing on the frontend.

## Recent Changes
- Added `@antfu/eslint-config` for consistent linting
- Added **zod** for client-side validation
- Added **Plop** code generator with separate `.hbs` template files
  - Plopfile generates 4 files per component: `Component.tsx`, `Component.module.css`, `Component.stories.tsx`, `index.ts`
  - Generators: `atoms`, `molecules`, `organisms` (with `pages` and `templates` commented out)
- Created **Design Tokens** system:
  - `tokens/colors.ts`, `tokens/spacing.ts`, `tokens/typography.ts`
  - `tokens/tokens.css` — CSS custom properties
  - Exported through `tokens/index.ts`
- Configured `.storybook/` for component development
- Created **Button** atom component (4 files) with:
  - 3 variants: `primary`, `secondary`, `outline`
  - 3 sizes: `sm`, `md`, `lg`
  - Loading spinner state
  - Disabled state
  - Full width option
  - Storybook stories for each variant/size combination
- Created **Badge** atom component with:
  - 3 variants: `default`, `success`, `warning`
  - Storybook stories
- Created **Icon** atom component with SVG icon list
- Created **Input** atom component
- Created **Label** atom component
- Created **Spinner** atom component
- Created **Typography** atom component
- Created **Card** molecule component
- Created **FormField** molecule component (Label + Input + Error)
- Created **PasswordInput** molecule component (Input + visibility toggle)
- Created **MainLayout** template (empty — ready for implementation)
- Created **Home** page component (empty — ready for implementation)
- Fixed Storybook config and design tokens integration
- Fixed `.gitignore` — added `.next/` to client ignore, fixed typo in root `.gitignore`
- Fixed Plop templates to generate 4 files per component
- Fixed `index.ts` re-export to use `default` export approach for ESLint compatibility
- Simplified `layout.tsx` and `page.tsx` in App Router
- Cleaned up old client components (register, LoginPage, dashboard, rootPage, Footer, etc.)

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
