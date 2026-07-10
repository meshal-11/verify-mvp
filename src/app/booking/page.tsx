import type { Metadata } from "next";
import SiteHeader from "@/components/site-header";
import BookingFlow from "@/components/booking-flow";

export const metadata: Metadata = {
  title: "حجز فحص معتمد — Verify",
};

/** الشاشة 12 — حجز الفحص + الدفع: اختيار المركز + Apple Pay */
export default function BookingPage() {
  return (
    <div className="min-h-dvh">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-8 pb-20">
        <BookingFlow />
      </main>
    </div>
  );
}
