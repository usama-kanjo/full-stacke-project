# Product Context

## Purpose
Dental Lab Order Management System — Dişçi ve Laborant arasında protez sipariş yönetim platformu. Dentists create orders for prosthetic/dental work and assign them directly to lab technicians.

## Branch Focus: Frontend Rewrite
Bu branch'te backend'e hiç dokunmuyoruz. Sadece frontend atomic design pattern ile sıfırdan yazılıyor. Server zaten tamamen çalışır durumda.

## User Flow (Uygulama Akışı)
1. **Register** — Email + password ile kayıt
2. **Email Verification** — 6 haneli kod ile doğrulama (OFELINE modda console'da)
3. **Complete Profile** — Rol seçimi (DENTIST/LAB_TECHNICIAN) + profil detayları
4. **Login** — Doğrulanmış kullanıcı girişi
5. **Dashboard** — Role göre yönlendirme

## Core Features (Server - Tamamen Çalışıyor)
- **User Management**: Registration, Login, Email verification (6-digit code), Resend code
- **Profile Completion**: Dentist (clinicName, clinicAddress, clinicCity) / Technician (labName, labAddress, labCity, specialties[])
- **Password Management**: Change password (authenticated), Forgot/Reset password (6-digit code)
- **Logout**: Token cookie clearing
- **JWT Auth**: httpOnly cookie-based with Bearer token fallback

## Core Features (Frontend - Sıfırdan Yazılacak)
- [ ] Tüm UI componentları Atomic Design ile yeniden inşa
- [ ] Login sayfası
- [ ] Register sayfası
- [ ] Email verification sayfası
- [ ] Forgot/Reset password sayfası
- [ ] Profile completion sayfası
- [ ] Dashboard layout (Header + Sidebar)
- [ ] Dashboard ana sayfa
- [ ] Dashboard profil sayfası
- [ ] Dashboard ayarlar sayfası
- [ ] Order management (future)

## Database Models (Değişmiyor)
- **User**: email, passwordHash, role, isProfileComplete, isVerified, verification/reset fields
- **Dentist**: userId, fullName, phone, clinicName, clinicAddress, clinicCity, orders[]
- **Technician**: userId, fullName, phone, labName, labAddress, labCity, specialties[], orders[]
- **Order**: dentistId, patientName, toothNumber, workType, shade, urgency, description, technicianId, status, price, currency, deadline

## Language
- UI: Turkish (login/register pages, email templates)
- Backend validation messages: English
