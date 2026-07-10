import type { Metadata } from "next";
import SiteHeader from "@/components/site-header";
import InspectionReport from "@/components/inspection-report";

export const metadata: Metadata = {
  title: "تقرير الفحص — Verify",
};

/** الشاشة 15 — التقرير الذكي: نتيجة خضراء «سليمة ومطابقة» + سؤال الحسم */
export default function ReportPage() {
  return (
    <div className="min-h-dvh">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-8 pb-20">
        <InspectionReport />
      </main>
    </div>
  );
}
