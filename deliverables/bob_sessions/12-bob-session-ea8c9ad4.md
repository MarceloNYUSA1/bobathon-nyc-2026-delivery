# Bob session 12 — inbox

- Bob task id: `ea8c9ad4f298b22db826b1ca8e7260b3`
- Messages: 19 (system prompt omitted)
- Time (ET): 9/29/2026, 17:48:04 → 9/29/2026, 17:48:04
- Source: exported verbatim from IBM Bob's local task database (`~/.bob/db/bob.db`) by `export-bob-sessions.mjs`

---

### user · 9/29/2026, 17:48:04

inbox

### assistant · 9/29/2026, 17:48:04

INBOX RECEIVED 14

### tool · tool `read_file` · 9/29/2026, 17:48:04

```json
{
  "path": "README.md"
}
```

```text
Contents of file README.md:

1 | # Calm Skies Journey Builder
2 | 
3 | Built with [IBM Bob](https://www.ibm.com/products/ai-coding-agent) at the IBM Champions Bobathon NYC 2026 · Team Guild
4 | 
5 | ---
6 | 
7 | ## Problem statement
8 | 
9 | **Can IBM Bob turn a meaningful accessibility requirement into an accessible, tested, secure and maintainable customer experience through a disciplined SDLC?**
10 | 
11 | Air travel is one of the most stressful experiences for autistic children and their families. The airport environment is loud, unpredictable, crowded and full of transitions — exactly the conditions that are hardest to prepare for. We did not find a free, privacy-safe, offline-capable preparation tool that adapts the journey narrative to a child's specific sensitivities.
12 | 
13 | Calm Skies Journey Builder is a static web application that helps a caregiver prepare an autistic child for a flight. A caregiver enters a small amount of trip and preference information; the app instantly produces five personalized outputs:
14 | 
15 | 1. **My Flight Story** — a first-person narrative adapted to the child's sensitivities
16 | 2. **My Airport Journey** — a 10-step visual sequence, keyboard-navigable
17 | 3. **My Calm Kit** — a packing checklist tailored to the child's needs
18 | 4. **Parent Checklist** — a before-departure and per-stage checklist
19 | 5. **Accessibility Resources** — sourced, labelled links to external organisations
20 | 
21 | No data leaves the browser. No account is required. The page prints offline.
22 | 
23 | The enterprise value is not just the tool — it is the engineering discipline IBM Bob applied to build it: requirements with testable acceptance criteria, a documented architecture, pure tested logic, XSS protection, an automated accessibility scan, a privacy and security review (BOB-017), and a deployment guide (BOB-018).
24 | 
25 | ---
26 | 
27 | ## Detailed solution
28 | 
29 | ### Human use case
30 | 
31 | A caregiver (parent, teacher, therapist) visits the app on any device. They fill in up to nine optional fields: the child's name or nickname, age range, whether it is a first flight, departure and destination, sensitivities (noise, crowds, transitions, waiting), communication preference (spoken, pictures, written), one free-text concern, a comfort item to bring (e.g. "blue blanket"), and who the child is visiting (e.g. "Grandma").
32 | 
33 | One click produces all five outputs on the same page. The caregiver can print or save as PDF — no internet connection needed after page load. Nothing is stored; closing the tab clears all data.
34 | 
35 | ### Enterprise story (adoption path — not yet built)
36 | 
37 | A travel provider — airline, airport, or accessibility-focused travel app — could adopt Calm Skies as a white-labelled preparation experience:
38 | 
39 | - **Hosting:** drop the static files on any CDN or object store; no server runtime required
40 | - **Branding:** override CSS variables in `app/app.css`; no logic changes needed
41 | - **Content extension:** journey steps, resources and kit items are pure data in `src/journey/`; a content team can update them without touching rendering or test code
42 | - **Governance:** every content change requires a passing test suite (`npm test`) and produces a traceable commit
43 | - **Compliance burden is low** because no personal data is stored, no authentication is needed, and no backend is involved
44 | 
45 | These are adoption ideas, not built features. No airline or airport is affiliated with this project.
46 | 
47 | ### IBM Bob's SDLC role
48 | 
49 | Bob was the primary implementation tool across the full software development lifecycle:
50 | 
51 | | SDLC phase | What Bob did | Evidence |
52 | |------------|--------------|----------|
53 | | Requirements | Authored `docs/REQUIREMENTS.md` (37 IDs, testable criteria) | commit c487978 |
54 | | Architecture | Authored `docs/ARCHITECTURE.md` (file layout, data-flow, alternatives rejected) | commit c487978 |
55 | | Implementation | Wrote all application code: `index.html`, `app/`, `src/journey/`, `scripts/` | commits f61fd41–b5c0a07 |
56 | | Testing | Wrote 87 unit, integration, accessibility and security tests | commits b5c0a07–eef5423 |
57 | | Accessibility review | Automated axe-core scan; 2 keyboard focus losses found in real-browser review outside Bob; Bob fixed both (BOB-010) | `tests/a11y.test.js`; commit 1286430 |
58 | | Security review | XSS vector found in design review outside Bob; Bob fixed it — added `escapeHtml`, NF6 tests (commits f61fd41, ff7b557); dev server network exposure found in code review outside Bob; Bob fixed it — localhost-only, strict public-file allow-list (commit d5367cc); encoded path traversal found by a probe outside Bob; Bob fixed it — decode-then-validate, regression tests (commit ae070d5) | commits f61fd41, ff7b557, d5367cc, ae070d5 |
59 | | Content review | 8 factual/wording defects found in review outside Bob; Bob fixed copy and added wording tests (commit b6799f2) | commit b6799f2 |
60 | | Personalization | A.J. Aronoff's requirement (comfort item + visiting fields) implemented by Bob (BOB-019) | commit d567321 |
61 | | Documentation | Authored architecture, requirements, plan, evidence log, accessibility report, responsible engineering review, deployment guide | commits c487978, d83a6be, 8bfc6a9 |
62 | 
63 | ### Responsible engineering
64 | 
65 | - No medical advice, diagnosis or treatment recommendations
66 | - No guarantees about airline, airport or TSA procedures (all wording uses "may" and "can")
67 | - Only the minimum data needed for generation is collected (9 fields, all optional except name)
68 | - All data stays in the browser session; no server storage, no accounts, no analytics
69 | - External resources are labelled with their source and marked as external links
70 | 
71 | ---
72 | 
73 | ## Assumptions and approach
74 | 
75 | - **Stack:** pure static HTML + CSS + JavaScript ES modules; no framework, no build step, no backend
76 | - **All journey logic is in pure functions** (`src/journey/`) testable in Node.js without a browser
77 | - **XSS protection:** all user-supplied text goes through `escapeHtml()` before any `innerHTML` insertion; NF6 tests cover the `<img onerror>` payload
78 | - **Accessibility:** axe-core/jsdom for structural rules; contrast and focus checked manually in a real browser; results in `docs/ACCESSIBILITY_REPORT.md`
79 | - **Provenance:** the submitted codebase was built during the Bobathon. It was informed by the team's prior Calm Skies concept, research and lived experience; no pre-event application code was used.
80 | - **Demo scenario:** "Sam", age 8–10, first flight JFK → MCO, sensitive to noise and crowds, communication preference: pictures, comfort item: "blue blanket", visiting: "Grandma"
81 | 
82 | ---
83 | 
84 | ## How IBM Bob was used
85 | 
86 | Every task below was implemented by IBM Bob (Agent mode). Commits link to the evidence.
87 | 
88 | | Task | Phase | What Bob did | Commit |
89 | |------|-------|--------------|--------|
90 | | BOB-001 | Requirements + Architecture + Plan | Authored REQUIREMENTS.md (37 req IDs), ARCHITECTURE.md, plan.md | c487978 |
91 | | BOB-002 | Scaffold | index.html, app/app.css, app/main.js, app/render.js (escapeHtml), scripts/serve.js, package.json, a11y test | f61fd41 |
92 | | BOB-002a | Security fix — network exposure | serve.js: localhost-only, strict allow-list (commit d5367cc); decode-before-validate path traversal fix, regression tests (commit ae070d5) | d5367cc, ae070d5 |
93 | | BOB-003 | Journey logic | buildStory() — 10 narrative steps, sensitivity-adapted | b5c0a07 |
94 | | BOB-003a | Content fix | US English, no-guarantee wording, factual accuracy, wording tests (8 content defects found outside Bob) | b6799f2, 2d4365b |
95 | | BOB-004 | Journey logic | buildJourney() — 10 steps with label/description/tip/symbol, tests | 234dc60 |
96 | | BOB-005 | Journey logic | buildCalmKit() — ≥8 items, disclaimer, tests | 73024d6 |
97 | | BOB-006 | Journey logic | buildParentChecklist() — beforeHome/perStage/notes, tests | 73024d6 |
98 | | BOB-007 | Journey logic | RESOURCES module — 6 entries, no fetch, lastChecked, tests | 697e430 |
99 | | BOB-008 | Render layer | Full renderAll() wiring all 5 outputs; journey navigator | ff7b557 |
100 | | BOB-009 | Integration | Demo-scenario smoke test; full suite tests green | ff7b557 |
101 | | BOB-010 | Accessibility hardening | Fixed 2 focus-loss defects; ACCESSIBILITY_REPORT.md; focus management tests | 1286430 |
102 | | BOB-001B | Docs reframe | Enterprise SDLC framing across README, REQUIREMENTS, ARCHITECTURE, plan | d83a6be |
103 | | BOB-001C | Docs accuracy | Attribution and claims accuracy: test count, provenance, review credits | 381f792 |
104 | | BOB-017 | Responsible engineering | Privacy & security review → docs/RESPONSIBLE_ENGINEERING.md | 8bfc6a9 |
105 | | BOB-018 | Deployment guide | GitHub Pages steps → DEPLOYMENT.md | 8bfc6a9 |
106 | | BOB-019 | Personalization (A.J.'s requirement) | Comfort item + visiting fields in form; story personalization; 8 new tests | d567321 |
107 | | BOB-021 | Wording accuracy | Mislabeled duplicate resource link + US spelling; found outside Bob while rendering demo pages | eef5423 |
108 | | BOB-FINAL | Docs sync | Final sync of all docs to HEAD; US English fix; wording test extended to index.html | this commit |
109 | 
110 | ### Four strongest evidence chains
111 | 
112 | **1 · Journey Builder P0 build**
113 | Requirement R10–R13 (story) → Bob task BOB-003 → commit b5c0a07 → `node --test tests/story.test.js` → 8 pass, 0 fail. Full demo path (all 5 outputs) confirmed in BOB-009 → commit ff7b557 → `npm test` → 43 pass at that point.
114 | 
115 | **2 · Content accuracy remediation + wording test**
116 | 8 factual/wording defects (shoe-removal instruction, guarantee language, British spellings, inaccurate exit sign claim) found in review outside Bob → Bob task BOB-003a → commit b6799f2 → `npm test` → wording tests green. Regression prevented by 13 wording tests in `tests/wording.test.js`.
117 | 
118 | **3 · Path traversal: found outside Bob → Bob fix → regression tests**
119 | Encoded path traversal (20 payloads including `%2e%2e%2f`, `%252e%252e%252f`, `%5c`) found by a probe outside Bob → Bob task BOB-002b → commit ae070d5 (`decode-then-validate` in `scripts/serve.js`) → `npm test` → 18 serve tests pass, including 8 traversal regression cases.
120 | 
121 | **4 · A.J.'s personalization requirement (BOB-019)**
122 | A.J. Aronoff (team) supplied requirements R8 (comfort item, e.g. "blue blanket") and R9 (visiting, e.g. "Grandma") → Bob task BOB-019 → commit d567321 → `npm test` → 87 pass, 0 fail. Story personalization, kit label personalization, and XSS protection for both fields verified.
123 | 
124 | ---
125 | 
126 | ## Tools used
127 | 
128 | - **IBM Bob** wrote the application code, tests and the docs it committed
129 | - **Claude Code (Anthropic)** acted as a planning coach and reviewer; produced `STATUS.html`, `comms/EXECUTIVE-BRIEF.md`, and internal dashboard records (not included); its instructions to Bob are archived in [`comms/`](comms/README.md)
130 | - **ChatGPT (OpenAI)** was used pre-event for strategy, option analysis and competition-readiness review
131 | - **Human contribution:** Marcelo chose the problem and framing and accepted trade-offs; the architecture was proposed by Bob and reviewed outside Bob
132 | - **Libraries (devDependencies only):** axe-core 4.9, jsdom 24 — used for automated accessibility testing; not in the production bundle
133 | 
134 | ---
135 | 
136 | ## Run it
137 | 
138 | ```
139 | npm install     # installs axe-core + jsdom (dev only)
140 | npm start       # http://127.0.0.1:8080 (localhost only)
141 | npm test        # node --test tests/*.test.js  →  87 tests, 0 failures
142 | ```
143 | 
144 | ---
145 | 
146 | ## Team
147 | 
148 | Team Guild. Marcelo Lorenzetti: project lead (problem choice, framing, scope and trade-off decisions, acceptance, demo). A.J. Aronoff: Calm Skies concept and product requirements (social stories, two voices — one for the caregiver, one for the child — go-bag and travel-resource research), from which requirements R8/R9 and the content direction came.
149 | 
150 | ## License
151 | 
152 | MIT
153 |
```

### assistant · 9/29/2026, 17:48:04

Now I'll make both changes: add the HeyGen bullet to "Tools used" and add the "Demo video" section before "Run it".

### tool · tool `apply_diff` · 9/29/2026, 17:48:04

```json
{
  "path": "README.md",
  "diff": "<<<<<<< SEARCH\n:start_line:132\n-------\n- **Libraries (devDependencies only):** axe-core 4.9, jsdom 24 — used for automated accessibility testing; not in the production bundle\n\n---\n\n## Run it\n=======\n- **Libraries (devDependencies only):** axe-core 4.9, jsdom 24 — used for automated accessibility testing; not in the production bundle\n- **HeyGen** — the demo video's narration uses an AI avatar; all app footage is real screen capture of this repository's application with fictional demo data.\n\n---\n\n## Demo video\n\n`CalmSkies-TeamGuild-demo.mp4` (2:38) is included in the submission package. Scenario: a fictional 8-year-old, first flight New York JFK → Orlando MCO.\n\n---\n\n## Run it\n>>>>>>> REPLACE\n"
}
```

```text
Edited file: README.md

You do not need to re-read the file, as you have seen all changes.
Proceed with the task using these changes as the new baseline.

If the user's edits have addressed part of the task or changed the requirements, adjust your approach accordingly.

Patch of edit:

<patch>
@@ -129,11 +129,18 @@
 - **Claude Code (Anthropic)** acted as a planning coach and reviewer; produced `STATUS.html`, `comms/EXECUTIVE-BRIEF.md`, and internal dashboard records (not included); its instructions to Bob are archived in [`comms/`](comms/README.md)
 - **ChatGPT (OpenAI)** was used pre-event for strategy, option analysis and competition-readiness review
 - **Human contribution:** Marcelo chose the problem and framing and accepted trade-offs; the architecture was proposed by Bob and reviewed outside Bob
 - **Libraries (devDependencies only):** axe-core 4.9, jsdom 24 — used for automated accessibility testing; not in the production bundle
+- **HeyGen** — the demo video's narration uses an AI avatar; all app footage is real screen capture of this repository's application with fictional demo data.
 
 ---
 
+## Demo video
+
+`CalmSkies-TeamGuild-demo.mp4` (2:38) is included in the submission package. Scenario: a fictional 8-year-old, first flight New York JFK → Orlando MCO.
+
+---
+
 ## Run it
 
 ```
 npm install     # installs axe-core + jsdom (dev only)

</patch>

Making multiple related changes in a single apply_diff is more efficient. If other changes are needed in this file, please include them as additional SEARCH/REPLACE blocks.
```

### assistant · 9/29/2026, 17:48:04

Now run tests then commit:

### tool · tool `execute_command` · 9/29/2026, 17:48:04

```json
{
  "command": "npm test",
  "timeout_seconds": 60
}
```

```text
> calm-skies-journey-builder@1.0.0 test
> node --test tests/*.test.js

✔ NF6 escapeHtml: XSS payload is rendered as text (0.8776ms)
✔ NF6 escapeHtml: ampersands and quotes are escaped (0.1535ms)
✔ a11y: index.html shell has zero axe violations (233.6861ms)
✔ a11y: demo scenario rendered output has zero axe violations (357.4735ms)
✔ focus: after submit, activeElement is the first h2 in #outputs (185.8909ms)
✔ focus: after reaching last journey step, activeElement is not <body> (90.0564ms)
✔ a11y: comfort-item and visiting fields are present and labelled (53.2806ms)
✔ R30: default inputs produce at least 8 items (1.9999ms)
✔ R31: every item has id, label and checked=false (1.891ms)
✔ R32: disclaimer is non-empty and mentions not medical advice (0.7068ms)
✔ R33: noise sensitivity adds headphones item (0.2749ms)
✔ noise sensitivity adds at least 2 extra items over baseline (1.5499ms)
✔ all sensitivities add more items than baseline (0.3286ms)
✔ pictures commPref adds picture communication cards (26.3464ms)
✔ item IDs are unique within the kit (0.4473ms)
✔ R8: comfort item name appears in kit label (0.5473ms)
✔ R8: default kit label used when comfort item empty (16.8715ms)
✔ integration: all 5 outputs are produced for demo scenario (17.7043ms)
✔ integration: XSS name is escaped in story output (0.5138ms)
✔ R20: buildJourney returns exactly 10 steps (1.6258ms)
✔ R20: all 10 step labels are present (0.4062ms)
✔ R22: each step has label, description, and tip (1.1948ms)
✔ R22: noise sensitivity adds headphones/quiet to a step tip (0.2343ms)
✔ R22: crowds sensitivity adds crowd-related tip to a step (0.1683ms)
✔ R23: pictures preference gives non-empty symbol on each step (0.1318ms)
✔ R23: non-pictures preference gives empty symbol (0.1374ms)
✔ all sensitivities combined still returns 10 steps with non-empty tips (0.1378ms)
✔ R40: beforeHome has at least 6 items (1.5201ms)
✔ R40: perStage has at least 5 items (0.271ms)
✔ R41: all items have id, label and checked=false (1.5748ms)
✔ R42: concern text is echoed in notes (0.3166ms)
✔ R42: empty concern gives empty notes (0.2488ms)
✔ noise sensitivity adds headphone-related item to beforeHome (0.4122ms)
✔ crowds sensitivity adds sunflower or crowd-related item to perStage (0.2672ms)
✔ firstFlight adds a talk item to beforeHome (0.2905ms)
✔ R50: at least 5 resources are defined (2.5269ms)
✔ R50: each resource has name, description, source and lastChecked (1.0007ms)
✔ R50: resources with a URL have a valid https URL (0.3067ms)
✔ R50: all resource URLs are unique (1.4507ms)
✔ R50: required organisations are represented (1.1229ms)
✔ RESOURCES is importable without browser or fetch (0.5113ms)
✔ serve: /.git/config returns 404 (40.9213ms)
✔ serve: /comms/outbox.md returns 404 (5.3625ms)
✔ serve: /docs/REQUIREMENTS.md returns 404 (6.1903ms)
✔ serve: /evidence/BOBATHON_EVIDENCE.md returns 404 (2.8965ms)
✔ serve: /scripts/serve.js returns 404 (4.5575ms)
✔ serve: /package.json returns 404 (9.6412ms)
✔ serve: slash-encoded traversal %2f never serves .git/config (6.9594ms)
✔ serve: backslash-encoded traversal %5c never serves .git/config (4.6062ms)
✔ serve: dot-encoded traversal %2e%2e%2f returns 400 or 404 (3.8924ms)
✔ serve: double-encoded traversal %252e%252e%252f returns 400 or 404 (3.6473ms)
✔ serve: semicolon path traversal attempt returns 400 or 404 (1.4228ms)
✔ serve: NUL byte in path returns 400 or 404 (2.2038ms)
✔ serve: mixed-case encoded slash %2F returns 400 or 404 (2.0176ms)
✔ serve: path traversal attempt /app/../../comms/outbox.md returns 404 (3.9166ms)
✔ serve: / returns 200 (index.html) (4.5735ms)
✔ serve: /index.html returns 200 (8.0698ms)
✔ serve: /app/app.css returns 200 (4.1016ms)
✔ serve: /app/main.js returns 200 (3.1203ms)
✔ R10: story has at least 9 paragraphs (steps) (2.2272ms)
✔ R12: child name appears in the first paragraph (0.1672ms)
✔ R11: noise sensitivity adds headphones or quiet to story (0.1302ms)
✔ R11: crowds sensitivity adds crowd-related tip to story (0.1356ms)
✔ R13: first-flight flag adds first-time reassurance (0.134ms)
✔ story without sensitivities still has ≥9 paragraphs (0.1533ms)
✔ story uses departure and destination in text (0.1076ms)
✔ all four sensitivities combined still produce a valid story (0.1755ms)
✔ R8: comfort item adds boarding line with item name (0.1512ms)
✔ R8: comfort item line absent when empty (0.2272ms)
✔ R9: visiting adds line near end with name (0.1336ms)
✔ R9: visiting line absent when empty (0.0981ms)
✔ R8/R9 XSS: comfort item and visiting are plain text in story output (0.1588ms)
✔ wording: no "will help a lot" guarantee phrase (2.4094ms)
✔ wording: no "always" guarantee (0.2904ms)
✔ wording: no "guarantee" word (0.2013ms)
✔ wording: story does not instruct child to remove shoes (0.4612ms)
✔ wording: story does not say "put your bag and shoes on a tray" (1.3976ms)
✔ wording: journey security step does not instruct shoe removal (0.2207ms)
✔ wording: exit step does not say "usually green" (0.424ms)
✔ wording: story ending contains "arrived" not "has begun" (0.3573ms)
✔ wording: empty name does not produce "My name is I" (0.2747ms)
✔ wording: empty name story still has ≥9 paragraphs (0.4606ms)
✔ wording: no "aeroplane" (use "airplane") (0.5385ms)
✔ wording: no "queue" (use "line") (0.3657ms)
✔ wording: no "favourite" (use "favorite") (0.5594ms)
✔ wording: index.html labels use US English "Traveling" not "Travelling" (0.2119ms)
✔ wording: render.js resources intro uses US English "organizations" not "organisations" (0.1472ms)
ℹ tests 87
ℹ suites 0
ℹ pass 87
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 2463.5357
```

### assistant · 9/29/2026, 17:48:04

87 pass, 0 fail. Now commit and update outbox:

### tool · tool `execute_command` · 9/29/2026, 17:48:04

```json
{
  "command": "git add README.md; git commit -m \"docs: demo video + HeyGen disclosure (BOB-022)\""
}
```

```text
[main 78aff3b] docs: demo video + HeyGen disclosure (BOB-022)
 1 file changed, 7 insertions(+)

Stderr:
warning: in the working copy of 'README.md', LF will be replaced by CRLF the next time Git touches it
```

### assistant · 9/29/2026, 17:48:04

### tool · tool `read_file` · 9/29/2026, 17:48:04

```json
{
  "path": "comms/outbox.md",
  "range": "1-5"
}
```

```text
Contents of file comms/outbox.md:

1 | DECISION | architecture | options: A) React SPA with Vite; B) Node/Express + SQLite backend; C) Zero-dependency static HTML + ES modules | chosen: C | why: rules require no server storage, no accounts, no backend; pure functions enable node:test without a browser; no build step minimises submission complexity | trade-off: no routing, no SSR, symbol set is Unicode placeholders in P0 | revisit if: multi-language or session persistence is added post-event
2 | 
3 | TASK BOB-001 | done | requirements, architecture, plan drafted | docs/REQUIREMENTS.md, docs/ARCHITECTURE.md, docs/plan.md (not committed)
4 | BOB-001 drafted REQUIREMENTS.md (37 req IDs), ARCHITECTURE.md (layout, data-flow, test strategy, 2 alternatives rejected), plan.md (BOB-002–016, P0/P1/P2, 5-min demo script) — docs/*.md not yet committed
5 | TASK BOB-001 | done | docs reviewed and committed | c487978
```

### assistant · 9/29/2026, 17:48:04

### tool · tool `read_file` · 9/29/2026, 17:48:04

```json
{
  "path": "comms/outbox.md",
  "range": "40-50"
}
```

```text
Contents of file comms/outbox.md:

40 |
```

### assistant · 9/29/2026, 17:48:04

### tool · tool `insert_content` · 9/29/2026, 17:48:04

```json
{
  "path": "comms/outbox.md",
  "line": 0,
  "content": "TASK BOB-022 | done | Added HeyGen disclosure bullet to \"Tools used\" and \"Demo video\" section to README.md | commit 78aff3b · npm test 87/87 pass\n"
}
```

```text
Edited file: comms/outbox.md

You do not need to re-read the file, as you have seen all changes.
Proceed with the task using these changes as the new baseline.

If the user's edits have addressed part of the task or changed the requirements, adjust your approach accordingly.

Patch of edit:

<patch>
@@ -29,4 +29,5 @@
 TASK BOB-FINAL | done | Final docs sync to HEAD: README Team/SDLC table/4 evidence chains updated, commit refs corrected (XSS=f61fd41+ff7b557, network=d5367cc, traversal=ae070d5), RESPONSIBLE_ENGINEERING XSS test→a11y.test.js, DEPLOYMENT render.test.js→a11y.test.js, plan.md 84 tests, index.html "Traveling to" US English, wording test extended to index.html, demo-script.md created, evidence log updated, banned phrases cleared | commit 0fe77c7 · npm test → 85 pass, 0 fail
 TASK BOB-FINAL-b | done | doc accuracy fixes: test counts→85, BOB-019 new tests→8, evidence chain 3 task→BOB-002b, US spelling (personalisation→personalization x6, travelling→traveling), REQUIREMENTS EA5 path, plan.md broken paths removed, demo lines de-hardcoded | commit 71fb097 · npm test → 85 pass, 0 fail
 TASK BOB-021 | done | resources: removed mislabeled duplicate URL (Airport accessibility page ? tip-only entry), fixed organisations ? organizations in render.js, added unique-URL and wording tests | 87/87 tests pass, commit eef5423
 TASK BOB-021b | done | replaced stale test count 85→87 in README.md (3 occurrences) and docs/ACCESSIBILITY_REPORT.md; added BOB-021 row to README task table | commit 8f396e1 · npm test → 87 pass, 0 fail
+TASK BOB-022 | done | Added HeyGen disclosure bullet to "Tools used" and "Demo video" section to README.md | commit 78aff3b · npm test 87/87 pass

</patch>
```

### assistant · 9/29/2026, 17:48:04

### tool · tool `execute_command` · 9/29/2026, 17:48:04

```json
{
  "command": "git add comms/outbox.md; git commit -m \"comms: outbox BOB-022\""
}
```

```text
[main 1d8b263] comms: outbox BOB-022
 1 file changed, 2 insertions(+)

Stderr:
warning: in the working copy of 'comms/outbox.md', LF will be replaced by CRLF the next time Git touches it
```

### assistant · 9/29/2026, 17:48:04

Done.

- Added **HeyGen** disclosure bullet to the "Tools used" section in [`README.md`](README.md:133)
- Added [`## Demo video`](README.md:137) section (before "Run it") with filename, runtime, and fictional scenario
- `npm test` → 87/87 pass
- Committed `docs: demo video + HeyGen disclosure (BOB-022)` → `78aff3b`
- Outbox updated

