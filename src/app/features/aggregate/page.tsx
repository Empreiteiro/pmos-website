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
  SectionLead,
  Prose,
  KeyValueList,
} from "@/components/feature-page-parts";
import { getServerDict } from "@/lib/i18n/server";
import { makeT } from "@/lib/i18n/t";

export const metadata: Metadata = {
  title: "Aggregate — PMOS",
  description:
    "Cross-module synthesis into feature suggestions. Labeled items from Discover, Listen and Compare become clustered opportunities — each linked back to its evidence.",
};

export default async function AggregatePage() {
  const { locale } = await getServerDict();
  const T = makeT(locale);

  return (
    <>
      <Header />
      <main>
        <FeatureHero
          eyebrow="Aggregate"
          oneLiner={T(
            "Cross-module synthesis into feature suggestions.",
            "Síntese cross-module em sugestões de feature."
          )}
          lead={T(
            "Labeled items from Discover, Listen and Compare feed an LLM that clusters them into opportunities. Every suggestion links back to the evidence that backs it.",
            "Itens etiquetados do Discover, Listen e Compare alimentam um LLM que agrupa em oportunidades. Cada sugestão aponta de volta para as evidências que a sustentam."
          )}
        />

        <FeatureSection
          eyebrow={T("What it is", "O que é")}
          heading={T(
            "Where three module feeds collapse into one list of bets.",
            "Onde três feeds de módulo colapsam numa só lista de apostas."
          )}
        >
          <Prose>
            <p>
              {T(
                "Each module produces a stream of labeled items. Aggregate is where those streams meet: one LLM pass reads the combined corpus — scoped to the active product — and produces a batch of ",
                "Cada módulo produz um stream de itens etiquetados. O Aggregate é onde os streams se encontram: um pass de LLM lê o corpus combinado — escopado no produto ativo — e produz um batch de "
              )}
              <em>{T("feature suggestions", "sugestões de feature")}</em>
              {T(
                ". Each suggestion has a title, a one-paragraph rationale, a signal strength, categories, and links back to the items that justify it.",
                ". Cada sugestão tem título, justificativa de um parágrafo, força do sinal, categorias, e links de volta para os itens que a justificam."
              )}
            </p>
          </Prose>
        </FeatureSection>

        <FeatureSection
          eyebrow={T("Flow", "Fluxo")}
          heading={T(
            "Generate → inspect → write PRD.",
            "Gerar → inspecionar → escrever PRD."
          )}
        >
          <SectionLead>
            {T(
              "Every run is a snapshot batch. You keep history, cycle between batches, and only the current one is editable. Writing a PRD from a card triggers the PRD writer with the evidence attached.",
              "Cada run é um batch snapshot. Você mantém histórico, cicla entre batches, e só o atual é editável. Escrever um PRD a partir de um card dispara o PRD writer com as evidências anexadas."
            )}
          </SectionLead>

          <div className="mt-10">
            <FlowSteps
              steps={[
                {
                  n: "1",
                  title: T("Generate batch", "Gerar batch"),
                  mono: "POST /aggregate/generate",
                  body: T(
                    "The LLM reads labeled items from Discover, Listen and Compare, clusters related signals, and writes suggestion cards. Inspect the prompt first via prompt-preview.",
                    "O LLM lê itens etiquetados do Discover, Listen e Compare, agrupa sinais relacionados, e escreve cards de sugestão. Inspecione o prompt antes via prompt-preview."
                  ),
                },
                {
                  n: "2",
                  title: T("Inspect evidence", "Inspecionar evidência"),
                  mono: "GET /suggestions/{id}/evidence",
                  body: T(
                    "Each card expands to reveal the items it was built from — source, title, module of origin, summary, and relevance score.",
                    "Cada card expande para revelar os itens de onde foi construído — source, título, módulo de origem, resumo, e score de relevância."
                  ),
                },
                {
                  n: "3",
                  title: T("Write PRD", "Escrever PRD"),
                  mono: "POST /suggestions/{id}/write-prd",
                  body: T(
                    "The PRD writer runs a competitor research loop, then drafts a markdown PRD scoped to the suggestion. It lands in /prds ready to edit.",
                    "O PRD writer roda um loop de pesquisa de competidor, depois escreve um PRD em markdown escopado na sugestão. Aterrissa em /prds pronto para editar."
                  ),
                },
                {
                  n: "4",
                  title: T("Cycle batches", "Ciclar batches"),
                  mono: "GET /aggregate/batches",
                  body: T(
                    "Old batches never disappear. Scroll through them to see how the week changed what the system considered a bet.",
                    "Batches antigos nunca somem. Role por eles para ver como a semana mudou o que o sistema considerou uma aposta."
                  ),
                },
              ]}
            />
          </div>

          <div className="mt-12">
            <Callout title={T("What a suggestion card shows", "O que um card de sugestão mostra")}>
              <BulletList
                items={[
                  { label: T("Title", "Título"), body: T("one-line feature name", "nome da feature em uma linha") },
                  { label: T("Rationale", "Justificativa"), body: T("a short paragraph explaining the opportunity", "um parágrafo curto explicando a oportunidade") },
                  { label: T("Signal strength", "Força do sinal"), body: T("how often / how loudly the items backed this", "com que frequência / intensidade os itens sustentaram isso") },
                  { label: T("Categories", "Categorias"), body: T("a handful of accent-tinted tags", "algumas tags com tint de accent") },
                  { label: T("Evidence links", "Links de evidência"), body: T("expand-on-click, grouped by module", "expand-on-click, agrupados por módulo") },
                  { label: T("Module of origin", "Módulo de origem"), body: T("Discover · Listen · Compare", "Discover · Listen · Compare") },
                ]}
              />
            </Callout>
          </div>
        </FeatureSection>

        <FeatureSection
          eyebrow={T("Under the hood", "Por baixo do capô")}
          heading={T(
            "Snapshot batches kept in SQLite.",
            "Batches snapshot guardados no SQLite."
          )}
        >
          <KeyValueList
            items={[
              {
                key: T("Table", "Tabela"),
                value: (
                  <>
                    <code className="mono text-[13px] text-[var(--fg-primary)]">feature_suggestions</code>{" "}
                    {T("— one row per card, with ", "— uma linha por card, com ")}
                    <code className="mono text-[13px]">prd_content</code> {T("and ", "e ")}
                    <code className="mono text-[13px]">github_issue_url</code>{" "}
                    {T("persisted back.", "persistidos de volta.")}
                  </>
                ),
              },
              {
                key: T("Batching", "Batching"),
                value: T(
                  "Every generate writes a batch identifier. Old batches stay readable; only the current one is editable.",
                  "Cada generate escreve um identificador de batch. Batches antigos ficam legíveis; só o atual é editável."
                ),
              },
              {
                key: T("Evidence", "Evidência"),
                value: T(
                  "Evidence links are item IDs, so a signal can appear in multiple suggestions without duplication.",
                  "Links de evidência são IDs de item, então um sinal pode aparecer em múltiplas sugestões sem duplicação."
                ),
              },
              {
                key: T("Prompt preview", "Preview do prompt"),
                value: T(
                  "Before generating, you can inspect the exact system prompt + item corpus that will go to the agent.",
                  "Antes de gerar, você pode inspecionar o system prompt exato + corpus de itens que irá ao agente."
                ),
              },
            ]}
          />
        </FeatureSection>

        <FeatureSection
          eyebrow="Highlights"
          heading={T(
            "Why Aggregate is the heart of the pipeline.",
            "Por que o Aggregate é o coração da pipeline."
          )}
        >
          <HighlightGrid
            items={[
              {
                title: T("Evidence-linked", "Com evidência linkada"),
                body: T(
                  "Every opportunity is grounded in specific items from specific sources. No free-floating LLM guessing.",
                  "Toda oportunidade é ancorada em itens específicos de fontes específicas. Sem achismo de LLM."
                ),
              },
              {
                title: T("Batches are snapshots", "Batches são snapshots"),
                body: T(
                  "Re-running never overwrites; you build a timeline of what was considered promising week over week.",
                  "Re-rodar nunca sobrescreve; você constrói uma linha do tempo do que foi considerado promissor semana a semana."
                ),
              },
              {
                title: T("One-click PRD", "PRD em 1 clique"),
                body: T(
                  "A card becomes a spec in one action. No context loss between synthesis and handoff.",
                  "Um card vira spec em uma ação. Sem perda de contexto entre síntese e handoff."
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
