import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import {
  FeatureHero,
  FeatureSection,
  FlowSteps,
  Callout,
  BulletList,
  HighlightGrid,
  FeatureCTA,
  FeatureTable,
  SectionLead,
  Prose,
} from "@/components/feature-page-parts";
import { getServerDict } from "@/lib/i18n/server";
import { makeT } from "@/lib/i18n/t";

export const metadata: Metadata = {
  title: "Sources — PMOS",
  description:
    "30+ collectors, pluggable per product. Inspect each source, collect on demand, pre-filter items, and discover new ones via URL paste or the built-in search helpers.",
};

export default async function SourcesPage() {
  const { locale } = await getServerDict();
  const T = makeT(locale);

  return (
    <>
      <Header />
      <main>
        <FeatureHero
          eyebrow="Sources"
          oneLiner={T(
            "30+ collectors, pluggable, per product.",
            "30+ coletores, pluggable, por produto."
          )}
          lead={T(
            "A per-product catalog of every source activated across the three modules. Inspect, collect now, pre-filter on demand, edit config, and discover new sources via URL paste or built-in search helpers.",
            "Um catálogo por produto de cada source ativo nos três módulos. Inspecione, colete agora, pre-filtre on demand, edite config, e descubra novos sources via paste de URL ou helpers de busca embutidos."
          )}
        />

        <FeatureSection
          eyebrow={T("What it is", "O que é")}
          heading={T(
            "One screen for every collector you've activated.",
            "Uma tela para cada coletor que você ativou."
          )}
        >
          <Prose>
            <p>
              {T(
                "Sources is the cross-module view of every activated source for the current product. Each row shows the source type, the module(s) it feeds, the last run timestamp, item count, and the pre-filter prompt. A drawer exposes sample items, full config, and per-source actions.",
                "O Sources é a visão cross-module de cada source ativo para o produto atual. Cada linha mostra o tipo de source, o(s) módulo(s) que alimenta, timestamp do último run, contagem de itens, e o prompt do pre-filter. Um drawer expõe itens de amostra, config completa, e ações por source."
              )}
            </p>
          </Prose>
        </FeatureSection>

        <FeatureSection
          eyebrow={T("Flow", "Fluxo")}
          heading={T(
            "Activate, collect, pre-filter, inspect.",
            "Ativar, coletar, pre-filtrar, inspecionar."
          )}
        >
          <SectionLead>
            {T(
              "Sources are activated either by smart-configure (agent proposes, you approve) or manually through discovery helpers. Each activated source is an instance with its own config.",
              "Sources são ativados ou pelo smart-configure (agente propõe, você aprova) ou manualmente através dos helpers de discovery. Cada source ativado é uma instância com sua própria config."
            )}
          </SectionLead>

          <div className="mt-10">
            <FlowSteps
              steps={[
                {
                  n: "1",
                  title: T("Activate", "Ativar"),
                  mono: "POST /products/{id}/sources",
                  body: T(
                    "Pick a source type from the registry, configure it (subreddits, query terms, channel handles, etc.), and assign it to one or more modules. The module allowlist on the collector defines where it can be used.",
                    "Escolha um source type do registry, configure (subreddits, query terms, handles de canal, etc.), e atribua a um ou mais módulos. A allowlist de módulo do coletor define onde pode ser usado."
                  ),
                },
                {
                  n: "2",
                  title: T("Collect now", "Coletar agora"),
                  mono: "POST /sources/{sid}/collect",
                  body: T(
                    "Ignore the schedule and pull fresh items. Useful when you just added the source or want the latest before a report regen.",
                    "Ignore o schedule e puxe itens frescos. Útil quando você acabou de adicionar o source ou quer o mais novo antes de um regen de report."
                  ),
                },
                {
                  n: "3",
                  title: T("Pre-filter", "Pre-filter"),
                  mono: "POST /sources/{sid}/pre-filter",
                  body: T(
                    "Re-run the labeling pass on existing items without re-collecting. Ideal when you've tuned the pre-filter prompt and want to apply the new rules retroactively.",
                    "Re-rode o pass de labeling nos itens existentes sem re-coletar. Ideal quando você ajustou o prompt do pre-filter e quer aplicar as novas regras retroativamente."
                  ),
                },
                {
                  n: "4",
                  title: T("Inspect", "Inspecionar"),
                  mono: "drawer · sample items",
                  body: T(
                    "Open the source drawer to see recent items, the full config, and the active pre-filter prompt. Edit config inline; changes take effect next run.",
                    "Abra o drawer do source para ver itens recentes, a config completa, e o prompt do pre-filter ativo. Edite config inline; mudanças valem a partir do próximo run."
                  ),
                },
              ]}
            />
          </div>

          <div className="mt-12">
            <Callout title={T("Per-source actions", "Ações por source")}>
              <BulletList
                items={[
                  { label: T("Collect now", "Collect now"), body: T("fresh pull, ignores schedule", "pull fresco, ignora schedule") },
                  { label: T("Pre-filter", "Pre-filter"), body: T("re-label existing items", "re-etiqueta itens existentes") },
                  { label: T("Edit config", "Edit config"), body: T("inline config form, takes effect next run", "form inline, vale a partir do próximo run") },
                  { label: T("Delete", "Delete"), body: T("deactivates the instance (items remain)", "desativa a instância (itens permanecem)") },
                  { label: T("Sample", "Amostra"), body: T("inspect the last N items the source produced", "inspecione os últimos N itens produzidos") },
                ]}
              />
            </Callout>
          </div>
        </FeatureSection>

        <FeatureSection
          eyebrow={T("Discovery", "Discovery")}
          heading={T(
            "Four ways to find new sources.",
            "Quatro formas de achar novos sources."
          )}
        >
          <FeatureTable
            headers={[T("Target", "Alvo"), T("How", "Como"), T("Endpoint", "Endpoint")]}
            rows={[
              [
                "GitHub",
                T(
                  "Search by org / repo / topic. Adds repo PRs, issues, discussions, or releases as sources.",
                  "Buscar por org / repo / topic. Adiciona PRs, issues, discussions ou releases do repo como sources."
                ),
                <code key="gh" className="mono text-[13px]">/api/github/search</code>,
              ],
              [
                "Reddit",
                T(
                  "Search subreddits by keyword. Activate one — or a whole batch — with query terms and min score.",
                  "Busca subreddits por keyword. Ative um — ou um batch — com query terms e min score."
                ),
                <code key="rd" className="mono text-[13px]">/api/reddit/search</code>,
              ],
              [
                "YouTube",
                T(
                  "Channel search. Once activated, uses the channel's RSS feed for uploads.",
                  "Busca de canal. Uma vez ativado, usa o feed RSS do canal para uploads."
                ),
                <code key="yt" className="mono text-[13px]">/api/youtube/search</code>,
              ],
              [
                "LinkedIn",
                T(
                  "Company / person search for activity tracking.",
                  "Busca de empresa / pessoa para tracking de atividade."
                ),
                <code key="li" className="mono text-[13px]">/api/linkedin/search</code>,
              ],
              [
                T("Any URL", "Qualquer URL"),
                T(
                  "Paste a URL — the app detects if it's a blog (RSS), a GitHub repo, a YouTube channel, etc.",
                  "Cole uma URL — o app detecta se é um blog (RSS), repo do GitHub, canal do YouTube, etc."
                ),
                <code key="url" className="mono text-[13px]">/api/url/check</code>,
              ],
            ]}
          />
        </FeatureSection>

        <FeatureSection
          eyebrow={T("Registry", "Registry")}
          heading={T(
            "The full collector catalog.",
            "O catálogo completo de coletores."
          )}
        >
          <FeatureTable
            headers={[T("Group", "Grupo"), T("Collectors", "Coletores")]}
            rows={[
              [
                T("Research & Community", "Research & Community"),
                "Hacker News · Reddit · Hugging Face · arXiv · Product Hunt · LMSYS Arena · LiveBench · There's An AI For That · Exploding Topics",
              ],
              [
                T("Industry", "Industry"),
                "Anthropic Blog · OpenAI Blog · DeepMind · Artificial Analysis · Generic RSS / Atom",
              ],
              [
                "GitHub",
                T(
                  "GitHub Trending · per-repo PRs / Issues / Discussions / Releases",
                  "GitHub Trending · PRs / Issues / Discussions / Releases por repo"
                ),
              ],
              [
                T("Social & Reviews", "Social & Reviews"),
                "YouTube · Twitter / X · LinkedIn · App Store · Play Store",
              ],
              [
                T("Trends & Search", "Trends & Search"),
                T(
                  "Google Trends · PyPI Trends · Web Search (MCP-backed) · Website Deep Scrape",
                  "Google Trends · PyPI Trends · Web Search (MCP) · Website Deep Scrape"
                ),
              ],
            ]}
          />
        </FeatureSection>

        <FeatureSection
          eyebrow="Highlights"
          heading={T(
            "Three traits that make it pluggable.",
            "Três traços que tornam isso pluggable."
          )}
        >
          <HighlightGrid
            items={[
              {
                title: T("One module contract", "Um contrato por módulo"),
                body: T(
                  "Every collector subclasses a single base class and registers itself. Adding a new source is one Python file.",
                  "Todo coletor herda de uma mesma base class e se registra. Adicionar um novo source é um arquivo Python."
                ),
              },
              {
                title: T("Pre-filter per source", "Pre-filter por source"),
                body: T(
                  "The tagging prompt is editable per source. Noisy feeds get stricter rules without touching the others.",
                  "O prompt de tagging é editável por source. Feeds barulhentos ganham regras mais estritas sem mexer nos outros."
                ),
              },
              {
                title: T("Availability checks", "Checagens de disponibilidade"),
                body: T(
                  "Before a run, each source reports whether it's usable right now (credentials, rate limits).",
                  "Antes de um run, cada source reporta se está usável agora (credentials, rate limits)."
                ),
              },
            ]}
          />
        </FeatureSection>

        <FeatureCTA />
      </main>
      <Footer />
    </>
  );
}
