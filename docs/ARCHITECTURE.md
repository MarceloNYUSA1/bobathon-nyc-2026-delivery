# Calm Skies Journey Builder — Architecture

Version 1.2 · BOB-001B (enterprise SDLC reframe)

> This document distinguishes four concerns: (a) technical architecture for the human use case, (b) adoption path for enterprise providers (not built), (c) alternatives rejected and why, (d) Bob's SDLC-level constraints.

---

## Design Goals

- Zero backend, zero build step, zero framework — deploy by dropping files on any static host.
- Journey logic is pure functions: independently testable in Node.js, no DOM needed.
- Accessibility is structural, not cosmetic: semantic HTML first, CSS second.
- State lives only in the page session; no localStorage, no cookies.

---

## File Layout

```
(repo root)/
├── index.html              # Single entry point; semantic HTML shell + form
├── package.json            # scripts: { "start": "node scripts/serve.js" }; devDependencies: axe-core, jsdom
├── scripts/
│   └── serve.js            # Node built-ins only; serves repo on http://localhost:8080 (needed for ES modules)
├── app/
│   ├── main.js             # Thin DOM layer: read form → call journey functions → render outputs
│   ├── render.js           # DOM helpers: use textContent / escape() for user text; no innerHTML of raw input
│   └── app.css             # All styles (screen + @media print); NO inline styles in HTML
├── src/
│   └── journey/
│       ├── story.js        # buildStory(inputs) → string (HTML-safe, user text escaped)
│       ├── journey.js      # buildJourney(inputs) → Step[] (My Airport Journey)
│       ├── calmKit.js      # buildCalmKit(inputs) → Item[] (My Calm Kit)
│       ├── parentChecklist.js  # buildParentChecklist(inputs) → Checklist (Parent Checklist)
│       └── resources.js    # RESOURCES constant exported (no fetch, no JSON file needed)
├── tests/
│   ├── story.test.js
│   ├── journey.test.js
│   ├── calmKit.test.js
│   ├── parentChecklist.test.js
│   ├── resources.test.js
│   ├── a11y.test.js        # axe-core/jsdom: label, heading-order, image-alt, aria rules; XSS NF6 tests; focus tests
│   ├── integration.test.js
│   ├── serve.test.js
│   └── wording.test.js
├── evidence/
│   └── BOBATHON_EVIDENCE.md  # Append one row per completed task
└── docs/
    ├── REQUIREMENTS.md
    ├── ARCHITECTURE.md
    ├── ACCESSIBILITY_REPORT.md  # Browser contrast + focus checks (BOB-010)
    ├── RESPONSIBLE_ENGINEERING.md  # Privacy & security review (BOB-017)
    ├── demo-script.md           # 3-minute and 5-minute demo scripts
    └── plan.md
```

---

## Data Flow

```
[index.html form]
      │  user clicks "Build My Journey"
      ▼
[app/main.js]  readInputs() → InputObject
      │
      ├──► src/journey/story.js          buildStory(inputs)         → string
      ├──► src/journey/journey.js        buildJourney(inputs)       → Step[]
      ├──► src/journey/calmKit.js        buildCalmKit(inputs)       → Item[]
      ├──► src/journey/parentChecklist.js buildParentChecklist(inputs) → Checklist
      └──► src/journey/resources.js      RESOURCES                  → Resource[]
                                                    │
                                          [app/render.js]
                                         renderAll(outputs) → DOM updates
                                                    │
                                          [index.html #outputs section]
                                         (5 output sections visible)
```

**State location:** `InputObject` is a plain JS object built fresh on each form submission. No global mutable state. The Step navigator in My Airport Journey keeps a `currentStep` integer in a closure inside `render.js`.

---

## Module Responsibilities

| Module | Input | Output | Side effects |
|--------|-------|--------|--------------|
| `story.js` | InputObject | `string` (HTML-safe) | None |
| `journey.js` | InputObject | `Step[]` `{label, description, tip, symbol}` | None |
| `calmKit.js` | InputObject | `Item[]` `{id, label, checked}` | None |
| `parentChecklist.js` | InputObject | `{beforeHome: Item[], perStage: Item[], notes: string}` | None |
| `resources.js` | — | `Resource[]` `{name, url, description, source}` | None |
| `render.js` | output objects | DOM mutations | Writes to `#outputs` element |
| `main.js` | DOM events | — | Calls journey fns + render |

All `src/journey/` modules are **pure**: same input → same output, no I/O, no DOM, no global writes.

---

## Test Strategy

### Unit tests (`tests/*.test.js`, run with `node --test tests/*.test.js`)

Each journey module has a dedicated test file. Key assertions:

- **story.test.js**: name in first paragraph; noise sensitivity adds "headphones" or "quiet"; first-flight flag adds "first time" or "first flight".
- **journey.test.js**: 10 steps returned; each step has `label`, `description`, `tip`; tip adapts per sensitivity.
- **calmKit.test.js**: ≥ 8 items by default; noise=true adds headphones item; disclaimer property present.
- **parentChecklist.test.js**: `beforeHome` ≥ 6 items; `perStage` ≥ 5 items; concern text echoed in notes.

### Automated accessibility check (`tests/a11y.test.js`)

Uses **axe-core** via **jsdom** to parse `index.html` (with outputs rendered for the demo scenario) and assert zero violations in the rules: `label`, `heading-order`, `image-alt`, and aria rules.

> **Scope boundary (important):** axe-core under jsdom cannot evaluate computed CSS, so colour contrast (A3) and focus-indicator visibility (A4) are **not tested here**. Those are checked manually in a real browser (Chrome DevTools + axe DevTools extension) and results are recorded in `docs/ACCESSIBILITY_REPORT.md`. Never report A3/A4 as passing from this test.

---

## Deployment

Static files only. Deployment options in order of preference:

1. **GitHub Pages** — push to `main`, enable Pages from root. No build step. Steps documented in `DEPLOYMENT.md`.
2. **Any CDN / static host** — copy files; no server required.
3. **Local development** — ES modules do not load from `file://`. Use `npm start` (runs `scripts/serve.js` on http://localhost:8080, Node built-ins only, no `npx`, no downloads).

---

## Alternatives Rejected

### 1 — React / Vue SPA

- **Why considered:** Component model maps naturally to the 5 output panels; good ecosystem for accessibility tooling.
- **Why rejected:** Adds a build step (Vite/webpack), a `node_modules` tree of hundreds of packages, and a JS bundle that needs hydration. For a static form-to-output tool with no routing, the overhead is disproportionate. A plain ES module per output section achieves the same separation with zero toolchain dependency.

### 2 — Backend + Database (Node/Express + SQLite)

- **Why considered:** Could persist journeys, allow sharing, and support server-side rendering for SEO.
- **Why rejected:** Directly violates the responsible-engineering rule ("keep it in the browser session; no server storage, no accounts"). It also increases attack surface (user data at rest), requires hosting infrastructure, and adds cost and complexity incompatible with a one-day Bobathon build. The demo requirement is offline-capable, which a backend breaks.

---

## Adoption Path (not built)

How a travel provider — airline, airport, or accessibility-focused travel app — could adopt Calm Skies as a white-labelled experience. **None of these items are built; they are design intentions enabled by the current architecture.**

### Hosting

Drop the static files (`index.html`, `app/`, `src/`) on any CDN, object store, or GitHub Pages. No Node.js runtime is needed in production. The `scripts/serve.js` server is for local development only.

### Branding

All colours and fonts are CSS custom properties in [`app/app.css`](../app/app.css). A provider overrides `--color-accent`, `--color-bg` and `--font` without touching any logic file.

### Content extension

Journey steps, kit items, checklist items and resources live entirely in [`src/journey/`](../src/journey/). A content team can update them and run `npm test` to verify correctness without understanding `app/render.js` or `index.html`.

### Governance

Every change produces a commit. Every commit that changes logic requires passing tests. The requirement-to-commit traceability (EA2) means a provider audit team can follow any user-facing string back to a requirement ID, a test, and a commit hash.

### Compliance burden

The design deliberately keeps compliance burden low:
- **No personal data at rest** — nothing to encrypt, breach-notify, or delete
- **No authentication** — no session tokens, no CSRF risk
- **No backend** — no server-side attack surface
- **No third-party scripts** — CSP `default-src 'self'` enforced via `<meta>`

A provider adding analytics or accounts would need to reassess these claims.

---

## Key Constraints Re-stated

| Constraint | Enforcement |
|------------|-------------|
| No server calls | `Content-Security-Policy: default-src 'self'` in a `<meta>` tag; network tab verified during demo. |
| No inline styles/scripts | CSP `default-src 'self'` blocks inline scripts. All CSS in `app/app.css`; no `<style>` tags or `style=` attributes in HTML. |
| No frameworks | No `import` from npm in `app/` or `src/`; resources are a JS module, not a JSON fetch. |
| XSS prevention | User text inserted via `el.textContent = value` or a single `escapeHtml()` helper; never raw `innerHTML` of user input. |
| Accessibility | axe-core/jsdom for structural rules; browser + axe DevTools for contrast and focus; all results in `docs/ACCESSIBILITY_REPORT.md` (exists). |
| Pure journey functions | `node --test` runs without a browser; any DOM import is a test failure. |
