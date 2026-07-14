import mk from "./dictionaries/mk.json";
import sq from "./dictionaries/sq.json";
import en from "./dictionaries/en.json";
import de from "./dictionaries/de.json";
import type { Locale } from "./config";

const dictionaries = { mk, sq, en, de } as const;

export type Dictionary = typeof mk;

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] as Dictionary;
}
