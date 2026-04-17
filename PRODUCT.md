# PMOS — Product Overview

A workspace for product managers that continuously pulls signals from the web, clusters them into feature opportunities, writes PRDs, and ships them to the delivery tracker (GitHub Issues today). It sits between **research tools** (Notion, Dovetail) and **delivery trackers** (Linear, Jira, GitHub) — the layer PMs currently fill with tabs and copy-paste.

---

## 1. Core concept

PMOS treats the PM lifecycle as a pipeline:

```
Signals  →  Evidence  →  Suggestions  →  PRDs  →  Issues
 (web)     (labeled     (clustered     (specs)   (delivery)
           items)        features)
```

Each stage is automated with LLM agents, and each stage is editable. The PM stays in control — the system does the undifferentiated work (reading, summarizing, tagging, synthesizing).

All data is scoped to a **Product**. One PMOS install handles many products side-by-side; picking a product in the sidebar scopes every module to that product's topics, competitors, sources, and reports.

---

## 2. Modules (what each screen does)

### 2.1 Onboarding

The first time you open PMOS (no products yet), the app asks for a product name and optional URLs. The `product-analyzer` agent:

1. Searches the web and fetches pages about the product.
2. Proposes a description, target audience, competitors, and topics to track.
3. Suggests sources to activate in each module.

Everything is editable before hitting "Create workspace". Uses `/api/products/analyze/stream` (SSE).

### 2.2 Product Settings (`/product`)

Per-product configuration:

- **Identity** — name, description, target audience, logo.
- **URLs** — website, GitHub repo.
- **Competitors** — list of competitor name + URL + notes.
- **Topics** — keywords/phrases that define relevance. Feed the pre-filter, LLM scoring, and source discovery.
- **Agent settings** — collect interval, lookback window, pre-filter model, summary length, query limit, text truncation, preferred search regions.
- **Report shape knobs** — highlights count, themes count, categories count.
- **GitHub Integration** — `github_repo` + fine-grained PAT (stored masked).

### 2.3 Discover (`/discover`)

"What's new in the world" for your product's domain.

- Pulls from broad research + industry + trends sources (see §3).
- Auto-configurable: the `smart-configure` flow reads your topics and activates matching sources.
- Generates an editable **Report** with highlights, themes, and categories. Regenerate streams progress step-by-step.
- Has its own **Chat** tab for asking questions against the collected data.

### 2.4 Listen (`/listen`)

What users, competitors, and the community are saying — same collection engine, focused on social + forum + review sources (Reddit, HN comments, app reviews, YouTube, Twitter/X, LinkedIn).

### 2.5 Compare (`/compare`)

Competitor-oriented view. Collectors point at competitor websites, GitHub repos, app stores, release notes. Report contrasts competitor moves vs. your product.

### 2.6 Sources (`/sources`)

Cross-module view of every source configured for the current product.

- Source detail drawer: sample items, last run, pre-filter prompt preview, edit config.
- Per-source actions: **Collect now**, **Pre-filter**, **Edit**, **Delete**.
- Source discovery: paste a URL / search GitHub / search Reddit / search YouTube directly — the app finds matching accounts/feeds via `/api/github/search`, `/api/reddit/search`, `/api/youtube/search`, `/api/linkedin/search`.

### 2.7 Aggregate (`/aggregate`)

Cross-module synthesis.

- Pulls labeled items from Discover + Listen + Compare.
- LLM generates **feature suggestions** with evidence: each suggestion references the items that back it (signal strength, categories, module of origin).
- Batches are snapshots — generate again, keep history, cycle between batches.
- Per card: expand to see evidence items; click **Write PRD** to generate a spec.

### 2.8 PRDs (`/prds`)

Full-page PRD editor.

- Auto-save (debounced) title + markdown content.
- Edit / Preview tabs (GFM + task lists).
- **Send to GitHub** creates an issue on the configured repo; URL is saved and rendered inline; duplicate sends are blocked (409).
- **New PRD** creates a blank manual PRD (not tied to an aggregate suggestion).

---

## 3. Source catalog (collectors)

Each source is a small Python module under `backend/collectors/` that conforms to `base.py`. The registry lives in `backend/config.py → SOURCE_REGISTRY`.

### Research & Community
- **Hacker News** — top stories + comments filtered by query terms and score.
- **Reddit** — subreddit posts (+ top-level comments), query terms, min score.
- **Hugging Face** — Models, Papers, Spaces, Datasets (global trending).
- **arXiv** — papers on selected categories (e.g. cs.AI).
- **Product Hunt** — new launches.
- **LMSYS Chatbot Arena / LiveBench** — model leaderboards.
- **There's An AI For That** — curated AI tools.
- **Exploding Topics** — emerging search trends.

### Industry (company blogs)
- **Anthropic Blog**, **OpenAI Blog**, **Google DeepMind**.
- **RSS / Blog** — generic RSS/Atom URL; works for any blog.
- **Artificial Analysis** — model benchmarks & pricing.

### GitHub
- **GitHub Trending** — daily trending by language.
- **GitHub Repo PRs / Issues / Discussions / Releases** — per-repo activity for competitor tracking.

### Social & reviews
- **YouTube** — channel uploads (search-to-add).
- **Twitter / X** — handles or query.
- **LinkedIn** — company/person activity.
- **App Store / Play Store reviews** — per-app, filtered by rating/keywords.

### Trends & search
- **Google Trends** — interest over time for keywords.
- **PyPI Trends** — download deltas for packages.
- **Web Search** — generic Google-style query (MCP-backed).
- **Website Deep Scrape** — crawl a site, extract product/pricing/changelog changes.

All collectors share:
- a **frequency** (hours between runs),
- a **pre-filter pass** after collection (LLM tags each item with labels like `trend`, `bug report`, `pain point`, `feature request`, etc., and writes a short summary),
- a **module allowlist** (which of Discover/Listen/Compare can use it).

---

## 4. Pipeline internals (`backend/pipeline/`)

| Module | Role |
|---|---|
| `analyze.py` | Researches a product (name + URLs) and outputs description/audience/competitors/topics. Streaming SSE. |
| `discover_sources.py` | Given a product, suggests which sources to activate per module. |
| `smart_configure.py` | Auto-fills each source's config (subreddits, query terms, channel handles) from the product's topics + competitors. |
| `pre_filter.py` | Per-item LLM pass: label + summarize + score relevance. |
| `cards.py` | Builds a "card" view of filtered items scoped to (product, module). |
| `generate.py` | Generates the module report (highlights/themes/categories), streaming step events. |
| `chat.py` | Chat tab on each module — Q&A over the filtered items. |
| `aggregate.py` | Cross-module synthesis into feature suggestions with evidence links. |
| `prd_writer.py` | PRD generation from a suggestion (competitor web-research loop included). |
| `default_prompts.py` | Per-module default prompts generated for a product. |
| `source_availability.py` | Per-source "is this source usable now?" checks (credentials, rate limits). |
| `_sdk.py` | Claude Agent SDK wrapper with timeout + retry. |
| `_agent_loader.py` | Loads per-agent prompts/settings from YAML/JSON. |
| `_mcp_web_search/` | Bundled MCP server (TypeScript) giving agents real Google search. |

LLM access goes through the Claude CLI (the user's subscription login), not an API key — so running PMOS locally has no per-token cost beyond the user's plan.

---

## 5. Data model (SQLite, `backend/data/discover.db`)

Top-level tables:

- `products` — one row per product, including agent settings and GitHub integration (`github_repo`, `github_token`).
- `product_competitors` — competitor rows linked to product.
- `product_topics` — topic/keyword rows linked to product.
- `product_sources` — activated source instances per (product, module, source_type) with per-instance config.
- `items` — collected raw items (url, title, content, source, timestamps).
- `item_labels` — pre-filter labels and per-item summaries.
- `reports` — generated module reports (history).
- `feature_suggestions` — aggregate output; has `prd_content` and `github_issue_url`.
- `collection_runs` — per-run status (for SSE progress).
- `settings` — global key-value store for app-wide config.

Migrations are idempotent `ALTER TABLE ... ADD COLUMN` guards on startup (see `db.py`).

---

## 6. HTTP API surface

The backend exposes ~70 routes. Patterns:

- `/api/products` CRUD + analyze (streaming).
- `/api/products/{id}/sources` — list/create/update/delete, collect, pre-filter, inspect items.
- `/api/products/{id}/modules/{module}/` — feed, stats, generate, generate/stream, raw-prompt, chat, reports, smart-configure, collect, collection-progress (SSE).
- `/api/products/{id}/aggregate/` — list, generate, evidence, prompt-preview, batches, write-prd per suggestion.
- `/api/products/{id}/prds` — list/create/get/update/delete.
- `/api/products/{id}/github/issues` — create GitHub issue, persists URL back to the suggestion.
- Search helpers: `/api/github/search`, `/api/reddit/search`, `/api/youtube/search`, `/api/linkedin/search`, `/api/url/check`.
- Registry: `/api/registry`, `/api/registry/groups`, `/api/sources`.
- Ops: `/api/health`, `/api/setup/check`, `/api/stats`, `/api/settings`.

---

## 7. Integrations

### 7.1 Claude (LLM)
- Runtime: `claude-agent-sdk` → spawns the local `claude` CLI → uses the user's Claude Code login.
- Default model: `claude-sonnet-4-6`; pre-filter uses `claude-haiku-4-5` for speed.
- Per-run timeout (`SDK_TIMEOUT=600s`) with one auto-retry.
- No `ANTHROPIC_API_KEY` required (and the app explicitly unsets it to force CLI auth).

### 7.2 GitHub Issues (delivery handoff)
- Per-product `github_repo` (URL or `owner/repo`, normalized server-side) + fine-grained PAT with `Issues: Read and write`.
- Token is masked on reads (`••••••••` + last 4 chars, plus `github_token_set` boolean).
- `POST /api/products/{id}/github/issues` creates an issue; if `suggestion_id` is passed, the URL is persisted back and duplicate creation is blocked (409).

### 7.3 Source-specific APIs
- **Reddit** — public JSON endpoints; no auth needed for public subs.
- **GitHub** — public REST; PAT used for private repos / rate limits.
- **Hugging Face** — public Hub API.
- **YouTube** — RSS-based channel feeds + search helper.
- **Google Search** — via bundled MCP (`_mcp_web_search`).
- **arXiv, PyPI, Google Trends, App Store / Play Store** — public endpoints.

### 7.4 Deployment
- **Fly.io** — `backend/fly.toml` + `backend/Dockerfile`.
- **Heroku-compatible** — `backend/Procfile`.
- **Local** — `make install && make dev` (dev), `make run` (prod-built).

---

## 8. Frontend architecture

- Next.js 16 App Router, React 19.
- Route group `(app)/` holds all authenticated-feeling pages; a shared `layout.tsx` wires `ProductProvider`, `BackgroundJobsProvider`, `TooltipProvider`, `AppContent` (sidebar + content).
- `ProductProvider` loads `/api/products`, persists the selected product to localStorage, exposes `selectedProduct`, `loadError`, `refetch`.
- `BackgroundJobsProvider` tracks in-flight long-running actions (PRD generation, aggregate batch, GitHub send) by key so spinner state survives navigation.
- `lib/api.ts` is the single fetch layer with a default 8s timeout via `AbortController`.
- UI kit: shadcn/ui + Tailwind 4; icons from lucide; markdown via `react-markdown` + `remark-gfm`.
- Tests: Playwright (`frontend/e2e/`). Storybook-equivalent visual specs live in `frontend/FE-QA*.md`.

---

## 9. Known lifecycle gaps (see GitHub issues)

What PMOS does well: Discovery → Ideation → Spec → Handoff. What's missing, by lifecycle stage — each is tracked as an issue on `rodrigosnader/PMOS`:

| Stage | Gap | Issue |
|---|---|---|
| Prioritization | RICE / impact-effort scoring | [#7](https://github.com/rodrigosnader/PMOS/issues/7) |
| Planning / Roadmap | Now / Next / Later timeline | [#8](https://github.com/rodrigosnader/PMOS/issues/8) |
| Discovery / Validation | User research hub tied to PRDs | [#9](https://github.com/rodrigosnader/PMOS/issues/9) |
| Measurement | KPI tracking per PRD | [#10](https://github.com/rodrigosnader/PMOS/issues/10) |
| Launch / GTM | Release notes + checklist | [#11](https://github.com/rodrigosnader/PMOS/issues/11) |
| Iteration / Feedback | Post-launch feedback loop | [#12](https://github.com/rodrigosnader/PMOS/issues/12) |
| Stakeholder comms | Auto-generated weekly/monthly digest | [#13](https://github.com/rodrigosnader/PMOS/issues/13) |

---

## 10. Glossary

- **Product** — a tracked product/workspace. All data is scoped to one.
- **Module** — one of Discover / Listen / Compare; defines the lens on collected data.
- **Source** — an activated collector instance (e.g. "Hacker News with query X for product Y in Discover").
- **Item** — one collected record (post, comment, paper, repo, review, etc.).
- **Label** — a pre-filter tag attached to an item (`trend`, `pain point`, `feature request`, `bug report`, ...).
- **Report** — per-module LLM output: highlights + themes + categories.
- **Suggestion** — an aggregate-level feature opportunity with evidence.
- **PRD** — the spec written from a suggestion (or manually) in `/prds`.
- **Issue** — the GitHub issue created from a PRD; the handoff to delivery.
