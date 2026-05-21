# Project Brief

## Project Name

Dental Lab Order Management System (KanjoLab)

## Branch

`refactor/frontend-rewrite`

## Overview

Full-stack web application — Order management system for prosthetic/dental work between Dentists and Lab Technicians.

This branch aims to: **Rewrite the frontend from scratch.**

## Core Goals (This Branch)

- Rebuild the frontend using **Atomic Design Pattern**
  - `atoms/` — Smallest UI units (Button, Input, Label, Icon)
  - `molecules/` — Combinations of multiple atoms (FormField, Card, NavItem)
  - `organisms/` — Complex UI sections (Header, Sidebar, LoginForm)
  - `templates/` — Page layouts (AuthTemplate, DashboardTemplate)
  - `pages/` — Full pages
- Build a scalable, maintainable frontend architecture using **System Design** principles
- Create a type-safe client layer fully compatible with the server API
- Support **i18n** (Arabic + English) in the future
- Add **WebSocket** real-time notifications (future)

## Tech Stack (This Branch)

- **Frontend**: Next.js 16 (React 19), TypeScript, CSS Modules
- **Architecture**: Atomic Design Pattern
- **Code Generator**: Plop (`plopfile.js`) — scaffolding
- **Design Tokens**: Custom tokens system (colors, spacing, typography)
- **Storybook**: Component development and documentation
- **Linting**: `@antfu/eslint-config`
- **Validation**: zod

### Planned Dependencies
- **HTTP Client**: Axios (withCredentials)
- **Notifications**: Sonner (toast library)
- **WebSocket**: Socket.IO (planned)
- **Global State**: TBD (Context API / Zustand / Redux — planned)
- **i18n**: next-intl or react-i18next (Arabic + English — planned)

## Backend (Unchanged — Working)

- Express.js 5, TypeScript, Prisma ORM (PostgreSQL)
- JWT (httpOnly cookie), bcryptjs, express-validator, nodemailer

## User Roles

1. **DENTIST** — Creates orders, assigns work
2. **LAB_TECHNICIAN** — Performs work, updates status

## API Base URL

- Server: `http://localhost:3000/api/v1`
- Client: `http://localhost:3001`
