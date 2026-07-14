export const locales = ["mk", "sq", "en", "de"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "mk";

export const localeMeta: Record<Locale, { label: string; short: string; htmlLang: string }> = {
  mk: { label: "Македонски", short: "MK", htmlLang: "mk" },
  sq: { label: "Shqip", short: "SQ", htmlLang: "sq" },
  en: { label: "English", short: "EN", htmlLang: "en" },
  de: { label: "Deutsch", short: "DE", htmlLang: "de" },
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
