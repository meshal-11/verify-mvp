import type { Metadata } from "next";
import SiteHeader from "@/components/site-header";
import SellReview from "@/components/sell-review";

export const metadata: Metadata = {
  title: "راجع بيانات إعلانك — Verify",
};

/** الشاشة 3 — مراجعة الاقتراحات: حقول معبأة تلقائياً + شارة موجز + نطاق سعر */
export default function SellReviewPage() {
  return (
    <div className="min-h-dvh">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-8 pb-20">
        <SellReview />
      </main>
    </div>
  );
}
