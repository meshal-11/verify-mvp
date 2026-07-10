import type { Metadata } from "next";
import SiteHeader from "@/components/site-header";
import ChatThread from "@/components/chat-thread";

export const metadata: Metadata = {
  title: "المحادثة — Verify",
};

/** الشاشة 10 — المحادثة + الشوفة الحرة (معاينة مجانية متفق عليها داخل المحادثة) */
export default function ChatPage() {
  return (
    <div className="min-h-dvh">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-6">
        <ChatThread />
      </main>
    </div>
  );
}
