# Calm Skies Journey Builder

Built with [IBM Bob](https://www.ibm.com/products/ai-coding-agent) at the IBM Champions Bobathon NYC 2026 · Team Guild

---

## Problem statement

**Can IBM Bob turn a meaningful accessibility requirement into an accessible, tested, secure and maintainable customer experience through a disciplined SDLC?**

Air travel is one of the most stressful experiences for autistic children and their families. The airport environment is loud, unpredictable, crowded and full of transitions — exactly the conditions that are hardest to prepare for. We did not find a free, privacy-safe, offline-capable preparation tool that adapts the journey narrative to a child's specific sensitivities.

Calm Skies Journey Builder is a static web application that helps a caregiver prepare an autistic child for a flight. A caregiver enters a small amount of trip and preference information; the app instantly produces five personalized outputs:

1. **My Flight Story** — a first-person narrative adapted to the child's sensitivities
2. **My Airport Journey** — a 10-step visual sequence, keyboard-navigable
3. **My Calm Kit** — a packing checklist tailored to the child's needs
4. **Parent Checklist** — a before-departure and per-stage checklist
5. **Accessibility Resources** — sourced, labelled links to external organisations

No data leaves the browser. No account is required. The page prints offline.

The enterprise value is not just the tool — it is the engineering discipline IBM Bob applied to build it: requirements with testable acceptance criteria, a documented architecture, pure tested logic, XSS protection, an automated accessibility scan, a privacy and security review (BOB-017), and a deployment guide (BOB-018).

---

## Detailed solution

### Human use case

A caregiver (parent, teacher, therapist) visits the app on any device. They fill in up to eleven optional fields: the child's name or nickname, age range, whether it is a first flight, departure and destination, sensitivities (noise, crowds, transitions, waiting), communication preference (spoken, pictures, written), one free-text concern, a comfort item to bring (e.g. "blue blanket"), who the child is visiting (e.g. "Grandma"), a calm strategy for worried moments (e.g. "take slow breaths and squeeze my fidget"), and one exciting thing about the trip (e.g. "swimming in the pool").

One click produces all five outputs on the same page. The caregiver can print or save as PDF — no internet connection needed after page load. Nothing is stored; closing the tab clears all data.

### Enterprise story (adoption path — not yet built)

A travel provider — airline, airport, or accessibility-focused travel app — could adopt Calm Skies as a white-labelled preparation experience:

- **Hosting:** drop the static files on any CDN or object store; no server runtime required
- **Branding:** override CSS variables in `app/app.css`; no logic changes needed
- **Content extension:** journey steps, resources and kit items are pure data in `src/journey/`; a content team can update them without touching rendering or test code
- **Governance:** every content change requires a passing test suite (`npm test`) and produces a traceable commit
- **Compliance burden is low** because no personal data is stored, no authentication is needed, and no backend is involved

These are adoption ideas, not built features. No airline or airport is affiliated with this project.

### IBM Bob's SDLC role

Bob was the primary implementation tool across the full software development lifecycle:

| SDLC phase | What Bob did | Evidence |
|------------|--------------|----------|
| Requirements | Authored `docs/REQUIREMENTS.md` (37 IDs, testable criteria) | commit c487978 |
| Architecture | Authored `docs/ARCHITECTURE.md` (file layout, data-flow, alternatives rejected) | commit c487978 |
| Implementation | Wrote all application code: `index.html`, `app/`, `src/journey/`, `scripts/` | commits f61fd41–b5c0a07 |
| Testing | Wrote 100 unit, integration, accessibility and security tests | commits b5c0a07–663b689 |
| Accessibility review | Automated axe-core scan; 2 keyboard focus losses found in real-browser review outside Bob; Bob fixed both (BOB-010) | `tests/a11y.test.js`; commit 1286430 |
| Security review | XSS vector found in design review outside Bob; Bob fixed it — added `escapeHtml`, NF6 tests (commits f61fd41, ff7b557); dev server network exposure found in code review outside Bob; Bob fixed it — localhost-only, strict public-file allow-list (commit d5367cc); encoded path traversal found by a probe outside Bob; Bob fixed it — decode-then-validate, regression tests (commit ae070d5) | commits f61fd41, ff7b557, d5367cc, ae070d5 |
| Content review | 8 factual/wording defects found in review outside Bob; Bob fixed copy and added wording tests (commit b6799f2) | commit b6799f2 |
| Personalization | A.J. Aronoff's requirement (comfort item + visiting fields) implemented by Bob (BOB-019) | commit d567321 |
| Documentation | Authored architecture, requirements, plan, evidence log, accessibility report, responsible engineering review, deployment guide | commits c487978, d83a6be, 8bfc6a9 |

### Responsible engineering

- No medical advice, diagnosis or treatment recommendations
- No guarantees about airline, airport or TSA procedures (all wording uses "may" and "can")
- Only the minimum data needed for generation is collected (11 fields, all optional except name)
- All data stays in the browser session; no server storage, no accounts, no analytics
- External resources are labelled with their source and marked as external links

---

## Assumptions and approach

- **Stack:** pure static HTML + CSS + JavaScript ES modules; no framework, no build step, no backend
- **All journey logic is in pure functions** (`src/journey/`) testable in Node.js without a browser
- **XSS protection:** all user-supplied text goes through `escapeHtml()` before any `innerHTML` insertion; NF6 tests cover the `<img onerror>` payload
- **Accessibility:** axe-core/jsdom for structural rules; contrast and focus checked manually in a real browser; results in `docs/ACCESSIBILITY_REPORT.md`
- **Provenance:** the submitted codebase was built during the Bobathon. It was informed by the team's prior Calm Skies concept, research and lived experience; no pre-event application code was used.
- **Demo scenario:** "Sam", age 8–10, first flight JFK → MCO, sensitive to noise and crowds, communication preference: pictures, comfort item: "blue blanket", visiting: "Grandma", calm strategy: "take slow breaths and squeeze my fidget", exciting detail: "swimming in the pool"

---

## How IBM Bob was used

Every task below was implemented by IBM Bob (Agent mode). Commits link to the evidence.

| Task | Phase | What Bob did | Commit |
|------|-------|--------------|--------|
| BOB-001 | Requirements + Architecture + Plan | Authored REQUIREMENTS.md (37 req IDs), ARCHITECTURE.md, plan.md | c487978 |
| BOB-002 | Scaffold | index.html, app/app.css, app/main.js, app/render.js (escapeHtml), scripts/serve.js, package.json, a11y test | f61fd41 |
| BOB-002a | Security fix — network exposure | serve.js: localhost-only, strict allow-list (commit d5367cc); decode-before-validate path traversal fix, regression tests (commit ae070d5) | d5367cc, ae070d5 |
| BOB-003 | Journey logic | buildStory() — 10 narrative steps, sensitivity-adapted | b5c0a07 |
| BOB-003a | Content fix | US English, no-guarantee wording, factual accuracy, wording tests (8 content defects found outside Bob) | b6799f2, 2d4365b |
| BOB-004 | Journey logic | buildJourney() — 10 steps with label/description/tip/symbol, tests | 234dc60 |
| BOB-005 | Journey logic | buildCalmKit() — ≥8 items, disclaimer, tests | 73024d6 |
| BOB-006 | Journey logic | buildParentChecklist() — beforeHome/perStage/notes, tests | 73024d6 |
| BOB-007 | Journey logic | RESOURCES module — 6 entries, no fetch, lastChecked, tests | 697e430 |
| BOB-008 | Render layer | Full renderAll() wiring all 5 outputs; journey navigator | ff7b557 |
| BOB-009 | Integration | Demo-scenario smoke test; full suite tests green | ff7b557 |
| BOB-010 | Accessibility hardening | Fixed 2 focus-loss defects; ACCESSIBILITY_REPORT.md; focus management tests | 1286430 |
| BOB-001B | Docs reframe | Enterprise SDLC framing across README, REQUIREMENTS, ARCHITECTURE, plan | d83a6be |
| BOB-001C | Docs accuracy | Attribution and claims accuracy: test count, provenance, review credits | 381f792 |
| BOB-017 | Responsible engineering | Privacy & security review → docs/RESPONSIBLE_ENGINEERING.md | 8bfc6a9 |
| BOB-018 | Deployment guide | GitHub Pages steps → DEPLOYMENT.md | 8bfc6a9 |
| BOB-019 | Personalization (A.J.'s requirement) | Comfort item + visiting fields in form; story personalization; 8 new tests | d567321 |
| BOB-021 | Wording accuracy | Mislabeled duplicate resource link + US spelling; found outside Bob while rendering demo pages | eef5423 |
| BOB-023 | Social story elements (A.J.'s requirement) | calmStrategy + excitingDetail fields; 3 Calm Kit items; "If it gets hard" checklist section; 17 new tests (100 total) | 663b689 |
| BOB-FINAL | Docs sync | Final sync of all docs to HEAD; US English fix; wording test extended to index.html | this commit |

### Four strongest evidence chains

**1 · Journey Builder P0 build**
Requirement R10–R13 (story) → Bob task BOB-003 → commit b5c0a07 → `node --test tests/story.test.js` → 8 pass, 0 fail. Full demo path (all 5 outputs) confirmed in BOB-009 → commit ff7b557 → `npm test` → 43 pass at that point.

**2 · Content accuracy remediation + wording test**
8 factual/wording defects (shoe-removal instruction, guarantee language, British spellings, inaccurate exit sign claim) found in review outside Bob → Bob task BOB-003a → commit b6799f2 → `npm test` → wording tests green. Regression prevented by 13 wording tests in `tests/wording.test.js`.

**3 · Path traversal: found outside Bob → Bob fix → regression tests**
Encoded path traversal (20 payloads including `%2e%2e%2f`, `%252e%252e%252f`, `%5c`) found by a probe outside Bob → Bob task BOB-002b → commit ae070d5 (`decode-then-validate` in `scripts/serve.js`) → `npm test` → 18 serve tests pass, including 8 traversal regression cases.

**4 · A.J.'s personalization requirement (BOB-019)**
A.J. Aronoff (team) supplied requirements R8 (comfort item, e.g. "blue blanket") and R9 (visiting, e.g. "Grandma") → Bob task BOB-019 → commit d567321 → `npm test` → 100 pass, 0 fail. Story personalization, kit label personalization, and XSS protection for both fields verified.

---

## Tools used

- **IBM Bob** wrote the application code, tests and the docs it committed
- **Claude Code (Anthropic)** acted as a planning coach and reviewer; produced `STATUS.html`, `comms/EXECUTIVE-BRIEF.md`, and internal dashboard records (not included); its instructions to Bob are archived in [`comms/`](comms/README.md)
- **ChatGPT (OpenAI)** was used pre-event for strategy, option analysis and competition-readiness review
- **Human contribution:** Marcelo chose the problem and framing and accepted trade-offs; the architecture was proposed by Bob and reviewed outside Bob
- **Libraries (devDependencies only):** axe-core 4.9, jsdom 24 — used for automated accessibility testing; not in the production bundle
- **HeyGen** — the demo video's narration uses an AI avatar; all app footage is real screen capture of this repository's application with fictional demo data.

---

## Demo video

`CalmSkies-TeamGuild-demo.mp4` (2:38) is included in the submission package. Scenario: a fictional 8-year-old, first flight New York JFK → Orlando MCO.

---

## Run it

```
npm install     # installs axe-core + jsdom (dev only)
npm start       # http://127.0.0.1:8080 (localhost only)
npm test        # node --test tests/*.test.js  →  100 tests, 0 failures
```

---

## Team

Team Guild. Marcelo Lorenzetti: project lead (problem choice, framing, scope and trade-off decisions, acceptance, demo). A.J. Aronoff: Calm Skies concept and product requirements (social stories, two voices — one for the caregiver, one for the child — go-bag and travel-resource research), from which requirements R8/R9 and the content direction came.

## License

MIT
