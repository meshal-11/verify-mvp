"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, SendHorizontal, ShieldAlert } from "lucide-react";

/** صندوق «أكتب سؤالك للعارض هنا» المألوف من حراج — بلمسة زجاجية */
export default function QuestionBox() {
  const [value, setValue] = useState("");
  const [sent, setSent] = useState(false);

  const submit = () => {
    if (!value.trim()) return;
    setSent(true);
    setValue("");
    setTimeout(() => setSent(false), 3500);
  };

  return (
    <section aria-label="اسأل العارض" className="rounded-3xl bg-white p-6 shadow-soft ring-1 ring-line/60">
      <h2 className="mb-1 text-lg font-extrabold text-ink">اسأل العارض</h2>
      <p className="mb-4 flex items-center gap-1.5 text-xs font-medium text-faint">
        <ShieldAlert className="size-3.5 text-gold-dark" />
        المحادثات مراقبة لحماية الطرفين — يُمنع تبادل أرقام التواصل
      </p>

      <div className="rounded-2xl bg-page ring-1 ring-line transition-all focus-within:bg-white focus-within:ring-2 focus-within:ring-primary">
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={4}
          placeholder="أكتب سؤالك للعارض هنا"
          className="w-full resize-none bg-transparent p-4 text-ink outline-none placeholder:text-faint"
        />
      </div>

      <div className="mt-3 flex items-center justify-between gap-3">
        <AnimatePresence>
          {sent && (
            <motion.p
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              role="status"
              className="flex items-center gap-1.5 text-sm font-bold text-green-dark"
            >
              <CheckCircle2 className="size-4" />
              وصل سؤالك للعارض
            </motion.p>
          )}
        </AnimatePresence>
        <button
          onClick={submit}
          disabled={!value.trim()}
          className="me-auto flex min-h-12 cursor-pointer items-center gap-2 rounded-2xl bg-gradient-to-l from-primary to-primary-dark px-7 py-3 font-extrabold text-white shadow-lift transition-all hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
        >
          إرسال
          <SendHorizontal className="size-4.5 -scale-x-100" />
        </button>
      </div>
    </section>
  );
}
