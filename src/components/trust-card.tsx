"use client";

import { motion, useReducedMotion } from "framer-motion";
import { BadgeCheck, CalendarCheck, Handshake, MessageCircleReply } from "lucide-react";
import type { Seller } from "@/lib/types";

/** مؤشر ثقة البائع — حلقة تقدم متحركة تُبنى أمام العين */
export default function TrustCard({ seller }: { seller: Seller }) {
  const reduce = useReducedMotion();
  const r = 34;
  const c = 2 * Math.PI * r;
  const target = c * (1 - seller.trustScore / 100);

  return (
    <div className="rounded-3xl bg-white p-6 shadow-soft ring-1 ring-line/60">
      <div className="flex items-center gap-4">
        {/* حلقة الثقة */}
        <div className="relative grid size-24 shrink-0 place-items-center">
          <svg viewBox="0 0 84 84" className="size-24 -rotate-90">
            <circle cx="42" cy="42" r={r} fill="none" stroke="#eef1f5" strokeWidth="7" />
            <motion.circle
              cx="42"
              cy="42"
              r={r}
              fill="none"
              stroke="url(#trust-grad)"
              strokeWidth="7"
              strokeLinecap="round"
              strokeDasharray={c}
              initial={{ strokeDashoffset: reduce ? target : c }}
              whileInView={{ strokeDashoffset: target }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: [0.22, 0.8, 0.3, 1], delay: 0.2 }}
            />
            <defs>
              <linearGradient id="trust-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#34a853" />
                <stop offset="100%" stopColor="#2e6cb2" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute text-center">
            <span className="block text-2xl font-black text-ink tabular-nums">
              {seller.trustScore}٪
            </span>
          </div>
        </div>

        <div className="min-w-0">
          <p className="mb-0.5 flex items-center gap-1.5 text-xs font-bold text-primary">
            <BadgeCheck className="size-4" />
            مؤشر ثقة البائع
          </p>
          <p className="truncate text-lg font-extrabold text-ink">{seller.name}</p>
          <p className="text-sm font-medium text-muted">بائع موثوق</p>
        </div>
      </div>

      <ul className="mt-5 space-y-2.5 border-t border-line/60 pt-4 text-sm text-muted">
        <li className="flex items-center gap-2.5">
          <CalendarCheck className="size-4 shrink-0 text-primary" />
          عضو منذ {seller.memberSince}
        </li>
        <li className="flex items-center gap-2.5">
          <Handshake className="size-4 shrink-0 text-primary" />
          <span className="tabular-nums">{seller.completedDeals}</span> صفقة مكتملة
        </li>
        <li className="flex items-center gap-2.5">
          <MessageCircleReply className="size-4 shrink-0 text-primary" />
          {seller.responseNote}
        </li>
      </ul>
    </div>
  );
}
