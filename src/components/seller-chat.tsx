"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Ban,
  CheckCheck,
  CircleCheck,
  Gavel,
  SendHorizontal,
  ShieldAlert,
  TriangleAlert,
} from "lucide-react";

/** الردود السريعة — الشاشة 5.1 حرفياً */
const QUICK_REPLIES = ["نكمل هنا بأمان", "وين مكان المعاينة؟", "تبي تحجز فحص؟"];

interface Bubble {
  id: number;
  from: "buyer" | "seller";
  text: string;
  time: string;
  read?: boolean;
}

/** افتتاحية الشاشة 5 حرفياً */
const OPENING: Bubble[] = [
  {
    id: 1,
    from: "buyer",
    text: "السلام عليكم، السيارة موجودة؟ وهل فيه شي غير رش الرفرف؟",
    time: "2:14 م",
  },
  {
    id: 2,
    from: "seller",
    text: "وعليكم السلام، موجودة والحمدلله — كل شي موثّق في فحص موجز",
    time: "2:15 م",
    read: true,
  },
  { id: 3, from: "buyer", text: "طيب أنا جاد، أسوم بـ150 ألف", time: "2:17 م" },
];

/** رد البائع بعد قبول السومة — الشاشة 5 (النموذج المحدَّث) */
const SELLER_FOLLOWUP: Bubble = {
  id: 4,
  from: "seller",
  text: "قبلت سومتك 150 — إذا حاب نمشي على خطوة الفحص المعتمد؟",
  time: "2:18 م",
  read: true,
};

/** محاولة التواصل الخارجي — الشاشة 5.1 حرفياً */
const BLOCK_ATTEMPT: Bubble = {
  id: 5,
  from: "buyer",
  text: "تمام اتفقنا على 150 — بس أبي أطمّن أكثر، عطني رقمك نكمل واتساب أسرع",
  time: "2:19 م",
};

/**
 * الشاشة 5 — المحادثة + السوم الآلي: التفاوض على سومة معيّنة — النظام يرصدها ويحدّث الإعلان
 * الشاشة 5.1 — محاولة تواصل خارج التطبيق — محظورة (تظهر كتكملة بعد قبول السومة)
 */
export default function SellerChat() {
  const reduce = useReducedMotion();
  const [bidAccepted, setBidAccepted] = useState<null | boolean>(null);
  const [messages, setMessages] = useState<Bubble[]>([]);
  const [draft, setDraft] = useState("");

  const send = (text: string) => {
    const t = text.trim();
    if (!t) return;
    const now = new Date().toLocaleTimeString("ar-SA", {
      hour: "numeric",
      minute: "2-digit",
    });
    setMessages((m) => [
      ...m,
      { id: Date.now(), from: "seller", text: t, time: now, read: false },
    ]);
    setDraft("");
  };

  const appear = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 16, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: { delay, type: "spring" as const, stiffness: 300, damping: 26 },
  });

  const bubble = (msg: Bubble, delay: number, blocked = false) => (
    <motion.div
      key={msg.id}
      {...appear(delay)}
      className={`flex ${msg.from === "seller" ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2.5 shadow-soft ${
          msg.from === "seller"
            ? "rounded-bl-md bg-gradient-to-l from-primary to-primary-dark text-white"
            : blocked
              ? "rounded-br-md bg-white opacity-60 ring-1 ring-danger/30"
              : "rounded-br-md bg-white text-ink ring-1 ring-line/60"
        }`}
      >
        <p
          className={`font-medium leading-relaxed ${
            blocked ? "text-ink line-through decoration-danger/60" : ""
          }`}
        >
          {msg.text}
        </p>
        <p
          className={`mt-1 flex items-center gap-1 text-[11px] font-medium ${
            msg.from === "seller" ? "text-white/70" : "text-faint"
          }`}
        >
          {msg.time}
          {msg.from === "seller" && (
            <CheckCheck className={`size-3.5 ${msg.read ? "text-green-300" : "text-white/50"}`} />
          )}
        </p>
      </div>
    </motion.div>
  );

  return (
    <div className="mx-auto flex h-[calc(100dvh-9rem)] min-h-[620px] w-full max-w-2xl flex-col overflow-hidden rounded-3xl bg-white shadow-soft ring-1 ring-line/60">
      {/* الرأس */}
      <header className="border-b border-line/60 bg-white/80 backdrop-blur-xl">
        <div className="flex items-center gap-3 px-4 py-3">
          <Link
            href="/my-ad"
            aria-label="عودة لإعلانك"
            className="grid size-10 shrink-0 place-items-center rounded-full text-primary transition-colors hover:bg-page"
          >
            <ArrowRight className="size-5" />
          </Link>
          <div className="relative">
            <span className="grid size-11 place-items-center rounded-full bg-gradient-to-br from-primary to-primary-dark text-sm font-black text-white">
              أف
            </span>
            <span className="absolute -bottom-0.5 -left-0.5 size-3 rounded-full bg-green ring-2 ring-white" />
          </div>
          <div className="min-w-0">
            <p className="truncate font-extrabold text-ink">أبو فهد</p>
            <p className="truncate text-xs font-bold text-muted">
              مشترٍ محتمل · <span className="text-green-dark">متصل الآن</span>
            </p>
          </div>
        </div>
        {/* سياق الإعلان */}
        <div className="flex items-center justify-between gap-2 border-t border-line/50 bg-page/60 px-4 py-2">
          <p className="truncate text-xs font-bold text-ink">
            لاندكروزر GXR 2021 فل كامل
          </p>
          <p className="shrink-0 text-xs font-black text-green tabular-nums">
            155,000 ريال
          </p>
        </div>
      </header>

      {/* الرسائل */}
      <div className="flex-1 space-y-3 overflow-y-auto bg-page/60 p-4">
        {/* تنبيه ثابت — التواصل خارج التطبيق ممنوع (عنصر UI ثابت، منفصل عن حالة الرسائل) */}
        <div className="mx-auto max-w-md rounded-2xl bg-gold-tint p-4 text-center ring-1 ring-gold/25">
          <p className="flex items-center justify-center gap-1.5 text-sm font-black text-gold-deep">
            <ShieldAlert className="size-4" />
            التواصل خارج التطبيق ممنوع
          </p>
          <p className="mt-1 text-xs font-medium leading-relaxed text-gold-deep/80">
            هذه المحادثة مراقبة من منصة Verify لحماية خصوصية الطرفين وضمان حق
            البائع والمشتري — أي اتفاق خارجها يُسقط الحماية عنكما.
          </p>
        </div>

        <p className="text-center text-[11px] font-bold text-faint tabular-nums">
          اليوم 2:14 م
        </p>

        {/* تنبيه المراقبة المختصر — الشاشة 5 */}
        <motion.div {...appear(0.1)}>
          <p className="mx-auto flex w-fit items-center gap-1.5 rounded-full bg-gold-tint px-4 py-2 text-xs font-bold text-gold-deep ring-1 ring-gold/25">
            <ShieldAlert className="size-3.5" />
            محادثة مراقبة من حراج لحماية الطرفين
          </p>
        </motion.div>

        {bubble(OPENING[0], 0.35)}
        {bubble(OPENING[1], 0.6)}
        {bubble(OPENING[2], 0.85)}

        {/* رصد السومة — تدخل النظام الذكي */}
        <motion.div {...appear(1.15)}>
          <div className="mx-auto max-w-md rounded-3xl bg-white p-5 ring-2 ring-primary/25 shadow-soft">
            <p className="flex items-center justify-center gap-2 text-sm font-black text-primary">
              <span className="grid size-7 place-items-center rounded-full bg-primary/10">
                <Gavel className="size-4" />
              </span>
              رصد النظام سومة جديدة
            </p>
            <p className="mt-2.5 text-center font-bold leading-relaxed text-ink">
              سومة بقيمة{" "}
              <span className="font-black text-green tabular-nums">
                150,000 ريال
              </span>{" "}
              — هل تقبلها كأعلى سومة؟
            </p>
            {bidAccepted === null ? (
              <div className="mt-4 grid grid-cols-2 gap-2.5">
                <button
                  onClick={() => setBidAccepted(true)}
                  className="min-h-11 cursor-pointer rounded-xl bg-gradient-to-l from-primary to-primary-dark font-extrabold text-white shadow-lift transition-all hover:brightness-110 active:scale-[0.97]"
                >
                  موافقة
                </button>
                <button
                  onClick={() => setBidAccepted(false)}
                  className="min-h-11 cursor-pointer rounded-xl bg-white font-extrabold text-muted ring-1 ring-line transition-all hover:text-ink hover:ring-primary/40 active:scale-[0.97]"
                >
                  رفض
                </button>
              </div>
            ) : (
              bidAccepted && (
                <motion.p
                  initial={reduce ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 flex items-center justify-center gap-1.5 rounded-xl bg-green-tint px-4 py-3 text-sm font-extrabold text-green-dark ring-1 ring-green/25"
                >
                  <CircleCheck className="size-4 shrink-0" />
                  تم تحديث أعلى سومة تلقائياً — تظهر الآن في إعلانك
                </motion.p>
              )
            )}
          </div>
        </motion.div>

        {/* التكملة — تُفتح فقط بعد قبول السومة (منطق الحالة) */}
        <AnimatePresence>
          {bidAccepted === true && (
            <motion.div
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-3"
            >
              {bubble(SELLER_FOLLOWUP, 0.3)}

              {/* الشاشة 5.1 — التحذير الكامل قبل المحاولة */}
              <motion.div {...appear(0.7)}>
                <div className="mx-auto max-w-md rounded-2xl bg-gold-tint p-4 text-center ring-1 ring-gold/25">
                  <p className="flex items-center justify-center gap-1.5 text-sm font-black text-gold-deep">
                    <ShieldAlert className="size-4" />
                    التواصل خارج التطبيق ممنوع.
                  </p>
                  <p className="mt-1 text-xs font-medium leading-relaxed text-gold-deep/80">
                    هذه المحادثة مراقبة من حراج لحماية خصوصية الطرفين وضمان حق
                    البائع والمشتري والمنصة — أي اتفاق خارجها يُسقط الحماية
                    عنكما.
                  </p>
                </div>
              </motion.div>

              <motion.p
                {...appear(0.9)}
                className="text-center text-[11px] font-bold text-faint tabular-nums"
              >
                اليوم 2:19 م
              </motion.p>

              {bubble(BLOCK_ATTEMPT, 1.1)}

              {/* الرسالة المحظورة */}
              {bubble(
                { id: 6, from: "buyer", text: "كلمني واتساب 05xxxxxxxx", time: "2:19 م" },
                1.4,
                true
              )}

              {/* بطاقة الحظر — نصوص النموذج المحدَّث */}
              <motion.div {...appear(1.7)}>
                <div className="mx-auto max-w-md rounded-2xl bg-danger-tint p-4 text-center ring-1 ring-danger/25">
                  <p className="flex items-center justify-center gap-1.5 text-sm font-black text-danger">
                    <Ban className="size-4" />
                    تم حظر هذه الرسالة تلقائياً
                  </p>
                  <p className="mt-1.5 text-xs font-medium leading-relaxed text-danger/85">
                    رصدنا محاولة مشاركة رقم للتواصل خارج التطبيق. يُمنع الاتفاق
                    أو التحويل خارج حراج — لحمايتكما من الاحتيال وضمان حق
                    البائع والمشتري والمنصة.
                  </p>
                  <p className="mt-2 text-xs font-bold text-muted">
                    أكملا داخل التطبيق لتبقيا مشمولين بضمان عربون الإغلاق
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {messages.map((m) => bubble(m, 0))}
      </div>

      {/* الردود السريعة + الإدخال */}
      <div className="border-t border-line/60 bg-white p-3">
        {/* الردود السريعة تظهر مع تكملة 5.1 فقط */}
        {bidAccepted === true && (
          <>
            <p className="mb-2 px-1 text-[11px] font-bold text-faint">
              اقتراحات للرد السريع بأمان
            </p>
            <div className="mb-2 flex gap-2 overflow-x-auto [scrollbar-width:none]">
              <AnimatePresence>
                {QUICK_REPLIES.map((reply, i) => (
                  <motion.button
                    key={reply}
                    initial={reduce ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.0 + i * 0.08 }}
                    onClick={() => send(reply)}
                    className="shrink-0 cursor-pointer rounded-full bg-primary/8 px-4 py-2 text-sm font-bold text-primary-dark ring-1 ring-primary/15 transition-all hover:bg-primary/15 active:scale-95"
                  >
                    {reply}
                  </motion.button>
                ))}
              </AnimatePresence>
            </div>
            <p className="mb-3 flex items-center justify-center gap-1 text-center text-[10px] font-bold text-faint">
              <TriangleAlert className="size-3 text-gold-dark" />
              تُسجَّل المحاولات المتكررة وقد تؤدي لإيقاف الحساب
            </p>
          </>
        )}
        <div className="flex items-center gap-2.5">
          <input
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send(draft)}
            placeholder="اكتب رسالتك…"
            aria-label="اكتب رسالتك"
            className="min-h-12 w-full rounded-full bg-page px-5 font-medium text-ink outline-none ring-1 ring-line transition-all placeholder:text-faint focus:bg-white focus:ring-2 focus:ring-primary"
          />
          <button
            onClick={() => send(draft)}
            disabled={!draft.trim()}
            aria-label="إرسال"
            className="grid size-12 shrink-0 cursor-pointer place-items-center rounded-full bg-gradient-to-l from-primary to-primary-dark text-white shadow-lift transition-all hover:brightness-110 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <SendHorizontal className="size-5 -scale-x-100" />
          </button>
        </div>
      </div>
    </div>
  );
}
