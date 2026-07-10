"use client";

import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FileSearch, MapPin, ShieldCheck, Sparkles, Wallet, X } from "lucide-react";

/** نصوص الشاشة 11 حرفياً — لا تعديل */
const PERKS = [
  { icon: MapPin, text: "فحص 140 نقطة في مركز معتمد قريب منك" },
  { icon: FileSearch, text: "تقرير ذكي واضح يقارن النتيجة بوصف البائع" },
  { icon: Wallet, text: "150 ريالاً فقط — أرخص بكثير من عيب مخفي" },
];

/**
 * خطاف الثقة (الشاشة 11) — Bottom Sheet فوق المحادثة
 * لحظة التحويل الأهم: من شوفة مجانية إلى فحص مدفوع
 */
export default function InspectionModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const reduce = useReducedMotion();
  const router = useRouter();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[100] grid place-items-end bg-primary-deep/55 backdrop-blur-md sm:place-items-center"
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="احمِ نفسك من العيوب الخفية"
            initial={{ y: reduce ? 0 : 120, opacity: 0, scale: reduce ? 1 : 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: reduce ? 0 : 80, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30, mass: 0.9 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full rounded-t-3xl bg-white p-6 shadow-lift sm:max-w-lg sm:rounded-3xl sm:p-8"
          >
            {/* مقبض السحب (جوال) */}
            <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-line sm:hidden" />

            <div className="mb-5 flex items-start justify-between">
              <motion.div
                initial={reduce ? false : { scale: 0.6, rotate: -12 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.15 }}
                className="grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-gold to-gold-dark text-white shadow-gold"
              >
                <ShieldCheck className="size-7" />
              </motion.div>
              <button
                aria-label="إغلاق"
                onClick={onClose}
                className="grid size-11 cursor-pointer place-items-center rounded-full text-muted transition-colors hover:bg-page"
              >
                <X className="size-5" />
              </button>
            </div>

            <h3 className="text-2xl font-black text-ink">
              احمِ نفسك من العيوب الخفية
            </h3>
            <p className="mt-1 text-sm font-bold text-gold-deep">
              المكينة · الشاصيه — ما لا تكشفه الشوفة بالعين
            </p>
            <p className="mt-3 font-medium leading-relaxed text-muted">
              شفتها وعجبتك؟ خلّ مختصاً يفحص ما تحت البودي قبل ما تدفع قيمتها
              كاملة.
            </p>

            <ul className="mt-6 space-y-3">
              {PERKS.map((perk, i) => (
                <motion.li
                  key={perk.text}
                  initial={reduce ? false : { opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.09, duration: 0.4, ease: "easeOut" }}
                  className="flex items-center gap-3.5 rounded-2xl bg-page/80 p-4 ring-1 ring-line/60"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white text-primary shadow-soft">
                    <perk.icon className="size-5" strokeWidth={1.9} />
                  </span>
                  <p className="font-bold text-ink">{perk.text}</p>
                </motion.li>
              ))}
            </ul>

            <div className="mt-6 flex flex-col gap-2.5">
              {/* أهم CTA في التطبيق — نبض ذهبي فاخر */}
              <motion.button
                onClick={() => router.push("/booking")}
                animate={
                  reduce
                    ? {}
                    : {
                        boxShadow: [
                          "0 10px 30px rgba(201, 143, 47, 0.35)",
                          "0 12px 42px rgba(201, 143, 47, 0.55)",
                          "0 10px 30px rgba(201, 143, 47, 0.35)",
                        ],
                      }
                }
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ scale: 1.025 }}
                whileTap={{ scale: 0.975 }}
                className="gold-shine relative flex min-h-13 cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-l from-gold to-gold-dark px-6 py-3.5 text-lg font-black text-[#3d2e12]"
              >
                <Sparkles className="size-5" />
                احجز فحص Verify الآن
              </motion.button>
              <button
                onClick={onClose}
                className="min-h-11 cursor-pointer rounded-2xl py-2.5 font-bold text-muted transition-colors hover:bg-page hover:text-ink"
              >
                لاحقاً
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
