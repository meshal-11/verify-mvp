"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Armchair,
  Bell,
  Car,
  ChevronDown,
  LayoutGrid,
  LogIn,
  Moon,
  PawPrint,
  Search,
  Smartphone,
  Sparkles,
  Wrench,
  House,
} from "lucide-react";
import VerifyLogo from "./verify-logo";

const navItems = [
  { label: "الرئيسية", icon: House, href: "/" },
  { label: "Verify السيارات", icon: Car, href: "/car" },
  { label: "أجهزة", icon: Smartphone, href: "#" },
  { label: "مواشي وحيوانات وطيور", icon: PawPrint, href: "#" },
  { label: "أثاث", icon: Armchair, href: "#" },
  { label: "البحث", icon: Search, href: "/search" },
  { label: "خدمات", icon: Wrench, href: "#" },
  { label: "أقسام أكثر", icon: LayoutGrid, href: "#" },
];

/** الهيكل المألوف لحراج: شريط أقسام أبيض + شريط كحلي بالشعار — بروح فاخرة */
export default function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [query, setQuery] = useState("");

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    // بنص → نتائج مباشرة؛ فارغ → شاشة البحث الذكي
    router.push(q ? `/search/results?q=${encodeURIComponent(q)}` : "/search");
  };

  const isActive = (href: string) =>
    href !== "#" &&
    (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-50">
      {/* شريط الأقسام */}
      <nav className="bg-white/85 backdrop-blur-xl border-b border-line/70">
        <div className="mx-auto max-w-7xl px-4">
          <ul className="flex items-center justify-center gap-1 overflow-x-auto text-sm font-medium text-muted [scrollbar-width:none]">
            {navItems.map((item) => (
              <li key={item.label} className="shrink-0">
                <Link
                  href={item.href}
                  className={`relative flex items-center gap-1.5 px-3.5 py-3 transition-colors hover:text-primary ${
                    isActive(item.href) ? "text-primary font-bold" : ""
                  }`}
                >
                  <item.icon className="size-4" strokeWidth={1.8} />
                  {item.label}
                  {isActive(item.href) && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-gradient-to-l from-primary to-primary-dark"
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* الشريط الكحلي */}
      <div className="bg-gradient-to-l from-primary-dark via-primary to-primary-dark shadow-lift">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4">
          {/* الشعار */}
          <Link href="/" className="flex items-center gap-2.5 text-white">
            <VerifyLogo />
          </Link>

          {/* بحث سريع — يقودك لنتائج البحث الذكي (الشاشة 8) */}
          <div className="hidden flex-1 max-w-xl md:block">
            <form
              onSubmit={onSearch}
              className="group flex items-center gap-2.5 rounded-full bg-white/10 px-4 py-2.5 ring-1 ring-white/20 backdrop-blur transition-all hover:bg-white/20 focus-within:ring-white"
            >
              <button
                type="submit"
                aria-label="ابحث"
                className="grid shrink-0 cursor-pointer place-items-center text-white/70 transition-colors hover:text-white"
              >
                <Search className="size-4" />
              </button>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="ابحث في Verify…"
                aria-label="ابحث في Verify"
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/60"
              />
              <button
                type="submit"
                className="hidden shrink-0 cursor-pointer items-center gap-1 rounded-full bg-white/15 px-2.5 py-0.5 text-[11px] font-bold text-white/80 transition-colors hover:bg-white/25 lg:flex"
              >
                <Sparkles className="size-3" />
                بحث ذكي
              </button>
            </form>
          </div>

          {/* أدوات */}
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-primary-dark shadow-soft transition-transform hover:scale-[1.03] active:scale-95">
              <LogIn className="size-4" />
              دخــول
            </button>
            <button className="hidden items-center gap-1 rounded-full px-3 py-2 text-sm font-medium text-white/90 ring-1 ring-white/25 transition-colors hover:bg-white/10 sm:flex">
              عربي (AR)
              <ChevronDown className="size-3.5" />
            </button>
            <Link
              href="/assistant"
              aria-label="مساعد Verify"
              className="grid size-9 place-items-center rounded-full text-gold ring-1 ring-gold/40 transition-colors hover:bg-gold/15"
            >
              <Sparkles className="size-4" />
            </Link>
            <Link
              href="/requests"
              aria-label="طلبات الفحص — 1 جديد"
              className="relative grid size-9 place-items-center rounded-full text-white/90 ring-1 ring-white/25 transition-colors hover:bg-white/10"
            >
              <Bell className="size-4" />
              <span className="absolute -top-0.5 -left-0.5 grid size-4 place-items-center rounded-full bg-gold text-[10px] font-black text-[#3d2e12] ring-2 ring-primary-dark">
                1
              </span>
            </Link>
            <button
              aria-label="الوضع الليلي"
              className="grid size-9 place-items-center rounded-full text-white/90 ring-1 ring-white/25 transition-colors hover:bg-white/10"
            >
              <Moon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
