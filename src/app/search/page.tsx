import type { Metadata } from "next";
import { Sparkles } from "lucide-react";
import SiteHeader from "@/components/site-header";
import SmartSearch from "@/components/smart-search";
import Reveal from "@/components/reveal";

export const metadata: Metadata = {
  title: "البحث الذكي — Verify",
  description: "اكتب وش تبي مثل ما تقوله بالضبط — Verify يفهمك",
};

/** الشاشة 7 — البحث الذكي: بحث بلغة طبيعية، النظام يفهم القصد */
export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  return (
    <div className="relative min-h-dvh overflow-hidden">
      {/* خلفية زخرفية هادئة */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -top-32 right-1/4 size-[480px] rounded-full bg-primary/6 blur-3xl" />
        <div className="absolute top-40 -left-24 size-[380px] rounded-full bg-gold/8 blur-3xl" />
        <div className="absolute bottom-0 right-0 size-[320px] rounded-full bg-green/5 blur-3xl" />
      </div>

      <SiteHeader />

      <main className="mx-auto max-w-7xl px-4 pb-20">
        <div className="mx-auto max-w-2xl pt-14 text-center sm:pt-20">
          <Reveal>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-tint px-4 py-1.5 text-sm font-bold text-gold-deep ring-1 ring-gold/30">
              <Sparkles className="size-4" />
              Verify — بحث يفهمك
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-5 text-4xl font-black tracking-tight text-ink sm:text-5xl">
              ابحث بلغتك الطبيعية
            </h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mx-auto mt-4 max-w-md text-lg font-medium leading-relaxed text-muted">
              اكتب وش تبي مثل ما تقوله بالضبط —{" "}
              <span className="font-extrabold text-primary">Verify يفهمك</span>
            </p>
          </Reveal>
        </div>

        <div className="mt-10">
          <SmartSearch initialQuery={q} />
        </div>
      </main>
    </div>
  );
}
