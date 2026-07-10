import type { Metadata } from "next";
import SiteHeader from "@/components/site-header";
import SellPhotos from "@/components/sell-photos";

export const metadata: Metadata = {
  title: "أضف عرض — سيارات | Verify",
};

/** الشاشة 2 — النشر الذكي: رفع الصور — الذكاء الاصطناعي يتعرّف على السيارة */
export default function SellPage() {
  return (
    <div className="min-h-dvh">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-8 pb-20">
        <SellPhotos />
      </main>
    </div>
  );
}
