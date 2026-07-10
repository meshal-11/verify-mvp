"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  CalendarCheck2,
  CalendarPlus,
  CheckCheck,
  Clock3,
  MapPin,
  SendHorizontal,
  ShieldAlert,
} from "lucide-react";
import InspectionModal from "./inspection-modal";

interface ChatMessage {
  id: number;
  from: "buyer" | "seller";
  text: string;
  time: string;
  read?: boolean;
}

/** محادثة الشاشة 10 حرفياً */
const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 1,
    from: "buyer",
    text: "ودي أشوف السيارة على الطبيعة قبل ما أقرر الفحص",
    time: "6:02 م",
    read: true,
  },
  {
    id: 2,
    from: "seller",
    text: "حياك الله، أنا في النرجس — متى يناسبك؟",
    time: "6:05 م",
  },
  { id: 3, from: "buyer", text: "الجمعة العصر ممتاز", time: "6:06 م", read: true },
];

/**
 * الشاشة 10 — المحادثة + الشوفة الحرة
 * خطاف الثقة (الشاشة 11) يظهر تلقائياً بعد تأكيد موعد الشوفة
 */
export default function ChatThread() {
  const reduce = useReducedMotion();
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [draft, setDraft] = useState("");
  const [hookOpen, setHookOpen] = useState(false);
  const autoOpened = useRef(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // خطاف الثقة يظهر بعد اكتمال ظهور بطاقة الاتفاق (لحظة التحويل)
  useEffect(() => {
    if (autoOpened.current) return;
    autoOpened.current = true;
    const t = setTimeout(() => setHookOpen(true), reduce ? 800 : 2600);
    return () => clearTimeout(t);
  }, [reduce]);

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    const now = new Date().toLocaleTimeString("ar-SA", {
      hour: "numeric",
      minute: "2-digit",
    });
    setMessages((m) => [
      ...m,
      { id: Date.now(), from: "buyer", text, time: now, read: false },
    ]);
    setDraft("");
    requestAnimationFrame(() =>
      scrollRef.current?.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: reduce ? "auto" : "smooth",
      })
    );
  };

  const appear = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 16, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: { delay, type: "spring" as const, stiffness: 300, damping: 26 },
  });

  return (
    <div className="mx-auto flex h-[calc(100dvh-9rem)] min-h-[560px] w-full max-w-2xl flex-col overflow-hidden rounded-3xl bg-white shadow-soft ring-1 ring-line/60">
      {/* رأس المحادثة */}
      <header className="flex items-center gap-3 border-b border-line/60 bg-white/80 px-4 py-3 backdrop-blur-xl">
        <Link
          href="/car/toyota-land-cruiser-gxr-2021"
          aria-label="عودة للإعلان"
          className="grid size-10 shrink-0 place-items-center rounded-full text-primary transition-colors hover:bg-page"
        >
          <ArrowRight className="size-5" />
        </Link>
        <div className="relative">
          <span className="grid size-11 place-items-center rounded-full bg-gradient-to-br from-primary to-primary-dark text-lg font-black text-white">
            س
          </span>
          <span className="absolute -bottom-0.5 -left-0.5 size-3 rounded-full bg-green ring-2 ring-white" />
        </div>
        <div className="min-w-0">
          <p className="truncate font-extrabold text-ink">سالم — البائع</p>
          <p className="truncate text-xs font-bold text-muted">
            موثوق <span className="text-green-dark">96٪</span> · يرد خلال ساعة
          </p>
        </div>
      </header>

      {/* الرسائل */}
      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-page/60 p-4">
        {messages.map((msg, i) => (
          <motion.div
            key={msg.id}
            {...appear(i < 3 ? 0.2 + i * 0.3 : 0)}
            className={`flex ${msg.from === "buyer" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2.5 shadow-soft ${
                msg.from === "buyer"
                  ? "rounded-bl-md bg-gradient-to-l from-primary to-primary-dark text-white"
                  : "rounded-br-md bg-white text-ink ring-1 ring-line/60"
              }`}
            >
              <p className="font-medium leading-relaxed">{msg.text}</p>
              <p
                className={`mt-1 flex items-center gap-1 text-[11px] font-medium ${
                  msg.from === "buyer" ? "text-white/70" : "text-faint"
                }`}
              >
                {msg.time}
                {msg.from === "buyer" && (
                  <CheckCheck
                    className={`size-3.5 ${msg.read ? "text-green-300" : "text-white/50"}`}
                  />
                )}
              </p>
            </div>
          </motion.div>
        ))}

        {/* تدخل النظام الذكي — اتفاق الشوفة الحرة */}
        <motion.div {...appear(1.3)} className="py-1">
          <div className="mx-auto max-w-md rounded-3xl bg-green-tint p-5 ring-1 ring-green/25">
            <p className="flex items-center justify-center gap-2 text-center font-extrabold text-green-dark">
              <CalendarCheck2 className="size-5" />
              اتفقتما على معاينة مجانية
            </p>
            <div className="mt-4 grid grid-cols-2 gap-2.5">
              <div className="flex items-center gap-2 rounded-2xl bg-white/80 px-3 py-2.5 backdrop-blur">
                <MapPin className="size-4 shrink-0 text-primary" />
                <span className="text-sm font-bold text-ink">
                  الرياض — حي النرجس
                </span>
              </div>
              <div className="flex items-center gap-2 rounded-2xl bg-white/80 px-3 py-2.5 backdrop-blur">
                <Clock3 className="size-4 shrink-0 text-primary" />
                <span className="text-sm font-bold text-ink tabular-nums">
                  الجمعة 5:00 م
                </span>
              </div>
            </div>
            <p className="mt-3 text-center text-xs font-medium leading-relaxed text-green-dark/80">
              الشوفة الحرة بدون أي رسوم — ادفع فقط إذا قررت الفحص المعتمد
            </p>
            <button className="mt-4 flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-white font-bold text-primary shadow-soft ring-1 ring-primary/20 transition-all hover:ring-primary/50 hover:shadow-lift active:scale-[0.98]">
              <CalendarPlus className="size-4.5" />
              أضف إلى التقويم
            </button>
          </div>
        </motion.div>

        {/* تحذير النظام */}
        <motion.div {...appear(1.7)}>
          <p className="mx-auto flex w-fit items-center gap-1.5 rounded-full bg-gold-tint px-4 py-2 text-xs font-bold text-gold-deep ring-1 ring-gold/25">
            <ShieldAlert className="size-3.5" />
            لا تحوّل أي مبلغ خارج التطبيق
          </p>
        </motion.div>
      </div>

      {/* حقل الكتابة */}
      <div className="flex items-center gap-2.5 border-t border-line/60 bg-white p-3">
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="اكتب رسالتك…"
          aria-label="اكتب رسالتك"
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

      {/* الشاشة 11 — خطاف الثقة فوق المحادثة */}
      <InspectionModal open={hookOpen} onClose={() => setHookOpen(false)} />
    </div>
  );
}
