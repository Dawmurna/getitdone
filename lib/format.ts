export function naira(n: number): string {
  return "₦" + Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function pad(n: number): string {
  return n < 10 ? `0${n}` : String(n);
}

/** "2026-11-05" -> "Nov 5, 2026" */
export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return `${MONTHS[m - 1]} ${d}, ${y}`;
}

export function toISODate(d: Date): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function addDays(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return toISODate(d);
}

export function daysUntil(iso: string): number {
  const [y, m, d] = iso.split("-").map(Number);
  const target = new Date(y, m - 1, d);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.round((target.getTime() - today.getTime()) / 86400000);
}

export function safeNext(value: string | null | undefined, fallback = "/dashboard"): string {
  if (!value) return fallback;
  if (!value.startsWith("/") || value.startsWith("//")) return fallback;
  return value;
}
