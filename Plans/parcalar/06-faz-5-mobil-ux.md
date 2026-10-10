> 🔗 [[06-faz-4-dosya-bildirim|◀ 🟢 FAZ 4 — DOSYA YÜKLEME + BİLDİRİM]] · [[PLAN-2026-10_Ekim__2027-09_Eylul-AYLIK-YOL-HARITASI|🏠 Yol Haritası]] · [[06-faz-6-sikilastirma|▶ ⚫ FAZ 6 — SIKILAŞTIRMA]]

# 🟡 FAZ 5 — MOBİL + UX (Mayıs 2027, ~70 saat)

**Hedef:** Teknisyen telefonla, doktor telefonda rahat çalışsın.
**Başarı ölçütü:** 375px'te tüm temel akışlar kullanılabilir.

## 5.1 Mobil navigasyon (14 saat)
- `< 768px`: Sidebar → **bottom navigation bar** (Siparişler / Profil / Ayarlar / Çıkış)
- `≥ 768px`: Mevcut sidebar
- Hızlı aksiyon FAB (bottom-right, "+" butonu — yeni sipariş)

## 5.2 Duyarlı bileşenler (22 saat)
- `DashboardHome` — kart ızgarası mobilde tek sütun
- `OrderList` — tablo → kart dönüşümü
- `Modal` — mobilde tam ekran (`100dvh`)
- `FormField` — dokunma hedefi ≥ 44×44px
- `Header` — hamburger menü

## 5.3 Dokunma ve erişilebilirlik (14 saat)
- Dokunma hedefleri ≥ 44×44px (WCAG 2.5.5)
- `prefers-reduced-motion` desteği
- Klavye odağı görünür (`:focus-visible`)
- Form hataları `aria-describedby` ile ilişkilendirilmiş
- `aria-live` ile dinamik mesaj duyuruları
- Renk kontrastı ≥ 4.5:1
- **Otomatik a11y kontrolü:** `eslint-plugin-jsx-a11y` + CI

## 5.4 Performans (20 saat)
- Route bazlı kod bölme (order listesi = ana paket, detay = lazy)
- Görseller: `next/image`, `sizes`, AVIF/WebP
- `loading.tsx` skeleton'ları
- `useMemo`/`useCallback` — Vercel kuralları
- **Ölçüm:** Lighthouse hedefi — Performans ≥ 90, LCP < 2.5s, CLS < 0.1
- 10.000 sipariş ile liste performans testi

**Ay 5 çıktısı:** Mobilde tam kullanılabilir, Lighthouse yeşil.

---

> 🔗 [[06-faz-4-dosya-bildirim|◀ 🟢 FAZ 4 — DOSYA YÜKLEME + BİLDİRİM]] · [[PLAN-2026-10_Ekim__2027-09_Eylul-AYLIK-YOL-HARITASI|🏠 Yol Haritası]] · [[06-faz-6-sikilastirma|▶ ⚫ FAZ 6 — SIKILAŞTIRMA]]
