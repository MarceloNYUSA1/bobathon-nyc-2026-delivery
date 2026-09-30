# Bob session 02 — (untitled)

- Bob task id: `311b5768beb8a5d8fb6b223a821713a2`
- Messages: 16 (system prompt omitted)
- Time (ET): 9/29/2026, 14:53:32 → 9/29/2026, 14:56:21
- Source: exported verbatim from IBM Bob's local task database (`~/.bob/db/bob.db`) by `export-bob-sessions.mjs`

---

### user · 9/29/2026, 14:53:32

Read .bob/rules and docs/plan.md. Then do comms/delivered/2026-09-29T14-24-16-563Z.md (message 4): BOB-002b path traversal fix with raw-request tests, then BOB-003b wording test covering all 5 outputs. Commit and report each in comms/outbox.md. Keep edits targeted.

### assistant · 9/29/2026, 14:53:35

INBOX RECEIVED 5

### tool · tool `read_file` · 9/29/2026, 14:53:35

```json
{
  "path": "docs/plan.md"
}
```

```text
Contents of file docs/plan.md:

1 | # Calm Skies Journey Builder — Task Plan
2 | 
3 | Version 1.1 · BOB-001 (reviewed)
4 | 
5 | ---
6 | 
7 | ## Project Summary
8 | 
9 | **Idea:** Calm Skies Journey Builder  
10 | **Problem:** Autistic children and their caregivers face high anxiety preparing for air travel because the airport experience is unpredictable, sensory-intense, and underdocumented for their needs.  
11 | **In scope (must demo):** Form inputs → 5 outputs (Flight Story, Airport Journey, Calm Kit, Parent Checklist, Accessibility Resources); keyboard navigation; print support; demo scenario Sam JFK→MCO.  
12 | **Out of scope:** Accounts, backend, real flight data, multi-language, clinical advice.  
13 | **Fallback if behind:** Deliver Story + Journey + Resources only; Kit and Checklist deferred to P1.
14 | 
15 | ---
16 | 
17 | ## Task Queue
18 | 
19 | ### P0 — Demo path works end to end with tests
20 | 
21 | ---
22 | 
23 | #### BOB-002 · Project scaffold and index.html shell
24 | **Priority:** P0
25 | **Files:** `index.html` (repo root), `package.json`, `scripts/serve.js`, `app/main.js`, `app/render.js`, `app/app.css`, `evidence/BOBATHON_EVIDENCE.md` (created), `tests/a11y.test.js` (stub)
26 | **What:** Create the static file structure defined in ARCHITECTURE.md. `index.html` at repo root contains the semantic form (all 7 labelled inputs, no pre-selected age), an `#outputs` section, and loads `app/main.js` as an ES module. All CSS in `app/app.css` (no inline styles). `scripts/serve.js` serves the repo on http://localhost:8080 using Node built-ins only. `package.json` exposes `npm start`. `escapeHtml()` helper in `app/render.js`. Evidence file created. No `content/` directory — resources will be a JS module.
27 | **Acceptance criteria:**
28 | - `index.html` opens via `npm start`; form renders with all 7 labelled controls; no value pre-selected for age.
29 | - Clicking "Build My Journey" logs an InputObject to console (no errors).
30 | - `app/app.css` contains `@media print` rule hiding the form; no `<style>` tags in HTML.
31 | - axe-core scan on the shell returns zero `label` and `heading-order` violations.
32 | - `escapeHtml('<img src=x onerror=alert(1)>')` returns the HTML-entity-escaped string (NF6 test in `tests/a11y.test.js`).
33 | **Tests:** `tests/a11y.test.js` with axe-core + jsdom; NF6 escape test.
34 | **Evidence:** `node --test tests/a11y.test.js` output quoted in `evidence/BOBATHON_EVIDENCE.md`; git commit hash.
35 | 
36 | ---
37 | 
38 | #### BOB-003 · Journey logic — My Flight Story  
39 | **Priority:** P0  
40 | **Files:** `src/journey/story.js`, `tests/story.test.js`  
41 | **What:** Implement `buildStory(inputs) → string`. Covers 9 narrative steps from home to destination airport exit. Name in first sentence. Sensitivities adapt copy. First-flight flag adds reassurance.  
42 | **Acceptance criteria:**
43 | - ≥ 9 steps present in output.
44 | - All R11, R12, R13 unit assertions pass.  
45 | **Tests:** `tests/story.test.js` — name in first paragraph; noise→"headphones"/"quiet"; first-flight→"first time"/"first flight".  
46 | **Evidence:** `node --test tests/story.test.js` output quoted; commit hash.
47 | 
48 | ---
49 | 
50 | #### BOB-004 · Journey logic — My Airport Journey  
51 | **Priority:** P0  
52 | **Files:** `src/journey/journey.js`, `tests/journey.test.js`  
53 | **What:** Implement `buildJourney(inputs) → Step[]` with exactly 10 steps. Each step: `{label, description, tip, symbol}`. Tips adapt to sensitivities. Symbol set for communication-preference "pictures".  
54 | **Acceptance criteria:** R20–R23 pass.  
55 | **Tests:** `tests/journey.test.js` — 10 steps; all have label+description+tip; noise tip contains "headphones"/"quiet"; pictures → symbol non-empty.  
56 | **Evidence:** `node --test tests/journey.test.js` quoted; commit hash.
57 | 
58 | ---
59 | 
60 | #### BOB-005 · Journey logic — My Calm Kit  
61 | **Priority:** P0  
62 | **Files:** `src/journey/calmKit.js`, `tests/calmKit.test.js`  
63 | **What:** Implement `buildCalmKit(inputs) → {items: Item[], disclaimer: string}`. Default ≥ 8 items; noise adds headphones; disclaimer text set.  
64 | **Acceptance criteria:** R30–R33 pass.  
65 | **Tests:** `tests/calmKit.test.js` — ≥ 8 items default; noise→headphones item; disclaimer non-empty.  
66 | **Evidence:** `node --test tests/calmKit.test.js` quoted; commit hash.
67 | 
68 | ---
69 | 
70 | #### BOB-006 · Journey logic — Parent Checklist  
71 | **Priority:** P0  
72 | **Files:** `src/journey/parentChecklist.js`, `tests/parentChecklist.test.js`  
73 | **What:** Implement `buildParentChecklist(inputs) → {beforeHome: Item[], perStage: Item[], notes: string}`. Concern echoed in notes.  
74 | **Acceptance criteria:** R40–R42 pass.  
75 | **Tests:** `tests/parentChecklist.test.js` — beforeHome ≥ 6; perStage ≥ 5; concern echoed.  
76 | **Evidence:** `node --test tests/parentChecklist.test.js` quoted; commit hash.
77 | 
78 | ---
79 | 
80 | #### BOB-007 · Accessibility Resources module
81 | **Priority:** P0
82 | **Files:** `src/journey/resources.js`, `tests/resources.test.js`
83 | **What:** Implement `src/journey/resources.js` as a pure ES module that directly exports the `RESOURCES` array (no `content/resources.json`, no fetch). ≥ 5 entries: Hidden Disabilities Sunflower, TSA Cares, airline accessibility, airport accessibility, Social Stories. Each: `{name, url, description, source}`. No JSON file; no fetch call.
84 | **Acceptance criteria:** R50–R52 pass; NF1 satisfied (no fetch); all URLs reachable (manual check recorded in evidence).
85 | **Tests:** `tests/resources.test.js` — count ≥ 5; each entry has `name`, `url`, `source`; no entry has an empty URL.
86 | **Evidence:** Test quoted; commit hash.
87 | 
88 | ---
89 | 
90 | #### BOB-008 · DOM render layer + wiring  
91 | **Priority:** P0  
92 | **Files:** `app/render.js`, `app/main.js` (updated)  
93 | **What:** Implement `render.js` functions that convert output objects to HTML and write them to the `#outputs` DOM section. Wire all 5 outputs in `main.js`. Airport Journey navigator (Previous/Next buttons) implemented as keyboard-operable controls. Calm Kit and Parent Checklist use `<input type="checkbox">` per item. Resources section uses a distinct `<section>` with different background.  
94 | **Acceptance criteria:** R60–R62, R21, R31, R41, R51 pass; demo scenario renders all 5 outputs.  
95 | **Tests:** `tests/a11y.test.js` updated to render demo scenario and run axe-core; zero violations in label/heading-order/image-alt.  
96 | **Evidence:** `node --test tests/a11y.test.js` quoted; commit hash; screenshot noted.
97 | 
98 | ---
99 | 
100 | #### BOB-009 · Full integration test + demo scenario validation  
101 | **Priority:** P0  
102 | **Files:** `tests/integration.test.js`, `evidence/BOBATHON_EVIDENCE.md`  
103 | **What:** Run all test files in sequence. Confirm demo scenario (Sam, 8–10, first flight, JFK→MCO, noise+crowds, written) produces all 5 outputs with correct content. Write evidence log entry.  
104 | **Acceptance criteria:** `node --test tests/*.test.js` — all pass, zero failures.  
105 | **Tests:** All existing test files + integration smoke test.  
106 | **Evidence:** Full test output quoted; evidence log row; commit hash.
107 | 
108 | ---
109 | 
110 | ### P1 — Polish, accessibility hardening, packaging
111 | 
112 | ---
113 | 
114 | #### BOB-010 · Accessibility hardening + ACCESSIBILITY_REPORT.md
115 | **Priority:** P1
116 | **Files:** `index.html`, `app/app.css`, `app/render.js`, `docs/ACCESSIBILITY_REPORT.md`
117 | **What:** Add visible focus rings (CSS `:focus-visible`); add `aria-live` region for Journey step changes; add `@media (prefers-reduced-motion: reduce)`; verify heading order h1→h2→h3; `lang="en"` on `<html>`; all checkboxes have associated `<label>`. Write `docs/ACCESSIBILITY_REPORT.md` documenting: (a) axe-core/jsdom result for label/heading-order/image-alt/aria rules, (b) manual browser check for contrast (A3) and focus (A4), with tool used and result.
118 | **Acceptance criteria:** A1–A8 documented; A3 and A4 results from a real browser recorded (not from jsdom); report states what was checked, how, and what result was found.
119 | **Evidence:** axe-core test output; `docs/ACCESSIBILITY_REPORT.md` committed; commit hash.
120 | 
121 | ---
122 | 
123 | #### BOB-011 · Visual design polish
124 | **Priority:** P1
125 | **Files:** `app/app.css`
126 | **What:** Apply a calm, minimal visual theme (soft blues/greens, generous whitespace, sans-serif). Ensure contrast ≥ 4.5:1. Finalize `@media print` rules in `app/app.css` (no inline styles). No `<style>` tags added to HTML.
127 | **Evidence:** Browser print preview screenshot noted; contrast verified in browser (recorded in ACCESSIBILITY_REPORT.md).
128 | 
129 | ---
130 | 
131 | #### BOB-012 · README.md — all 4 required headings  
132 | **Priority:** P1  
133 | **Files:** `README.md`  
134 | **What:** Write the 4 required submission headings: Problem statement · Detailed solution · Assumptions / approach · How Bob was used (one row per BOB-xxx task).  
135 | **Evidence:** README committed; headings verified.
136 | 
137 | ---
138 | 
139 | #### BOB-013 · docs/demo-script.md  
140 | **Priority:** P1  
141 | **Files:** `docs/demo-script.md`  
142 | **What:** 5-minute spoken demo script (see section below).  
143 | **Evidence:** File committed.
144 | 
145 | ---
146 | 
147 | #### BOB-014 · docs/submission.md + ZIP packaging  
148 | **Priority:** P1  
149 | **Files:** `docs/submission.md`, ZIP  
150 | **What:** Submission checklist and final ZIP assembly: `bob_sessions/`, `code_files/`, `README.md`, demo video.  
151 | **Evidence:** ZIP contents listed.
152 | 
153 | ---
154 | 
155 | #### BOB-017 · Privacy & security review → docs/RESPONSIBLE_ENGINEERING.md
156 | **Priority:** P1
157 | **Files:** `docs/RESPONSIBLE_ENGINEERING.md`
158 | **What:** Document what was checked and how for: XSS prevention (NF6 test result), CSP meta tag, no server storage, no third-party scripts, no cookies, responsible text (no medical advice, no guarantees). State residual risks and mitigations.
159 | **Evidence:** File committed; commit hash.
160 | 
161 | ---
162 | 
163 | #### BOB-018 · Deployment documentation → docs/DEPLOYMENT.md
164 | **Priority:** P1
165 | **Files:** `docs/DEPLOYMENT.md`
166 | **What:** Write step-by-step GitHub Pages deployment instructions (repo is private until after the event; document the steps, do not publish). Include: enable Pages from Settings → Pages → Deploy from branch `main` / root; custom domain optional; note that ES modules work when served over HTTP(S), not `file://`.
167 | **Evidence:** File committed; commit hash.
168 | 
169 | ---
170 | 
171 | ### P2 — Stretch (only after P0 complete and README drafted)
172 | 
173 | ---
174 | 
175 | #### BOB-015 · Symbol/icon set for "pictures" preference  
176 | **Priority:** P2  
177 | **Files:** `content/symbols.json`, `app/render.js`  
178 | **What:** Replace Unicode placeholders with a proper open-licence pictogram set (e.g. Mulberry Symbols or similar CC-licensed set). Each Journey step gets an illustrative symbol image with alt text.
179 | 
180 | ---
181 | 
182 | #### BOB-016 · Flesch-Kincaid readability check  
183 | **Priority:** P2  
184 | **Files:** `tests/readability.test.js`  
185 | **What:** Script that computes Flesch-Kincaid grade level on the demo Story output and asserts ≤ 6. Satisfies A7 automatically.
186 | 
187 | ---
188 | 
189 | ## Demo Script
190 | 
191 | > Both cuts use the same opening. Film the 3-minute version first; the 5-minute version adds the SDLC and adoption sections.
192 | 
193 | ---
194 | 
195 | ### 5-Minute Version (full judging cut)
196 | 
197 | **≈ 40% — User story (0:00–1:50)**
198 | 
199 | 1. **(0:00)** *Narrate:* "Maria is preparing her 8-year-old son Sam for his first flight — New York JFK to Orlando. Sam is sensitive to noise and crowds and needs to know what's coming. There's no app that does this privately, offline, adapted to him. So Maria opens Calm Skies Journey Builder."
200 | 2. **(0:25)** Fill in demo scenario: name "Sam", age 8–10, first flight ✓, JFK → MCO, sensitivities: noise + crowds, communication: written.
201 | 3. **(0:45)** Click **Build My Journey**. All 5 sections appear instantly — no network call.
202 | 4. **(1:00)** Scroll to **My Flight Story**: read the first sentence with Sam's name; point to the headphones line adapted for noise sensitivity.
203 | 5. **(1:20)** Scroll to **My Airport Journey**: navigate 3 steps with keyboard only (Tab → Next → Enter). Show tip adapting to crowds.
204 | 6. **(1:40)** Scroll to **My Calm Kit** (tick headphones), then **Accessibility Resources** — each link labelled with its source organisation.
205 | 
206 | **≈ 40% — How Bob delivered this across the SDLC (1:50–3:30)**
207 | 
208 | 7. **(1:50)** Open terminal. Run `node --test tests/*.test.js` — 68 tests, 0 failures. *"Every line of this was written by Bob."*
209 | 8. **(2:10)** Show `docs/REQUIREMENTS.md`: 37 requirement IDs, each with a testable acceptance criterion. *"Bob started with requirements."*
210 | 9. **(2:25)** Show `docs/ARCHITECTURE.md`: file layout, data-flow diagram, two alternatives Bob rejected with reasons.
211 | 10. **(2:40)** Show `src/journey/story.js` and `tests/wording.test.js`: *"When a content review found 8 defects — wrong shoe-removal instruction, British spellings, guarantee language — Bob fixed the copy and wrote wording tests to prevent regression."*
212 | 11. **(2:55)** Show `scripts/serve.js` diff: *"A security review found the server exposed .git and comms/ on the network. Bob fixed it: localhost-only, allow-list, 12 security tests."*
213 | 12. **(3:10)** Show `evidence/BOBATHON_EVIDENCE.md`: *"Every task has a requirement, an activity, files, a test result and a commit hash. This is the audit trail."*
214 | 
215 | **≈ 20% — Adoption value (3:30–4:30)**
216 | 
217 | 13. **(3:30)** *"What is the enterprise story? An airline or airport could adopt this as a white-labelled preparation experience. Drop the files on a CDN — no server needed. Override two CSS variables to rebrand. Update journey steps in src/journey/ and run npm test — every change is traceable requirement → commit → test."*
218 | 14. **(3:55)** Open browser print preview: form disappears, outputs remain. *"A family prints this the night before. No internet at the gate. Nothing stored."*
219 | 15. **(4:15)** *"The question we answered today: can IBM Bob deliver an accessible, governed, tested, secure and maintainable customer experience through a disciplined SDLC, starting from zero, in one event day? This is the answer."*
220 | 16. **(4:30)** Q&A buffer.
221 | 
222 | ---
223 | 
224 | ### 3-Minute Cut (filming fallback)
225 | 
226 | 1. **(0:00)** Open app. Fill demo scenario. Click **Build My Journey**. *(30 s)*
227 | 2. **(0:30)** Scroll through all 5 outputs. Point to headphones tip, keyboard navigation, disclaimer, resource source labels. *(45 s)*
228 | 3. **(1:15)** Terminal: `node --test tests/*.test.js` — 68 pass. *"Bob wrote every test."* *(20 s)*
229 | 4. **(1:35)** Show REQUIREMENTS.md, ARCHITECTURE.md, evidence log in 30 seconds. *"Requirements → architecture → tests → evidence — Bob did the SDLC."* *(30 s)*
230 | 5. **(2:05)** Print preview: offline-ready. *"No data stored. No account. Prints and goes in Sam's travel bag."* *(20 s)*
231 | 6. **(2:25)** *"A travel provider could host this, rebrand it, and extend it — zero backend, low compliance burden. IBM Bob took a social-impact use case all the way from requirements to a testable, deployable, governed product in one day."* *(35 s)*
232 | 7. **(3:00)** End.
233 |
```

### tool · tool `read_file` · 9/29/2026, 14:53:35

```json
{
  "path": "comms/delivered/2026-09-29T14-24-16-563Z.md"
}
```

```text
Contents of file comms/delivered/2026-09-29T14-24-16-563Z.md:

1 | DEFECT · BOB-002b (security, P0). Reply "INBOX RECEIVED 4". Agent mode. Do this first, then continue where you were.
2 | 
3 | Claude's probe of d5367cc (raw HTTP requests against `npm start`):
4 | - `GET /app/..%2f.git%2fconfig` → 200 with the real .git/config
5 | - `GET /app/%5c..%5c.git%5cconfig` → 200 with the real .git/config
6 | - (`/app/../.git/config`, `/%2e%2e/.git/config`, `/.git/config`, `/comms/outbox.md` → 404, correct; LAN address not
7 |   reachable, correct.)
8 | Cause: the allow-list is checked on the raw URL, then the path is decoded/joined. Encoded `/` and `\` let `..` escape
9 | after the check.
10 | 
11 | Fix:
12 | 1. Decode first (`decodeURIComponent`, 400 on malformed), reject any path containing `\` or a NUL byte, normalise
13 |    with `path.posix.normalize`, then check the allow-list, then `resolve(ROOT, '.' + path)` and require the result to
14 |    start with `ROOT + sep` (not just ROOT). Check the allow-list against the final resolved relative path too.
15 | 2. Tests in tests/serve.test.js with raw `http.request` (so the client doesn't normalise): the two payloads above, plus
16 |    `%2e%2e%2f`, double-encoded `%252e%252e%252f`, `/app/..;/.git/config`, a NUL byte, and a mixed-case `%2F`; all must
17 |    return 400 or 404 and never file contents. Keep the existing 200 cases.
18 | 2b. Test gap from b6799f2: tests/wording.test.js scans only Story + Journey, so "favourite" survives 3× in
19 |    src/journey/calmKit.js. Make allText() cover all 5 outputs (Story, Journey, Calm Kit, Parent Checklist, Resources
20 |    descriptions) and fix the spelling. Separate commit: `fix: wording test covers all outputs (BOB-003b)`.
21 | 3. Commit `fix: decode-then-validate paths in serve.js (BOB-002b path traversal)`. Outbox `TASK BOB-002b | done | … |
22 |    <hash>` and add an evidence row: found by Claude's probe → fixed by Bob → verified by tests.
23 | 4. Record it in docs/RESPONSIBLE_ENGINEERING.md (security findings) when you write that doc: finding, impact (local
24 |    dev server, localhost-only, low), fix, test.
25 |
```

### assistant · 9/29/2026, 14:53:37

### tool · tool `read_file` · 9/29/2026, 14:53:37

```json
{
  "path": "tests/serve.test.js"
}
```

```text
Contents of file tests/serve.test.js:

1 | // tests/serve.test.js
2 | // Security tests for scripts/serve.js:
3 | // - sensitive paths (/.git/config, /comms/outbox.md, /docs/, /evidence/) return 404
4 | // - allowed paths (/, /app/app.css) return 200 or 404-for-missing-file (not 200 on sensitive)
5 | // The server binds to 127.0.0.1 on a random port; we close it after.
6 | 
7 | import { test, before, after } from 'node:test';
8 | import assert from 'node:assert/strict';
9 | import { createAppServer } from '../scripts/serve.js';
10 | 
11 | let server;
12 | let baseUrl;
13 | 
14 | before(async () => {
15 |   server = createAppServer();
16 |   await new Promise(resolve => {
17 |     // port 0 = OS assigns a random free port
18 |     server.listen(0, '127.0.0.1', () => {
19 |       const { port } = server.address();
20 |       baseUrl = `http://127.0.0.1:${port}`;
21 |       resolve();
22 |     });
23 |   });
24 | });
25 | 
26 | after(async () => {
27 |   await new Promise(resolve => server.close(resolve));
28 | });
29 | 
30 | async function fetchStatus(path) {
31 |   const res = await fetch(`${baseUrl}${path}`);
32 |   return res.status;
33 | }
34 | 
35 | // ── Sensitive paths must return 404 ──────────────────────────────────────────
36 | 
37 | test('serve: /.git/config returns 404', async () => {
38 |   assert.equal(await fetchStatus('/.git/config'), 404);
39 | });
40 | 
41 | test('serve: /comms/outbox.md returns 404', async () => {
42 |   assert.equal(await fetchStatus('/comms/outbox.md'), 404);
43 | });
44 | 
45 | test('serve: /docs/REQUIREMENTS.md returns 404', async () => {
46 |   assert.equal(await fetchStatus('/docs/REQUIREMENTS.md'), 404);
47 | });
48 | 
49 | test('serve: /evidence/BOBATHON_EVIDENCE.md returns 404', async () => {
50 |   assert.equal(await fetchStatus('/evidence/BOBATHON_EVIDENCE.md'), 404);
51 | });
52 | 
53 | test('serve: /scripts/serve.js returns 404', async () => {
54 |   assert.equal(await fetchStatus('/scripts/serve.js'), 404);
55 | });
56 | 
57 | test('serve: /package.json returns 404', async () => {
58 |   assert.equal(await fetchStatus('/package.json'), 404);
59 | });
60 | 
61 | // ── Path traversal attempts must return 404 ───────────────────────────────
62 | 
63 | test('serve: path traversal attempt returns 404', async () => {
64 |   assert.equal(await fetchStatus('/app/../../comms/outbox.md'), 404);
65 | });
66 | 
67 | test('serve: encoded traversal attempt returns 404', async () => {
68 |   assert.equal(await fetchStatus('/app/%2e%2e/%2e%2e/comms/outbox.md'), 404);
69 | });
70 | 
71 | // ── Allowed paths ─────────────────────────────────────────────────────────
72 | 
73 | test('serve: / returns 200 (index.html)', async () => {
74 |   assert.equal(await fetchStatus('/'), 200);
75 | });
76 | 
77 | test('serve: /index.html returns 200', async () => {
78 |   assert.equal(await fetchStatus('/index.html'), 200);
79 | });
80 | 
81 | test('serve: /app/app.css returns 200', async () => {
82 |   assert.equal(await fetchStatus('/app/app.css'), 200);
83 | });
84 | 
85 | test('serve: /app/main.js returns 200', async () => {
86 |   assert.equal(await fetchStatus('/app/main.js'), 200);
87 | });
88 |
```

### tool · tool `read_file` · 9/29/2026, 14:53:37

```json
{
  "path": "scripts/serve.js"
}
```

```text
Contents of file scripts/serve.js:

1 | // scripts/serve.js — static file server for local development only.
2 | // Usage: node scripts/serve.js  (or: npm start)
3 | // Binds to 127.0.0.1 ONLY — never accessible from the network.
4 | // Only serves files inside the APP_ALLOW list; all other paths → 404.
5 | 
6 | import { createServer } from 'node:http';
7 | import { readFile } from 'node:fs/promises';
8 | import { extname, join, normalize, resolve } from 'node:path';
9 | import { fileURLToPath } from 'node:url';
10 | 
11 | const ROOT = resolve(fileURLToPath(import.meta.url), '../../');
12 | 
13 | /** @type {number} Accept PORT env override for tests; default 8080. */
14 | export const PORT = Number(process.env.SERVE_PORT) || 8080;
15 | 
16 | const MIME = {
17 |   '.html': 'text/html; charset=utf-8',
18 |   '.js':   'text/javascript; charset=utf-8',
19 |   '.css':  'text/css; charset=utf-8',
20 |   '.ico':  'image/x-icon',
21 |   '.png':  'image/png',
22 |   '.svg':  'image/svg+xml',
23 | };
24 | 
25 | /**
26 |  * Allow-listed path prefixes (relative, normalised, forward-slash).
27 |  * Anything outside these prefixes returns 404.
28 |  * No .git, no comms/, no docs/, no evidence/, no scripts/ exposed.
29 |  */
30 | const ALLOWED_PREFIXES = [
31 |   '/index.html',
32 |   '/app/',
33 |   '/src/',
34 |   '/assets/',
35 | ];
36 | 
37 | /**
38 |  * Returns true if the normalised URL path is inside the allow-list.
39 |  * @param {string} urlPath  e.g. "/app/main.js"
40 |  */
41 | function isAllowed(urlPath) {
42 |   if (urlPath === '/' || urlPath === '/index.html') return true;
43 |   return ALLOWED_PREFIXES.some(prefix => urlPath.startsWith(prefix));
44 | }
45 | 
46 | /**
47 |  * Create and return the HTTP server (does not listen — caller decides port).
48 |  * Exported so tests can start/stop it on a random port.
49 |  */
50 | export function createAppServer() {
51 |   return createServer(async (req, res) => {
52 |     let urlPath = req.url.split('?')[0];
53 |     // Normalise (collapse ../ etc.) so traversal attempts map to a clean path.
54 |     // Use posix-style normalisation: replace backslashes, collapse dots, strip
55 |     // leading separators, then re-prefix with '/'.
56 |     urlPath = urlPath.replace(/\\/g, '/');
57 |     // Remove query fragments and percent-decode only the path separators
58 |     const segments = urlPath.split('/').map(s => {
59 |       try { return decodeURIComponent(s); } catch { return s; }
60 |     });
61 |     // Resolve dot-segments (. and ..) manually
62 |     const resolved = [];
63 |     for (const seg of segments) {
64 |       if (seg === '' || seg === '.') continue;
65 |       if (seg === '..') { resolved.pop(); } else { resolved.push(seg); }
66 |     }
67 |     urlPath = '/' + resolved.join('/');
68 | 
69 |     if (urlPath === '/') urlPath = '/index.html';
70 | 
71 |     // Allow-list check — before touching the filesystem
72 |     if (!isAllowed(urlPath)) {
73 |       res.writeHead(404, { 'Content-Type': 'text/plain' });
74 |       res.end('Not found');
75 |       return;
76 |     }
77 | 
78 |     const filePath = join(ROOT, urlPath);
79 | 
80 |     // Belt-and-suspenders: must still be inside ROOT after join
81 |     if (!filePath.startsWith(ROOT)) {
82 |       res.writeHead(404, { 'Content-Type': 'text/plain' });
83 |       res.end('Not found');
84 |       return;
85 |     }
86 | 
87 |     try {
88 |       const data = await readFile(filePath);
89 |       const mime = MIME[extname(filePath)] || 'application/octet-stream';
90 |       res.writeHead(200, { 'Content-Type': mime });
91 |       res.end(data);
92 |     } catch {
93 |       res.writeHead(404, { 'Content-Type': 'text/plain' });
94 |       res.end('Not found');
95 |     }
96 |   });
97 | }
98 | 
99 | // Only start listening when run directly (not when imported by tests).
100 | if (process.argv[1] && resolve(process.argv[1]) === resolve(fileURLToPath(import.meta.url))) {
101 |   createAppServer().listen(PORT, '127.0.0.1', () => {
102 |     console.log(`Calm Skies running at http://127.0.0.1:${PORT}`);
103 |   });
104 | }
105 |
```

### assistant · 9/29/2026, 14:53:40

### tool · tool `read_file` · 9/29/2026, 14:53:40

```json
{
  "path": "tests/wording.test.js"
}
```

```text
Contents of file tests/wording.test.js:

1 | // tests/wording.test.js
2 | // Scans Story + Journey output for banned promise phrases, factual errors,
3 | // and UK spellings. All checks run against the demo scenario.
4 | 
5 | import { test } from 'node:test';
6 | import assert from 'node:assert/strict';
7 | import { buildStory }   from '../src/journey/story.js';
8 | import { buildJourney } from '../src/journey/journey.js';
9 | 
10 | const DEMO = {
11 |   childName:     'Sam',
12 |   ageRange:      '8-10',
13 |   firstFlight:   true,
14 |   departure:     'JFK',
15 |   destination:   'MCO',
16 |   sensitivities: ['noise', 'crowds', 'transitions', 'waiting'],
17 |   commPref:      'written',
18 |   concern:       '',
19 | };
20 | 
21 | function storyText()   { return buildStory(DEMO); }
22 | function journeyText() { return buildJourney(DEMO).map(s => s.label + ' ' + s.description + ' ' + s.tip).join(' '); }
23 | function allText()     { return storyText() + ' ' + journeyText(); }
24 | 
25 | // ── Banned promise phrases ────────────────────────────────────────────────
26 | 
27 | test('wording: no "will help a lot" guarantee phrase', () => {
28 |   assert.ok(!allText().includes('will help a lot'), '"will help a lot" is a promise — use "can help"');
29 | });
30 | 
31 | test('wording: no "always" guarantee', () => {
32 |   assert.ok(!allText().toLowerCase().includes(' always '), '"always" should not appear as a guarantee');
33 | });
34 | 
35 | test('wording: no "guarantee" word', () => {
36 |   assert.ok(!allText().toLowerCase().includes('guarantee'), '"guarantee" should not appear');
37 | });
38 | 
39 | // ── Factual accuracy ──────────────────────────────────────────────────────
40 | 
41 | test('wording: story does not instruct child to remove shoes', () => {
42 |   assert.ok(!storyText().toLowerCase().includes('take off your shoes'),
43 |     'Do not instruct shoe removal — TSA policy differs by age/situation');
44 | });
45 | 
46 | test('wording: story does not say "put your bag and shoes on a tray"', () => {
47 |   assert.ok(!storyText().toLowerCase().includes('shoes on a tray'),
48 |     'Do not specify shoe tray procedure as fact');
49 | });
50 | 
51 | test('wording: journey security step does not instruct shoe removal', () => {
52 |   const steps = buildJourney(DEMO);
53 |   const security = steps.find(s => s.label === 'Security');
54 |   assert.ok(security, 'Security step must exist');
55 |   const secText = (security.description + ' ' + security.tip).toLowerCase();
56 |   assert.ok(!secText.includes('take off your shoes'),
57 |     'Security step should not instruct shoe removal');
58 | });
59 | 
60 | test('wording: exit step does not say "usually green"', () => {
61 |   const steps = buildJourney(DEMO);
62 |   const exit = steps.find(s => s.label === 'Exit');
63 |   assert.ok(exit, 'Exit step must exist');
64 |   const exitText = (exit.description + ' ' + exit.tip).toLowerCase();
65 |   assert.ok(!exitText.includes('usually green'),
66 |     'Exit sign color claim removed — not universally true in US');
67 | });
68 | 
69 | test('wording: story ending contains "arrived" not "has begun"', () => {
70 |   assert.ok(storyText().includes('arrived'),
71 |     'Story ending must say "arrived" not "journey has begun"');
72 |   assert.ok(!storyText().includes('has begun'),
73 |     'Story must not say "journey has begun" after destination exit');
74 | });
75 | 
76 | // ── Empty name handling ───────────────────────────────────────────────────
77 | 
78 | test('wording: empty name does not produce "My name is I"', () => {
79 |   const story = buildStory({ ...DEMO, childName: '' });
80 |   assert.ok(!story.includes('My name is I'),
81 |     'Empty name must not produce "My name is I"');
82 | });
83 | 
84 | test('wording: empty name story still has ≥9 paragraphs', () => {
85 |   const story = buildStory({ ...DEMO, childName: '' });
86 |   const paras = story.split('\n\n').filter(p => p.trim().length > 0);
87 |   assert.ok(paras.length >= 9, `Expected ≥9 paragraphs with empty name, got ${paras.length}`);
88 | });
89 | 
90 | // ── US English spellings ──────────────────────────────────────────────────
91 | 
92 | test('wording: no "aeroplane" (use "airplane")', () => {
93 |   assert.ok(!allText().toLowerCase().includes('aeroplane'),
94 |     'Use US English "airplane" not "aeroplane"');
95 | });
96 | 
97 | test('wording: no "queue" (use "line")', () => {
98 |   assert.ok(!allText().toLowerCase().includes('queue'),
99 |     'Use US English "line" not "queue"');
100 | });
101 | 
102 | test('wording: no "favourite" (use "favorite")', () => {
103 |   assert.ok(!allText().toLowerCase().includes('favourite'),
104 |     'Use US English "favorite" not "favourite"');
105 | });
106 |
```

### tool · tool `read_file` · 9/29/2026, 14:53:40

```json
{
  "path": "src/journey/calmKit.js"
}
```

```text
Contents of file src/journey/calmKit.js:

1 | // src/journey/calmKit.js
2 | // buildCalmKit(inputs) → { items: Item[], disclaimer: string }
3 | 
4 | /**
5 |  * @typedef {Object} Item
6 |  * @property {string}  id      Unique identifier
7 |  * @property {string}  label   Display text
8 |  * @property {boolean} checked Initial checked state (always false)
9 |  */
10 | 
11 | const DISCLAIMER = 'Suggestions only — not medical advice. Check with your airline about what you can bring on board.';
12 | 
13 | /**
14 |  * Build the My Calm Kit item list.
15 |  * @param {import('./story.js').Inputs} inputs
16 |  * @returns {{ items: Item[], disclaimer: string }}
17 |  */
18 | export function buildCalmKit(inputs) {
19 |   const s = inputs.sensitivities || [];
20 |   const noise       = s.includes('noise');
21 |   const crowds      = s.includes('crowds');
22 |   const transitions = s.includes('transitions');
23 |   const waiting     = s.includes('waiting');
24 |   const pictures    = inputs.commPref === 'pictures';
25 | 
26 |   // Base items — always included
27 |   const items = [
28 |     { id: 'boarding-pass', label: 'Boarding pass and ID documents', checked: false },
29 |     { id: 'comfort-item',  label: 'Comfort item (favourite toy, blanket or stuffed animal)', checked: false },
30 |     { id: 'water',         label: 'Empty reusable water bottle (fill after security)', checked: false },
31 |     { id: 'snacks',        label: 'Favourite snacks (check airline rules)', checked: false },
32 |     { id: 'change-clothes',label: 'Change of clothes in carry-on', checked: false },
33 |     { id: 'charger',       label: 'Charger for tablet or phone', checked: false },
34 |     { id: 'activity',      label: 'Favourite book, puzzle or activity', checked: false },
35 |     { id: 'sunglasses',    label: 'Sunglasses (helpful in bright terminals)', checked: false },
36 |   ];
37 | 
38 |   // Sensitivity-specific additions
39 |   if (noise) {
40 |     items.push({ id: 'headphones', label: 'Noise-cancelling headphones or ear defenders', checked: false });
41 |     items.push({ id: 'ear-plugs',  label: 'Ear plugs (backup option)', checked: false });
42 |   }
43 | 
44 |   if (crowds) {
45 |     items.push({ id: 'comfort-clothing', label: 'Comfortable, loose clothing (helps in crowded spaces)', checked: false });
46 |   }
47 | 
48 |   if (transitions) {
49 |     items.push({ id: 'journey-plan', label: 'Printed copy of My Airport Journey (visual sequence)', checked: false });
50 |     items.push({ id: 'schedule',     label: 'Visual schedule or travel timer', checked: false });
51 |   }
52 | 
53 |   if (waiting) {
54 |     items.push({ id: 'fidget',   label: 'Fidget toy or sensory item', checked: false });
55 |     items.push({ id: 'download', label: 'Downloaded videos or music (for offline use on the plane)', checked: false });
56 |   }
57 | 
58 |   if (pictures) {
59 |     items.push({ id: 'picture-cards', label: 'Picture communication cards', checked: false });
60 |   }
61 | 
62 |   if (inputs.commPref === 'written') {
63 |     items.push({ id: 'notepad', label: 'Small notepad and pen (for written communication)', checked: false });
64 |   }
65 | 
66 |   return { items, disclaimer: DISCLAIMER };
67 | }
68 |
```

### assistant · 9/29/2026, 14:53:44

Now I can see the issues clearly:

1. **BOB-002b**: The existing serve.js already has decode-then-validate, but the tests use `fetch()` (which the client normalizes). The defect says `GET /app/..%2f.git%2fconfig` returns 200 — meaning the current decode loop has a bug. Let me verify:

### tool · tool `read_file` · 9/29/2026, 14:53:44

```json
{
  "path": "src/journey/parentChecklist.js"
}
```

```text
Contents of file src/journey/parentChecklist.js:

1 | // src/journey/parentChecklist.js
2 | // buildParentChecklist(inputs) → { beforeHome: Item[], perStage: Item[], notes: string }
3 | 
4 | /**
5 |  * @typedef {Object} Item
6 |  * @property {string}  id
7 |  * @property {string}  label
8 |  * @property {boolean} checked
9 |  */
10 | 
11 | /**
12 |  * @param {import('./story.js').Inputs} inputs
13 |  * @returns {{ beforeHome: Item[], perStage: Item[], notes: string }}
14 |  */
15 | export function buildParentChecklist(inputs) {
16 |   const s = inputs.sensitivities || [];
17 |   const noise       = s.includes('noise');
18 |   const crowds      = s.includes('crowds');
19 |   const transitions = s.includes('transitions');
20 |   const firstFlight = inputs.firstFlight;
21 | 
22 |   // ── Before Leaving Home ────────────────────────────────────────────────
23 |   const beforeHome = [
24 |     { id: 'docs',      label: 'Check the travel documents your trip requires (adults\' ID; passports for international trips)', checked: false },
25 |     { id: 'boarding',  label: 'Print or download boarding passes', checked: false },
26 |     { id: 'tsa-cares', label: 'Contact TSA Cares before the trip if you\'d like assistance at security (recommended about 72 hours ahead)', checked: false },
27 |     { id: 'pack',      label: 'Pack carry-on with comfort items, snacks, charger and change of clothes', checked: false },
28 |     { id: 'story',     label: 'Read My Flight Story with your child the night before', checked: false },
29 |     { id: 'journey',   label: 'Walk through My Airport Journey step by step', checked: false },
30 |     { id: 'depart',    label: 'Plan to leave home with plenty of extra time — rushing adds stress', checked: false },
31 |   ];
32 | 
33 |   if (noise) {
34 |     beforeHome.push({ id: 'headphones-charged', label: 'Charge noise-cancelling headphones', checked: false });
35 |   }
36 | 
37 |   if (transitions) {
38 |     beforeHome.push({ id: 'print-journey', label: 'Print the Airport Journey sequence for your child to carry', checked: false });
39 |   }
40 | 
41 |   if (firstFlight) {
42 |     beforeHome.push({ id: 'first-flight-talk', label: 'Have a calm conversation about what to expect on a first flight', checked: false });
43 |   }
44 | 
45 |   // ── At Each Stage ──────────────────────────────────────────────────────
46 |   const perStage = [
47 |     { id: 'preview',     label: 'Tell your child the next step before you get there', checked: false },
48 |     { id: 'sensory',     label: 'Watch for sensory overload signals and respond early', checked: false },
49 |     { id: 'reassure',    label: 'Reassure your child that staff can be asked for help', checked: false },
50 |     { id: 'quiet-space', label: 'Locate quiet / sensory rooms if available at your airport', checked: false },
51 |     { id: 'favorite',    label: 'Check that your child\'s favorite comfort item is easily accessible', checked: false },
52 |   ];
53 | 
54 |   if (crowds) {
55 |     perStage.push({ id: 'sunflower', label: 'Consider using a Hidden Disabilities Sunflower lanyard for discreet support', checked: false });
56 |   }
57 | 
58 |   // ── Notes (echoes the free-text concern) ──────────────────────────────
59 |   const notes = inputs.concern ? inputs.concern.trim() : '';
60 | 
61 |   return { beforeHome, perStage, notes };
62 | }
63 |
```

### tool · tool `read_file` · 9/29/2026, 14:53:44

```json
{
  "path": "src/journey/resources.js"
}
```

```text
Contents of file src/journey/resources.js:

1 | // src/journey/resources.js
2 | // RESOURCES — static array of accessibility resources.
3 | // Pure ES module: no fetch, no JSON file, no server calls (satisfies NF1).
4 | // Each entry: { name, url, description, source }
5 | 
6 | /**
7 |  * @typedef {Object} Resource
8 |  * @property {string} name        Display name of the resource
9 |  * @property {string} url         Full URL (https)
10 |  * @property {string} description One-sentence description shown to the user
11 |  * @property {string} source      Organisation that maintains the resource
12 |  */
13 | 
14 | /** @type {Resource[]} */
15 | export const RESOURCES = [
16 |   {
17 |     name: 'Hidden Disabilities Sunflower',
18 |     url: 'https://hdsunflower.com',
19 |     description: 'The Hidden Disabilities Sunflower scheme uses a sunflower lanyard to discreetly signal to airport and airline staff that a passenger may need extra time, assistance or understanding.',
20 |     source: 'Hidden Disabilities Sunflower',
21 |     lastChecked: '2026-09-29',
22 |   },
23 |   {
24 |     name: 'TSA Cares',
25 |     url: 'https://www.tsa.gov/travel/tsa-cares',
26 |     description: 'TSA Cares is a helpline and passenger support program for travelers with disabilities or medical conditions. You can call ahead to arrange extra support at U.S. airport security checkpoints.',
27 |     source: 'U.S. Transportation Security Administration (TSA)',
28 |     lastChecked: '2026-09-29',
29 |   },
30 |   {
31 |     name: 'Passengers with Disabilities — Air Carrier Access Act',
32 |     url: 'https://www.transportation.gov/airconsumer/passengers-disabilities',
33 |     description: 'Overview of your rights as an air traveler with a disability under the Air Carrier Access Act, including what assistance airlines are required to provide.',
34 |     source: 'U.S. Department of Transportation',
35 |     lastChecked: '2026-09-29',
36 |   },
37 |   {
38 |     name: 'Airport accessibility page',
39 |     url: 'https://www.transportation.gov/airconsumer/passengers-disabilities',
40 |     description: 'Check your departure airport\'s own website for its accessibility and special-assistance page — most major airports publish sensory room locations, wheelchair assistance contacts, and quiet routes.',
41 |     source: 'Check your airport\'s website directly',
42 |     lastChecked: '2026-09-29',
43 |   },
44 |   {
45 |     name: 'Social Stories™ — understanding the concept',
46 |     url: 'https://carolgraysocialstories.com',
47 |     description: 'Social Stories™ are short, personalized stories that describe a situation or activity in a way that helps autistic individuals understand what to expect and how to respond.',
48 |     source: 'Carol Gray — The Gray Center',
49 |     lastChecked: '2026-09-29',
50 |   },
51 |   {
52 |     name: 'Wings for Autism / Wings for All',
53 |     url: 'https://thearc.org/our-initiatives/travel/',
54 |     description: 'Wings for Autism and Wings for All are airport rehearsal programs that allow families of autistic children and adults with intellectual disabilities to practice the airport experience in a supported, low-pressure environment.',
55 |     source: 'The Arc',
56 |     lastChecked: '2026-09-29',
57 |   },
58 | ];
59 |
```

### assistant · 9/29/2026, 14:56:21

Now I have a clear picture. Let me set up the todo list and start working:

### tool · tool `update_todo_list` · 9/29/2026, 14:56:21

```json
{
  "todos": "\n[-] BOB-002b: Fix serve.js path traversal (decode-first + NUL/backslash rejection, 400 on malformed) and add raw http.request tests for all specified payloads\n[ ] BOB-003b: Expand wording.test.js allText() to cover all 5 outputs; fix \"favourite\" in calmKit.js\n[ ] BOB-001C: README accuracy fixes (6 items from inbox message 5)\n"
}
```

```text
To do list updated: 3 items total.

Next to do item inprogress: BOB-002b: Fix serve.js path traversal (decode-first + NUL/backslash rejection, 400 on malformed) and add raw http.request tests for all specified payloads
```

