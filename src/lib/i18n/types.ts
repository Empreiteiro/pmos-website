export type Locale = "en" | "pt";
export const LOCALES = ["en", "pt"] as const;
export const DEFAULT_LOCALE: Locale = "en";
export const LOCALE_COOKIE = "pmos-locale";

export function asLocale(v: string | undefined | null): Locale {
  return v === "pt" ? "pt" : "en";
}
