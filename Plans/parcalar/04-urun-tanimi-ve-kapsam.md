> 🔗 [[03-kritik-aciklar-listesi|◀ 3. Kritik Açıklar Listesi]] · [[PLAN-2026-10_Ekim__2027-09_Eylul-AYLIK-YOL-HARITASI|🏠 Yol Haritası]] · [[05-mimari-hedefler|▶ 5. Mimari Hedefler]]

# 4. Ürün Tanımı ve Kapsam

## 4.1 Ürün tek cümle
**Diş hekimleri ile diş laboratuvarı teknisyenleri arasında protez/diş işi siparişlerini dijitalleştiren yönetim platformu.**

## 4.2 Kullanıcı rolleri ve yolculukları

### DENTIST (Diş Hekimi)
```
Kayıt → E-posta doğrulama → Profil (klinik adı, adres, şehir)
   ↓
Sipariş oluştur (hasta adı, diş no, iş tipi, renk gölgesi, aciliyet, deadline, fiyat, fotoğraf)
   ↓
Sipariş listesi → durumu takip et → teknisyene ata
   ↓
Hazır olduğunda bildirim al → teslim al
   ↓
Profil güncelle / şifre değiştir
```

### LAB_TECHNICIAN (Diş Teknisyeni)
```
Kayıt → E-posta doğrulama → Profil (laboratuvar adı, uzmanlıklar)
   ↓
Bana atanan siparişler (dashboard) → kabul et / başla
   ↓
Durum güncelle (IN_PROGRESS → COMPLETED)
   ↓
Profil güncelle / şifre değiştir
```

## 4.3 MVP kapsamı (Lansman sürümü — Ay 12 sonunda)

**Dahil (MUST):**
- [x] Kayıt / giriş / e-posta doğrulama / parola sıfırlama ✅ 2026-10-10
- [x] Rol seçimi ile profil tamamlama
- [x] Sipariş oluşturma (doktor)
- [x] Sipariş listeleme + filtre + sayfalama
- [x] Sipariş detayı
- [x] Teknisyene atama (doktor)
- [x] Durum güncelleme (teknisyen): PENDING → IN_PROGRESS → COMPLETED / CANCELLED
- [x] Sipariş fotoğraf yükleme
- [x] Profil görüntüleme / düzenleme
- [x] Parola değiştirme
- [x] E-posta bildirimleri
- [x] Arapça + İngilizce, RTL
- [x] Mobil uyumlu
- [x] Denetim kaydı (audit log)

**Harici (MUST NOT):**
- [ ] Gerçek ödeme entegrasyonu (Stripe/HyperPay) → MVP sonrası
- [ ] Yerleşik sohbet/mesajlaşma → MVP sonrası
- [ ] Teknisyeni puanlama/oy sistemi → MVP sonrası
- [ ] Çoklu şube desteği → MVP sonrası
- [ ] Raporlama/analitik dashboard → MVP sonrası
- [ ] API (dış entegrasyon için public) → MVP sonrası

## 4.4 Kesilen şeyler ve gerekçeleri

| Kesilen | Gerekçe | Yerine ne konuluyor |
|--------|---------|---------------------|
| **Socket.IO / WebSocket** | Gerçek zamanlı bildirim ~10 kat maliyet, e-posta %90 değeri veriyor | E-posta + sayfa yenileme polling (Faz 8) |
| **Zustand / Redux** | Mevcut Context + React Query yeterli, global store gereksiz karmaşıklık | React Query (veri) + mevcut AuthContext (oturum) |
| **Atomic Design takıntısı** | 7 ölü component bu pattern'ın aşırı geldiğinin kanıtı. Feature bazlı daha hızlı | `components/ui` + `features/orders` |
| **Storybook %100 kapsam** | Kullanıcıya değer üretmiyor | Kritik component'larda (%60) story |
| **Landing page sıfırdan** | Zaman kaybı | Şablon kullan |
| **`app/pages` klasörü** | App Router zaten var, `pages/` klasörü ölü | App Router |

## 4.5 Eklenen (mevcut planında yoktu)

| Eklenen | Neden | Faz |
|--------|-------|-----|
| **Dosya yükleme** (hasta fotoğrafı / ölçü) | Diş labının **olmazsa olmaz** ihtiyacı. Fotoğrafsız diş işi yapılmaz | Ay 8 |
| **Denetim kaydı (audit log)** | Sağlık verisi. Kim neyi ne zaman değiştirdi? | Ay 8 |
| **Sürüm geçmişi (timeline)** | İş takibi ve itiraz çözümü için | Ay 5 |
| **Testler ve CI** | 12 aylık solo çalışmada tek güvenlik ağı | Ay 2 |
| **Sentry** | Kullanıcı hataya düşerse nasıl haberin olacak? | Ay 2 |

---

> 🔗 [[03-kritik-aciklar-listesi|◀ 3. Kritik Açıklar Listesi]] · [[PLAN-2026-10_Ekim__2027-09_Eylul-AYLIK-YOL-HARITASI|🏠 Yol Haritası]] · [[05-mimari-hedefler|▶ 5. Mimari Hedefler]]
