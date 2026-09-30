# Bob session 04 — inbox

- Bob task id: `ec453ffb532920026a2a833eede9c97f`
- Messages: 48 (system prompt omitted)
- Time (ET): 9/29/2026, 15:52:57 → 9/29/2026, 15:52:57
- Source: exported verbatim from IBM Bob's local task database (`~/.bob/db/bob.db`) by `export-bob-sessions.mjs`

---

### user · 9/29/2026, 15:52:57

inbox

### assistant · 9/29/2026, 15:52:57

INBOX RECEIVED 6

### tool · tool `update_todo_list` · 9/29/2026, 15:52:57

```json
{
  "todos": "\n[-] Read README.md, docs/pitch-template.md, evidence/BOBATHON_EVIDENCE.md\n[ ] Run npm test to get real test count\n[ ] Apply all 9 accuracy fixes to README.md and docs/pitch-template.md\n[ ] Update evidence/BOBATHON_EVIDENCE.md with BOB-001C row\n[ ] Commit with message \"docs: README attribution and claims accuracy (BOB-001C)\"\n[ ] Append outbox line\n"
}
```

```text
To do list updated: 6 items total.

Next to do item inprogress: Read README.md, docs/pitch-template.md, evidence/BOBATHON_EVIDENCE.md
```

### assistant · 9/29/2026, 15:52:57

### tool · tool `read_file` · 9/29/2026, 15:52:57

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
9 | **Can IBM Bob deliver an accessible, governed, tested, secure and maintainable customer experience — starting with zero — through a disciplined software development lifecycle?**
10 | 
11 | Air travel is one of the most stressful experiences for autistic children and their families. The airport environment is loud, unpredictable, crowded and full of transitions — exactly the conditions that are hardest to prepare for. No free, privacy-safe, offline-capable preparation tool exists that adapts the journey narrative to a child's specific sensitivities.
12 | 
13 | Calm Skies Journey Builder is a static web application that helps a caregiver prepare an autistic child for a flight. A caregiver enters a small amount of trip and preference information; the app instantly produces five personalised outputs:
14 | 
15 | 1. **My Flight Story** — a first-person narrative adapted to the child's sensitivities
16 | 2. **My Airport Journey** — a 10-step visual sequence, keyboard-navigable
17 | 3. **My Calm Kit** — a packing checklist tailored to the child's needs
18 | 4. **Parent Checklist** — a before-departure and per-stage checklist
19 | 5. **Accessibility Resources** — sourced, labelled links to external organisations
20 | 
21 | No data leaves the browser. No account is required. The page prints offline.
22 | 
23 | The enterprise value is not just the tool — it is the engineering discipline IBM Bob applied to build it: requirements with testable acceptance criteria, a documented architecture, pure tested logic, XSS protection, an automated accessibility scan, a privacy and security review, and a deployment guide, all produced in one event day.
24 | 
25 | ---
26 | 
27 | ## Detailed solution
28 | 
29 | ### Human use case
30 | 
31 | A caregiver (parent, teacher, therapist) visits the app on any device. They fill in up to seven optional fields: the child's name or nickname, age range, whether it is a first flight, departure and destination, sensitivities (noise, crowds, transitions, waiting), communication preference (spoken, pictures, written), and one free-text concern.
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
56 | | Testing | Wrote 68 unit, integration, accessibility and security tests | commits b5c0a07–b6799f2 |
57 | | Accessibility review | Automated axe-core scan; identified and fixed two keyboard focus losses (planned BOB-010) | tests/a11y.test.js |
58 | | Security review | Identified XSS vector, added `escapeHtml`, wrote NF6 test; fixed serve.js network exposure | commits d5367cc, b6799f2 |
59 | | Content review | Identified 8 factual/wording defects, rewrote story/journey copy, added wording tests | commit b6799f2 |
60 | | Documentation | Authored architecture, requirements, plan, pitch template, evidence log | this commit |
61 | | Deployment (planned) | Will author `docs/DEPLOYMENT.md` (BOB-018) | planned |
62 | 
63 | ### Responsible engineering
64 | 
65 | - No medical advice, diagnosis or treatment recommendations
66 | - No guarantees about airline, airport or TSA procedures (all wording uses "may" and "can")
67 | - Only the minimum data needed for generation is collected (7 fields, all optional except name)
68 | - All data stays in the browser session; no server storage, no accounts, no analytics
69 | - External resources are labelled with their source and marked as external links
70 | 
71 | ---
72 | 
73 | ## Assumptions and approach
74 | 
75 | - **Stack:** pure static HTML + CSS + JavaScript ES modules; no framework, no build step, no backend
76 | - **All journey logic is in pure functions** (`src/journey/`) testable in Node.js without a browser
77 | - **XSS protection:** all user-supplied text goes through `escapeHtml()` before any `innerHTML` insertion; NF6 test covers the `<img onerror>` payload
78 | - **Accessibility:** axe-core/jsdom for structural rules; contrast and focus checked manually in a real browser (planned: `docs/ACCESSIBILITY_REPORT.md`)
79 | - **No pre-built content exists** — this is a new build from zero, started and completed during the Bobathon event
80 | - **Demo scenario:** "Sam", age 8–10, first flight JFK → MCO, sensitive to noise and crowds, communication preference: written
81 | 
82 | ---
83 | 
84 | ## How IBM Bob was used
85 | 
86 | Every task below was implemented by IBM Bob (Agent mode). Commits link to the evidence.
87 | 
88 | | Task | Phase | What Bob did | Commit |
89 | |------|-------|--------------|--------|
90 | | BOB-001 | Requirements + Architecture + Plan | Authored REQUIREMENTS.md (37 req IDs), ARCHITECTURE.md, plan.md; applied 8 review fixes | c487978 |
91 | | BOB-002 | Scaffold | index.html (repo root), app/app.css, app/main.js, app/render.js (escapeHtml), scripts/serve.js, package.json, a11y test | f61fd41 |
92 | | BOB-002a | Security fix | serve.js: localhost-only, allow-list, 12 security tests | d5367cc |
93 | | BOB-003 | Journey logic | buildStory() — 10 steps, sensitivity-adapted, 8 unit tests | b5c0a07 |
94 | | BOB-003a | Content fix | US English, no-guarantee wording, factual accuracy, wording tests | b6799f2 |
95 | | BOB-004 | Journey logic | buildJourney() — 10 steps with label/description/tip/symbol, 8 tests | 234dc60 |
96 | | BOB-005 | Journey logic | buildCalmKit() — ≥8 items, disclaimer, 8 tests | 73024d6 |
97 | | BOB-006 | Journey logic | buildParentChecklist() — beforeHome/perStage/notes, 8 tests | 73024d6 |
98 | | BOB-007 | Journey logic | RESOURCES module — 6 entries, no fetch, lastChecked, 5 tests | 697e430 |
99 | | BOB-008 | Render layer | Full renderAll() wiring all 5 outputs; journey navigator; axe demo test | ff7b557 |
100 | | BOB-009 | Integration | Demo-scenario smoke test; full suite 43→68 tests | ff7b557 |
101 | | BOB-001B | Docs reframe | Enterprise SDLC framing across README, REQUIREMENTS, ARCHITECTURE, plan, pitch | this commit |
102 | 
103 | ---
104 | 
105 | ## Tools used
106 | 
107 | - **IBM Bob** wrote all application code, tests and documentation in this repository
108 | - **Claude Code (Anthropic)** acted as a planning coach and reviewer; maintained `STATUS.html`; its instructions to Bob are archived in [`comms/`](comms/README.md)
109 | - **ChatGPT (OpenAI)** was used pre-event for strategy, option analysis and competition-readiness review
110 | - **Human contribution:** Marcelo Lorenzetti led the project — chose the problem, made scope and architecture decisions, accepted trade-offs, will present the demo. All application code is credited to Bob
111 | - **Libraries (devDependencies only):** axe-core 4.9, jsdom 24 — used for automated accessibility testing; not in the production bundle
112 | 
113 | ---
114 | 
115 | ## Run it
116 | 
117 | ```
118 | npm install     # installs axe-core + jsdom (dev only)
119 | npm start       # http://127.0.0.1:8080 (localhost only)
120 | npm test        # node --test tests/*.test.js
121 | ```
122 | 
123 | ---
124 | 
125 | ## Team
126 | 
127 | - Marcelo Lorenzetti — Team Guild
128 | 
129 | ## License
130 | 
131 | MIT
132 |
```

### tool · tool `read_file` · 9/29/2026, 15:52:57

```json
{
  "path": "docs/pitch-template.md"
}
```

```text
Contents of file docs/pitch-template.md:

1 | # Pitch — Calm Skies Journey Builder
2 | 
3 | IBM Champions Bobathon NYC 2026 · Team Guild  
4 | Judging criteria: Innovation & Creativity 35 · Impact & Practicality 35 · Technical Implementation 30
5 | 
6 | ---
7 | 
8 | ## Central question
9 | 
10 | > **Can IBM Bob deliver an accessible, governed, tested, secure and maintainable customer experience — starting from zero — through a disciplined software development lifecycle?**
11 | 
12 | Calm Skies Journey Builder is the answer. It solves a real problem for autistic children and their families. And it demonstrates that IBM Bob can be trusted as an engineering partner across every phase of the SDLC — not just code generation.
13 | 
14 | ---
15 | 
16 | ## The problem (Impact & Practicality)
17 | 
18 | Air travel is one of the most stressful experiences for autistic children. The environment is loud, unpredictable, crowded and full of transitions. Families arrive without a preparation tool that is:
19 | 
20 | - **Private** — no account, no server, no data stored
21 | - **Offline-capable** — works after page load, printable
22 | - **Personalised** — adapts to the child's specific sensitivities, age and communication preference
23 | - **Honest** — no medical advice, no guarantees, no false promises about what airports will offer
24 | 
25 | No existing free tool meets all four criteria.
26 | 
27 | ---
28 | 
29 | ## The solution (Impact & Practicality)
30 | 
31 | Calm Skies Journey Builder is a static web application. A caregiver fills in up to 7 fields; one click produces five outputs:
32 | 
33 | | Output | What it does |
34 | |--------|-------------|
35 | | My Flight Story | First-person narrative, sensitivity-adapted |
36 | | My Airport Journey | 10-step navigator, keyboard-operable |
37 | | My Calm Kit | Packing checklist with medical-advice disclaimer |
38 | | Parent Checklist | Before-departure and per-stage items |
39 | | Accessibility Resources | Sourced links to TSA Cares, Hidden Disabilities Sunflower, DOT rights, Social Stories, Wings for Autism |
40 | 
41 | The page prints. Nothing is stored. Closing the tab clears all data.
42 | 
43 | **Demo scenario:** "Sam", age 8–10, first flight JFK → MCO, sensitive to noise and crowds.
44 | 
45 | ---
46 | 
47 | ## IBM Bob's SDLC role (Technical Implementation)
48 | 
49 | Bob was the primary implementation tool across the full development lifecycle, not just code generation:
50 | 
51 | | Phase | Bob's contribution |
52 | |-------|--------------------|
53 | | Requirements | 37 requirement IDs with testable acceptance criteria |
54 | | Architecture | File layout, data-flow, two alternatives rejected with reasoning |
55 | | Implementation | All application code: HTML, CSS, JS, pure journey functions |
56 | | Testing | 68 unit, integration, accessibility and security tests |
57 | | Security review | Found XSS vector → added escapeHtml + NF6 test; found serve.js network exposure → localhost-only allow-list |
58 | | Content review | Found 8 factual/wording defects → fixed copy + added wording tests |
59 | | Documentation | Requirements, architecture, plan, pitch, evidence log |
60 | | Deployment (planned) | DEPLOYMENT.md, ACCESSIBILITY_REPORT.md, RESPONSIBLE_ENGINEERING.md |
61 | 
62 | **Evidence trail:** `evidence/BOBATHON_EVIDENCE.md` — every task links requirement → Bob activity → files → test result → commit.
63 | 
64 | ---
65 | 
66 | ## Innovation & Creativity
67 | 
68 | Three things make this submission distinctive:
69 | 
70 | 1. **Bob as disciplined engineer, not prompt-and-paste.** Bob wrote the architecture document, rejected two alternatives with reasons, identified its own security defects after review, and maintained an evidence log. This is Bob across the SDLC.
71 | 
72 | 2. **Governance by design.** Content is separated from logic (`src/journey/` vs `app/`). Every change requires a passing test suite. Requirement IDs trace to commits. A travel provider could onboard a content team without touching rendering code.
73 | 
74 | 3. **Responsible-engineering-first.** The wording rules are enforced by tests: `tests/wording.test.js` scans every output for banned guarantee phrases, factual errors and wrong spellings. Accessibility is not a checkbox — it is part of the test suite and the evidence log.
75 | 
76 | ---
77 | 
78 | ## Enterprise adoption story (not built)
79 | 
80 | A travel provider — airline, airport, accessibility-focused travel app — could adopt Calm Skies by:
81 | 
82 | - Dropping the static files on any CDN (no server runtime)
83 | - Overriding two CSS variables to rebrand
84 | - Updating `src/journey/` content and running `npm test`
85 | 
86 | The design keeps compliance burden low: no personal data at rest, no authentication, no backend, no third-party scripts. These are adoption ideas, not built features.
87 | 
88 | ---
89 | 
90 | ## Scoring against criteria
91 | 
92 | | Criterion | Score | Claim |
93 | |-----------|-------|-------|
94 | | Innovation & Creativity (35) | — | Bob as full SDLC partner; governance-by-test; wording tests for responsible engineering |
95 | | Impact & Practicality (35) | — | Real family use case; printable; privacy-safe; adoption path for travel providers |
96 | | Technical Implementation (30) | — | 68 tests passing; axe-core a11y scan; XSS protection; localhost-only server; pure functions; evidence log |
97 | 
98 | > Note: scores are for judges to assign. No self-scoring claim is made here.
99 |
```

### tool · tool `read_file` · 9/29/2026, 15:52:57

```json
{
  "path": "evidence/BOBATHON_EVIDENCE.md"
}
```

```text
Contents of file evidence/BOBATHON_EVIDENCE.md:

1 | # Bobathon Evidence Log — Calm Skies Journey Builder
2 | 
3 | Team Guild · IBM Champions Bobathon NYC 2026
4 | 
5 | Each row: Requirement → Bob activity → Files changed → Test result → Commit
6 | 
7 | | Task | Requirement | Bob activity | Files | Test result | Commit |
8 | |------|-------------|--------------|-------|-------------|--------|
9 | | BOB-002 | R1–R7 (form inputs), NF1 (no server calls), NF4 (static), NF5 (pure ES modules), NF6 (XSS escape), A1 (labels), A2 (heading order) | Created index.html at repo root (7 labelled inputs, no pre-selected age, no inline styles); app/app.css (all CSS incl. @media print); app/main.js (form wiring); app/render.js (escapeHtml helper); scripts/serve.js (Node built-ins, localhost:8080); package.json (npm start + test); tests/a11y.test.js (NF6 escape + axe-core label/heading-order/image-alt) | index.html, app/app.css, app/main.js, app/render.js, scripts/serve.js, package.json, tests/a11y.test.js, evidence/BOBATHON_EVIDENCE.md | `node --test tests/a11y.test.js` → 3 pass, 0 fail | f61fd41 |
10 | | BOB-003 | R10 (≥9 steps), R11 (sensitivity adapts), R12 (name in first para), R13 (first-flight reassurance) | Implemented buildStory(inputs)→string in src/journey/story.js; 10 narrative steps; noise/crowds/transitions/waiting tips inserted per sensitivity; first-flight reassurance sentence | src/journey/story.js, tests/story.test.js | `node --test tests/story.test.js` → 8 pass, 0 fail | b5c0a07 |
11 | | BOB-004 | R20 (10 steps), R22 (label+desc+tip per step), R23 (symbol for pictures) | Implemented buildJourney(inputs)→Step[] in src/journey/journey.js; 10 named steps; tips adapt per sensitivity; symbol populated only for commPref=pictures | src/journey/journey.js, tests/journey.test.js | `node --test tests/journey.test.js` → 8 pass, 0 fail | 234dc60 |
12 | | BOB-005 | R30 (≥8 items), R31 (checkbox items), R32 (disclaimer), R33 (noise→headphones) | Implemented buildCalmKit(inputs)→{items,disclaimer} in src/journey/calmKit.js; 8 base items + sensitivity additions | src/journey/calmKit.js, tests/calmKit.test.js | `node --test tests/calmKit.test.js` → 8 pass, 0 fail | 73024d6 |
13 | | BOB-006 | R40 (beforeHome≥6, perStage≥5), R41 (checkbox items), R42 (concern echoed) | Implemented buildParentChecklist(inputs)→{beforeHome,perStage,notes} in src/journey/parentChecklist.js | src/journey/parentChecklist.js, tests/parentChecklist.test.js | `node --test tests/parentChecklist.test.js` → 8 pass, 0 fail | 73024d6 |
14 | | BOB-007 | R50 (≥5 resources, name+url+source), NF1 (no fetch) | RESOURCES constant in src/journey/resources.js; 6 entries; pure ES module, no fetch | src/journey/resources.js, tests/resources.test.js | `node --test tests/resources.test.js` → 5 pass, 0 fail | 697e430 |
15 | | BOB-008 | R60–R62 (all outputs rendered), R21 (journey nav), R31/R41 (checkboxes), R51 (resources distinct) | Implemented full render layer in app/render.js (escapeHtml, renderStory, renderJourney, renderCalmKit, renderParentChecklist, renderResources, renderAll); wireJourneyNav; app/main.js wired to all 5 journey functions | app/render.js, app/main.js, app/app.css, tests/a11y.test.js | `node --test tests/a11y.test.js` → 4 pass, 0 fail | ff7b557 |
16 | | BOB-009 | Full demo scenario (Sam, JFK→MCO, noise+crowds, first flight) end-to-end | Integration smoke test confirming all 5 outputs correct; full suite 43/43 | tests/integration.test.js | `node --test tests/*.test.js` → 43 pass, 0 fail | ff7b557 |
17 | | BOB-002a | Security: NF1, serve.js network exposure | serve.js: localhost-only bind, allow-list (index.html, app/, src/, assets/), dot-segment normalisation, 12 security tests including traversal | scripts/serve.js, tests/serve.test.js | `node --test tests/serve.test.js` → 12 pass, 0 fail | d5367cc |
18 | | BOB-003a | RE2 (no guarantees), factual accuracy, US English, wording | Rewrote story/journey copy: no shoe instruction, no guarantee phrases, "airplane" not "aeroplane", "line" not "queue"; added 13 wording tests; fixed parentChecklist (TSA Cares→beforeHome, travel docs wording); replaced 2 dead resource URLs | src/journey/story.js, journey.js, parentChecklist.js, resources.js, tests/wording.test.js | `node --test tests/*.test.js` → 68 pass, 0 fail | b6799f2 |
19 | | BOB-001B | Documentation: enterprise SDLC framing | README.md (4 required headings, central question, Bob SDLC table, adoption story); REQUIREMENTS.md (+EA1–6, Bobathon gates); ARCHITECTURE.md (adoption path not-built section); plan.md (5-min + 3-min demo scripts); pitch-template.md rewritten; docs/ideas.md removed | README.md, docs/* | docs commit d83a6be, 68 tests still passing | d83a6be |
20 |
```

### assistant · 9/29/2026, 15:52:57

Now let me run the tests to get the actual count:

### tool · tool `execute_command` · 9/29/2026, 15:52:57

```json
{
  "command": "npm test 2>&1 | tail -20",
  "timeout_seconds": 60
}
```

```text
Error from tool execute_command: Exit code: 1

Stderr:
tail : The term 'tail' is not recognized as the name of a cmdlet, function, script file, or operable program. Check 
the spelling of the name, or if a path was included, verify that the path is correct and try again.
At line:1 char:17
+ npm test 2>&1 | tail -20
+                 ~~~~
    + CategoryInfo          : ObjectNotFound: (tail:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
```

### assistant · 9/29/2026, 15:52:57

### tool · tool `execute_command` · 9/29/2026, 15:52:57

```json
{
  "command": "npm test 2>&1 | Select-Object -Last 20",
  "timeout_seconds": 60
}
```

```text
✔ wording: no "always" guarantee (0.201ms)
✔ wording: no "guarantee" word (0.1657ms)
✔ wording: story does not instruct child to remove shoes (0.1056ms)
✔ wording: story does not say "put your bag and shoes on a tray" (0.1041ms)
✔ wording: journey security step does not instruct shoe removal (0.1253ms)
✔ wording: exit step does not say "usually green" (0.1135ms)
✔ wording: story ending contains "arrived" not "has begun" (0.7904ms)
✔ wording: empty name does not produce "My name is I" (0.1553ms)
✔ wording: empty name story still has ≥9 paragraphs (0.2017ms)
✔ wording: no "aeroplane" (use "airplane") (0.1724ms)
✔ wording: no "queue" (use "line") (0.1111ms)
✔ wording: no "favourite" (use "favorite") (0.1119ms)
ℹ tests 74
ℹ suites 0
ℹ pass 74
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 1178.2685
```

### assistant · 9/29/2026, 15:52:57

74 tests, all passing. Now also check `tests/integration.test.js` for the demo scenario communication preference:

### tool · tool `grep` · 9/29/2026, 15:52:57

```json
{
  "pattern": "commPref|communication|pictures|written|spoken",
  "path": "tests/integration.test.js"
}
```

```text
Found 2 matches
tests\integration.test.js:
  Line 2: // Smoke test: demo scenario (Sam, 8–10, first flight, JFK→MCO, noise+crowds, written)
  Line 21:   commPref:      'written',
```

### assistant · 9/29/2026, 15:52:57

The integration test uses `written`. The inbox says communication preference should be "pictures" and README + plan.md must agree with tests/integration.test.js. So I need to check: should I change the test to "pictures", or change README/plan.md to say "written"? The instruction says "Demo scenario communication preference is 'pictures' (README + plan.md must agree with tests/integration.test.js)." — this means change the test to "pictures" and update README/plan.md to match. Let me check plan.md and what the journey.js symbol does for "pictures":

### tool · tool `read_file` · 9/29/2026, 15:52:57

```json
{
  "path": "tests/integration.test.js",
  "range": "1-35"
}
```

```text
Contents of file tests/integration.test.js:

1 | // tests/integration.test.js
2 | // Smoke test: demo scenario (Sam, 8–10, first flight, JFK→MCO, noise+crowds, written)
3 | // produces all 5 outputs with key content.
4 | 
5 | import { test } from 'node:test';
6 | import assert from 'node:assert/strict';
7 | import { buildStory }           from '../src/journey/story.js';
8 | import { buildJourney }         from '../src/journey/journey.js';
9 | import { buildCalmKit }         from '../src/journey/calmKit.js';
10 | import { buildParentChecklist } from '../src/journey/parentChecklist.js';
11 | import { RESOURCES }            from '../src/journey/resources.js';
12 | import { escapeHtml }           from '../app/render.js';
13 | 
14 | const DEMO = {
15 |   childName:     'Sam',
16 |   ageRange:      '8-10',
17 |   firstFlight:   true,
18 |   departure:     'JFK',
19 |   destination:   'MCO',
20 |   sensitivities: ['noise', 'crowds'],
21 |   commPref:      'written',
22 |   concern:       'Sam gets anxious waiting in lines',
23 | };
24 | 
25 | test('integration: all 5 outputs are produced for demo scenario', () => {
26 |   const story     = buildStory(DEMO);
27 |   const journey   = buildJourney(DEMO);
28 |   const kit       = buildCalmKit(DEMO);
29 |   const checklist = buildParentChecklist(DEMO);
30 |   const resources = RESOURCES;
31 | 
32 |   // Output 1 — Flight Story
33 |   assert.ok(story.includes('Sam'), 'Story must include child name');
34 |   assert.ok(story.includes('headphone') || story.toLowerCase().includes('quiet'), 'Story must adapt for noise');
35 |   assert.ok(story.toLowerCase().includes('first'), 'Story must include first-flight content');
```

### tool · tool `grep` · 9/29/2026, 15:52:57

```json
{
  "path": "docs/plan.md",
  "pattern": "Sam|commPref|written|pictures|communication"
}
```

```text
Found 10 matches
docs\plan.md:
  Line 11: **In scope (must demo):** Form inputs → 5 outputs (Flight Story, Airport Journey, Calm Kit, Parent Checklist, Accessibility Resources); keyboard navigation; print support; demo scenario Sam JFK→MCO.  
  Line 53: **What:** Implement `buildJourney(inputs) → Step[]` with exactly 10 steps. Each step: `{label, description, tip, symbol}`. Tips adapt to sensitivities. Symbol set for communication-preference "pictures".  
  Line 55: **Tests:** `tests/journey.test.js` — 10 steps; all have label+description+tip; noise tip contains "headphones"/"quiet"; pictures → symbol non-empty.  
  Line 103: **What:** Run all test files in sequence. Confirm demo scenario (Sam, 8–10, first flight, JFK→MCO, noise+crowds, written) produces all 5 outputs with correct content. Write evidence log entry.  
  Line 175: #### BOB-015 · Symbol/icon set for "pictures" preference  
  Line 199: 1. **(0:00)** *Narrate:* "Maria is preparing her 8-year-old son Sam for his first flight — New York JFK to Orlando. Sam is sensitive to noise and crowds and needs to know what's coming. There's no app that does this privately, offline, adapted to him. So Maria opens Calm Skies Journey Builder."
  Line 200: 2. **(0:25)** Fill in demo scenario: name "Sam", age 8–10, first flight ✓, JFK → MCO, sensitivities: noise + crowds, communication: written.
  Line 202: 4. **(1:00)** Scroll to **My Flight Story**: read the first sentence with Sam's name; point to the headphones line adapted for noise sensitivity.
  Line 208: 7. **(1:50)** Open terminal. Run `node --test tests/*.test.js` — 68 tests, 0 failures. *"Every line of this was written by Bob."*
  Line 230: 5. **(2:05)** Print preview: offline-ready. *"No data stored. No account. Prints and goes in Sam's travel bag."* *(20 s)*
```

### assistant · 9/29/2026, 15:52:57

### tool · tool `read_file` · 9/29/2026, 15:52:57

```json
{
  "path": "tests/integration.test.js",
  "range": "35-70"
}
```

```text
Contents of file tests/integration.test.js:

35 |   assert.ok(story.toLowerCase().includes('first'), 'Story must include first-flight content');
36 |   assert.ok(story.includes('JFK'), 'Story must include departure');
37 |   assert.ok(story.includes('MCO'), 'Story must include destination');
38 | 
39 |   // Output 2 — Airport Journey
40 |   assert.equal(journey.length, 10, 'Journey must have 10 steps');
41 |   const noiseTips = journey.filter(s => s.tip.toLowerCase().includes('headphone') || s.tip.toLowerCase().includes('quiet'));
42 |   assert.ok(noiseTips.length > 0, 'Journey must have noise-adapted tips');
43 | 
44 |   // Output 3 — Calm Kit
45 |   assert.ok(kit.items.length >= 8, 'Kit must have ≥8 items');
46 |   assert.ok(kit.items.find(i => i.label.toLowerCase().includes('headphone')), 'Kit must include headphones for noise');
47 |   assert.ok(kit.disclaimer.length > 0, 'Kit must have disclaimer');
48 | 
49 |   // Output 4 — Parent Checklist
50 |   assert.ok(checklist.beforeHome.length >= 6, 'Checklist must have ≥6 before-home items');
51 |   assert.ok(checklist.perStage.length >= 5, 'Checklist must have ≥5 per-stage items');
52 |   assert.ok(checklist.notes.includes('anxious waiting in lines'), 'Checklist notes must echo concern');
53 | 
54 |   // Output 5 — Resources
55 |   assert.ok(resources.length >= 5, 'Must have ≥5 resources');
56 |   const allText = resources.map(r => r.name + r.source).join(' ').toLowerCase();
57 |   assert.ok(allText.includes('sunflower'), 'Resources must include Hidden Disabilities Sunflower');
58 |   assert.ok(allText.includes('tsa'), 'Resources must include TSA Cares');
59 | });
60 | 
61 | test('integration: XSS name is escaped in story output', () => {
62 |   // buildStory returns plain text (not HTML) — escapeHtml applied by render layer
63 |   const xssInputs = { ...DEMO, childName: '<script>alert(1)</script>' };
64 |   const story = buildStory(xssInputs);
65 |   // The plain text story embeds the name as-is; render.js escapes it
66 |   // Check that escapeHtml neutralises it:
67 |   const escaped = escapeHtml(story);
68 |   assert.ok(!escaped.includes('<script>'), 'Escaped story must not contain <script> tag');
69 |   assert.ok(escaped.includes('&lt;script&gt;'), 'Escaped story must have escaped script tag');
70 | });
```

### assistant · 9/29/2026, 15:52:57

The integration test doesn't assert on `symbol` for pictures, so I can safely change commPref to 'pictures' without breaking tests. Let me check that journey.js actually populates symbol for 'pictures':

### tool · tool `grep` · 9/29/2026, 15:52:57

```json
{
  "path": "src/journey/journey.js",
  "pattern": "pictures|symbol|commPref"
}
```

```text
Found 24 matches
src\journey\journey.js:
  Line 10:  * @property {string} symbol      Unicode symbol for 'pictures' communication preference
  Line 19:     symbol: '🏠',
  Line 20:     symbolLabel: 'House',
  Line 31:     symbol: '✈️',
  Line 32:     symbolLabel: 'Airplane',
  Line 43:     symbol: '🎫',
  Line 44:     symbolLabel: 'Ticket',
  Line 55:     symbol: '🔍',
  Line 56:     symbolLabel: 'Magnifying glass',
  Line 67:     symbol: '🪑',
  Line 68:     symbolLabel: 'Chair',
  Line 79:     symbol: '🚶',
  Line 80:     symbolLabel: 'Person walking',
  Line 91:     symbol: '🌤️',
  Line 92:     symbolLabel: 'Sun behind cloud',
  Line 103:     symbol: '🛬',
  Line 104:     symbolLabel: 'Airplane landing',
  Line 115:     symbol: '🧳',
  Line 116:     symbolLabel: 'Luggage',
  Line 127:     symbol: '🎉',
  Line 128:     symbolLabel: 'Celebration',
  Line 147:   const pictures    = inputs.commPref === 'pictures';
  Line 162:       symbol:      pictures ? base.symbol : '',
  Line 163:       symbolLabel: pictures ? base.symbolLabel : '',
```

### assistant · 9/29/2026, 15:52:57

Good. Changing to 'pictures' will populate symbols but the integration test doesn't assert on symbol so it will still pass. Now I have everything I need. Let me apply all the changes:

### tool · tool `update_todo_list` · 9/29/2026, 15:52:57

```json
{
  "todos": "\n[x] Read README.md, docs/pitch-template.md, evidence/BOBATHON_EVIDENCE.md\n[x] Run npm test to get real test count (74 tests)\n[-] Apply all 9 accuracy fixes to README.md and docs/pitch-template.md\n[ ] Update integration test commPref to 'pictures' and update plan.md\n[ ] Update evidence/BOBATHON_EVIDENCE.md with BOB-001C row\n[ ] Commit with message \"docs: README attribution and claims accuracy (BOB-001C)\"\n[ ] Append outbox line\n"
}
```

```text
To do list updated: 7 items total.

Next to do item inprogress: Apply all 9 accuracy fixes to README.md and docs/pitch-template.md
```

### assistant · 9/29/2026, 15:52:57

Now applying all fixes to README.md:

### tool · tool `apply_diff` · 9/29/2026, 15:52:57

```json
{
  "path": "README.md",
  "diff": "<<<<<<< SEARCH\n:start_line:9\n-------\n**Can IBM Bob deliver an accessible, governed, tested, secure and maintainable customer experience — starting with zero — through a disciplined software development lifecycle?**\n\nAir travel is one of the most stressful experiences for autistic children and their families. The airport environment is loud, unpredictable, crowded and full of transitions — exactly the conditions that are hardest to prepare for. No free, privacy-safe, offline-capable preparation tool exists that adapts the journey narrative to a child's specific sensitivities.\n=======\n**Can IBM Bob turn a meaningful accessibility requirement into an accessible, tested, secure and maintainable customer experience through a disciplined SDLC?**\n\nAir travel is one of the most stressful experiences for autistic children and their families. The airport environment is loud, unpredictable, crowded and full of transitions — exactly the conditions that are hardest to prepare for. We did not find a free, privacy-safe, offline-capable preparation tool that adapts the journey narrative to a child's specific sensitivities.\n>>>>>>> REPLACE\n\n<<<<<<< SEARCH\n:start_line:23\n-------\nThe enterprise value is not just the tool — it is the engineering discipline IBM Bob applied to build it: requirements with testable acceptance criteria, a documented architecture, pure tested logic, XSS protection, an automated accessibility scan, a privacy and security review, and a deployment guide, all produced in one event day.\n=======\nThe enterprise value is not just the tool — it is the engineering discipline IBM Bob applied to build it: requirements with testable acceptance criteria, a documented architecture, pure tested logic, XSS protection, an automated accessibility scan; a privacy and security review (BOB-017, planned) and a deployment guide (BOB-018, planned).\n>>>>>>> REPLACE\n\n<<<<<<< SEARCH\n:start_line:51\n-------\n| SDLC phase | What Bob did | Evidence |\n|------------|--------------|----------|\n| Requirements | Authored `docs/REQUIREMENTS.md` (37 IDs, testable criteria) | commit c487978 |\n| Architecture | Authored `docs/ARCHITECTURE.md` (file layout, data-flow, alternatives rejected) | commit c487978 |\n| Implementation | Wrote all application code: `index.html`, `app/`, `src/journey/`, `scripts/` | commits f61fd41–b5c0a07 |\n| Testing | Wrote 68 unit, integration, accessibility and security tests | commits b5c0a07–b6799f2 |\n| Accessibility review | Automated axe-core scan; identified and fixed two keyboard focus losses (planned BOB-010) | tests/a11y.test.js |\n| Security review | Identified XSS vector, added `escapeHtml`, wrote NF6 test; fixed serve.js network exposure | commits d5367cc, b6799f2 |\n| Content review | Identified 8 factual/wording defects, rewrote story/journey copy, added wording tests | commit b6799f2 |\n| Documentation | Authored architecture, requirements, plan, pitch template, evidence log | this commit |\n| Deployment (planned) | Will author `docs/DEPLOYMENT.md` (BOB-018) | planned |\n=======\n| SDLC phase | What Bob did | Evidence |\n|------------|--------------|----------|\n| Requirements | Authored `docs/REQUIREMENTS.md` (37 IDs, testable criteria) | commit c487978 |\n| Architecture | Authored `docs/ARCHITECTURE.md` (file layout, data-flow, alternatives rejected) | commit c487978 |\n| Implementation | Wrote all application code: `index.html`, `app/`, `src/journey/`, `scripts/` | commits f61fd41–b5c0a07 |\n| Testing | Wrote 74 unit, integration, accessibility and security tests | commits b5c0a07–b6799f2 |\n| Accessibility review | Automated axe-core scan; 2 keyboard focus losses found in review outside Bob; not yet fixed (BOB-010) | tests/a11y.test.js |\n| Security review | XSS vector found in review outside Bob; Bob fixed it — added `escapeHtml`, NF6 test (commit d5367cc); serve.js network exposure found in review outside Bob; Bob fixed it — localhost-only, strict public-file allow-list, decode-before-validate path handling, XSS escaping, regression tests for encoded and double-encoded traversal (commit ae070d5) | commits d5367cc, ae070d5 |\n| Content review | 8 factual/wording defects found in review outside Bob; Bob fixed copy and added wording tests (commit b6799f2); encoded path traversal found in review outside Bob; Bob fixed it (commit 2d4365b) | commits b6799f2, 2d4365b |\n| Documentation | Authored architecture, requirements, plan, pitch template, evidence log | this commit |\n| Privacy/security review (planned) | Will author privacy and security review (BOB-017) | planned |\n| Deployment (planned) | Will author `docs/DEPLOYMENT.md` (BOB-018) | planned |\n>>>>>>> REPLACE\n\n<<<<<<< SEARCH\n:start_line:79\n-------\n- **No pre-built content exists** — this is a new build from zero, started and completed during the Bobathon event\n- **Demo scenario:** \"Sam\", age 8–10, first flight JFK → MCO, sensitive to noise and crowds, communication preference: written\n=======\n- **Provenance:** the submitted codebase was built during the Bobathon. It was informed by the team's prior Calm Skies concept, research and lived experience; no pre-event application code was used.\n- **Demo scenario:** \"Sam\", age 8–10, first flight JFK → MCO, sensitive to noise and crowds, communication preference: pictures\n>>>>>>> REPLACE\n\n<<<<<<< SEARCH\n:start_line:88\n-------\n| Task | Phase | What Bob did | Commit |\n|------|-------|--------------|--------|\n| BOB-001 | Requirements + Architecture + Plan | Authored REQUIREMENTS.md (37 req IDs), ARCHITECTURE.md, plan.md; applied 8 review fixes | c487978 |\n| BOB-002 | Scaffold | index.html (repo root), app/app.css, app/main.js, app/render.js (escapeHtml), scripts/serve.js, package.json, a11y test | f61fd41 |\n| BOB-002a | Security fix | serve.js: localhost-only, allow-list, 12 security tests | d5367cc |\n| BOB-003 | Journey logic | buildStory() — 10 steps, sensitivity-adapted, 8 unit tests | b5c0a07 |\n| BOB-003a | Content fix | US English, no-guarantee wording, factual accuracy, wording tests | b6799f2 |\n| BOB-004 | Journey logic | buildJourney() — 10 steps with label/description/tip/symbol, 8 tests | 234dc60 |\n| BOB-005 | Journey logic | buildCalmKit() — ≥8 items, disclaimer, 8 tests | 73024d6 |\n| BOB-006 | Journey logic | buildParentChecklist() — beforeHome/perStage/notes, 8 tests | 73024d6 |\n| BOB-007 | Journey logic | RESOURCES module — 6 entries, no fetch, lastChecked, 5 tests | 697e430 |\n| BOB-008 | Render layer | Full renderAll() wiring all 5 outputs; journey navigator; axe demo test | ff7b557 |\n| BOB-009 | Integration | Demo-scenario smoke test; full suite 43→68 tests | ff7b557 |\n| BOB-001B | Docs reframe | Enterprise SDLC framing across README, REQUIREMENTS, ARCHITECTURE, plan, pitch | this commit |\n=======\n| Task | Phase | What Bob did | Commit |\n|------|-------|--------------|--------|\n| BOB-001 | Requirements + Architecture + Plan | Authored REQUIREMENTS.md (37 req IDs), ARCHITECTURE.md, plan.md; applied 8 review fixes | c487978 |\n| BOB-002 | Scaffold | index.html (repo root), app/app.css, app/main.js, app/render.js (escapeHtml), scripts/serve.js, package.json, a11y test | f61fd41 |\n| BOB-002a | Security fix | serve.js: localhost-only, strict allow-list, decode-before-validate path handling, XSS escaping, regression tests for encoded and double-encoded traversal (fix for issue found outside Bob) | d5367cc, ae070d5 |\n| BOB-003 | Journey logic | buildStory() — 10 steps, sensitivity-adapted, 8 unit tests | b5c0a07 |\n| BOB-003a | Content fix | US English, no-guarantee wording, factual accuracy, wording tests; fix for 8 content defects + encoded path traversal found in review outside Bob | b6799f2, 2d4365b |\n| BOB-004 | Journey logic | buildJourney() — 10 steps with label/description/tip/symbol, 8 tests | 234dc60 |\n| BOB-005 | Journey logic | buildCalmKit() — ≥8 items, disclaimer, 8 tests | 73024d6 |\n| BOB-006 | Journey logic | buildParentChecklist() — beforeHome/perStage/notes, 8 tests | 73024d6 |\n| BOB-007 | Journey logic | RESOURCES module — 6 entries, no fetch, lastChecked, 5 tests | 697e430 |\n| BOB-008 | Render layer | Full renderAll() wiring all 5 outputs; journey navigator; axe demo test | ff7b557 |\n| BOB-009 | Integration | Demo-scenario smoke test; full suite 43→74 tests | ff7b557 |\n| BOB-001B | Docs reframe | Enterprise SDLC framing across README, REQUIREMENTS, ARCHITECTURE, plan, pitch | d83a6be |\n| BOB-001C | Docs accuracy | Attribution and claims accuracy: test count, provenance, review credits, focus fix status | this commit |\n>>>>>>> REPLACE\n\n<<<<<<< SEARCH\n:start_line:107\n-------\n- **IBM Bob** wrote all application code, tests and documentation in this repository\n- **Claude Code (Anthropic)** acted as a planning coach and reviewer; maintained `STATUS.html`; its instructions to Bob are archived in [`comms/`](comms/README.md)\n- **ChatGPT (OpenAI)** was used pre-event for strategy, option analysis and competition-readiness review\n- **Human contribution:** Marcelo Lorenzetti led the project — chose the problem, made scope and architecture decisions, accepted trade-offs, will present the demo. All application code is credited to Bob\n=======\n- **IBM Bob** wrote the application code, tests and the docs it committed\n- **Claude Code (Anthropic)** acted as a planning coach and reviewer; produced `STATUS.html`, `comms/EXECUTIVE-BRIEF.md`, `docs/DECISIONS.md`, `docs/ATTRIBUTION.md`, `docs/RULES-RECORD.md`, `docs/TEST-EVIDENCE.md` and the pre-event `.bob/` rules; its instructions to Bob are archived in [`comms/`](comms/README.md)\n- **ChatGPT (OpenAI)** was used pre-event for strategy, option analysis and competition-readiness review\n- **Human contribution:** Marcelo chose the problem and framing and accepted trade-offs; the architecture was proposed by Bob and reviewed outside Bob\n>>>>>>> REPLACE\n\n<<<<<<< SEARCH\n:start_line:127\n-------\n- Marcelo Lorenzetti — Team Guild\n=======\nTeam Guild — roster and contributions to be confirmed\n>>>>>>> REPLACE\n"
}
```

```text
Edited file: README.md

You do not need to re-read the file, as you have seen all changes.
Proceed with the task using these changes as the new baseline.

If the user's edits have addressed part of the task or changed the requirements, adjust your approach accordingly.

Patch of edit:

<patch>
@@ -5,11 +5,11 @@
 ---
 
 ## Problem statement
 
-**Can IBM Bob deliver an accessible, governed, tested, secure and maintainable customer experience — starting with zero — through a disciplined software development lifecycle?**
+**Can IBM Bob turn a meaningful accessibility requirement into an accessible, tested, secure and maintainable customer experience through a disciplined SDLC?**
 
-Air travel is one of the most stressful experiences for autistic children and their families. The airport environment is loud, unpredictable, crowded and full of transitions — exactly the conditions that are hardest to prepare for. No free, privacy-safe, offline-capable preparation tool exists that adapts the journey narrative to a child's specific sensitivities.
+Air travel is one of the most stressful experiences for autistic children and their families. The airport environment is loud, unpredictable, crowded and full of transitions — exactly the conditions that are hardest to prepare for. We did not find a free, privacy-safe, offline-capable preparation tool that adapts the journey narrative to a child's specific sensitivities.
 
 Calm Skies Journey Builder is a static web application that helps a caregiver prepare an autistic child for a flight. A caregiver enters a small amount of trip and preference information; the app instantly produces five personalised outputs:
 
 1. **My Flight Story** — a first-person narrative adapted to the child's sensitivities
@@ -19,9 +19,9 @@
 5. **Accessibility Resources** — sourced, labelled links to external organisations
 
 No data leaves the browser. No account is required. The page prints offline.
 
-The enterprise value is not just the tool — it is the engineering discipline IBM Bob applied to build it: requirements with testable acceptance criteria, a documented architecture, pure tested logic, XSS protection, an automated accessibility scan, a privacy and security review, and a deployment guide, all produced in one event day.
+The enterprise value is not just the tool — it is the engineering discipline IBM Bob applied to build it: requirements with testable acceptance criteria, a documented architecture, pure tested logic, XSS protection, an automated accessibility scan; a privacy and security review (BOB-017, planned) and a deployment guide (BOB-018, planned).
 
 ---
 
 ## Detailed solution
@@ -52,13 +52,14 @@
 |------------|--------------|----------|
 | Requirements | Authored `docs/REQUIREMENTS.md` (37 IDs, testable criteria) | commit c487978 |
 | Architecture | Authored `docs/ARCHITECTURE.md` (file layout, data-flow, alternatives rejected) | commit c487978 |
 | Implementation | Wrote all application code: `index.html`, `app/`, `src/journey/`, `scripts/` | commits f61fd41–b5c0a07 |
-| Testing | Wrote 68 unit, integration, accessibility and security tests | commits b5c0a07–b6799f2 |
-| Accessibility review | Automated axe-core scan; identified and fixed two keyboard focus losses (planned BOB-010) | tests/a11y.test.js |
-| Security review | Identified XSS vector, added `escapeHtml`, wrote NF6 test; fixed serve.js network exposure | commits d5367cc, b6799f2 |
-| Content review | Identified 8 factual/wording defects, rewrote story/journey copy, added wording tests | commit b6799f2 |
+| Testing | Wrote 74 unit, integration, accessibility and security tests | commits b5c0a07–b6799f2 |
+| Accessibility review | Automated axe-core scan; 2 keyboard focus losses found in review outside Bob; not yet fixed (BOB-010) | tests/a11y.test.js |
+| Security review | XSS vector found in review outside Bob; Bob fixed it — added `escapeHtml`, NF6 test (commit d5367cc); serve.js network exposure found in review outside Bob; Bob fixed it — localhost-only, strict public-file allow-list, decode-before-validate path handling, XSS escaping, regression tests for encoded and double-encoded traversal (commit ae070d5) | commits d5367cc, ae070d5 |
+| Content review | 8 factual/wording defects found in review outside Bob; Bob fixed copy and added wording tests (commit b6799f2); encoded path traversal found in review outside Bob; Bob fixed it (commit 2d4365b) | commits b6799f2, 2d4365b |
 | Documentation | Authored architecture, requirements, plan, pitch template, evidence log | this commit |
+| Privacy/security review (planned) | Will author privacy and security review (BOB-017) | planned |
 | Deployment (planned) | Will author `docs/DEPLOYMENT.md` (BOB-018) | planned |
 
 ### Responsible engineering
 
@@ -75,10 +76,10 @@
 - **Stack:** pure static HTML + CSS + JavaScript ES modules; no framework, no build step, no backend
 - **All journey logic is in pure functions** (`src/journey/`) testable in Node.js without a browser
 - **XSS protection:** all user-supplied text goes through `escapeHtml()` before any `innerHTML` insertion; NF6 test covers the `<img onerror>` payload
 - **Accessibility:** axe-core/jsdom for structural rules; contrast and focus checked manually in a real browser (planned: `docs/ACCESSIBILITY_REPORT.md`)
-- **No pre-built content exists** — this is a new build from zero, started and completed during the Bobathon event
-- **Demo scenario:** "Sam", age 8–10, first flight JFK → MCO, sensitive to noise and crowds, communication preference: written
+- **Provenance:** the submitted codebase was built during the Bobathon. It was informed by the team's prior Calm Skies concept, research and lived experience; no pre-event application code was used.
+- **Demo scenario:** "Sam", age 8–10, first flight JFK → MCO, sensitive to noise and crowds, communication preference: pictures
 
 ---
 
 ## How IBM Bob was used
@@ -88,27 +89,28 @@
 | Task | Phase | What Bob did | Commit |
 |------|-------|--------------|--------|
 | BOB-001 | Requirements + Architecture + Plan | Authored REQUIREMENTS.md (37 req IDs), ARCHITECTURE.md, plan.md; applied 8 review fixes | c487978 |
 | BOB-002 | Scaffold | index.html (repo root), app/app.css, app/main.js, app/render.js (escapeHtml), scripts/serve.js, package.json, a11y test | f61fd41 |
-| BOB-002a | Security fix | serve.js: localhost-only, allow-list, 12 security tests | d5367cc |
+| BOB-002a | Security fix | serve.js: localhost-only, strict allow-list, decode-before-validate path handling, XSS escaping, regression tests for encoded and double-encoded traversal (fix for issue found outside Bob) | d5367cc, ae070d5 |
 | BOB-003 | Journey logic | buildStory() — 10 steps, sensitivity-adapted, 8 unit tests | b5c0a07 |
-| BOB-003a | Content fix | US English, no-guarantee wording, factual accuracy, wording tests | b6799f2 |
+| BOB-003a | Content fix | US English, no-guarantee wording, factual accuracy, wording tests; fix for 8 content defects + encoded path traversal found in review outside Bob | b6799f2, 2d4365b |
 | BOB-004 | Journey logic | buildJourney() — 10 steps with label/description/tip/symbol, 8 tests | 234dc60 |
 | BOB-005 | Journey logic | buildCalmKit() — ≥8 items, disclaimer, 8 tests | 73024d6 |
 | BOB-006 | Journey logic | buildParentChecklist() — beforeHome/perStage/notes, 8 tests | 73024d6 |
 | BOB-007 | Journey logic | RESOURCES module — 6 entries, no fetch, lastChecked, 5 tests | 697e430 |
 | BOB-008 | Render layer | Full renderAll() wiring all 5 outputs; journey navigator; axe demo test | ff7b557 |
-| BOB-009 | Integration | Demo-scenario smoke test; full suite 43→68 tests | ff7b557 |
-| BOB-001B | Docs reframe | Enterprise SDLC framing across README, REQUIREMENTS, ARCHITECTURE, plan, pitch | this commit |
+| BOB-009 | Integration | Demo-scenario smoke test; full suite 43→74 tests | ff7b557 |
+| BOB-001B | Docs reframe | Enterprise SDLC framing across README, REQUIREMENTS, ARCHITECTURE, plan, pitch | d83a6be |
+| BOB-001C | Docs accuracy | Attribution and claims accuracy: test count, provenance, review credits, focus fix status | this commit |
 
 ---
 
 ## Tools used
 
-- **IBM Bob** wrote all application code, tests and documentation in this repository
-- **Claude Code (Anthropic)** acted as a planning coach and reviewer; maintained `STATUS.html`; its instructions to Bob are archived in [`comms/`](comms/README.md)
+- **IBM Bob** wrote the application code, tests and the docs it committed
+- **Claude Code (Anthropic)** acted as a planning coach and reviewer; produced `STATUS.html`, `comms/EXECUTIVE-BRIEF.md`, `docs/DECISIONS.md`, `docs/ATTRIBUTION.md`, `docs/RULES-RECORD.md`, `docs/TEST-EVIDENCE.md` and the pre-event `.bob/` rules; its instructions to Bob are archived in [`comms/`](comms/README.md)
 - **ChatGPT (OpenAI)** was used pre-event for strategy, option analysis and competition-readiness review
-- **Human contribution:** Marcelo Lorenzetti led the project — chose the problem, made scope and architecture decisions, accepted trade-offs, will present the demo. All application code is credited to Bob
+- **Human contribution:** Marcelo chose the problem and framing and accepted trade-offs; the architecture was proposed by Bob and reviewed outside Bob
 - **Libraries (devDependencies only):** axe-core 4.9, jsdom 24 — used for automated accessibility testing; not in the production bundle
 
 ---
 
@@ -123,9 +125,9 @@
 ---
 
 ## Team
 
-- Marcelo Lorenzetti — Team Guild
+Team Guild — roster and contributions to be confirmed
 
 ## License
 
 MIT

</patch>
```

### assistant · 9/29/2026, 15:52:57

Now fix `docs/pitch-template.md`:

### tool · tool `apply_diff` · 9/29/2026, 15:52:57

```json
{
  "path": "docs/pitch-template.md",
  "diff": "<<<<<<< SEARCH\n:start_line:10\n-------\n> **Can IBM Bob deliver an accessible, governed, tested, secure and maintainable customer experience — starting from zero — through a disciplined software development lifecycle?**\n=======\n> **Can IBM Bob turn a meaningful accessibility requirement into an accessible, tested, secure and maintainable customer experience through a disciplined SDLC?**\n>>>>>>> REPLACE\n\n<<<<<<< SEARCH\n:start_line:24\n-------\nNo existing free tool meets all four criteria.\n=======\nWe did not find an existing free tool that meets all four criteria.\n>>>>>>> REPLACE\n\n<<<<<<< SEARCH\n:start_line:43\n-------\n**Demo scenario:** \"Sam\", age 8–10, first flight JFK → MCO, sensitive to noise and crowds.\n=======\n**Demo scenario:** \"Sam\", age 8–10, first flight JFK → MCO, sensitive to noise and crowds, communication preference: pictures.\n>>>>>>> REPLACE\n\n<<<<<<< SEARCH\n:start_line:56\n-------\n| Testing | 68 unit, integration, accessibility and security tests |\n| Security review | Found XSS vector → added escapeHtml + NF6 test; found serve.js network exposure → localhost-only allow-list |\n| Content review | Found 8 factual/wording defects → fixed copy + added wording tests |\n| Documentation | Requirements, architecture, plan, pitch, evidence log |\n| Deployment (planned) | DEPLOYMENT.md, ACCESSIBILITY_REPORT.md, RESPONSIBLE_ENGINEERING.md |\n=======\n| Testing | 74 unit, integration, accessibility and security tests |\n| Security review | XSS vector found in review outside Bob; Bob fixed it — escapeHtml + NF6 test (commit d5367cc); serve.js network exposure found in review outside Bob; Bob fixed it — localhost-only, strict public-file allow-list, decode-before-validate path handling, XSS escaping, regression tests for encoded and double-encoded traversal (commit ae070d5) |\n| Content review | 8 factual/wording defects + encoded path traversal found in review outside Bob; Bob fixed copy and added wording tests (commits b6799f2, 2d4365b) |\n| Accessibility review | Automated axe-core scan; 2 keyboard focus losses found in review outside Bob; fix planned (BOB-010) |\n| Documentation | Requirements, architecture, plan, pitch, evidence log |\n| Privacy/security review (planned) | Privacy and security review — BOB-017 |\n| Deployment (planned) | DEPLOYMENT.md — BOB-018 |\n>>>>>>> REPLACE\n\n<<<<<<< SEARCH\n:start_line:96\n-------\n| Technical Implementation (30) | — | 68 tests passing; axe-core a11y scan; XSS protection; localhost-only server; pure functions; evidence log |\n=======\n| Technical Implementation (30) | — | 74 tests passing; axe-core a11y scan; XSS protection; localhost-only server; strict public-file allow-list; decode-before-validate path handling; pure functions; evidence log |\n>>>>>>> REPLACE\n"
}
```

```text
Edited file: docs/pitch-template.md

You do not need to re-read the file, as you have seen all changes.
Proceed with the task using these changes as the new baseline.

If the user's edits have addressed part of the task or changed the requirements, adjust your approach accordingly.

Patch of edit:

<patch>
@@ -6,9 +6,9 @@
 ---
 
 ## Central question
 
-> **Can IBM Bob deliver an accessible, governed, tested, secure and maintainable customer experience — starting from zero — through a disciplined software development lifecycle?**
+> **Can IBM Bob turn a meaningful accessibility requirement into an accessible, tested, secure and maintainable customer experience through a disciplined SDLC?**
 
 Calm Skies Journey Builder is the answer. It solves a real problem for autistic children and their families. And it demonstrates that IBM Bob can be trusted as an engineering partner across every phase of the SDLC — not just code generation.
 
 ---
@@ -21,9 +21,9 @@
 - **Offline-capable** — works after page load, printable
 - **Personalised** — adapts to the child's specific sensitivities, age and communication preference
 - **Honest** — no medical advice, no guarantees, no false promises about what airports will offer
 
-No existing free tool meets all four criteria.
+We did not find an existing free tool that meets all four criteria.
 
 ---
 
 ## The solution (Impact & Practicality)
@@ -39,9 +39,9 @@
 | Accessibility Resources | Sourced links to TSA Cares, Hidden Disabilities Sunflower, DOT rights, Social Stories, Wings for Autism |
 
 The page prints. Nothing is stored. Closing the tab clears all data.
 
-**Demo scenario:** "Sam", age 8–10, first flight JFK → MCO, sensitive to noise and crowds.
+**Demo scenario:** "Sam", age 8–10, first flight JFK → MCO, sensitive to noise and crowds, communication preference: pictures.
 
 ---
 
 ## IBM Bob's SDLC role (Technical Implementation)
@@ -52,13 +52,15 @@
 |-------|--------------------|
 | Requirements | 37 requirement IDs with testable acceptance criteria |
 | Architecture | File layout, data-flow, two alternatives rejected with reasoning |
 | Implementation | All application code: HTML, CSS, JS, pure journey functions |
-| Testing | 68 unit, integration, accessibility and security tests |
-| Security review | Found XSS vector → added escapeHtml + NF6 test; found serve.js network exposure → localhost-only allow-list |
-| Content review | Found 8 factual/wording defects → fixed copy + added wording tests |
+| Testing | 74 unit, integration, accessibility and security tests |
+| Security review | XSS vector found in review outside Bob; Bob fixed it — escapeHtml + NF6 test (commit d5367cc); serve.js network exposure found in review outside Bob; Bob fixed it — localhost-only, strict public-file allow-list, decode-before-validate path handling, XSS escaping, regression tests for encoded and double-encoded traversal (commit ae070d5) |
+| Content review | 8 factual/wording defects + encoded path traversal found in review outside Bob; Bob fixed copy and added wording tests (commits b6799f2, 2d4365b) |
+| Accessibility review | Automated axe-core scan; 2 keyboard focus losses found in review outside Bob; fix planned (BOB-010) |
 | Documentation | Requirements, architecture, plan, pitch, evidence log |
-| Deployment (planned) | DEPLOYMENT.md, ACCESSIBILITY_REPORT.md, RESPONSIBLE_ENGINEERING.md |
+| Privacy/security review (planned) | Privacy and security review — BOB-017 |
+| Deployment (planned) | DEPLOYMENT.md — BOB-018 |
 
 **Evidence trail:** `evidence/BOBATHON_EVIDENCE.md` — every task links requirement → Bob activity → files → test result → commit.
 
 ---
@@ -92,7 +94,7 @@
 | Criterion | Score | Claim |
 |-----------|-------|-------|
 | Innovation & Creativity (35) | — | Bob as full SDLC partner; governance-by-test; wording tests for responsible engineering |
 | Impact & Practicality (35) | — | Real family use case; printable; privacy-safe; adoption path for travel providers |
-| Technical Implementation (30) | — | 68 tests passing; axe-core a11y scan; XSS protection; localhost-only server; pure functions; evidence log |
+| Technical Implementation (30) | — | 74 tests passing; axe-core a11y scan; XSS protection; localhost-only server; strict public-file allow-list; decode-before-validate path handling; pure functions; evidence log |
 
 > Note: scores are for judges to assign. No self-scoring claim is made here.

</patch>
```

### assistant · 9/29/2026, 15:52:57

Now update the integration test and plan.md for `commPref: 'pictures'`:

### tool · tool `apply_diff` · 9/29/2026, 15:52:57

```json
{
  "path": "tests/integration.test.js",
  "diff": "<<<<<<< SEARCH\n:start_line:2\n-------\n// Smoke test: demo scenario (Sam, 8–10, first flight, JFK→MCO, noise+crowds, written)\n=======\n// Smoke test: demo scenario (Sam, 8–10, first flight, JFK→MCO, noise+crowds, pictures)\n>>>>>>> REPLACE\n\n<<<<<<< SEARCH\n:start_line:21\n-------\n  commPref:      'written',\n=======\n  commPref:      'pictures',\n>>>>>>> REPLACE\n"
}
```

```text
Edited file: tests/integration.test.js

You do not need to re-read the file, as you have seen all changes.
Proceed with the task using these changes as the new baseline.

If the user's edits have addressed part of the task or changed the requirements, adjust your approach accordingly.

Patch of edit:

<patch>
@@ -1,6 +1,6 @@
 // tests/integration.test.js
-// Smoke test: demo scenario (Sam, 8–10, first flight, JFK→MCO, noise+crowds, written)
+// Smoke test: demo scenario (Sam, 8–10, first flight, JFK→MCO, noise+crowds, pictures)
 // produces all 5 outputs with key content.
 
 import { test } from 'node:test';
 import assert from 'node:assert/strict';
@@ -17,9 +17,9 @@
   firstFlight:   true,
   departure:     'JFK',
   destination:   'MCO',
   sensitivities: ['noise', 'crowds'],
-  commPref:      'written',
+  commPref:      'pictures',
   concern:       'Sam gets anxious waiting in lines',
 };
 
 test('integration: all 5 outputs are produced for demo scenario', () => {

</patch>
```

### assistant · 9/29/2026, 15:52:57

Now fix plan.md to say "pictures" instead of "written" for the demo scenario:

### tool · tool `apply_diff` · 9/29/2026, 15:52:57

```json
{
  "diff": "<<<<<<< SEARCH\n:start_line:103\n-------\n**What:** Run all test files in sequence. Confirm demo scenario (Sam, 8–10, first flight, JFK→MCO, noise+crowds, written) produces all 5 outputs with correct content. Write evidence log entry.\n=======\n**What:** Run all test files in sequence. Confirm demo scenario (Sam, 8–10, first flight, JFK→MCO, noise+crowds, pictures) produces all 5 outputs with correct content. Write evidence log entry.\n>>>>>>> REPLACE\n\n<<<<<<< SEARCH\n:start_line:200\n-------\n2. **(0:25)** Fill in demo scenario: name \"Sam\", age 8–10, first flight ✓, JFK → MCO, sensitivities: noise + crowds, communication: written.\n=======\n2. **(0:25)** Fill in demo scenario: name \"Sam\", age 8–10, first flight ✓, JFK → MCO, sensitivities: noise + crowds, communication: pictures.\n>>>>>>> REPLACE\n",
  "path": "docs/plan.md"
}
```

```text
Edited file: docs/plan.md

You do not need to re-read the file, as you have seen all changes.
Proceed with the task using these changes as the new baseline.

If the user's edits have addressed part of the task or changed the requirements, adjust your approach accordingly.

Patch of edit:

<patch>
@@ -99,9 +99,9 @@
 
 #### BOB-009 · Full integration test + demo scenario validation  
 **Priority:** P0  
 **Files:** `tests/integration.test.js`, `evidence/BOBATHON_EVIDENCE.md`  
-**What:** Run all test files in sequence. Confirm demo scenario (Sam, 8–10, first flight, JFK→MCO, noise+crowds, written) produces all 5 outputs with correct content. Write evidence log entry.  
+**What:** Run all test files in sequence. Confirm demo scenario (Sam, 8–10, first flight, JFK→MCO, noise+crowds, pictures) produces all 5 outputs with correct content. Write evidence log entry.
 **Acceptance criteria:** `node --test tests/*.test.js` — all pass, zero failures.  
 **Tests:** All existing test files + integration smoke test.  
 **Evidence:** Full test output quoted; evidence log row; commit hash.
 
@@ -196,9 +196,9 @@
 
 **≈ 40% — User story (0:00–1:50)**
 
 1. **(0:00)** *Narrate:* "Maria is preparing her 8-year-old son Sam for his first flight — New York JFK to Orlando. Sam is sensitive to noise and crowds and needs to know what's coming. There's no app that does this privately, offline, adapted to him. So Maria opens Calm Skies Journey Builder."
-2. **(0:25)** Fill in demo scenario: name "Sam", age 8–10, first flight ✓, JFK → MCO, sensitivities: noise + crowds, communication: written.
+2. **(0:25)** Fill in demo scenario: name "Sam", age 8–10, first flight ✓, JFK → MCO, sensitivities: noise + crowds, communication: pictures.
 3. **(0:45)** Click **Build My Journey**. All 5 sections appear instantly — no network call.
 4. **(1:00)** Scroll to **My Flight Story**: read the first sentence with Sam's name; point to the headphones line adapted for noise sensitivity.
 5. **(1:20)** Scroll to **My Airport Journey**: navigate 3 steps with keyboard only (Tab → Next → Enter). Show tip adapting to crowds.
 6. **(1:40)** Scroll to **My Calm Kit** (tick headphones), then **Accessibility Resources** — each link labelled with its source organisation.

</patch>
```

### assistant · 9/29/2026, 15:52:57

Now run the tests to confirm they still pass:

### tool · tool `execute_command` · 9/29/2026, 15:52:57

```json
{
  "command": "npm test 2>&1 | Select-Object -Last 12",
  "timeout_seconds": 60
}
```

```text
✔ wording: empty name story still has ≥9 paragraphs (0.6879ms)
✔ wording: no "aeroplane" (use "airplane") (0.3883ms)
✔ wording: no "queue" (use "line") (0.2332ms)
✔ wording: no "favourite" (use "favorite") (0.2305ms)
ℹ tests 74
ℹ suites 0
ℹ pass 74
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 2035.8396
```

### assistant · 9/29/2026, 15:52:57

74 pass, 0 fail. Now add evidence row:

### tool · tool `update_todo_list` · 9/29/2026, 15:52:57

```json
{
  "todos": "\n[x] Read README.md, docs/pitch-template.md, evidence/BOBATHON_EVIDENCE.md\n[x] Run npm test to get real test count (74 tests)\n[x] Apply all 9 accuracy fixes to README.md and docs/pitch-template.md\n[x] Update integration test commPref to 'pictures' and update plan.md\n[-] Update evidence/BOBATHON_EVIDENCE.md with BOB-001C row\n[ ] Commit with message \"docs: README attribution and claims accuracy (BOB-001C)\"\n[ ] Append outbox line\n"
}
```

```text
To do list updated: 7 items total.

Next to do item inprogress: Update evidence/BOBATHON_EVIDENCE.md with BOB-001C row
```

### assistant · 9/29/2026, 15:52:57

### tool · tool `insert_content` · 9/29/2026, 15:52:57

```json
{
  "path": "evidence/BOBATHON_EVIDENCE.md",
  "line": 0,
  "content": "| BOB-001C | Documentation accuracy | README, pitch-template, plan: corrected test count (74), provenance statement, review-credit attribution (found outside Bob / fixed by Bob), focus-fix status (not yet fixed), planned items, demo commPref→pictures; integration test updated to match | README.md, docs/pitch-template.md, docs/plan.md, tests/integration.test.js, evidence/BOBATHON_EVIDENCE.md | `npm test` → 74 pass, 0 fail | this commit |\n"
}
```

```text
Edited file: evidence/BOBATHON_EVIDENCE.md

You do not need to re-read the file, as you have seen all changes.
Proceed with the task using these changes as the new baseline.

If the user's edits have addressed part of the task or changed the requirements, adjust your approach accordingly.

Patch of edit:

<patch>
@@ -16,4 +16,5 @@
 | BOB-009 | Full demo scenario (Sam, JFK→MCO, noise+crowds, first flight) end-to-end | Integration smoke test confirming all 5 outputs correct; full suite 43/43 | tests/integration.test.js | `node --test tests/*.test.js` → 43 pass, 0 fail | ff7b557 |
 | BOB-002a | Security: NF1, serve.js network exposure | serve.js: localhost-only bind, allow-list (index.html, app/, src/, assets/), dot-segment normalisation, 12 security tests including traversal | scripts/serve.js, tests/serve.test.js | `node --test tests/serve.test.js` → 12 pass, 0 fail | d5367cc |
 | BOB-003a | RE2 (no guarantees), factual accuracy, US English, wording | Rewrote story/journey copy: no shoe instruction, no guarantee phrases, "airplane" not "aeroplane", "line" not "queue"; added 13 wording tests; fixed parentChecklist (TSA Cares→beforeHome, travel docs wording); replaced 2 dead resource URLs | src/journey/story.js, journey.js, parentChecklist.js, resources.js, tests/wording.test.js | `node --test tests/*.test.js` → 68 pass, 0 fail | b6799f2 |
 | BOB-001B | Documentation: enterprise SDLC framing | README.md (4 required headings, central question, Bob SDLC table, adoption story); REQUIREMENTS.md (+EA1–6, Bobathon gates); ARCHITECTURE.md (adoption path not-built section); plan.md (5-min + 3-min demo scripts); pitch-template.md rewritten; docs/ideas.md removed | README.md, docs/* | docs commit d83a6be, 68 tests still passing | d83a6be |
+| BOB-001C | Documentation accuracy | README, pitch-template, plan: corrected test count (74), provenance statement, review-credit attribution (found outside Bob / fixed by Bob), focus-fix status (not yet fixed), planned items, demo commPref→pictures; integration test updated to match | README.md, docs/pitch-template.md, docs/plan.md, tests/integration.test.js, evidence/BOBATHON_EVIDENCE.md | `npm test` → 74 pass, 0 fail | this commit |

</patch>
```

### assistant · 9/29/2026, 15:52:57

Now commit:

### tool · tool `execute_command` · 9/29/2026, 15:52:57

```json
{
  "command": "git add README.md docs/pitch-template.md docs/plan.md tests/integration.test.js evidence/BOBATHON_EVIDENCE.md; git commit -m \"docs: README attribution and claims accuracy (BOB-001C)\""
}
```

```text
[main 381f792] docs: README attribution and claims accuracy (BOB-001C)
 5 files changed, 34 insertions(+), 29 deletions(-)

Stderr:
warning: in the working copy of 'README.md', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'docs/pitch-template.md', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'docs/plan.md', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'evidence/BOBATHON_EVIDENCE.md', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'tests/integration.test.js', LF will be replaced by CRLF the next time Git touches it
```

### assistant · 9/29/2026, 15:52:57

Commit `381f792`. Now append to outbox:

### tool · tool `update_todo_list` · 9/29/2026, 15:52:57

```json
{
  "todos": "\n[x] Read README.md, docs/pitch-template.md, evidence/BOBATHON_EVIDENCE.md\n[x] Run npm test to get real test count (74 tests)\n[x] Apply all 9 accuracy fixes to README.md and docs/pitch-template.md\n[x] Update integration test commPref to 'pictures' and update plan.md\n[x] Update evidence/BOBATHON_EVIDENCE.md with BOB-001C row\n[x] Commit with message \"docs: README attribution and claims accuracy (BOB-001C)\"\n[-] Append outbox line\n"
}
```

```text
To do list updated: 7 items total.

Next to do item inprogress: Append outbox line
```

### assistant · 9/29/2026, 15:52:57

### tool · tool `insert_content` · 9/29/2026, 15:52:57

```json
{
  "content": "TASK BOB-001C | done | README + pitch-template + plan accuracy: test count 74, provenance, review-credit attribution, focus-fix status, planned items, commPref→pictures; integration test updated | commit 381f792, npm test → 74 pass 0 fail\n",
  "line": 0,
  "path": "comms/outbox.md"
}
```

```text
Edited file: comms/outbox.md

You do not need to re-read the file, as you have seen all changes.
Proceed with the task using these changes as the new baseline.

If the user's edits have addressed part of the task or changed the requirements, adjust your approach accordingly.

Patch of edit:

<patch>
@@ -19,4 +19,5 @@
 BOB-002a+BOB-003a+BOB-001B complete: serve.js security fix, wording/accuracy fixes, enterprise SDLC framing — 68/68 tests passing — commits d5367cc b6799f2 d83a6be d878408
 
 TASK BOB-002b | done | decode-then-validate path traversal fix in serve.js; 7 raw-request tests cover Claude probe payloads | ae070d5; 18/18 serve tests pass
 TASK BOB-003b | done | allText() now covers all 5 outputs; "favourite" fixed 3× in calmKit.js | 2d4365b; 74/74 tests pass
+TASK BOB-001C | done | README + pitch-template + plan accuracy: test count 74, provenance, review-credit attribution, focus-fix status, planned items, commPref→pictures; integration test updated | commit 381f792, npm test → 74 pass 0 fail

</patch>
```

### assistant · 9/29/2026, 15:52:57

### tool · tool `execute_command` · 9/29/2026, 15:52:57

```json
{
  "command": "git add comms/outbox.md; git commit -m \"comms: outbox BOB-001C\""
}
```

```text
[main a2155f0] comms: outbox BOB-001C
 1 file changed, 1 insertion(+)

Stderr:
warning: in the working copy of 'comms/outbox.md', LF will be replaced by CRLF the next time Git touches it
```

### assistant · 9/29/2026, 15:52:57

### tool · tool `update_todo_list` · 9/29/2026, 15:52:57

```json
{
  "todos": "\n[x] Read README.md, docs/pitch-template.md, evidence/BOBATHON_EVIDENCE.md\n[x] Run npm test to get real test count (74 tests)\n[x] Apply all 9 accuracy fixes to README.md and docs/pitch-template.md\n[x] Update integration test commPref to 'pictures' and update plan.md\n[x] Update evidence/BOBATHON_EVIDENCE.md with BOB-001C row\n[x] Commit with message \"docs: README attribution and claims accuracy (BOB-001C)\"\n[x] Append outbox line\n"
}
```

```text
To do list updated: 7 items total.

To do list completed.
```

### assistant · 9/29/2026, 15:52:57

Done. Commit `381f792`. Here's a summary of every change made:

**README.md**
1. Central question → inbox wording ("turn a meaningful accessibility requirement…")
2. "No free … tool exists" → "We did not find …"
3. Privacy/security review and deployment guide → marked as planned (BOB-017, BOB-018)
4. SDLC table: test count 68→74; accessibility row: focus losses "not yet fixed (BOB-010)"; security row: "found in review outside Bob; Bob fixed it" with commits; content row: same attribution pattern + commits d5367cc, ae070d5, b6799f2, 2d4365b
5. Security wording: full localhost-only, strict allow-list, decode-before-validate, XSS escaping, regression tests description
6. "No pre-built content exists / starting with zero" → provenance statement per inbox item 7
7. Demo scenario commPref: written → pictures
8. Task table: 68→74, BOB-001B commit fixed to d83a6be, BOB-001C row added
9. Tools used: scoped Bob credit; Claude listed artefacts explicitly; human contribution per inbox item 8
10. Team → "Team Guild — roster and contributions to be confirmed"

**docs/pitch-template.md** — same central question, "We did not find…", test counts 68→74, SDLC table review credits, commPref pictures, Technical Implementation row updated.

**tests/integration.test.js** + **docs/plan.md** — commPref `'written'` → `'pictures'` in three places.

All 74 tests green.

