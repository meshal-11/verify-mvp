import type { Metadata } from "next";
import SiteHeader from "@/components/site-header";
import AssistantSeller from "@/components/assistant-seller";

export const metadata: Metadata = {
  title: "مساعد Verify — وضع البائع",
};

/** الشاشة 19 — مساعد البائع: تسعير متوقع + نصائح بيع أسرع */
export default function AssistantSellerPage() {
  return (
    <div className="min-h-dvh">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-6">
        <AssistantSeller />
      </main>
    </div>
  );
}
