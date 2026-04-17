"use client";

import { useLocale } from "./locale-provider";
import type { Locale } from "@/lib/i18n/types";

const FLAG: Record<Locale, string> = {
  en: "🇺🇸",
  pt: "🇧🇷",
};

const NEXT: Record<Locale, Locale> = {
  en: "pt",
  pt: "en",
};

const ARIA: Record<Locale, string> = {
  en: "Switch to Portuguese",
  pt: "Mudar para inglês",
};

export function LocaleToggle({ className = "" }: { className?: string }) {
  const { locale, setLocale } = useLocale();
  return (
    <button
      type="button"
      onClick={() => setLocale(NEXT[locale])}
      aria-label={ARIA[locale]}
      title={ARIA[locale]}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] text-[16px] leading-none transition-transform hover:scale-105 hover:bg-[var(--bg-secondary)] ${className}`}
    >
      <span aria-hidden>{FLAG[locale]}</span>
    </button>
  );
}
