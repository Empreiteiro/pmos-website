"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";
import { DEMO_LINK_PROPS } from "@/lib/links";
import { useLocale } from "./locale-provider";
import type { ReactNode } from "react";

export function FeatureHero({
  eyebrow,
  oneLiner,
  lead,
}: {
  eyebrow: string;
  oneLiner: string;
  lead: string;
}) {
  const { t } = useLocale();
  return (
    <section className="relative overflow-hidden pt-36 md:pt-44 pb-14 md:pb-20 border-b border-[var(--border-soft)]">
      <div aria-hidden className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute right-[-8%] top-10 w-[min(85vw,40rem)] aspect-square hero-blob opacity-70">
          <svg viewBox="0 0 600 480" width="100%" height="100%" aria-hidden>
            <defs>
              <radialGradient id="fpBlob" cx="50%" cy="50%" r="60%">
                <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.45" />
                <stop offset="60%" stopColor="var(--accent)" stopOpacity="0.12" />
                <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
              </radialGradient>
              <filter id="fpSoft" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="30" />
              </filter>
            </defs>
            <path
              d="M300,120 C390,110 460,180 470,260 C480,340 420,400 340,410 C250,420 180,380 150,310 C120,240 170,140 240,130 C260,128 280,122 300,120 Z"
              fill="url(#fpBlob)"
              filter="url(#fpSoft)"
            />
          </svg>
        </div>
        <div className="absolute inset-0 noise opacity-40" />
      </div>

      <div className="container-app">
        <Link
          href="/#pillars"
          className="arrow-link inline-flex items-center gap-1.5 text-sm text-[var(--fg-secondary)] mb-10"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden /> {t.features.back}
        </Link>
        <div className="mono text-[11px] uppercase tracking-[0.14em] text-[var(--accent)]">
          {eyebrow}
        </div>
        <h1 className="serif serif-display mt-4 max-w-4xl text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[1.04] tracking-[-0.02em] text-[var(--fg-primary)]">
          {oneLiner}
        </h1>
        <p className="mt-6 max-w-2xl text-[var(--fg-secondary)] text-lg md:text-xl leading-relaxed">
          {lead}
        </p>
      </div>
    </section>
  );
}

export function FeatureSection({
  eyebrow,
  heading,
  children,
  variant = "default",
}: {
  eyebrow?: string;
  heading?: string;
  children: ReactNode;
  variant?: "default" | "muted";
}) {
  return (
    <section
      className={`py-20 md:py-24 border-b border-[var(--border-soft)] ${
        variant === "muted" ? "bg-[var(--bg-secondary)]" : ""
      }`}
    >
      <div className="container-app">
        {(eyebrow || heading) && (
          <div className="mb-10 md:mb-14 max-w-3xl">
            {eyebrow && (
              <div className="mono text-[11px] uppercase tracking-[0.14em] text-[var(--fg-tertiary)]">
                {eyebrow}
              </div>
            )}
            {heading && (
              <h2 className="serif text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.1] mt-3 text-[var(--fg-primary)]">
                {heading}
              </h2>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

export function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-3xl text-[var(--fg-secondary)] text-lg leading-relaxed space-y-5">
      {children}
    </div>
  );
}

export function FlowSteps({
  steps,
}: {
  steps: Array<{ n: string; title: string; body: ReactNode; mono?: string }>;
}) {
  const ref = useGsapReveal<HTMLDivElement>({ stagger: 0.1 });
  return (
    <div
      ref={ref}
      className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5"
    >
      {steps.map((s) => (
        <div
          key={s.n + s.title}
          className="reveal-init surface p-6 md:p-7 flex flex-col gap-4"
        >
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center justify-center h-8 w-8 rounded-full border border-[var(--accent)] text-[var(--accent)] mono text-sm">
              {s.n}
            </span>
            <h3 className="serif text-xl text-[var(--fg-primary)]">
              {s.title}
            </h3>
          </div>
          {s.mono && (
            <code className="mono text-[12px] bg-[var(--bg-tertiary)] border border-[var(--border-soft)] px-2.5 py-1.5 rounded-md text-[var(--fg-primary)] self-start">
              {s.mono}
            </code>
          )}
          <div className="text-[var(--fg-secondary)] leading-relaxed text-[0.95rem]">
            {s.body}
          </div>
        </div>
      ))}
    </div>
  );
}

export function FeatureTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: Array<ReactNode[]>;
}) {
  return (
    <div className="surface overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-[var(--border-soft)] bg-[var(--bg-tertiary)]">
              {headers.map((h, i) => (
                <th
                  key={i}
                  className="mono text-[11px] uppercase tracking-[0.14em] text-[var(--fg-tertiary)] px-5 py-3.5 font-normal"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr
                key={i}
                className="border-b border-[var(--border-soft)] last:border-b-0"
              >
                {r.map((c, j) => (
                  <td
                    key={j}
                    className={`px-5 py-4 align-top text-[0.95rem] ${
                      j === 0
                        ? "text-[var(--fg-primary)] font-medium"
                        : "text-[var(--fg-secondary)]"
                    }`}
                  >
                    {c}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function Callout({
  title,
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  return (
    <div
      className="relative rounded-2xl p-6 md:p-7 border border-[var(--border-soft)]"
      style={{
        background:
          "linear-gradient(180deg, color-mix(in oklab, var(--accent) 8%, var(--bg-secondary)) 0%, var(--bg-secondary) 100%)",
      }}
    >
      <div
        aria-hidden
        className="absolute left-0 top-6 bottom-6 w-[3px] rounded-r-full"
        style={{ background: "var(--accent)" }}
      />
      {title && (
        <div className="mono text-[11px] uppercase tracking-[0.14em] text-[var(--accent)] mb-2">
          {title}
        </div>
      )}
      <div className="text-[var(--fg-primary)] text-[0.98rem] leading-relaxed">
        {children}
      </div>
    </div>
  );
}

export function CodeBlock({ children }: { children: ReactNode }) {
  return (
    <pre className="mono text-[12.5px] leading-[1.6] bg-[var(--bg-tertiary)] border border-[var(--border-soft)] rounded-xl p-5 overflow-x-auto text-[var(--fg-primary)]">
      {children}
    </pre>
  );
}

export function BulletList({
  items,
}: {
  items: Array<{ label: string; body?: ReactNode; mono?: boolean }>;
}) {
  return (
    <ul className="space-y-3.5">
      {items.map((it, i) => (
        <li key={i} className="flex gap-3 items-start">
          <span
            aria-hidden
            className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-[var(--accent)] shrink-0"
          />
          <div className="text-[var(--fg-secondary)] leading-relaxed">
            {it.mono ? (
              <code className="mono text-[13px] text-[var(--fg-primary)]">
                {it.label}
              </code>
            ) : (
              <span className="text-[var(--fg-primary)] font-medium">
                {it.label}
              </span>
            )}
            {it.body && <> — {it.body}</>}
          </div>
        </li>
      ))}
    </ul>
  );
}

export function HighlightGrid({
  items,
}: {
  items: Array<{ title: string; body: string }>;
}) {
  const ref = useGsapReveal<HTMLDivElement>({ stagger: 0.1 });
  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
      {items.map((it, i) => (
        <div
          key={it.title}
          className="reveal-init surface p-6 md:p-7 flex flex-col gap-3"
        >
          <div className="mono text-[11px] uppercase tracking-[0.14em] text-[var(--accent)]">
            0{i + 1}
          </div>
          <h3 className="serif text-xl leading-snug text-[var(--fg-primary)]">
            {it.title}
          </h3>
          <p className="text-[var(--fg-secondary)] text-[0.95rem] leading-relaxed">
            {it.body}
          </p>
        </div>
      ))}
    </div>
  );
}

export function FeatureCTA() {
  const { t } = useLocale();
  return (
    <section className="py-20 md:py-28 border-b border-[var(--border-soft)]">
      <div className="container-app">
        <div className="surface p-8 md:p-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="max-w-xl">
            <h3 className="serif text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.15] text-[var(--fg-primary)]">
              {t.features.cta.heading}
            </h3>
            <p className="mt-3 text-[var(--fg-secondary)]">
              {t.features.cta.lead}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a {...DEMO_LINK_PROPS} className="btn btn-primary">
              {t.cta.getDemo}
            </a>
            <Link href="/docs" className="btn btn-ghost arrow-link">
              {t.cta.readDocs}
              <ArrowRight className="arrow h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SectionLead({ children }: { children: ReactNode }) {
  return (
    <p className="max-w-3xl text-[var(--fg-secondary)] text-lg leading-relaxed">
      {children}
    </p>
  );
}

export function KeyValueList({
  items,
}: {
  items: Array<{ key: string; value: ReactNode }>;
}) {
  return (
    <dl className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-y-4 gap-x-6 text-[0.95rem]">
      {items.map((it, i) => (
        <div key={i} className="contents">
          <dt className="mono text-[11px] uppercase tracking-[0.14em] text-[var(--fg-tertiary)] pt-0.5">
            {it.key}
          </dt>
          <dd className="text-[var(--fg-secondary)]">{it.value}</dd>
        </div>
      ))}
    </dl>
  );
}
