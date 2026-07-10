"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ExternalLink,
  Handshake,
  PartyPopper,
  Star,
  Wallet,
} from "lucide-react";
import Reveal from "./reveal";

/** نثار احتفالي خفيف بألوان الهوية */
function Confetti() {
  const dots = [
    { x: -70, y: -58, c: "#e7b15c", d: 0 },
    { x: 64, y: -70, c: "#34a853", d: 0.06 },
    { x: -96, y: 6, c: "#2e6cb2", d: 0.12 },
    { x: 92, y: -8, c: "#e7b15c", d: 0.09 },
    { x: -40, y: -88, c: "#34a853", d: 0.15 },
    { x: 38, y: -92, c: "#2e6cb2", d: 0.03 },
    { x: 100, y: -52, c: "#c98f2f", d: 0.18 },
    { x: -104, y: -40, c: "#1f7a3d", d: 0.21 },
  ];
  return (
    <span aria-hidden className="pointer-events-none absolute inset-0 grid place-items-center">
      {dots.map((dot, i) => (
        <motion.span
          key={i}
          initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
          animate={{ x: dot.x, y: dot.y, scale: [0, 1.15, 0.9], opacity: [1, 1, 0] }}
          transition={{ duration: 1.3, delay: 0.35 + dot.d, ease: "easeOut" }}
          className="absolute size-2.5 rounded-full"
          style={{ backgroundColor: dot.c }}
        />
      ))}
    </span>
  );
}

/** الشاشة 17 — النجاح + التسليم: إغلاق الصفقة + أبشر + محفظة البائع */
export default function DealSuccess() {
  const reduce = useReducedMotion();

  return (
    <div className="mx-auto w-full max-w-xl text-center">
      {/* الاحتفال */}
      <div className="relative mx-auto w-fit">
        {!reduce && <Confetti />}
        <motion.span
          initial={reduce ? false : { scale: 0.3, opacity: 0, rotate: -14 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 230, damping: 14 }}
          className="relative grid size-20 place-items-center rounded-full bg-gradient-to-br from-green to-green-dark text-white shadow-lift"
        >
          <PartyPopper className="size-9" />
        </motion.span>
      </div>

      <Reveal delay={0.12}>
        <h1 className="mt-5 text-2xl font-black text-ink sm:text-3xl">
          تم إغلاق الصفقة بنجاح
        </h1>
        <p className="mt-2 font-medium text-muted">
          أُغلق الإعلان تلقائياً — مبروك للطرفين!
        </p>
        <p className="mt-3 text-lg font-extrabold text-ink">
          لاندكروزر GXR 2021 ·{" "}
          <span className="font-black text-green tabular-nums">150,000 ريال</span>
        </p>
      </Reveal>

      {/* الطرفان */}
      <Reveal delay={0.2}>
        <div className="mx-auto mt-6 flex max-w-sm items-center justify-center gap-4 rounded-3xl bg-white p-5 shadow-soft ring-1 ring-line/60">
          <div className="flex-1">
            <span className="mx-auto grid size-13 place-items-center rounded-full bg-gradient-to-br from-primary to-primary-dark text-base font-black text-white">
              أف
            </span>
            <p className="mt-2 font-extrabold text-ink">أبو فهد</p>
            <p className="text-xs font-bold text-muted">المشتري</p>
          </div>
          <motion.span
            initial={reduce ? false : { scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.55, type: "spring", stiffness: 300, damping: 14 }}
            className="grid size-11 shrink-0 place-items-center rounded-full bg-green-tint text-green-dark ring-1 ring-green/25"
          >
            <Handshake className="size-5" />
          </motion.span>
          <div className="flex-1">
            <span className="mx-auto grid size-13 place-items-center rounded-full bg-gradient-to-br from-gold to-gold-dark text-base font-black text-white">
              س
            </span>
            <p className="mt-2 font-extrabold text-ink">سالم</p>
            <p className="text-xs font-bold text-muted">البائع</p>
          </div>
        </div>
      </Reveal>

      {/* الخطوة الأخيرة — أبشر */}
      <Reveal delay={0.28}>
        <section
          aria-label="الخطوة الأخيرة — خارج التطبيق"
          className="mt-4 rounded-3xl bg-white p-6 text-start shadow-soft ring-1 ring-line/60"
        >
          <p className="text-xs font-black tracking-wide text-primary">
            الخطوة الأخيرة — خارج التطبيق
          </p>
          <p className="mt-2 font-bold leading-relaxed text-ink">
            أكملا نقل الملكية بينكما عبر{" "}
            <span className="rounded-lg bg-primary/8 px-2 py-0.5 font-black text-primary-dark">
              أبشر
            </span>{" "}
            باستخدام كود إتمام الملكية{" "}
            <span dir="ltr" className="font-black tracking-wider text-ink tabular-nums">
              MLK-7359
            </span>
          </p>
          <button className="mt-4 flex min-h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-gradient-to-l from-primary to-primary-dark font-extrabold text-white shadow-lift transition-all hover:brightness-110 active:scale-[0.98]">
            <ExternalLink className="size-4.5" />
            فتح أبشر
          </button>
        </section>
      </Reveal>

      {/* محفظة البائع */}
      <Reveal delay={0.34}>
        <section
          aria-label="محفظة البائع سالم"
          className="mt-4 flex items-center gap-3.5 rounded-3xl bg-green-tint p-5 text-start ring-1 ring-green/25"
        >
          <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-white text-green-dark shadow-soft">
            <Wallet className="size-5" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-extrabold text-ink">محفظة البائع سالم</p>
            <p className="text-xs font-medium text-muted">
              حصة البائع من العربون — تُخصم من قيمة البيع
            </p>
          </div>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, type: "spring", stiffness: 300, damping: 20 }}
            dir="ltr"
            className="shrink-0 text-xl font-black text-green-dark tabular-nums"
          >
            +200 ريال
          </motion.p>
        </section>
      </Reveal>

      {/* الإجراءات الختامية */}
      <Reveal delay={0.4}>
        <div className="mt-6 flex flex-col gap-2.5">
          <button className="flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-2xl bg-white font-extrabold text-primary-dark shadow-soft ring-1 ring-primary/25 transition-all hover:ring-primary/60 hover:shadow-lift active:scale-[0.98]">
            <Star className="size-4.5" />
            قيّم التجربة
          </button>
          <Link
            href="/"
            className="min-h-11 cursor-pointer rounded-2xl py-2.5 font-bold text-muted transition-colors hover:bg-white hover:text-ink"
          >
            العودة للرئيسية
          </Link>
        </div>
      </Reveal>
    </div>
  );
}
