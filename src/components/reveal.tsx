"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/** ظهور ناعم للعناصر عند التحميل/التمرير — Micro-interaction موحّد */
export default function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay, ease: [0.21, 0.62, 0.35, 1] }}
    >
      {children}
    </motion.div>
  );
}
