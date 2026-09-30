# Calm Skies Journey Builder — Task Plan

Version 1.1 · BOB-001 (reviewed)

---

## Project Summary

**Idea:** Calm Skies Journey Builder  
**Problem:** Autistic children and their caregivers face high anxiety preparing for air travel because the airport experience is unpredictable, sensory-intense, and underdocumented for their needs.  
**In scope (must demo):** Form inputs → 5 outputs (Flight Story, Airport Journey, Calm Kit, Parent Checklist, Accessibility Resources); keyboard navigation; print support; demo scenario Sam JFK→MCO.  
**Out of scope:** Accounts, backend, real flight data, multi-language, clinical advice.  
**Fallback if behind:** Deliver Story + Journey + Resources only; Kit and Checklist deferred to P1.

---

## Task Queue

### P0 — Demo path works end to end with tests

---

#### BOB-002 · Project scaffold and index.html shell
**Priority:** P0
**Files:** `index.html` (repo root), `package.json`, `scripts/serve.js`, `app/main.js`, `app/render.js`, `app/app.css`, `evidence/BOBATHON_EVIDENCE.md` (created), `tests/a11y.test.js` (stub)
**What:** Create the static file structure defined in ARCHITECTURE.md. `index.html` at repo root contains the semantic form (all 7 labelled inputs, no pre-selected age), an `#outputs` section, and loads `app/main.js` as an ES module. All CSS in `app/app.css` (no inline styles). `scripts/serve.js` serves the repo on http://localhost:8080 using Node built-ins only. `package.json` exposes `npm start`. `escapeHtml()` helper in `app/render.js`. Evidence file created. No `content/` directory — resources will be a JS module.
**Acceptance criteria:**
- `index.html` opens via `npm start`; form renders with all 7 labelled controls; no value pre-selected for age.
- Clicking "Build My Journey" logs an InputObject to console (no errors).
- `app/app.css` contains `@media print` rule hiding the form; no `<style>` tags in HTML.
- axe-core scan on the shell returns zero `label` and `heading-order` violations.
- `escapeHtml('<img src=x onerror=alert(1)>')` returns the HTML-entity-escaped string (NF6 test in `tests/a11y.test.js`).
**Tests:** `tests/a11y.test.js` with axe-core + jsdom; NF6 escape test.
**Evidence:** `node --test tests/a11y.test.js` output quoted in `evidence/BOBATHON_EVIDENCE.md`; git commit hash.

---

#### BOB-003 · Journey logic — My Flight Story  
**Priority:** P0  
**Files:** `src/journey/story.js`, `tests/story.test.js`  
**What:** Implement `buildStory(inputs) → string`. Covers 9 narrative steps from home to destination airport exit. Name in first sentence. Sensitivities adapt copy. First-flight flag adds reassurance.  
**Acceptance criteria:**
- ≥ 9 steps present in output.
- All R11, R12, R13 unit assertions pass.  
**Tests:** `tests/story.test.js` — name in first paragraph; noise→"headphones"/"quiet"; first-flight→"first time"/"first flight".  
**Evidence:** `node --test tests/story.test.js` output quoted; commit hash.

---

#### BOB-004 · Journey logic — My Airport Journey  
**Priority:** P0  
**Files:** `src/journey/journey.js`, `tests/journey.test.js`  
**What:** Implement `buildJourney(inputs) → Step[]` with exactly 10 steps. Each step: `{label, description, tip, symbol}`. Tips adapt to sensitivities. Symbol set for communication-preference "pictures".  
**Acceptance criteria:** R20–R23 pass.  
**Tests:** `tests/journey.test.js` — 10 steps; all have label+description+tip; noise tip contains "headphones"/"quiet"; pictures → symbol non-empty.  
**Evidence:** `node --test tests/journey.test.js` quoted; commit hash.

---

#### BOB-005 · Journey logic — My Calm Kit  
**Priority:** P0  
**Files:** `src/journey/calmKit.js`, `tests/calmKit.test.js`  
**What:** Implement `buildCalmKit(inputs) → {items: Item[], disclaimer: string}`. Default ≥ 8 items; noise adds headphones; disclaimer text set.  
**Acceptance criteria:** R30–R33 pass.  
**Tests:** `tests/calmKit.test.js` — ≥ 8 items default; noise→headphones item; disclaimer non-empty.  
**Evidence:** `node --test tests/calmKit.test.js` quoted; commit hash.

---

#### BOB-006 · Journey logic — Parent Checklist  
**Priority:** P0  
**Files:** `src/journey/parentChecklist.js`, `tests/parentChecklist.test.js`  
**What:** Implement `buildParentChecklist(inputs) → {beforeHome: Item[], perStage: Item[], notes: string}`. Concern echoed in notes.  
**Acceptance criteria:** R40–R42 pass.  
**Tests:** `tests/parentChecklist.test.js` — beforeHome ≥ 6; perStage ≥ 5; concern echoed.  
**Evidence:** `node --test tests/parentChecklist.test.js` quoted; commit hash.

---

#### BOB-007 · Accessibility Resources module
**Priority:** P0
**Files:** `src/journey/resources.js`, `tests/resources.test.js`
**What:** Implement `src/journey/resources.js` as a pure ES module that directly exports the `RESOURCES` array (no `content/resources.json`, no fetch). ≥ 5 entries: Hidden Disabilities Sunflower, TSA Cares, airline accessibility, airport accessibility, Social Stories. Each: `{name, url, description, source}`. No JSON file; no fetch call.
**Acceptance criteria:** R50–R52 pass; NF1 satisfied (no fetch); all URLs reachable (manual check recorded in evidence).
**Tests:** `tests/resources.test.js` — count ≥ 5; each entry has `name`, `url`, `source`; no entry has an empty URL.
**Evidence:** Test quoted; commit hash.

---

#### BOB-008 · DOM render layer + wiring  
**Priority:** P0  
**Files:** `app/render.js`, `app/main.js` (updated)  
**What:** Implement `render.js` functions that convert output objects to HTML and write them to the `#outputs` DOM section. Wire all 5 outputs in `main.js`. Airport Journey navigator (Previous/Next buttons) implemented as keyboard-operable controls. Calm Kit and Parent Checklist use `<input type="checkbox">` per item. Resources section uses a distinct `<section>` with different background.  
**Acceptance criteria:** R60–R62, R21, R31, R41, R51 pass; demo scenario renders all 5 outputs.  
**Tests:** `tests/a11y.test.js` updated to render demo scenario and run axe-core; zero violations in label/heading-order/image-alt.  
**Evidence:** `node --test tests/a11y.test.js` quoted; commit hash; screenshot noted.

---

#### BOB-009 · Full integration test + demo scenario validation  
**Priority:** P0  
**Files:** `tests/integration.test.js`, `evidence/BOBATHON_EVIDENCE.md`  
**What:** Run all test files in sequence. Confirm demo scenario (Sam, 8–10, first flight, JFK→MCO, noise+crowds, pictures) produces all 5 outputs with correct content. Write evidence log entry.
**Acceptance criteria:** `node --test tests/*.test.js` — all pass, zero failures.  
**Tests:** All existing test files + integration smoke test.  
**Evidence:** Full test output quoted; evidence log row; commit hash.

---

### P1 — Polish, accessibility hardening, packaging

---

#### BOB-010 · Accessibility hardening + ACCESSIBILITY_REPORT.md
**Priority:** P1
**Files:** `index.html`, `app/app.css`, `app/render.js`, `docs/ACCESSIBILITY_REPORT.md`
**What:** Add visible focus rings (CSS `:focus-visible`); add `aria-live` region for Journey step changes; add `@media (prefers-reduced-motion: reduce)`; verify heading order h1→h2→h3; `lang="en"` on `<html>`; all checkboxes have associated `<label>`. Write `docs/ACCESSIBILITY_REPORT.md` documenting: (a) axe-core/jsdom result for label/heading-order/image-alt/aria rules, (b) manual browser check for contrast (A3) and focus (A4), with tool used and result.
**Acceptance criteria:** A1–A8 documented; A3 and A4 results from a real browser recorded (not from jsdom); report states what was checked, how, and what result was found.
**Evidence:** axe-core test output; `docs/ACCESSIBILITY_REPORT.md` committed; commit hash.

---

#### BOB-011 · Visual design polish
**Priority:** P1
**Files:** `app/app.css`
**What:** Apply a calm, minimal visual theme (soft blues/greens, generous whitespace, sans-serif). Ensure contrast ≥ 4.5:1. Finalize `@media print` rules in `app/app.css` (no inline styles). No `<style>` tags added to HTML.
**Evidence:** Browser print preview screenshot noted; contrast verified in browser (recorded in ACCESSIBILITY_REPORT.md).

---

#### BOB-012 · README.md — all 4 required headings  
**Priority:** P1  
**Files:** `README.md`  
**What:** Write the 4 required submission headings: Problem statement · Detailed solution · Assumptions / approach · How Bob was used (one row per BOB-xxx task).  
**Evidence:** README committed; headings verified.

---

#### BOB-013 · docs/demo-script.md  
**Priority:** P1  
**Files:** `docs/demo-script.md`  
**What:** 5-minute spoken demo script (see section below).  
**Evidence:** File committed.

---

#### BOB-014 · ZIP packaging
**Priority:** P1
**Files:** ZIP
**What:** Submission checklist and final ZIP assembly: `bob_sessions/`, `code_files/`, `README.md`, demo video. Submission doc not built — future.
**Evidence:** ZIP contents listed.

---

#### BOB-017 · Privacy & security review → docs/RESPONSIBLE_ENGINEERING.md
**Priority:** P1 — **Done** (commit 8bfc6a9)
**Files:** `docs/RESPONSIBLE_ENGINEERING.md`
**What:** Document what was checked and how for: XSS prevention (NF6 test result), CSP meta tag, no server storage, no third-party scripts, no cookies, responsible text (no medical advice, no guarantees). State residual risks and mitigations.
**Evidence:** File committed; commit 8bfc6a9.

---

#### BOB-018 · Deployment documentation → DEPLOYMENT.md
**Priority:** P1 — **Done** (commit 8bfc6a9)
**Files:** `DEPLOYMENT.md` (repo root)
**What:** Write step-by-step GitHub Pages deployment instructions (repo is private until after the event; document the steps, do not publish). Include: enable Pages from Settings → Pages → Deploy from branch `main` / root; custom domain optional; note that ES modules work when served over HTTP(S), not `file://`.
**Evidence:** File committed; commit 8bfc6a9.

---

### P2 — Stretch (only after P0 complete and README drafted)

---

#### BOB-015 · Symbol/icon set for "pictures" preference  
**Priority:** P2  
**Files:** `content/symbols.json`, `app/render.js`  
**What:** Replace Unicode placeholders with a proper open-licence pictogram set (e.g. Mulberry Symbols or similar CC-licensed set). Each Journey step gets an illustrative symbol image with alt text.

---

#### BOB-016 · Flesch-Kincaid readability check
**Priority:** P2
**Files:** not built — future
**What:** Script that computes Flesch-Kincaid grade level on the demo Story output and asserts ≤ 6. Satisfies A7 automatically.

---

## Demo Script

> Both cuts use the same opening. Film the 3-minute version first; the 5-minute version adds the SDLC and adoption sections.

---

### 5-Minute Version (full judging cut)

**≈ 40% — User story (0:00–1:50)**

1. **(0:00)** *Narrate:* "Maria is preparing her 8-year-old son Sam for his first flight — New York JFK to Orlando. Sam is sensitive to noise and crowds and needs to know what's coming. There's no app that does this privately, offline, adapted to him. So Maria opens Calm Skies Journey Builder."
2. **(0:25)** Fill in demo scenario: name "Sam", age 8–10, first flight ✓, JFK → MCO, sensitivities: noise + crowds, communication: pictures.
3. **(0:45)** Click **Build My Journey**. All 5 sections appear instantly — no network call.
4. **(1:00)** Scroll to **My Flight Story**: read the first sentence with Sam's name; point to the headphones line adapted for noise sensitivity.
5. **(1:20)** Scroll to **My Airport Journey**: navigate 3 steps with keyboard only (Tab → Next → Enter). Show tip adapting to crowds.
6. **(1:40)** Scroll to **My Calm Kit** (tick headphones), then **Accessibility Resources** — each link labelled with its source organisation.

**≈ 40% — How Bob delivered this across the SDLC (1:50–3:30)**

7. **(1:50)** Open terminal. Run `node --test tests/*.test.js` — the full test suite passes, 0 failures. *"Every line of this was written by Bob."*
8. **(2:10)** Show `docs/REQUIREMENTS.md`: 37 requirement IDs, each with a testable acceptance criterion. *"Bob started with requirements."*
9. **(2:25)** Show `docs/ARCHITECTURE.md`: file layout, data-flow diagram, two alternatives Bob rejected with reasons.
10. **(2:40)** Show `src/journey/story.js` and `tests/wording.test.js`: *"When a content review found 8 defects — wrong shoe-removal instruction, British spellings, guarantee language — Bob fixed the copy and wrote wording tests to prevent regression."*
11. **(2:55)** Show `scripts/serve.js` diff: *"A security review found the server exposed .git and comms/ on the network. Bob fixed it: localhost-only, allow-list, 12 security tests."*
12. **(3:10)** Show `evidence/BOBATHON_EVIDENCE.md`: *"Every task has a requirement, an activity, files, a test result and a commit hash. This is the audit trail."*

**≈ 20% — Adoption value (3:30–4:30)**

13. **(3:30)** *"What is the enterprise story? An airline or airport could adopt this as a white-labelled preparation experience. Drop the files on a CDN — no server needed. Override two CSS variables to rebrand. Update journey steps in src/journey/ and run npm test — every change is traceable requirement → commit → test."*
14. **(3:55)** Open browser print preview: form disappears, outputs remain. *"A family prints this the night before. No internet at the gate. Nothing stored."*
15. **(4:15)** *"The question we answered today: can IBM Bob deliver an accessible, governed, tested, secure and maintainable customer experience through a disciplined SDLC, starting from zero, in one event day? This is the answer."*
16. **(4:30)** Q&A buffer.

---

### 3-Minute Cut (filming fallback)

1. **(0:00)** Open app. Fill demo scenario. Click **Build My Journey**. *(30 s)*
2. **(0:30)** Scroll through all 5 outputs. Point to headphones tip, keyboard navigation, disclaimer, resource source labels. *(45 s)*
3. **(1:15)** Terminal: `node --test tests/*.test.js` — the full test suite passes. *"Bob wrote every test."* *(20 s)*
4. **(1:35)** Show REQUIREMENTS.md, ARCHITECTURE.md, evidence log in 30 seconds. *"Requirements → architecture → tests → evidence — Bob did the SDLC."* *(30 s)*
5. **(2:05)** Print preview: offline-ready. *"No data stored. No account. Prints and goes in Sam's travel bag."* *(20 s)*
6. **(2:25)** *"A travel provider could host this, rebrand it, and extend it — zero backend, low compliance burden. IBM Bob took a social-impact use case all the way from requirements to a testable, deployable, governed product in one day."* *(35 s)*
7. **(3:00)** End.
