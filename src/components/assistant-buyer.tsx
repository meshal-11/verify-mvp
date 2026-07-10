"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  BadgeCheck,
  CalendarCheck2,
  CheckCheck,
  Scale,
  SendHorizontal,
  Sparkles,
} from "lucide-react";
import CarPlaceholder from "./car-placeholder";
import BadgeMawjaz from "./badge-mawjaz";
import { VerifyMark } from "./verify-logo";

/** بطاقتا توصية المساعد — الشاشة 18 حرفياً */
const PICKS = [
  {
    href: "/car/toyota-land-cruiser-gxr-2021",
    top: true,
    title: "لاندكروزر GXR 2021 · 78,000 كم",
    price: "155,000",
    reason: "أرخص 6٪ من متوسط السوق",
    reasonTone: "green" as const,
    trust: "بائع موثوق 96٪",
    palette: 0,
  },
  {
    href: "/car/toyota-land-cruiser-vxr-2021",
    top: false,
    title: "لاندكروزر VXR 2021 · 92,500 كم",
    price: "159,000",
    reason: "فئة أعلى بسعر قريب",
    reasonTone: "primary" as const,
    trust: "بائع موثوق 91٪",
    palette: 1,
  },
];

/** فقاعة كتابة المساعد */
function AssistantBubble({
  children,
  delay,
  className = "",
}: {
  children: React.ReactNode;
  delay: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: reduce ? 0 : delay, type: "spring", stiffness: 300, damping: 26 }}
      className={`flex justify-start ${className}`}
    >
      <div className="max-w-[88%] rounded-2xl rounded-br-md bg-white px-4 py-3 shadow-soft ring-1 ring-line/60">
        {children}
      </div>
    </motion.div>
  );
}

/** الشاشة 18 — مساعد المشتري: توصيات ببطاقات سيارات + تعليل واضح */
export default function AssistantBuyer() {
  const reduce = useReducedMotion();
  const [draft, setDraft] = useState("");
  const [sent, setSent] = useState<string[]>([]);

  const send = () => {
    const t = draft.trim();
    if (!t) return;
    setSent((s) => [...s, t]);
    setDraft("");
  };

  return (
    <div className="mx-auto flex h-[calc(100dvh-9rem)] min-h-[640px] w-full max-w-2xl flex-col overflow-hidden rounded-3xl bg-white shadow-soft ring-1 ring-line/60">
      {/* الرأس */}
      <header className="flex items-center gap-3 border-b border-line/60 bg-white/80 px-4 py-3 backdrop-blur-xl">
        <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-primary to-primary-deep text-gold shadow-lift">
          <VerifyMark className="size-5.5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate font-extrabold text-ink">مساعد Verify</p>
          <p className="flex items-center gap-1.5 truncate text-xs font-bold text-muted">
            <span className="live-dot size-2 rounded-full bg-green" />
            يعرف السوق لحظة بلحظة
          </p>
        </div>
        <Link
          href="/assistant/seller"
          className="shrink-0 rounded-full bg-gold-tint px-3.5 py-1.5 text-xs font-extrabold text-gold-deep ring-1 ring-gold/30 transition-all hover:ring-gold/60"
        >
          وضع البائع
        </Link>
      </header>

      {/* المحادثة */}
      <div className="flex-1 space-y-3 overflow-y-auto bg-page/60 p-4">
        {/* رسالة المشتري */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="flex justify-end"
        >
          <div className="max-w-[80%] rounded-2xl rounded-bl-md bg-gradient-to-l from-primary to-primary-dark px-4 py-2.5 text-white shadow-soft">
            <p className="font-medium leading-relaxed">
              أبغى أفضل لاندكروزر تحت 160 ألف نظيف
            </p>
            <p className="mt-1 flex items-center gap-1 text-[11px] font-medium text-white/70">
              9:40 ص
              <CheckCheck className="size-3.5 text-green-300" />
            </p>
          </div>
        </motion.div>

        {/* رد المساعد */}
        <AssistantBubble delay={0.6}>
          <p className="font-medium leading-relaxed text-ink">
            قارنت لك <span className="font-black text-primary tabular-nums">27 إعلاناً</span>{" "}
            مطابقاً — هذان الأفضل قيمةً مقابل السعر:
          </p>
        </AssistantBubble>

        {/* بطاقتا التوصية */}
        <div className="space-y-2.5 pe-6">
          {PICKS.map((pick, i) => (
            <motion.div
              key={pick.title}
              initial={reduce ? false : { opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: reduce ? 0 : 1.0 + i * 0.18, type: "spring", stiffness: 280, damping: 24 }}
            >
              <Link
                href={pick.href}
                className={`group flex gap-3 rounded-3xl bg-white p-3 shadow-soft ring-1 transition-all hover:-translate-y-0.5 hover:shadow-lift ${
                  pick.top ? "ring-gold/40" : "ring-line/60 hover:ring-primary/30"
                }`}
              >
                <div className="relative aspect-[4/3] w-28 shrink-0 overflow-hidden rounded-2xl ring-1 ring-line/60">
                  <CarPlaceholder
                    variant={pick.palette}
                    className="size-full transition-transform duration-700 group-hover:scale-[1.06]"
                  />
                </div>
                <div className="min-w-0 flex-1 py-0.5">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <BadgeMawjaz compact />
                    {pick.top && (
                      <span className="flex items-center gap-1 rounded-full bg-gradient-to-l from-gold to-gold-dark px-2.5 py-0.5 text-[10px] font-black text-[#3d2e12]">
                        <Sparkles className="size-3" />
                        اختيار المساعد
                      </span>
                    )}
                  </div>
                  <p className="mt-1 truncate font-extrabold text-ink tabular-nums">
                    {pick.title}
                  </p>
                  <p className="font-black text-green tabular-nums">
                    {pick.price}{" "}
                    <span className="text-[10px] font-bold text-green-dark">ريال</span>
                  </p>
                  <div className="mt-1 flex flex-wrap items-center gap-1.5">
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        pick.reasonTone === "green"
                          ? "bg-green-tint text-green-dark"
                          : "bg-primary/8 text-primary-dark"
                      }`}
                    >
                      {pick.reason}
                    </span>
                    <span className="flex items-center gap-0.5 text-[10px] font-bold text-muted">
                      <BadgeCheck className="size-3 text-primary" />
                      {pick.trust}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* التعليل + السؤال */}
        <AssistantBubble delay={1.6}>
          <p className="font-medium leading-relaxed text-ink">
            الأول أنصح فيه أكثر: ممشى أقل، وسومه الحالي{" "}
            <span className="font-black text-green-dark tabular-nums">150 ألف</span> —
            عندك مجال تفاوض واضح. أحجز لك شوفة؟
          </p>
        </AssistantBubble>

        {/* الإجراءان */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reduce ? 0 : 2.0 }}
          className="flex flex-wrap gap-2 pe-6"
        >
          <Link
            href="/chat"
            className="flex min-h-11 cursor-pointer items-center gap-2 rounded-2xl bg-gradient-to-l from-primary to-primary-dark px-5 py-2.5 font-extrabold text-white shadow-lift transition-all hover:brightness-110 active:scale-[0.97]"
          >
            <CalendarCheck2 className="size-4.5" />
            احجز شوفة للأول
          </Link>
          <Link
            href="/search/results"
            className="flex min-h-11 cursor-pointer items-center gap-2 rounded-2xl bg-white px-5 py-2.5 font-extrabold text-primary-dark ring-1 ring-primary/25 transition-all hover:ring-primary/60 active:scale-[0.97]"
          >
            <Scale className="size-4.5" />
            قارنهما بالتفصيل
          </Link>
        </motion.div>

        {/* رسائل المستخدم الجديدة */}
        {sent.map((msg, i) => (
          <div key={i} className="flex justify-end">
            <div className="max-w-[80%] rounded-2xl rounded-bl-md bg-gradient-to-l from-primary to-primary-dark px-4 py-2.5 text-white shadow-soft">
              <p className="font-medium leading-relaxed">{msg}</p>
            </div>
          </div>
        ))}
      </div>

      {/* الإدخال */}
      <div className="flex items-center gap-2.5 border-t border-line/60 bg-white p-3">
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="اسأل عن أي سيارة…"
          aria-label="اسأل عن أي سيارة"
          className="min-h-12 w-full rounded-full bg-page px-5 font-medium text-ink outline-none ring-1 ring-line transition-all placeholder:text-faint focus:bg-white focus:ring-2 focus:ring-primary"
        />
        <button
          onClick={send}
          disabled={!draft.trim()}
          aria-label="إرسال"
          className="grid size-12 shrink-0 cursor-pointer place-items-center rounded-full bg-gradient-to-l from-primary to-primary-dark text-white shadow-lift transition-all hover:brightness-110 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <SendHorizontal className="size-5 -scale-x-100" />
        </button>
      </div>
    </div>
  );
}
