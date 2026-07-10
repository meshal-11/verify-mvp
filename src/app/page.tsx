import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Armchair,
  Briefcase,
  Building2,
  Car,
  ChevronDown,
  ChevronLeft,
  House,
  MessageSquareText,
  PawPrint,
  Plus,
  Search,
  Shirt,
  Smartphone,
  Sparkles,
  UserRound,
  Wrench,
} from "lucide-react";
import { homeListings, formatPrice } from "@/lib/data";
import SiteHeader from "@/components/site-header";
import CarPlaceholder from "@/components/car-placeholder";
import BadgeMawjaz from "@/components/badge-mawjaz";
import Reveal from "@/components/reveal";

export const metadata: Metadata = {
  title: "Verify — الرئيسية",
};

const CATEGORIES = [
  { label: "سيارات", icon: Car, active: true },
  { label: "عقارات", icon: Building2, active: false },
  { label: "أجهزة", icon: Smartphone, active: false },
  { label: "أثاث", icon: Armchair, active: false },
  { label: "خدمات", icon: Wrench, active: false },
  { label: "أزياء", icon: Shirt, active: false },
  { label: "مواشي", icon: PawPrint, active: false },
  { label: "وظائف", icon: Briefcase, active: false },
];

const BOTTOM_NAV = [
  { label: "الرئيسية", icon: House, href: "/", active: true },
  { label: "البحث", icon: Search, href: "/search", active: false },
  { label: "المحادثات", icon: MessageSquareText, href: "/chat", active: false },
  { label: "حسابي", icon: UserRound, href: "/my-ad", active: false },
];

/** الشاشة 1 — الرئيسية: نقطة دخول Verify — بانر ذهبي + زر إضافة عائم */
export default function HomePage() {
  return (
    <div className="min-h-dvh pb-24 md:pb-10">
      <SiteHeader />

      <main className="mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-3xl">
          {/* بحث */}
          <Reveal>
            <Link
              href="/search"
              className="mt-6 flex items-center gap-3 rounded-full bg-white px-5 py-4 shadow-soft ring-1 ring-line/60 transition-all hover:shadow-lift hover:ring-primary/40"
            >
              <Search className="size-5 text-primary" />
              <span className="font-medium text-faint">ابحث في Verify…</span>
              <span className="me-auto hidden items-center gap-1 rounded-full bg-primary/8 px-3 py-1 text-xs font-bold text-primary sm:flex">
                <Sparkles className="size-3" />
                بحث ذكي
              </span>
            </Link>
          </Reveal>

          {/* البانر الذهبي — أول خطاف بصري في الرحلة */}
          <Reveal delay={0.08}>
            <Link
              href="/sell"
              className="gold-shine relative mt-4 block overflow-hidden rounded-3xl bg-gradient-to-l from-gold to-gold-dark p-6 shadow-gold transition-transform hover:scale-[1.01] active:scale-[0.99]"
            >
              <div className="flex items-center gap-4">
                <span className="grid size-13 shrink-0 place-items-center rounded-2xl bg-white/20 text-[#3d2e12] ring-1 ring-white/30 backdrop-blur">
                  <Sparkles className="size-6" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="flex items-center gap-2 text-lg font-black text-[#3d2e12]">
                    جرّب Verify
                    <span className="rounded-full bg-[#3d2e12] px-2.5 py-0.5 text-[11px] font-bold text-gold">
                      جديد
                    </span>
                  </p>
                  <p className="mt-0.5 text-sm font-bold text-[#3d2e12]/80">
                    بِع سيارتك بأمان — فحص معتمد وعربون يحفظ حقك
                  </p>
                </div>
                <ChevronLeft className="size-5 shrink-0 text-[#3d2e12]/70" />
              </div>
            </Link>
          </Reveal>

          {/* الأقسام */}
          <Reveal delay={0.14}>
            <div className="mt-5 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.label}
                  className={`flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-bold transition-all ${
                    cat.active
                      ? "bg-gradient-to-l from-primary to-primary-dark text-white shadow-lift"
                      : "bg-white text-muted shadow-soft ring-1 ring-line/60 hover:text-primary hover:ring-primary/40"
                  }`}
                >
                  <cat.icon className="size-4" strokeWidth={1.9} />
                  {cat.label}
                </button>
              ))}
            </div>
          </Reveal>

          {/* إعلانات قريبة منك */}
          <Reveal delay={0.2}>
            <div className="mt-6 flex items-center justify-between">
              <h2 className="text-xl font-extrabold text-ink">
                إعلانات قريبة منك
              </h2>
              <button className="flex cursor-pointer items-center gap-1 rounded-full bg-white px-3.5 py-1.5 text-sm font-bold text-muted shadow-soft ring-1 ring-line/60 transition-colors hover:text-primary">
                الأحدث
                <ChevronDown className="size-3.5" />
              </button>
            </div>
          </Reveal>

          <div className="mt-4 space-y-3">
            {homeListings.map((item, i) => (
              <Reveal key={item.id} delay={0.24 + i * 0.08}>
                <Link
                  href={item.href}
                  className="group flex gap-4 rounded-3xl bg-white p-3 shadow-soft ring-1 ring-line/60 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift hover:ring-primary/30"
                >
                  <div className="relative aspect-[4/3] w-32 shrink-0 overflow-hidden rounded-2xl ring-1 ring-line/60 sm:w-40">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(min-width: 640px) 10rem, 8rem"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                      />
                    ) : (
                      <CarPlaceholder
                        variant={item.paletteIndex}
                        className="size-full transition-transform duration-700 group-hover:scale-[1.06]"
                      />
                    )}
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col justify-center py-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-extrabold text-ink transition-colors group-hover:text-primary-dark">
                        {item.title}
                      </h3>
                      {item.mawjaz && <BadgeMawjaz compact />}
                    </div>
                    <p className="mt-1 text-sm font-medium text-muted">
                      {item.meta}
                    </p>
                    <p className="mt-2 text-lg font-black text-green tabular-nums">
                      {formatPrice(item.price)}{" "}
                      <span className="text-xs font-bold text-green-dark">
                        ريال
                      </span>
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </main>

      {/* أضف عرض — الزر الذهبي العائم */}
      <Link
        href="/sell"
        className="fixed bottom-24 left-4 z-40 flex min-h-13 items-center gap-2 rounded-full bg-gradient-to-l from-gold to-gold-dark px-6 py-3.5 font-black text-[#3d2e12] shadow-gold transition-transform hover:scale-105 active:scale-95 md:bottom-8 md:left-8"
      >
        <Plus className="size-5" strokeWidth={2.6} />
        أضف عرض
      </Link>

      {/* الشريط السفلي — جوال */}
      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-line/60 bg-white/85 backdrop-blur-xl md:hidden">
        <ul className="grid grid-cols-4 pb-[max(0.25rem,env(safe-area-inset-bottom))]">
          {BOTTOM_NAV.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className={`flex min-h-14 flex-col items-center justify-center gap-0.5 text-[11px] font-bold ${
                  item.active ? "text-primary" : "text-faint"
                }`}
              >
                <item.icon className="size-5" strokeWidth={item.active ? 2.2 : 1.8} />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
