import type { Metadata } from "next";
import SiteHeader from "@/components/site-header";
import SellerChat from "@/components/seller-chat";

export const metadata: Metadata = {
  title: "المحادثة — أبو فهد | Verify",
};

/** الشاشة 5 — المحادثة + السوم الآلي: النظام يرصد السومة ويحظر التواصل الخارجي */
export default function SellerChatPage() {
  return (
    <div className="min-h-dvh">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-6">
        <SellerChat />
      </main>
    </div>
  );
}
