> 🔗 [[06-faz-0-acil-guvenlik|◀ 🔴 FAZ 0 — ACİL GÜVENLİK]] · [[PLAN-2026-10_Ekim__2027-09_Eylul-AYLIK-YOL-HARITASI|🏠 Yol Haritası]] · [[06-faz-2-rtl-i18n|▶ 🟣 FAZ 2 — RTL + i18n + MİMARİ GEÇİŞ]]

# 🔵 FAZ 1 — ALTYAPI: DAĞITIM + CI + TEST (Kasım 2026, ~70 saat)

**Hedef:** Uygulama internette erişilebilir olsun ve değişikliklerin güvenliğini garantileyelim.
**Başarı ölçütü:** `git push` → otomatik test + build + staging deploy. Raporlama hatası Sentry'de görünüyor.

## 1.1 Docker + VPS (24 saat) — **TIMEBOX: 1 HAFTA**
```yaml
# docker-compose.yml
services:
  app:
    build: ./client
    restart: unless-stopped
    environment:
      - NEXT_PUBLIC_API_URL=https://api.kanjolab.com
    env_file: .env.production

  api:
    build: ./server
    restart: unless-stopped
    env_file: ./server/.env.production
    environment:
      - NODE_ENV=production
      - PORT=3000
    healthcheck:
      test: ["CMD", "node", "-e", "fetch('http://localhost:3000/api/v1/health').then(r=>process.exit(r.ok?0:1))"]
      interval: 30s
      timeout: 5s
      retries: 3

  nginx:
    image: nginx:alpine
    restart: unless-stopped
    ports: ["80:80", "443:443"]
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
      - ./nginx/certbot:/etc/letsencrypt:ro
```

**Yapılacaklar:**
1. `client/Dockerfile` (multi-stage, non-root `USER`, `NEXT_TELEMETRY_DISABLED=1`)
2. `server/Dockerfile` (multi-stage, `prisma generate` build'de, `prisma migrate deploy` entrypoint'te)
3. `.dockerignore` (her iki tarafta)
4. `nginx/nginx.conf` — reverse proxy, gzip, static cache, security header
5. `certbot` — Let's Encrypt, auto-renew (cron)
6. **Cloudflare** DNS + proxy + SSL
7. Neon/Supabase'den managed PostgreSQL
8. **Otomatik DB yedeği** (Neon otomatik + haftalık `pg_dump` indirme)
9. Uptime monitor (UptimeRobot/Hacker News, ücretsiz)

**Health check endpoint'i ekle:**
```ts
// routes/v1/healthRoute.ts — Faz 1
router.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok", uptime: process.uptime() });
});
// Ayrı: /health/ready — DB bağlantısını kontrol eder
```

**Kabul kriteri:** `https://kanjolab.com` ve `https://api.kanjolab.com` açılıyor, SSL geçerli, sunucu yeniden başlatılınca kendi kendine ayağa kalkıyor.

> ⚠️ **TUZAK:** Bu iş 1 haftada bitmezse **Vercel'e geç** ve geri dön. nginx + SSL + Docker debug 3 hafta yiyebilir, ürünün 1/3'ü kaybolur. Haftalık kontrol koy.

## 1.2 CI pipeline (12 saat)
`.github/workflows/ci.yml`:
```yaml
name: CI
on: { pull_request: {}, push: { branches: [main] } }
jobs:
  client:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
      - uses: actions/setup-node@v4
        with: { node-version: 22, cache: yarn }
      - run: yarn install --frozen-lockfile
      - run: yarn workspace client typecheck
      - run: yarn workspace client lint
      - run: yarn workspace client test
      - run: yarn workspace client build
  server:
    # aynı yapı + server typecheck/lint/test
```

**Ayrıca:**
- `deploy.yml` — main'e merge → staging'e otomatik deploy → smoke test → manuel onay → production
- **GitHub branch protection** — `ci.yml` yeşil olmadan merge engellensin (ayarlamayı unutma, bu anahtar)
- `opencode.yml`'den `id-token: write` kaldır, action'ı SHA'ya pinle (P: güvenlik)
- Dependabot'a `github-actions` ekle

**Kabul kriteri:** Bilerek kırık bir PR aç → CI kırmızı → merge engelleniyor.

## 1.3 Test altyapısı (24 saat)
**Client — Vitest + React Testing Library:**
```bash
yarn workspace client add -D vitest @vitest/coverage-v8 @testing-library/react \
  @testing-library/user-event @testing-library/jest-dom jsdom
```
`vitest.config.ts`, `client/src/test/setup.ts`, `test` + `typecheck` script'leri ekle.

**İlk testler (gerçek değer katan):**

| Test | Neden |
|------|-------|
| `lib/schemas/*.test.ts` | Saf fonksiyon, hızlı, yüksek getiri |
| `hooks/useForm.test.ts` | 123 satır, saf mantık, debounce + touched + submit |
| `lib/utils.test.ts` | Biçimlendirme yardımcıları |
| `hooks/useAuth.test.tsx` | Provider + context |
| `components/ui/Button.test.tsx` | Etkileşim + varyant |

**Server — Vitest + Supertest + ayrı test DB:**
```bash
yarn workspace server add -D vitest supertest @vitest/coverage-v8
```
- `server/.env.test` — **ayrı** veritabanı (`kanjolab_test`), asla üretim DB'sine bağlanma
- Global setup: migration çalıştır, test sonrası truncate
- `app.ts` ayrı dosyaya taşı (`index.ts` sadece bootstrap) → test edilebilir Express app
- Testler: `authorize` middleware, validator'lar, error middleware, auth akışı

**Kabul kriteri:** `yarn test` root'tan çalışıyor, her iki workspace test koşuyor, coverage raporu üretiliyor.

## 1.4 Hata izleme (6 saat)
- Sentry: client + server
- `sentry.client.config.ts` / `sentry.server.config.ts`
- `NEXT_PUBLIC_SENTRY_DSN` + server `SENTRY_DSN`
- Source map upload (production'da stack trace okunabilir olsun)
- **Kritik:** hata bildirimlerini gerçek bir hatayla test et (Sentry'ye düştüğünü gör)

## 1.5 App Router sözleşmeleri (4 saat)
| Dosya | Ne yapar |
|------|----------|
| `app/loading.tsx` | Sayfa yüklenirken skeleton |
| `app/error.tsx` | Hata sınırı + "tekrar dene" |
| `app/not-found.tsx` | **Markalı 404** — şu an Next'in çıplak 404'ü |
| `app/global-error.tsx` | Root layout hatası |

`not-found.tsx` özellikle önemli — Sidebar'daki ölü linkler şu an çıplak 404'e düşüyor.

**Ay 2 kontrol listesi:**
- [ ] Site HTTPS üzerinden erişilebilir
- [ ] Sunucu yeniden başlatılınca kendini toparlıyor
- [ ] Otomatik DB yedeği çalışıyor
- [ ] CI yeşil, merge engelli
- [ ] `yarn test` root'tan çalışıyor
- [ ] Test DB üretim DB'den ayrı
- [ ] Sentry gerçek hatayı yakaladı
- [ ] Markalı 404 var

---

> 🔗 [[06-faz-0-acil-guvenlik|◀ 🔴 FAZ 0 — ACİL GÜVENLİK]] · [[PLAN-2026-10_Ekim__2027-09_Eylul-AYLIK-YOL-HARITASI|🏠 Yol Haritası]] · [[06-faz-2-rtl-i18n|▶ 🟣 FAZ 2 — RTL + i18n + MİMARİ GEÇİŞ]]
