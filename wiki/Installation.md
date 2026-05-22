# Installation Guide

## Prerequisites

- **Node.js** >= 18.x
- **npm** >= 9.x
- **PostgreSQL** >= 14.x
- **Git**

---

## Step 1: Clone the Repository

```bash
git clone https://github.com/<your-username>/authInMern.git
cd authInMern
```

---

## Step 2: Install Dependencies

```bash
# Install root-level dependencies
npm install

# Install server dependencies
cd server
npm install
cd ..

# Install client dependencies
cd client
npm install
cd ..
```

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

This applies all 8 existing migrations and generates the Prisma client.

### (Optional) View Database with Prisma Studio

```bash
cd server
npm run db:studio
```

Opens a GUI at `http://localhost:5555` to browse and edit data.

---

## Step 5: Start Development Servers

### Terminal 1 — Server (port 3000)

```bash
cd server

# Standard mode (real email if configured)
npm run dev

# Offline mode (verification codes printed to console)
npm run dev:offline
```

### Terminal 2 — Client (port 3001)

```bash
cd client
npm run dev
```

Visit **http://localhost:3001** in your browser.

---

## Production Build

```bash
# Build the server
cd server
npm run build

# Start in production mode
npm start
```

> Note: For production, also build the Next.js client with `cd client && npm run build && npm start`.

---

## Available NPM Scripts

### Server

| Script | Description |
|--------|-------------|
| `npm run dev` | Start dev server with hot reload |
| `npm run dev:debug` | Start dev server with Node.js inspector |
| `npm run dev:offline` | Start dev server in offline email mode |
| `npm run build` | Compile TypeScript |
| `npm start` | Production build + start |
| `npm run test` | Run compiled test suite |
| `npm run lint` | Lint source code |
| `npm run typecheck` | TypeScript type checking |
| `npm run db:generate` | Regenerate Prisma client |
| `npm run db:migrate` | Run development migrations |
| `npm run db:studio` | Open Prisma Studio |
| `npm run db:seed` | Run seed script |
| `npm run db:push` | Push schema to database |

### Client

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Next.js dev server on port 3001 |
| `npm run build` | Build for production |
| `npm start` | Start production server on port 3001 |
| `npm run lint` | Run ESLint |

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
npm run typecheck
```

Fix any type errors, then try again.
