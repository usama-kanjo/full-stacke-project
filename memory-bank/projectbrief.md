# Project Brief

## Project Name
Dental Lab Order Management System (authInMern / kanjoLab)

## Overview
Full-stack web application - Dişçi (Dentist) ve Laborant (Lab Technician) arasında protez/diş işi sipariş yönetim sistemi.

## Core Goals
- Secure authentication (Register, Login, Email Verification with 6-digit code)
- Role-Based Access Control (Dentist, Lab Technician)
- Order creation and tracking (dentist -> technician) with direct assignment
- Professional dental lab workflow management

## Tech Stack
- **Frontend**: Next.js 16 (React 19), TypeScript, CSS Modules
- **Backend**: Express.js 5 (Node.js), TypeScript
- **Database**: PostgreSQL via Prisma ORM
- **Auth**: JWT (cookie-based, httpOnly), bcryptjs
- **Validation**: express-validator
- **Email**: Nodemailer (Gmail SMTP) with ONLINE/OFFLINE modes
- **HTTP Client**: Axios (withCredentials)
- **Notifications**: Sonner (toast library)

## User Roles
1. **DENTIST** - Dişçi, sipariş oluşturur, işi atar
2. **LAB_TECHNICIAN** - Laborant, işi yapar, durumu günceller

## API Base URL
- Server: `http://localhost:3000/api/v1`
- Client: `http://localhost:3001`
