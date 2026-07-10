/**
 * حرّاس المحادثة — منطق مشترك بين محادثة المشتري (chat) والبائع (seller-chat)
 * يُستبدل لاحقاً بفحص من الخادم عبر Supabase Edge Function مع الإبقاء على نفس العقد
 */

/** يكتشف أرقام جوال سعودية مكتوبة بأي صيغة (مسافات/شرطات/رمز الدولة) */
export function containsPhoneNumber(text: string): boolean {
  const normalized = text.replace(/[\s-]/g, "");
  return /(?:\+?9665\d{8}|05\d{8}|5\d{8})/.test(normalized);
}

/** يكتشف نية السوم: كلمة "سوم" أو رقم كبير ضمن الرسالة — يعيد القيمة أو null */
export function extractBidAmount(text: string): number | null {
  const numberMatches = text.match(/\d[\d,]*/g);
  if (!numberMatches) return null;
  const amounts = numberMatches
    .map((n) => parseInt(n.replace(/,/g, ""), 10))
    .filter((n) => !Number.isNaN(n));
  if (amounts.length === 0) return null;
  const max = Math.max(...amounts);
  const hasBidWord = /سوم/.test(text);
  return hasBidWord || max >= 1000 ? max : null;
}
