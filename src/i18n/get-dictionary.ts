import type { Locale } from "@/types";
import type { Dictionary } from "./dictionaries/vi";
import { vi } from "./dictionaries/vi";
import { de } from "./dictionaries/de";

const dictionaries: Record<Locale, Dictionary> = { vi, de };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.vi;
}
