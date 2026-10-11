# خادم كانجولاب — الخلفية

[**English**](../../server/README.md) | [**Türkçe**](README.tr.md) | **العربية**

*خلفية Express.js 5 لكانجولاب — طبقة API والمصادقة وقاعدة البيانات (تعمل بشكل كامل).*

---

## نظرة عامة

الخادم هو تطبيق **Express.js 5** مكتوب بـ **TypeScript (ESM)**. يستخدم **Prisma ORM 7** مع **PostgreSQL** لقاعدة البيانات، و**JWT** (httpOnly cookie + خيار Bearer) للمصادقة، و**bcryptjs** لتجزئة كلمات المرور، و**express-validator** للتحقق من المدخلات، و**nodemailer** لإرسال البريد.

**الحالة الحالية:** تعمل بشكل كامل — جميع نقاط المصادقة والملف الشخصي مكتملة. الواجهة جارٍ إعادة كتابتها لتتوافق مع هذه الواجهة البرمجية.

## التقنيات المستخدمة

- **وقت التشغيل:** Node.js (ESM، `"type": "module"`)
- **الإطار:** Express.js 5
- **اللغة:** TypeScript
- **قاعدة البيانات:** PostgreSQL عبر Prisma ORM 7 (`@prisma/adapter-pg`)
- **المصادقة:** jsonwebtoken 9 (httpOnly cookie + خيار Bearer)، bcryptjs
- **التحقق:** express-validator 7
- **البريد:** nodemailer 8 (Gmail SMTP، وضعا ONLINE/OFFLINE)
- **أدوات التطوير:** tsx (وضع المراقبة)، Prisma Studio

## هيكل المشروع

```
server/
├── prisma/                 # مخطط Prisma والهجرات
├── prisma.config.ts        # إعدادات Prisma CLI
├── scripts/                # سكربتات مساعدة (الاختبارات، التجزئة)
└── src/
    ├── config/             # اتصال قاعدة البيانات (Prisma)، إعدادات JWT
    ├── controllers/        # معالجات الطلبات (رفيعة، تفوّض للخدمات)
    ├── generated/          # عميل Prisma المولّد
    ├── middlewares/        # المصادقة (protect/softProtect)، معالجة الأخطاء
    ├── routes/v1/          # تعريفات المسارات
    │   ├── userRoute.ts
    │   ├── dentistRoute.ts
    │   └── technicianRoute.ts
    ├── services/           # منطق الأعمال (auth، user، الملفات، البريد)
    ├── types/              # توسعة أنواع Express (req.user)
    ├── utils/              # فئة ApiError
    ├── validators/         # سلاسل express-validator
    └── index.ts            # نقطة الدخول
```

## السكربتات المتاحة

| السكربت | الوصف |
|---------|-------|
| `yarn dev` | تشغيل خادم التطوير مع إعادة تحميل تلقائية (**المنفذ 3000**) |
| `yarn dev:offline` | تشغيل خادم التطوير بوضع البريد دون اتصال (الرموز → وحدة التحكم) |
| `yarn build` | تجميع TypeScript |
| `yarn start` | تجميع + تشغيل في وضع الإنتاج |
| `yarn test` | تشغيل مجموعة الاختبارات المجمّعة |
| `yarn hash` | إنشاء تجزئة كلمة مرور |
| `yarn lint` | الفحص اللغوي للكود المصدري |
| `yarn typecheck` | فحص الأنواع في TypeScript (`tsc --noEmit`) |
| `yarn db:generate` | إعادة توليد عميل Prisma |
| `yarn db:migrate` | تشغيل هجرات التطوير |
| `yarn db:migrate:prod` | تشغيل هجرات الإنتاج |
| `yarn db:push` | دفع المخطط إلى قاعدة البيانات |
| `yarn db:studio` | فتح Prisma Studio (**المنفذ 5555**) |
| `yarn db:seed` | تعبئة قاعدة البيانات |

## متغيرات البيئة

انسخ `.env.example` إلى `.env` في جذر الخادم:

```bash
cp server/.env.example server/.env
```

| المتغير | الوصف |
|---------|-------|
| `PORT` / `NODE_ENV` | منفذ الخادم (الافتراضي 3000) والبيئة |
| `DATABASE_URL` | سلسلة اتصال PostgreSQL |
| `JWT_SECRET` | المفتاح السري لتوقيع JWT (`openssl rand -hex 32`) |
| `JWT_EXPIRES_IN` | انتهاء رمز الوصول (الافتراضي `15m`) |
| `JWT_REFRESH_EXPIRES_IN` | انتهاء رمز التحديث (الافتراضي `30d`) |
| `JWT_COOKIE_EXPIRES` / `COOKIE_DOMAIN` | عمر الكوكي والنطاق |
| `EMAIL_USERNAME` / `EMAIL_PASSWORD` | بيانات Gmail SMTP للتطبيق |
| `SEND_MSG_METHOD` | `ONLINE` (رسائل حقيقية) أو `OFFLINE` (سجلات وحدة التحكم) |
| `COMPANY_NAME` / `SUPPORT_EMAIL` | هوية المرسل وجهة الدعم |
| `BASE_URL` | الرابط الأساسي للعميل المستخدم في روابط البريد |
| `CORS_ORIGINS` | قائمة النطاقات المسموحة مفصولة بفواصل |
| `S3_*` | إعدادات تخزين S3 (المرحلة 8، اختياري) |
| `SENTRY_DSN` | تتبّع أخطاء Sentry (المرحلة 2، اختياري) |

## نقاط النهاية API

**الرابط الأساسي:** `http://localhost:3000/api/v1`

### المستخدم / المصادقة

| الطريقة | المسار | الوصف |
|---------|--------|-------|
| POST | `/api/v1/user/register` | تسجيل مستخدم جديد |
| POST | `/api/v1/user/login` | تسجيل الدخول |
| POST | `/api/v1/user/verify-email` | التحقق من البريد برمز من 6 أرقام |
| POST | `/api/v1/user/resend-code` | إعادة إرسال رمز التحقق |
| POST | `/api/v1/user/logout` | تسجيل الخروج |
| POST | `/api/v1/user/complete-profile` | إكمال الملف الشخصي (اختيار الدور) |
| PUT | `/api/v1/user/change-password` | تغيير كلمة المرور |
| POST | `/api/v1/user/forgot-password` | طلب رمز استعادة كلمة المرور |
| POST | `/api/v1/user/reset-password` | استعادة كلمة المرور بالرمز |

### طبيب الأسنان

| الطريقة | المسار | الوصف |
|---------|--------|-------|
| GET | `/api/v1/dentist/profile` | جلب ملف طبيب الأسنان |
| PUT | `/api/v1/dentist/profile` | تحديث ملف طبيب الأسنان |

### الفني

| الطريقة | المسار | الوصف |
|---------|--------|-------|
| GET | `/api/v1/technician/profile` | جلب ملف الفني |
| PUT | `/api/v1/technician/profile` | تحديث ملف الفني |

التوثيق الكامل للطلبات/الاستجابات: [`../../wiki/API-Documentation.md`](../../wiki/API-Documentation.md).

## قاعدة البيانات (Prisma)

تتبع المخطط ثماني هجرات:

1. `init` — المخطط الأولي
2. `update_relations_to_one_to_many` — إصلاحات العلاقات
3. `add_role_to_user` — حقل الدور في المستخدم
4. `fix_user_role_relation` — إصلاح العلاقة
5. `sifirdan_yabildi` — إعادة بناء المخطط
6. `user_add_email_verification_code` — حقول التحقق من البريد
7. `editing_role` — تعديلات حقل/قائمة الدور
8. `add_token_management` — إضافات إدارة الرموز

### النماذج

- **User** — البريد، passwordHash، الدور، حقول التحقق والرموز
- **Dentist** — fullName، phone، clinicName، clinicAddress، clinicCity، orders[]
- **Technician** — fullName، phone، labName، labAddress، labCity، specialties[]، orders[]
- **Order** — بيانات المريض، toothNumber، workType، اللون، الحالة (قائمة)، السعر، الموعد النهائي

## الاختبار والجودة

```bash
yarn lint       # ESLint
yarn typecheck  # فحص TypeScript الصارم
yarn test       # مجموعة الاختبارات المجمّعة
```

## روابط ذات صلة

- [README الرئيسي](../../README.md)
- [README العميل](../../client/README.md)
- [توثيق API](../../wiki/API-Documentation.md)