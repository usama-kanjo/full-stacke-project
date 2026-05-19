# Active Context

## Current Branch
`refactor/frontend-rewrite`

## Current Focus
Frontend'i **Atomic Design Pattern** ile sıfırdan yazıyoruz. Eski client componentları tamamen temizlendi. Sıfırdan, sistemli ve ölçeklenebilir bir frontend mimarisi kuruluyor.

Server tarafı zaten tamamen çalışır durumda — sadece frontend'e odaklanıyoruz.

## Recent Changes
- Eski client componentları temizlendi (rigister, LoginPage, dashboard, rootPage, Footer vs.)
- `.storybook` eklendi
- `next.config.ts`, `layout.tsx`, `page.tsx` sadeleştirildi
- `yarn.lock` güncellendi
- **Plop** (`plop`) eklendi — code generator (scaffolding) aracı

## Active Decisions
- **Atomic Design Pattern**: `atoms/` → `molecules/` → `organisms/` → `templates/` → `pages/` hiyerarşisi
- **Her component kendi klasöründe**: `ComponentName/index.tsx` + `ComponentName.module.css`
- **CSS Modules** kullanılmaya devam edilecek
- **Server API'si değişmiyor** — client mevcut endpoint'lere göre yazılacak
- **AuthContext** ile global auth state yönetimi (Context API)
- **Custom hooks** ile logic/UI ayrıştırması (useAuth, useForm)
- **Storybook** component geliştirme ve dokümantasyon için

## Known Issues (Backend)
- Server çalışıyor, dokunmuyoruz

## Known Issues (Frontend — Yeni branch'te çözülecek)
1. Eski `authService.ts` endpoint'leri server'la uyuşmuyordu — sıfırdan yazılacak
2. `rigister` typo'su — atomic tasarımda düzeltilecek
3. Kırık icon importları — yeni Icon atom'u ile çözülecek
4. Auth guard eksik — AuthContext + protected route ile eklenecek
5. Order management frontendi henüz yok — future task

## Next Steps
- [ ] Plop generator template'leri oluştur (atom, molecule, organism)
- [ ] Atomic Design klasör yapısını oluştur
- [ ] Atom component'larını yaz (Button, Input, Label, Icon, Spinner)
- [ ] Molecule component'larını yaz (FormField, PasswordInput, Card)
- [ ] Organism component'larını yaz (LoginForm, RegisterForm, Header, Sidebar)
- [ ] Template'leri oluştur (AuthTemplate, DashboardTemplate)
- [ ] AuthContext + useAuth hook
- [ ] Axios instance + apiClient katmanı
- [ ] Auth servisini yaz (server endpoint'leriyle uyumlu)
- [ ] Login sayfası
- [ ] Register sayfası
- [ ] Email verification sayfası
- [ ] Forgot/Reset password sayfaları
- [ ] Profile completion sayfası
- [ ] Dashboard layout + sayfaları
