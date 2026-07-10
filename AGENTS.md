<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Verify — MVP (سابقاً: حراج أوتو)

تطبيق ويب عربي (RTL) لمنصة «Verify»: رحلة بيع وشراء سيارات آمنة (انطلقت كميزة «حراج أوتو»).
**الهوية (حُسمت 2026-07-11):** «Verify» هو الاسم التجاري **الوحيد** الظاهر للمستخدم — شعار درع بعلامة صح (`src/components/verify-logo.tsx` — يرث currentColor). استُبدلت **كل** «حراج» في نصوص الواجهة والنظام بـ Verify (مراقبة من/عمولة/خارج Verify، وقسم/مسار/وسوم «Verify السيارات»). لا تُدخل «حراج» في أي نص ظاهر للمستخدم بعد الآن — تعليقات الكود التاريخية استثناء لا يضر.
المرجع: نموذج أولي من 19 شاشة (ملفات HTML لدى مدير المشروع) — **مقدس من ناحية UX**: يُمنع تعديل هيكله أو نصوصه أو بياناته أو رحلة المستخدم؛ حرية الإبداع في الـ Styling فقط.
**اكتمل النموذج — 19/19 شاشة:** الرئيسية (`/`)، النشر الذكي (`/sell` ← `/sell/review`)، إعلانك (`/my-ad`)، السوم الآلي (`/seller-chat`)، طلبات الفحص (`/requests` — جرس الهيدر)، البحث الذكي (`/search`)، النتائج (`/search/results`)، تفاصيل الإعلان (`/car/[id]`)، المحادثة (`/chat`)، خطاف الثقة (`inspection-modal.tsx`)، حجز الفحص (`/booking`)، التأكيد (`/booking/confirmation`)، وضع المركز (`/center`)، التقرير (`/report`)، عربون الإغلاق (`/closing`)، النجاح (`/success`)، مساعد المشتري (`/assistant` — أيقونة الشرارة بالهيدر)، مساعد البائع (`/assistant/seller`). التالي: ربط Supabase.

## القواعد الملزمة
- **الهوية:** كحلي `--color-primary #2E6CB2` / `#234F86`. الذهبي `#E7B15C` **محجوز حصراً** لأفعال أوتو المحورية (اطلب فحص أوتو) — نصّه بني داكن `#3D2E12` للتباين. الأسعار **دائماً** بالأخضر `#34A853`. كل الرموز معرفة في `src/app/globals.css` (@theme) — لا ألوان خام في المكونات.
- **الخط:** Tajawal فقط (أوزان 300–900 عبر next/font). أرقام لاتينية مع `tabular-nums` للأسعار.
- **الأسلوب:** الهيكل المألوف للأسواق العربية (شريط أقسام + شريط علوي بالشعار + عمود عروض مشابهة) + فخامة هادئة: زوايا 16px+، ظلال ناعمة (`shadow-soft`/`shadow-lift`)، glassmorphism (`backdrop-blur` + شفافية)، حركات framer-motion قصيرة (150–400ms) مع احترام `prefers-reduced-motion`.
- **الأيقونات:** lucide-react فقط، بلا إيموجي.

## البنية
- `src/lib/data.ts` + `types.ts` — بيانات وهمية بهيكل جداول Supabase (الربط لاحقاً؛ استبدل دوال get* باستعلامات Supabase).
- `src/components/` — مكونات الشاشة 9 قابلة لإعادة الاستخدام في بقية الشاشات.
- **طبقة تفاعلية (2026-07-11):** فوق النموذج المقدس أُضيف منطق حالة تفاعلي دون تغيير النصوص/الهيكل/الألوان: مساعد المشتري chatbot (مؤشر تحليل + توصيات بالكلمات المفتاحية)، ودورة سوم حيّة عبر `src/lib/bid-store.ts` + localStorage (المشتري يضع سومة في `/chat` ← البائع يراها في `/seller-chat` ويوافق ← تتحدّث «أعلى سومة» في `/my-ad`). حاجب الأرقام في `src/lib/chat-guards.ts`.
- تحذير: لا تغلّف عناصر `fixed` (كالشريط السفلي في `action-bar.tsx`) بمكوّن `Reveal` — الـ transform يكسر التثبيت.

## أوامر
- تشغيل: `npm run dev` (منفذ 3000) أو عبر `.claude/launch.json` (haraj-dev)
- فحص: `npx tsc --noEmit` و `npm run lint` و `npm run build`
