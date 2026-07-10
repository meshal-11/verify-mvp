"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  Building2,
  CircleCheck,
  FileCheck2,
  KeyRound,
  LoaderCircle,
  Lock,
  LockOpen,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import Reveal from "./reveal";
import AppleLogo from "./apple-logo";

/**
 * الشاشة 16 — عربون الإغلاق + العمولة (الشاشة المحورية)
 * التقرير والكود مقفلان حتى الدفع — الشفافية الكاملة في تقسيم الـ500
 */
export default function DealClosing() {
  const router = useRouter();
  const reduce = useReducedMotion();
  const [state, setState] = useState<"locked" | "paying" | "paid">("locked");

  // بعد الدفع: لحظة للاطلاع على الكود ثم الانتقال لإغلاق الصفقة (الشاشة 17)
  useEffect(() => {
    if (state !== "paid") return;
    const t = setTimeout(() => router.push("/success"), reduce ? 2500 : 5000);
    return () => clearTimeout(t);
  }, [state, router, reduce]);

  const pay = () => {
    if (state !== "locked") return;
    setState("paying");
    setTimeout(() => setState("paid"), reduce ? 400 : 1400);
  };

  const locked = state !== "paid";

  return (
    <div className="mx-auto w-full max-w-xl">
      <Reveal>
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-2xl font-black text-ink sm:text-3xl">
            إغلاق الصفقة
          </h1>
          <AnimatePresence mode="wait">
            <motion.span
              key={locked ? "waiting" : "paid"}
              initial={reduce ? false : { opacity: 0, y: 8, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8 }}
              className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-extrabold ring-1 ${
                locked
                  ? "bg-gold-tint text-gold-deep ring-gold/30"
                  : "bg-green-tint text-green-dark ring-green/30"
              }`}
            >
              {locked ? (
                <>
                  <Lock className="size-3.5" />
                  بانتظار العربون
                </>
              ) : (
                <>
                  <CircleCheck className="size-3.5" />
                  مدفوع ✓
                </>
              )}
            </motion.span>
          </AnimatePresence>
        </div>
      </Reveal>

      {/* التقرير والكود — مقفلان حتى الدفع */}
      <Reveal delay={0.07}>
        <div className="mt-5 space-y-3">
          <div className="flex items-center justify-between gap-3 rounded-3xl bg-white p-5 shadow-soft ring-1 ring-line/60">
            <p className="flex items-center gap-2.5 font-extrabold text-ink">
              <span className="grid size-10 place-items-center rounded-xl bg-primary/8 text-primary">
                <FileCheck2 className="size-5" strokeWidth={1.9} />
              </span>
              التقرير النهائي المعتمد
            </p>
            <div className="relative">
              <span
                className={`flex items-center gap-1.5 rounded-full bg-green-tint px-3.5 py-1.5 text-sm font-black text-green-dark transition-all duration-700 ${
                  locked ? "blur-[6px] select-none" : ""
                }`}
                aria-hidden={locked}
              >
                سليم ✓
              </span>
              {locked && (
                <Lock className="absolute inset-0 m-auto size-4 text-muted" />
              )}
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl bg-white shadow-soft ring-1 ring-line/60">
            <div className="flex items-center justify-between gap-3 p-5">
              <p className="flex items-center gap-2.5 font-extrabold text-ink">
                <span className="grid size-10 place-items-center rounded-xl bg-gold-tint text-gold-deep">
                  <KeyRound className="size-5" strokeWidth={1.9} />
                </span>
                كود إتمام الملكية
              </p>
              <div className="relative">
                <span
                  dir="ltr"
                  className={`text-2xl font-black tracking-[0.14em] text-ink tabular-nums transition-all duration-700 ${
                    locked ? "blur-[10px] select-none" : ""
                  }`}
                  aria-hidden={locked}
                >
                  MLK-7359
                </span>
                <AnimatePresence>
                  {locked && (
                    <motion.span
                      exit={reduce ? {} : { scale: 1.6, opacity: 0, rotate: -18 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0 grid place-items-center"
                    >
                      <Lock className="size-5 text-muted" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </div>
            {locked && (
              <p className="border-t border-line/60 bg-page/70 px-5 py-3 text-center text-xs font-bold text-muted">
                ادفع عربون الإغلاق لإصدار كود إتمام الملكية
              </p>
            )}
          </div>
        </div>
      </Reveal>

      {/* ملخص شفاف */}
      <Reveal delay={0.14}>
        <section
          aria-label="ملخص العربون الشفاف"
          className="mt-6 rounded-3xl bg-white p-6 shadow-soft ring-1 ring-line/60"
        >
          <h2 className="font-black text-ink">
            من دفع الـ500؟ ووين راحت؟ —{" "}
            <span className="text-primary">ملخص شفاف</span>
          </h2>

          {/* الدافع */}
          <div className="mt-4 flex items-center gap-3.5 rounded-2xl bg-page/80 p-4 ring-1 ring-line/60">
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-primary to-primary-dark text-sm font-black text-white">
              أف
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-extrabold text-ink">يدفعها المشتري «أبو فهد»</p>
              <p className="text-xs font-medium text-muted">
                عربون الإغلاق — عبر Apple Pay داخل التطبيق
              </p>
            </div>
            <p className="shrink-0 text-xl font-black text-green tabular-nums">
              500 <span className="text-xs font-bold text-green-dark">ريال</span>
            </p>
          </div>

          <p className="my-3 flex items-center justify-center gap-1.5 text-xs font-bold text-muted">
            <ArrowDown className="size-3.5 text-primary" />
            ينقسم تلقائياً إلى قسمين
          </p>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-primary/5 p-4 ring-1 ring-primary/15">
              <p className="flex items-center gap-2 text-sm font-extrabold text-primary-dark">
                <Building2 className="size-4" />
                إلى حراج — عمولة المنصة
              </p>
              <p className="mt-2 text-2xl font-black text-primary-dark tabular-nums">
                300 <span className="text-xs font-bold">ريال</span>
              </p>
              <p className="mt-1 text-xs font-medium text-muted">
                مقابل الفحص الموثّق وضمان الصفقة
              </p>
            </div>
            <div className="rounded-2xl bg-green-tint p-4 ring-1 ring-green/20">
              <p className="flex items-center gap-2 text-sm font-extrabold text-green-dark">
                <Wallet className="size-4" />
                إلى محفظة البائع «سالم»
              </p>
              <p className="mt-2 text-2xl font-black text-green-dark tabular-nums">
                200 <span className="text-xs font-bold">ريال</span>
              </p>
              <p className="mt-1 text-xs font-medium text-muted">
                تُخصم من قيمة السيارة
              </p>
            </div>
          </div>

          <p className="mt-4 rounded-2xl bg-gold-tint p-4 text-center text-xs font-bold leading-relaxed text-gold-deep ring-1 ring-gold/25 tabular-nums">
            الـ500 ليست رسوماً إضافية — تُخصم كاملة من قيمة السيارة (150,000)
            عند إتمام النقل
          </p>
        </section>
      </Reveal>

      {/* الدفع / التأكيد */}
      <div className="mt-6">
        <AnimatePresence mode="wait">
          {locked ? (
            <motion.div
              key="pay"
              exit={reduce ? {} : { opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              <motion.button
                onClick={pay}
                disabled={state === "paying"}
                aria-label="ادفع عربون الإغلاق عبر Apple Pay"
                whileHover={state === "locked" ? { scale: 1.015 } : {}}
                whileTap={state === "locked" ? { scale: 0.98 } : {}}
                className="flex min-h-14 w-full cursor-pointer items-center justify-center gap-1.5 rounded-2xl bg-black text-white shadow-lift disabled:cursor-wait"
              >
                {state === "paying" ? (
                  <LoaderCircle className="size-6 animate-spin" />
                ) : (
                  <>
                    <AppleLogo className="size-5" />
                    <span className="text-xl font-bold tracking-tight">Pay</span>
                  </>
                )}
              </motion.button>
              <p className="mt-3 flex items-center justify-center gap-1.5 text-xs font-medium text-muted">
                <LockOpen className="size-3.5 shrink-0 text-gold-dark" />
                الدفع شرط فكّ القفل — يُصدر الكود فوراً بعده
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="done"
              initial={reduce ? false : { opacity: 0, y: 16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
              className="flex items-start gap-3 rounded-3xl bg-green-tint p-5 ring-1 ring-green/25"
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-green text-white">
                <ShieldCheck className="size-5" />
              </span>
              <p className="font-bold leading-relaxed text-green-dark">
                تم دفع العربون — التقرير والكود متاحان الآن. شارك الكود مع
                البائع لإتمام النقل.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
