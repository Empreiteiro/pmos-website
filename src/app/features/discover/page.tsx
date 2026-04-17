import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import {
  FeatureHero,
  FeatureSection,
  FlowSteps,
  FeatureTable,
  Callout,
  BulletList,
  HighlightGrid,
  FeatureCTA,
  SectionLead,
  Prose,
} from "@/components/feature-page-parts";
import { getServerDict } from "@/lib/i18n/server";
import { makeT } from "@/lib/i18n/t";

export const metadata: Metadata = {
  title: "Discover — PMOS",
  description:
    "What's new in the world for your product's domain. Research, industry and trends sources, auto-configurable from your topics, producing an editable module report.",
};

export default async function DiscoverPage() {
  const { locale } = await getServerDict();
  const T = makeT(locale);

  return (
    <>
      <Header />
      <main>
        <FeatureHero
          eyebrow="Discover"
          oneLiner={T(
            "What's new in the world for your product's domain.",
            "O que é novo no mundo para o domínio do seu produto."
          )}
          lead={T(
            "Research, industry and trends sources — auto-configurable from your topics — producing an editable report with highlights, themes and categories. Streams step-by-step progress.",
            "Fontes de research, indústria e trends — auto-configuráveis a partir dos seus topics — produzindo um report editável com highlights, themes e categorias. Faz stream do progresso passo a passo."
          )}
        />

        <FeatureSection
          eyebrow={T("What it is", "O que é")}
          heading={T(
            "Your product's news feed, curated by agents.",
            "O feed de notícias do seu produto, curado por agentes."
          )}
        >
          <Prose>
            <p>
              {T(
                "Discover pulls from broad research, industry and trends sources (Hacker News, arXiv, company blogs, Product Hunt, Hugging Face, Google Trends, Exploding Topics, and more). Each item is passed through a cheap pre-filter that tags it with labels like ",
                "O Discover puxa de fontes de research, indústria e trends (Hacker News, arXiv, blogs de empresas, Product Hunt, Hugging Face, Google Trends, Exploding Topics, e mais). Cada item passa por um pre-filter barato que etiqueta com labels como "
              )}
              <code className="mono text-[13px] text-[var(--fg-primary)]">trend</code>,{" "}
              <code className="mono text-[13px] text-[var(--fg-primary)]">pain point</code>,{" "}
              <code className="mono text-[13px] text-[var(--fg-primary)]">feature request</code>,{" "}
              <code className="mono text-[13px] text-[var(--fg-primary)]">bug report</code>
              {T(
                ", and writes a one-line summary. The agent then generates a module report: highlights, themes, and categories.",
                ", e escreve um resumo de uma linha. O agente depois gera um report do módulo: highlights, themes e categorias."
              )}
            </p>
          </Prose>
        </FeatureSection>

        <FeatureSection
          eyebrow={T("How it works", "Como funciona")}
          heading={T(
            "Three steps: configure, collect, generate.",
            "Três passos: configurar, coletar, gerar."
          )}
        >
          <SectionLead>
            {T(
              "Smart-configure reads your product's topics and activates matching sources. Collection runs on a schedule (or on demand). Generation streams back step events over SSE.",
              "O smart-configure lê os topics do seu produto e ativa os sources correspondentes. A coleta roda em schedule (ou on demand). A geração transmite step events via SSE."
            )}
          </SectionLead>

          <div className="mt-10">
            <FlowSteps
              steps={[
                {
                  n: "1",
                  title: T("Smart-configure", "Smart-configure"),
                  mono: "POST /modules/discover/smart-configure",
                  body: T(
                    "The agent reads the product's topics and competitors and proposes which sources to activate (e.g. specific subreddits, arXiv categories, company blogs). You approve before anything runs.",
                    "O agente lê os topics e competidores do produto e propõe quais sources ativar (subreddits específicos, categorias arXiv, blogs de empresas). Você aprova antes de qualquer coisa rodar."
                  ),
                },
                {
                  n: "2",
                  title: T("Collect", "Collect"),
                  mono: "POST /modules/discover/collect (SSE)",
                  body: T(
                    "Collectors run in parallel. Each item goes through a Haiku-based pre-filter that labels it and writes a short summary. Items below the relevance threshold are dropped.",
                    "Os coletores rodam em paralelo. Cada item passa por um pre-filter com Haiku que etiqueta e escreve um resumo curto. Itens abaixo do threshold de relevância são descartados."
                  ),
                },
                {
                  n: "3",
                  title: T("Generate", "Generate"),
                  mono: "POST /modules/discover/generate/stream (SSE)",
                  body: T(
                    "The module report is produced and streamed event-by-event. Regenerate on demand; every prior report is kept in history so you can compare week-over-week.",
                    "O report do módulo é produzido e transmitido evento por evento. Regenere on demand; todos os reports anteriores ficam no histórico para comparar semana-a-semana."
                  ),
                },
                {
                  n: "4",
                  title: T("Ask", "Ask"),
                  mono: "POST /modules/discover/chat",
                  body: T(
                    "The module has its own chat tab — ask ad-hoc questions against the filtered items without leaving the page.",
                    "O módulo tem sua própria aba de chat — pergunte ad-hoc sobre os itens filtrados sem sair da página."
                  ),
                },
              ]}
            />
          </div>

          <div className="mt-12">
            <Callout title={T("SSE events", "SSE events")}>
              <BulletList
                items={[
                  {
                    label: "source_start",
                    mono: true,
                    body: T("source N is collecting now", "source N está coletando agora"),
                  },
                  {
                    label: "source_complete",
                    mono: true,
                    body: T("source finished, returns item count", "source terminou, retorna contagem de itens"),
                  },
                  {
                    label: "prefilter_progress",
                    mono: true,
                    body: T("pre-filter pass progress per item", "progresso do pre-filter por item"),
                  },
                  {
                    label: "step",
                    mono: true,
                    body: T("report generation step (highlights → themes → categories)", "step da geração do report (highlights → themes → categorias)"),
                  },
                  {
                    label: "done",
                    mono: true,
                    body: T("whole run finished", "run inteira concluída"),
                  },
                ]}
              />
            </Callout>
          </div>
        </FeatureSection>

        <FeatureSection
          eyebrow={T("Sources", "Sources")}
          heading={T(
            "The collectors wired into Discover.",
            "Os coletores plugados no Discover."
          )}
        >
          <FeatureTable
            headers={[T("Group", "Grupo"), T("Collectors", "Coletores")]}
            rows={[
              [
                "Research & Community",
                "Hacker News, Reddit, Hugging Face, arXiv, Product Hunt, LMSYS / LiveBench, There's An AI For That, Exploding Topics",
              ],
              [
                "Industry",
                "Anthropic Blog, OpenAI Blog, DeepMind, Artificial Analysis, generic RSS/Atom",
              ],
              [
                "Trends",
                "Google Trends, PyPI Trends, Web Search (MCP), Website Deep Scrape",
              ],
            ]}
          />
          <p className="mt-6 text-[var(--fg-secondary)] max-w-3xl leading-relaxed">
            {T(
              "Each collector has a frequency (how often it runs), a module allowlist (which of Discover/Listen/Compare can use it), and a per-instance config (query terms, subreddits, categories…). You can collect now, pre-filter on demand, or delete the instance from the Sources page.",
              "Cada coletor tem uma frequência (com que periodicidade roda), uma allowlist de módulo (quais dos Discover/Listen/Compare podem usá-lo), e uma config por instância (query terms, subreddits, categorias…). Você pode coletar agora, pre-filtrar on demand, ou deletar a instância na página Sources."
            )}
          </p>
        </FeatureSection>

        <FeatureSection
          eyebrow="Highlights"
          heading={T(
            "Three things that matter day-to-day.",
            "Três coisas que fazem diferença no dia-a-dia."
          )}
        >
          <HighlightGrid
            items={[
              {
                title: T(
                  "Curated, not a firehose",
                  "Curado, não um firehose"
                ),
                body: T(
                  "Every item is pre-filtered and labeled before it reaches the report — you see summaries + categories, not raw RSS.",
                  "Cada item é pré-filtrado e etiquetado antes de chegar no report — você vê resumos + categorias, não RSS cru."
                ),
              },
              {
                title: T(
                  "Report history",
                  "Histórico de reports"
                ),
                body: T(
                  "Every generation is stored. Compare this week's highlights with last week's without running anything again.",
                  "Toda geração é armazenada. Compare os highlights desta semana com os da semana passada sem rodar nada de novo."
                ),
              },
              {
                title: T(
                  "Chat the feed",
                  "Chat no feed"
                ),
                body: T(
                  "Each module has its own chat scoped to the filtered items — no cross-product contamination.",
                  "Cada módulo tem seu próprio chat escopado nos itens filtrados — sem contaminação entre produtos."
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
