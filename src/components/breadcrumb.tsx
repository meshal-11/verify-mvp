import { ArrowRight, ChevronLeft } from "lucide-react";

/** مسار التنقّل المألوف في حراج — بسهم عودة */
export default function Breadcrumb({ items }: { items: string[] }) {
  return (
    <div className="flex items-center gap-3 py-4 text-sm">
      <button
        aria-label="عودة"
        className="grid size-9 shrink-0 place-items-center rounded-full bg-white text-primary shadow-soft ring-1 ring-line/60 transition-all hover:shadow-lift hover:-translate-x-0.5"
      >
        <ArrowRight className="size-4.5" />
      </button>
      <nav className="flex flex-wrap items-center gap-1.5 text-muted">
        {items.map((item, i) => (
          <span key={item} className="flex items-center gap-1.5">
            {i > 0 && <ChevronLeft className="size-3.5 text-faint" />}
            <a
              href="#"
              className={`transition-colors hover:text-primary ${
                i === items.length - 1 ? "font-bold text-ink" : ""
              }`}
            >
              {item}
            </a>
          </span>
        ))}
      </nav>
    </div>
  );
}
