"use client";

import { useGsapReveal } from "@/hooks/use-gsap-reveal";
import { Radio, Tag, Sparkles, FileText, Send } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useLocale } from "./locale-provider";

const ICONS: LucideIcon[] = [Radio, Tag, Sparkles, FileText, Send];

export function Pipeline() {
  const ref = useGsapReveal<HTMLDivElement>({ stagger: 0.08 });
  const { t } = useLocale();

  return (
    <section
      id="pipeline"
      aria-labelledby="pipeline-heading"
      className="py-24 md:py-32 border-t border-[var(--border-soft)]"
    >
      <div className="container-app">
        <div className="max-w-3xl mb-14 md:mb-20">
          <div className="mono text-[11px] uppercase tracking-[0.14em] text-[var(--fg-tertiary)]">
            {t.home.pipeline.eyebrow}
          </div>
          <h2
            id="pipeline-heading"
            className="serif text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] mt-3 text-[var(--fg-primary)]"
          >
            {t.home.pipeline.heading}
          </h2>
          <p className="mt-5 text-[var(--fg-secondary)] text-lg max-w-2xl">
            {t.home.pipeline.lead}
          </p>
        </div>

        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4"
        >
          {t.home.pipeline.stages.map((stage, i) => {
            const Icon = ICONS[i] ?? Radio;
            return (
              <div
                key={stage.title}
                className="reveal-init surface p-5 md:p-6 flex flex-col gap-3 hover:border-[var(--border)] hover:bg-[var(--bg-tertiary)] transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div
                    className="inline-flex items-center justify-center h-9 w-9 rounded-full border border-[var(--border)] text-[var(--accent)]"
                    aria-hidden
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="mono text-[11px] uppercase tracking-[0.14em] text-[var(--fg-tertiary)]">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="serif text-xl leading-snug text-[var(--fg-primary)]">
                  {stage.title}
                </h3>
                <div className="mono text-[11px] uppercase tracking-[0.14em] text-[var(--fg-tertiary)]">
                  {stage.subtitle}
                </div>
                <p className="text-[var(--fg-secondary)] text-sm leading-relaxed">
                  {stage.body}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
