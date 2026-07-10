"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  BellRing,
  Camera,
  CheckCheck,
  MessageCircleReply,
  RefreshCw,
  SendHorizontal,
  ShieldCheck,
  Timer,
} from "lucide-react";
import { VerifyMark } from "./verify-logo";

/** نصائح الشاشة 19 حرفياً */
const TIPS = [
  {
    icon: Camera,
    text: "صوّر السيارة نهاراً من 8 زوايا — إعلاناتك الحالية تنقصها صورة الدعامية",
  },
  {
    icon: ShieldCheck,
    text: "وافق على طلبات الفحص فوراً — «محجوز للفحص» يرفع جدية المشترين",
  },
  {
    icon: MessageCircleReply,
    text: "رد على الرسائل خلال ساعة — البائع السريع يبيع أسرع بـ40٪",
  },
];

/** سلّم الأسعار — 145 حتى 165 (من اليمين في RTL) */
const TICKS = ["145", "150", "155", "160", "165"];

/** الشاشة 19 — مساعد البائع: تسعير متوقع + نصائح بيع أسرع */
export default function AssistantSeller() {
  const reduce = useReducedMotion();
  const [draft, setDraft] = useState("");
  const [sent, setSent] = useState<string[]>([]);

  const send = () => {
    const t = draft.trim();
    if (!t) return;
    setSent((s) => [...s, t]);
    setDraft("");
  };

  const appear = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 16, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: {
      delay: reduce ? 0 : delay,
      type: "spring" as const,
      stiffness: 300,
      damping: 26,
    },
  });

  return (
    <div className="mx-auto flex h-[calc(100dvh-9rem)] min-h-[680px] w-full max-w-2xl flex-col overflow-hidden rounded-3xl bg-white shadow-soft ring-1 ring-line/60">
      {/* الرأس */}
      <header className="flex items-center gap-3 border-b border-line/60 bg-white/80 px-4 py-3 backdrop-blur-xl">
        <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-gold to-gold-dark text-[#3d2e12] shadow-gold">
          <VerifyMark className="size-5.5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate font-extrabold text-ink">مساعد Verify</p>
          <p className="truncate text-xs font-bold text-gold-deep">وضع البائع</p>
        </div>
        <Link
          href="/assistant"
          className="shrink-0 rounded-full bg-primary/8 px-3.5 py-1.5 text-xs font-extrabold text-primary-dark ring-1 ring-primary/15 transition-all hover:ring-primary/50"
        >
          مساعد المشتري
        </Link>
      </header>

      {/* المحادثة */}
      <div className="flex-1 space-y-3 overflow-y-auto bg-page/60 p-4">
        {/* رسالة البائع */}
        <motion.div {...appear(0.15)} className="flex justify-end">
          <div className="max-w-[80%] rounded-2xl rounded-bl-md bg-gradient-to-l from-primary to-primary-dark px-4 py-2.5 text-white shadow-soft">
            <p className="font-medium leading-relaxed">
              بكم أبيع لاندكروزري 2021 وكيف أبيعها بسرعة؟
            </p>
            <p className="mt-1 flex items-center gap-1 text-[11px] font-medium text-white/70">
              11:02 ص
              <CheckCheck className="size-3.5 text-green-300" />
            </p>
          </div>
        </motion.div>

        {/* بطاقة التسعير */}
        <motion.div {...appear(0.6)} className="pe-6">
          <div className="overflow-hidden rounded-3xl bg-white shadow-soft ring-1 ring-line/60">
            <div className="p-5">
              <p className="text-xs font-bold text-muted tabular-nums">
                بناءً على 214 إعلاناً مشابهاً بالرياض
              </p>
              <p className="mt-2 text-2xl font-black text-ink">
                السعر المقترح{" "}
                <span className="text-green tabular-nums">155,000 ريال</span>
              </p>
              <p className="mt-1.5 flex items-center gap-1.5 text-sm font-bold text-primary-dark">
                <Timer className="size-4 text-primary" />
                متوقع البيع خلال{" "}
                <span className="font-black tabular-nums">9 أيام</span> عند هذا
                السعر
              </p>
            </div>

            {/* سلّم الأسعار */}
            <div className="border-t border-line/60 bg-page/60 p-5">
              <div className="relative h-3 rounded-full bg-line/70">
                {/* منطقة البيع السريع: 145 → 155 (النصف الأيمن في RTL) */}
                <motion.span
                  initial={reduce ? false : { scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: reduce ? 0 : 1.0, duration: 0.8, ease: "easeOut" }}
                  className="absolute inset-y-0 right-0 w-1/2 origin-right rounded-full bg-gradient-to-l from-green to-green-dark"
                />
                {/* مؤشر السعر المقترح عند 155 */}
                <motion.span
                  initial={reduce ? false : { scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: reduce ? 0 : 1.7, type: "spring", stiffness: 300, damping: 16 }}
                  className="absolute top-1/2 right-1/2 size-5 -translate-y-1/2 translate-x-1/2 rounded-full bg-white ring-4 ring-green shadow-lift"
                />
              </div>
              <div className="mt-2 grid grid-cols-5 text-center text-[11px] font-bold text-muted tabular-nums">
                {TICKS.map((tick) => (
                  <span key={tick} className={tick === "155" ? "font-black text-green-dark" : ""}>
                    {tick}
                  </span>
                ))}
              </div>
              <p className="mt-2 text-center text-[11px] font-bold text-green-dark">
                منطقة البيع السريع — أعلى منها يبطئ البيع
              </p>
            </div>
          </div>
        </motion.div>

        {/* النصائح الثلاث */}
        <motion.div {...appear(1.2)} className="pe-6">
          <div className="rounded-3xl bg-white p-5 shadow-soft ring-1 ring-line/60">
            <h2 className="font-black text-ink">3 نصائح تبيعك أسرع</h2>
            <ul className="mt-3.5 space-y-2.5">
              {TIPS.map((tip, i) => (
                <motion.li
                  key={tip.text}
                  initial={reduce ? false : { opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: reduce ? 0 : 1.5 + i * 0.12, duration: 0.4, ease: "easeOut" }}
                  className="flex items-start gap-3 rounded-2xl bg-page/80 p-3.5 ring-1 ring-line/60"
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-white text-primary shadow-soft">
                    <tip.icon className="size-4.5" strokeWidth={1.9} />
                  </span>
                  <p className="text-sm font-bold leading-relaxed text-ink">
                    {tip.text}
                  </p>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* الإجراءان */}
        <motion.div {...appear(2.0)} className="flex flex-wrap gap-2 pe-6">
          <Link
            href="/my-ad"
            className="flex min-h-11 cursor-pointer items-center gap-2 rounded-2xl bg-gradient-to-l from-primary to-primary-dark px-5 py-2.5 font-extrabold text-white shadow-lift transition-all hover:brightness-110 active:scale-[0.97]"
          >
            <RefreshCw className="size-4.5" />
            حدّث سعر إعلاني
          </Link>
          <button className="flex min-h-11 cursor-pointer items-center gap-2 rounded-2xl bg-white px-5 py-2.5 font-extrabold text-primary-dark ring-1 ring-primary/25 transition-all hover:ring-primary/60 active:scale-[0.97]">
            <BellRing className="size-4.5" />
            ذكّرني بالتصوير
          </button>
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
          placeholder="اسأل عن إعلانك…"
          aria-label="اسأل عن إعلانك"
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
