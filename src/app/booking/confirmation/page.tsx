import type { Metadata } from "next";
import SiteHeader from "@/components/site-header";
import BookingConfirmation from "@/components/booking-confirmation";

export const metadata: Metadata = {
  title: "تم حجز الفحص — Verify",
};

/** الشاشة 13 — تأكيد الحجز: كود HRJ-4821 + خريطة مصغّرة */
export default function BookingConfirmationPage() {
  return (
    <div className="min-h-dvh">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-8 pb-20">
        <BookingConfirmation />
      </main>
    </div>
  );
}
