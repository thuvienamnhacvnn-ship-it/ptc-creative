import type { Locale as AppLocale } from "@/types";

/** Pick bilingual DB field by locale */
export function pickLocale<T extends Record<string, unknown>>(
  row: T,
  base: string,
  locale: AppLocale
): string {
  const key = `${base}${locale === "de" ? "De" : "Vi"}` as keyof T;
  const alt = `${base}${locale === "de" ? "Vi" : "De"}` as keyof T;
  const primary = row[key];
  const fallback = row[alt];
  if (typeof primary === "string" && primary.trim()) return primary;
  if (typeof fallback === "string") return fallback;
  return "";
}

export function pickLocaleList<T extends Record<string, unknown>>(
  row: T,
  base: string,
  locale: AppLocale
): string[] {
  const key = `${base}${locale === "de" ? "De" : "Vi"}` as keyof T;
  const alt = `${base}${locale === "de" ? "Vi" : "De"}` as keyof T;
  const primary = row[key];
  const fallback = row[alt];
  if (Array.isArray(primary) && primary.length) return primary as string[];
  if (Array.isArray(fallback)) return fallback as string[];
  return [];
}

export function isTranslationComplete(row: Record<string, unknown>, pairs: [string, string][]): boolean {
  return pairs.every(([vi, de]) => {
    const a = row[vi];
    const b = row[de];
    return typeof a === "string" && a.trim() && typeof b === "string" && b.trim();
  });
}
