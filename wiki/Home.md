# kanjoLab — Dental Lab Order Management System

**kanjoLab** is a full-stack web application that streamlines the workflow between dentists and dental lab technicians. It enables dentists to create prosthetic/dental work orders and assign them directly to lab technicians, with full status tracking from creation to completion.

Current branch: **`refactor/frontend-rewrite`** — Frontend being rewritten from scratch using **Atomic Design Pattern**.

---

## Current Status

- **Backend** (Express 5 + Prisma + PostgreSQL) — **Fully working**, all auth and profile endpoints complete
- **Frontend** (Next.js 16 + React 19) — **Being rewritten** with Atomic Design Pattern. Design system and all UI components (7 atoms + 10 molecules) are built; pages and auth flows are in progress

---

## Features

- **Secure Authentication** — Register, login, email verification with 6-digit code, password reset
- **Role-Based Access** — Dentist and Lab Technician roles with separate profiles and views
- **Profile Management** — Complete your profile after registration with role-specific fields (clinic info for dentists, lab info for technicians)
- **Order Management** *(coming soon)* — Create, assign, track, and complete dental work orders
- **Email Notifications** — Verification codes and password reset emails via SMTP (real or dev console logging)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 16 (App Router), React 19, TypeScript, CSS Modules |
| **Architecture** | Atomic Design Pattern (`atoms/` → `molecules/` → `organisms/` → `templates/`) |
| **Component Dev** | Storybook 10 |
| **Code Scaffolding** | Plop code generator |
| **Validation** | zod (client) + express-validator (server) |
| **Backend** | Express.js 5, TypeScript, ESM |
| **Database** | PostgreSQL via Prisma ORM v7 |
| **Auth** | JWT (httpOnly cookie + Bearer fallback), bcryptjs |
| **Email** | Nodemailer (Gmail SMTP) with ONLINE/OFFLINE modes |

### Planned Dependencies
- **Axios** — HTTP client (planned)
- **Sonner** — Toast notifications (planned)
- **Socket.IO** — Real-time notifications (planned)
- **next-intl / react-i18next** — Arabic + English i18n (planned)

---

## System Architecture

```
┌──────────────────────────────────┐       ┌──────────────────────────────┐
│   Next.js Client (localhost:3001)│ ───→  │   Express.js Server          │
│                                  │       │   (localhost:3000)           │
│   Atomic Design UI (CSS Modules) │       │                              │
│   Storybook / Plop / zod         │       │  Routes → Controllers        │
└──────────────────────────────────┘       │  → Services → Prisma ORM     │
                                           └──────────┬───────────────────┘
                                                      │
                                                      ▼
                                              ┌────────────────┐
                                              │   PostgreSQL   │
                                              │   Database     │
                                              └────────────────┘
```

---

## Project Structure

```
full-stacke-project/
├── client/                     # Next.js 16 frontend
│   └── src/
│       ├── app/                # Pages (App Router)
│       ├── components/
│       │   ├── atoms/          # Smallest UI units (Button, Input, etc.)
│       │   ├── molecules/      # Combined atoms (FormField, Card, etc.)
│       │   ├── organisms/      # Complex sections (planned)
│       │   └── templates/      # Page layouts (planned)
│       ├── tokens/             # Design tokens (colors, spacing, typography)
│       ├── types/              # TypeScript type definitions
│       └── assets/             # Static assets (fonts, etc.)
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
└── memory-bank/                # Project documentation & issue tracking
```

---

## Quick Start

**Important:** This project uses **yarn** as package manager (never npm).

```bash
# Clone the repository
git clone https://github.com/usama-kanjo/full-stacke-project.git
cd full-stacke-project

# Install all dependencies (root + workspaces)
yarn install

# Set up environment variables
cp server/.env.example server/.env

# Run database migrations
cd server
npx prisma migrate dev
cd ..

# Start both server (:3000) and client (:3001)
yarn dev

# Or start separately:
# Terminal 1: yarn server
# Terminal 2: yarn client

# Storybook (UI component library):
yarn workspace client storybook
# → http://localhost:6006
```

---

## API Base URL

```
http://localhost:3000/api/v1
```

---

## License

ISC
