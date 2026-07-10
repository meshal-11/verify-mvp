"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  BrainCircuit,
  Clock3,
  LoaderCircle,
  Search,
  Sparkles,
  WandSparkles,
} from "lucide-react";
import { parseQuery, type ParsedFilter } from "@/lib/search-parser";
import FilterChips from "./filter-chips";

const EXAMPLE_QUERIES = [
  "لاندكروزر 2021 نظيف من الحوادث القوية وسعره تحت 160 ألف",
  "كامري هايبرد أقل من 90 ألف",
  "جيب مخزن ما مشى 50 ألف",
  "بيك أب دبل نظيف بالرياض",
];

const TRY_ALSO = EXAMPLE_QUERIES.slice(1);

const RECENT_SEARCHES = ["تاهو 2020 حدود 130", "لكزس LX570 فحص كامل"];

/** الشاشة 7 — البحث الذكي: النظام يفهم القصد ويستخرج المرشحات أمام العين */
export default function SmartSearch({ initialQuery = "" }: { initialQuery?: string }) {
  const router = useRouter();
  const reduce = useReducedMotion();
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const [value, setValue] = useState(initialQuery);
  const [filters, setFilters] = useState<ParsedFilter[]>(() =>
    initialQuery ? parseQuery(initialQuery) : []
  );
  const [analyzing, setAnalyzing] = useState(false);
  const [searching, setSearching] = useState(false);

  // ===== التحليل الحي (Debounce يحاكي تفكير النموذج) =====
  const analyzeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const runAnalysis = useCallback(
    (text: string, instant = false) => {
      if (analyzeTimer.current) clearTimeout(analyzeTimer.current);
      if (!text.trim()) {
        setAnalyzing(false);
        setFilters([]);
        return;
      }
      setAnalyzing(true);
      analyzeTimer.current = setTimeout(
        () => {
          setFilters(parseQuery(text));
          setAnalyzing(false);
        },
        instant || reduce ? 120 : 520
      );
    },
    [reduce]
  );

  const onChange = (text: string) => {
    setValue(text);
    runAnalysis(text);
  };

  // ===== Placeholder حي بتأثير الكتابة =====
  const [ph, setPh] = useState(reduce ? EXAMPLE_QUERIES[0] : "");
  useEffect(() => {
    if (reduce || value) return;
    let example = 0;
    let char = 0;
    let deleting = false;
    let t: ReturnType<typeof setTimeout>;

    const tick = () => {
      const full = EXAMPLE_QUERIES[example];
      if (!deleting) {
        char++;
        setPh(full.slice(0, char));
        if (char === full.length) {
          deleting = true;
          t = setTimeout(tick, 2000);
          return;
        }
        t = setTimeout(tick, 55);
      } else {
        char -= 3;
        setPh(full.slice(0, Math.max(0, char)));
        if (char <= 0) {
          deleting = false;
          char = 0;
          example = (example + 1) % EXAMPLE_QUERIES.length;
          t = setTimeout(tick, 500);
          return;
        }
        t = setTimeout(tick, 22);
      }
    };
    t = setTimeout(tick, 600);
    return () => clearTimeout(t);
  }, [reduce, value]);

  // ===== ملء اقتراح حرفاً حرفاً (يشعر المستخدم أن النظام يكتب معه) =====
  const typeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const typeSuggestion = (text: string) => {
    if (typeTimer.current) clearTimeout(typeTimer.current);
    inputRef.current?.focus();
    if (reduce) {
      setValue(text);
      runAnalysis(text, true);
      return;
    }
    let i = 0;
    const step = () => {
      i += 2;
      const part = text.slice(0, i);
      setValue(part);
      if (i < text.length) {
        typeTimer.current = setTimeout(step, 24);
      } else {
        runAnalysis(text, true);
      }
    };
    step();
  };

  // ===== الانتقال لشاشة النتائج (8) =====
  const submit = () => {
    if (!value.trim() || searching) return;
    setSearching(true);
    // مهلة قصيرة لتشغيل حركة الخروج قبل الانتقال
    setTimeout(
      () => router.push(`/search/results?q=${encodeURIComponent(value.trim())}`),
      reduce ? 0 : 420
    );
  };

  const hasFilters = filters.length > 0;

  return (
    <motion.div
      animate={searching ? { opacity: 0, y: -24, scale: 0.98 } : { opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className="mx-auto w-full max-w-2xl"
    >
      {/* صندوق البحث */}
      <div className="relative rounded-3xl">
        {/* هالة الـ AI — تظهر فقط أثناء التحليل */}
        <AnimatePresence>
          {analyzing && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="ai-ring"
              aria-hidden
            />
          )}
        </AnimatePresence>

        <motion.div
          animate={
            analyzing && !reduce
              ? { boxShadow: "0 18px 50px rgba(46,108,178,0.22)" }
              : { boxShadow: "0 8px 30px rgba(26,26,26,0.06)" }
          }
          className="relative overflow-hidden rounded-3xl bg-white/90 ring-1 ring-line/70 backdrop-blur-xl"
        >
          <div className="flex items-start gap-3 p-5">
            {/* أيقونة الحالة: ساكنة → نابضة أثناء التحليل */}
            <motion.span
              animate={
                analyzing && !reduce
                  ? { scale: [1, 1.18, 1], rotate: [0, 8, -8, 0] }
                  : { scale: 1, rotate: 0 }
              }
              transition={
                analyzing ? { duration: 1.1, repeat: Infinity, ease: "easeInOut" } : {}
              }
              className={`mt-0.5 grid size-10 shrink-0 place-items-center rounded-xl transition-colors duration-300 ${
                analyzing
                  ? "bg-primary text-white"
                  : hasFilters
                    ? "bg-green-tint text-green-dark"
                    : "bg-primary/8 text-primary"
              }`}
            >
              <Sparkles className="size-5" />
            </motion.span>

            <div className="relative min-h-16 flex-1">
              <textarea
                ref={inputRef}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    submit();
                  }
                }}
                rows={2}
                aria-label="ابحث بلغتك الطبيعية"
                className="w-full resize-none bg-transparent text-lg font-medium leading-relaxed text-ink outline-none"
              />
              {/* الـ placeholder الحي */}
              {!value && (
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 text-lg font-medium leading-relaxed text-faint"
                >
                  {ph}
                  {!reduce && <span className="type-caret text-primary">|</span>}
                </div>
              )}
            </div>
          </div>

          {/* شريط الحالة + زر البحث */}
          <div className="flex items-center justify-between gap-3 border-t border-line/60 bg-page/60 px-5 py-3">
            <div className="flex min-w-0 items-center gap-2 text-xs font-bold">
              <AnimatePresence mode="wait">
                {analyzing ? (
                  <motion.span
                    key="analyzing"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="flex items-center gap-1.5 text-primary"
                  >
                    <BrainCircuit className="size-4 animate-pulse" />
                    Verify يحلل جملتك…
                  </motion.span>
                ) : hasFilters ? (
                  <motion.span
                    key="done"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="flex items-center gap-1.5 text-green-dark"
                  >
                    <WandSparkles className="size-4" />
                    فهمنا قصدك — راجع المرشحات تحت
                  </motion.span>
                ) : (
                  <motion.span
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-faint"
                  >
                    اكتب وش تبي مثل ما تقوله بالضبط
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={submit}
              disabled={!value.trim() || searching}
              className="flex min-h-11 shrink-0 cursor-pointer items-center gap-2 rounded-xl bg-gradient-to-l from-primary to-primary-dark px-6 py-2.5 font-extrabold text-white shadow-lift transition-all hover:brightness-110 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {searching ? (
                <LoaderCircle className="size-4.5 animate-spin" />
              ) : (
                <Search className="size-4.5" />
              )}
              ابحث
            </button>
          </div>
        </motion.div>
      </div>

      {/* فهمنا من بحثك */}
      <AnimatePresence>
        {hasFilters && (
          <motion.section
            aria-label="فهمنا من بحثك"
            initial={{ opacity: 0, y: 20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: 12, height: 0 }}
            transition={{ duration: 0.45, ease: [0.21, 0.62, 0.35, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-4 rounded-3xl bg-white/70 p-5 ring-1 ring-line/60 backdrop-blur-xl">
              <h2 className="mb-3.5 flex items-center gap-2 text-sm font-extrabold text-primary-dark">
                <span className="grid size-6 place-items-center rounded-full bg-primary/10">
                  <WandSparkles className="size-3.5 text-primary" />
                </span>
                فهمنا من بحثك
              </h2>
              <FilterChips filters={filters} />
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* جرّب أيضاً */}
      <div className="mt-8">
        <h3 className="mb-3 text-sm font-bold text-muted">جرّب أيضاً</h3>
        <div className="flex flex-wrap gap-2">
          {TRY_ALSO.map((s, i) => (
            <motion.button
              key={s}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 + i * 0.08, duration: 0.4 }}
              onClick={() => typeSuggestion(s)}
              className="cursor-pointer rounded-full bg-white px-4 py-2.5 text-sm font-bold text-primary-dark shadow-soft ring-1 ring-line/60 transition-all hover:-translate-y-0.5 hover:shadow-lift hover:ring-primary/40 active:scale-95"
            >
              {s}
            </motion.button>
          ))}
        </div>
      </div>

      {/* عمليات بحث سابقة */}
      <div className="mt-7">
        <h3 className="mb-3 text-sm font-bold text-muted">عمليات بحث سابقة</h3>
        <ul className="space-y-1">
          {RECENT_SEARCHES.map((s, i) => (
            <motion.li
              key={s}
              initial={{ opacity: 0, x: 14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.55 + i * 0.08, duration: 0.4 }}
            >
              <button
                onClick={() => typeSuggestion(s)}
                className="flex w-full cursor-pointer items-center gap-3 rounded-2xl px-3 py-2.5 text-start font-medium text-muted transition-colors hover:bg-white hover:text-ink"
              >
                <Clock3 className="size-4 shrink-0 text-faint" />
                {s}
              </button>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
