"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  Car,
  CalendarDays,
  Check,
  CircleCheck,
  Copy,
  MapPin,
  Wallet,
} from "lucide-react";
import Reveal from "./reveal";

const BOOKING_CODE = "HRJ-4821";

/** رمز QR رمزي — يُستبدل برمز حقيقي عند الربط */
function FakeQr({ className }: { className?: string }) {
  // نمط ثابت (Seeded) حتى لا يتغير بين الخادم والعميل
  let seed = 4821;
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  const size = 21;
  const cells: boolean[] = [];
  for (let y = 0; y < size; y++)
    for (let x = 0; x < size; x++) {
      const inFinder =
        (x < 7 && y < 7) || (x > size - 8 && y < 7) || (x < 7 && y > size - 8);
      cells.push(!inFinder && rand() > 0.55);
    }
  const finder = (fx: number, fy: number) => (
    <g key={`${fx}-${fy}`}>
      <rect x={fx} y={fy} width="7" height="7" fill="#1a1a1a" />
      <rect x={fx + 1} y={fy + 1} width="5" height="5" fill="#fff" />
      <rect x={fx + 2} y={fy + 2} width="3" height="3" fill="#1a1a1a" />
    </g>
  );
  return (
    <svg viewBox="0 0 21 21" className={className} role="img" aria-label="رمز QR لكود الحجز">
      <rect width="21" height="21" fill="#fff" />
      {cells.map((on, i) =>
        on ? (
          <rect key={i} x={i % size} y={Math.floor(i / size)} width="1" height="1" fill="#1a1a1a" />
        ) : null
      )}
      {finder(0, 0)}
      {finder(14, 0)}
      {finder(0, 14)}
    </svg>
  );
}

/** خريطة مصغّرة رمزية لموقع المركز */
function MiniMap({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 90" className={className} role="img" aria-label="خريطة مصغّرة لموقع المركز" preserveAspectRatio="xMidYMid slice">
      <rect width="200" height="90" fill="#eef3fa" />
      {/* شوارع */}
      <path d="M0 62 L200 48" stroke="#fff" strokeWidth="9" />
      <path d="M0 62 L200 48" stroke="#d9dfe7" strokeWidth="1" strokeDasharray="5 5" />
      <path d="M58 0 L74 90" stroke="#fff" strokeWidth="7" />
      <path d="M132 0 L120 90" stroke="#fff" strokeWidth="5" />
      <path d="M0 22 L200 14" stroke="#fff" strokeWidth="4" />
      {/* مبانٍ */}
      <rect x="16" y="30" width="22" height="16" rx="3" fill="#dae0e9" />
      <rect x="88" y="18" width="18" height="14" rx="3" fill="#dae0e9" />
      <rect x="150" y="60" width="26" height="16" rx="3" fill="#dae0e9" />
      <rect x="92" y="64" width="16" height="12" rx="3" fill="#d0e5d6" />
      {/* الدبوس */}
      <circle cx="100" cy="45" r="11" fill="rgba(46,108,178,0.18)" />
      <circle cx="100" cy="45" r="5.5" fill="#2e6cb2" stroke="#fff" strokeWidth="2" />
    </svg>
  );
}

/** الشاشة 13 — تأكيد الحجز: كود HRJ-4821 + خريطة مصغّرة */
export default function BookingConfirmation() {
  const reduce = useReducedMotion();
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(BOOKING_CODE);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // بيئات بلا صلاحية حافظة — نتجاهل بصمت
    }
  };

  const details = [
    { icon: CalendarDays, label: "الموعد", value: "الخميس 26 يونيو · 4:30 م" },
    { icon: Car, label: "السيارة", value: "لاندكروزر GXR 2021" },
    { icon: Wallet, label: "المدفوع", value: "150 ريال ✓", green: true },
  ];

  return (
    <div className="mx-auto w-full max-w-xl text-center">
      {/* نجاح */}
      <motion.div
        initial={reduce ? false : { scale: 0.4, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 240, damping: 15 }}
        className="relative mx-auto grid size-20 place-items-center rounded-full bg-green-tint"
      >
        <motion.span
          initial={reduce ? false : { scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.25, type: "spring", stiffness: 300, damping: 16 }}
          className="grid size-13 place-items-center rounded-full bg-green text-white shadow-lift"
        >
          <Check className="size-7" strokeWidth={3} />
        </motion.span>
        {!reduce && (
          <motion.span
            aria-hidden
            initial={{ scale: 0.6, opacity: 0.6 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
            className="absolute inset-0 rounded-full ring-2 ring-green"
          />
        )}
      </motion.div>

      <Reveal delay={0.15}>
        <h1 className="mt-5 text-2xl font-black text-ink sm:text-3xl">
          تم حجز الفحص بنجاح
        </h1>
        <p className="mx-auto mt-2 max-w-sm font-medium leading-relaxed text-muted">
          أرسلنا التفاصيل للبائع سالم — الإعلان الآن{" "}
          <span className="rounded-lg bg-gold-tint px-2 py-0.5 font-bold text-gold-deep">
            «محجوز للفحص»
          </span>
        </p>
      </Reveal>

      {/* كود الحجز */}
      <Reveal delay={0.22}>
        <section
          aria-label="كود الحجز"
          className="mt-7 overflow-hidden rounded-3xl bg-white shadow-soft ring-1 ring-line/60"
        >
          <div className="bg-gradient-to-l from-primary to-primary-dark p-5 text-white">
            <p className="text-xs font-bold text-white/70">كود الحجز</p>
            <p
              dir="ltr"
              className="mt-1 text-4xl font-black tracking-[0.18em] tabular-nums"
            >
              {BOOKING_CODE}
            </p>
          </div>
          <div className="flex flex-col items-center gap-4 p-6 sm:flex-row sm:justify-center">
            <div className="rounded-2xl p-2.5 ring-1 ring-line/70">
              <FakeQr className="size-32" />
            </div>
            <div className="space-y-3">
              <p className="max-w-45 text-sm font-medium leading-relaxed text-muted">
                امسح الرمز في المركز — أو أبرِز الكود
              </p>
              <button
                onClick={copy}
                className={`mx-auto flex min-h-11 cursor-pointer items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-extrabold transition-all active:scale-95 ${
                  copied
                    ? "bg-green-tint text-green-dark ring-1 ring-green/30"
                    : "bg-white text-primary shadow-soft ring-1 ring-primary/25 hover:ring-primary/60"
                }`}
              >
                {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                {copied ? "تم النسخ" : "نسخ الكود"}
              </button>
            </div>
          </div>
        </section>
      </Reveal>

      {/* الخريطة المصغّرة + التفاصيل */}
      <Reveal delay={0.3}>
        <section
          aria-label="تفاصيل الحجز"
          className="mt-4 overflow-hidden rounded-3xl bg-white text-start shadow-soft ring-1 ring-line/60"
        >
          <div className="relative">
            <MiniMap className="h-28 w-full" />
            <p className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-white/85 px-3.5 py-1.5 text-sm font-extrabold text-ink shadow-soft backdrop-blur-xl">
              <MapPin className="size-4 text-primary" />
              كارتك — حي الملقا · 2.4 كم
            </p>
          </div>
          <dl className="divide-y divide-line/50 px-5">
            {details.map((d) => (
              <div key={d.label} className="flex items-center gap-3 py-3.5">
                <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary/8 text-primary">
                  <d.icon className="size-4.5" strokeWidth={1.9} />
                </span>
                <dt className="text-sm font-medium text-muted">{d.label}</dt>
                <dd
                  className={`me-auto font-extrabold tabular-nums ${
                    d.green ? "text-green-dark" : "text-ink"
                  }`}
                >
                  {d.value}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      </Reveal>

      <Reveal delay={0.36}>
        <Link
          href="/center"
          className="mt-5 flex items-center justify-center gap-1.5 rounded-full py-2 text-xs font-medium text-muted transition-colors hover:text-primary"
        >
          <CircleCheck className="size-4 shrink-0 text-green" />
          أبرِز هذا الكود أنت والبائع عند الوصول إلى المركز
        </Link>
      </Reveal>
    </div>
  );
}
