# Project Brief

## Project Name
Dental Lab Order Management System (KanjoLab)

## Branch
`refactor/frontend-rewrite`

## Overview
Full-stack web application — Dişçi (Dentist) ve Laborant (Lab Technician) arasında protez/diş işi sipariş yönetim sistemi.

Bu branch'in amacı: **Frontend'i sıfırdan yazmak.**

## Core Goals (This Branch)
- Frontend'i **Atomic Design Pattern** ile yeniden inşa etmek
  - `atoms/` — En küçük UI birimleri (Button, Input, Label, Icon)
  - `molecules/` — Birden çok atomun birleşimi (FormField, Card, NavItem)
  - `organisms/` — Karmaşık UI bölümleri (Header, Sidebar, LoginForm)
  - `templates/` — Sayfa şablonları (AuthTemplate, DashboardTemplate)
  - `pages/` — Tam sayfalar
- **System Design** prensipleriyle ölçeklenebilir, bakımı kolay frontend mimarisi kurmak
- Server API'si ile tam uyumlu, tip-güvenli bir client katmanı oluşturmak

## Tech Stack (This Branch)
- **Frontend**: Next.js 16 (React 19), TypeScript, CSS Modules
- **Mimari**: Atomic Design Pattern
- **HTTP Client**: Axios (withCredentials)
- **Notifications**: Sonner (toast library)
- **State Management**: React Context + hooks (gerektikçe)

## Backend (Değişmiyor, çalışır durumda)
- Express.js 5, TypeScript, Prisma ORM (PostgreSQL)
- JWT (httpOnly cookie), bcryptjs, express-validator, nodemailer

## User Roles
1. **DENTIST** — Dişçi, sipariş oluşturur, işi atar
2. **LAB_TECHNICIAN** — Laborant, işi yapar, durumu günceller

## API Base URL
- Server: `http://localhost:3000/api/v1`
- Client: `http://localhost:3001`
