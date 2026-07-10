"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Banknote,
  CalendarDays,
  Car,
  CircleGauge,
  Cog,
  Fuel,
  MapPin,
  Mountain,
  PackageCheck,
  ShieldCheck,
  Truck,
  type LucideIcon,
} from "lucide-react";
import type { FilterKey, ParsedFilter } from "@/lib/search-parser";

const icons: Record<FilterKey, LucideIcon> = {
  model: Car,
  year: CalendarDays,
  body: Truck,
  accidents: ShieldCheck,
  condition: PackageCheck,
  mileage: CircleGauge,
  price: Banknote,
  city: MapPin,
  drivetrain: Mountain,
  fuel: Fuel,
  transmission: Cog,
};

/** رقائق «فهمنا من بحثك» — ظهور متتالٍ كأن النظام يستخرجها أمام العين */
export default function FilterChips({
  filters,
  compact = false,
}: {
  filters: ParsedFilter[];
  compact?: boolean;
}) {
  return (
    <motion.ul layout className="flex flex-wrap gap-2">
      <AnimatePresence mode="popLayout">
        {filters.map((f, i) => {
          const Icon = icons[f.key];
          return (
            <motion.li
              layout
              key={f.key}
              initial={{ opacity: 0, y: 16, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.18 } }}
              transition={{
                type: "spring",
                stiffness: 380,
                damping: 26,
                delay: i * 0.07,
              }}
              className={`flex items-center gap-2 rounded-full bg-white shadow-soft ring-1 ring-line/70 ${
                compact ? "px-3 py-1.5" : "px-3.5 py-2"
              }`}
            >
              <span
                className={`grid shrink-0 place-items-center rounded-full text-white ${
                  compact ? "size-5" : "size-6"
                } ${f.key === "price" ? "bg-green" : f.key === "accidents" ? "bg-green" : "bg-primary"}`}
              >
                <Icon className={compact ? "size-3" : "size-3.5"} strokeWidth={2.2} />
              </span>
              <span className={`font-medium text-muted ${compact ? "text-xs" : "text-sm"}`}>
                {f.label}:
              </span>
              <span
                className={`font-extrabold tabular-nums ${
                  compact ? "text-xs" : "text-sm"
                } ${f.key === "price" ? "text-green-dark" : "text-ink"}`}
              >
                {f.value}
              </span>
            </motion.li>
          );
        })}
      </AnimatePresence>
    </motion.ul>
  );
}
