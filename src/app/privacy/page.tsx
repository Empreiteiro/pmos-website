import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PreFooter } from "@/components/pre-footer";
import { getServerDict } from "@/lib/i18n/server";

export const metadata: Metadata = {
  title: "Privacy Policy — PMOS",
  description: "How we handle the data you share with us when you visit this site or request a demo.",
};

export default async function PrivacyPage() {
  const { t } = await getServerDict();
  const p = t.privacy;

  return (
    <>
      <Header />
      <main>
        <section className="pt-36 md:pt-44 pb-10 border-b border-[var(--border-soft)]">
          <div className="container-app">
            <div className="mono text-[11px] uppercase tracking-[0.14em] text-[var(--accent)]">
              {p.eyebrow}
            </div>
            <h1 className="serif serif-display text-[clamp(2.25rem,5vw,4rem)] leading-[1.04] tracking-[-0.02em] text-[var(--fg-primary)] mt-4 max-w-4xl">
              {p.heading}
            </h1>
            <p className="mt-4 mono text-[12.5px] text-[var(--fg-tertiary)]">
              {p.lastUpdated}
            </p>
            <p className="mt-6 max-w-2xl text-[var(--fg-secondary)] text-lg leading-relaxed">
              {p.intro}
            </p>
          </div>
        </section>

        <section className="py-14 md:py-20">
          <div className="container-app">
            <div className="max-w-3xl space-y-14">
              {p.sections.map((s) => (
                <article key={s.heading}>
                  <h2 className="serif text-[clamp(1.4rem,2.5vw,2rem)] leading-[1.2] text-[var(--fg-primary)]">
                    {s.heading}
                  </h2>
                  <div className="mt-5 space-y-4 text-[var(--fg-secondary)] leading-relaxed">
                    {s.body}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <PreFooter />
      </main>
      <Footer />
    </>
  );
}
