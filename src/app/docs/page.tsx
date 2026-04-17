import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { EndpointRow } from "@/components/api-docs/endpoint-row";
import { getServerDict } from "@/lib/i18n/server";

export const metadata: Metadata = {
  title: "API Reference — PMOS",
  description:
    "The full PMOS API reference — products, sources, modules, aggregate, PRDs, and GitHub integration.",
};

export default async function DocsPage() {
  const { t } = await getServerDict();
  const docs = t.docs;

  return (
    <>
      <Header />
      <main>
        <section className="pt-36 md:pt-44 pb-10 border-b border-[var(--border-soft)]">
          <div className="container-app">
            <div className="mono text-[11px] uppercase tracking-[0.14em] text-[var(--accent)]">
              {docs.hero.eyebrow}
            </div>
            <h1 className="serif serif-display text-[clamp(2.25rem,5vw,4rem)] leading-[1.04] tracking-[-0.02em] text-[var(--fg-primary)] mt-4 max-w-4xl">
              {docs.hero.heading}
            </h1>
            <p className="mt-5 max-w-2xl text-[var(--fg-secondary)] text-lg leading-relaxed">
              {docs.hero.lead}
            </p>
          </div>
        </section>

        <div className="container-app py-10 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10 md:gap-14">
            <nav className="docs-sidebar hidden lg:block text-sm">
              <div className="sticky top-24 space-y-1">
                <div className="mono text-[11px] uppercase tracking-[0.14em] text-[var(--fg-tertiary)] mb-3">
                  Sections
                </div>
                {docs.groups.map((g) => (
                  <a
                    key={g.slug}
                    href={`#section-${g.slug}`}
                    className="block px-2 py-1.5 rounded-md text-[var(--fg-secondary)] hover:text-[var(--fg-primary)] hover:bg-[var(--bg-secondary)] transition-colors"
                  >
                    {g.title}
                  </a>
                ))}
              </div>
            </nav>

            <div className="min-w-0 space-y-20 md:space-y-28">
              {docs.groups.map((g) => (
                <section
                  key={g.slug}
                  id={`section-${g.slug}`}
                  className="scroll-mt-24"
                >
                  <div className="mb-8 md:mb-10 max-w-3xl">
                    <div className="mono text-[11px] uppercase tracking-[0.14em] text-[var(--fg-tertiary)]">
                      {g.slug}
                    </div>
                    <h2 className="serif text-[clamp(1.75rem,3.5vw,2.5rem)] leading-[1.15] mt-3 text-[var(--fg-primary)]">
                      {g.title}
                    </h2>
                    <p className="mt-4 text-[var(--fg-secondary)] leading-relaxed">
                      {g.blurb}
                    </p>
                  </div>
                  <div className="surface overflow-hidden">
                    {g.endpoints.map((ep, i) => (
                      <EndpointRow key={i} endpoint={ep} />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
