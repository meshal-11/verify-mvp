/**
 * مخزن أعلى سومة — يربط محادثة المشتري (chat) بصفحة إعلان البائع (my-ad)
 * عبر localStorage. يُستبدل لاحقاً باشتراك Supabase Realtime على جدول bids
 * مع الإبقاء على نفس العقد (saveTopBid / readTopBid).
 */

export const TOP_BID_KEY = "verify:top-bid";
/** حدث داخلي — storage لا يُطلق في نفس التبويب، فنُطلق هذا يدوياً */
export const TOP_BID_EVENT = "verify:top-bid";

/** قناة «السومة الواردة» — سومة وضعها المشتري وينتظر موافقة البائع عليها */
export const INCOMING_BID_KEY = "verify:incoming-bid";
export const INCOMING_BID_EVENT = "verify:incoming-bid";

export interface StoredBid {
  amount: number;
  at: number; // طابع زمني (ms)
}

export function readTopBid(): StoredBid | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(TOP_BID_KEY);
    return raw ? (JSON.parse(raw) as StoredBid) : null;
  } catch {
    return null;
  }
}

/** يحفظ السومة كأعلى سومة — يتجاهلها إن كانت أدنى من المسجّلة (دلالة «أعلى سومة») */
export function saveTopBid(amount: number): void {
  if (typeof window === "undefined" || !Number.isFinite(amount)) return;
  const prev = readTopBid();
  if (prev && prev.amount >= amount) return;
  const bid: StoredBid = { amount, at: Date.now() };
  window.localStorage.setItem(TOP_BID_KEY, JSON.stringify(bid));
  window.dispatchEvent(new CustomEvent(TOP_BID_EVENT, { detail: bid }));
}

/** يقرأ السومة الواردة المعلّقة (بانتظار موافقة البائع) */
export function readIncomingBid(): StoredBid | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(INCOMING_BID_KEY);
    return raw ? (JSON.parse(raw) as StoredBid) : null;
  } catch {
    return null;
  }
}

/** المشتري يضع سومة — تصبح «واردة» لدى البائع في seller-chat */
export function saveIncomingBid(amount: number): void {
  if (typeof window === "undefined" || !Number.isFinite(amount)) return;
  const bid: StoredBid = { amount, at: Date.now() };
  window.localStorage.setItem(INCOMING_BID_KEY, JSON.stringify(bid));
  window.dispatchEvent(new CustomEvent(INCOMING_BID_EVENT, { detail: bid }));
}

/** يمسح السومة الواردة بعد بتّها (موافقة/رفض) */
export function clearIncomingBid(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(INCOMING_BID_KEY);
  window.dispatchEvent(new CustomEvent(INCOMING_BID_EVENT, { detail: null }));
}
