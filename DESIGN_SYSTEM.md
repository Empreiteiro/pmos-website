# Neuromancer — Design System

Portable reference for the tokens, typography, components and motion that
give the site its look. Copy-paste into any stack (plain HTML, Tailwind v4,
vanilla CSS, any React / Vue / Svelte build). Everything is driven by CSS
custom properties — no hidden framework magic.

---

## 1. Principles

1. **Dark-first with a real light mode.** Tokens live under
   `[data-theme="dark"]` and `[data-theme="light"]`; both are tuned
   pixel-for-pixel, not auto-inverted.
2. **One accent, used sparingly.** Electric indigo (`#3F46FF`) shows up on
   the primary CTA, active chip, SVG blobs, selection highlight, section
   eyebrows — and almost nowhere else.
3. **Two type families do all the work.** A display serif (Instrument Serif)
   for headlines, a clean grotesque (Inter) for body, and a mono (Geist
   Mono) for labels and code.
4. **Motion is optional.** Every animation checks
   `prefers-reduced-motion: reduce` and falls back to an instant state.
5. **Surfaces, not shadows.** Elevation comes from 1px borders and a slight
   background tint (`--bg-secondary`), not drop shadows.

---

## 2. Color tokens

All colors are CSS custom properties on `:root[data-theme="..."]`. Use them
directly (`var(--fg-primary)`) — don't reference the hex values.

### Dark (default)

| Token              | Value     | Role                                  |
| ------------------ | --------- | ------------------------------------- |
| `--bg-primary`     | `#0a0a0a` | Page background                       |
| `--bg-secondary`   | `#141414` | Card surface, subtle panels           |
| `--bg-tertiary`    | `#1c1c1c` | Elevated / hover states               |
| `--fg-primary`     | `#f5f5f4` | Headings, primary text                |
| `--fg-secondary`   | `#a8a29e` | Body / muted text                     |
| `--fg-tertiary`    | `#78716c` | Meta text (dates, mono labels)        |
| `--border`         | `#2a2a2a` | Interactive borders                   |
| `--border-soft`    | `#1f1f1f` | Section dividers                      |
| `--accent`         | `#3f46ff` | CTAs, links, active state, selection  |
| `--accent-hover`   | `#5a60ff` | Accent hover (lighter on dark)        |
| `--selection-bg`   | `#3f46ff` | `::selection` background              |
| `--selection-fg`   | `#ffffff` | `::selection` foreground              |

### Light

| Token              | Value     |
| ------------------ | --------- |
| `--bg-primary`     | `#ffffff` |
| `--bg-secondary`   | `#fafaf9` |
| `--bg-tertiary`    | `#f5f5f4` |
| `--fg-primary`     | `#0a0a0a` |
| `--fg-secondary`   | `#57534e` |
| `--fg-tertiary`    | `#78716c` |
| `--border`         | `#e7e5e4` |
| `--border-soft`    | `#f5f5f4` |
| `--accent`         | `#3f46ff` |
| `--accent-hover`   | `#2a31d9` |
| `--selection-bg`   | `#3f46ff` |
| `--selection-fg`   | `#ffffff` |

### Theme bootstrap (no flash)

Persist the choice in `localStorage` and apply it before hydration with a
tiny inline script in `<head>`:

```html
<script>
  (function () {
    try {
      var t = localStorage.getItem('theme');
      document.documentElement.dataset.theme = t === 'light' ? 'light' : 'dark';
    } catch (e) {
      document.documentElement.dataset.theme = 'dark';
    }
  })();
</script>
```

---

## 3. Typography

Three families, each loaded once.

| Family              | Role                        | Weight | Where it goes                     |
| ------------------- | --------------------------- | ------ | --------------------------------- |
| **Instrument Serif** | Display / headlines         | 400    | Every `<h1>`, `<h2>`, `.serif`    |
| **Inter**            | Body / UI                   | 400–600 | `<body>`, buttons, paragraphs    |
| **Geist Mono**       | Mono / labels / code        | 400–600 | Eyebrows, pills, `<code>`, badges |

All three are free / open-source (Google Fonts + Vercel Fonts).

### CSS variables

```css
:root {
  --font-serif: 'Instrument Serif', ui-serif, Georgia, serif;
  --font-sans:  'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif;
  --font-mono:  'Geist Mono', ui-monospace, 'SF Mono', Menlo, monospace;
}

body {
  font-family: var(--font-sans);
  font-feature-settings: 'ss01', 'cv11';
}

.serif {
  font-family: var(--font-serif);
  letter-spacing: -0.01em;
  font-feature-settings: 'ss01';
}

.mono {
  font-family: var(--font-mono);
  font-feature-settings: 'ss01', 'zero';
}
```

### Optical trim on big serif headlines

Instrument Serif's default line-height adds extra space above the cap
height. A `::before`/`::after` trick removes it on the hero headline:

```css
.serif-display::before,
.serif-display::after {
  content: '';
  display: block;
  height: 0;
}
.serif-display::before { margin-top:    -0.18em; }
.serif-display::after  { margin-bottom: -0.18em; }
```

### Scale (used on the live site)

Headlines use `clamp()` so they scale with viewport. Body uses fixed sizes.

| Use                | Size                                   | Family  |
| ------------------ | -------------------------------------- | ------- |
| Hero H1            | `clamp(2.75rem, 7vw, 6rem)`            | serif   |
| Page H1            | `clamp(2.25rem, 5.5vw, 4.5rem)`        | serif   |
| Section H2         | `clamp(2rem, 4.5vw, 3.5rem)`           | serif   |
| Sub-section H3     | `1.375rem` – `1.75rem`                 | serif   |
| Body lead          | `1.125rem` (lg) / `1.25rem` (xl)       | sans    |
| Body               | `1rem`                                 | sans    |
| Eyebrow / label    | `11px`, uppercase, `tracking: 0.14em`  | mono    |
| Meta / mono inline | `12.5–13.5px`                          | mono    |

### Global rules

```css
h1, h2, h3 { letter-spacing: -0.02em; line-height: 1.05; }
p          { hyphens: auto; line-height: 1.55; max-width: 72ch; }
```

---

## 4. Layout

### Breakpoints

Aligned to em units so they track user font-size.

| Token             | Value  | Notes                       |
| ----------------- | ------ | --------------------------- |
| `--breakpoint-xs` | `30em` | Tablet-portrait and above   |
| `--breakpoint-md` | `48em` | Tablet-landscape and above  |
| `--breakpoint-lg` | `62em` | Desktop (header nav, etc.)  |

### Container

```css
.container-app {
  max-width: 1280px;
  margin-inline: auto;
  padding-inline: clamp(1.5rem, 4vw, 3rem);
}
```

### Vertical rhythm

- Section outer padding: `py-20 md:py-24` (80–96px).
- Intro headline blocks: `mb-10 md:mb-14` from content.
- Card grids: `gap-4 md:gap-5`.

---

## 5. Components

All components are styleable plain HTML — no framework lock-in. Class
definitions can be pasted straight into a global stylesheet.

### 5.1 Surface

A simple card used as the base for almost every panel (endpoint rows,
pillars, callouts, footer CTA box).

```css
.surface {
  background: var(--bg-secondary);
  border: 1px solid var(--border-soft);
  border-radius: 16px;
  overflow: hidden;
  transition: border-color 200ms ease, background 200ms ease;
}
.surface:hover { border-color: var(--border); }
```

### 5.2 Buttons

Three variants. All pill-shaped, 9px side-padding on a ~14px font.

```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.625rem 1rem;
  font-weight: 500;
  font-size: 0.9375rem;
  line-height: 1;
  border-radius: 9999px;
  white-space: nowrap;
  cursor: pointer;
  transition: background 150ms ease, color 150ms ease, border-color 150ms ease;
}

.btn-primary {
  background: var(--accent);
  color: #fff;
  border: 1px solid var(--accent);
}
.btn-primary:hover,
.btn-primary:focus-visible {
  background: var(--accent-hover);
  border-color: var(--accent-hover);
}

.btn-ghost {
  background: transparent;
  color: var(--fg-primary);
  border: 1px solid var(--border);
}
.btn-ghost:hover { background: var(--bg-secondary); border-color: var(--fg-tertiary); }

.btn-text {
  background: transparent;
  color: var(--fg-primary);
  padding: 0.5rem 0.75rem;
  border: 1px solid transparent;
}
.btn-text:hover { background: var(--bg-secondary); }
```

### 5.3 Chips (pill tags)

```css
.chip {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.45rem 0.85rem;
  border-radius: 9999px;
  border: 1px solid var(--border);
  background: var(--bg-secondary);
  color: var(--fg-secondary);
  font-size: 0.8125rem;
  transition: background 150ms ease, color 150ms ease, transform 150ms ease;
}
.chip:hover {
  color: var(--fg-primary);
  border-color: var(--fg-tertiary);
  background: var(--bg-tertiary);
  transform: translateY(-1px);
}
.chip[data-active="true"] {
  border-color: var(--accent);
  color: var(--fg-primary);
  background: color-mix(in oklab, var(--accent) 14%, var(--bg-secondary));
}
```

### 5.4 Category pill (tiny, accent-tinted)

```css
.cat-chip {
  display: inline-flex;
  padding: 0.25rem 0.55rem;
  border-radius: 9999px;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--accent);
  border: 1px solid color-mix(in oklab, var(--accent) 40%, transparent);
  background: color-mix(in oklab, var(--accent) 10%, transparent);
}
```

### 5.5 Eyebrow label

Used above every section heading.

```html
<div class="mono eyebrow">Features</div>
```

```css
.eyebrow {
  font-family: var(--font-mono);
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: var(--fg-tertiary);
}
```

### 5.6 Arrow-link (text link with sliding arrow)

```html
<a href="..." class="arrow-link">
  Read more <svg class="arrow">...</svg>
</a>
```

```css
.arrow-link .arrow {
  display: inline-block;
  transition: transform 150ms ease;
}
.arrow-link:hover .arrow,
.arrow-link:focus-visible .arrow {
  transform: translateX(0.2em);
}
.arrow-link:hover { color: var(--fg-primary); }
```

### 5.7 Method / flag badges (docs page)

```css
.method-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-mono);
  font-size: 10.5px;
  font-weight: 600;
  letter-spacing: 0.04em;
  padding: 3px 7px;
  border-radius: 6px;
  border: 1px solid var(--border);
  background: var(--bg-tertiary);
  min-width: 48px;
}

.method-get    { color: var(--fg-secondary); background: transparent; }
.method-post   { color: var(--accent); border-color: color-mix(in oklab, var(--accent) 40%, transparent); background: color-mix(in oklab, var(--accent) 10%, transparent); }
.method-put    { color: #c9a227; border-color: color-mix(in oklab, #c9a227 45%, transparent); background: color-mix(in oklab, #c9a227 10%, transparent); }
.method-patch  { color: #8a7fd1; border-color: color-mix(in oklab, #8a7fd1 45%, transparent); background: color-mix(in oklab, #8a7fd1 10%, transparent); }
.method-delete { color: #d47a7a; border-color: color-mix(in oklab, #d47a7a 45%, transparent); background: color-mix(in oklab, #d47a7a 10%, transparent); }
```

---

## 6. Borders, radius, elevation

| Token           | Value           | Use                                |
| --------------- | --------------- | ---------------------------------- |
| Border soft     | 1px `--border-soft` | Section dividers, card rests  |
| Border default  | 1px `--border`      | Interactive, hover, focus     |
| Radius XS       | `6px`           | Method badges                      |
| Radius S        | `8px`           | Inline tokens, code blocks         |
| Radius M        | `12px` (`rounded-xl`) | Dropdown items             |
| Radius L        | `16px`          | Surfaces, cards                    |
| Radius full     | `9999px`        | Buttons, chips                     |

**No drop shadows on surfaces.** A single 1px border against the slightly
lighter `--bg-secondary` reads as elevation. The only shadow in the whole
site is on the chip tooltip (`0 8px 24px rgba(0,0,0,0.18)`).

---

## 7. Motion

### Durations

| Duration | Used for                                   |
| -------- | ------------------------------------------ |
| `150ms`  | Hover transitions (arrow slide, chip lift) |
| `180ms`  | Tooltips (fade + scale)                    |
| `200ms`  | Surface border-color, background tints     |
| `300ms`  | Icon rotation, accordion height, hover-dim |
| `400ms`  | Scroll reveal per card                     |
| `500ms`  | Hamburger, mobile menu clip-path           |
| `600ms`  | Nav dropdown clip-path reveal              |
| `800ms`  | Filter panel expand                        |
| `15s`    | Hero blob drift (infinite alternate)       |
| `60s`    | Post marquee full cycle                    |

### Easings

| Easing                                    | Use                                   |
| ----------------------------------------- | ------------------------------------- |
| `ease-in-out`                             | Default CSS transitions               |
| `cubic-bezier(0.16, 1, 0.3, 1)`           | Nav dropdowns, mobile menu, hamburger |
| `power3.out` (GSAP) / `cubic-bezier(0.16, 1, 0.3, 1)` | Reveal, filter expand       |
| `power1.inOut` (GSAP)                     | Accordions                            |
| `none` (linear)                           | Auto-scroll marquee                   |

### Reduced-motion rule

Put this once at the bottom of your stylesheet:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
  }
}
```

And in JS: every motion hook checks the media query and returns an instant
end state instead of animating.

---

## 8. Focus & selection

```css
:focus { outline: none; }
:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
  border-radius: 2px;
}

::selection {
  background: var(--selection-bg);
  color: var(--selection-fg);
}
```

Skip-to-content link, visually hidden until focused:

```css
.skip-link {
  position: fixed;
  top: 0; left: 0;
  padding: 0.75rem 1rem;
  background: var(--accent);
  color: #fff;
  font-weight: 500;
  transform: translateY(-120%);
  transition: transform 200ms ease;
  z-index: 100;
}
.skip-link:focus-visible { transform: translateY(0); }
```

---

## 9. Decorative patterns

### 9.1 Hero blob

An SVG radial gradient behind the hero, animated by a simple CSS
keyframe. Respects reduced-motion.

```html
<div class="hero-blob">
  <svg viewBox="0 0 600 480">
    <defs>
      <radialGradient id="blobGrad" cx="50%" cy="50%" r="60%">
        <stop offset="0%"  stop-color="var(--accent)" stop-opacity="0.55"/>
        <stop offset="55%" stop-color="var(--accent)" stop-opacity="0.18"/>
        <stop offset="100%" stop-color="var(--accent)" stop-opacity="0"/>
      </radialGradient>
      <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="40"/>
      </filter>
    </defs>
    <path
      d="M300,80 C400,80 470,130 500,220 C530,310 480,380 400,420
         C320,460 220,440 160,380 C100,320 80,220 140,150
         C190,90 250,80 300,80 Z"
      fill="url(#blobGrad)" filter="url(#soft)"/>
  </svg>
</div>

<style>
.hero-blob {
  animation: blobDrift 15s ease-in-out infinite alternate;
  will-change: transform;
}
@keyframes blobDrift {
  0%   { transform: translate3d(-4%,  0,   0) scale(0.95) rotate( 0deg); }
  50%  { transform: translate3d( 4%, -3%,  0) scale(1.02) rotate(-4deg); }
  100% { transform: translate3d(-2%,  4%,  0) scale(1.05) rotate( 3deg); }
}
</style>
```

### 9.2 Noise overlay

A 0.12-opacity SVG noise pattern on top of decorative areas, adds warmth
without introducing a raster asset.

```css
.noise {
  position: absolute; inset: 0;
  pointer-events: none;
  mix-blend-mode: overlay;
  opacity: 0.12;
  background-image: url("data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.6 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");
}
```

### 9.3 Callout with accent rail

```html
<div class="callout">
  <div class="callout-rail"></div>
  <div class="eyebrow">SSE events</div>
  ...content...
</div>
```

```css
.callout {
  position: relative;
  border-radius: 16px;
  padding: 1.5rem 1.75rem;
  border: 1px solid var(--border-soft);
  background: linear-gradient(
    180deg,
    color-mix(in oklab, var(--accent) 8%, var(--bg-secondary)) 0%,
    var(--bg-secondary) 100%
  );
}
.callout-rail {
  position: absolute;
  left: 0; top: 1.5rem; bottom: 1.5rem;
  width: 3px;
  border-radius: 0 999px 999px 0;
  background: var(--accent);
}
```

---

## 10. Utilities

- `color-mix(in oklab, <accent>, <alpha>)` for translucent tints.
- `clamp()` for every headline size.
- `:not(:hover):not(:focus-within)` pattern for hover-dim groups.
- Stable class hooks for group behavior (`[data-hover="true"] .card:not(:hover) { opacity: 0.3 }`).

---

## 11. Porting checklist

1. **Copy the two `:root[data-theme]` blocks** into your stylesheet.
2. **Load the three fonts.** Either via Google Fonts `<link>` or a framework
   font loader. Expose them as `--font-serif`, `--font-sans`, `--font-mono`.
3. **Add the `@media (prefers-reduced-motion: reduce)` guard** at the end.
4. **Copy any component blocks you need** (`.surface`, `.btn*`, `.chip*`,
   `.eyebrow`, `.arrow-link`, `.method-badge`, `.callout`). They only
   depend on the tokens above.
5. **Set the theme attribute early** (inline `<head>` script from §2).
6. **Bind `::selection` and `:focus-visible`** once.

That's it — no build step, no framework required. If you're on Tailwind
v4, you can also expose the tokens to Tailwind via:

```css
@theme inline {
  --color-bg-primary:   var(--bg-primary);
  --color-fg-primary:   var(--fg-primary);
  --color-accent:       var(--accent);
  --font-sans:          var(--font-sans);
  --font-serif:         var(--font-serif);
  --font-mono:          var(--font-mono);
  --breakpoint-md:      48em;
  --breakpoint-lg:      62em;
}
```

…so `bg-bg-primary`, `text-fg-primary`, `text-accent`, `font-serif`,
`lg:...` all work out of the box.

---

## 12. Where to look in the live code

| Concept                 | File                                               |
| ----------------------- | -------------------------------------------------- |
| Tokens + base           | `src/app/globals.css`                              |
| Fonts wiring            | `src/app/layout.tsx`                               |
| Theme provider / toggle | `src/components/theme-provider.tsx` · `theme-toggle.tsx` |
| Button / chip markup    | any page using `.btn-primary`, `.chip`             |
| Hero blob               | `src/components/hero.tsx`                          |
| Method badges           | `src/components/api-docs/endpoint-row.tsx`         |
| Reveal / parallax hooks | `src/hooks/use-gsap-*.ts`                          |
