"use client";

import { motion, useReducedMotion } from "framer-motion";
import { TrendingUp, Users } from "lucide-react";
import { formatPrice } from "@/lib/data";

/** بطاقة السعر + أعلى سومة — السعر دائماً بالأخضر (هوية حراج) */
export default function PriceCard({
  price,
  negotiable,
  topBid,
  interestedBuyers,
}: {
  price: number;
  negotiable: boolean;
  topBid: number | null;
  interestedBuyers: number;
}) {
  const reduce = useReducedMotion();

  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-soft ring-1 ring-line/60">
      <div className="flex flex-wrap items-center justify-between gap-4 p-6">
        {/* السعر */}
        <div>
          <p className="mb-1 text-sm font-medium text-muted">السعر المطلوب</p>
          <div className="flex items-baseline gap-2">
            <motion.span
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-4xl font-black tracking-tight text-green tabular-nums"
            >
              {formatPrice(price)}
            </motion.span>
            <span className="text-lg font-bold text-green-dark">ريال</span>
          </div>
        </div>

        {negotiable && (
          <span className="rounded-full bg-green-tint px-4 py-2 text-sm font-bold text-green-dark ring-1 ring-green/20">
            قابل للسوم
          </span>
        )}
      </div>

      {/* أعلى سومة — شريط حي */}
      {topBid !== null && (
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line/60 bg-page/70 px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="live-dot grid size-2.5 shrink-0 place-items-center rounded-full bg-green" />
            <div>
              <p className="text-xs font-medium text-muted">أعلى سومة حتى الآن</p>
              <p className="text-xl font-extrabold text-ink tabular-nums">
                {formatPrice(topBid)}{" "}
                <span className="text-sm font-bold text-muted">ريال</span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-xs font-bold text-primary-dark shadow-soft ring-1 ring-line/60">
            <Users className="size-3.5" />
            {interestedBuyers} مشترين مهتمون بهذا الإعلان
            <TrendingUp className="size-3.5 text-green" />
          </div>
        </div>
      )}
    </div>
  );
}
