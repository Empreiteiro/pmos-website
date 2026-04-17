import type { ReactNode } from "react";
import type { Locale } from "./types";

/**
 * Minimal per-call translator for pages whose prose is easier to keep inline.
 */
export function makeT(locale: Locale) {
  return function T<E extends ReactNode, P extends ReactNode>(
    en: E,
    pt: P
  ): E | P {
    return locale === "pt" ? pt : en;
  };
}
