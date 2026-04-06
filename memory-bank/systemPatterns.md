# System Patterns

## Architecture
The application follows a Client-Server architecture:
- **Client**: Next.js (React) application serving as the frontend user interface.
- **Server**: Node.js implementation using Express.js framework, serving RESTful APIs.

## Data Model
- **Database**: PostgreSQL.
- **ORM**: Prisma is used for schema definition and database interactions.
- **Relationships**:
  - `User` belongs to one `Role` (One-to-Many: Role -> Users).
  - `Role` has many `Skills` (One-to-Many: Role -> Skills). _(Note: Schema shows Role->Skills is One-to-Many based on `roleId` in Skill model, though logically strict separation might imply M:N, current implementation is 1:N)_

## Directory Structure
- `client/`: Next.js frontend source code.
- `server/`: Express backend source code.
  - `config/`: Configuration files (DB connection, etc.).
  - `controllers/`: Request handlers.
  - `middlewares/`: Express middlewares (Auth, Error handling).
  - `routes/`: API route definitions.
  - `prisma/`: Database schema and migrations.
  - `utils/`: Helper utility functions.

## Key Design Decisions
- **Authentication**: JWT based, storing tokens in cookies for security/persistence.
- **Separation of Concerns**: Controllers handle business logic, Routes handle endpoint definitions, Services (implied by folder) handle complex operations.
- **Error Handling**: Centralized error middleware (`globalError`) and custom `ApiError` class.
