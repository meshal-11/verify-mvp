"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Eye, Heart, MessageSquareText, TrendingUp } from "lucide-react";
import Reveal from "./reveal";
import BadgeMawjaz from "./badge-mawjaz";

/** عدّاد تصاعدي ناعم للإحصاءات */
function CountUp({ to }: { to: number }) {
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? to : 0);
  useEffect(() => {
    if (reduce) return;
    const start = performance.now();
    const dur = 1100;
    let raf: number;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, reduce]);
  return <>{n.toLocaleString("en-US")}</>;
}

/** الشاشة 4 — الإعلان بعد النشر (عرض البائع): مشاهدات + خانة أعلى سومة فارغة */
export default function MyAd() {
  const stats = [
    { label: "مشاهدة", value: 1248, icon: Eye, href: null },
    { label: "محادثة", value: 12, icon: MessageSquareText, href: "/seller-chat" },
    { label: "مفضلة", value: 34, icon: Heart, href: null },
  ];

  return (
    <div className="mx-auto w-full max-w-xl">
      <Reveal>
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-2xl font-black text-ink sm:text-3xl">إعلانك</h1>
          <span className="flex items-center gap-1.5 rounded-full bg-green-tint px-4 py-1.5 text-sm font-extrabold text-green-dark ring-1 ring-green/25">
            <span className="live-dot size-2 rounded-full bg-green" />
            نشط
          </span>
        </div>
      </Reveal>

      {/* بطاقة الإعلان */}
      <Reveal delay={0.08}>
        <Link
          href="/car/toyota-land-cruiser-gxr-2021"
          className="group mt-5 block overflow-hidden rounded-3xl bg-white shadow-soft ring-1 ring-line/60 transition-all hover:-translate-y-0.5 hover:shadow-lift"
        >
          <div className="relative aspect-[16/8] overflow-hidden">
            <Image
              src="/landcruiser.jpeg"
              alt="تويوتا لاندكروزر GXR 2021 — فل كامل"
              fill
              sizes="(min-width: 640px) 36rem, 100vw"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
            />
            <div className="absolute top-3 right-3 rounded-full bg-white/85 shadow-soft backdrop-blur-xl">
              <BadgeMawjaz label="بدون حوادث كبرى" compact />
            </div>
            <div className="absolute bottom-3 right-3 flex items-center gap-1.5">
              <span className="rounded-full bg-black/45 px-3 py-1 text-xs font-bold text-white backdrop-blur-xl tabular-nums">
                1 / 6
              </span>
              <span className="rounded-full bg-black/45 px-2.5 py-1 text-xs font-bold text-white backdrop-blur-xl tabular-nums">
                +2
              </span>
            </div>
          </div>
          <div className="p-5">
            <h2 className="text-lg font-extrabold text-ink">
              تويوتا لاندكروزر GXR 2021 — فل كامل
            </h2>
            <p className="mt-1 text-sm font-medium text-muted">
              الرياض — حي النرجس · نُشر قبل 3 ساعات
            </p>
            <p className="mt-2.5 text-2xl font-black text-green tabular-nums">
              155,000{" "}
              <span className="text-sm font-bold text-green-dark">ريال</span>
            </p>
          </div>
        </Link>
      </Reveal>

      {/* الإحصاءات */}
      <div className="mt-4 grid grid-cols-3 gap-3">
        {stats.map((stat, i) => {
          const inner = (
            <>
              <span className="grid size-10 place-items-center rounded-xl bg-primary/8 text-primary">
                <stat.icon className="size-5" strokeWidth={1.9} />
              </span>
              <p className="mt-2 text-xl font-black text-ink tabular-nums">
                <CountUp to={stat.value} />
              </p>
              <p className="text-xs font-bold text-muted">{stat.label}</p>
            </>
          );
          const cls =
            "flex flex-col items-center rounded-2xl bg-white p-4 text-center shadow-soft ring-1 ring-line/60 transition-all";
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.08, type: "spring", stiffness: 300, damping: 24 }}
            >
              {stat.href ? (
                <Link
                  href={stat.href}
                  className={`${cls} cursor-pointer hover:-translate-y-0.5 hover:shadow-lift hover:ring-primary/40`}
                >
                  {inner}
                </Link>
              ) : (
                <div className={cls}>{inner}</div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* أعلى سومة — فارغة */}
      <Reveal delay={0.25}>
        <section
          aria-label="أعلى سومة"
          className="mt-4 flex items-center justify-between gap-3 rounded-3xl bg-white p-6 shadow-soft ring-1 ring-line/60"
        >
          <div>
            <h2 className="flex items-center gap-2 font-extrabold text-ink">
              <TrendingUp className="size-4.5 text-green" />
              أعلى سومة
            </h2>
            <p className="mt-1 text-xs font-medium text-muted">
              تُحدَّث تلقائياً من محادثاتك
            </p>
          </div>
          <p className="text-4xl font-black text-faint" aria-label="لا سومات بعد">
            —
          </p>
        </section>
      </Reveal>
    </div>
  );
}
