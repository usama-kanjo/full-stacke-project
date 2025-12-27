# Tech Context

## Technologies
- **Frontend**:
  - **Framework**: Next.js 16 (React 19).
  - **Language**: TypeScript.
  - **Styling**: (Pending confirmation, likely CSS/Tailwind or CSS-in-JS).
  - **HTTP Client**: Axios.
  - **Notifications**: Sonner.

- **Backend**:
  - **Runtime**: Node.js.
  - **Framework**: Express 5.
  - **Database**: PostgreSQL.
  - **ORM**: Prisma.
  - **Validation**: express-validator.
  - **Auth**: JWT, bcryptjs.
  - **Email**: Nodemailer.

## Development Setup
- **Package Manager**: npm (judging by package-lock.json).
- **Environment Variables**: Managed via `.env` (dotenv).
- **Scripts**: 
  - Client: `dev` (port 3001), `build`.
  - Server: `dev` (nodemon), `pord` (production).

## Constraints
- **Ports**: 
  - Frontend: 3001
  - Backend: 3000 (default)
- **CORS**: Configured to allow `http://localhost:3001`.
