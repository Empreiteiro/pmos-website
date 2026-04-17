"use client";

import {
  Telescope,
  Ear,
  GitCompare,
  Database,
  Layers,
  FileText,
  type LucideIcon,
} from "lucide-react";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";
import { useLocale } from "./locale-provider";

const ICONS: LucideIcon[] = [
  Telescope,
  Ear,
  GitCompare,
  Database,
  Layers,
  FileText,
];

export function FeaturePillars() {
  const ref = useGsapReveal<HTMLDivElement>({ stagger: 0.08 });
  const { t } = useLocale();

  return (
    <section
      id="pillars"
      aria-labelledby="pillars-heading"
      className="py-24 md:py-32 border-t border-[var(--border-soft)]"
    >
      <div className="container-app">
        <div className="max-w-3xl mb-14 md:mb-20">
          <div className="mono text-[11px] uppercase tracking-[0.14em] text-[var(--fg-tertiary)]">
            {t.home.pillars.eyebrow}
          </div>
          <h2
            id="pillars-heading"
            className="serif text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] mt-3 text-[var(--fg-primary)]"
          >
            {t.home.pillars.heading}
          </h2>
          <p className="mt-5 text-[var(--fg-secondary)] text-lg max-w-2xl">
            {t.home.pillars.lead}
          </p>
        </div>

        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4"
        >
          {t.home.pillars.items.map((pillar, i) => {
            const Icon = ICONS[i] ?? Telescope;
            return (
              <div
                key={pillar.title}
                className="reveal-init surface p-6 md:p-7 flex flex-col gap-4 hover:border-[var(--border)] hover:bg-[var(--bg-tertiary)] transition-colors"
              >
                <div
                  className="inline-flex items-center justify-center h-10 w-10 rounded-full border border-[var(--border)] text-[var(--accent)]"
                  aria-hidden
                >
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="serif text-2xl leading-snug text-[var(--fg-primary)]">
                  {pillar.title}
                </h3>
                <p className="text-[var(--fg-secondary)] text-[0.95rem] leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
