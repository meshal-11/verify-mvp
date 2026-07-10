"use client";

import { motion } from "framer-motion";
import type { SearchResultCard } from "@/lib/types";
import CarCard from "./car-card";

/** شبكة النتائج — البطاقات تظهر واحدة تلو الأخرى (Staggered) */
export default function ResultsList({ cards }: { cards: SearchResultCard[] }) {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
      }}
      className="grid grid-cols-1 gap-5 sm:grid-cols-2"
    >
      {cards.map((card) => (
        <CarCard key={card.id} card={card} />
      ))}
    </motion.div>
  );
}
