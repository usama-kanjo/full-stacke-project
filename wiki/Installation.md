# Installation Guide

## Prerequisites

- **Node.js** >= 18.x
- **yarn** >= 1.22.x (package manager — do not use npm)
- **PostgreSQL** >= 14.x
- **Git**

---

## Step 1: Clone the Repository

```bash
git clone https://github.com/usama-kanjo/full-stacke-project.git
cd full-stacke-project
```

---

## Step 2: Install Dependencies

This project uses **yarn workspaces**. Install everything from the root:

```bash
yarn install
```

This installs dependencies for the root, server, and client workspaces automatically.

---

## Step 3: Environment Variables

### Server Configuration

Copy the example environment file:

```bash
cp server/.env.example server/.env
```

Edit `server/.env` with your values:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/kanjolab"

# JWT
JWT_SECRET="your-super-secret-key-change-this"
JWT_EXPIRES_IN="90d"
JWT_COOKIE_EXPIRES=90

# Email (Gmail SMTP)
EMAIL_USERNAME="your-email@gmail.com"
EMAIL_PASSWORD="your-app-password"
EMAIL_FROM="noreply@kanjolab.com"
COMPANY_NAME="kanjoLab"

# Email Mode: "ONLINE" (real emails) or "OFFLINE" (console.log)
SEND_MSG_METHOD="OFFLINE"

# Environment
NODE_ENV="development"
PORT=3000
```

> **Note about Gmail App Passwords:** If using Gmail SMTP with `SEND_MSG_METHOD=ONLINE`, you need an [App Password](https://support.google.com/accounts/answer/185833) (not your regular password). Enable 2-Factor Authentication on your Google account first, then generate an App Password.

### Client Configuration

Create `client/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1
```

---

## Step 4: Database Setup

### Create the Database

```bash
createdb kanjolab
# or via psql:
# psql -U postgres -c "CREATE DATABASE kanjolab;"
```

### Run Prisma Migrations

```bash
cd server
npx prisma migrate dev
```

This applies all existing migrations and generates the Prisma client.

### (Optional) View Database with Prisma Studio

```bash
cd server
yarn db:studio
```

Opens a GUI at `http://localhost:5555` to browse and edit data.

---

## Step 5: Start Development Servers

### Run Both Together (Recommended)

```bash
# From the project root — starts server (:3000) and client (:3001) concurrently
yarn dev
```

### Or Run Separately

#### Terminal 1 — Server (port 3000)

```bash
yarn server

# Offline email mode (codes printed to console):
# yarn server:offline
```

#### Terminal 2 — Client (port 3001)

```bash
yarn client
```

#### Terminal 3 — Storybook (port 6006)

```bash
yarn workspace client storybook
```

Visit **http://localhost:3001** for the app, **http://localhost:6006** for Storybook.

---

## Production Build

```bash
# Build the server
cd server
yarn build

# Build the client (from root or client dir)
yarn workspace client build
```

> For production, also set `NODE_ENV=production`, configure CORS, and use a production PostgreSQL instance.

---

## Available Scripts

### Root (yarn workspaces)

| Script | Description |
|--------|-------------|
| `yarn dev` | Run server + client concurrently |
| `yarn server` | Start server dev mode (port 3000) |
| `yarn client` | Start client dev mode (port 3001) |
| `yarn install` | Install all workspace dependencies |

### Server

| Script | Description |
|--------|-------------|
| `yarn dev` | Start dev server with hot reload |
| `yarn dev:offline` | Start dev server in offline email mode |
| `yarn build` | Compile TypeScript |
| `yarn test` | Run compiled test suite |
| `yarn lint` | Lint source code |
| `yarn typecheck` | TypeScript type checking |
| `yarn db:generate` | Regenerate Prisma client |
| `yarn db:migrate` | Run development migrations |
| `yarn db:studio` | Open Prisma Studio |

### Client

| Script | Description |
|--------|-------------|
| `yarn dev` | Start Next.js dev server on port 3001 |
| `yarn build` | Build for production |
| `yarn lint` | Run ESLint |
| `yarn storybook` | Start Storybook on port 6006 |
| `yarn plop` | Interactive component scaffold generator |
| `yarn plop:atom` | Scaffold a new atom component |
| `yarn plop:molecule` | Scaffold a new molecule component |
| `yarn plop:organism` | Scaffold a new organism component |

---

## Troubleshooting Installation

### Port Already in Use

```bash
# Find what's using the port
lsof -i :3000
# or
lsof -i :3001

# Kill the process
kill -9 <PID>
```

### Prisma Client Not Found

```bash
cd server
npx prisma generate
```

### PostgreSQL Connection Refused

Ensure PostgreSQL is running:

```bash
# Linux
sudo systemctl start postgresql

# macOS
brew services start postgresql
```

### TypeScript Compilation Errors

```bash
cd server
yarn typecheck
```

Fix any type errors, then try again.
