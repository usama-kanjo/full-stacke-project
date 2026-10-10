> 🔗 [[06-faz-2-rtl-i18n|◀ 🟣 FAZ 2 — RTL + i18n + MİMARİ GEÇİŞ]] · [[PLAN-2026-10_Ekim__2027-09_Eylul-AYLIK-YOL-HARITASI|🏠 Yol Haritası]] · [[06-faz-4-dosya-bildirim|▶ 🟢 FAZ 4 — DOSYA YÜKLEME + BİLDİRİM]]

# 💎 FAZ 3 — ÜRÜN: ORDER MANAGEMENT (Ocak → Mart 2027, ~280 saat)

**Hedef:** Projeyi bir "login demosu"ndan **gerçek bir ürüne** dönüştürmek.
**Başarı ölçütü:** Bir diş hekimi sipariş oluşturur, teknisyen görür ve tamamlar.

> **Bu faz bitmeden "bitti" deme.** Diğer her şey bunun etrafında süs.

**Ay ay bölüm:**

---

## Ay 4 (Ocak 2027) — Order Sunucu Temeli (~90 saat)

### 4.1 Order domain modeli (8 saat)
`prisma/schema.prisma` — değişiklikler:
```prisma
model Order {
  // ...mevcut alanlar
  urgency     Urgency        @default(NORMAL)    // String -> enum
  currency    String?                            // nullable yap
  price       Decimal?      @db.Decimal(10, 2)
  
  // YENİ
  assignedAt      DateTime?
  startedAt       DateTime?
  completedAt     DateTime?
  cancelledAt     DateTime?
  cancelReason    String?
  
  attachments     OrderAttachment[]
  statusHistory   OrderStatusHistory[]
  
  @@index([dentistId, status])
  @@index([technicianId, status])
  @@index([createdAt])
}

enum Urgency { LOW NORMAL HIGH URGENT }

model OrderStatusHistory {
  id          Int      @id @default(autoincrement())
  orderId     Int
  fromStatus  OrderStatus?
  toStatus    OrderStatus
  changedById Int
  note        String?
  createdAt   DateTime @default(now())
  order       Order    @relation(fields: [orderId], references: [id], onDelete: Cascade)
  changedBy   User     @relation(fields: [changedById], references: [id])
  @@index([orderId, createdAt])
}

model AuditLog {
  id         Int      @id @default(autoincrement())
  userId     Int?
  action     String   // "order.create", "order.assign", ...
  entity     String   // "Order"
  entityId   Int?
  metadata   Json?
  ipAddress  String?
  createdAt  DateTime @default(now())
  user       User?    @relation(fields: [userId], references: [id], onDelete: SetNull)
  @@index([entity, entityId])
  @@index([userId, createdAt])
}
```

**Düzeltmeler aynı anda:**
- `Order.dentistId` / `technicianId` → `onDelete: Restrict` (P0: kullanıcı silinemez, cascade yüzünden FK ihlali)
- `Order.description` zaten `Text`
- `Technician.specialties` API ile güncellenebilir hale geliyor (P1-11)
- `User.preferredCurrency String @default("AED")` — Arap pazarı için (P1-12)

### 4.2 Order servis + yetkilendirme (20 saat)
```ts
// services/orderService.ts — HER sorgu sahiplik kontrolü içerir
export async function listOrders(userId: number, role: Role, filters: OrderFilters) {
  return prisma.order.findMany({
    where: {
      // KRİTİK: DENTIST kendi siparişlerini, TEKNİSYEN atananları görür
      ...(role === "DENTIST" ? { dentistId: userId } : { technicianId: userId }),
      ...filters,
    },
    include: { dentist: {...}, technician: {...}, _count: { select: { attachments: true } } },
    orderBy: { createdAt: "desc" },
    skip: (filters.page - 1) * filters.limit,
    take: filters.limit,
  });
}
```

**Kural:** Kullanıcı ID'si **istemciden asla alınmaz** — her zaman `req.user`'dan türetilir. `orderId` path'ten gelir ama `where` içinde `dentistId: req.user.dentistId` de bulunur. **Bu, IDOR'a karşı tek savunma.**

**Durum makinesi:**
```
PENDING ──assign──▶ PENDING (technicianId set)
PENDING ──start────▶ IN_PROGRESS   (teknisyen)
IN_PROGRESS ──complete─▶ COMPLETED (teknisyen)
PENDING ──cancel──▶ CANCELLED     (doktor)
IN_PROGRESS ──cancel──▶ CANCELLED (doktor, gerekçe zorunlu)
COMPLETED/CANCELLED ──▶ değiştirilemez (terminal durum)
```

### 4.3 Order endpoint'leri (16 saat)
| Method | Yol | Yetki | Açıklama |
|--------|-----|-------|----------|
| `GET` | `/api/v1/order` | her iki rol | Liste + filtre + sayfalama |
| `GET` | `/api/v1/order/:id` | sahip | Detay |
| `POST` | `/api/v1/order` | `DENTIST` | Oluştur |
| `PUT` | `/api/v1/order/:id` | `DENTIST` (sahip) | Güncelle (PENDING'de) |
| `DELETE` | `/api/v1/order/:id` | `DENTIST` (sahip) | Sil (PENDING'de) → soft delete tercih et |
| `PATCH` | `/api/v1/order/:id/assign` | `DENTIST` (sahip) | Teknisyen ata |
| `PATCH` | `/api/v1/order/:id/status` | sahip (rol bazlı) | Durum değiştir |
| `GET` | `/api/v1/order/:id/history` | sahip | Durum geçmişi |
| `GET` | `/api/v1/technician/available` | `DENTIST` | Atanabilir teknisyenler |

**Filtre parametreleri:** `status`, `technicianId`, `urgency`, `from`, `to`, `search` (hasta adı/sipariş no), `page`, `limit`, `sort`

### 4.4 Validasyon + test (14 saat)
`validators/orderValidator.ts` — her alan için `isLength({max})`, enum kontrolü, `toothNumber` format doğrulaması, `price` pozitif, `deadline` gelecekte.

**Testler (önemli — bu fazın cankı):**

| Test | Kapsam |
|------|--------|
| `orderService` birim testleri | Filtreleme, sahiplik, durum makinesi |
| `authorize("DENTIST")` | 403 kontrolü |
| **IDOR testleri** | Doktor B, Doktor A'nın siparişine erişemez |
| Endpoint testleri | 201/400/401/403/404/422 |
| Durum makinesi | Her geçersiz geçiş reddedilmeli |

**Ay 4 çıktısı:** Sunucu tarafı hazır, testler yeşil, IDOR koruması kanıtlanmış.

---

## Ay 5 (Şubat 2027) — Order İstemci: Liste + Oluşturma (~95 saat)

### 5.1 Order UI bileşenleri (30 saat)
```
features/orders/
├── OrderList/
│   ├── OrderList.tsx           # tablo + filtre çubuğu + sayfalama
│   ├── OrderTable.tsx
│   ├── OrderFilters.tsx
│   ├── OrderStatusBadge.tsx
│   ├── OrderUrgencyBadge.tsx
│   └── OrderCard.tsx           # mobil görünüm
├── OrderForm/
│   ├── OrderForm.tsx           # oluşturma sihirbazı
│   ├── steps/PatientStep.tsx
│   ├── steps/WorkStep.tsx      # diş no, iş tipi, renk
│   ├── steps/DetailsStep.tsx   # deadline, fiyat, açıklama
│   └── steps/ReviewStep.tsx
├── OrderDetail/
│   ├── OrderDetail.tsx
│   ├── OrderTimeline.tsx       # durum geçmişi
│   └── OrderAssignment.tsx     # teknisyen ata
└── hooks/
    ├── useOrders.ts            # React Query
    ├── useOrderMutations.ts
    └── useOrderFilters.ts
```

### 5.2 Form + zod şemaları (20 saat)
```ts
// schemas/order.ts
export const orderSchema = z.object({
  patientName: z.string().min(2).max(100),
  toothNumber: z.string().max(50).optional(),
  workType: z.string().min(2).max(100),
  shade: z.string().max(20).optional(),
  urgency: z.enum(["LOW", "NORMAL", "HIGH", "URGENT"]),
  description: z.string().max(2000).optional(),
  price: z.coerce.number().positive().max(9999999).optional(),
  currency: z.string().length(3),
  deadline: z.coerce.date().optional(),
  technicianId: z.coerce.number().int().positive().optional(),
});
```

`useForm` hook'u bu şemayı kullanır. Çok adımlı sihirbaz için adım bazlı validasyon.

**Yerelleştirme:** Tüm alan etiketleri `ar.json`/`en.json` içinde. **Para birimi `Intl.NumberFormat(locale, { style: "currency", currency })`** — elle birleştirme yok.

### 5.3 Liste sayfası + filtreler (25 saat)
- Sunucu taraflı filtreleme (debounce'lu arama)
- Sayfalama (cursor tercih edilir — offset büyük veride yavaşlar)
- Boş durum (hiç sipariş yok / filtre sonucu yok)
- Yükleniyor skeleton
- Hata durumu + tekrar dene
- **Mobil: tablo → kart dönüşümü** (375px'te tablo kullanılamaz)

### 5.4 React Query entegrasyonu (12 saat)
```bash
yarn workspace client add @tanstack/react-query
```
- `QueryClientProvider` root layout'ta
- `queryClient.ts` — varsayılan `staleTime`, `retry` politikası
- `useOrders` — `useQuery` + key: `["orders", filters]`
- Mutation sonrası invalidation
- **Optimistic update** — durum değişikliğinde anında UI güncellemesi

### 5.5 Sihirbaz (8 saat)
4 adım: Hasta → İş → Detaylar → Onay. İleri/geri, adım doğrulama, taslak kaydetme (localStorage — PII uyarısı: yalnızca oturum sonu, sunucuya yazma).

**Ay 5 çıktısı:** Doktor sipariş oluşturabilir, listeleyebilir, filtreleyebilir.

---

## Ay 6 (Mart 2027) — Detay + Atama + Durum (~95 saat)

### 6.1 Detay sayfası (25 saat)
- Tüm alanları göster (locale'e göre)
- Durum rozeti + zaman çizelgesi
- Doktor için: düzenleme (PENDING durumundayken), silme, atama
- Teknisyen için: durum güncelleme butonları, not ekleme
- **Yazdırma görünümü** (lab kağıdı — pratik ve düşük maliyetli)

### 6.2 Teknisyen atama (20 saat)
- Mevcut teknisyenleri listele (uzmanlık, iş yükü, tamamlanan sipariş sayısı)
- İş yüküne göre otomatik öneri
- Atama sonrası e-posta bildirimi (`notificationService`)

### 6.3 Durum yönetimi (20 saat)
- **Doktor:** iptal (gerekçe zorunlu)
- **Teknisyen:** başla (PENDING→IN_PROGRESS), tamamla (IN_PROGRESS→COMPLETED)
- Optimistic update + rollback hata durumunda
- WebSocket yok → **sayfa yenileme düğmesi + `refetchInterval: 60s`** yeterli

### 6.4 Order testleri (20 saat)
| Test | Kapsam |
|------|--------|
| `OrderList` | Filtre, sayfalama, boş durum |
| `OrderForm` | Adım doğrulama, hata mesajları (ar/en) |
| `OrderDetail` | Rol bazlı buton görünürlüğü |
| `useOrders` | Loading/error/success durumları |
| **IDOR (istemci)** | Doktor rolü teknisyen butonlarını görmüyor |

### 6.5 İlk gerçek kullanıcı testi (10 saat)
- 1 diş hekimi + 1 teknisyen ile uçtan uca senaryo
- Yarım kalan her yeri not al
- Bulunan her hatayı düzelt

**Ay 6 çıktısı:** **Sipariş yönetimi uçtan uca çalışıyor.** Bu fazın sonunda proje bir demo değil, gerçek bir ürün.

---

> 🔗 [[06-faz-2-rtl-i18n|◀ 🟣 FAZ 2 — RTL + i18n + MİMARİ GEÇİŞ]] · [[PLAN-2026-10_Ekim__2027-09_Eylul-AYLIK-YOL-HARITASI|🏠 Yol Haritası]] · [[06-faz-4-dosya-bildirim|▶ 🟢 FAZ 4 — DOSYA YÜKLEME + BİLDİRİM]]
