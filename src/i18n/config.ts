export const locales = ["vi", "de"] as const;
export type AppLocale = (typeof locales)[number];
export const defaultLocale: AppLocale = "vi";

export function isLocale(value: string): value is AppLocale {
  return locales.includes(value as AppLocale);
}
