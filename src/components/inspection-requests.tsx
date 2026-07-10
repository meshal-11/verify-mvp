"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  CalendarClock,
  CircleCheck,
  FileCheck2,
  Lock,
  MapPin,
  Rocket,
  ShieldCheck,
} from "lucide-react";
import Reveal from "./reveal";

/** الشاشة 6 — الموافقة على الفحص: طلب المشتري ← موافقة ← وسم «محجوز للفحص» */
export default function InspectionRequests() {
  const reduce = useReducedMotion();
  const [approved, setApproved] = useState(false);

  return (
    <div className="mx-auto w-full max-w-xl">
      <Reveal>
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-2xl font-black text-ink sm:text-3xl">
            طلبات الفحص
          </h1>
          <span className="flex items-center gap-1.5 rounded-full bg-danger-tint px-4 py-1.5 text-sm font-extrabold text-danger ring-1 ring-danger/25 tabular-nums">
            <span className="live-dot size-2 rounded-full bg-danger" />1 جديد
          </span>
        </div>
      </Reveal>

      {/* الطلب */}
      <Reveal delay={0.08}>
        <section
          aria-label="طلب فحص معتمد"
          className="mt-5 rounded-3xl bg-white p-6 shadow-soft ring-1 ring-line/60"
        >
          <div className="flex items-center justify-between gap-2">
            <h2 className="flex items-center gap-2.5 text-lg font-black text-ink">
              <span className="grid size-11 place-items-center rounded-2xl bg-gradient-to-br from-gold to-gold-dark text-white shadow-gold">
                <ShieldCheck className="size-5.5" />
              </span>
              طلب فحص معتمد
            </h2>
            <span className="shrink-0 text-xs font-bold text-faint">
              قبل دقيقتين
            </span>
          </div>

          <p className="mt-4 font-medium leading-relaxed text-ink">
            يرغب المشتري <span className="font-black">أبو فهد</span> بفحص
            سيارتك في مركز معتمد. الفحص على حساب المشتري بالكامل —{" "}
            <span className="font-black text-green-dark">لا تدفع شيئاً.</span>
          </p>

          <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            <p className="flex items-center gap-2 rounded-2xl bg-page/80 px-4 py-3 text-sm font-bold text-ink ring-1 ring-line/60">
              <MapPin className="size-4 shrink-0 text-primary" />
              المركز: كارتك — حي الملقا
            </p>
            <p className="flex items-center gap-2 rounded-2xl bg-page/80 px-4 py-3 text-sm font-bold text-ink ring-1 ring-line/60 tabular-nums">
              <CalendarClock className="size-4 shrink-0 text-primary" />
              الخميس 4:30 م
            </p>
          </div>

          {/* لماذا توافق */}
          <ul className="mt-4 space-y-2.5">
            <li className="flex items-center gap-3 rounded-2xl bg-green-tint/70 p-3.5 ring-1 ring-green/20">
              <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-white text-green-dark shadow-soft">
                <Rocket className="size-4.5" />
              </span>
              <p className="text-sm font-bold text-green-dark">
                السيارات المفحوصة تُباع أسرع بـ3 أضعاف
              </p>
            </li>
            <li className="flex items-center gap-3 rounded-2xl bg-primary/5 p-3.5 ring-1 ring-primary/15">
              <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-white text-primary shadow-soft">
                <FileCheck2 className="size-4.5" />
              </span>
              <p className="text-sm font-bold text-primary-dark">
                تقرير موثوق يحسم التفاوض ويثبت سعرك
              </p>
            </li>
          </ul>

          <div className="mt-5 flex flex-col gap-2.5">
            <motion.button
              onClick={() => setApproved(true)}
              disabled={approved}
              whileTap={approved ? {} : { scale: 0.98 }}
              className={`flex min-h-13 cursor-pointer items-center justify-center gap-2 rounded-2xl text-lg font-extrabold shadow-lift transition-all ${
                approved
                  ? "bg-green text-white"
                  : "bg-gradient-to-l from-primary to-primary-dark text-white hover:brightness-110"
              }`}
            >
              <CircleCheck className="size-5" />
              وافق على الفحص
            </motion.button>
            <button
              disabled={approved}
              className="min-h-11 cursor-pointer rounded-2xl py-2.5 font-bold text-muted transition-colors hover:bg-page hover:text-ink disabled:opacity-40"
            >
              اقترح موعداً آخر
            </button>
          </div>
        </section>
      </Reveal>

      {/* بعد الموافقة */}
      <Reveal delay={0.16}>
        <section aria-label="بعد الموافقة — يظهر إعلانك هكذا" className="mt-6">
          <h2 className="mb-3 text-sm font-bold text-muted">
            بعد الموافقة — يظهر إعلانك هكذا
          </h2>
          <motion.div
            animate={
              approved && !reduce
                ? { scale: [1, 1.02, 1], boxShadow: "0 18px 44px rgba(35,79,134,0.14)" }
                : {}
            }
            transition={{ duration: 0.6 }}
            className={`rounded-3xl bg-white p-5 shadow-soft ring-1 transition-all duration-500 ${
              approved ? "ring-2 ring-gold/60" : "ring-line/60"
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="font-extrabold text-ink">
                  لاندكروزر GXR 2021 فل كامل
                </h3>
                <p className="mt-1.5 text-xl font-black text-green tabular-nums">
                  155,000{" "}
                  <span className="text-xs font-bold text-green-dark">ريال</span>
                </p>
              </div>
              <motion.span
                animate={approved && !reduce ? { scale: [1, 1.12, 1] } : {}}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="flex items-center gap-1.5 rounded-full bg-gold-tint px-4 py-2 text-sm font-black text-gold-deep ring-1 ring-gold/30"
              >
                <Lock className="size-3.5" />
                محجوز للفحص
              </motion.span>
            </div>
          </motion.div>
          <p className="mt-3 text-center text-xs font-medium text-muted">
            يوقف الوسم السومات الجديدة مؤقتاً حتى صدور نتيجة الفحص
          </p>
        </section>
      </Reveal>
    </div>
  );
}
