"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DEMO_LINK_PROPS } from "@/lib/links";
import { useLocale } from "./locale-provider";

export function Hero() {
  const { t } = useLocale();
  return (
    <section
      id="main"
      aria-label="Hero"
      className="relative overflow-hidden pt-36 md:pt-44 lg:pt-52 pb-12 md:pb-20"
    >
      {/* Decorative blob */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 pointer-events-none"
      >
        <div className="absolute left-1/2 top-24 -translate-x-1/2 w-[min(100vw,1400px)] aspect-[4/3] hero-blob">
          <svg
            viewBox="0 0 600 480"
            width="100%"
            height="100%"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <defs>
              <radialGradient id="blobGrad" cx="50%" cy="50%" r="60%">
                <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.55" />
                <stop offset="55%" stopColor="var(--accent)" stopOpacity="0.18" />
                <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
              </radialGradient>
              <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="40" />
              </filter>
            </defs>
            <path
              d="M300,80 C400,80 470,130 500,220 C530,310 480,380 400,420 C320,460 220,440 160,380 C100,320 80,220 140,150 C190,90 250,80 300,80 Z"
              fill="url(#blobGrad)"
              filter="url(#soft)"
            />
          </svg>
        </div>
        <div className="absolute inset-0 noise" />
      </div>

      <div className="container-app">
        <div className="mono text-[11px] uppercase tracking-[0.14em] text-[var(--accent)] mb-4">
          {t.home.hero.eyebrow}
        </div>
        <h1 className="serif serif-display text-[clamp(2.75rem,7vw,6rem)] leading-[1.02] tracking-[-0.02em] text-[var(--fg-primary)] max-w-5xl">
          {t.home.hero.headline}
        </h1>
        <p className="mt-6 max-w-2xl text-[var(--fg-secondary)] text-lg md:text-xl leading-relaxed">
          {t.home.hero.lead}
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <a {...DEMO_LINK_PROPS} className="btn btn-primary">
            {t.cta.getDemo}
          </a>
          <Link href="/docs" className="btn btn-ghost arrow-link">
            {t.cta.readDocs}
            <ArrowRight className="arrow h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
