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
- Created **MainLayout** template (empty — ready for implementation)
- Created **Home** page component (empty — ready for implementation)
- Fixed Storybook config and design tokens integration
- Fixed `.gitignore` — added `.next/` to client ignore, fixed typo in root `.gitignore`
- Fixed Plop templates to generate 4 files per component
- Fixed `index.ts` re-export to use `default` export approach for ESLint compatibility
- Simplified `layout.tsx` and `page.tsx` in App Router
- Cleaned up old client components (register, LoginPage, dashboard, rootPage, Footer, etc.)

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

## Known Issues (Backend)
- Server is working, not touching it

## Known Issues (Frontend — To Be Resolved in This Branch)
1. Old `authService.ts` endpoints did not match the server — to be rewritten from scratch
2. `rigister` typo — to be fixed in atomic design rewrite
3. Broken icon imports — to be resolved with new Icon atom
4. Missing auth guard — to be added with AuthContext + protected routes
5. Order management frontend does not exist yet — future task

## Next Steps
- [x] Plop generator templates created (atom, molecule, organism)
- [x] Atomic Design folder structure created
- [x] Design tokens system created (colors, spacing, typography)
- [x] Button atom component done
- [x] Badge atom component done
- [ ] More atom components (Input, Label, Icon, Spinner, Typography)
- [ ] Molecule components (FormField, PasswordInput, Card)
- [ ] Organism components (LoginForm, RegisterForm, Header, Sidebar)
- [ ] Templates (AuthTemplate, DashboardTemplate, MainLayout)
- [ ] AuthContext + useAuth hook
- [ ] Axios instance + apiClient layer
- [ ] Auth service (matching server endpoints)
- [ ] Login page
- [ ] Register page
- [ ] Email verification page
- [ ] Forgot/Reset password pages
- [ ] Profile completion page
- [ ] Dashboard layout + pages
