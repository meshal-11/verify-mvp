"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  BellRing,
  CarFront,
  ChevronLeft,
  CircleCheck,
  Clock3,
  Cog,
  FileCheck2,
  LoaderCircle,
  ScanLine,
  Warehouse,
} from "lucide-react";

type StepState = "done" | "active" | "waiting";

interface Step {
  label: string;
  doneNote: string;
  icon: typeof Cog;
}

/** بنود الفحص — الشاشة 14 */
const STEPS: Step[] = [
  { label: "المكينة", doneNote: "اكتمل — لا ملاحظات", icon: Cog },
  { label: "الشاصيه", doneNote: "اكتمل — لا ملاحظات", icon: Warehouse },
  { label: "البودي", doneNote: "اكتمل", icon: CarFront },
];

/** الشاشة 14 — في المركز: بطاقة الكود الكبيرة + حالة الفحص الجاري */
export default function CenterMode() {
  const reduce = useReducedMotion();
  // الحالة الابتدائية كما في النموذج: المكينة مكتملة، الشاصيه يُفحص، البودي ينتظر
  const [progress, setProgress] = useState(1);

  // محاكاة تقدم الفحص — يُستبدل باشتراك Supabase Realtime لاحقاً
  useEffect(() => {
    const t1 = setTimeout(() => setProgress(2), reduce ? 1500 : 5000);
    const t2 = setTimeout(() => setProgress(3), reduce ? 3000 : 10000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [reduce]);

  const stateOf = (i: number): StepState =>
    i < progress ? "done" : i === progress ? "active" : "waiting";

  const allDone = progress >= STEPS.length;

  return (
    <div className="mx-auto w-full max-w-xl">
      {/* وضع المركز */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto mb-6 flex w-fit items-center gap-2 rounded-full bg-primary-deep px-5 py-2 text-sm font-extrabold text-white shadow-lift"
      >
        <ScanLine className="size-4 text-gold" />
        Verify — وضع المركز
      </motion.div>

      {/* بطاقة الكود الكبيرة */}
      <motion.section
        aria-label="كود الحجز"
        initial={reduce ? false : { opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.08, type: "spring", stiffness: 260, damping: 24 }}
        className="overflow-hidden rounded-3xl bg-gradient-to-bl from-primary to-primary-deep p-7 text-center text-white shadow-lift"
      >
        <p className="text-sm font-bold text-white/75">
          أبرِز هذا الكود لموظف المركز
        </p>
        <p dir="ltr" className="mt-3 text-5xl font-black tracking-[0.16em] tabular-nums sm:text-6xl">
          HRJ-4821
        </p>
        <p className="mt-4 text-sm font-medium text-white/80">
          لاندكروزر GXR 2021 · المشتري: أبو فهد · البائع: سالم
        </p>
      </motion.section>

      {/* حالة الفحص الجاري */}
      <motion.section
        aria-label="حالة الفحص"
        initial={reduce ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.18, duration: 0.5, ease: "easeOut" }}
        className="mt-4 rounded-3xl bg-white p-6 shadow-soft ring-1 ring-line/60"
      >
        <div className="flex items-center gap-3">
          {allDone ? (
            <span className="grid size-11 place-items-center rounded-2xl bg-green-tint text-green-dark">
              <CircleCheck className="size-6" />
            </span>
          ) : (
            <span className="grid size-11 place-items-center rounded-2xl bg-primary/8 text-primary">
              <LoaderCircle className="size-6 animate-spin [animation-duration:2.2s]" />
            </span>
          )}
          <div>
            <h2 className="text-lg font-black text-ink">الفحص جارٍ…</h2>
            <p className="flex items-center gap-1.5 text-xs font-medium text-muted tabular-nums">
              <Clock3 className="size-3.5" />
              مركز كارتك — حي الملقا · بدأ 4:36 م · المتبقي ≈ 25 دقيقة
            </p>
          </div>
        </div>

        <ul className="mt-5 space-y-2.5">
          {STEPS.map((step, i) => {
            const st = stateOf(i);
            return (
              <motion.li
                key={step.label}
                layout
                className={`flex items-center gap-3.5 rounded-2xl p-4 ring-1 transition-colors duration-500 ${
                  st === "done"
                    ? "bg-green-tint/60 ring-green/20"
                    : st === "active"
                      ? "bg-primary/5 ring-primary/25"
                      : "bg-page/70 ring-line/60"
                }`}
              >
                <span
                  className={`grid size-10 shrink-0 place-items-center rounded-xl transition-colors duration-500 ${
                    st === "done"
                      ? "bg-green text-white"
                      : st === "active"
                        ? "bg-primary text-white"
                        : "bg-white text-faint ring-1 ring-line/60"
                  }`}
                >
                  <step.icon className="size-5" strokeWidth={1.9} />
                </span>
                <p className="font-extrabold text-ink">{step.label}</p>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={st}
                    initial={reduce ? false : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className={`me-auto flex items-center gap-1.5 text-sm font-bold ${
                      st === "done"
                        ? "text-green-dark"
                        : st === "active"
                          ? "text-primary"
                          : "text-faint"
                    }`}
                  >
                    {st === "done" ? (
                      <>
                        <CircleCheck className="size-4" />
                        {step.doneNote}
                      </>
                    ) : st === "active" ? (
                      <>
                        <LoaderCircle className="size-4 animate-spin" />
                        يُفحص الآن…
                      </>
                    ) : (
                      "في الانتظار"
                    )}
                  </motion.p>
                </AnimatePresence>
              </motion.li>
            );
          })}
        </ul>
      </motion.section>

      {/* الإشعار عند الجاهزية — أو ملاحظة الانتظار */}
      <AnimatePresence mode="wait">
        {allDone ? (
          <motion.div
            key="ready"
            initial={reduce ? false : { opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 280, damping: 22 }}
            className="mt-4"
          >
            <Link
              href="/report"
              className="flex items-center gap-3.5 rounded-3xl bg-green-tint p-5 ring-1 ring-green/25 transition-all hover:shadow-lift hover:ring-green/50"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-green text-white shadow-soft">
                <BellRing className="size-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-black text-green-dark">
                  تقرير الفحص
                </span>
                <span className="block text-sm font-medium text-green-dark/75">
                  كارتك · HRJ-4821
                </span>
              </span>
              <ChevronLeft className="size-5 shrink-0 text-green-dark" />
            </Link>
          </motion.div>
        ) : (
          <motion.p
            key="waiting"
            exit={{ opacity: 0, y: -8 }}
            className="mt-4 flex items-center justify-center gap-1.5 text-center text-xs font-medium text-muted"
          >
            <FileCheck2 className="size-4 shrink-0 text-primary" />
            سيصلك إشعار فور جاهزية التقرير — لا حاجة للانتظار في المركز
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
