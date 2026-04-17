"use client";

import { useGsapReveal } from "@/hooks/use-gsap-reveal";
import { useLocale } from "./locale-provider";

const LOGOS = [
  "Next.js 16",
  "FastAPI",
  "SQLite",
  "Claude Agent SDK",
  "Tailwind 4",
  "shadcn/ui",
  "GSAP",
  "Lenis",
];

export function BuiltOn() {
  const ref = useGsapReveal<HTMLDivElement>({ stagger: 0.05, y: 12 });
  const { t } = useLocale();

  return (
    <section
      aria-labelledby="built-on-heading"
      className="py-20 md:py-24 border-t border-[var(--border-soft)]"
    >
      <div className="container-app">
        <div className="flex items-center gap-4 mb-10">
          <div className="mono text-[11px] uppercase tracking-[0.14em] text-[var(--fg-tertiary)]">
            {t.home.builtOn.eyebrow}
          </div>
          <div className="h-px flex-1 bg-[var(--border-soft)]" />
          <h2 id="built-on-heading" className="sr-only">
            {t.home.builtOn.eyebrow}
          </h2>
        </div>
        <div
          ref={ref}
          className="flex flex-wrap items-center justify-between gap-x-10 gap-y-6"
        >
          {LOGOS.map((name) => (
            <span
              key={name}
              className="reveal-init mono text-[var(--fg-tertiary)] hover:text-[var(--fg-secondary)] transition-colors text-sm tracking-wide"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
