import type { Metadata } from "next";
import SiteHeader from "@/components/site-header";
import DealSuccess from "@/components/deal-success";

export const metadata: Metadata = {
  title: "تم إغلاق الصفقة — Verify",
};

/** الشاشة 17 — النجاح + التسليم: إغلاق الصفقة + أبشر + محفظة البائع */
export default function SuccessPage() {
  return (
    <div className="min-h-dvh">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-8 pb-20">
        <DealSuccess />
      </main>
    </div>
  );
}
