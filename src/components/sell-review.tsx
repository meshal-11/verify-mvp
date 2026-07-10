"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { RefreshCw, ShieldCheck, Sparkles, TriangleAlert } from "lucide-react";
import Reveal from "./reveal";
import BadgeMawjaz from "./badge-mawjaz";

/** حقول الشاشة 3 حرفياً — أيقونة الشرارة = حقل عبّأه الذكاء الاصطناعي */
const FIELDS = [
  { label: "الماركة والموديل", value: "تويوتا لاندكروزر GXR" },
  { label: "سنة الصنع", value: "2021" },
  { label: "الفئة", value: "فل كامل" },
  { label: "الممشى", value: "78,000 كم" },
];

const AI_DESCRIPTION =
  "لاندكروزر GXR 2021 فل كامل — فتحة سقف، شاشة، كاميرات 360، جلد، دفع رباعي، مثبت سرعة تكيّفي، حساسات أمامية وخلفية. صيانات منتظمة لدى الوكالة، ماشية 78,000 كم.";

/** الشاشة 3 — مراجعة الاقتراحات: حقول معبأة تلقائياً + شارة موجز + نطاق سعر */
export default function SellReview() {
  const reduce = useReducedMotion();
  const [rephrasing, setRephrasing] = useState(false);

  const rephrase = () => {
    if (rephrasing) return;
    setRephrasing(true);
    setTimeout(() => setRephrasing(false), reduce ? 300 : 1200);
  };

  return (
    <div className="mx-auto w-full max-w-xl">
      <Reveal>
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-2xl font-black text-ink sm:text-3xl">
            راجع بيانات إعلانك
          </h1>
          <span className="shrink-0 rounded-full bg-white px-4 py-1.5 text-sm font-bold text-primary shadow-soft ring-1 ring-line/60 tabular-nums">
            الخطوة 2 من 3
          </span>
        </div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-line/70">
          <motion.div
            initial={{ width: "33.3%" }}
            animate={{ width: "66.6%" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="h-full rounded-full bg-gradient-to-l from-primary to-primary-dark"
          />
        </div>
        <p className="mt-3 text-sm font-medium text-muted">
          عبّأنا البيانات من صورك — راجع وعدّل ما تشاء
        </p>
      </Reveal>

      {/* الحقول المعبأة */}
      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {FIELDS.map((field, i) => (
          <motion.label
            key={field.label}
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.07, type: "spring", stiffness: 300, damping: 24 }}
            className="block"
          >
            <span className="mb-1.5 flex items-center gap-1.5 text-sm font-bold text-ink">
              {field.label}
              <Sparkles className="size-3.5 text-primary" aria-label="عبّأه الذكاء الاصطناعي" />
            </span>
            <input
              defaultValue={field.value}
              className="min-h-12 w-full rounded-2xl bg-white px-4 font-bold text-ink shadow-soft ring-1 ring-line/60 outline-none transition-all tabular-nums focus:ring-2 focus:ring-primary"
            />
          </motion.label>
        ))}
      </div>

      {/* الوصف */}
      <Reveal delay={0.15}>
        <div className="mt-4">
          <div className="mb-1.5 flex items-center justify-between gap-2">
            <span className="flex items-center gap-1.5 text-sm font-bold text-ink">
              وصف السيارة
              <span className="text-xs font-medium text-faint">
                (كتبه الذكاء الاصطناعي حسب الفئة)
              </span>
            </span>
          </div>
          <div className="relative rounded-2xl bg-white shadow-soft ring-1 ring-line/60 transition-all focus-within:ring-2 focus-within:ring-primary">
            <textarea
              key={rephrasing ? "re" : "orig"}
              defaultValue={AI_DESCRIPTION}
              rows={4}
              className={`w-full resize-none bg-transparent p-4 font-medium leading-relaxed text-ink outline-none transition-opacity ${
                rephrasing ? "opacity-30" : ""
              }`}
            />
            {rephrasing && (
              <span className="absolute inset-0 grid place-items-center">
                <span className="flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-bold text-white shadow-lift">
                  <RefreshCw className="size-4 animate-spin" />
                  إعادة صياغة
                </span>
              </span>
            )}
          </div>
          <div className="mt-2 flex items-center justify-between gap-2">
            <p className="flex items-center gap-1.5 text-xs font-medium text-muted">
              <Sparkles className="size-3.5 text-primary" />
              مواصفات فئة GXR مأخوذة تلقائياً
            </p>
            <button
              onClick={rephrase}
              className="flex cursor-pointer items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-xs font-extrabold text-primary shadow-soft ring-1 ring-primary/25 transition-all hover:ring-primary/60 active:scale-95"
            >
              <RefreshCw className={`size-3.5 ${rephrasing ? "animate-spin" : ""}`} />
              إعادة صياغة
            </button>
          </div>
        </div>
      </Reveal>

      {/* موجز */}
      <Reveal delay={0.2}>
        <section
          aria-label="فحص موجز"
          className="mt-5 flex items-start gap-3.5 rounded-3xl bg-green-tint p-5 ring-1 ring-green/25"
        >
          <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-white text-green-dark shadow-soft">
            <ShieldCheck className="size-5.5" />
          </span>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <BadgeMawjaz compact />
              <p className="font-black text-green-dark">
                خالية من حوادث مسجّلة كبرى ✓
              </p>
            </div>
            <p className="mt-1 text-xs font-medium leading-relaxed text-green-dark/80">
              فحص مبدئي مجاني من السجلات المرورية والتأمينية — تظهر الشارة في
              إعلانك
            </p>
          </div>
        </section>
      </Reveal>

      {/* نطاق السعر المقترح */}
      <Reveal delay={0.25}>
        <section
          aria-label="نطاق السعر المقترح"
          className="mt-4 rounded-3xl bg-white p-5 shadow-soft ring-1 ring-line/60"
        >
          <div className="flex items-center justify-between gap-2">
            <h2 className="font-extrabold text-ink">نطاق السعر المقترح</h2>
            <span className="rounded-full bg-page px-3 py-1 text-xs font-bold text-muted tabular-nums">
              من 214 إعلاناً مشابهاً بالرياض
            </span>
          </div>
          <p className="mt-3 text-2xl font-black text-green tabular-nums">
            150,000 – 162,000{" "}
            <span className="text-sm font-bold text-green-dark">ريال</span>
          </p>
          <div className="relative mt-3 h-2 rounded-full bg-line/60">
            <motion.span
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
              className="absolute inset-y-0 right-[18%] left-[22%] origin-right rounded-full bg-gradient-to-l from-green to-green-dark"
            />
          </div>
        </section>
      </Reveal>

      {/* عيوب بسيطة */}
      <Reveal delay={0.3}>
        <div className="mt-4">
          <span className="mb-1.5 flex items-center gap-1.5 text-sm font-bold text-ink">
            <TriangleAlert className="size-4 text-gold-dark" />
            عيوب بسيطة
            <span className="text-xs font-medium text-faint">
              (إدخال يدوي — يرفع ثقة المشتري)
            </span>
          </span>
          <div className="flex min-h-13 flex-wrap items-center gap-2 rounded-2xl bg-white p-2.5 shadow-soft ring-1 ring-line/60">
            <span className="flex items-center gap-1.5 rounded-full bg-gold-tint px-3.5 py-1.5 text-sm font-bold text-gold-deep ring-1 ring-gold/25">
              رش بالرفرف الأمامي
            </span>
          </div>
        </div>
      </Reveal>

      {/* النشر */}
      <Reveal delay={0.35}>
        <Link
          href="/my-ad"
          className="gold-shine relative mt-6 flex min-h-13 cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-l from-gold to-gold-dark px-6 py-3.5 text-lg font-black text-[#3d2e12] shadow-gold transition-transform hover:scale-[1.015] active:scale-[0.98]"
        >
          <Sparkles className="size-5" />
          انشر الإعلان
        </Link>
        <p className="mt-3 text-center text-xs font-medium text-faint">
          بالنشر أنت توافق على شروط Verify وسياسة الإعلانات
        </p>
      </Reveal>
    </div>
  );
}
