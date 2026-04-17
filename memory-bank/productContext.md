# Product Context

## Purpose
Dental Lab Order Management System - Dişçi ve Laborant arasında protez sipariş yönetim platformu.

## Core Features
- **User Management**: Registration, Login, Email verification
- **Profile Completion**: Dentist/Laborant profile setup after registration
- **Order Management**: 
  - Dentist creates order (patient info, work type, shade, urgency)
  - Direct assignment to technician
  - Status tracking (PENDING → IN_PROGRESS → COMPLETED/CANCELLED)
- **Password Management**: Change password functionality

## User Experience
- **Dentist**: Login → Complete profile → Create order → Track status
- **Technician**: Login → Complete profile → View assigned orders → Update status

## Database Models
- **User**: email, passwordHash, role, isProfileComplete, isVerified
- **Dentist**: userId, fullName, phone, clinicName, clinicAddress, clinicCity
- **Technician**: userId, fullName, phone, labName, labAddress, labCity, specialties[]
- **Order**: dentistId, patientName, toothNumber, workType, shade, urgency, description, technicianId, status, price, deadline