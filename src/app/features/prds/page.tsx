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
  CodeBlock,
} from "@/components/feature-page-parts";
import { getServerDict } from "@/lib/i18n/server";
import { makeT } from "@/lib/i18n/t";

export const metadata: Metadata = {
  title: "PRDs — PMOS",
  description:
    "A full-page PRD editor with auto-save, GFM preview, and a Send to GitHub button that creates an issue and persists the URL back on the suggestion.",
};

export default async function PRDsPage() {
  const { locale } = await getServerDict();
  const T = makeT(locale);

  return (
    <>
      <Header />
      <main>
        <FeatureHero
          eyebrow="PRDs"
          oneLiner={T(
            "Auto-generated specs, one-click GitHub handoff.",
            "Specs gerados, handoff 1-click para o GitHub."
          )}
          lead={T(
            "A full-page markdown editor with debounced autosave, GFM preview with task lists, and a Send to GitHub button that creates an issue on the configured repo — duplicate sends blocked, URL persisted back.",
            "Editor full-page em markdown com autosave debounced, preview GFM com task lists, e um botão Send to GitHub que cria issue no repo configurado — envios duplicados bloqueados, URL persistida de volta."
          )}
        />

        <FeatureSection
          eyebrow={T("What it is", "O que é")}
          heading={T(
            "The last step before a ticket lives in your tracker.",
            "O último passo antes do ticket viver no seu tracker."
          )}
        >
          <Prose>
            <p>
              {T(
                "PRDs is the final, editable artifact in the PMOS pipeline. A PRD can arrive there two ways: auto-generated from an Aggregate suggestion (with competitor research baked in), or created manually from scratch. Either way, once you hit Send to GitHub, the spec becomes an issue and the URL is persisted back so the app can't double-send.",
                "O /prds é o último artefato editável na pipeline do PMOS. Um PRD pode chegar lá de duas formas: auto-gerado de uma sugestão do Aggregate (com pesquisa de competidor embutida), ou criado manual do zero. De qualquer jeito, quando você clica Send to GitHub, o spec vira issue e a URL é persistida de volta para o app não fazer envio duplo."
              )}
            </p>
          </Prose>
        </FeatureSection>

        <FeatureSection
          eyebrow={T("Flow", "Fluxo")}
          heading={T(
            "Four moves: open, edit, preview, send.",
            "Quatro movimentos: abrir, editar, preview, enviar."
          )}
        >
          <SectionLead>
            {T(
              "The editor autosaves on a debounce. Preview renders GitHub-flavored Markdown including task lists. Send creates the issue synchronously and blocks a second send with HTTP 409.",
              "O editor faz autosave com debounce. O preview renderiza GitHub-flavored Markdown, incluindo task lists. Send cria a issue de forma síncrona e bloqueia um segundo send com HTTP 409."
            )}
          </SectionLead>

          <div className="mt-10">
            <FlowSteps
              steps={[
                {
                  n: "1",
                  title: T("Open", "Abrir"),
                  mono: "GET /products/{id}/prds/{pid}",
                  body: T(
                    "Title and markdown content are loaded into the editor. If this PRD originated from a suggestion, the link back is shown in the header.",
                    "Título e conteúdo em markdown são carregados no editor. Se esse PRD veio de uma sugestão, o link de volta aparece no header."
                  ),
                },
                {
                  n: "2",
                  title: T("Edit", "Editar"),
                  mono: "PATCH /prds/{pid} (debounced)",
                  body: T(
                    "Each keystroke schedules a PATCH after the debounce window. No save button — the subtle status indicator in the header is the source of truth.",
                    "Cada tecla agenda um PATCH após a janela de debounce. Sem botão de save — o indicador de status discreto no header é a source of truth."
                  ),
                },
                {
                  n: "3",
                  title: "Preview",
                  body: T(
                    "Switch to the Preview tab to see the spec rendered as GFM: headings, tables, code, task lists. Matches what GitHub will show.",
                    "Troque para a aba Preview para ver o spec renderizado como GFM: headings, tabelas, código, task lists. Idêntico ao que o GitHub mostrará."
                  ),
                },
                {
                  n: "4",
                  title: T("Send to GitHub", "Enviar para o GitHub"),
                  mono: "POST /products/{id}/github/issues",
                  body: T(
                    "An issue is created using the per-product PAT. On success, the issue URL is persisted back on the suggestion; subsequent sends return 409.",
                    "Uma issue é criada usando o PAT por produto. No sucesso, a URL da issue é persistida de volta na sugestão; envios subsequentes retornam 409."
                  ),
                },
              ]}
            />
          </div>

          <div className="mt-12">
            <Callout title={T("Send to GitHub — contract", "Send to GitHub — contrato")}>
              <CodeBlock>{`POST /api/products/{id}/github/issues

{
  "prd_id": "prd_abc123",
  "suggestion_id": "sug_xyz789",   // optional — when PRD came from Aggregate
  "labels": ["from-pmos"],          // optional
  "assignees": []                   // optional
}

→ 201  { "issue_url": "https://github.com/owner/repo/issues/42" }
→ 409  { "error": "already_sent", "issue_url": "…" }
→ 422  { "error": "github_repo not configured" }`}</CodeBlock>
            </Callout>
          </div>
        </FeatureSection>

        <FeatureSection
          eyebrow={T("Integration", "Integração")}
          heading={T(
            "One GitHub PAT per product, stored masked.",
            "Um PAT do GitHub por produto, guardado mascarado."
          )}
        >
          <Prose>
            <p>
              {T(
                "Each product can be wired to its own GitHub repo + fine-grained PAT with ",
                "Cada produto pode ser plugado no seu próprio repo do GitHub + PAT fine-grained com "
              )}
              <code className="mono text-[13px] text-[var(--fg-primary)]">
                Issues: Read and write
              </code>
              {T(
                ". The token is stored masked — reads show ",
                ". O token é guardado mascarado — reads mostram "
              )}
              <code className="mono text-[13px]">••••••••</code>{" "}
              {T("plus the last 4 chars, and a ", "mais os 4 últimos chars, e um ")}
              <code className="mono text-[13px]">github_token_set</code>{" "}
              {T(
                "boolean. Update the token and the server rotates it without ever exposing the old value.",
                "booleano. Atualize o token e o server faz rotation sem expor o valor antigo."
              )}
            </p>
          </Prose>

          <div className="mt-8">
            <FeatureTable
              headers={[T("Field", "Campo"), T("Behavior", "Comportamento")]}
              rows={[
                [
                  "github_repo",
                  T(
                    "URL or owner/repo. Normalized server-side to the owner/repo form.",
                    "URL ou owner/repo. Normalizado no server para o formato owner/repo."
                  ),
                ],
                [
                  "github_token",
                  T(
                    "Write-only in the API. Read responses return github_token_set: true/false.",
                    "Write-only na API. Responses de read retornam github_token_set: true/false."
                  ),
                ],
                [
                  "issue_url",
                  T(
                    "Persisted back on the suggestion so duplicate sends can 409.",
                    "Persistido de volta na sugestão para envios duplicados retornarem 409."
                  ),
                ],
                [
                  "labels",
                  T(
                    "Optional; applied to the created issue at send time.",
                    "Opcional; aplicadas na issue criada no momento do send."
                  ),
                ],
              ]}
            />
          </div>
        </FeatureSection>

        <FeatureSection
          eyebrow="Highlights"
          heading={T(
            "Three details that matter.",
            "Três detalhes que fazem diferença."
          )}
        >
          <HighlightGrid
            items={[
              {
                title: T("Autosave you can trust", "Autosave em que você pode confiar"),
                body: T(
                  "Debounced, with a visible status. Nothing is lost if you navigate away.",
                  "Debounced, com status visível. Nada é perdido se você sair da página."
                ),
              },
              {
                title: T("Real GFM preview", "Preview GFM de verdade"),
                body: T(
                  "Task lists, tables, fenced code blocks — exactly what the GitHub issue will render.",
                  "Task lists, tabelas, blocos de código — exatamente o que a issue no GitHub vai renderizar."
                ),
              },
              {
                title: T("No double-sends", "Sem envios duplicados"),
                body: T(
                  "A second Send is blocked with 409 and the existing URL; no orphan issues.",
                  "Um segundo Send é bloqueado com 409 e a URL existente; zero issues órfãs."
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
