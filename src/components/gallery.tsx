"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, ChevronLeft, Expand, Heart } from "lucide-react";
import BadgeMawjaz from "./badge-mawjaz";

const angles = [
  "الواجهة الأمامية",
  "الجانب الأيمن",
  "الخلفية",
  "المقصورة الداخلية",
  "لوحة العدادات",
  "المكينة",
];

/** معرض الصور — انتقالات ناعمة + شارات زجاجية فوق الصورة */
export default function Gallery({
  imageCount,
  mawjazLabel,
  image = "/landcruiser.jpeg",
  mawjaz = true,
}: {
  imageCount: number;
  mawjazLabel: string;
  /** صورة الإعلان الحقيقية — تُكرَّر لكل الزوايا إلى حين ربط صور متعددة عبر Supabase */
  image?: string;
  /** هل اجتاز الإعلان فحص موجز — تُخفى الشارة إن لم يجتز */
  mawjaz?: boolean;
}) {
  const [index, setIndex] = useState(0);
  const [liked, setLiked] = useState(false);
  const count = Math.min(imageCount, angles.length);
  const images = Array.from({ length: count }, () => image);

  const go = (dir: 1 | -1) =>
    setIndex((i) => (i + dir + count) % count);

  return (
    <div className="select-none">
      {/* الصورة الرئيسية */}
      <div className="group relative aspect-[16/9] overflow-hidden rounded-3xl bg-primary-deep shadow-soft ring-1 ring-line/60">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image
              src={images[index]}
              alt={angles[index]}
              fill
              priority={index === 0}
              sizes="(min-width: 1024px) 66vw, 100vw"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* شارة موجز — زجاجية فوق الصورة (تظهر فقط للإعلانات المجتازة) */}
        {mawjaz && (
          <div className="absolute top-4 right-4 rounded-full bg-white/80 shadow-soft backdrop-blur-xl">
            <BadgeMawjaz label={mawjazLabel} />
          </div>
        )}

        {/* مفضلة + توسيع */}
        <div className="absolute top-4 left-4 flex gap-2">
          <button
            aria-label="أضف إلى المفضلة"
            onClick={() => setLiked((v) => !v)}
            className="grid size-11 cursor-pointer place-items-center rounded-full bg-white/80 text-ink shadow-soft backdrop-blur-xl transition-transform hover:scale-105 active:scale-95"
          >
            <motion.span
              key={liked ? "on" : "off"}
              initial={{ scale: 0.6 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              <Heart
                className={`size-5 ${liked ? "fill-red-500 text-red-500" : "text-muted"}`}
              />
            </motion.span>
          </button>
          <button
            aria-label="عرض بملء الشاشة"
            className="grid size-11 cursor-pointer place-items-center rounded-full bg-white/80 text-muted shadow-soft backdrop-blur-xl transition-transform hover:scale-105 active:scale-95"
          >
            <Expand className="size-5" />
          </button>
        </div>

        {/* أسهم التنقل */}
        <button
          aria-label="الصورة السابقة"
          onClick={() => go(-1)}
          className="absolute right-4 top-1/2 grid size-11 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-white/70 text-ink opacity-0 shadow-soft backdrop-blur-xl transition-all hover:bg-white group-hover:opacity-100 focus-visible:opacity-100"
        >
          <ChevronRight className="size-5" />
        </button>
        <button
          aria-label="الصورة التالية"
          onClick={() => go(1)}
          className="absolute left-4 top-1/2 grid size-11 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-white/70 text-ink opacity-0 shadow-soft backdrop-blur-xl transition-all hover:bg-white group-hover:opacity-100 focus-visible:opacity-100"
        >
          <ChevronLeft className="size-5" />
        </button>

        {/* عدّاد + وصف الزاوية */}
        <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-black/45 px-3.5 py-1.5 text-xs font-medium text-white backdrop-blur-xl">
          <span className="tabular-nums">
            {index + 1} / {count}
          </span>
          <span className="text-white/60">·</span>
          <span>{angles[index]}</span>
        </div>
      </div>

      {/* المصغّرات */}
      <div className="mt-3 flex gap-2.5 overflow-x-auto pb-1 [scrollbar-width:none]">
        {Array.from({ length: count }).map((_, i) => (
          <button
            key={i}
            aria-label={`الصورة ${i + 1} — ${angles[i]}`}
            onClick={() => setIndex(i)}
            className="relative aspect-[4/3] w-24 shrink-0 cursor-pointer overflow-hidden rounded-xl ring-1 ring-line/60 transition-transform hover:scale-[1.04]"
          >
            <Image
              src={images[i]}
              alt=""
              fill
              sizes="6rem"
              className="w-full h-full object-cover"
            />
            {index === i && (
              <motion.span
                layoutId="thumb-ring"
                className="absolute inset-0 rounded-xl ring-[2.5px] ring-primary ring-inset"
                transition={{ type: "spring", stiffness: 420, damping: 32 }}
              />
            )}
            {index !== i && <span className="absolute inset-0 bg-white/45" />}
          </button>
        ))}
      </div>
    </div>
  );
}
