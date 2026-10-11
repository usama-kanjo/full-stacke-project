> 🔗 [[06-faz-3-order-management|◀ 💎 FAZ 3 — ÜRÜN: ORDER MANAGEMENT]] · [[PLAN-2026-10_Ekim__2027-09_Eylul-AYLIK-YOL-HARITASI|🏠 Yol Haritası]] · [[06-faz-5-mobil-ux|▶ 🟡 FAZ 5 — MOBİL + UX]]

# 🟢 FAZ 4 — DOSYA YÜKLEME + BİLDİRİM (Nisan 2027, ~80 saat)

**Hedef:** Diş laboratuvarının gerçekten ihtiyaç duyduğu şeyi eklemek.
**Başarı ölçütü:** Doktor siparişe hasta fotoğrafı yükleyebiliyor, teknisyen görebiliyor.

## 4.1 Depolama altyapısı (16 saat)
- **Cloudflare R2** (S3 uyumlu, egress ücretsiz) veya AWS S3
- `uploadService.ts` — presigned URL üretimi (dosya sunucudan geçmesin)
- `OrderAttachment` modeli
- Kısıtlamalar: **max 10 dosya/sipariş, max 5MB/dosya**, yalnızca `image/jpeg`, `image/png`, `image/webp`, `application/pdf`
- **Sunucu tarafı magic byte kontrolü** (uzantıya güvenme)
- `Content-Disposition: attachment` — inline render XSS riski

## 4.2 Dosya yükleme arayüzü (24 saat)
- Sürükle-bırak + dosya seçici
- Yükleme ilerlemesi (progress bar)
- Önizleme (lightbox)
- Mobil: **kamera ile çek** (`<input type="file" accept="image/*" capture="environment">`) — diş hekimi telefondan fotoğraf çeker
- Silme (yetki kontrolü ile)

## 4.3 Görsel optimizasyonu (12 saat)
- Sunucu tarafında yeniden boyutlandırma (`sharp`)
- WebP dönüştürme
- Thumbnail üretme
- **Sonuç:** telefon fotoğrafı 4MB → 300KB. Mobil veri tasarrufu.

## 4.4 E-posta bildirimleri (20 saat)
`notificationService.ts` — `nodemailer` ile şablonlu e-posta.

| Tetikleyici | Alıcı | Konu |
|--------------|--------|-------|
| Sipariş oluşturuldu | teknisyen (varsa) | "Yeni sipariş atandı" |
| Sipariş atandı | teknisyen | "Size sipariş atandı" |
| Durum değişti → COMPLETED | doktor | "Siparişiniz hazır" |
| Sipariş iptal edildi | teknisyen | "Sipariş iptal edildi" |
| Deadline yaklaşıyor (24 saat) | teknisyen | "Deadline yaklaşıyor" |
| Profil tamamlandı | kullanıcı | "Hoş geldiniz" |

**Kurallar:** Kuyruk (basit DB tablosu veya BullMQ), hata durumunda tekrar deneme, **çok dilli şablonlar** (ar/en), unsubscribe bağlantısı.

## 4.5 Denetim kaydı (8 saat)
Her kritik eylem `AuditLog`'a yazılır: `order.create`, `order.assign`, `order.status_change`, `order.delete`, `auth.login`, `auth.password_reset`, `profile.update`.

**Neden:** Sağlık verisi. "Bu siparişi kim ne zaman iptal etti?" sorusuna cevap verebilmelisin.

**Ay 4 (Faz) çıktısı:** Dosya yükleme + bildirimler + audit log çalışıyor.

---

> 🔗 [[06-faz-3-order-management|◀ 💎 FAZ 3 — ÜRÜN: ORDER MANAGEMENT]] · [[PLAN-2026-10_Ekim__2027-09_Eylul-AYLIK-YOL-HARITASI|🏠 Yol Haritası]] · [[06-faz-5-mobil-ux|▶ 🟡 FAZ 5 — MOBİL + UX]]
