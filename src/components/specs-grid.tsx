"use client";

import { motion } from "framer-motion";
import {
  CircleGauge,
  Cog,
  Droplets,
  Fuel,
  Palette,
  ShieldQuestion,
} from "lucide-react";
import type { CarSpecs } from "@/lib/types";

/** شبكة المواصفات — بطاقات صغيرة ترتفع بلطف عند المرور */
export default function SpecsGrid({ specs }: { specs: CarSpecs }) {
  const items = [
    {
      label: "الممشى",
      value: `${specs.mileageKm.toLocaleString("en-US")} كم`,
      icon: CircleGauge,
    },
    { label: "القير", value: specs.transmission, icon: Cog },
    { label: "المكينة", value: specs.engine, icon: Droplets },
    { label: "الوقود", value: specs.fuel, icon: Fuel },
    { label: "اللون", value: specs.color, icon: Palette },
    { label: "الحالة", value: specs.condition, icon: ShieldQuestion },
  ];

  return (
    <section aria-label="مواصفات السيارة">
      <h2 className="mb-4 text-xl font-extrabold text-ink">المواصفات</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {items.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.4, delay: i * 0.05, ease: "easeOut" }}
            whileHover={{ y: -3 }}
            className="rounded-2xl bg-white p-4 shadow-soft ring-1 ring-line/60 transition-shadow hover:shadow-lift"
          >
            <div className="mb-2.5 grid size-10 place-items-center rounded-xl bg-primary/8 text-primary">
              <item.icon className="size-5" strokeWidth={1.9} />
            </div>
            <p className="text-xs font-medium text-muted">{item.label}</p>
            <p className="mt-0.5 font-bold text-ink tabular-nums">{item.value}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
