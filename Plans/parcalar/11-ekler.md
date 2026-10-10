> 🔗 [[10-karar-kaydi-adr|◀ 10. Karar Kaydı (ADR)]] · [[PLAN-2026-10_Ekim__2027-09_Eylul-AYLIK-YOL-HARITASI|🏠 Yol Haritası]] · [[12-revizyon-gecmisi|▶ 12. Revizyon Geçmişi]]

# 11. Ekler

## 11.1 Ay 1 (Faz 0) kontrol listesi — hızlı referans
```
☑ Sır rotasyonu: Neon, Gmail, JWT_SECRET
☑ server/.backup-env silindi
☑ .env.example yazıldı
☑ gitleaks kuruldu (pre-commit + CI)
□ forgot-password düzeltildi ve test edildi
□ express-rate-limit kuruldu (7 kural)
□ crypto.randomInt + hashCode
□ Deneme sayacı + migration
□ JWT 15dk + refresh token
□ sessionService (cookie tek yerde)
□ clearCookie düzeltildi
□ authorize() middleware + route'lara bağlandı
□ helmet + CORS env + trust proxy + x-powered-by
□ softProtect 401
□ Prisma hata eşlemesi
□ 3 endpoint validasyonu
□ Logger modülü (9 console.log)
□ Kullanılmayan dependency'ler silindi
□ prisma/seed.ts
□ Tüm testler geçiyor
```

## 11.2 Ay 12 lansman kontrol listesi
```
□ Tüm P0/P1 kapandı
□ Test kapsamı ≥ %75
□ E2E: 8 senaryo geçiyor
□ IDOR testleri geçiyor
□ Güvenlik denetimi temiz
□ gitleaks temiz
□ CSP zorlanıyor
□ Rate limit aktif
□ Yedekleme + GERİ YÜKLEME test edilmiş
□ KVKK/gizlilik/terimler yayında
□ Hesap silme çalışıyor
□ Lighthouse ≥ 90
□ 375px kontrol edildi
□ RTL kontrol edildi
□ Tüm çeviriler tamam
□ Analytics çalışıyor
□ Monitoring + alarm
□ Rollback planı yazılı
□ Smoke test geçti
□ 3 pilot kullanıcı geri bildirimi alındı
□ Gerçek sipariş tamamlandı
```

## 11.3 Saat bütçesi özeti
| Faz | Ay | Saat | Kümülatif |
|-----|-----|------|-----------|
| Faz 0 — Acil güvenlik | Ekim 2026 | 80 | 80 |
| Faz 1 — Altyapı | Kasım 2026 | 70 | 150 |
| Faz 2 — RTL/i18n/mimari | Aralık 2026 | 60 | 210 |
| Faz 3 — Order (Ay 4) | Ocak 2027 | 90 | 300 |
| Faz 3 — Order (Ay 5) | Şubat 2027 | 95 | 395 |
| Faz 3 — Order (Ay 6) | Mart 2027 | 95 | 490 |
| Faz 4 — Dosya/bildirim | Nisan 2027 | 80 | 570 |
| Faz 5 — Mobil/UX | Mayıs 2027 | 70 | 640 |
| Faz 6 — Sıkılaştırma | Haziran-Temmuz 2027 | 160 | 800 |
| Faz 7 — Lansman | Ağustos-Eylül 2027 | 80 | **880** |

**Brüt kapasite:** 52 hafta × 25 saat = 1.300 saat
**Efektif kapasite (%65):** ~845 saat
**Planlanan:** 880 saat
**Fark:** -35 saat (~%4) — **yönetilebilir ama pay yok**

> **Bu, planın neden kapsamı kesmeyi gerektirdiğinin sayısal kanıtı.** Faz 7 (lansman) esnetilebilir; Faz 0 ve Faz 3 değil.

## 11.4 Faydalı kaynaklar
| Konu | Kaynak |
|------|--------|
| OWASP ASVS | https://owasp.org/www-project-application-security-verification-standard/ |
| OWASP Top 10 | https://owasp.org/www-project-top-ten/ |
| Next.js i18n | https://next-intl.dev |
| React Query | https://tanstack.com/query |
| Vercel React best practices | (projede `.agents/skills/vercel-react-best-practices`) |
| RTL CSS | https://rtlstyling.com |
| Vitest | https://vitest.dev |
| Playwright | https://playwright.dev |
| KVKK | https://www.kvkk.gov.tr |

---

> 🔗 [[10-karar-kaydi-adr|◀ 10. Karar Kaydı (ADR)]] · [[PLAN-2026-10_Ekim__2027-09_Eylul-AYLIK-YOL-HARITASI|🏠 Yol Haritası]] · [[12-revizyon-gecmisi|▶ 12. Revizyon Geçmişi]]
