> 🔗 [[02-baslangic-noktasi-analizi|◀ 2. Başlangıç Noktası Analizi]] · [[PLAN-2026-10_Ekim__2027-09_Eylul-AYLIK-YOL-HARITASI|🏠 Yol Haritası]] · [[04-urun-tanimi-ve-kapsam|▶ 4. Ürün Tanımı ve Kapsam]]

# 3. Kritik Açıklar Listesi

## P0 — Yayın engeli (herhangi birine dokunmadan önce çözülmeli)

| #     | Sorun                                                                   | Konum                                                            | Etki                                |
| ----- | ----------------------------------------------------------------------- | ---------------------------------------------------------------- | ----------------------------------- |
| P0-1  | Canlı Neon DB şifresi, Gmail app password, JWT secret düz metin dosyada | `server/.backup-env:6,10-12,23`                                  | Tam ele geçirme                     |
| P0-2  | Commit edilmiş JWT (geçmişte)                                           | `git 62534bf` → `server/scripts/token.txt`                       | Oturum ele geçirme                  |
| P0-3  | Forgot-password servisi hiç çağrılmıyor                                 | `client/src/components/organisms/AuthModal/AuthModal.tsx:97-113` | Kullanıcı şifre sıfırlayamıyor      |
| P0-4  | Rate limit yok (login, verify, forgot, resend)                          | `server/src/index.ts:23-35`                                      | Hesap çalma, e-posta bombalama      |
| P0-5  | 6 haneli kod `Math.random()` ile üretiliyor                             | `server/src/services/emailService.ts:18`                         | Kod tahmin edilebilir               |
| P0-6  | Kodlar düz metin DB'de                                                  | `schema.prisma:30,35`                                            | DB sızıntısı = tüm hesaplar         |
| P0-7  | Kod deneme limiti yok, hatalı denemede geçersizleşmiyor                 | `authService.ts:83-89, 284-289`                                  | 1M kombinasyon deneme               |
| P0-8  | JWT 90 gün, refresh/iptal yok                                           | `config/jwt.ts:5`                                                | Uzun ömürlü ele geçirilebilir token |
| P0-9  | `authorize()` rol kontrolü yok                                          | `server/src/middlewares/authMiddleware.ts`                       | Order yazılınca IDOR riski          |
| P0-10 | `logout` cookie'yi temizlemiyor                                         | `server/src/services/authService.ts:211-222`                     | Çıkış yapınca oturum açık kalıyor   |
| P0-11 | Doğrulama limiti yok + CSRF/CORS env'siz                                | `server/src/index.ts:19`                                         | CORS kırık, korumasız               |

## P1 — Yüksek (ilk 2 ayda)

| # | Sorun | Konum | Etki |
|---|-------|-------|------|
| P1-1 | `middleware.ts` yok, session yenilenemiyor | `client/src/app/dashboard/page.tsx:18-27` | Sayfa yenileyince oturum düşer, UI flash eder |
| P1-2 | `verify-email` validasyonsuz | `server/src/routes/v1/userRoute.ts:20` | Tip kontrolü yok |
| P1-3 | `PUT /dentist/profile` ve `PUT /technician/profile` validasyonsuz | `dentistRoute.ts:10`, `technicianRoute.ts:10` | Sınırsız uzunluk, veri kirliliği |
| P1-4 | Axios interceptor HTTP status'u siliyor | `client/src/lib/api.ts:9-15` | 401/403/404 ayırt edilemiyor |
| P1-5 | DashboardSettings 6 karakter istiyor, sunucu 8+büyükharf+rakam | `DashboardSettings.tsx:28-31,91` | Garanti 422 hatası |
| P1-6 | `updateProfile` dönüş tipi `user` içeriyor, sunucu döndürmüyor | `authService.ts:34-42` vs `dentistService.ts:48-57` | Kayıt sonrası profil bozuluyor |
| P1-7 | 0 test, 0 CI | tüm repo | Regresyon bulunamıyor |
| P1-8 | 0 `@media` sorgusu | tüm `.module.css` | Mobilde kullanılamaz |
| P1-9 | `/dashboard/orders` 404 | `Sidebar.tsx:18-19,26` | Kullanıcı ölü linke tıklıyor |
| P1-10 | `softProtect` boş catch → 500 | `authMiddleware.ts:82` | 401 yerine 500 |
| P1-11 | `specialties` API ile güncellenemiyor | `technicianService.ts:37-68` | Profil eksik kalıyor |
| P1-12 | Para birimi `TRY` sabit | `schema.prisma:106` | Arap pazarı için yanlış |
| P1-13 | Server `yarn build`/`yarn test` kırık: `scripts/` TS node tiplerini bulamıyor (`process`, `console`, `Buffer`, `url`, `import.meta.url`, implicit `any`) | `server/tsconfig.scripts.json` — `types` alanı yok | Faz 1 CI + test kabul kriteri (`yarn test` root'tan çalışıyor) bloke |

## P2 — Orta (3-6. ay)

| # | Sorun | Konum | Etki |
|---|-------|-------|------|
| P2-1 | 7 ölü component (~700 satır) | `molecules/{Avatar,Card,Checkbox,Dropdown,Tabs,Toast,Toggle}` | Bakım yükü |
| P2-2 | Ölü token TS dosyaları, `tokens.css` ile çakışıyor | `client/src/tokens/*.ts` | Sessiz kayma |
| P2-3 | `components/index.ts` 2 component'i atlıyor | `client/src/components/index.ts:20-29` | Barrel yalan söylüyor |
| P2-4 | `declare module "*.css"` tüm tip güvenliğini kapatıyor | `client/src/types/css.d.ts:1` | CSS module typo yakalanmıyor |
| P2-5 | Boş `templates/MainLayout/` klasörü | — | Ölü kod |
| P2-6 | Storybook `@storybook/react` import ediyor, dependency değil | `.storybook/preview.ts:1` | Phantom dependency |
| P2-7 | Storybook 3 hex'i token'dan okumuyor | `.storybook/preview.ts:10-12` | Kayma riski |
| P2-8 | `useCallback` içinde dinamik `import()` | `AuthModal.tsx:119` | Bundle analizi kaybı |
| P2-9 | Profil tamamlama modalı kapatılamıyor | `app/dashboard/page.tsx:55` | `onClose={() => {}}` |
| P2-10 | `maxActiveSessions` / `validTokens` DB'de ama kodda yok | migration 8 | Ölü kolon |
| P2-11 | `prisma/seed.ts` yok, `db:seed` script'i kırık | `server/package.json:22` | Script hata verir |
| P2-12 | Prisma hataları 500 dönüyor, P2002 eşlenmiyor | `errorMiddleware.ts` | Bilgi sızıntısı |
| P2-13 | `trust proxy` ayarlanmamış | `server/src/index.ts` | Reverse proxy arkasında yanlış IP |
| P2-14 | Root'ta `test` script'i yok | `package.json:10-16` | `yarn test` çalışmıyor |
| P2-15 | Client'ta `typecheck` script'i yok | `client/package.json` | Manuel `tsc` gerekli |
| P2-16 | Kullanılmayan sunucu dependency: `date-fns`, `slugify`, `@prisma/client` | `server/package.json` | Bundle şişkinliği |
| P2-17 | `start` script'i `npm` kullanıyor | `server/package.json:11` | yarn-only kuralına aykırı |
| P2-18 | A11y denetimi yapılmamış | tüm component'ler | Erişilebilirlik |

---

> 🔗 [[02-baslangic-noktasi-analizi|◀ 2. Başlangıç Noktası Analizi]] · [[PLAN-2026-10_Ekim__2027-09_Eylul-AYLIK-YOL-HARITASI|🏠 Yol Haritası]] · [[04-urun-tanimi-ve-kapsam|▶ 4. Ürün Tanımı ve Kapsam]]
