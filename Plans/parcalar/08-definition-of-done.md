> 🔗 [[07-riskler|◀ 7. Riskler ve Azaltma Planı]] · [[PLAN-2026-10_Ekim__2027-09_Eylul-AYLIK-YOL-HARITASI|🏠 Yol Haritası]] · [[09-calisma-ritueli|▶ 9. Çalışma Ritüeli]]

# 8. Definition of Done

Bir iş "bitti" sayılmak için **hepsi** sağlanmalıdır:

## Kod kalitesi
- [ ] `yarn typecheck` — hatasız
- [ ] `yarn lint` — 0 hata, 0 uyarı
- [ ] `yarn test` — hepsi geçiyor
- [ ] `0` tane `any`, `@ts-ignore`, `console.log`, `TODO`
- [ ] Tüm hata yolları toast gösteriyor
- [ ] Tüm formlar merkezi zod şeması kullanıyor
- [ ] Tüm API hataları `ApiError` tipinde

## Güvenlik
- [ ] Yetki kontrolü test edildi (403)
- [ ] Sahiplik kontrolü test edildi (IDOR testi)
- [ ] Girdi doğrulama mevcut
- [ ] Hassas veri loglanmıyor
- [ ] Sır kaynak koda sızmamış

## Kullanıcı deneyimi
- [ ] Yükleniyor durumu var
- [ ] Boş durum var ve eyleme dönük
- [ ] Hata durumu var ve "tekrar dene" sunuyor
- [ ] Klavye ile gezilebilir
- [ ] 375px'te kullanılabilir
- [ ] `dir="rtl"` altında doğru

## Uluslararasılaşma
- [ ] Tüm metinler çeviride (anahtar eksik 0)
- [ ] Tarih/para `Intl` ile biçimleniyor
- [ ] Arapça font yüklü

## Teslim
- [ ] CI yeşil
- [ ] Build başarılı
- [ ] Staging'e deploy edildi ve smoke test geçti
- [ ] Storybook (kritik bileşenler)
- [ ] README güncel

## Test
- [ ] Yeni kodun testi var
- [ ] Kritik akışlar E2E testiyle
- [ ] Kapsam hedefi karşılandı

---

> 🔗 [[07-riskler|◀ 7. Riskler ve Azaltma Planı]] · [[PLAN-2026-10_Ekim__2027-09_Eylul-AYLIK-YOL-HARITASI|🏠 Yol Haritası]] · [[09-calisma-ritueli|▶ 9. Çalışma Ritüeli]]
