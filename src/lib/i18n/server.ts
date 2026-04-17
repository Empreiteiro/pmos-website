import { cookies } from "next/headers";
import { asLocale, LOCALE_COOKIE } from "./types";
import { getDict } from "./dictionary";

/**
 * Read the current locale from cookies and return the matching dictionary.
 */
export async function getServerDict() {
  const store = await cookies();
  const locale = asLocale(store.get(LOCALE_COOKIE)?.value);
  return { locale, t: getDict(locale) };
}
