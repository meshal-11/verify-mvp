import type { Metadata } from "next";
import SiteHeader from "@/components/site-header";
import InspectionRequests from "@/components/inspection-requests";

export const metadata: Metadata = {
  title: "طلبات الفحص — Verify",
};

/** الشاشة 6 — الموافقة على الفحص: طلب المشتري ← موافقة ← وسم «محجوز للفحص» */
export default function RequestsPage() {
  return (
    <div className="min-h-dvh">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-8 pb-20">
        <InspectionRequests />
      </main>
    </div>
  );
}
