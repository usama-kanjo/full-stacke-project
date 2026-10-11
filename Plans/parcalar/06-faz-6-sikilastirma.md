> 🔗 [[06-faz-5-mobil-ux|◀ 🟡 FAZ 5 — MOBİL + UX]] · [[PLAN-2026-10_Ekim__2027-09_Eylul-AYLIK-YOL-HARITASI|🏠 Yol Haritası]] · [[06-faz-7-lansman|▶ 🔥 FAZ 7 — LANSMAN]]

# ⚫ FAZ 6 — SIKILAŞTIRMA (Haziran → Temmuz 2027, ~160 saat)

**Hedef:** Lansmandan önce kaliteyi ve güvenliği doğrulamak.
**Başarı ölçütü:** Test kapsamı hedefi, güvenlik denetimi temiz, KVKK metinları hazır.

## 6.1 Test kapsamı derinleştirme (60 saat)
| Alan | Hedef kapsam |
|------|--------------|
| `orderService` | %90 |
| Auth servisleri | %85 |
| `authorize` middleware | %100 |
| Validasyon şemaları | %100 |
| Kritik React bileşenleri | %70 |
| Endpoint entegrasyon | Ana akışlar %100 |
| **Toplam** | **≥ %75** |

**E2E (Playwright) — 8 senaryo:**
1. Kayıt → doğrulama → profil → dashboard
2. Giriş → dashboard
3. Parola sıfırlama
4. Doktor: sipariş oluştur
5. Doktor: sipariş listele + filtrele
6. Doktor: teknisyene ata
7. Teknisyen: durum güncelle
8. **Güvenlik: Doktor B, Doktor A'nın siparişine erişemez (403)**

## 6.2 Güvenlik denetimi (40 saat)
Kendi kodunu kendin denetle (veya bağımsız gözle):

| Kontrol | Araç / Yöntem |
|---------|---------------|
| Bağımlılık zafiyetleri | `yarn audit`, Dependabot |
| Yetkilendizasyon boşlukları | Her endpoint için rol matrisi testi |
| IDOR | Her `:id` endpoint'i için sahiplik testi |
| Girdi doğrulama | Her endpoint'e geçersiz/çok büyük/homografik girdi |
| CSRF | `sameSite` + origin kontrolü |
| SQL injection | Parametrik sorgu (Prisma) — doğrula |
| XSS | `dangerouslySetInnerHTML` yok; e-posta HTML kaçışı |
| Sır sızıntısı | `gitleaks` taraması, git geçmişi |
| Header'lar | Helmet + CSP `report-only` ile dene |
| Dosya yükleme | Magic byte, yürütme yok, path traversal yok |
| Session yönetimi | Token ömrü, iptal, eşzamanlı oturum limiti |

**Ayrıca:**
- CSP'yi `Content-Security-Policy-Report-Only` ile önce dene, sonra zorla
- Sentry'den 2 hafta izle, sessiz hata çıkar
- **Bulunan her zafiyet için regresyon testi yaz**

## 6.3 KVKK / Gizlilik / yasal (24 saat)
Sağlık verisi işliyorsun — bu **yasal yükümlülük**:
- `privacy-policy.md` — hangi veri, neden, ne kadar süre
- `terms-of-service.md`
- `cookie-policy.md` (httpOnly cookie + hangi çerezler)
- **KVKK Aydınlatma Metni** (Türkiye) veya eşdeğeri
- **Veri saklama politikası** — hasta verisi ne kadar süre tutulur?
- **Veri silme hakkı** — kullanıcı hesabını ve verisini silebiliyor mu?
- Hesap silme endpoint'i (KVKK gereği)

> ⚠️ Arap pazarı hedeflediğin için **katılımcı ülkelere göre** (KSA, BAE, Mısır) yerel mevzuat da kontrol edilmeli. Bu konuda profesyonel hukuk desteği al.

## 6.4 Ölçek ve performans (36 saat)
- 10.000 sipariş yükle, liste performansını ölç
- Gerekirse: `dentistId + createdAt` bileşik index, cursor pagination
- Yavaş sorgu tespiti (`prisma.$on("query")`)
- N+1 sorgu kontrolü
- Yüksek yük testi (k6, 100 eşzamanlı kullanıcı)

**Ay 6-7 çıktısı:** Test kapsamı ≥ %75, güvenlik denetimi temiz, KVKK metinları hazır, 10k siparişte performans kabul edilebilir.

---

> 🔗 [[06-faz-5-mobil-ux|◀ 🟡 FAZ 5 — MOBİL + UX]] · [[PLAN-2026-10_Ekim__2027-09_Eylul-AYLIK-YOL-HARITASI|🏠 Yol Haritası]] · [[06-faz-7-lansman|▶ 🔥 FAZ 7 — LANSMAN]]
