import type { Metadata } from "next";
import SiteHeader from "@/components/site-header";
import AssistantBuyer from "@/components/assistant-buyer";

export const metadata: Metadata = {
  title: "مساعد Verify — Verify",
};

/** الشاشة 18 — مساعد المشتري: توصيات ببطاقات سيارات + تعليل واضح */
export default function AssistantPage() {
  return (
    <div className="min-h-dvh">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-6">
        <AssistantBuyer />
      </main>
    </div>
  );
}
