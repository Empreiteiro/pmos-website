"use client";

import Link from "next/link";
import { Logo } from "./logo";
import { useLocale } from "./locale-provider";

export function Footer() {
  const { t } = useLocale();
  const year = new Date().getFullYear();

  return (
    <footer className="pb-10 pt-6 border-t border-[var(--border-soft)]">
      <div className="container-app">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 md:gap-10 pt-12">
          <div className="col-span-2">
            <Logo />
            <p className="mt-4 text-sm text-[var(--fg-secondary)] max-w-xs leading-relaxed">
              {t.footer.tagline}
            </p>
          </div>
          {t.footer.columns.map((col) => (
            <div key={col.heading}>
              <div className="mono text-[11px] uppercase tracking-[0.14em] text-[var(--fg-tertiary)] mb-4">
                {col.heading}
              </div>
              <ul className="space-y-2.5">
                {col.links.map((l) =>
                  l.external ? (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-[var(--fg-secondary)] hover:text-[var(--fg-primary)] transition-colors"
                      >
                        {l.label}
                      </a>
                    </li>
                  ) : (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="text-sm text-[var(--fg-secondary)] hover:text-[var(--fg-primary)] transition-colors"
                      >
                        {l.label}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-6 border-t border-[var(--border-soft)] text-xs text-[var(--fg-tertiary)]">
          <div className="text-center">{t.footer.copy(year)}</div>
        </div>
      </div>
    </footer>
  );
}
