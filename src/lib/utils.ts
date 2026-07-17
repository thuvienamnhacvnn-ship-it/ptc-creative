import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Locale, LocalizedString, LocalizedStringArray } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function t(dict: LocalizedString, locale: Locale): string {
  return dict[locale] ?? dict.vi;
}

export function tList(dict: LocalizedStringArray, locale: Locale): string[] {
  return dict[locale] ?? dict.vi;
}

export function localePath(locale: Locale, path = ""): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (clean === "/") return `/${locale}`;
  return `/${locale}${clean}`;
}
