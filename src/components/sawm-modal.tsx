"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Gavel, ShieldAlert, X } from "lucide-react";
import { formatPrice } from "@/lib/data";

/** نافذة السوم — النظام يرصد السومة ويحدّث الإعلان تلقائياً */
export default function SawmModal({
  open,
  onClose,
  price,
  topBid,
}: {
  open: boolean;
  onClose: () => void;
  price: number;
  topBid: number | null;
}) {
  const base = topBid ?? Math.round(price * 0.95);
  const suggestions = [base + 1000, base + 2500, base + 5000];
  const [amount, setAmount] = useState<number | "">("");
  const [sent, setSent] = useState(false);

  const close = () => {
    onClose();
    setTimeout(() => setSent(false), 300);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] grid place-items-end bg-primary-deep/50 backdrop-blur-sm sm:place-items-center"
          onClick={close}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="قدّم سومتك"
            initial={{ y: 80, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 60, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full rounded-t-3xl bg-white p-6 shadow-lift sm:max-w-md sm:rounded-3xl sm:p-8"
          >
            {sent ? (
              <div className="py-6 text-center">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 18 }}
                  className="mx-auto mb-4 grid size-16 place-items-center rounded-full bg-green-tint text-green"
                >
                  <CheckCircle2 className="size-9" />
                </motion.div>
                <h3 className="text-xl font-black text-ink">وصلت سومتك للبائع</h3>
                <p className="mt-1.5 text-sm font-medium text-muted">
                  رصد النظام سومتك — إذا قبلها البائع تُحدَّث «أعلى سومة» في
                  الإعلان تلقائياً
                </p>
                <button
                  onClick={close}
                  className="mt-6 min-h-11 w-full cursor-pointer rounded-2xl bg-primary py-3 font-bold text-white transition-transform hover:scale-[1.015] active:scale-[0.98]"
                >
                  تمام
                </button>
              </div>
            ) : (
              <>
                <div className="mb-5 flex items-start justify-between">
                  <div className="grid size-14 place-items-center rounded-2xl bg-primary/10 text-primary">
                    <Gavel className="size-7" />
                  </div>
                  <button
                    aria-label="إغلاق"
                    onClick={close}
                    className="grid size-11 cursor-pointer place-items-center rounded-full text-muted transition-colors hover:bg-page"
                  >
                    <X className="size-5" />
                  </button>
                </div>

                <h3 className="text-2xl font-black text-ink">قدّم سومتك</h3>
                <p className="mt-1 font-medium text-muted">
                  أعلى سومة حالياً{" "}
                  <span className="font-extrabold text-green-dark tabular-nums">
                    {topBid ? formatPrice(topBid) : "—"} ريال
                  </span>
                </p>

                <div className="mt-5 flex gap-2">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => setAmount(s)}
                      className={`min-h-11 flex-1 cursor-pointer rounded-xl py-2.5 text-sm font-bold tabular-nums ring-1 transition-all ${
                        amount === s
                          ? "bg-primary text-white ring-primary"
                          : "bg-page text-ink ring-line hover:ring-primary/50"
                      }`}
                    >
                      {formatPrice(s)}
                    </button>
                  ))}
                </div>

                <label className="mt-4 block">
                  <span className="mb-1.5 block text-sm font-bold text-ink">
                    أو اكتب مبلغاً آخر
                  </span>
                  <div className="flex items-center gap-2 rounded-2xl bg-page px-4 ring-1 ring-line transition-all focus-within:bg-white focus-within:ring-2 focus-within:ring-primary">
                    <input
                      type="number"
                      inputMode="numeric"
                      value={amount}
                      onChange={(e) =>
                        setAmount(e.target.value === "" ? "" : +e.target.value)
                      }
                      placeholder="150,000"
                      className="min-h-12 w-full bg-transparent font-bold text-ink outline-none tabular-nums placeholder:text-faint"
                    />
                    <span className="shrink-0 text-sm font-bold text-muted">ريال</span>
                  </div>
                </label>

                <button
                  disabled={amount === "" || amount <= 0}
                  onClick={() => setSent(true)}
                  className="mt-5 min-h-12 w-full cursor-pointer rounded-2xl bg-gradient-to-l from-primary to-primary-dark py-3.5 text-lg font-extrabold text-white shadow-lift transition-transform hover:scale-[1.015] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  أرسل السومة
                </button>

                <p className="mt-3 flex items-center justify-center gap-1.5 text-xs font-medium text-faint">
                  <ShieldAlert className="size-3.5 text-gold-dark" />
                  السوم داخل المنصة فقط — أي اتفاق خارجها يُسقط الحماية
                </p>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
