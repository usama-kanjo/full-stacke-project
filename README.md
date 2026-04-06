# Auth in MERN Stack (Next.js & Express)

*A comprehensive authentication and user management system built with modern web technologies.*

---

## 🇹🇷 Türkçe (Turkish)

### Bu Projede Ne Var?

Bu proje, istemci (client) ve sunucu (server) olmak üzere iki ana bölümden oluşan **gelişmiş bir kimlik doğrulama (authentication) sistemidir**. Başlığında her ne kadar "MERN" geçse de, geleneksel React yerine modern **Next.js 16** kullanılmış, veritabanı tarafında ise hem **Mongoose** hem de yeni nesil ORM aracı **Prisma** sisteme dahil edilmiştir.

### Kullanılan Teknolojiler

#### Client (İstemci - Frontend)
- **Next.js (v16) ve React (v19):** Modern, performanslı ve sunucu taraflı oluşturulabilen (SSR/RSC) arayüz mimarisi.
- **TypeScript:** Ekstra güvenli ve tip destekli kodlama için.
- **Axios:** Sunucu ile API haberleşmesi (veri çekme) işlemleri için.
- **Sonner:** Kullanıcıya gösterilen zarif ve modern bildirimler (toast) için.

#### Server (Sunucu - Backend)
- **Node.js & Express.js (v5):** Performanslı ve hafif sunucu altyapısı.
- **Veritabanı (Mongoose & Prisma):** Veritabanı modellerinin (muhtemelen MongoDB) tanımlanması ve sorguların yönetilmesi için.
- **Güvenlik ve Kimlik Doğrulama:**
  - `bcryptjs`: Şifrelerin güvenli bir şekilde hash'lenmesi (kriptolanması) için.
  - `jsonwebtoken` (JWT) & `cookie-parser`: Oturum yönetimi, kullanıcı doğrulama ve yetkilendirme işlemleri için.
- **Veri Doğrulama:** `express-validator` sayesinde kullanıcıdan gelen verilerin (örneğin e-posta ve şifre formatı) kontrolü.
- **E-posta Gönderimi:** Kullanıcı kayıt onaylama veya şifre sıfırlama gibi işlemler için `nodemailer`.
- **Diğer:** API güvenliği için `cors`, ortam değişkenleri için `dotenv` kullanılmıştır.

### Nasıl Çalıştırılır?
1. `server` klasörünün içindeyken terminalde `npm run dev` komutunu çalıştırarak Backend servisini başlatabilirsiniz (Varsayılan olarak index.js takip edilecek).
2. `client` klasörü içindeyken terminalde `npm run dev` komutu ile Frontend arayüzünü (3001 portunda) başlatabilirsiniz.

---

## 🇬🇧 English

### What is this project?

This project is an **advanced authentication and user management system** composed of two main parts: the client and the server. Although the title mentions "MERN", the project utilizes modern **Next.js 16** instead of traditional React, and for the database layer, it incorporates both **Mongoose** and the modern ORM **Prisma**.

### Technologies Used

#### Client (Frontend)
- **Next.js (v16) & React (v19):** Modern, high-performance UI architecture with built-in Server Components (RSC) and SSR.
- **TypeScript:** Ensuring type-safe and reliable codebase.
- **Axios:** Managing API requests to interact with the backend logic.
- **Sonner:** A toast notification UI library for providing elegant user feedback.

#### Server (Backend)
- **Node.js & Express.js (v5):** A fast and minimalist web framework for building robust APIs.
- **Database (Mongoose & Prisma):** Used for database modeling, interactions, and query management (likely connected to MongoDB).
- **Security & Authentication:**
  - `bcryptjs`: Used to securely hash user passwords.
  - `jsonwebtoken` (JWT) & `cookie-parser`: Used for robust session management, authorization, and authentication tokens.
- **Data Validation:** `express-validator` limits invalid incoming payloads (checking email/password formats, etc.).
- **Mailing:** `nodemailer` is included to handle email dispatch for things like account verification and password reset flows.
- **Miscellaneous:** Includes `cors` for cross-origin security, and `dotenv` for handling environment variables.

### How to Run
1. Go to the `server` directory and run `npm run dev` to start the Node.js backend.
2. Go to the `client` directory and run `npm run dev` to start the Next.js frontend (running on port 3001).
