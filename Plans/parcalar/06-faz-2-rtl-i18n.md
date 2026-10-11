> 🔗 [[06-faz-1-altyapi|◀ 🔵 FAZ 1 — ALTYAPI: DAĞITIM + CI + TEST]] · [[PLAN-2026-10_Ekim__2027-09_Eylul-AYLIK-YOL-HARITASI|🏠 Yol Haritası]] · [[06-faz-3-order-management|▶ 💎 FAZ 3 — ÜRÜN: ORDER MANAGEMENT]]

# 🟣 FAZ 2 — RTL + i18n + MİMARİ GEÇİŞ (Aralık 2026, ~60 saat)

**Hedef:** Arap pazarı desteğini **temel olarak** kuralım. Sonradan eklenen özellik olmasın.
**Başarı ölçütü:** Tüm mevcut ekranlar `dir="rtl"` altında doğru görünüyor, İngilizce/Arapça arasında geçiş çalışıyor.

> ⚠️ **Bu fazı sonraya atlamak en pahalı hatadır.** Şu an 34 fiziksel CSS özelliği var. Yazdığın her yeni component'le bu sayı artar. Ay 6'da dönüştürürsen 40+ dosyaya dokunursun. **Şimdi 60 saat, sonra 150 saat.**

## 2.1 Mimarî geçiş: Atomic Design → feature-based (12 saat)
7 ölü component'ı sil, kalanı düzleştir.

| Eski | Yeni |
|------|------|
| `components/atoms/Button` | `components/ui/Button` |
| `components/molecules/FormField` | `components/ui/FormField` |
| `components/molecules/Modal` | `components/ui/Modal` |
| `components/atoms/*` (7) | `components/ui/*` (7) |
| `components/organisms/LoginForm` | `features/auth/LoginForm` |
| `components/organisms/DashboardProfile` | `features/profile/DashboardProfile` |
| `components/templates/AuthTemplate` | `app/[locale]/(marketing)/layout.tsx` |
| `components/templates/DashboardTemplate` | `app/[locale]/dashboard/layout.tsx` |
| **7 ölü component** | **SİL** (`Avatar`, `Card`, `Checkbox`, `Dropdown`, `Tabs`, `Toast`, `Toggle`) |

**Ayrıca:** `tokens/*.ts` ölü dosyalarını sil (P2-2), `tokens.css` tek kaynak olsun. `types/css.d.ts`'yi `*.module.css` için daralt (P2-4). Boş `templates/MainLayout/` sil (P2-5).

**Kabul kriteri:** Build geçiyor, görsel regresyon yok, ölü component sayısı 0.

## 2.2 CSS → Mantıksal özellikler (8 saat)
**Önce kural yaz, sonra uygula** (`docs/frontend-conventions.md`):
```css
/* ❌ Yasak */
margin-left, margin-right, padding-left, padding-right,
text-align: left|right, left:, right:,
border-left, border-right, float, flex-direction: row-reverse

/* ✅ Zorunlu */
margin-inline-start|end, padding-inline-start|end,
text-align: start|end, inset-inline-start|end,
border-inline-start|end, text-align: start
```

**Yönlendirme için yeni token:**
```css
:root { --dir-flip: 1; }
[dir="rtl"] { --dir-flip: -1; }
```
```css
/* ❌ */ transform: translateX(-100%);
/* ✅ */ transform: translateX(calc(var(--dir-flip) * -100%));
```

**Mevcut 34 örneği dönüştür** (7 dosya: `Modal`, `AuthModal`, `Sidebar`, `Toast`, `Dropdown`, `DashboardHome`, `AuthTemplate`)

**Kabul kriteri:** `grep -rn 'margin-left\|padding-right\|text-align: left' client/src --include='*.css'` → **0 sonuç**.

## 2.3 Responsive altyapı (8 saat) — **tek bir @media bile yok**
Breakpoint token'ları:
```css
:root {
  --bp-sm: 480px;    /* telefon */
  --bp-md: 768px;    /* tablet */
  --bp-lg: 1024px;   /* dizüstü */
  --bp-xl: 1280px;   /* masaüstü */
}
```
**Kural:** Mobil önce (mobile-first). `min-width` kullan, `max-width` değil.

6 sabit genişlik düzeltilecek: `Modal` (400/560/720), `DashboardProfile` (720), `DashboardSettings` (600), `AuthTemplate` (480), `DashboardHome` (220), `Sidebar` (260).

**Kabul kriteri:** 375px genişlikte hiçbir yatay kaydırma çubuğu yok.

## 2.4 i18n altyapısı (16 saat)
```bash
yarn workspace client add next-intl
```
- `src/i18n/request.ts` — next-intl yapılandırması
- `src/messages/ar.json` + `src/messages/en.json` — **aynı anahtar yapısı**
- `app/[locale]/layout.tsx` — `<html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>`
- Dil değiştirici (Header'da TR bayrağı / AR bayrağı)
- **Araç:** `scripts/check-i18n.mjs` — eksik anahtar kontrolü, CI'da çalışsın

**Çeviri sırası:** Arapça önce (birincil pazar), sonra İngilizce.

**Kabul kriteri:** Dil değiştirince tüm metinler değişiyor, `<html dir>` değişiyor, eksik anahtar varsa CI kırmızı.

## 2.5 Font iyileştirme (4 saat)
Lalezar **sadece display**. Arapça gövde fontu şart.
```ts
// app/layout.tsx — next/font
import { IBM_Plex_Sans_Arabic, Fraunces, Sora } from "next/font/google";
```
- Arapça: `IBM Plex Sans Arabic` (400/500/600/700)
- Latin gövde: `Sora` (mevcut)
- Display: `Lalezar` (mevcut, `.ttf` olarak)
- `next/font` → otomatik alt küme + `size-adjust` ile sıfır layout shift

**Ay 3 kontrol listesi:**
- [ ] Mimari geçiş bitti, ölü component 0
- [ ] CSS'te fiziksel özellik 0
- [ ] 375px'te yatay kaydırma yok
- [ ] `<html dir>` dili takip ediyor
- [ ] Eksik çeviri anahtarı CI'da yakalanıyor
- [ ] Arapça gövde fontu yüklü, layout shift yok

---

> 🔗 [[06-faz-1-altyapi|◀ 🔵 FAZ 1 — ALTYAPI: DAĞITIM + CI + TEST]] · [[PLAN-2026-10_Ekim__2027-09_Eylul-AYLIK-YOL-HARITASI|🏠 Yol Haritası]] · [[06-faz-3-order-management|▶ 💎 FAZ 3 — ÜRÜN: ORDER MANAGEMENT]]
