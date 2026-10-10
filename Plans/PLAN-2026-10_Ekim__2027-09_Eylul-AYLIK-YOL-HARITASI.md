# KanjoLab — 12 Aylık Yol Haritası

**Dönem:** 1 Ekim 2026 → 30 Eylül 2027
**Hazırlayan:** Usama (tek geliştirici, haftada 20-30 saat)
**Plan versiyonu:** 1.0
**Başlangıç branch'i:** `refactor/frontend-rewrite`
**Hedef pazar:** Orta Doğu / Arap ülkeleri (Arapça + İngilizce, RTL zorunlu)
**Hedef altyapı:** Docker + VPS (Hetzner/DigitalOcean) + Managed PostgreSQL

---

## İçindekiler

- [[00-bu-dokuman-nasil-kullanilir|0. Bu Doküman Nasıl Kullanılır]] — Kurallar, güncelleme protokolü
- [[01-yonetici-ozeti|1. Yönetici Özeti]] — Tek sayfa özet
- [[02-baslangic-noktasi-analizi|2. Başlangıç Noktası Analizi]] — Mevcut durum envanteri
- [[03-kritik-aciklar-listesi|3. Kritik Açıklar Listesi]] — P0/P1/P2 toplu liste
- [[04-urun-tanimi-ve-kapsam|4. Ürün Tanımı ve Kapsam]] — Ne in/out
- [[05-mimari-hedefler|5. Mimari Hedefler]] — Frontend/backend/güvenlik/RTL/deploy
- [[06-yol-haritasi|6. 12 Aylık Yol Haritası]] — Ana bölüm — ay ay detay
    - [[06-faz-0-acil-guvenlik|🔴 FAZ 0 — ACİL GÜVENLİK]]
    - [[06-faz-1-altyapi|🔵 FAZ 1 — ALTYAPI: DAĞITIM + CI + TEST]]
    - [[06-faz-2-rtl-i18n|🟣 FAZ 2 — RTL + i18n + MİMARİ GEÇİŞ]]
    - [[06-faz-3-order-management|💎 FAZ 3 — ÜRÜN: ORDER MANAGEMENT]]
    - [[06-faz-4-dosya-bildirim|🟢 FAZ 4 — DOSYA YÜKLEME + BİLDİRİM]]
    - [[06-faz-5-mobil-ux|🟡 FAZ 5 — MOBİL + UX]]
    - [[06-faz-6-sikilastirma|⚫ FAZ 6 — SIKILAŞTIRMA]]
    - [[06-faz-7-lansman|🔥 FAZ 7 — LANSMAN]]
- [[07-riskler|7. Riskler ve Azaltma Planı]] — Risk kaydı
- [[08-definition-of-done|8. Definition of Done]] — "Bitti" tanımı
- [[09-calisma-ritueli|9. Çalışma Ritüeli]] — Haftalık/aylık rutin
- [[10-karar-kaydi-adr|10. Karar Kaydı (ADR)]] — Değişmez kararlar
- [[11-ekler|11. Ekler]] — Kontrol listeleri, kaynaklar
- [[12-revizyon-gecmisi|12. Revizyon Geçmişi]] — Değişiklik geçmişi

---

**Bu doküman yaşayan bir belgedir. Her ay sonunda güncellenir.**

*Hazırlayan: Usama — tek geliştirici, 12 ay, gerçek bir ürün.*
