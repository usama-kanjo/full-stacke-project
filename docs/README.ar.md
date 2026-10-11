# كانجولاب — نظام إدارة طلبات مخابر الأسنان

[**English**](../README.md) | [**Türkçe**](README.tr.md) | **العربية**

*منصة ويب لإدارة طلبات أعمال الأسنان التعويضية بين أطباء الأسنان وفنيي المختبرات.*

---

## المحتويات

- [ما هو هذا المشروع؟](#ما-هذا-المشروع)
- [الحالة الحالية](#الحالة-الحالية)
- [الميزات](#الميزات)
- [التقنيات المستخدمة](#التقنيات-المستخدمة)
- [هيكل المشروع](#هيكل-المشروع)
- [بدء سريع](#بدء-سريع)
- [السكربتات المتاحة](#السكربتات-المتاحة)
- [نقاط النهاية API](#نقاط-النهاية-api)
- [توليد الكود (Plop)](#توليد-الكود-plop)
- [مخطط قاعدة البيانات](#مخطط-قاعدة-البيانات)
- [التوثيق](#التوثيق)
- [قواعد المشروع](#قواعد-المشروع)
- [الترخيص](#الترخيص)

---

## ما هذا المشروع؟

**كانجولاب (KanjoLab)** هو **نظام متكامل لإدارة طلبات مخابر الأسنان** يعمل على رقمنة سير العمل بين أطباء الأسنان وفنيي المختبرات. ينشئ أطباء الأسنان أوامر عمل للأسنان التعويضية ويُسندونها مباشرة إلى فنيي المختبرات، مع تتبّع كامل للحالة من الإنشاء حتى الاكتمال.

هذا المستودع هو **مستودع متعدد الحزم** (`yarn workspaces`) يضم حزمتين:

| الحزمة | المسار | الوصف |
|--------|--------|-------|
| **الواجهة (client)** | [`client/`](../client/README.md) | واجهة Next.js 16 (نمط التصميم الذرّي) |
| **الخادم (server)** | [`server/`](../server/README.md) | الخلفية Express.js 5 (API، المصادقة، قاعدة البيانات) |

## الحالة الحالية

- **الخلفية** (Express 5 + Prisma + PostgreSQL) — **تعمل بشكل كامل**، جميع نقاط المصادقة والملف الشخصي مكتملة
- **الواجهة** (Next.js 16 + React 19) — **جارٍ إعادة كتابتها** باستخدام نمط التصميم الذرّي. اكتملت مكوّنات نظام التصميم والذرّات والجزيئات والكائنات؛ واكتملت صفحات تدفق المصادقة ولوحة التحكم والملف الشخصي والإعدادات. التالي: إدارة الطلبات.

## الميزات

- **مصادقة آمنة** — تسجيل، تسجيل دخول، تحقق بالبريد برمز من 6 أرقام، استعادة كلمة المرور
- **وصول قائم على الدور** — دورا طبيب الأسنان وفني المختبر مع ملفات شخصية وواجهات منفصلة
- **إدارة الملف الشخصي** — إكمال الملف بعد التسجيل بحقول خاصة بالدور (بيانات العيادة لأطباء الأسنان، بيانات المختبر للفنيين)
- **لوحة التحكم** — قوائم حسب الدور، عرض/تعديل الملف الشخصي، وصفحات الإعدادات
- **إدارة الطلبات** — *(قريبًا)* — إنشاء وإسناد وتتبّع وإكمال أوامر عمل الأسنان
- **إشعارات البريد** — رموز التحقق ورسائل استعادة كلمة المرور عبر SMTP (وضع حقيقي أو وضع الطابعة في وحدة التحكم)
- **نظام المكوّنات** — Storybook، مولّد Plop، رموز التصميم، وتحقق zod

## التقنيات المستخدمة

#### الواجهة (Client — قيد التطوير)

- **Next.js 16 و React 19** — مع TypeScript، App Router
- **CSS Modules** — تنسيق بنطاق المكوّن
- **نمط التصميم الذرّي** — `atoms/` ← `molecules/` ← `organisms/` ← `templates/` ← `pages/`
- **Axios** — عميل HTTP مع middlewares
- **Sonner** — إشعارات توست
- **Storybook 10** — تطوير وتوثيق المكوّنات
- **Plop** — توليد أكواد متّسقة للمكوّنات
- **zod** — تحقق من النماذج في الواجهة
- **@antfu/eslint-config** — جودة الكود

#### الخادم (Server — مكتمل)

- **Node.js و Express.js 5** — وحدات ESM
- **PostgreSQL و Prisma ORM v7** — قاعدة البيانات والهجرات
- **JWT و cookie-parser** — إدارة الجلسات والمصادقة (httpOnly cookie + خيار Bearer)
- **bcryptjs** — تجزئة كلمات المرور
- **express-validator** — التحقق من المدخلات
- **nodemailer** — إرسال البريد (Gmail SMTP، وضعا ONLINE/OFFLINE)

#### التبعيات المخططة

- **Socket.IO** — إشعارات فورية (مخطط)
- **next-intl / react-i18next** — دعم لغة متعددة للواجهة (عربي + إنجليزي) (مخطط)

## هيكل المشروع

```
authInMern/
├── client/                     # واجهة Next.js 16
│   └── src/
│       ├── app/                # الصفحات (App Router)
│       ├── assets/             # الملفات الثابتة (الخطوط، إلخ)
│       ├── components/
│       │   ├── atoms/          # أصغر وحدات الواجهة (Button، Input، إلخ)
│       │   ├── molecules/      # مجموعات الذرّات (FormField، Card، إلخ)
│       │   ├── organisms/      # أقسام مركّبة (AuthModal، Header، إلخ)
│       │   ├── templates/      # تخطيطات الصفحات (Auth، Dashboard)
│       │   └── pages/          # مكوّنات الصفحات الكاملة
│       ├── tokens/             # رموز التصميم (الألوان، المسافات، الخطوط)
│       ├── types/              # تعريفات الأنواع في TypeScript
│       ├── lib/                # عميل API، مخططات zod
│       ├── services/           # طبقة خدمات API
│       ├── hooks/              # هوكس React مخصصة
│       └── context/            # مزوّدو React Context
├── server/                     # الخلفية Express.js
│   └── src/
│       ├── config/             # إعدادات قاعدة البيانات و JWT
│       ├── controllers/        # معالجات الطلبات
│       ├── middlewares/        # المصادقة، الأخطاء، التحقق
│       ├── routes/v1/          # تعريفات مسارات API
│       ├── services/           # منطق الأعمال
│       ├── types/              # توسع أنواع TypeScript
│       ├── utils/              # فئة ApiError
│       └── validators/         # سلاسل express-validator
├── wiki/                       # توثيق المشروع (Home، Installation، API، FAQ…)
├── docs/                       # ترجمات README (English، Türkçe)
└── memory-bank/                # توثيق المشروع وتتبّع المشاكل
```

## بدء سريع

**مهم:** يستخدم هذا المشروع **yarn** كمدير حزم — لا تستخدم npm أبدًا.

```bash
# 1. استنساخ المستودع وتثبيت التبعيات (الجذر + مساحات العمل)
git clone https://github.com/usama-kanjo/full-stacke-project.git
cd authInMern
yarn install

# 2. إعداد متغيرات البيئة
cp server/.env.example server/.env
echo "NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1" > client/.env.local

# 3. تشغيل هجرات قاعدة البيانات
cd server
yarn db:migrate
cd ..

# 4. تشغيل الخادم (المنفذ 3000)
yarn server

# 5. تشغيل الواجهة (المنفذ 3001، في نافذة أخرى)
yarn client

# أو تشغيل الاثنين معًا
yarn dev
```

للحصول على تعليمات التثبيت التفصيلية راجع [دليل التثبيت](../wiki/Installation.md).

#### Storybook (تطوير مكوّنات الواجهة)

```bash
yarn workspace client storybook
# → http://localhost:6006
```

## السكربتات المتاحة

### الجذر (yarn workspaces)

| السكربت | الوصف |
|---------|-------|
| `yarn dev` | تشغيل الخادم والواجهة معًا |
| `yarn server` | وضع التطوير للخادم (المنفذ 3000) |
| `yarn client` | وضع التطوير للواجهة (المنفذ 3001) |
| `yarn build` | بناء جميع مساحات العمل |
| `yarn lint` | الفحص اللغوي لجميع مساحات العمل |
| `yarn typecheck` | فحص الأنواع لجميع مساحات العمل |
| `yarn validate` | فحص لغوي + فحص أنواع + فحص أسرار gitleaks |

مرجع السكربتات الكامل: [`client/README.md`](../client/README.md) و [`server/README.md`](../server/README.md).

## نقاط النهاية API

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
| GET/PUT | `/api/v1/dentist/profile` | ملف طبيب الأسنان |
| GET/PUT | `/api/v1/technician/profile` | ملف الفني |

كل أمثلة الطلبات/الاستجابات: [`wiki/API-Documentation.md`](../wiki/API-Documentation.md).

## توليد الكود (Plop)

تستخدم الواجهة **Plop** لتوليد مكوّنات وفق نمط التصميم الذرّي.

| الأمر | ينشئ |
|-------|------|
| `yarn plop` | تفاعلي — اختر مولّدًا |
| `yarn plop:atom` | `src/components/atoms/ComponentName/` (index.tsx + .module.css + .stories.tsx) |
| `yarn plop:molecule` | `src/components/molecules/ComponentName/` (نفس الملفات الثلاثة) |
| `yarn plop:organism` | `src/components/organisms/ComponentName/` (نفس الملفات الثلاثة) |
| `yarn plop:page` | `src/app/page-name/page.tsx` (الصفحة فقط) |

مثال:

```bash
yarn plop:atom
# → "Component name (PascalCase):" → Button
# → src/components/atoms/Button/index.tsx
# → src/components/atoms/Button/Button.module.css
# → src/components/atoms/Button/Button.stories.tsx
```

## مخطط قاعدة البيانات

- **User** — البريد، كلمة المرور، الدور، حالة التحقق
- **Dentist** — اسم العيادة، العنوان، الهاتف
- **Technician** — اسم المختبر، التخصصات
- **Order** — بيانات المريض، رقم السن، نوع العمل، اللون، الحالة، السعر، الموعد النهائي

## التوثيق

راجع مجلد [`wiki/`](../wiki/) للحصول على أدلة متعمقة:

| المستند | الوصف |
|---------|-------|
| [دليل التثبيت](../wiki/Installation.md) | تعليمات إعداد خطوة بخطوة |
| [توثيق API](../wiki/API-Documentation.md) | كل النقاط مع أمثلة الطلبات/الاستجابات |
| [دليل المستخدم](../wiki/User-Guide.md) | دليل استخدام شامل |
| [الأسئلة الشائعة](../wiki/FAQ.md) | الأسئلة المتكررة |

### ترجمات README (📄 Docs)

| اللغة | الملف |
|-------|-------|
| **English** | [`../README.md`](../README.md) |
| **Türkçe** | [`README.tr.md`](README.tr.md) |

## قواعد المشروع

- **مدير الحزم:** yarn فقط — لا تستخدم npm أبدًا
- **نطاق الفروع:** العمل فقط ضمن نطاق الفرع الحالي لتجنب تعارضات الدمج
- **فرع لكل تغيير:** يفتح فرع مستقل لكل عمل ويُدمج بـ `--no-ff`
- **جودة الكود:** TypeScript صارم، بدون `any`، تصديرات مسماة فقط، مع lint + typecheck إلزامي عبر `yarn validate`

## الترخيص

ISC — راجع [LICENSE](../LICENSE)