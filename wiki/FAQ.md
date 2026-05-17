# Frequently Asked Questions

## General

### What is kanjoLab?

kanjoLab is a dental lab order management system that connects dentists and lab technicians. Dentists can create work orders for prosthetic/dental work and assign them directly to technicians, with full status tracking.

### Who is this platform for?

The platform serves two user roles:
- **Dentists (Dişçi)** — Create and assign dental work orders
- **Lab Technicians (Laborant)** — Receive, work on, and complete orders

### Is kanjoLab free and open-source?

Yes, this project is open-source under the ISC license.

---

## Registration & Account

### What are the password requirements?

- Minimum 8 characters
- At least one uppercase letter (A-Z)
- At least one number (0-9)

### I didn't receive the verification email. What should I do?

1. Check your spam/junk folder
2. If running in development mode, check **the server console** for the 6-digit code (look for `Verification code: XXXXXX`)
3. Use the **resend code** button on the verification page
4. Make sure you're running with a valid email configuration if using ONLINE mode

### My verification code expired. What now?

Verification codes are valid for **10 minutes**. If yours expired, click the **"Resend Code"** button on the verification page to get a new one.

### Can I change my email address?

Email address changes are not currently supported. This feature may be added in a future update.

### Can I delete my account?

Account deletion is not currently available through the UI. Contact the system administrator if you need your account removed.

---

## Roles

### Can I change my role after completing my profile?

No, the role is permanently assigned when you complete your profile. You cannot switch between DENTIST and LAB_TECHNICIAN after profile completion.

### What happens if I choose the wrong role?

You would need to contact the system administrator or register with a new account using a different email.

---

## Authentication & Security

### How are my passwords stored?

Passwords are hashed using **bcryptjs** with a salt round of 10 before being stored in the database.

### How does authentication work?

The system uses **JWT (JSON Web Tokens)** stored in **httpOnly cookies**. This means:
- The token is not accessible via JavaScript (XSS protection)
- It's automatically sent with every request
- It can be automatically cleared on logout

### Is there a Bearer token option?

Yes, for non-browser clients (like API testing tools), you can use the `Authorization: Bearer <token>` header as a fallback. The token is returned in registration and login responses.

### What happens when my token expires?

JWT tokens are configured to expire after **90 days** by default. After expiration, you'll need to log in again. The client automatically redirects to the login page on 401 responses.

---

## Email

### What email service does the platform use?

The platform uses **Nodemailer** with **Gmail SMTP** for sending emails. You need a Gmail account with an App Password configured.

### What are ONLINE and OFFLINE email modes?

- **ONLINE** (`SEND_MSG_METOD=ONLINE`): Actually sends real emails via Gmail SMTP
- **OFFLINE** (`SEND_MSG_METOD=OFFLINE`): Prints verification codes to the server console — useful for development without email setup

### Can I use a different email provider?

Yes, modify the `transporter` configuration in `server/src/services/emailService.ts` to use any SMTP provider.

---

## Orders

### Can I create orders?

The order management feature is **under development**. The database schema (including `Order` model with status tracking) is ready, but the API endpoints and UI are not yet implemented.

### How does order assignment work?

Orders use a **direct assignment model** — the dentist selects a specific technician when creating the order. There is no bidding system.

### What order statuses are available?

- **PENDING** — Dentist created the order, technician assigned
- **IN_PROGRESS** — Technician accepted and is working on it
- **COMPLETED** — Technician finished the work
- **CANCELLED** — Order was cancelled

---

## Development

### How do I reset the database?

```bash
cd server
npx prisma migrate reset
```

This drops all data and reapplies migrations. You can optionally run the seed script afterwards:

```bash
npm run db:seed
```

### How do I view the database?

Use Prisma Studio:

```bash
cd server
npm run db:studio
```

This opens a web-based database browser at `http://localhost:5555`.

### How do I run the linter?

```bash
# Server
cd server
npm run lint

# Client
cd client
npm run lint
```

### How do I run TypeScript checks?

```bash
cd server
npm run typecheck
```

### What ports does the application use?

- **Server**: `http://localhost:3000`
- **Client**: `http://localhost:3001`
- **Prisma Studio**: `http://localhost:5555`

### Why is my client showing "NEXT_PUBLIC_API_URL" errors?

Make sure you have a `client/.env.local` file with:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1
```

### Can I deploy this to production?

Yes:

1. Set `NODE_ENV=production` in your server environment
2. Build both client and server
3. Configure CORS to allow your production domain
4. Use a production PostgreSQL instance
5. Set `COOKIE_DOMAIN` for cookie sharing across subdomains if needed
6. Configure `SEND_MSG_METOD=ONLINE` with valid SMTP credentials

---

## Troubleshooting

### I get CORS errors in the browser

Ensure the client's origin (`http://localhost:3001`) is in the server's `allowedOrigins` array in `server/src/index.ts`. Also make sure `withCredentials: true` is set in the client's Axios config.

### I get "Route not found" errors

Check that you're using the correct API path. All routes are prefixed with `/api/v1`. For example: `POST /api/v1/user/login` not `/api/v1/login`.

### Prisma connection errors

Ensure PostgreSQL is running and the `DATABASE_URL` in your `.env` file is correct. The format is:

```
postgresql://USER:PASSWORD@HOST:PORT/DATABASE
```

### The development server crashes on startup

Check for:
- Missing `.env` file (must exist in `server/` directory)
- Missing `JWT_SECRET` environment variable
- PostgreSQL not running
- Port 3000 or 3001 already in use

### I found a bug. How do I report it?

Please open an issue on the GitHub repository with:
- A clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Server logs (if applicable)
