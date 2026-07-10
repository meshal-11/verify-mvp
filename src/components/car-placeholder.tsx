const palettes = [
  { from: "#22456e", to: "#2e6cb2", body: "#f4f7fb" },
  { from: "#1a3c66", to: "#3d7cc2", body: "#eef3fa" },
  { from: "#26507f", to: "#4a86c6", body: "#f7f9fd" },
  { from: "#1e4470", to: "#356fb0", body: "#f1f5fb" },
  { from: "#2a5a94", to: "#5590cc", body: "#f5f8fc" },
  { from: "#17395f", to: "#2e6cb2", body: "#eef3fa" },
];

/**
 * صورة سيارة رمزية (Placeholder) بتدرج كحلي فاخر —
 * تُستبدل بصور حقيقية من Supabase Storage لاحقاً
 */
export default function CarPlaceholder({
  variant = 0,
  className = "",
}: {
  variant?: number;
  className?: string;
}) {
  const p = palettes[variant % palettes.length];
  const gid = `car-grad-${variant % palettes.length}`;
  return (
    <svg
      viewBox="0 0 400 240"
      className={className}
      role="img"
      aria-label="صورة السيارة"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={p.from} />
          <stop offset="100%" stopColor={p.to} />
        </linearGradient>
        <linearGradient id={`${gid}-floor`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.14)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
      </defs>
      <rect width="400" height="240" fill={`url(#${gid})`} />
      <ellipse cx="200" cy="196" rx="150" ry="16" fill="rgba(0,0,0,0.22)" />
      <rect x="0" y="150" width="400" height="90" fill={`url(#${gid}-floor)`} />
      {/* هيكل SUV مبسّط — مقدمة يسار (اتجاه RTL) */}
      <g transform="translate(52 40)">
        {/* البودي: غطاء محرك منخفض + كابينة مرتفعة + خلفية شبه عمودية */}
        <path
          d="M10 96 C14 88 24 83 38 82 L74 80 L96 52 C100 46 107 42 116 41 L216 38 C226 38 234 41 240 48 L262 78 L320 84 C338 86 348 94 348 106 L348 128 C348 135 343 140 336 140 L312 140 A32 32 0 0 0 250 140 L120 140 A32 32 0 0 0 58 140 L22 140 C15 140 10 135 10 128 L10 110 Z"
          fill={p.body}
        />
        {/* زجاج أمامي + أبواب */}
        <path d="M104 56 C107 50 112 47 119 47 L156 46 L156 78 L88 78 Z" fill={p.from} opacity="0.8" />
        <path d="M166 46 L214 45 C221 45 227 48 231 53 L248 76 L166 77 Z" fill={p.from} opacity="0.8" />
        {/* خط الخصر */}
        <rect x="26" y="88" width="310" height="3" rx="1.5" fill={p.from} opacity="0.25" />
        {/* عجلات */}
        <g>
          <circle cx="89" cy="140" r="25" fill="#12233b" />
          <circle cx="89" cy="140" r="12" fill="#c7cfda" />
          <circle cx="89" cy="140" r="4.5" fill="#12233b" />
        </g>
        <g>
          <circle cx="281" cy="140" r="25" fill="#12233b" />
          <circle cx="281" cy="140" r="12" fill="#c7cfda" />
          <circle cx="281" cy="140" r="4.5" fill="#12233b" />
        </g>
        {/* مصابيح */}
        <rect x="10" y="94" width="16" height="8" rx="4" fill="#e7b15c" opacity="0.95" />
        <rect x="334" y="96" width="14" height="9" rx="4" fill="#ffb3b3" opacity="0.85" />
        {/* مقبض */}
        <rect x="176" y="92" width="22" height="4" rx="2" fill={p.from} opacity="0.4" />
      </g>
    </svg>
  );
}
