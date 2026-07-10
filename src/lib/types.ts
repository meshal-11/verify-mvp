/**
 * نماذج البيانات — مصممة لتطابق جداول Supabase لاحقاً
 * (listings, sellers, bids, inspection_requests)
 */

export type Transmission = "أوتوماتيك" | "عادي";
export type Fuel = "بنزين" | "ديزل" | "هايبرد" | "كهرباء";

export interface CarSpecs {
  mileageKm: number;
  transmission: Transmission;
  engine: string;
  fuel: Fuel;
  color: string;
  condition: string;
}

export interface DisclosedDefect {
  title: string;
  note: string;
}

export interface MawjazReport {
  passed: boolean;
  label: string;
  detail: string;
}

export interface Seller {
  id: string;
  name: string;
  trustScore: number; // 0–100
  memberSince: number;
  completedDeals: number;
  responseNote: string;
}

export interface CarListing {
  id: string;
  title: string;
  make: string;
  model: string;
  trim: string;
  year: number;
  city: string;
  district: string;
  postedAgo: string;
  views: number;
  price: number;
  negotiable: boolean;
  topBid: number | null;
  interestedBuyers: number;
  imageCount: number;
  /** مسار صورة الإعلان الحقيقية من public */
  image: string;
  specs: CarSpecs;
  defects: DisclosedDefect[];
  mawjaz: MawjazReport;
  seller: Seller;
  tags: string[];
}

/** بطاقة نتيجة بحث — الشاشة 8 */
export interface SearchResultCard {
  id: string;
  listingId: string;
  title: string;
  meta: string;
  price: number;
  matchPercent: number;
  mawjaz: boolean;
  trustScore: number;
  paletteIndex: number;
  /** مسار صورة حقيقية من public — احتياطي CarPlaceholder إن غابت */
  image?: string;
  /** الموديل للتصفية حسب استعلام البحث (يحاكي عمود listings.model) */
  model?: string;
}

export interface SimilarListing {
  id: string;
  title: string;
  price: number;
  meta: string;
  mawjaz: boolean;
  paletteIndex: number;
  image?: string;
}
