---
trigger: always_on
---

# IDE Anti-Gravity Vibecoding Rules
_Target Stack: Next.js 16 (React 19) · TypeScript · Express 5 · Prisma · PostgreSQL_

Bu doküman, frontend ve backend arasında **akışkan, okunabilir ve yerçekimsiz**
(vibe-odaklı) bir geliştirme deneyimi için kuralları tanımlar.

---

## 1. Core Principle

> Kod, okuyanın zihnini yormuyorsa başarılıdır.

- Kod çalışmak zorunda olduğu kadar **anlaşılır** olmalıdır.
- Her dosya, fonksiyon ve değişken **tek bir niyet** taşır.
- Karmaşıklık azaltılır, akış korunur.

---

## 2. Frontend Rules (Next.js 16 · React 19)

### 2.1 Component Design
- Her component **tek sorumluluk** taşır.
- 1 dosya = 1 ana component.
- Component uzunluğu ideal olarak **150 satırı geçmez**.

---

### 2.2 React & State
- Server Components varsayılandır.
- Client Component sadece **etkileşim gerektiğinde** kullanılır.
- `useEffect` son çaredir.
- Derived state tutulmaz.

---

### 2.3 Data Fetching
- Axios sadece **API / service layer** içinde kullanılır.
- Component içinde doğrudan axios çağrısı yapılmaz.

```ts
// client/services/user.service.ts
export const getUser = () => api.get("/user");
````

---

### 2.4 Notifications (Sonner)

* Toast = geri bildirimdir, iş mantığı değildir.
* Mesajlar kısa ve insan dilindedir.

---

## 3. Backend Rules (Express 5 · Node.js)

### 3.1 Katman Akışı

```txt
Route → Controller → Service → Prisma
```

* Route: sadece yönlendirme
* Controller: request / response
* Service: iş mantığı

Controller içinde **iş mantığı olmaz**.

---

### 3.2 Validation

* Tüm input’lar `express-validator` ile doğrulanır.
* Validation controller’dan ayrıdır.
* Hata mesajları net ve frontend-dostudur.

---

### 3.3 Error Handling

* Try/catch controller içinde yazılmaz.
* Global error middleware kullanılır.
* Her hata:

  * HTTP status
  * Açık mesaj
  * (Opsiyonel) internal error code

---

## 4. Database & Prisma

* Prisma schema **tek gerçek kaynaktır**.
* Migration isimleri anlamlı olur.
* `select *` kullanılmaz.
* Transaction gerekiyorsa açıkça belirtilir.

---

## 5. Environment & Config

* `.env` sadece environment değerleri içerir.
* Logic içermez.
* Frontend ve backend env’leri ayrıdır.

```txt
.env
.env.local
```

---

## 6. Directory Discipline

* `controllers/` → ince, okunabilir
* `services/` → iş mantığı
* `middlewares/` → side-effect içerir
* `utils/` → saf fonksiyonlar

Bir dosya zor okunuyorsa, **yanlış yerdedir**.

---

## 7. Naming Convention

* Boolean: `is`, `has`, `can`
* Function: fiil ile başlar
* Dosya isimleri tutarlı olur (`kebab-case` veya `camelCase`)

---

## 8. Anti-Patterns

* Erken optimizasyon
* God component / God service
* Aşırı abstraction
* “Sonra temizlerim” kodu

---

## 9. AI ile Vibecoding

* AI bir **pair programmer**’dır.
* Kopyala–yapıştır yapılmaz.
* Üretilen kod:

  1. Okunur
  2. Anlaşılır
  3. Projeye uyarlanır

---

## 10. Final Rule

> Kod yerçekimine meydan okuyabilir,
> ama ekip arkadaşını düşürmemelidir.

```







