> 🔗 [[09-calisma-ritueli|◀ 9. Çalışma Ritüeli]] · [[PLAN-2026-10_Ekim__2027-09_Eylul-AYLIK-YOL-HARITASI|🏠 Yol Haritası]] · [[11-ekler|▶ 11. Ekler]]

# 10. Karar Kaydı (ADR)

Bu kararlar tartışıldı ve **değiştirilmediği sürece** geçerlidir. Değiştirmek için gerekçe yazılmalıdır.

## ADR-001: Arap pazar birincil
**Karar:** Arap ülkeleri birincil pazar. Arapça + İngilizce, RTL zorunlu.
**Gerekçe:** Kullanıcı beyanı. RTL sonradan eklenemez; temelde kurulmalıdır.
**Etki:** Faz 2'de RTL+i18n temeli atılır. Her yeni component logical property kullanır.
**Sonuç:** MVP İngilizce-only olmaz. RTL her ekran ve bileşende test edilir.

## ADR-002: Docker + VPS, managed PostgreSQL
**Karar:** Uygulama Docker ile VPS'te, veritabanı Neon/Supabase'da.
**Gerekçe:** Tam kontrol + düşük maliyet; ama DB işletmesi tek başına 1 ay yer, oyuna değmez. Neon zaten kullanılıyor.
**Etki:** 24 saat kurulum. Nginx/SSL için 1 hafta timebox.
**Geri dönüş tetikleyicisi:** 1 haftada SSL çalışmazsa Vercel'e geçilir.

## ADR-003: WebSocket yok
**Karar:** Socket.IO iptal. E-posta + polling ile bildirim.
**Gerekçe:** Gerçek zamanlı bildirim %90 değeri %10 maliyetle verir. Tek başına ~80 saat kazandırır.
**Etki:** 80 saat order yönetimine aktarıldı. `refetchInterval: 60s` yeterli.

## ADR-004: Feature-based mimari (Atomic Design değil)
**Karar:** `components/ui` + `features/*`. Atomic Design kaldırıldı.
**Gerekçe:** 7 ölü component bu pattern'ın aşırı geldiğinin kanıtı. Feature bazlı yeni ekran eklemede daha hızlı.
**Etki:** 12 saat refactor. Yeni ekran = 1 klasör, yönlendirme otomatik.
**Geri dönüş:** Feature >50 bileşene ulaşırsa yeniden değerlendir.

## ADR-005: Global state yok (Zustand/Redux)
**Karar:** React Query (sunucu durumu) + AuthContext (oturum). Redux/Zustand yok.
**Gerekçe:** Yeterli. Global store karmaşıklığı 8 aydır kazanç sağlamıyor.
**Etki:** Sadece gerçekten global olan durum (tema, dil tercihi) Context'te.

## ADR-006: Sahiplik kontrolü servis katmanında
**Karar:** Kullanıcı ID'si istemciden asla alınmaz. `where` ifadesinde `req.user`'dan türetilir.
**Gerekçe:** IDOR'a karşı tek savunma hattı. Controller katmanında kontrol yapılırsa bir endpoint unutabilir.
**Etki:** Her liste/tekil sorgusunda zorunlu test. Ay 4 ve Ay 6'da IDOR testleri.

## ADR-007: Access token 15 dakika + refresh 30 gün
**Karar:** Kısa access token, refresh token `validTokens` DB'de hash'li, eşzamanlı oturum limiti 3.
**Gerekçe:** 90 günlük token kabul edilemez. Mevcut `validTokens`/`maxActiveSessions` kolonları kullanıldı.
**Etki:** Refresh akışı zorunlu hale geldi. `sessionService` oluşturuldu.

## ADR-008: 6 haneli kodlar hash'li + deneme limitli
**Karar:** `crypto.randomInt` ile üretim, SHA-256 ile saklama, 5 deneme sonrası geçersizleştirme.
**Gerekçe:** Düz metin kod + sınırsız deneme = hesap çalma. Sağlık verisi taşıyor.
**Etki:** Migration gerekli. Şifre sıfırlama akışı yeniden yazıldı.

## ADR-009: Test ve CI Faz 1'de
**Karar:** 12 aylık solo çalışmada test altyapısı ertelenemez.
**Gerekçe:** Ay 8'de yazdığın kod Ay 9'da bozuldu ve bulamadın = 1 hafta kayıp. Test altyapısı 24 saatlik yatırım.
**Etki:** Her PR CI'da test koşuyor. Kapsam hedefi: Faz 6 sonunda ≥ %75.

## ADR-010: Para birimi kullanıcı tercihi
**Karar:** `TRY` sabit değer kaldırıldı. `preferredCurrency` profile eklendi.
**Gerekçe:** Arap pazarı AED/SAR/EGP kullanıyor. `Intl.NumberFormat` ile gösterim.
**Etki:** Yeni enum/migration. Tüm para alanları 3 haneli kod.

## ADR-011: Storybook tam kapsam değil
**Karar:** Kritik bileşenlerde story (%60). Kalanında yazılmaz.
**Gerekçe:** Storybook kullanıcıya değer üretmiyor. Zaman order yönetimine aktarıldı.
**Etki:** 7 ölü component silindi.

## ADR-012: Dosya yükleme Faz 4'te (planda yoktu)
**Karar:** R2/S3 presigned URL ile hasta fotoğrafı yükleme.
**Gerekçe:** Diş laboratuvarı fotoğrafsız çalışamaz. Bu, ürünü "güzel demo"dan "kullanılabilir ürün"e çeviren özellik.
**Etki:** MVP kapsamına girdi. 80 saat.

## ADR-003 (ek): Manuel smoke script yerine gerçek test
**Karar:** `server/scripts/test/` (interaktif, canlı DB, assertion'sız) silinecek, yerine Vitest + Supertest.
**Gerekçe:** Şu anki "test" CI'da çalışmaz, gerçek kullanıcı oluşturur, assertion içermez.
**Etki:** Faz 1'de. `prisma/seed.ts` ile değiştirilir.

## ADR-013: Sürüm tag'leri (SemVer + Release Drafter)
**Karar:** Her **faz kapanışında** ve her **ay sonu ritüelinde** bir sürüm kapanır: `main`'de `vX.Y.Z` **annotated tag** + GitHub Release (Release Drafter notlarıyla).
**Gerekçe:** `main` = üretim hattı; değişmez bir geri dönüş noktası (tag) şart. Release Drafter (`.github/workflows/release-drafter.yml` + `label.yml`) PR etiketlerinden sürüm notu taslağı biriktiriyor. Faz planı (Faz 0–7) doğal sürüm noktaları üretiyor.
**Etki:** Mevcut `v0.1.0`/`v0.1.1` eski history'de → rewrite sonrası ilk sürüm **`v0.2.0`**. Branch'ler akar, tag'ler kalır. Her commit'e değil, sadece kapanışlara tag atılır (`git tag -a`).
**Geri dönüş tetikleyicisi:** Tag/yayın gürültüsü olursa sıklık sadece gerçek yayın anına düşürülür.

---

> 🔗 [[09-calisma-ritueli|◀ 9. Çalışma Ritüeli]] · [[PLAN-2026-10_Ekim__2027-09_Eylul-AYLIK-YOL-HARITASI|🏠 Yol Haritası]] · [[11-ekler|▶ 11. Ekler]]
