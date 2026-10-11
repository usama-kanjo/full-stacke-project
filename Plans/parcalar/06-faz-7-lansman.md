> 🔗 [[06-faz-6-sikilastirma|◀ ⚫ FAZ 6 — SIKILAŞTIRMA]] · [[PLAN-2026-10_Ekim__2027-09_Eylul-AYLIK-YOL-HARITASI|🏠 Yol Haritası]] · [[07-riskler|▶ 7. Riskler ve Azaltma Planı]]

# 🔥 FAZ 7 — LANSMAN (Ağustos → Eylül 2027, ~80 saat)

**Hedef:** Gerçek kullanıcıya açmak, geri bildirim almak.
**Başarı ölçütü:** 3 gerçek kullanıcı, 10 gerçek sipariş, 0 kritik hata.

## 7.1 Landing page (16 saat)
**Şablon kullan, sıfırdan yapma.** Zaten var olan bir şablonu 2 günde uyarlarsın.
- Hero + özellik listesi
- Arapça + İngilizce
- Kayıt CTA'sı
- **Kayıt öncesi fiyat/lansman teklifi (founding users)** — ilk 10 kullanıcıya ücretsiz/indirimli

## 7.2 Onboarding (12 saat)
- İlk giriş turu (3-4 adım, `joyride` benzeri)
- Boş durum ekranları eyleme dönük ("İlk siparişinizi oluşturun →" butonu)
- Demo veri: `prisma/seed.ts` ile 5 örnek sipariş, 3 teknisyen
- **İlk deneyim her şeyi belirler** — boş ekran = terk edilen kullanıcı

## 7.3 Analitik (10 saat)
- Basit, gizlilik dostu: **Umami** veya **Plausible** (GA4'ün cookie izni sorunu yok)
- Ölçülecek olaylar: kayıt, profil tamamlama, ilk sipariş, sipariş tamamlama, dosya yükleme
- **Gerçek KPI:** ilk siparişe kadar geçen süre, ayrılma oranı

## 7.4 Pilot — 3 kullanıcı (24 saat)
- 1 diş hekimi + 2 teknisyen (gerçek, Arap ülkelerinden)
- **8 hafta boyunca haftalık geri bildirim** (pilot MVP'den sonra başlar, bu yüzden Ay 8'de başla)
- Her hafta: ne çalışıyor / ne çalışmıyor / eksik ne
- İlk 10 siparişi bu kullanıcılarla gerçekten yap

**Kritik:** Pilotu **Faz 7'nin başında** başlat, sonunda değil. Aylarca bekleyip son anda test etme.

## 7.5 Lansman (18 saat)
- [ ] Tüm P0/P1 kapandı
- [ ] Test kapsamı ≥ %75
- [ ] Güvenlik denetimi temiz
- [ ] KVKK metinları yayında
- [ ] Yedekleme + geri yükleme **gerçekten test edilmiş**
- [ ] İzleme + alarm (UptimeRobot + Sentry)
- [ ] `status` sayfası
- [ ] Destek kanalı (e-posta veya WhatsApp — Arap pazarında WhatsApp standart)
- [ ] Rollback planı
- [ ] Smoke test sonrası yayın

**Kabul kriteri:** Gerçek bir diş hekimi, gerçek bir hasta için, gerçek bir sipariş açtı ve teknisyen tamamladı. **Sonuç gerçek.**

---

> 🔗 [[06-faz-6-sikilastirma|◀ ⚫ FAZ 6 — SIKILAŞTIRMA]] · [[PLAN-2026-10_Ekim__2027-09_Eylul-AYLIK-YOL-HARITASI|🏠 Yol Haritası]] · [[07-riskler|▶ 7. Riskler ve Azaltma Planı]]
