# kanjoLab — Dental Lab Order Management System

**kanjoLab** is a full-stack web application that streamlines the workflow between dentists and dental lab technicians. It enables dentists to create prosthetic/dental work orders and assign them directly to lab technicians, with full status tracking from creation to completion.

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
| **Backend** | Express.js 5, TypeScript, ESM |
| **Database** | PostgreSQL via Prisma ORM v6 |
| **Auth** | JWT (httpOnly cookie + Bearer fallback), bcryptjs |
| **Validation** | express-validator |
| **Email** | Nodemailer (Gmail SMTP) with ONLINE/OFFLINE modes |
| **HTTP Client** | Axios (withCredentials) |
| **Notifications** | Sonner (toast library) |

---

## System Architecture

```
┌─────────────────────┐       ┌──────────────────────────────┐
│   Next.js Client    │ ───→  │     Express.js Server        │
│   (localhost:3001)  │       │     (localhost:3000)         │
│                     │       │                              │
│  Axios + Cookies    │       │  Routes → Controllers        │
│  CSS Modules UI     │       │  → Services → Prisma ORM     │
└─────────────────────┘       └──────────┬───────────────────┘
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
authInMern/
├── client/                  # Next.js 16 frontend
│   └── src/
│       ├── app/             # Pages (auth, dashboard, home)
│       ├── components/      # UI components
│       ├── services/        # API client & auth service
│       └── lib/             # Axios configuration
├── server/                  # Express.js backend
│   └── src/
│       ├── config/          # DB & JWT configuration
│       ├── controllers/     # Request handlers
│       ├── middlewares/      # Auth, error, validation
│       ├── routes/v1/       # API route definitions
│       ├── services/        # Business logic
│       ├── types/           # TypeScript type augmentation
│       ├── utils/           # ApiError class
│       └── validators/      # express-validator chains
└── memory-bank/             # Project documentation
```

---

## Quick Start

```bash
# Clone the repository
git clone https://github.com/<your-username>/authInMern.git
cd authInMern

# Install dependencies (root, server, client)
npm install
cd server && npm install && cd ..
cd client && npm install && cd ..

# Set up environment variables
cp server/.env.example server/.env

# Start database & run migrations
cd server
npx prisma migrate dev
npm run dev          # starts server on :3000

# In another terminal
cd client
npm run dev          # starts client on :3001
```

---

## API Base URL

```
http://localhost:3000/api/v1
```

---

## License

ISC
