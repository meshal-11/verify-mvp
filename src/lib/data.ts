import type { CarListing, SearchResultCard, SimilarListing } from "./types";
import { parseQuery } from "./search-parser";

/**
 * بيانات وهمية للـ MVP — تُستبدل لاحقاً باستعلامات Supabase
 * getListing(id) تحاكي `supabase.from("listings").select().eq("id", id).single()`
 */

const listings: Record<string, CarListing> = {
  "toyota-land-cruiser-gxr-2021": {
    id: "toyota-land-cruiser-gxr-2021",
    title: "تويوتا لاندكروزر GXR 2021 — فل كامل",
    make: "تويوتا",
    model: "لاندكروزر",
    trim: "GXR فل كامل",
    year: 2021,
    city: "الرياض",
    district: "حي النرجس",
    postedAgo: "قبل 3 ساعات",
    views: 1248,
    price: 155000,
    negotiable: true,
    topBid: 150000,
    interestedBuyers: 3,
    imageCount: 6,
    image: "/landcruiser.jpeg",
    specs: {
      mileageKm: 78000,
      transmission: "أوتوماتيك",
      engine: "V8 — 4.6L",
      fuel: "بنزين",
      color: "أبيض لؤلؤي",
      condition: "مستعملة",
    },
    defects: [
      {
        title: "رش بالرفرف الأمامي",
        note: "موثّق في فحص موجز — لا يمس المكينة أو الشاصيه",
      },
    ],
    mawjaz: {
      passed: true,
      label: "بدون حوادث كبرى",
      detail:
        "فحص مبدئي مجاني من السجلات المرورية والتأمينية — خالية من حوادث مسجّلة كبرى",
    },
    seller: {
      id: "salem",
      name: "سالم العتيبي",
      trustScore: 96,
      memberSince: 2019,
      completedDeals: 42,
      responseNote: "يرد خلال ساعة غالباً",
    },
    tags: ["Verify السيارات", "تويوتا", "لاندكروزر", "لاندكروزر 2021"],
  },
  "toyota-land-cruiser-vxr-2021": {
    id: "toyota-land-cruiser-vxr-2021",
    title: "تويوتا لاندكروزر VXR 2021 — سعودي",
    make: "تويوتا",
    model: "لاندكروزر",
    trim: "VXR سعودي",
    year: 2021,
    city: "الرياض",
    district: "حي العارض",
    postedAgo: "قبل يوم",
    views: 642,
    price: 159000,
    negotiable: true,
    topBid: null,
    interestedBuyers: 1,
    imageCount: 6,
    image: "/landcruiser.jpeg",
    specs: {
      mileageKm: 92500,
      transmission: "أوتوماتيك",
      engine: "V8 — 5.7L",
      fuel: "بنزين",
      color: "أبيض",
      condition: "مستعملة",
    },
    defects: [],
    mawjaz: {
      passed: true,
      label: "بدون حوادث كبرى",
      detail:
        "فحص مبدئي مجاني من السجلات المرورية والتأمينية — خالية من حوادث مسجّلة كبرى",
    },
    seller: {
      id: "abu-abdullah",
      name: "أبو عبدالله",
      trustScore: 91,
      memberSince: 2020,
      completedDeals: 17,
      responseNote: "يرد خلال ساعتين غالباً",
    },
    tags: ["Verify السيارات", "تويوتا", "لاندكروزر", "لاندكروزر 2021"],
  },
  "toyota-camry-se-2023": {
    id: "toyota-camry-se-2023",
    title: "تويوتا كامري SE 2023 — سعودي",
    make: "تويوتا",
    model: "كامري",
    trim: "SE سعودي",
    year: 2023,
    city: "جدة",
    district: "حي الروضة",
    postedAgo: "قبل 10 دقائق",
    views: 486,
    price: 98500,
    negotiable: true,
    topBid: null,
    interestedBuyers: 2,
    imageCount: 6,
    image: "/camry.jpeg",
    specs: {
      mileageKm: 31000,
      transmission: "أوتوماتيك",
      engine: "4 سلندر — 2.5L",
      fuel: "بنزين",
      color: "أبيض",
      condition: "مستعملة",
    },
    defects: [],
    mawjaz: {
      passed: false,
      label: "بانتظار الفحص المبدئي",
      detail:
        "لم يُطلب فحص موجز المجاني بعد لهذا الإعلان — اطلب الفحص المعتمد لتوثيق الحالة",
    },
    seller: {
      id: "al-tamimi",
      name: "م. التميمي",
      trustScore: 89,
      memberSince: 2021,
      completedDeals: 9,
      responseNote: "يرد خلال ساعتين غالباً",
    },
    tags: ["Verify السيارات", "تويوتا", "كامري", "كامري 2023"],
  },
};

/**
 * نتائج البحث — الشاشة 8 (بطاقتا النموذج الأولي حرفياً)
 * تُستبدل لاحقاً باستعلام Supabase مبني على ParsedFilter[]
 */
const searchResults: SearchResultCard[] = [
  {
    id: "result-gxr",
    listingId: "toyota-land-cruiser-gxr-2021",
    title: "تويوتا لاندكروزر GXR 2021 — فل كامل",
    meta: "78,000 كم · أوتوماتيك · الرياض — النرجس",
    price: 155000,
    matchPercent: 95,
    mawjaz: true,
    trustScore: 96,
    paletteIndex: 0,
    image: "/landcruiser.jpeg",
    model: "لاندكروزر",
  },
  {
    id: "result-vxr",
    listingId: "toyota-land-cruiser-vxr-2021",
    title: "تويوتا لاندكروزر VXR 2021 — سعودي",
    meta: "92,500 كم · أوتوماتيك · الرياض — العارض",
    price: 159000,
    matchPercent: 88,
    mawjaz: true,
    trustScore: 91,
    paletteIndex: 1,
    image: "/landcruiser.jpeg",
    model: "لاندكروزر",
  },
  {
    id: "result-camry",
    listingId: "toyota-camry-se-2023",
    title: "تويوتا كامري SE 2023 — سعودي",
    meta: "31,000 كم · أوتوماتيك · جدة — الروضة",
    price: 98500,
    matchPercent: 82,
    mawjaz: false,
    trustScore: 89,
    paletteIndex: 2,
    image: "/camry.jpeg",
    model: "كامري",
  },
];

/**
 * نتائج البحث مصفّاة حسب الاستعلام — يحاكي `.ilike("model", ...)` في Supabase.
 * بدون استعلام (أو استعلام لا يذكر موديلاً) تُعاد كل النتائج كما في النموذج الأولي.
 */
export async function getSearchResults(
  query?: string
): Promise<SearchResultCard[]> {
  const q = query?.trim();
  if (!q) return searchResults;

  const filters = parseQuery(q);
  const model = filters.find((f) => f.key === "model")?.value;
  if (!model) return searchResults;

  const matched = searchResults.filter((c) => c.model === model);
  return matched.length > 0 ? matched : searchResults;
}

/** إجمالي النتائج كما في النموذج الأولي («8 نتائج») */
export const SEARCH_RESULTS_TOTAL = 8;

/** مرشحات النموذج الأولي الافتراضية للشاشة 8 */
export const DEFAULT_SEARCH_FILTERS = [
  "لاندكروزر",
  "2021",
  "بدون حوادث قوية",
  "< 160 ألف",
];

/** إعلانات الشاشة 1 — «إعلانات قريبة منك» حرفياً */
export interface HomeListing {
  id: string;
  href: string;
  title: string;
  meta: string;
  price: number;
  mawjaz: boolean;
  paletteIndex: number;
  image?: string;
}

export const homeListings: HomeListing[] = [
  {
    id: "home-lc",
    href: "/car/toyota-land-cruiser-gxr-2021",
    title: "لاندكروزر GXR 2021 فل كامل",
    meta: "الرياض · الآن · أبو نواف",
    price: 155000,
    mawjaz: true,
    paletteIndex: 0,
    image: "/landcruiser.jpeg",
  },
  {
    id: "home-camry",
    href: "/car/toyota-camry-se-2023",
    title: "كامري SE 2023 سعودي",
    meta: "جدة · قبل 10 دقائق · م. التميمي",
    price: 98500,
    mawjaz: false,
    paletteIndex: 2,
    image: "/camry.jpeg",
  },
];

const similar: SimilarListing[] = [
  {
    id: "lc-vxr-2021",
    title: "لاندكروزر VXR 2021 سعودي",
    price: 159000,
    meta: "92,500 كم · الرياض — العارض",
    mawjaz: true,
    paletteIndex: 1,
    image: "/landcruiser.jpeg",
  },
  {
    id: "lc-gxr-2020",
    title: "لاندكروزر GXR 2020 فل كامل",
    price: 142000,
    meta: "110,000 كم · الرياض — الملقا",
    mawjaz: false,
    paletteIndex: 2,
    image: "/landcruiser.jpeg",
  },
  {
    id: "lc-gx-2021",
    title: "لاندكروزر GX 2021 نص فل",
    price: 138500,
    meta: "64,000 كم · الخرج",
    mawjaz: true,
    paletteIndex: 3,
    image: "/landcruiser.jpeg",
  },
  {
    id: "lc-vxs-2020",
    title: "لاندكروزر VX-S 2020 خليجي",
    price: 168000,
    meta: "88,300 كم · الرياض — النسيم",
    mawjaz: false,
    paletteIndex: 4,
    image: "/landcruiser.jpeg",
  },
];

export async function getListing(id: string): Promise<CarListing | null> {
  return listings[id] ?? null;
}

export async function getSimilarListings(): Promise<SimilarListing[]> {
  return similar;
}

export const DEFAULT_LISTING_ID = "toyota-land-cruiser-gxr-2021";

export function formatPrice(n: number): string {
  return n.toLocaleString("en-US");
}
