"use client";

import { motion } from "framer-motion";
import { Bell, ChevronLeft } from "lucide-react";
import type { SimilarListing } from "@/lib/types";
import { formatPrice } from "@/lib/data";
import CarPlaceholder from "./car-placeholder";
import BadgeMawjaz from "./badge-mawjaz";

/** العمود الجانبي المألوف: متابعة العروض المشابهة + عروض مشابهة */
export default function SimilarListings({ items }: { items: SimilarListing[] }) {
  return (
    <aside className="space-y-4">
      {/* متابعة العروض المشابهة */}
      <button className="flex min-h-13 w-full cursor-pointer items-center justify-center gap-2.5 rounded-3xl bg-white font-bold text-primary shadow-soft ring-1 ring-line/60 transition-all hover:shadow-lift hover:ring-primary/40">
        <Bell className="size-4.5" />
        متابعة العروض المشابهة
      </button>

      <div className="rounded-3xl bg-white p-5 shadow-soft ring-1 ring-line/60">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-ink">عروض مشابهة</h2>
          <span className="rounded-full bg-page px-3 py-1 text-xs font-bold text-muted">
            لاندكروزر في الرياض
          </span>
        </div>

        <div className="space-y-3">
          {items.map((item, i) => (
            <motion.a
              key={item.id}
              href="#"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: i * 0.06, ease: "easeOut" }}
              whileHover={{ y: -2 }}
              className="group flex gap-3 rounded-2xl p-2 ring-1 ring-transparent transition-all hover:bg-page/70 hover:ring-line/70"
            >
              <div className="relative aspect-[4/3] w-28 shrink-0 overflow-hidden rounded-xl ring-1 ring-line/60">
                <CarPlaceholder
                  variant={item.paletteIndex}
                  className="size-full transition-transform duration-500 group-hover:scale-[1.06]"
                />
                {item.mawjaz && (
                  <span className="absolute top-1.5 right-1.5 rounded-full bg-white/85 backdrop-blur">
                    <BadgeMawjaz compact />
                  </span>
                )}
              </div>
              <div className="min-w-0 py-1">
                <p className="truncate font-bold text-ink">{item.title}</p>
                <p className="mt-0.5 truncate text-xs font-medium text-muted">
                  {item.meta}
                </p>
                <p className="mt-1.5 font-extrabold text-green-dark tabular-nums">
                  {formatPrice(item.price)}{" "}
                  <span className="text-xs font-bold">ريال</span>
                </p>
              </div>
            </motion.a>
          ))}
        </div>

        <a
          href="#"
          className="mt-4 flex items-center justify-center gap-1 rounded-2xl py-2.5 text-sm font-bold text-primary transition-colors hover:bg-primary/5"
        >
          عرض المزيد
          <ChevronLeft className="size-4" />
        </a>
      </div>
    </aside>
  );
}
