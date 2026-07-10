import type { Metadata } from "next";
import SiteHeader from "@/components/site-header";
import MyAd from "@/components/my-ad";

export const metadata: Metadata = {
  title: "إعلانك — Verify",
};

/** الشاشة 4 — الإعلان بعد النشر (عرض البائع): مشاهدات + خانة أعلى سومة فارغة */
export default function MyAdPage() {
  return (
    <div className="min-h-dvh">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-8 pb-20">
        <MyAd />
      </main>
    </div>
  );
}
