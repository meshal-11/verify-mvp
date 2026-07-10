import type { Metadata } from "next";
import SiteHeader from "@/components/site-header";
import CenterMode from "@/components/center-mode";

export const metadata: Metadata = {
  title: "وضع المركز — Verify",
};

/** الشاشة 14 — في المركز: بطاقة الكود الكبيرة + حالة الفحص الجاري */
export default function CenterPage() {
  return (
    <div className="min-h-dvh">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-8 pb-20">
        <CenterMode />
      </main>
    </div>
  );
}
