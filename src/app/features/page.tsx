import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PreFooter } from "@/components/pre-footer";
import { getServerDict } from "@/lib/i18n/server";

export const metadata: Metadata = {
  title: "Modules — PMOS",
  description:
    "The PMOS modules: Discover, Aggregate, PRDs and Sources. Each module is scoped to a product and produces a distinct output.",
};

export default async function FeaturesIndex() {
  const { t } = await getServerDict();
  return (
    <>
      <Header />
      <main>
        <section
          aria-hidden
          className="pt-36 md:pt-44 pb-4 border-b border-[var(--border-soft)]"
        >
          <div className="container-app">
            <div className="mono text-[11px] uppercase tracking-[0.14em] text-[var(--fg-tertiary)]">
              {t.features.index.eyebrow}
            </div>
            <h1 className="serif serif-display text-[clamp(2.5rem,6vw,5rem)] leading-[1.02] tracking-[-0.02em] text-[var(--fg-primary)] mt-4 max-w-4xl">
              {t.features.index.heading}
            </h1>
            <p className="mt-5 max-w-2xl text-[var(--fg-secondary)] text-lg">
              {t.features.index.lead}
            </p>
          </div>
        </section>

        <section className="py-14 md:py-20">
          <div className="container-app grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            {t.features.index.items.map((f) => (
              <Link
                key={f.slug}
                href={`/features/${f.slug}`}
                className="group surface p-7 md:p-8 flex flex-col gap-4 hover:border-[var(--border)] hover:bg-[var(--bg-tertiary)] transition-colors"
              >
                <div className="mono text-[11px] uppercase tracking-[0.14em] text-[var(--accent)]">
                  {f.eyebrow}
                </div>
                <h2 className="serif text-[1.6rem] md:text-[1.9rem] leading-[1.1] text-[var(--fg-primary)]">
                  {f.headline}
                </h2>
                <p className="text-[var(--fg-secondary)] leading-relaxed">
                  {f.body}
                </p>
                <div className="arrow-link mt-2 inline-flex items-center gap-1.5 text-sm text-[var(--fg-secondary)]">
                  {t.features.index.seeDetails}
                  <ArrowRight className="arrow h-3.5 w-3.5" aria-hidden />
                </div>
              </Link>
            ))}
          </div>
        </section>

        <PreFooter />
      </main>
      <Footer />
    </>
  );
}
