> 🔗 [[06-faz-7-lansman|◀ 🔥 FAZ 7 — LANSMAN]] · [[PLAN-2026-10_Ekim__2027-09_Eylul-AYLIK-YOL-HARITASI|🏠 Yol Haritası]] · [[08-definition-of-done|▶ 8. Definition of Done]]

# 7. Riskler ve Azaltma Planı

| # | Risk | Olasılık | Etki | Azaltma | Tetikleyici |
|---|------|----------|-----|--------|-------------|
| R1 | **Yalnızlık / motivasyon kaybı** | Yüksek | Çok yüksek | Haftalık ilerleme günlüğü, küçük kazanımları commit et, bir mentor bul | 2 hafta üst üste hiç ilerleme yoksa |
| R2 | **Kapsam kayması** ("şunu da ekleyeyim") | Yüksek | Yüksek | Aylık bütçeyi yazılı tut, faz dışı istek → "Sonraki ay listesine" | Her ay başında kapsam kilidi |
| R3 | **nginx/Docker tuzağı** (3 hafta kaybetme) | Yüksek | Yüksek | 1 hafta timebox, bitmezse Vercel'e geç | 1 haftada SSL çalışmıyorsa |
| R4 | **Order yetkilendirme açığı (IDOR)** | Orta | Çok yüksek | `authorize()` Faz 0'da, IDOR testleri Ay 4/6'da | Her yeni endpoint'te test zorunlu |
| R5 | **Aylık bütçe aşımı** | Yüksek | Orta | Aşırsa kapsam kes, kapsam genişletme | Ay sonunda >%110 saat |
| R6 | **Sağlık verisi sızıntısı** | Düşük | Felaket | Audit log, azamiyet, KVKK metinleri, şifreleme | Kullanıcı sayısı >50 |
| R7 | **Sır sızıntısı tekrarı** | Orta | Çok yüksek | ✅ `gitleaks` pre-commit + CI aktif; `.env` asla commit edilmez | Yeni secret eklendiğinde |
| R8 | **Bağımlılık zafiyeti** | Orta | Yüksek | Dependabot + `yarn audit` CI'da | Haftalık tarama |
| R9 | **Teknik borç birikimi** | Orta | Orta | Her ay 1 gün "teknik borç" ayrılmazsa ertelenen iş patlar | Ay sonu |
| R10 | **İlk müşteri bulamama** | Orta | Yüksek | Ay 8'de pilot başlat, meslek odaları/sosyal medya | 4 haftada bulunamazsa |
| R11 | **Sağlık problemi / hayat değişikliği** | Düşük | Çok yüksek | Her faz bağımsız tamamlanabilir olsun, commit'ler çalışır durumda | — |
| R12 | **Veritabanı kaybı** | Düşük | Felaket | Otomatik yedek + **geri yükleme testi** | Ay 2'de test et |

## Yönetim stratejisi
- **Her pazartesi:** 15 dakika haftalık planlama
- **Her ay sonunda:** 1 gün ay değerlendirme + plan güncelleme
- **Her çeyrekte:** 1 gün yön yeniden değerlendirme, planı gerçek veriye göre düzelt
- **Kural:** Plan değişikliği değişikliğin gerekçesiyle birlikte yazılır

---

> 🔗 [[06-faz-7-lansman|◀ 🔥 FAZ 7 — LANSMAN]] · [[PLAN-2026-10_Ekim__2027-09_Eylul-AYLIK-YOL-HARITASI|🏠 Yol Haritası]] · [[08-definition-of-done|▶ 8. Definition of Done]]
