"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Camera,
  CircleCheck,
  ImagePlus,
  LoaderCircle,
  ScanSearch,
  Sparkles,
} from "lucide-react";
import CarPlaceholder from "./car-placeholder";
import Reveal from "./reveal";

/** خطوات التعرّف — الشاشة 2 حرفياً */
const AI_STEPS = [
  "تحديد الماركة والموديل",
  "قراءة الحالة الخارجية والداخلية",
  "اقتراح سعر مناسب من السوق",
];

/** الشاشة 2 — النشر الذكي: رفع الصور — الذكاء الاصطناعي يتعرّف على السيارة */
export default function SellPhotos() {
  const router = useRouter();
  const reduce = useReducedMotion();
  const [done, setDone] = useState(0);

  // محاكاة تقدم التحليل ثم الانتقال للمراجعة — يُستبدل بنداء AI حقيقي لاحقاً
  useEffect(() => {
    const stepMs = reduce ? 700 : 2000;
    const timers = [1, 2, 3].map((n) =>
      setTimeout(() => setDone(n), stepMs * n)
    );
    const nav = setTimeout(
      () => router.push("/sell/review"),
      stepMs * 3 + (reduce ? 400 : 1100)
    );
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(nav);
    };
  }, [router, reduce]);

  return (
    <div className="mx-auto w-full max-w-xl">
      {/* العنوان + الخطوة */}
      <Reveal>
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-2xl font-black text-ink sm:text-3xl">
            أضف عرض — سيارات
          </h1>
          <span className="shrink-0 rounded-full bg-white px-4 py-1.5 text-sm font-bold text-primary shadow-soft ring-1 ring-line/60 tabular-nums">
            الخطوة 1 من 3
          </span>
        </div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-line/70">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "33.3%" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="h-full rounded-full bg-gradient-to-l from-primary to-primary-dark"
          />
        </div>
      </Reveal>

      {/* الصور */}
      <Reveal delay={0.08}>
        <section aria-label="أضف صور سيارتك" className="mt-6">
          <h2 className="font-extrabold text-ink">أضف صور سيارتك</h2>
          <p className="mt-0.5 text-sm font-medium text-muted">
            الصورة الأولى هي صورة الغلاف — حتى 12 صورة
          </p>

          <div className="mt-4 grid grid-cols-3 gap-2.5">
            {/* الغلاف */}
            <div className="relative col-span-2 row-span-2 aspect-auto overflow-hidden rounded-2xl ring-1 ring-line/60">
              <CarPlaceholder variant={0} className="size-full" />
              <span className="absolute top-2.5 right-2.5 rounded-full bg-gold px-3 py-1 text-[11px] font-black text-[#3d2e12] shadow-gold">
                الغلاف
              </span>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-line/60">
              <CarPlaceholder variant={3} className="size-full" />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-line/60">
              <CarPlaceholder variant={4} className="size-full" />
            </div>
            <button className="grid aspect-[4/3] cursor-pointer place-items-center rounded-2xl border-2 border-dashed border-line bg-white text-faint transition-colors hover:border-primary/50 hover:text-primary">
              <Camera className="size-6" strokeWidth={1.6} />
            </button>
            <button className="grid aspect-[4/3] cursor-pointer place-items-center rounded-2xl border-2 border-dashed border-line bg-white text-faint transition-colors hover:border-primary/50 hover:text-primary">
              <ImagePlus className="size-6" strokeWidth={1.6} />
            </button>
            <button className="grid aspect-[4/3] cursor-pointer place-items-center rounded-2xl border-2 border-dashed border-line bg-white text-faint transition-colors hover:border-primary/50 hover:text-primary">
              <ImagePlus className="size-6" strokeWidth={1.6} />
            </button>
          </div>
        </section>
      </Reveal>

      {/* بطاقة التعرّف الذكي */}
      <Reveal delay={0.16}>
        <section
          aria-label="التعرف الذكي على السيارة"
          className="relative mt-6 rounded-3xl"
        >
          <span className="ai-ring" aria-hidden />
          <div className="relative rounded-3xl bg-white/90 p-6 shadow-soft ring-1 ring-line/70 backdrop-blur-xl">
            <div className="flex items-center gap-3.5">
              <motion.span
                animate={reduce ? {} : { scale: [1, 1.12, 1] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                className="grid size-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-primary to-primary-dark text-white shadow-lift"
              >
                <ScanSearch className="size-6" />
              </motion.span>
              <div>
                <h2 className="text-lg font-black text-ink">
                  يتعرّف الذكاء الاصطناعي على سيارتك…
                </h2>
                <p className="text-xs font-medium leading-relaxed text-muted">
                  نحلّل صورك لتعبئة بيانات الإعلان تلقائياً — لن يُنشر شيء قبل
                  مراجعتك
                </p>
              </div>
            </div>

            <ul className="mt-5 space-y-2.5">
              {AI_STEPS.map((step, i) => {
                const state =
                  i < done ? "done" : i === done ? "active" : "waiting";
                return (
                  <li
                    key={step}
                    className={`flex items-center gap-3 rounded-2xl p-3.5 ring-1 transition-colors duration-500 ${
                      state === "done"
                        ? "bg-green-tint/60 ring-green/20"
                        : state === "active"
                          ? "bg-primary/5 ring-primary/25"
                          : "bg-page/70 ring-line/60"
                    }`}
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.span
                        key={state}
                        initial={reduce ? false : { scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className={`grid size-7 shrink-0 place-items-center rounded-full ${
                          state === "done"
                            ? "bg-green text-white"
                            : state === "active"
                              ? "bg-primary text-white"
                              : "bg-white text-faint ring-1 ring-line"
                        }`}
                      >
                        {state === "done" ? (
                          <CircleCheck className="size-4" />
                        ) : state === "active" ? (
                          <LoaderCircle className="size-4 animate-spin" />
                        ) : (
                          <Sparkles className="size-3.5" />
                        )}
                      </motion.span>
                    </AnimatePresence>
                    <p
                      className={`text-sm font-bold ${
                        state === "waiting" ? "text-faint" : "text-ink"
                      }`}
                    >
                      {step}
                    </p>
                  </li>
                );
              })}
            </ul>

            <p className="mt-4 text-center text-xs font-medium text-faint tabular-nums">
              تستغرق العملية عادة أقل من 30 ثانية
            </p>
          </div>
        </section>
      </Reveal>
    </div>
  );
}
