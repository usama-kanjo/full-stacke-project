# Product Context

## Purpose
Dental Lab Order Management System — A platform for managing prosthetic/dental work orders between Dentists and Lab Technicians. Dentists create orders and assign them directly to lab technicians.

## Branch Focus: Frontend Rewrite
We are not touching the backend in this branch. Only the frontend is being rewritten from scratch using the Atomic Design Pattern. The server is fully functional.

## User Flow (Application Flow)
1. **Register** — Sign up with email + password
2. **Email Verification** — Verify with 6-digit code (OFFLINE mode shows in console)
3. **Complete Profile** — Select role (DENTIST/LAB_TECHNICIAN) + profile details
4. **Login** — Verified user login
5. **Dashboard** — Role-based routing

## Core Features (Server — Fully Working)
- **User Management**: Registration, Login, Email verification (6-digit code), Resend code
- **Profile Completion**: Dentist (clinicName, clinicAddress, clinicCity) / Technician (labName, labAddress, labCity, specialties[])
- **Password Management**: Change password (authenticated), Forgot/Reset password (6-digit code)
- **Logout**: Token cookie clearing
- **JWT Auth**: httpOnly cookie-based with Bearer token fallback

## Core Features (Frontend — To Be Built From Scratch)
- [ ] Rebuild all UI components with Atomic Design
- [ ] Login page
- [ ] Register page
- [ ] Email verification page
- [ ] Forgot/Reset password pages
- [ ] Profile completion page
- [ ] Dashboard layout (Header + Sidebar)
- [ ] Dashboard home page
- [ ] Dashboard profile page
- [ ] Dashboard settings page
- [ ] Order management (future)

## Database Models (Unchanged)
- **User**: email, passwordHash, role, isProfileComplete, isVerified, verification/reset fields
- **Dentist**: userId, fullName, phone, clinicName, clinicAddress, clinicCity, orders[]
- **Technician**: userId, fullName, phone, labName, labAddress, labCity, specialties[], orders[]
- **Order**: dentistId, patientName, toothNumber, workType, shade, urgency, description, technicianId, status, price, currency, deadline

## Language
- UI: Turkish (login/register pages, email templates)
- Backend validation messages: English
