import { FileCheck2, TriangleAlert } from "lucide-react";
import type { DisclosedDefect } from "@/lib/types";

/** إفصاح العيوب — الشفافية التي تبني الثقة قبل الفحص */
export default function DefectsCard({ defects }: { defects: DisclosedDefect[] }) {
  return (
    <section
      aria-label="عيوب أفصح عنها البائع"
      className="rounded-3xl bg-gold-tint p-6 ring-1 ring-gold/25"
    >
      <h2 className="mb-1 flex items-center gap-2 text-lg font-extrabold text-gold-deep">
        <TriangleAlert className="size-5" />
        عيوب أفصح عنها البائع
      </h2>
      <p className="mb-4 text-sm font-medium text-gold-deep/70">
        الإفصاح المبكر يحفظ وقت الطرفين ويرفع ثقة المشتري
      </p>
      <ul className="space-y-3">
        {defects.map((d) => (
          <li
            key={d.title}
            className="rounded-2xl bg-white/80 p-4 shadow-soft ring-1 ring-gold/15 backdrop-blur"
          >
            <p className="font-bold text-ink">{d.title}</p>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-muted">
              <FileCheck2 className="size-4 shrink-0 text-green-dark" />
              {d.note}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
