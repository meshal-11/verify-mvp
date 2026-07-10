import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, SlidersHorizontal, Sparkles } from "lucide-react";
import { parseQuery } from "@/lib/search-parser";
import {
  DEFAULT_SEARCH_FILTERS,
  getSearchResults,
  SEARCH_RESULTS_TOTAL,
} from "@/lib/data";
import SiteHeader from "@/components/site-header";
import ResultsList from "@/components/results-list";
import Reveal from "@/components/reveal";

export const metadata: Metadata = {
  title: "نتائج البحث — Verify",
};

/**
 * الشاشة 8 — نتائج البحث
 * شارة موجز + وسم المطابقة + مؤشر ثقة البائع (هيكل النموذج الأولي حرفياً)
 */
export default async function SearchResultsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;

  // شريط الفهم الذكي: من الاستعلام إن وُجد، وإلا مرشحات النموذج الأولي
  const parsed = parseQuery(q).map((f) => f.value);
  const chips = parsed.length > 0 ? parsed : DEFAULT_SEARCH_FILTERS;

  const cards = await getSearchResults(q);
  // عدّاد النتائج: فعلي عند التصفية بالاستعلام، وإلا إجمالي النموذج الأولي
  const resultsCount = q.trim() ? cards.length : SEARCH_RESULTS_TOTAL;

  return (
    <div className="min-h-dvh">
      <SiteHeader />

      <main className="mx-auto max-w-7xl px-4 pb-20">
        {/* العنوان */}
        <Reveal>
          <div className="flex items-center gap-3 py-5">
            <Link
              href={q ? `/search?q=${encodeURIComponent(q)}` : "/search"}
              aria-label="عودة للبحث"
              className="grid size-10 shrink-0 place-items-center rounded-full bg-white text-primary shadow-soft ring-1 ring-line/60 transition-all hover:shadow-lift hover:-translate-x-0.5"
            >
              <ArrowRight className="size-4.5" />
            </Link>
            <h1 className="text-2xl font-black text-ink sm:text-3xl">
              نتائج البحث
            </h1>
          </div>
        </Reveal>

        <div className="mx-auto max-w-4xl">
          {/* شريط الفهم الذكي — المرشحات + تعديل */}
          <Reveal delay={0.05}>
            <div className="flex flex-wrap items-center gap-2 rounded-3xl bg-white/70 p-4 ring-1 ring-line/60 backdrop-blur-xl">
              <span
                aria-hidden
                className="grid size-8 shrink-0 place-items-center rounded-full bg-primary/10 text-primary"
              >
                <Sparkles className="size-4" />
              </span>
              {chips.map((chip) => (
                <span
                  key={chip}
                  className="rounded-full bg-primary/8 px-3.5 py-1.5 text-sm font-bold text-primary-dark ring-1 ring-primary/15 tabular-nums"
                >
                  {chip}
                </span>
              ))}
              <Link
                href={q ? `/search?q=${encodeURIComponent(q)}` : "/search"}
                className="me-auto flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-bold text-muted ring-1 ring-line transition-all hover:text-primary hover:ring-primary/40"
              >
                <SlidersHorizontal className="size-3.5" />
                تعديل
              </Link>
            </div>
          </Reveal>

          {/* عدّاد النتائج */}
          <Reveal delay={0.1}>
            <p className="mt-5 mb-4 text-sm font-bold text-muted">
              <span className="text-ink tabular-nums">{resultsCount} نتائج</span>{" "}
              — مرتبة حسب الأنسب لبحثك
            </p>
          </Reveal>

          {/* البطاقات */}
          <ResultsList cards={cards} />
        </div>
      </main>
    </div>
  );
}
