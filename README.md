# KanjoLab — Dental Lab Order Management System

**English** | [**Türkçe**](docs/README.tr.md) | [**العربية**](docs/README.ar.md)

*A web-based platform for managing dental prosthesis orders between dentists and laboratory technicians.*

---

## Table of Contents

- [What is this project?](#what-is-this-project)
- [Current Status](#current-status)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Quick Start](#quick-start)
- [Available Scripts](#available-scripts)
- [API Endpoints](#api-endpoints)
- [Code Generation (Plop)](#code-generation-plop)
- [Database Schema](#database-schema)
- [Documentation](#documentation)
- [Project Rules](#project-rules)
- [License](#license)

---

## What is this project?

**KanjoLab** is a comprehensive **dental lab order management system** that digitizes the workflow between dentists and laboratory technicians. Dentists create prosthetic/dental work orders and assign them directly to lab technicians, with full status tracking from creation to completion.

The repository is a **monorepo** (`yarn workspaces`) with two packages:

| Package | Path | Description |
|---------|------|-------------|
| **client** | [`client/`](client/README.md) | Next.js 16 frontend (Atomic Design Pattern) |
| **server** | [`server/`](server/README.md) | Express.js 5 backend (API, auth, database) |

## Current Status

- **Backend** (Express 5 + Prisma + PostgreSQL) — **Fully working**, all auth and profile endpoints complete
- **Frontend** (Next.js 16 + React 19) — **Being rewritten** with Atomic Design Pattern. Design system, all atoms, molecules, and organisms are built; auth flow, dashboard, profile, and settings pages are complete. Order management is next.

## Features

- **Secure Authentication** — Register, login, email verification with 6-digit code, password reset
- **Role-Based Access** — Dentist and Lab Technician roles with separate profiles and views
- **Profile Management** — Complete your profile after registration with role-specific fields (clinic info for dentists, lab info for technicians)
- **Dashboard** — Role-based header, sidebar navigation, profile view/edit, and settings pages
- **Order Management** — *(coming soon)* — Create, assign, track, and complete dental work orders
- **Email Notifications** — Verification codes and password reset emails via SMTP (real or dev console logging)
- **Component System** — Storybook, Plop scaffolding, design tokens, and zod validation

## Tech Stack

#### Client (Frontend — In Progress)

- **Next.js 16 & React 19** with TypeScript — App Router
- **CSS Modules** — Component-scoped styling
- **Atomic Design Pattern** — `atoms/` → `molecules/` → `organisms/` → `templates/` → `pages/`
- **Axios** — HTTP client with interceptors
- **Sonner** — Toast notifications
- **Storybook 10** — Component development & documentation
- **Plop** — Code scaffolding for consistent components
- **zod** — Client-side form validation
- **@antfu/eslint-config** — Code quality

#### Server (Backend — Complete)

- **Node.js & Express.js 5** — ESM modules
- **PostgreSQL & Prisma ORM v7** — Database & migrations
- **JWT & cookie-parser** — Auth & session management (httpOnly cookie + Bearer fallback)
- **bcryptjs** — Password hashing
- **express-validator** — Input validation
- **nodemailer** — Email (Gmail SMTP, ONLINE/OFFLINE modes)

#### Planned Dependencies

- **Socket.IO** — Real-time notifications (planned)
- **next-intl / react-i18next** — Arabic + English UI i18n (planned)

## Project Structure

```
authInMern/
├── client/                     # Next.js 16 frontend
│   └── src/
│       ├── app/                # Pages (App Router)
│       ├── assets/             # Static assets (fonts, etc.)
│       ├── components/
│       │   ├── atoms/          # Smallest UI units (Button, Input, etc.)
│       │   ├── molecules/      # Combined atoms (FormField, Card, etc.)
│       │   ├── organisms/      # Complex sections (AuthModal, Header, etc.)
│       │   ├── templates/      # Page layouts (Auth, Dashboard)
│       │   └── pages/          # Full page components
│       ├── tokens/             # Design tokens (colors, spacing, typography)
│       ├── types/              # TypeScript type definitions
│       ├── lib/                # API client, zod schemas
│       ├── services/           # API service layer
│       ├── hooks/              # Custom React hooks
│       └── context/            # React Context providers
├── server/                     # Express.js backend
│   └── src/
│       ├── config/             # DB & JWT configuration
│       ├── controllers/        # Request handlers
│       ├── middlewares/        # Auth, error, validation
│       ├── routes/v1/          # API route definitions
│       ├── services/           # Business logic
│       ├── types/              # TypeScript type augmentation
│       ├── utils/              # ApiError class
│       └── validators/         # express-validator chains
├── wiki/                       # Project documentation (Home, Installation, API, FAQ…)
├── docs/                       # Translated READMEs (Türkçe, العربية)
└── memory-bank/                # Project documentation & issue tracking
```

## Quick Start

**Important:** This project uses **yarn** as package manager — never use npm.

```bash
# 1. Clone and install dependencies (root + workspaces)
git clone https://github.com/usama-kanjo/full-stacke-project.git
cd authInMern
yarn install

# 2. Set up environment variables
cp server/.env.example server/.env
echo "NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1" > client/.env.local

# 3. Run database migrations
cd server
yarn db:migrate
cd ..

# 4. Start the server (port 3000)
yarn server

# 5. Start the client (port 3001, separate terminal)
yarn client

# Or run both together
yarn dev
```

See the [Installation Guide](wiki/Installation.md) for detailed setup instructions.

#### Storybook (UI Component Development)

```bash
yarn workspace client storybook
# → http://localhost:6006
```

## Available Scripts

### Root (yarn workspaces)

| Script | Description |
|--------|-------------|
| `yarn dev` | Run server + client concurrently |
| `yarn server` | Start server dev mode (port 3000) |
| `yarn client` | Start client dev mode (port 3001) |
| `yarn build` | Build all workspaces |
| `yarn lint` | Lint all workspaces |
| `yarn typecheck` | TypeScript check all workspaces |
| `yarn validate` | Lint + typecheck + gitleaks secret scan |

Full script reference: [`client/README.md`](client/README.md) and [`server/README.md`](server/README.md).

## API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/v1/user/register` | Register a new user |
| POST | `/api/v1/user/login` | Login |
| POST | `/api/v1/user/verify-email` | Verify email with 6-digit code |
| POST | `/api/v1/user/resend-code` | Resend verification code |
| POST | `/api/v1/user/logout` | Logout |
| POST | `/api/v1/user/complete-profile` | Complete profile (select role) |
| PUT | `/api/v1/user/change-password` | Change password |
| POST | `/api/v1/user/forgot-password` | Request password reset code |
| POST | `/api/v1/user/reset-password` | Reset password with code |
| GET/PUT | `/api/v1/dentist/profile` | Dentist profile |
| GET/PUT | `/api/v1/technician/profile` | Technician profile |

Full request/response examples: [`wiki/API-Documentation.md`](wiki/API-Documentation.md).

## Code Generation (Plop)

The client uses **Plop** to scaffold components following the Atomic Design pattern.

| Command | Creates |
|---|---|
| `yarn plop` | Interactive — choose a generator |
| `yarn plop:atom` | `src/components/atoms/ComponentName/` (index.tsx + .module.css + .stories.tsx) |
| `yarn plop:molecule` | `src/components/molecules/ComponentName/` (same 3 files) |
| `yarn plop:organism` | `src/components/organisms/ComponentName/` (same 3 files) |
| `yarn plop:page` | `src/app/page-name/page.tsx` (page only) |

Example:

```bash
yarn plop:atom
# → "Component name (PascalCase):" → Button
# → src/components/atoms/Button/index.tsx
# → src/components/atoms/Button/Button.module.css
# → src/components/atoms/Button/Button.stories.tsx
```

## Database Schema

- **User** → email, password, role, verification status
- **Dentist** → clinic name, address, phone
- **Technician** → lab name, specialties
- **Order** → patient info, tooth number, work type, shade, status, price, deadline

## Documentation

See the [`wiki/`](wiki/) folder for in-depth guides:

| Document | Description |
|----------|-------------|
| [Installation Guide](wiki/Installation.md) | Step-by-step setup instructions |
| [API Documentation](wiki/API-Documentation.md) | All endpoints with request/response examples |
| [User Guide](wiki/User-Guide.md) | End-to-end usage guide |
| [FAQ](wiki/FAQ.md) | Frequently asked questions |
| [12-Month Roadmap](Plans/README.md) | Product roadmap (EN/AR/TR) |

### README Translations (📄 Docs)

| Language | File |
|----------|------|
| **Türkçe** | [`docs/README.tr.md`](docs/README.tr.md) |
| **العربية** | [`docs/README.ar.md`](docs/README.ar.md) |

## Project Rules

- **Package Manager:** yarn ONLY — never use npm
- **Branch Scope:** Only work on the current branch's scope to avoid merge conflicts
- **Branch Per Change:** Every piece of work gets its own branch, merged with `--no-ff`
- **Code Quality:** TypeScript strict, no `any`, named exports only, lint + typecheck enforced via `yarn validate`

## License

ISC — see [LICENSE](LICENSE)