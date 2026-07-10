import type { Metadata } from "next";
import SiteHeader from "@/components/site-header";
import DealClosing from "@/components/deal-closing";

export const metadata: Metadata = {
  title: "إغلاق الصفقة — Verify",
};

/** الشاشة 16 — عربون الإغلاق + العمولة (الشاشة المحورية) */
export default function ClosingPage() {
  return (
    <div className="min-h-dvh">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-8 pb-20">
        <DealClosing />
      </main>
    </div>
  );
}
