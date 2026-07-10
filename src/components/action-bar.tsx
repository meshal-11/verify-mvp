"use client";

import { useState } from "react";
import Link from "next/link";
import { Gavel, MessageSquareText, Sparkles } from "lucide-react";
import InspectionModal from "./inspection-modal";
import SawmModal from "./sawm-modal";

/**
 * أزرار القرار الثلاثة (الشاشة 9): سوم / تواصل / اطلب فحص Verify
 * الذهبي محجوز لفعل Verify المحوري — يقود العين مباشرة إليه
 */
export default function ActionBar({
  price,
  topBid,
}: {
  price: number;
  topBid: number | null;
}) {
  const [inspectOpen, setInspectOpen] = useState(false);
  const [sawmOpen, setSawmOpen] = useState(false);

  const buttons = (
    <div className="grid grid-cols-[1fr_1fr_1.6fr] gap-3">
      <button
        onClick={() => setSawmOpen(true)}
        className="flex min-h-13 cursor-pointer items-center justify-center gap-2 rounded-2xl bg-white font-extrabold text-primary-dark shadow-soft ring-1 ring-primary/25 transition-all hover:bg-primary/5 hover:ring-primary/50 active:scale-[0.98]"
      >
        <Gavel className="size-5" />
        سوم
      </button>
      <Link
        href="/chat"
        className="flex min-h-13 cursor-pointer items-center justify-center gap-2 rounded-2xl bg-gradient-to-l from-primary to-primary-dark font-extrabold text-white shadow-lift transition-all hover:brightness-110 active:scale-[0.98]"
      >
        <MessageSquareText className="size-5" />
        تواصل
      </Link>
      <button
        onClick={() => setInspectOpen(true)}
        className="gold-shine relative flex min-h-13 cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-l from-gold to-gold-dark font-black text-[#3d2e12] shadow-gold transition-all hover:scale-[1.02] active:scale-[0.98]"
      >
        <Sparkles className="size-5" />
        اطلب فحص Verify
      </button>
    </div>
  );

  return (
    <>
      {/* داخل الصفحة */}
      <div className="hidden md:block">{buttons}</div>

      {/* شريط سفلي زجاجي ثابت للجوال */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line/60 bg-white/80 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-xl md:hidden">
        {buttons}
      </div>

      <InspectionModal open={inspectOpen} onClose={() => setInspectOpen(false)} />
      <SawmModal
        open={sawmOpen}
        onClose={() => setSawmOpen(false)}
        price={price}
        topBid={topBid}
      />
    </>
  );
}
