/**
 * محلل البحث بلغة طبيعية — الشاشة 7
 * يفكك جملة المستخدم إلى مرشحات مهيكلة (يُستبدل لاحقاً بنموذج AI عبر Supabase Edge Function
 * مع الإبقاء على نفس عقد ParsedFilter)
 */

export type FilterKey =
  | "model"
  | "year"
  | "body"
  | "accidents"
  | "condition"
  | "mileage"
  | "price"
  | "city"
  | "drivetrain"
  | "fuel"
  | "transmission";

export interface ParsedFilter {
  key: FilterKey;
  label: string;
  value: string;
}

/** توحيد الأحرف العربية لتسهيل المطابقة */
function normalize(s: string): string {
  return s
    .replace(/[أإآ]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/ى/g, "ي")
    .replace(/[ً-ْ]/g, "")
    .toLowerCase();
}

const MODELS: { match: string; display: string }[] = [
  { match: "لاندكروزر", display: "لاندكروزر" },
  { match: "لاند كروزر", display: "لاندكروزر" },
  { match: "كامري", display: "كامري" },
  { match: "تاهو", display: "تاهو" },
  { match: "هايلوكس", display: "هايلوكس" },
  { match: "باترول", display: "باترول" },
  { match: "يوكن", display: "يوكن" },
  { match: "اكسبلورر", display: "إكسبلورر" },
  { match: "سوناتا", display: "سوناتا" },
  { match: "التيما", display: "ألتيما" },
  { match: "كورولا", display: "كورولا" },
  { match: "lx570", display: "لكزس LX570" },
  { match: "لكزس", display: "لكزس" },
];

const CITIES: { match: string; display: string }[] = [
  { match: "الرياض", display: "الرياض" },
  { match: "جده", display: "جدة" },
  { match: "الدمام", display: "الدمام" },
  { match: "مكه", display: "مكة" },
  { match: "المدينه", display: "المدينة" },
  { match: "الخبر", display: "الخبر" },
  { match: "الطايف", display: "الطائف" },
  { match: "الطائف", display: "الطائف" },
  { match: "بريده", display: "بريدة" },
  { match: "الخرج", display: "الخرج" },
];

function toRiyal(n: number): string {
  return n.toLocaleString("en-US");
}

export function parseQuery(raw: string): ParsedFilter[] {
  const text = normalize(raw);
  const filters: ParsedFilter[] = [];

  // الموديل — أول مطابقة فقط
  const model = MODELS.find((m) => text.includes(m.match));
  if (model) filters.push({ key: "model", label: "الموديل", value: model.display });

  // السنة
  const year = text.match(/\b(20[0-2]\d|19[89]\d)\b/);
  if (year) filters.push({ key: "year", label: "السنة", value: year[1] });

  // نوع الهيكل
  if (/بيك ?اب|بيكب/.test(text))
    filters.push({ key: "body", label: "الهيكل", value: "بيك أب" });
  else if (/(?:^|\s)جيب(?:\s|$)/.test(text) && !model)
    filters.push({ key: "body", label: "الهيكل", value: "جيب (SUV)" });

  // الحوادث
  const noAccidents =
    /نظيف من الحوادث|بدون حوادث|خالي(?:ه)? من الحوادث|ما فيه حوادث/.test(text);
  if (noAccidents)
    filters.push({ key: "accidents", label: "الحوادث", value: "بدون حوادث قوية" });

  // الحالة العامة
  if (/مخزن/.test(text))
    filters.push({ key: "condition", label: "الحالة", value: "مخزن" });
  else if (!noAccidents && /نظيف/.test(text))
    filters.push({ key: "condition", label: "الحالة", value: "نظيفة" });

  // الممشى: «ما مشى 50 ألف» / «ممشى أقل من 80»
  const mileage = text.match(
    /(?:ما مشي|ما مشا|ممشي اقل من|ممشاه اقل من)\s*(\d+)\s*(الف)?/
  );
  if (mileage) {
    const km = parseInt(mileage[1], 10) * (mileage[2] || +mileage[1] < 1000 ? 1000 : 1);
    filters.push({
      key: "mileage",
      label: "الممشى",
      value: `أقل من ${toRiyal(km)} كم`,
    });
  }

  // السعر: «تحت / أقل من / حدود 160 ألف»
  const price = text.match(
    /(?:تحت|اقل من|باقل من|بحدود|حدود|ما يتجاوز)\s+(\d+)\s*(الف)?/
  );
  if (price) {
    const n = parseInt(price[1], 10);
    // «حدود 130» تعني 130 ألفاً عرفاً — إلا إذا كان الرقم سنة أو مبلغاً كاملاً
    const isYear = /^(20[0-2]\d|19[89]\d)$/.test(price[1]) && !price[2];
    if (!isYear) {
      const amount = price[2] || n < 1000 ? n * 1000 : n;
      filters.push({
        key: "price",
        label: "السعر",
        value: `أقل من ${toRiyal(amount)} ريال`,
      });
    }
  }

  // المدينة
  const city = CITIES.find((c) => text.includes(c.match));
  if (city) filters.push({ key: "city", label: "المدينة", value: city.display });

  // الدفع
  if (/دبل/.test(text))
    filters.push({ key: "drivetrain", label: "الدفع", value: "رباعي (دبل)" });

  // الوقود
  if (/هايبرد/.test(text))
    filters.push({ key: "fuel", label: "الوقود", value: "هايبرد" });
  else if (/ديزل/.test(text))
    filters.push({ key: "fuel", label: "الوقود", value: "ديزل" });

  // القير
  if (/قير عادي/.test(text))
    filters.push({ key: "transmission", label: "القير", value: "عادي" });
  else if (/اوتوماتيك/.test(text))
    filters.push({ key: "transmission", label: "القير", value: "أوتوماتيك" });

  return filters;
}
