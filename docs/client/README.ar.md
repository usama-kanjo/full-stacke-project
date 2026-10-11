# عميل كانجولاب — الواجهة

[**English**](../../client/README.md) | [**Türkçe**](README.tr.md) | **العربية**

*واجهة Next.js 16 لكانجولاب، مبنية بنمط التصميم الذرّي.*

---

## نظرة عامة

إن العميل هو تطبيق **Next.js 16 (App Router) + React 19** مكتوب بـ **TypeScript** (الوضع الصارم). يتبع **نمط التصميم الذرّي** ويستخدم **CSS Modules** للتنسيق بنطاق المكوّن، ونظام **رموز تصميم** مركزي، و**zod** للتحقق من النماذج، و**Axios** لاستدعاءات API، و**Sonner** لإشعارات التوست.

**الحالة الحالية:** اكتمل نظام التصميم وجميع مكوّنات المصادقة. تم بناء تدفق المصادقة ولوحة التحكم والملف الشخصي وصفحات الإعدادات. التالي: إدارة الطلبات.

## التقنيات المستخدمة

- **الإطار:** Next.js 16 (App Router)، React 19
- **اللغة:** TypeScript (صارم)
- **التنسيق:** CSS Modules + رموز التصميم (الألوان، المسافات، الخطوط، z-index، الانتقالات)
- **البنية:** نمط التصميم الذرّي (`atoms` ← `molecules` ← `organisms` ← `templates` ← `pages`)
- **عميل HTTP:** Axios (مع middlewares)
- **الإشعارات:** Sonner (توست)
- **التحقق:** zod (مخططات مركّزة في `lib/schemas/`)
- **تطوير المكوّنات:** Storybook 10
- **توليد الأكواد:** Plop
- **الفحص اللغوي:** @antfu/eslint-config (تصديرات مسماة فقط)

## هيكل المشروع

```
client/src/
├── app/                    # صفحات Next.js App Router
│   ├── layout.tsx          # التخطيط الجذري (AuthProvider + Toaster)
│   ├── page.tsx            # "/" ← AuthTemplate + AuthModal
│   └── dashboard/          # لوحة التحكم (Home، Profile، Settings)
├── assets/                 # الملفات الثابتة (الخطوط، إلخ)
├── components/
│   ├── atoms/              # أصغر وحدات الواجهة
│   ├── molecules/          # مجموعات الذرّات
│   ├── organisms/          # أقسام مركّبة
│   ├── templates/          # تخطيطات الصفحات
│   ├── pages/              # مكوّنات الصفحات الكاملة
│   └── index.ts            # تصدير برميل
├── tokens/                 # رموز التصميم (الألوان، المسافات، الخطوط)
├── types/                  # تعريفات الأنواع في TypeScript
├── lib/                    # عميل API + مخططات zod
├── services/               # طبقة خدمات API
├── hooks/                  # هوكس React مخصصة (useAuth، useForm، useDebounce)
└── context/                # مزوّدو React Context (AuthProvider)
```

### جرد المكوّنات

- **الذرّات (7):** Button، Badge، Input، Label، Icon، Spinner، Typography
- **الجزيئات (10):** FormField، PasswordInput، Card، Avatar، Modal، Toast، Tabs، Dropdown، Checkbox، Toggle
- **الكائنات (11):** AuthModal، LoginForm، RegisterForm، EmailVerificationForm، ForgotPasswordForm، ResetPasswordForm، Header، Sidebar، ProfileCompletionForm، DashboardHome، DashboardProfile، DashboardSettings
- **التخطيطات:** AuthTemplate، DashboardTemplate، MainLayout
- **الصفحات:** Home

## السكربتات المتاحة

| السكربت | الوصف |
|---------|-------|
| `yarn dev` | تشغيل خادم التطوير على **المنفذ 3001** |
| `yarn build` | بناء للإنتاج |
| `yarn start` | تشغيل بناء الإنتاج |
| `yarn lint` | تشغيل ESLint |
| `yarn typecheck` | فحص الأنواع في TypeScript (`tsc --noEmit`) |
| `yarn storybook` | تشغيل Storybook على **المنفذ 6006** |
| `yarn build-storybook` | بناء الموقع الثابت لـ Storybook |
| `yarn plop` | مولّد المكوّنات التفاعلي |
| `yarn plop:atom` | توليد مكوّن ذرّة جديد |
| `yarn plop:molecule` | توليد مكوّن جزيء جديد |
| `yarn plop:organism` | توليد مكوّن كائن جديد |
| `yarn plop:page` | توليد صفحة جديدة |

## متغيرات البيئة

أنشئ ملف `.env.local` في جذر العميل:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1
```

| المتغير | الافتراضي | الوصف |
|---------|-----------|-------|
| `NEXT_PUBLIC_API_URL` | `http://localhost:3000/api/v1` | الرابط الأساسي لخادم API |

## Storybook

```bash
yarn storybook
# → http://localhost:6006
```

## توليد الكود (Plop)

```bash
yarn plop      # تفاعلي — اختر مولّدًا
yarn plop:atom # ← src/components/atoms/ComponentName/ (index.tsx + .module.css + .stories.tsx)
```

## الاختبار والجودة

```bash
yarn lint       # ESLint
yarn typecheck  # فحص TypeScript الصارم
```

تبدأ بوابة الجودة الكاملة للمشروع (`lint` + `typecheck` + gitleaks) عبر `yarn validate` من جذر المستودع.

## روابط ذات صلة

- [README الرئيسي](../../README.md)
- [README الخادم](../../server/README.md)
- [دليل المستخدم](../../wiki/User-Guide.md)