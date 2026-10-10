> 🔗 [[08-definition-of-done|◀ 8. Definition of Done]] · [[PLAN-2026-10_Ekim__2027-09_Eylul-AYLIK-YOL-HARITASI|🏠 Yol Haritası]] · [[10-karar-kaydi-adr|▶ 10. Karar Kaydı (ADR)]]

# 9. Çalışma Ritüeli

## Haftalık döngü
| Gün | Aktivite |
|-----|----------|
| Pazartesi | 15 dk: haftalık planlama, 3 iş seç (bitti ölçütü tanımlı) |
| Salı-Perşum | Kod yazma, teslim, düzeltme |
| Cuma | Refactor, teknik borç, dokümantasyon, `git push` |
| Cuma sonu | İlerleme günlüğü — ne yaptın, ne engellendi, hafta sonu yapacak mısın |

## Aylık döngü
| Zaman | Aktivite |
|-------|----------|
| Ayın 1. günü | Bu dokümanın ilgili ay bölümünü aç, işleri netleştir |
| Ayın son günü | 1 gün: ne bitti, ne kalmadı, saat harcaması, sapma notu |
| Ayın son günü | 1 gün: sonraki ayın planı + GitHub issue'ları |
| Ayın son günü | **Kapsam kilidi**: sonraki ay değişiklikler |

## Yapılacaklar (TODO) yöntemi
- GitHub Issues = tek doğruluk kaynağı (memory bank ile senkron)
- Her issue: kabul kriteri + tahmini saat + bağlı issue
- Kapalı issue = commit referansı
- **Süreç hala varsa** açık kalsın

## Sürüm stratejisi
- `main` → üretim
- `develop` → staging
- `feat/<issue-no>-<ad>` → özellik
- Haftalık `develop` → `main` merge (sürekli entegrasyon)

---

> 🔗 [[08-definition-of-done|◀ 8. Definition of Done]] · [[PLAN-2026-10_Ekim__2027-09_Eylul-AYLIK-YOL-HARITASI|🏠 Yol Haritası]] · [[10-karar-kaydi-adr|▶ 10. Karar Kaydı (ADR)]]
