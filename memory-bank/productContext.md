# Product Context

## Purpose
Dental Lab Order Management System - Dişçi ve Laborant arasında protez sipariş yönetim platformu. Dentists create orders for prosthetic/dental work and assign them directly to lab technicians.

## User Flow
1. **Register** - User signs up with email + password
2. **Email Verification** - 6-digit code sent via email (or console in OFFLINE mode)
3. **Complete Profile** - User chooses role (DENTIST/LAB_TECHNICIAN) and fills in profile details
4. **Login** - Verified users can log in
5. **Dashboard** - Role-based dashboard access

## Core Features (Implemented)
- **User Management**: Registration, Login, Email verification (6-digit code), Resend code
- **Profile Completion**: Dentist (clinicName, clinicAddress, clinicCity) / Technician (labName, labAddress, labCity, specialties[]) profile
- **Password Management**: Change password (authenticated), Forgot/Reset password (6-digit code)
- **Logout**: Token cookie clearing
- **JWT Auth**: httpOnly cookie-based with Bearer token fallback

## Core Features (Not Yet Implemented)
- **Order Management**: Order creation, assignment, status tracking (schema exists)
- **Dashboard**: Real data integration (currently placeholder/hardcoded)

## Database Models
- **User**: email, passwordHash, role (DENTIST|LAB_TECHNICIAN), isProfileComplete, isVerified, emailVerification fields, passwordReset fields
- **Dentist**: userId, fullName, phone, clinicName, clinicAddress, clinicCity, orders[]
- **Technician**: userId, fullName, phone, labName, labAddress, labCity, specialties[], orders[]
- **Order**: dentistId, patientName, toothNumber, workType, shade, urgency, description, technicianId, status (PENDING|IN_PROGRESS|COMPLETED|CANCELLED), price, currency, deadline

## Language
- UI: Turkish (login/register pages, email templates)
- Backend validation messages: English
