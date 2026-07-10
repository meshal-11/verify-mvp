/**
 * شعار Verify — درع بعلامة صح + الاسم
 * يرث اللون من النص المحيط (currentColor) ليبقى أبيض على الهيدر الكحلي
 */
export function VerifyMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path
        d="M24 4.5 L40 10.5 V22 C40 33.5 33 41.5 24 44.5 C15 41.5 8 33.5 8 22 V10.5 Z"
        strokeWidth="4"
      />
      <path d="M15.5 24.5 L22.5 31.5 L39 12.5" strokeWidth="5" />
    </svg>
  );
}

/** الشعار الكامل: الأيقونة + الاسم — بنفس أبعاد الشعار السابق في الهيدر */
export default function VerifyLogo({
  className = "",
  markClassName = "size-8",
  wordmarkClassName = "text-3xl",
}: {
  className?: string;
  markClassName?: string;
  wordmarkClassName?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <VerifyMark className={markClassName} />
      <span
        dir="ltr"
        className={`font-black tracking-tight leading-none ${wordmarkClassName}`}
      >
        Verify
      </span>
    </span>
  );
}
