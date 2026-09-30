# Responsible Engineering Review — Calm Skies Journey Builder

**BOB-017 · Privacy & Security Review**
Review date: 2026-09-29 · Reviewer: Bob (IBM Codex agent) + design review outside Bob

---

## 1. Data Handling

### 1.1 Inputs collected

The form collects 7 fields. One (`childName`) must be non-empty for the form to submit; all others are optional:

| # | Field | Type | Required |
|---|-------|------|----------|
| 1 | `childName` | Free text | **Yes** |
| 2 | `ageRange` | Select | No |
| 3 | `firstFlight` | Radio (yes/no) | No |
| 4 | `departure` | Free text | No |
| 5 | `destination` | Free text | No |
| 6 | `sensitivities` | Multi-checkbox | No |
| 7 | `commPref` | Radio | No |

*(The `concern` field exists in `readInputs` in `app/main.js` but is not exposed in the current form.)*

### 1.2 Data lifecycle

**Checked by**: static code scan of `app/main.js`, `app/render.js`, `src/journey/*.js`, and `index.html`; browser DevTools Network panel (no requests observed after form submit on demo scenario).

- All processing happens inside the browser page via pure JavaScript functions in `src/journey/`.
- **No `localStorage`, `sessionStorage`, or cookies** — a grep across the entire codebase finds zero uses of `localStorage`, `sessionStorage`, `document.cookie`, or `Set-Cookie`.
- **No network requests** — no `fetch()`, `XMLHttpRequest`, `navigator.sendBeacon()`, `WebSocket`, or `<img src>` pixel calls. Resources are compiled-in constants (`src/journey/resources.js`). A Network panel check after submit confirmed 0 outgoing requests.
- Closing or refreshing the tab discards all data. There is no persistence layer.
- The printed page (browser Print / Save as PDF) is the family's own copy; no copy is retained by the app.

---

## 2. Content Boundaries

**Checked by**: manual review of all 5 output modules (`story.js`, `journey.js`, `calmKit.js`, `parentChecklist.js`, `resources.js`) and automated wording tests (`tests/wording.test.js`).

### 2.1 No diagnosis, treatment, or medical advice

- All five output modules produce practical travel preparation content only.
- Sensitivities (noise, crowds, transitions, waiting) are treated as preferences that shape how steps are described, not as clinical categories.
- No symptom, diagnosis, treatment, medication, or medical instruction appears in any module.

### 2.2 Calm Kit disclaimer

`buildCalmKit()` in `src/journey/calmKit.js` includes a `disclaimer` field rendered in a `<p class="disclaimer" role="note">` element. The disclaimer text is escaped via `escapeHtml()` before insertion.

### 2.3 No guarantees about airlines, airports, or TSA

Enforced in `tests/wording.test.js`:

- `'will help a lot'` banned (use `'can help'`).
- `'always'` banned as a guarantee.
- `'guarantee'` banned entirely.
- Story and journey steps must not instruct shoe removal at security (TSA policy varies by age and situation).
- Exit sign colour claim removed (not universally true in US airports).
- Story ending must use `'arrived'`, not `'has begun'`.

All 11 wording tests pass (verified by `node --test tests/wording.test.js`).

### 2.4 External resources

Resources in `src/journey/resources.js` carry `source` and `lastChecked` fields. Each resource card in `render.js` displays:
- A labelled external link (`rel="noopener noreferrer"`, opens in new tab with `↗` indicator).
- A `Source:` line with the originating organisation.
- A prefatory paragraph: *"These links go to external organisations. They are listed as sources of information only — Calm Skies Journey Builder is not affiliated with them."*

Links were last verified on **2026-09-29** (recorded in `lastChecked` per resource).

---

## 3. Security Findings

All three findings were identified and fixed before the responsible engineering review.

| Finding | Found by | Fix | Commit | Test |
|---------|----------|-----|--------|------|
| **XSS via free-text inputs** — `childName`, `departure`, `destination`, and `concern` are inserted into HTML markup. Without escaping, a crafted value like `<script>…</script>` would execute. | Design review outside Bob | `escapeHtml()` function in `app/render.js`; all user-supplied values routed through it or `textContent` before DOM insertion. Render functions never interpolate raw input. | f61fd41, ff7b557 | NF6 tests in `tests/a11y.test.js` |
| **Dev server listening on all interfaces** — default `0.0.0.0` binding made the server reachable from the local network. | Code review outside Bob | `createAppServer()` in `scripts/serve.js` binds to `127.0.0.1` only. An explicit path allow-list (`ALLOWED_PREFIXES`) returns 404 for anything outside `index.html`, `app/`, `src/`, `assets/`. | d5367cc | `tests/serve.test.js` — sensitive-path tests (6 tests) |
| **Encoded path traversal** — percent-encoded sequences (`%2f`, `%5c`, `%2e%2e`, double-encoded `%25`) could bypass a naive prefix check and escape the web root. Found by a probe outside Bob (20 payloads). | Probe outside Bob (20 payloads) | `resolveRequestPath()` in `scripts/serve.js` decodes fully with `decodeURIComponent` first, rejects backslashes and NUL bytes, then `posix.normalize`s, allow-list checks, and asserts `startsWith(ROOT + sep)`. | ae070d5 | regression tests in `tests/serve.test.js` (18 tests total) |

---

## 4. Residual Risks

| Risk | Likelihood | Impact | Mitigation | Owner |
|------|-----------|--------|------------|-------|
| **Dev server is for local development only** — it has no TLS, no rate limiting, and no authentication. Running it on a shared or public network (e.g. `0.0.0.0`) would expose the app to other devices. | Low (requires deliberate action) | Medium | Server binds to `127.0.0.1` by default; documented in `DEPLOYMENT.md` and in `scripts/serve.js` header. For production, use a static host (GitHub Pages, Netlify). | Deployer |
| **No CSP reporting endpoint** — the `Content-Security-Policy` meta tag restricts sources but cannot report violations back to a server. Misconfigurations may be silent. | Low | Low | CSP is set correctly per `index.html`; source-only, no inline scripts. Periodic review recommended. | Maintainer |
| **Content accuracy needs periodic human review** — journey steps, resource links, and TSA guidance reflect information as of 2026-09-29. Procedures (e.g. TSA PreCheck, airline boarding policies) may change. | Medium over time | Medium | All resources carry `lastChecked` dates. Review before re-publishing after any significant policy change. External resources link to their authoritative source. | Project lead |
| **No WCAG compliance audit** — semantic HTML, visible focus, contrast, and reduced motion are targeted (WCAG 2.2 AA intent) but no formal automated or manual audit was completed. | N/A | N/A | Claim is "WCAG 2.2 AA target, not audited". Do not claim compliance. | Maintainer |

---

## 5. Scope and Limitations

This document covers what was checked and how. It does not extend to:

- Network infrastructure, CDN, or hosting provider security (out of scope for a static app).
- Third-party external sites linked in the Resources section (each is its own owner).
- Browser security (same-origin policy, extension behaviour) — these are browser responsibilities.
- Physical or operational security during travel — Calm Skies provides preparation content only.

---

*This document was produced with IBM Bob (Codex agent) as part of the Bobathon NYC 2026 project — BOB-017.*
