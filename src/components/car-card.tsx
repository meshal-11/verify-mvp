"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { BadgeCheck, ChevronLeft, Crosshair } from "lucide-react";
import type { SearchResultCard } from "@/lib/types";
import { formatPrice } from "@/lib/data";
import CarPlaceholder from "./car-placeholder";
import BadgeMawjaz from "./badge-mawjaz";

/**
 * بطاقة سيارة فاخرة — الشاشة 8
 * خطافات الثقة الثلاثة (موجز ✓ / مطابقة لبحثك / بائع موثوق) بخلفيات باهتة ملونة،
 * ارتفاع خفيف عند المرور مع تكبير بطيء للصورة
 */
export default function CarCard({ card }: { card: SearchResultCard }) {
  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 28 },
        show: {
          opacity: 1,
          y: 0,
          transition: { type: "spring", stiffness: 260, damping: 26 },
        },
      }}
    >
      <Link
        href={`/car/${card.listingId}`}
        className="group block overflow-hidden rounded-3xl bg-white shadow-soft ring-1 ring-line/60 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lift hover:ring-primary/30"
      >
        {/* الصورة + شارتا الثقة العلويتان */}
        <div className="relative aspect-[16/9] overflow-hidden">
          {card.image ? (
            <Image
              src={card.image}
              alt={card.title}
              fill
              sizes="(min-width: 640px) 50vw, 100vw"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
            />
          ) : (
            <CarPlaceholder
              variant={card.paletteIndex}
              className="size-full transition-transform duration-700 ease-out group-hover:scale-[1.06]"
            />
          )}
          {/* تدرج سفلي يمنح الصورة عمقاً */}
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/25 to-transparent"
          />

          {card.mawjaz && (
            <div className="absolute top-3 right-3 rounded-full bg-white/85 shadow-soft backdrop-blur-xl">
              <BadgeMawjaz compact />
            </div>
          )}

          {/* وسم المطابقة — يسرق العين */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-primary/90 px-3 py-1.5 text-[11px] font-extrabold text-white shadow-lift backdrop-blur-xl">
            <Crosshair className="size-3.5" strokeWidth={2.4} />
            مطابقة لبحثك {card.matchPercent}٪
          </div>
        </div>

        <div className="p-5">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-lg font-extrabold leading-snug text-ink transition-colors group-hover:text-primary-dark">
              {card.title}
            </h3>
            <span className="mt-1 grid size-7 shrink-0 place-items-center rounded-full bg-page text-faint transition-all group-hover:bg-primary group-hover:text-white group-hover:-translate-x-0.5">
              <ChevronLeft className="size-4" />
            </span>
          </div>

          <p className="mt-1.5 text-sm font-medium text-muted tabular-nums">
            {card.meta}
          </p>

          <div className="mt-4 flex flex-wrap items-end justify-between gap-3 border-t border-line/50 pt-4">
            {/* السعر — دائماً بالأخضر */}
            <p className="text-2xl font-black tracking-tight text-green tabular-nums">
              {formatPrice(card.price)}{" "}
              <span className="text-sm font-bold text-green-dark">ريال</span>
            </p>

            {/* بائع موثوق — خلفية باهتة من نفس اللون */}
            <span className="flex items-center gap-1.5 rounded-full bg-primary/8 px-3 py-1.5 text-xs font-extrabold text-primary-dark ring-1 ring-primary/15">
              <BadgeCheck className="size-3.5 text-primary" strokeWidth={2.2} />
              بائع موثوق · {card.trustScore}٪
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
