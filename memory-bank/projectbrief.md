# Project Brief

## Project Name
Dental Lab Order Management System (authInMern)

## Overview
Full-stack web application - Dişçi (Dentist) ve Laborant (Lab Technician) arasında protez/diş işi sipariş yönetim sistemi.

## Core Goals
- Secure authentication (Register, Login, Email Verification with 6-digit code)
- Role-Based Access Control (Dentist, Lab Technician)
- Order creation and tracking (dentist -> technician)
- Professional dental lab workflow management

## Tech Stack
- **Frontend**: Next.js 16 (React 19), TypeScript
- **Backend**: Express.js 5 (Node.js)
- **Database**: PostgreSQL via Prisma ORM
- **Auth**: JWT (cookie-based), bcryptjs
- **Validation**: express-validator
- **Email**: Nodemailer
- **HTTP Client**: Axios
- **Notifications**: Sonner

## User Roles
1. **DENTIST** - Dişçi, sipariş oluşturur, işi atar
2. **LAB_TECHNICIAN** - Laborant, işi yapar, durumu günceller