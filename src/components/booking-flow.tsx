"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  BadgeCheck,
  CircleCheck,
  LoaderCircle,
  MapPin,
  Star,
} from "lucide-react";
import Reveal from "./reveal";
import AppleLogo from "./apple-logo";

/** بيانات الشاشة 12 حرفياً */
const CENTERS = [
  {
    id: "kartak",
    name: "كارتك — حي الملقا",
    nearest: true,
    meta: "2.4 كم · تقييم 4.8 ★ · معتمد من Verify",
  },
  {
    id: "alfahis",
    name: "الفاحص الشامل — العليا",
    nearest: false,
    meta: "5.1 كم · تقييم 4.6 ★ · معتمد من Verify",
  },
];

const SLOTS = ["الخميس 4:30 م", "الخميس 6:00 م", "الجمعة 10 ص"];

/** الشاشة 12 — حجز الفحص + الدفع: اختيار المركز + Apple Pay */
export default function BookingFlow() {
  const router = useRouter();
  const reduce = useReducedMotion();
  const [center, setCenter] = useState(CENTERS[0].id);
  const [slot, setSlot] = useState(SLOTS[0]);
  const [paying, setPaying] = useState(false);

  const pay = () => {
    if (paying) return;
    setPaying(true);
    setTimeout(() => router.push("/booking/confirmation"), reduce ? 400 : 1400);
  };

  return (
    <div className="mx-auto w-full max-w-xl">
      <Reveal>
        <h1 className="text-2xl font-black text-ink sm:text-3xl">
          حجز فحص معتمد
        </h1>
      </Reveal>

      {/* اختر مركز الفحص */}
      <Reveal delay={0.06}>
        <section aria-label="اختر مركز الفحص" className="mt-6">
          <h2 className="mb-3 font-extrabold text-ink">اختر مركز الفحص</h2>
          <div className="space-y-3" role="radiogroup" aria-label="مراكز الفحص">
            {CENTERS.map((c) => {
              const selected = center === c.id;
              return (
                <button
                  key={c.id}
                  role="radio"
                  aria-checked={selected}
                  onClick={() => setCenter(c.id)}
                  className={`relative flex w-full cursor-pointer items-start gap-3.5 rounded-3xl bg-white p-5 text-start shadow-soft ring-1 transition-all hover:shadow-lift ${
                    selected ? "ring-2 ring-primary" : "ring-line/60 hover:ring-primary/30"
                  }`}
                >
                  <span
                    className={`mt-0.5 grid size-10 shrink-0 place-items-center rounded-xl transition-colors ${
                      selected ? "bg-primary text-white" : "bg-primary/8 text-primary"
                    }`}
                  >
                    <MapPin className="size-5" strokeWidth={1.9} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-center gap-2">
                      <span className="font-extrabold text-ink">{c.name}</span>
                      {c.nearest && (
                        <span className="rounded-full bg-green-tint px-2.5 py-0.5 text-[11px] font-bold text-green-dark ring-1 ring-green/20">
                          الأقرب لك
                        </span>
                      )}
                    </span>
                    <span className="mt-1 flex items-center gap-1.5 text-sm font-medium text-muted tabular-nums">
                      <Star className="size-3.5 fill-gold text-gold" />
                      {c.meta}
                    </span>
                  </span>
                  <AnimatePresence>
                    {selected && (
                      <motion.span
                        initial={{ scale: 0.4, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.4, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 22 }}
                        className="text-primary"
                      >
                        <CircleCheck className="size-6 fill-primary text-white" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              );
            })}
          </div>
        </section>
      </Reveal>

      {/* اختر الموعد */}
      <Reveal delay={0.12}>
        <section aria-label="اختر الموعد" className="mt-7">
          <h2 className="mb-3 font-extrabold text-ink">اختر الموعد</h2>
          <div className="grid grid-cols-3 gap-2.5" role="radiogroup" aria-label="المواعيد">
            {SLOTS.map((s) => {
              const selected = slot === s;
              return (
                <button
                  key={s}
                  role="radio"
                  aria-checked={selected}
                  onClick={() => setSlot(s)}
                  className={`relative min-h-12 cursor-pointer rounded-2xl px-2 py-3 text-sm font-bold transition-all ${
                    selected
                      ? "text-white"
                      : "bg-white text-ink shadow-soft ring-1 ring-line/60 hover:ring-primary/40"
                  }`}
                >
                  {selected && (
                    <motion.span
                      layoutId="slot-bg"
                      transition={{ type: "spring", stiffness: 420, damping: 32 }}
                      className="absolute inset-0 rounded-2xl bg-gradient-to-l from-primary to-primary-dark shadow-lift"
                    />
                  )}
                  <span className="relative tabular-nums">{s}</span>
                </button>
              );
            })}
          </div>
        </section>
      </Reveal>

      {/* الملخص */}
      <Reveal delay={0.18}>
        <section
          aria-label="ملخص الحجز"
          className="mt-7 overflow-hidden rounded-3xl bg-white shadow-soft ring-1 ring-line/60"
        >
          <div className="flex items-center justify-between gap-3 p-5">
            <p className="font-extrabold text-ink">
              فحص شامل — مكينة · شاصيه · بودي
            </p>
            <p className="shrink-0 text-xl font-black text-green tabular-nums">
              150 <span className="text-sm font-bold text-green-dark">ريال</span>
            </p>
          </div>
          <dl className="space-y-2.5 border-t border-line/60 bg-page/60 p-5 text-sm">
            <div className="flex items-center justify-between">
              <dt className="font-medium text-muted">رسوم الحجز</dt>
              <dd className="font-extrabold text-green-dark">مجاناً</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="font-medium text-muted">رسوم الفحص</dt>
              <dd className="font-extrabold text-ink tabular-nums">150 ريال</dd>
            </div>
          </dl>
        </section>
      </Reveal>

      {/* Apple Pay */}
      <Reveal delay={0.24}>
        <motion.button
          onClick={pay}
          disabled={paying}
          aria-label="ادفع عبر Apple Pay"
          whileHover={paying ? {} : { scale: 1.015 }}
          whileTap={paying ? {} : { scale: 0.98 }}
          className="mt-6 flex min-h-14 w-full cursor-pointer items-center justify-center gap-1.5 rounded-2xl bg-black text-white shadow-lift transition-opacity disabled:cursor-wait"
        >
          {paying ? (
            <LoaderCircle className="size-6 animate-spin" />
          ) : (
            <>
              <AppleLogo className="size-5" />
              <span className="text-xl font-bold tracking-tight">Pay</span>
            </>
          )}
        </motion.button>
      </Reveal>

      <Reveal delay={0.28}>
        <p className="mt-3.5 flex items-center justify-center gap-1.5 text-center text-xs font-medium text-muted">
          <BadgeCheck className="size-4 shrink-0 text-green" />
          الدفع يؤكد جديتك للبائع — ويصله إشعار فوري بالحجز
        </p>
      </Reveal>
    </div>
  );
}
