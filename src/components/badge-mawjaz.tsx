import { ShieldCheck } from "lucide-react";

/** شارة «موجز ✓» — الفحص المبدئي المجاني */
export default function BadgeMawjaz({
  label,
  compact = false,
}: {
  label?: string;
  compact?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full bg-green-tint text-green-dark font-bold ring-1 ring-green/20 ${
        compact ? "px-2.5 py-1 text-[11px]" : "px-3.5 py-1.5 text-sm"
      }`}
    >
      <ShieldCheck className={compact ? "size-3.5" : "size-4"} strokeWidth={2.4} />
      موجز ✓{label ? ` ${label}` : ""}
    </span>
  );
}
