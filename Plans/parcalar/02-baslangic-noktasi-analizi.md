> 🔗 [[01-yonetici-ozeti|◀ 1. Yönetici Özeti]] · [[PLAN-2026-10_Ekim__2027-09_Eylul-AYLIK-YOL-HARITASI|🏠 Yol Haritası]] · [[03-kritik-aciklar-listesi|▶ 3. Kritik Açıklar Listesi]]

# 2. Başlangıç Noktası Analizi

## 2.1 Mevcut envanter

### Sunucu (13 endpoint, Express 5 + Prisma 7 + PostgreSQL)
| Alan | Durum | Not |
|------|-------|-----|
| Kimlik doğrulama | ✅ Tam | register, login, verify, resend, logout, forgot, reset, change |
| Profil tamamlama | ✅ Tam | Dentist / Technician, Prisma transaction |
| Profil CRUD | ✅ Tam | dentist + technician, GET/PUT |
| Validasyon | ⚠️ Eksik | 3 endpoint validasyonsuz |
| Rate limiting | ❌ Yok | 13 endpoint'in hiçbirinde yok |
| Security header | ❌ Yok | helmet kurulu değil |
| Loglama | ❌ Yok | morgan/pole yok, 9 adet dağınık console.log |
| Health check | ❌ Yok | `/health` endpoint'i yok |
| Graceful shutdown | ⚠️ Yarım | Sadece unhandledRejection; SIGTERM yok, $disconnect yok |
| Test | ❌ Yok | Manuel smoke script, assertion yok, CI'da çalışmaz |
| Docker | ❌ Yok | Dockerfile, compose yok |
| CI | ❌ Yok | build/lint/test yok |
| Order API | ❌ Yok | Model var, endpoint yok |

### İstemci (31 component, Next.js 16 + React 19)
| Alan | Durum | Not |
|------|-------|-----|
| Atom | ✅ 7/7 | Button, Badge, Input, Label, Icon, Spinner, Typography |
| Molecule | ✅ 10/10 | FormField, PasswordInput, Card, Avatar, Toast, Modal, Tabs, Dropdown, Checkbox, Toggle |
| Organism | ✅ 12/12 | AuthModal + 5 form, Header, Sidebar, DashboardHome, DashboardProfile, DashboardSettings |
| Template | ✅ 2/2 | AuthTemplate, DashboardTemplate |
| Route | ⚠️ 4 route | `/`, `/dashboard`, `/dashboard/profile`, `/dashboard/settings` |
| Middleware | ❌ Yok | `middleware.ts` yok — route koruması yok |
| Loading/Error UI | ❌ Yok | `loading.tsx`, `error.tsx`, `not-found.tsx` yok |
| Test | ❌ Yok | Vitest/RTL/Jest yok, 0 test dosyası |
| Responsive | ❌ Yok | 0 `@media` sorgusu |
| i18n | ❌ Yok | next-intl yok, metinler İngilizce gömülü |
| RTL | ❌ Yok | `dir` yok, 34 fiziksel CSS özelliği |
| Ölü component | ⚠️ 7 tane | Avatar, Card, Checkbox, Dropdown, Tabs, Toast, Toggle — sadece Storybook'dan erişilebilir |

### Veritabanı
| Model | Durum | Not |
|-------|-------|-----|
| `User` | ✅ | 12 alan, 2 index, email unique |
| `Dentist` | ✅ | 8 alan, 1:1 User |
| `Technician` | ✅ | 9 alan, `specialties String[]` |
| `Order` | ⚠️ Model var, kullanım yok | 13 alan, 3 index — **hiç kullanılmıyor** |
| Enum `Role` | ✅ | DENTIST, LAB_TECHNICIAN |
| Enum `OrderStatus` | ⚠️ Model var, kullanım yok | PENDING, IN_PROGRESS, COMPLETED, CANCELLED |

**8 migration var**, `add_token_management` migration'ı `maxActiveSessions` ve `validTokens` eklemiş ama **bunlar `schema.prisma`'da yok ve kodda hiç kullanılmıyor.** Faz 0'da devreye alınacak.

## 2.2 Sağlamlık derecelendirmesi

| Alan | Not | Yön |
|------|-----|-----|
| Kod hijyeni (frontend) | A | ↑ |
| API sözleşmesi tutarlılığı | A− | = |
| Katmanlı mimari (backend) | B | ↑ |
| Doğrulama kapsamı (backend) | C | ↑ |
| Yetkilendirme (authorization) | F | ↑ |
| Hata yönetimi & gözlemlenebilirlik | F | ↑ |
| Test kapsamı | F | ↑ |
| CI/CD | F | ↑ |
| Dağıtım hazırlığı | F | ↑ |
| Mobil/duyarlı tasarım | F | ↑ |
| Erişilebilirlik (a11y) | D | ↑ |
| Uluslararasılaşma (i18n/RTL) | F | ↑ |

**A → F gradyanı, kod hijyeninin A olması diğerlerini kurtarmıyor.** Güvenlik ve teslim altyapısı en zayıf halka ve en pahalı hata.

---

> 🔗 [[01-yonetici-ozeti|◀ 1. Yönetici Özeti]] · [[PLAN-2026-10_Ekim__2027-09_Eylul-AYLIK-YOL-HARITASI|🏠 Yol Haritası]] · [[03-kritik-aciklar-listesi|▶ 3. Kritik Açıklar Listesi]]
