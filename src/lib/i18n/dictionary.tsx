import type { ReactNode } from "react";
import type { Locale } from "./types";

/* --------------------------------------------------------------------------
   PMOS — i18n dictionary.
-------------------------------------------------------------------------- */

type Dict = {
  nav: {
    primary: string;
    features: string;
    docs: string;
    getDemo: string;
    open: string;
    close: string;
    featuresItems: Array<{ title: string; description: string }>;
    docsItems: Array<{ title: string; description: string }>;
  };
  cta: {
    getDemo: string;
    readDocs: string;
    back: string;
  };
  footer: {
    tagline: string;
    columns: Array<{
      heading: string;
      links: Array<{ label: string; href: string; external?: boolean }>;
    }>;
    copy: (year: number) => string;
  };
  privacy: {
    eyebrow: string;
    heading: string;
    lastUpdated: string;
    intro: string;
    sections: Array<{ heading: string; body: ReactNode }>;
  };
  home: {
    hero: {
      eyebrow: string;
      headline: string;
      lead: string;
    };
    pipeline: {
      eyebrow: string;
      heading: string;
      lead: string;
      stages: Array<{ title: string; subtitle: string; body: string }>;
    };
    pillars: {
      eyebrow: string;
      heading: string;
      lead: string;
      items: Array<{ title: string; description: string }>;
    };
    chips: {
      eyebrow: string;
      heading: string;
      lead: string;
      items: Array<{ label: string; tooltip: string }>;
    };
    builtOn: {
      eyebrow: string;
    };
  };
  features: {
    back: string;
    cta: { heading: string; lead: string };
    index: {
      eyebrow: string;
      heading: string;
      lead: string;
      seeDetails: string;
      items: Array<{ slug: string; eyebrow: string; headline: string; body: string }>;
    };
  };
  docs: {
    hero: {
      eyebrow: string;
      heading: string;
      lead: ReactNode;
    };
    groups: Array<{
      slug: string;
      title: string;
      blurb: string;
      endpoints: Array<{
        method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
        path: string;
        purpose: string;
        flags?: Array<"SSE" | "PUBLIC">;
      }>;
    }>;
  };
};

/* --------------------------------------------------------------------------
   English (default)
-------------------------------------------------------------------------- */

const en: Dict = {
  nav: {
    primary: "Primary",
    features: "Modules",
    docs: "Docs",
    getDemo: "Get a demo",
    open: "Open menu",
    close: "Close menu",
    featuresItems: [
      {
        title: "Discover",
        description: "What's new in the world for your product's domain.",
      },
      {
        title: "Aggregate",
        description: "Cross-module synthesis into feature suggestions.",
      },
      {
        title: "PRDs",
        description: "Generated specs with one-click GitHub handoff.",
      },
      {
        title: "Sources",
        description: "30+ collectors across the web, social, and GitHub.",
      },
    ],
    docsItems: [
      {
        title: "API reference",
        description: "~70 routes — products, sources, aggregate, PRDs.",
      },
    ],
  },
  cta: {
    getDemo: "Get a demo",
    readDocs: "Read the docs",
    back: "Back to home",
  },
  footer: {
    tagline:
      "The PM workspace that reads the web, clusters it into features, and ships PRDs to your tracker.",
    columns: [
      {
        heading: "Modules",
        links: [
          { label: "Discover", href: "/features/discover" },
          { label: "Aggregate", href: "/features/aggregate" },
          { label: "PRDs", href: "/features/prds" },
          { label: "Sources", href: "/features/sources" },
        ],
      },
      {
        heading: "Resources",
        links: [
          { label: "API reference", href: "/docs" },
        ],
      },
      {
        heading: "Company",
        links: [
          { label: "About", href: "https://oriontech.me", external: true },
          { label: "Privacy", href: "/privacy" },
        ],
      },
    ],
    copy: (y) => `© ${y} PMOS. All rights reserved.`,
  },
  privacy: {
    eyebrow: "Privacy",
    heading: "Privacy Policy",
    lastUpdated: "Last updated: April 2026",
    intro:
      "This policy explains what information we collect when you visit this marketing site or request a demo of PMOS, how we use it, and the choices you have.",
    sections: [
      {
        heading: "Information we collect",
        body: (
          <>
            <p>
              <strong>Information you provide.</strong> When you click a demo
              link, you reach us through WhatsApp; any messages you choose to
              send are stored by WhatsApp on your device and ours.
            </p>
            <p>
              <strong>Automatic data.</strong> Our hosting provider logs
              standard request metadata (IP address, user agent, referrer,
              timestamp) to operate and secure the site.
            </p>
            <p>
              <strong>Local storage and cookies.</strong> We store your theme
              preference and language preference in your browser. No third-party
              advertising cookies are set.
            </p>
          </>
        ),
      },
      {
        heading: "How we use it",
        body: (
          <p>
            We use the information to respond to your demo request, provide and
            maintain the site, prevent abuse, and improve the product. We never
            sell personal information.
          </p>
        ),
      },
      {
        heading: "Sharing",
        body: (
          <p>
            We share information only with service providers that help us run
            the site (hosting, DNS, analytics if enabled) and when required by
            law.
          </p>
        ),
      },
      {
        heading: "Your choices",
        body: (
          <p>
            You can clear your browser&apos;s local storage to reset the
            theme/language preferences. You can contact us through the demo
            channel to request deletion of any data you&apos;ve provided.
          </p>
        ),
      },
      {
        heading: "Contact",
        body: (
          <p>
            Questions about this policy? Reach us at{" "}
            <a
              className="underline-dotted hover:text-[var(--fg-primary)]"
              href="https://oriontech.me"
              target="_blank"
              rel="noopener noreferrer"
            >
              oriontech.me
            </a>
            .
          </p>
        ),
      },
    ],
  },
  home: {
    hero: {
      eyebrow: "PMOS — Product Management OS",
      headline: "The PM workspace that reads the web for you.",
      lead:
        "PMOS pulls signals from the web, clusters them into feature opportunities, writes PRDs, and ships them to your tracker. The layer you used to fill with tabs and copy-paste.",
    },
    pipeline: {
      eyebrow: "The pipeline",
      heading: "Signals → Evidence → Suggestions → PRDs → Issues.",
      lead:
        "Each stage is automated with LLM agents and editable by the PM. You stay in control — PMOS does the undifferentiated work: reading, summarizing, tagging, synthesizing.",
      stages: [
        {
          title: "Signals",
          subtitle: "Web · social · GitHub",
          body: "30+ collectors pull from Reddit, HN, arXiv, Product Hunt, company blogs, app stores, GitHub releases, YouTube, and more.",
        },
        {
          title: "Evidence",
          subtitle: "Labeled items",
          body: "A pre-filter pass tags each item with labels (pain point, feature request, trend, bug report) and writes a short summary.",
        },
        {
          title: "Suggestions",
          subtitle: "Clustered features",
          body: "Aggregate synthesizes labeled items into feature opportunities. Each suggestion links back to the signals that back it.",
        },
        {
          title: "PRDs",
          subtitle: "Specs",
          body: "Auto-generated markdown PRDs with competitor research baked in. Edit, preview GFM, then send.",
        },
        {
          title: "Issues",
          subtitle: "Delivery",
          body: "One click creates a GitHub issue on the configured repo; URL persists back on the suggestion.",
        },
      ],
    },
    pillars: {
      eyebrow: "Modules",
      heading: "Seven screens that replace a workday of tabs.",
      lead:
        "Every module is scoped to a product. Switching products in the sidebar re-scopes everything — sources, reports, suggestions, PRDs.",
      items: [
        {
          title: "Discover",
          description:
            "What's new in the world for your product's domain — research + industry + trends sources.",
        },
        {
          title: "Listen",
          description:
            "What users, competitors, and the community are saying — social, forums, reviews.",
        },
        {
          title: "Compare",
          description:
            "Competitor websites, repos, app stores, release notes. Report contrasts their moves vs yours.",
        },
        {
          title: "Sources",
          description:
            "Per-product source catalog with inspect, collect-now, pre-filter, and auto-discovery helpers.",
        },
        {
          title: "Aggregate",
          description:
            "Cross-module synthesis — clustered suggestions with evidence cards and batch history.",
        },
        {
          title: "PRDs",
          description:
            "Auto-save markdown editor, Edit/Preview tabs, and one-click GitHub issue creation.",
        },
      ],
    },
    chips: {
      eyebrow: "Under the hood",
      heading: "Built for real PM work, not demos.",
      lead:
        "Claude Agent SDK under the hood. Local-first SQLite. 30+ collectors. SSE streaming for every long-running job. No per-token cost beyond your Claude plan.",
      items: [
        {
          label: "Next.js 16 + React 19",
          tooltip: "App Router, route groups, streaming, SSE.",
        },
        {
          label: "Claude Agent SDK",
          tooltip:
            "Runs through the local claude CLI using your subscription — no API key required.",
        },
        {
          label: "SQLite",
          tooltip: "All data local at backend/data/discover.db. Idempotent migrations on boot.",
        },
        {
          label: "FastAPI backend",
          tooltip: "~70 routes, SSE for every long-running job, clean Python module per collector.",
        },
        {
          label: "30+ collectors",
          tooltip:
            "Reddit, HN, arXiv, Product Hunt, HuggingFace, Google Trends, app stores, GitHub, YouTube, X, LinkedIn, RSS — all pluggable.",
        },
        {
          label: "Pre-filter pass",
          tooltip: "Cheap Haiku pass labels + summarizes every collected item before it reaches a report.",
        },
        {
          label: "GitHub Issues handoff",
          tooltip: "Fine-grained PAT per product; one click creates an issue, duplicate sends blocked.",
        },
        {
          label: "Streaming SSE",
          tooltip: "Every generate, analyze, and aggregate emits granular progress events.",
        },
        {
          label: "Shadcn/ui + Tailwind 4",
          tooltip: "Dark-first UI, tuned light mode, motion-reduced aware.",
        },
        {
          label: "Fly.io / Heroku / local",
          tooltip: "Dockerfile, fly.toml, Procfile — or run make dev locally.",
        },
        {
          label: "Bundled MCP web search",
          tooltip: "Agents get real Google-style search without an external key.",
        },
        {
          label: "Per-product GitHub PAT",
          tooltip:
            "Token stored masked, shown as •••• + last 4. github_token_set boolean exposed in API.",
        },
      ],
    },
    builtOn: {
      eyebrow: "Built on",
    },
  },
  features: {
    back: "Back to modules",
    cta: {
      heading: "See PMOS end-to-end.",
      lead:
        "A 20-minute demo walks through Discover → Aggregate → PRD → GitHub issue, scoped to your product.",
    },
    index: {
      eyebrow: "Modules",
      heading: "The seven screens, one at a time.",
      lead: "Each module is scoped to a product. Pick a module to see the data flow, the SSE events, and where the outputs go.",
      seeDetails: "See details",
      items: [
        {
          slug: "discover",
          eyebrow: "Discover",
          headline: "What's new in the world for your product's domain.",
          body: "Broad research + industry + trends sources, auto-configurable from your topics, producing an editable report with highlights, themes, and categories.",
        },
        {
          slug: "aggregate",
          eyebrow: "Aggregate",
          headline: "Cross-module synthesis into feature suggestions.",
          body: "Labeled items from Discover + Listen + Compare feed an LLM that clusters them into suggestions. Each card links back to the evidence that backs it.",
        },
        {
          slug: "prds",
          eyebrow: "PRDs",
          headline: "Auto-generated specs, one-click GitHub handoff.",
          body: "A full-page editor with GFM preview, task lists, and a Send to GitHub button that creates an issue and persists the URL back on the suggestion.",
        },
        {
          slug: "sources",
          eyebrow: "Sources",
          headline: "30+ collectors, pluggable, per-product.",
          body: "Inspect each source, collect on demand, pre-filter items, and discover new sources via paste-a-URL or the built-in search helpers.",
        },
      ],
    },
  },
  docs: {
    hero: {
      eyebrow: "API Reference",
      heading: "The PMOS API.",
      lead: (
        <>
          ~70 routes covering products, sources, modules, aggregate, PRDs and
          GitHub integration. Long-running jobs stream progress via{" "}
          <code className="mono text-[var(--fg-primary)]">text/event-stream</code>.
        </>
      ),
    },
    groups: [
      {
        slug: "products",
        title: "Products",
        blurb:
          "CRUD + analyze. Analyze uses an agent to propose description, target audience, competitors, and topics from a name + optional URLs.",
        endpoints: [
          { method: "GET", path: "/api/products", purpose: "List products." },
          { method: "POST", path: "/api/products", purpose: "Create a product with its initial config." },
          { method: "GET", path: "/api/products/{id}", purpose: "Read a product (with masked GitHub token)." },
          { method: "PATCH", path: "/api/products/{id}", purpose: "Update identity, topics, competitors, agent settings, GitHub integration." },
          { method: "DELETE", path: "/api/products/{id}", purpose: "Delete a product and cascading rows." },
          { method: "POST", path: "/api/products/analyze/stream", purpose: "Stream agent-proposed description / audience / competitors / topics from a name + URLs.", flags: ["SSE"] },
        ],
      },
      {
        slug: "sources",
        title: "Sources",
        blurb:
          "Source instances per (product, module, type). Collect, pre-filter, inspect items, and use search helpers to discover new ones.",
        endpoints: [
          { method: "GET", path: "/api/products/{id}/sources", purpose: "List activated sources for a product." },
          { method: "POST", path: "/api/products/{id}/sources", purpose: "Activate a new source instance with config." },
          { method: "PATCH", path: "/api/products/{id}/sources/{sid}", purpose: "Update a source's config." },
          { method: "DELETE", path: "/api/products/{id}/sources/{sid}", purpose: "Deactivate a source." },
          { method: "POST", path: "/api/products/{id}/sources/{sid}/collect", purpose: "Collect now (fresh run)." },
          { method: "POST", path: "/api/products/{id}/sources/{sid}/pre-filter", purpose: "Run the pre-filter LLM pass on recent items." },
          { method: "GET", path: "/api/github/search", purpose: "Discover GitHub sources by keyword / owner / topic.", flags: ["PUBLIC"] },
          { method: "GET", path: "/api/reddit/search", purpose: "Discover subreddits matching keywords.", flags: ["PUBLIC"] },
          { method: "GET", path: "/api/youtube/search", purpose: "Discover YouTube channels matching keywords.", flags: ["PUBLIC"] },
          { method: "GET", path: "/api/linkedin/search", purpose: "Discover LinkedIn companies / handles.", flags: ["PUBLIC"] },
        ],
      },
      {
        slug: "modules",
        title: "Modules — Discover · Listen · Compare",
        blurb:
          "Per-module feed, stats, chat, report generation, and smart-configure. Generate streams step events over SSE.",
        endpoints: [
          { method: "GET", path: "/api/products/{id}/modules/{module}/feed", purpose: "Paginated feed of labeled items in the module." },
          { method: "GET", path: "/api/products/{id}/modules/{module}/stats", purpose: "Stats block: item count, per-label counts, last run." },
          { method: "POST", path: "/api/products/{id}/modules/{module}/collect", purpose: "Trigger a collection run across the module's sources." },
          { method: "GET", path: "/api/products/{id}/modules/{module}/collection-progress", purpose: "Subscribe to live collection progress events.", flags: ["SSE"] },
          { method: "POST", path: "/api/products/{id}/modules/{module}/generate", purpose: "Generate a fresh module report." },
          { method: "POST", path: "/api/products/{id}/modules/{module}/generate/stream", purpose: "Stream report generation step events.", flags: ["SSE"] },
          { method: "GET", path: "/api/products/{id}/modules/{module}/reports", purpose: "List historical reports." },
          { method: "POST", path: "/api/products/{id}/modules/{module}/chat", purpose: "Q&A chat scoped to the module's filtered items." },
          { method: "POST", path: "/api/products/{id}/modules/{module}/smart-configure", purpose: "Auto-fill sources and topics from the product profile." },
        ],
      },
      {
        slug: "aggregate",
        title: "Aggregate",
        blurb:
          "Cross-module synthesis — generate snapshot batches of feature suggestions with evidence, and write a PRD from any suggestion.",
        endpoints: [
          { method: "GET", path: "/api/products/{id}/aggregate", purpose: "List suggestions in the current batch." },
          { method: "POST", path: "/api/products/{id}/aggregate/generate", purpose: "Generate a fresh aggregate batch." },
          { method: "GET", path: "/api/products/{id}/aggregate/batches", purpose: "List prior batches (history)." },
          { method: "GET", path: "/api/products/{id}/aggregate/suggestions/{sid}/evidence", purpose: "Evidence items that back a suggestion." },
          { method: "POST", path: "/api/products/{id}/aggregate/suggestions/{sid}/write-prd", purpose: "Generate a PRD from a suggestion (competitor research included)." },
          { method: "GET", path: "/api/products/{id}/aggregate/prompt-preview", purpose: "Inspect the exact prompt that will be sent to the agent." },
        ],
      },
      {
        slug: "prds",
        title: "PRDs & GitHub handoff",
        blurb:
          "CRUD on PRDs plus the GitHub issue handoff. Duplicate sends are blocked (409); issue URL persists back on the source suggestion.",
        endpoints: [
          { method: "GET", path: "/api/products/{id}/prds", purpose: "List PRDs (manual + from suggestions)." },
          { method: "POST", path: "/api/products/{id}/prds", purpose: "Create a blank manual PRD." },
          { method: "GET", path: "/api/products/{id}/prds/{pid}", purpose: "Read a PRD (title + markdown content)." },
          { method: "PATCH", path: "/api/products/{id}/prds/{pid}", purpose: "Update title / content (debounced autosave client-side)." },
          { method: "DELETE", path: "/api/products/{id}/prds/{pid}", purpose: "Delete a PRD." },
          { method: "POST", path: "/api/products/{id}/github/issues", purpose: "Create a GitHub issue from a PRD. Persists URL back on the suggestion." },
        ],
      },
      {
        slug: "ops",
        title: "Ops & registry",
        blurb: "Health, setup, global stats, and the source registry used by the UI to discover what's available.",
        endpoints: [
          { method: "GET", path: "/api/health", purpose: "Liveness probe.", flags: ["PUBLIC"] },
          { method: "GET", path: "/api/setup/check", purpose: "Report Claude CLI availability + setup status.", flags: ["PUBLIC"] },
          { method: "GET", path: "/api/stats", purpose: "Global counts (products, items, runs)." },
          { method: "GET", path: "/api/settings", purpose: "Read global key-value settings." },
          { method: "POST", path: "/api/settings", purpose: "Update global settings." },
          { method: "GET", path: "/api/registry", purpose: "Full source registry (all collectors + capabilities)." },
          { method: "GET", path: "/api/registry/groups", purpose: "Registry grouped into Research / Industry / GitHub / Social / Trends." },
          { method: "GET", path: "/api/sources", purpose: "Flat list of available source types." },
          { method: "GET", path: "/api/url/check", purpose: "Validate and normalize a URL (used in onboarding).", flags: ["PUBLIC"] },
        ],
      },
    ],
  },
};

/* --------------------------------------------------------------------------
   Portuguese
-------------------------------------------------------------------------- */

const pt: Dict = {
  nav: {
    primary: "Primário",
    features: "Módulos",
    docs: "Docs",
    getDemo: "Agendar demo",
    open: "Abrir menu",
    close: "Fechar menu",
    featuresItems: [
      {
        title: "Discover",
        description: "O que é novo no mundo para o domínio do seu produto.",
      },
      {
        title: "Aggregate",
        description: "Síntese cross-module em sugestões de feature.",
      },
      {
        title: "PRDs",
        description: "Specs gerados com handoff 1-click para o GitHub.",
      },
      {
        title: "Sources",
        description: "30+ coletores na web, social e GitHub.",
      },
    ],
    docsItems: [
      {
        title: "Referência da API",
        description: "~70 rotas — produtos, sources, aggregate, PRDs.",
      },
    ],
  },
  cta: {
    getDemo: "Agendar demo",
    readDocs: "Ler os docs",
    back: "Voltar para o início",
  },
  footer: {
    tagline:
      "O workspace de PM que lê a web, agrupa em features e envia PRDs para o seu tracker.",
    columns: [
      {
        heading: "Módulos",
        links: [
          { label: "Discover", href: "/features/discover" },
          { label: "Aggregate", href: "/features/aggregate" },
          { label: "PRDs", href: "/features/prds" },
          { label: "Sources", href: "/features/sources" },
        ],
      },
      {
        heading: "Recursos",
        links: [
          { label: "Referência da API", href: "/docs" },
        ],
      },
      {
        heading: "Empresa",
        links: [
          { label: "Sobre", href: "https://oriontech.me", external: true },
          { label: "Privacidade", href: "/privacy" },
        ],
      },
    ],
    copy: (y) => `© ${y} PMOS. Todos os direitos reservados.`,
  },
  privacy: {
    eyebrow: "Privacidade",
    heading: "Política de Privacidade",
    lastUpdated: "Última atualização: abril de 2026",
    intro:
      "Esta política explica que informações coletamos quando você visita este site de marketing ou solicita um demo do PMOS, como usamos essas informações, e quais são suas escolhas.",
    sections: [
      {
        heading: "Informações que coletamos",
        body: (
          <>
            <p>
              <strong>Informações que você nos dá.</strong> Ao clicar num link
              de demo, você chega até nós pelo WhatsApp; quaisquer mensagens que
              você enviar ficam armazenadas pelo WhatsApp no seu dispositivo e
              no nosso.
            </p>
            <p>
              <strong>Dados automáticos.</strong> Nosso provedor de hospedagem
              registra metadados de requisição (IP, user agent, referrer,
              timestamp) para operar e proteger o site.
            </p>
            <p>
              <strong>Local storage e cookies.</strong> Guardamos sua
              preferência de tema e idioma no navegador. Nenhum cookie de
              publicidade de terceiros é definido.
            </p>
          </>
        ),
      },
      {
        heading: "Como usamos",
        body: (
          <p>
            Usamos as informações para responder ao seu pedido de demo, operar
            e manter o site, prevenir abuso, e melhorar o produto. Nunca vendemos
            informações pessoais.
          </p>
        ),
      },
      {
        heading: "Compartilhamento",
        body: (
          <p>
            Compartilhamos informações apenas com prestadores de serviço que
            ajudam a operar o site (hospedagem, DNS, analytics quando ativado) e
            quando exigido por lei.
          </p>
        ),
      },
      {
        heading: "Suas escolhas",
        body: (
          <p>
            Você pode limpar o local storage do navegador para resetar as
            preferências de tema e idioma. Você também pode entrar em contato
            pelo canal de demo para solicitar a exclusão de quaisquer dados que
            nos enviou.
          </p>
        ),
      },
      {
        heading: "Contato",
        body: (
          <p>
            Dúvidas sobre esta política? Fale com a gente em{" "}
            <a
              className="underline-dotted hover:text-[var(--fg-primary)]"
              href="https://oriontech.me"
              target="_blank"
              rel="noopener noreferrer"
            >
              oriontech.me
            </a>
            .
          </p>
        ),
      },
    ],
  },
  home: {
    hero: {
      eyebrow: "PMOS — Product Management OS",
      headline: "O workspace de PM que lê a web por você.",
      lead:
        "O PMOS coleta sinais da web, agrupa em oportunidades de feature, escreve PRDs e entrega para o seu tracker. A camada que você preenchia com abas e copy-paste.",
    },
    pipeline: {
      eyebrow: "A pipeline",
      heading: "Signals → Evidence → Suggestions → PRDs → Issues.",
      lead:
        "Cada etapa é automatizada com agentes LLM e editável pelo PM. Você fica no controle — o PMOS faz o trabalho indiferenciado: ler, resumir, etiquetar, sintetizar.",
      stages: [
        {
          title: "Signals",
          subtitle: "Web · social · GitHub",
          body: "30+ coletores puxam do Reddit, HN, arXiv, Product Hunt, blogs de empresas, app stores, releases do GitHub, YouTube, e mais.",
        },
        {
          title: "Evidence",
          subtitle: "Itens etiquetados",
          body: "Um pre-filter pass etiqueta cada item (pain point, feature request, trend, bug report) e escreve um resumo curto.",
        },
        {
          title: "Suggestions",
          subtitle: "Features agrupadas",
          body: "O Aggregate sintetiza os itens etiquetados em oportunidades de feature. Cada sugestão aponta de volta para os sinais que a sustentam.",
        },
        {
          title: "PRDs",
          subtitle: "Specs",
          body: "PRDs em markdown gerados automaticamente, com pesquisa de competidor embutida. Edite, pré-visualize GFM, e envie.",
        },
        {
          title: "Issues",
          subtitle: "Delivery",
          body: "Um clique cria uma issue no repo configurado; a URL é persistida de volta na sugestão.",
        },
      ],
    },
    pillars: {
      eyebrow: "Módulos",
      heading: "Sete telas que substituem um dia de trabalho em abas.",
      lead:
        "Cada módulo é escopado por produto. Trocar de produto na sidebar re-escopa tudo — sources, reports, suggestions, PRDs.",
      items: [
        {
          title: "Discover",
          description:
            "O que é novo no mundo para o domínio do seu produto — research + indústria + trends.",
        },
        {
          title: "Listen",
          description:
            "O que usuários, competidores e a comunidade estão dizendo — social, fóruns, reviews.",
        },
        {
          title: "Compare",
          description:
            "Websites, repos, app stores, release notes dos competidores. Report contrasta com o seu produto.",
        },
        {
          title: "Sources",
          description:
            "Catálogo de sources por produto, com inspect, collect-now, pre-filter e descoberta automática.",
        },
        {
          title: "Aggregate",
          description:
            "Síntese cross-module — sugestões agrupadas, com cards de evidência e histórico de batches.",
        },
        {
          title: "PRDs",
          description:
            "Editor em markdown com auto-save, abas Edit/Preview, e botão 1-click para virar issue no GitHub.",
        },
      ],
    },
    chips: {
      eyebrow: "Por baixo do capô",
      heading: "Feito para trabalho de PM real, não para demo.",
      lead:
        "Claude Agent SDK por baixo. SQLite local-first. 30+ coletores. SSE em todo job longo. Nenhum custo por token além do seu plano do Claude.",
      items: [
        {
          label: "Next.js 16 + React 19",
          tooltip: "App Router, route groups, streaming, SSE.",
        },
        {
          label: "Claude Agent SDK",
          tooltip:
            "Roda via CLI local do claude usando sua assinatura — sem API key.",
        },
        {
          label: "SQLite",
          tooltip: "Tudo local em backend/data/discover.db. Migrations idempotentes no boot.",
        },
        {
          label: "FastAPI backend",
          tooltip: "~70 rotas, SSE em todo job longo, um módulo Python limpo por coletor.",
        },
        {
          label: "30+ coletores",
          tooltip:
            "Reddit, HN, arXiv, Product Hunt, HuggingFace, Google Trends, app stores, GitHub, YouTube, X, LinkedIn, RSS — pluggable.",
        },
        {
          label: "Pre-filter pass",
          tooltip: "Pass barato com Haiku etiqueta + resume cada item antes de entrar num report.",
        },
        {
          label: "Handoff para GitHub Issues",
          tooltip: "PAT fine-grained por produto; 1 clique cria issue, envios duplicados bloqueados.",
        },
        {
          label: "Streaming SSE",
          tooltip: "Cada generate, analyze e aggregate emite eventos de progresso granulares.",
        },
        {
          label: "Shadcn/ui + Tailwind 4",
          tooltip: "UI dark-first, modo light tunado, motion-reduced respeitado.",
        },
        {
          label: "Fly.io / Heroku / local",
          tooltip: "Dockerfile, fly.toml, Procfile — ou rodar make dev localmente.",
        },
        {
          label: "MCP de web search embutido",
          tooltip: "Agentes têm busca estilo Google sem chave externa.",
        },
        {
          label: "PAT do GitHub por produto",
          tooltip:
            "Token guardado mascarado, mostrado como •••• + últimos 4. github_token_set exposto na API.",
        },
      ],
    },
    builtOn: {
      eyebrow: "Construído sobre",
    },
  },
  features: {
    back: "Voltar para módulos",
    cta: {
      heading: "Veja o PMOS ponta-a-ponta.",
      lead:
        "Um demo de 20 minutos passa por Discover → Aggregate → PRD → issue do GitHub, escopado no seu produto.",
    },
    index: {
      eyebrow: "Módulos",
      heading: "As sete telas, uma de cada vez.",
      lead: "Cada módulo é escopado por produto. Escolha um módulo para ver o fluxo de dados, os eventos SSE e onde o output vai parar.",
      seeDetails: "Ver detalhes",
      items: [
        {
          slug: "discover",
          eyebrow: "Discover",
          headline: "O que é novo no mundo para o domínio do seu produto.",
          body: "Fontes de research + indústria + trends, auto-configuráveis a partir dos seus topics, produzindo um report editável com highlights, themes e categorias.",
        },
        {
          slug: "aggregate",
          eyebrow: "Aggregate",
          headline: "Síntese cross-module em sugestões de feature.",
          body: "Itens etiquetados do Discover + Listen + Compare alimentam um LLM que agrupa em sugestões. Cada card aponta para as evidências que o sustentam.",
        },
        {
          slug: "prds",
          eyebrow: "PRDs",
          headline: "Specs gerados, handoff 1-click para o GitHub.",
          body: "Editor full-page com preview GFM, task lists, e botão Send to GitHub que cria issue e persiste a URL de volta na sugestão.",
        },
        {
          slug: "sources",
          eyebrow: "Sources",
          headline: "30+ coletores, pluggable, por produto.",
          body: "Inspecione cada source, colete on demand, pre-filtre itens, e descubra novos sources via paste-URL ou helpers de busca.",
        },
      ],
    },
  },
  docs: {
    hero: {
      eyebrow: "Referência da API",
      heading: "A API do PMOS.",
      lead: (
        <>
          ~70 rotas cobrindo products, sources, modules, aggregate, PRDs e
          integração com GitHub. Jobs longos transmitem progresso via{" "}
          <code className="mono text-[var(--fg-primary)]">text/event-stream</code>.
        </>
      ),
    },
    groups: [
      {
        slug: "products",
        title: "Products",
        blurb:
          "CRUD + analyze. O analyze usa um agente para propor descrição, público-alvo, competidores e topics a partir de um nome + URLs opcionais.",
        endpoints: [
          { method: "GET", path: "/api/products", purpose: "Listar produtos." },
          { method: "POST", path: "/api/products", purpose: "Criar um produto com sua configuração inicial." },
          { method: "GET", path: "/api/products/{id}", purpose: "Ler um produto (com token do GitHub mascarado)." },
          { method: "PATCH", path: "/api/products/{id}", purpose: "Atualizar identidade, topics, competidores, agent settings, integração com GitHub." },
          { method: "DELETE", path: "/api/products/{id}", purpose: "Deletar produto e linhas em cascata." },
          { method: "POST", path: "/api/products/analyze/stream", purpose: "Stream de descrição / audiência / competidores / topics proposta pelo agente, a partir de nome + URLs.", flags: ["SSE"] },
        ],
      },
      {
        slug: "sources",
        title: "Sources",
        blurb:
          "Instâncias de source por (product, module, type). Collect, pre-filter, inspecionar itens, e usar helpers de busca para descobrir novas.",
        endpoints: [
          { method: "GET", path: "/api/products/{id}/sources", purpose: "Listar sources ativos do produto." },
          { method: "POST", path: "/api/products/{id}/sources", purpose: "Ativar uma nova instância de source com config." },
          { method: "PATCH", path: "/api/products/{id}/sources/{sid}", purpose: "Atualizar a config de um source." },
          { method: "DELETE", path: "/api/products/{id}/sources/{sid}", purpose: "Desativar um source." },
          { method: "POST", path: "/api/products/{id}/sources/{sid}/collect", purpose: "Coletar agora (run fresco)." },
          { method: "POST", path: "/api/products/{id}/sources/{sid}/pre-filter", purpose: "Rodar o pre-filter LLM pass em itens recentes." },
          { method: "GET", path: "/api/github/search", purpose: "Descobrir sources do GitHub por keyword / owner / topic.", flags: ["PUBLIC"] },
          { method: "GET", path: "/api/reddit/search", purpose: "Descobrir subreddits por keyword.", flags: ["PUBLIC"] },
          { method: "GET", path: "/api/youtube/search", purpose: "Descobrir canais do YouTube por keyword.", flags: ["PUBLIC"] },
          { method: "GET", path: "/api/linkedin/search", purpose: "Descobrir empresas / handles do LinkedIn.", flags: ["PUBLIC"] },
        ],
      },
      {
        slug: "modules",
        title: "Modules — Discover · Listen · Compare",
        blurb:
          "Feed, stats, chat, geração de report e smart-configure por módulo. O generate emite step events via SSE.",
        endpoints: [
          { method: "GET", path: "/api/products/{id}/modules/{module}/feed", purpose: "Feed paginado dos itens etiquetados no módulo." },
          { method: "GET", path: "/api/products/{id}/modules/{module}/stats", purpose: "Bloco de stats: contagem de itens, por label, último run." },
          { method: "POST", path: "/api/products/{id}/modules/{module}/collect", purpose: "Disparar uma coleta nos sources do módulo." },
          { method: "GET", path: "/api/products/{id}/modules/{module}/collection-progress", purpose: "Assinar eventos de progresso em tempo real.", flags: ["SSE"] },
          { method: "POST", path: "/api/products/{id}/modules/{module}/generate", purpose: "Gerar um report fresco do módulo." },
          { method: "POST", path: "/api/products/{id}/modules/{module}/generate/stream", purpose: "Stream dos step events da geração.", flags: ["SSE"] },
          { method: "GET", path: "/api/products/{id}/modules/{module}/reports", purpose: "Listar reports históricos." },
          { method: "POST", path: "/api/products/{id}/modules/{module}/chat", purpose: "Chat Q&A escopado nos itens filtrados do módulo." },
          { method: "POST", path: "/api/products/{id}/modules/{module}/smart-configure", purpose: "Auto-preencher sources e topics a partir do perfil do produto." },
        ],
      },
      {
        slug: "aggregate",
        title: "Aggregate",
        blurb:
          "Síntese cross-module — gera batches snapshot de sugestões de feature com evidência, e escreve PRD a partir de qualquer sugestão.",
        endpoints: [
          { method: "GET", path: "/api/products/{id}/aggregate", purpose: "Listar sugestões no batch atual." },
          { method: "POST", path: "/api/products/{id}/aggregate/generate", purpose: "Gerar um batch fresco do aggregate." },
          { method: "GET", path: "/api/products/{id}/aggregate/batches", purpose: "Listar batches anteriores (histórico)." },
          { method: "GET", path: "/api/products/{id}/aggregate/suggestions/{sid}/evidence", purpose: "Itens de evidência que sustentam uma sugestão." },
          { method: "POST", path: "/api/products/{id}/aggregate/suggestions/{sid}/write-prd", purpose: "Gerar PRD a partir de uma sugestão (pesquisa de competidor incluída)." },
          { method: "GET", path: "/api/products/{id}/aggregate/prompt-preview", purpose: "Inspecionar o prompt exato que será enviado ao agente." },
        ],
      },
      {
        slug: "prds",
        title: "PRDs & handoff pro GitHub",
        blurb:
          "CRUD de PRDs + handoff para o GitHub. Envios duplicados são bloqueados (409); a URL da issue é persistida de volta na sugestão.",
        endpoints: [
          { method: "GET", path: "/api/products/{id}/prds", purpose: "Listar PRDs (manuais + vindos de sugestões)." },
          { method: "POST", path: "/api/products/{id}/prds", purpose: "Criar um PRD manual vazio." },
          { method: "GET", path: "/api/products/{id}/prds/{pid}", purpose: "Ler um PRD (title + markdown)." },
          { method: "PATCH", path: "/api/products/{id}/prds/{pid}", purpose: "Atualizar title / content (autosave debounced no client)." },
          { method: "DELETE", path: "/api/products/{id}/prds/{pid}", purpose: "Deletar um PRD." },
          { method: "POST", path: "/api/products/{id}/github/issues", purpose: "Criar issue no GitHub a partir de um PRD. Persiste URL de volta na sugestão." },
        ],
      },
      {
        slug: "ops",
        title: "Ops & registry",
        blurb: "Health, setup, stats globais e o registry de sources usado pela UI para descobrir o que está disponível.",
        endpoints: [
          { method: "GET", path: "/api/health", purpose: "Liveness probe.", flags: ["PUBLIC"] },
          { method: "GET", path: "/api/setup/check", purpose: "Status da CLI do Claude + setup.", flags: ["PUBLIC"] },
          { method: "GET", path: "/api/stats", purpose: "Contagens globais (produtos, itens, runs)." },
          { method: "GET", path: "/api/settings", purpose: "Ler configurações globais key-value." },
          { method: "POST", path: "/api/settings", purpose: "Atualizar configurações globais." },
          { method: "GET", path: "/api/registry", purpose: "Registry completo de sources (coletores + capabilities)." },
          { method: "GET", path: "/api/registry/groups", purpose: "Registry agrupado em Research / Industry / GitHub / Social / Trends." },
          { method: "GET", path: "/api/sources", purpose: "Lista flat dos tipos de source disponíveis." },
          { method: "GET", path: "/api/url/check", purpose: "Validar e normalizar URL (usado no onboarding).", flags: ["PUBLIC"] },
        ],
      },
    ],
  },
};

export const DICTS: Record<Locale, Dict> = { en, pt };

export function getDict(locale: Locale): Dict {
  return DICTS[locale];
}

export type { Dict };
