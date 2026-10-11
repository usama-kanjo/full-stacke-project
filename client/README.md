# KanjoLab Client — Frontend

**English** | [**Türkçe**](../docs/client/README.tr.md) | [**العربية**](../docs/client/README.ar.md)

*Next.js 16 frontend for KanjoLab, built with the Atomic Design Pattern.*

---

## Overview

The client is a **Next.js 16 (App Router) + React 19** application written in **TypeScript** (strict mode). It follows the **Atomic Design Pattern** and uses **CSS Modules** for component-scoped styling, a centralized **design token** system, **zod** for form validation, **Axios** for API calls, and **Sonner** for toast notifications.

**Current status:** The design system and all auth components are complete. Auth flow, dashboard, profile, and settings pages are built. Order management is next.

## Tech Stack

- **Framework:** Next.js 16 (App Router), React 19
- **Language:** TypeScript (strict)
- **Styling:** CSS Modules + design tokens (colors, spacing, typography, z-index, transitions)
- **Architecture:** Atomic Design Pattern (`atoms` → `molecules` → `organisms` → `templates` → `pages`)
- **HTTP Client:** Axios (with interceptors)
- **Notifications:** Sonner (toast)
- **Validation:** zod (centralized schemas in `lib/schemas/`)
- **Component Development:** Storybook 10
- **Code Scaffolding:** Plop
- **Linting:** @antfu/eslint-config (named exports only)

## Project Structure

```
client/src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout (AuthProvider + Toaster)
│   ├── page.tsx            # "/" → AuthTemplate + AuthModal
│   └── dashboard/          # Dashboard (Home, Profile, Settings)
├── assets/                 # Static assets (fonts, etc.)
├── components/
│   ├── atoms/              # Smallest UI units
│   ├── molecules/          # Combined atoms
│   ├── organisms/          # Complex sections
│   ├── templates/          # Page layouts
│   ├── pages/              # Full page components
│   └── index.ts            # Barrel export
├── tokens/                 # Design tokens (colors, spacing, typography)
├── types/                  # TypeScript type definitions
├── lib/                    # API client + zod schemas
├── services/               # API service layer
├── hooks/                  # Custom React hooks (useAuth, useForm, useDebounce)
└── context/                # React Context providers (AuthProvider)
```

### Component Inventory

- **Atoms (7):** Button, Badge, Input, Label, Icon, Spinner, Typography
- **Molecules (10):** FormField, PasswordInput, Card, Avatar, Modal, Toast, Tabs, Dropdown, Checkbox, Toggle
- **Organisms (11):** AuthModal, LoginForm, RegisterForm, EmailVerificationForm, ForgotPasswordForm, ResetPasswordForm, Header, Sidebar, ProfileCompletionForm, DashboardHome, DashboardProfile, DashboardSettings
- **Templates:** AuthTemplate, DashboardTemplate, MainLayout
- **Pages:** Home

## Available Scripts

| Script | Description |
|--------|-------------|
| `yarn dev` | Start Next.js dev server on **port 3001** |
| `yarn build` | Build for production |
| `yarn start` | Start the production build |
| `yarn lint` | Run ESLint |
| `yarn typecheck` | TypeScript type checking (`tsc --noEmit`) |
| `yarn storybook` | Start Storybook on **port 6006** |
| `yarn build-storybook` | Build the Storybook static site |
| `yarn plop` | Interactive component scaffold generator |
| `yarn plop:atom` | Scaffold a new atom component |
| `yarn plop:molecule` | Scaffold a new molecule component |
| `yarn plop:organism` | Scaffold a new organism component |
| `yarn plop:page` | Scaffold a new page |

## Environment Variables

Create a `.env.local` file in the client root:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1
```

| Variable | Default | Description |
|----------|---------|-------------|
| `NEXT_PUBLIC_API_URL` | `http://localhost:3000/api/v1` | Base URL for the server API |

## Storybook

```bash
yarn storybook
# → http://localhost:6006
```

## Code Generation (Plop)

```bash
yarn plop      # Interactive — choose a generator
yarn plop:atom # → src/components/atoms/ComponentName/ (index.tsx + .module.css + .stories.tsx)
```

## Testing & Quality

```bash
yarn lint       # ESLint
yarn typecheck  # TypeScript strict check
```

The full project quality gate (`lint` + `typecheck` + gitleaks) runs via `yarn validate` from the repository root.

## Related

- [Root README](../README.md)
- [Server README](../server/README.md)
- [User Guide](../wiki/User-Guide.md)