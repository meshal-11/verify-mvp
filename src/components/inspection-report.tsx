"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  CarFront,
  CircleAlert,
  CircleCheck,
  Cog,
  FileText,
  ShieldCheck,
  Warehouse,
} from "lucide-react";
import Reveal from "./reveal";

/** نتائج الشاشة 15 حرفياً */
const RESULTS = [
  { label: "المكينة", verdict: "سليم", ok: true, icon: Cog },
  { label: "الشاصيه", verdict: "سليم", ok: true, icon: Warehouse },
  { label: "البودي", verdict: "ملاحظة", ok: false, icon: CarFront },
];

/** الشاشة 15 — التقرير الذكي: نتيجة خضراء «سليمة ومطابقة» + سؤال الحسم */
export default function InspectionReport() {
  const reduce = useReducedMotion();

  return (
    <div className="mx-auto w-full max-w-xl">
      <Reveal>
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-2xl font-black text-ink sm:text-3xl">
            تقرير الفحص
          </h1>
          <span className="rounded-full bg-white px-4 py-1.5 text-sm font-bold text-muted shadow-soft ring-1 ring-line/60 tabular-nums">
            كارتك · HRJ-4821
          </span>
        </div>
      </Reveal>

      {/* النتيجة الخضراء */}
      <Reveal delay={0.08}>
        <section
          aria-label="نتيجة الفحص"
          className="mt-5 overflow-hidden rounded-3xl bg-gradient-to-bl from-green to-green-dark p-7 text-center text-white shadow-lift"
        >
          <motion.span
            initial={reduce ? false : { scale: 0.4, rotate: -10, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 240, damping: 14, delay: 0.2 }}
            className="mx-auto mb-4 grid size-16 place-items-center rounded-full bg-white/15 ring-1 ring-white/30 backdrop-blur"
          >
            <ShieldCheck className="size-8" />
          </motion.span>
          <h2 className="text-2xl font-black leading-snug">
            السيارة سليمة ومطابقة لوصف البائع
          </h2>
          <p className="mt-2 text-sm font-medium text-white/85 tabular-nums">
            فحص 140 نقطة · مركز كارتك المعتمد · اليوم 5:10 م
          </p>
        </section>
      </Reveal>

      {/* النتائج الثلاث */}
      <div className="mt-4 grid grid-cols-3 gap-3">
        {RESULTS.map((r, i) => (
          <motion.div
            key={r.label}
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 + i * 0.09, type: "spring", stiffness: 300, damping: 24 }}
            className={`rounded-2xl bg-white p-4 text-center shadow-soft ring-1 ${
              r.ok ? "ring-line/60" : "ring-gold/30"
            }`}
          >
            <span
              className={`mx-auto grid size-10 place-items-center rounded-xl ${
                r.ok ? "bg-green-tint text-green-dark" : "bg-gold-tint text-gold-deep"
              }`}
            >
              <r.icon className="size-5" strokeWidth={1.9} />
            </span>
            <p className="mt-2 text-sm font-extrabold text-ink">{r.label}</p>
            <p
              className={`mt-0.5 flex items-center justify-center gap-1 text-xs font-black ${
                r.ok ? "text-green-dark" : "text-gold-deep"
              }`}
            >
              {r.ok ? <CircleCheck className="size-3.5" /> : <CircleAlert className="size-3.5" />}
              {r.verdict}
            </p>
          </motion.div>
        ))}
      </div>

      {/* الملاحظة الوحيدة */}
      <Reveal delay={0.15}>
        <section
          aria-label="ملاحظة الفحص"
          className="mt-4 rounded-3xl bg-gold-tint p-5 ring-1 ring-gold/25"
        >
          <p className="font-bold leading-relaxed text-gold-deep">
            <span className="font-black">ملاحظة وحيدة:</span> رش بالرفرف
            الأمامي فقط — مطابق تماماً لما أفصح عنه البائع في الإعلان
          </p>
        </section>
      </Reveal>

      {/* التقرير التفصيلي */}
      <Reveal delay={0.2}>
        <div className="mt-4 flex items-center justify-between gap-3 rounded-3xl bg-white p-5 shadow-soft ring-1 ring-line/60">
          <p className="flex items-center gap-2.5 font-extrabold text-ink">
            <span className="grid size-10 place-items-center rounded-xl bg-primary/8 text-primary">
              <FileText className="size-5" strokeWidth={1.9} />
            </span>
            التقرير التفصيلي — 140 نقطة
          </p>
          <button className="shrink-0 cursor-pointer rounded-xl bg-white px-4 py-2 text-sm font-extrabold text-primary shadow-soft ring-1 ring-primary/25 transition-all hover:ring-primary/60 active:scale-95">
            عرض PDF
          </button>
        </div>
      </Reveal>

      {/* سؤال الحسم */}
      <Reveal delay={0.26}>
        <section aria-label="هل تريد إتمام الشراء؟" className="mt-7 text-center">
          <h2 className="text-xl font-black text-ink">هل تريد إتمام الشراء؟</h2>
          <div className="mt-4 flex flex-col gap-2.5">
            <Link
              href="/closing"
              className="flex min-h-13 cursor-pointer items-center justify-center gap-2 rounded-2xl bg-gradient-to-l from-primary to-primary-dark px-6 py-3.5 text-lg font-extrabold text-white shadow-lift transition-all hover:brightness-110 hover:scale-[1.01] active:scale-[0.98]"
            >
              <CircleCheck className="size-5" />
              تأكيد الشراء
            </Link>
            <Link
              href="/car/toyota-land-cruiser-gxr-2021"
              className="min-h-11 cursor-pointer rounded-2xl py-2.5 font-bold text-muted transition-colors hover:bg-white hover:text-ink"
            >
              أحتاج وقتاً للتفكير
            </Link>
          </div>
        </section>
      </Reveal>
    </div>
  );
}
