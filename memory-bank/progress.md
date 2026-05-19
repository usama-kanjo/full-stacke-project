# Progress

## Branch: `refactor/frontend-rewrite`

## What Works
### Backend (Server — Tamamen Çalışıyor, Dokunulmuyor)
- [x] Express 5 server with TypeScript (ESM)
- [x] Prisma ORM (PostgreSQL, 8 migrations)
- [x] User registration + bcrypt hashing
- [x] Email verification (6-digit code, ONLINE/OFFLINE)
- [x] Resend verification code
- [x] JWT token (httpOnly cookie + Bearer fallback)
- [x] Login/Logout
- [x] Forgot/Reset password (6-digit code)
- [x] Change password (authenticated)
- [x] Profile completion (Dentist/Technician via Prisma transaction)
- [x] Dentist profile CRUD
- [x] Technician profile CRUD
- [x] Input validation (express-validator)
- [x] Centralized error handling (dev/prod)
- [x] CORS configuration
- [x] Custom test scripts

### Frontend (Client — Sıfırdan Yazılıyor)
- [x] Next.js 16 App Router kurulumu (temiz)
- [x] `.storybook` konfigürasyonu
- [x] **Plop** code generator eklendi
- [ ] Atomic Design klasör yapısı
- [ ] Atom component'lar (Button, Input, Label, Icon, Spinner)
- [ ] Molecule component'lar (FormField, PasswordInput, Card)
- [ ] Organism component'lar (LoginForm, RegisterForm, Header, Sidebar)
- [ ] Template'ler (AuthTemplate, DashboardTemplate)
- [ ] AuthContext + useAuth hook
- [ ] Axios instance + apiClient
- [ ] Auth servisi (server uyumlu)
- [ ] Login sayfası
- [ ] Register sayfası
- [ ] Email verification sayfası
- [ ] Forgot/Reset password sayfaları
- [ ] Profile completion sayfası
- [ ] Dashboard layout + sayfaları

### Database (Schema — Tamamen Çalışıyor)
- [x] User model
- [x] Dentist model
- [x] Technician model
- [x] Order model (with OrderStatus enum)
- [x] All indexes and relations

## Milestones

### Milestone 1: Foundation (Atomic Yapı)
- [ ] Klasör yapısını oluştur
- [ ] Tüm atom component'lar
- [ ] Storybook stories

### Milestone 2: Auth Flow (Page'ler)
- [ ] Tüm auth sayfaları (login, register, verify, password reset, profile completion)
- [ ] AuthContext ile global state
- [ ] Axios interceptor + error handling

### Milestone 3: Dashboard
- [ ] Dashboard layout (Header + Sidebar)
- [ ] Dashboard ana sayfa
- [ ] Dashboard profil
- [ ] Dashboard ayarlar

### Milestone 4: Order Management (Future)
- [ ] Order list, create, detail sayfaları
- [ ] Role-based routing

## Known Issues
- Backend'de sorun yok
- Frontend henüz daha başlangıç aşamasında — eski component'lar temizlendi, yenileri yazılacak
