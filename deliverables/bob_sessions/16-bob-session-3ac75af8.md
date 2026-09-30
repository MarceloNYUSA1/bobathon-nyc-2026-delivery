# Bob session 16 — index

- Bob task id: `3ac75af8f46c7f5576360e049d4101d5`
- Messages: 15 (system prompt omitted)
- Time (ET): 9/29/2026, 21:23:57 → 9/29/2026, 21:23:57
- Source: exported verbatim from IBM Bob's local task database (`~/.bob/db/bob.db`) by `export-bob-sessions.mjs`

---

### user · 9/29/2026, 21:23:57

index

### assistant · 9/29/2026, 21:23:57

INBOX RECEIVED 19

### tool · tool `read_file` · 9/29/2026, 21:23:57

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
5 | **▶ Live demo:** https://marcelonyusa1.github.io/bobathon-nyc-2026-delivery/ ·
6 | **🎥 Demo video:** https://github.com/MarceloNYUSA1/bobathon-nyc-2026-delivery/blob/main/deliverables/CalmSkies-TeamGuild-demo.mp4 ·
7 | **📦 Submission package:** deliverables/Guild.zip ·
8 | **✅ Tests:** 100/100 passing ·
9 | **Engineering history:** https://github.com/MarceloNYUSA1/bobathon-nyc-2026
10 | 
11 | ---
12 | 
13 | ## For judges: 3-minute tour
14 | 
15 | 1. Open the **live demo** (link above). Enter the demo scenario values: name = Sam, age = 8–10, first flight = yes, from = New York JFK, to = Orlando MCO, sensitivities = noise + crowds, communication = pictures, comfort item = blue blanket, visiting = Grandma, calm strategy = take slow breaths and squeeze my fidget, exciting detail = swimming in the pool. Click **Build My Journey**.
16 | 2. Watch the **demo video** (2:38) — screen capture of the same app with the same fictional data; narration by AI avatar (HeyGen, disclosed in Tools used).
17 | 3. Read the four evidence chains in the **How IBM Bob was used** section below.
18 | 4. Optional: `npm install && npm test` — 100 tests, 0 failures.
19 | 
20 | ---
21 | 
22 | ## Bobathon submission checklist
23 | 
24 | | Official requirement | Where to find it | Status |
25 | |----------------------|------------------|--------|
26 | | ONE ZIP named exactly as the registered team | `deliverables/Guild.zip` (team name: Guild) | ✅ |
27 | | `bob_sessions/` — exported Bob sessions for every registered member | `deliverables/Guild.zip → bob_sessions/` (14 sessions) | ✅ |
28 | | `code_files/` | `deliverables/Guild.zip → code_files/` | ✅ |
29 | | `README.md` with Problem statement, Detailed solution, Assumptions / approach, How Bob was used | This file | ✅ |
30 | | Demo video inside the ZIP | `deliverables/Guild.zip → deliverables/CalmSkies-TeamGuild-demo.mp4` (2:38) | ✅ |
31 | | Feedback form completed by every registered member | Completed on the submission portal by each member | ⏳ pending confirmation |
32 | | Upload to the Box folder | Upload via submission portal | ⏳ pending |
33 | | Deadline: Wednesday 30 Sep 2026, 3:00 PM ET | Targeting submission by 12:00 PM ET | ⏳ |
34 | 
35 | ---
36 | 
37 | ## How we address the judging criteria
38 | 
39 | | Criterion (weight) | Evidence |
40 | |--------------------|----------|
41 | | **Innovation & Creativity (35)** | Problem: no free, privacy-safe, offline-capable preparation tool adapts a flight narrative to a child's specific sensitivities. Solution: 5 personalized outputs from a single form click — not generic tips but a first-person story the child can read. IBM Bob as SDLC engine (not just autocomplete) across requirements → architecture → tests → accessibility → security → docs — that is the innovation. |
42 | | **Impact & Practicality (35)** | Runs in any browser, no install, no account. Prints offline; works after page load without a connection. Sensitivities, communication preference, comfort item, calm strategy and exciting detail are directly actionable for caregivers. White-label adoption path documented (`docs/ARCHITECTURE.md`, `DEPLOYMENT.md`). No medical advice, no guarantees, no data stored. |
43 | | **Technical Implementation (30)** | 100 unit + integration + accessibility + security tests (`npm test`). XSS protection on all user inputs via `escapeHtml()` (NF6). Path traversal decode-then-validate in `scripts/serve.js` (ae070d5). Automated axe-core scan + manual contrast/focus review (`docs/ACCESSIBILITY_REPORT.md`). Pure ES module architecture (no framework, no build step). Every commit links to a requirement ID and a passing test suite. |
44 | 
45 | ---
46 | 
47 | ## Problem statement
48 | 
49 | **Can IBM Bob turn a meaningful accessibility requirement into an accessible, tested, secure and maintainable customer experience through a disciplined SDLC?**
50 | 
51 | Air travel is one of the most stressful experiences for autistic children and their families. The airport environment is loud, unpredictable, crowded and full of transitions — exactly the conditions that are hardest to prepare for. We did not find a free, privacy-safe, offline-capable preparation tool that adapts the journey narrative to a child's specific sensitivities.
52 | 
53 | Calm Skies Journey Builder is a static web application that helps a caregiver prepare an autistic child for a flight. A caregiver enters a small amount of trip and preference information; the app instantly produces five personalized outputs:
54 | 
55 | 1. **My Flight Story** — a first-person narrative adapted to the child's sensitivities
56 | 2. **My Airport Journey** — a 10-step visual sequence, keyboard-navigable
57 | 3. **My Calm Kit** — a packing checklist tailored to the child's needs
58 | 4. **Parent Checklist** — a before-departure and per-stage checklist
59 | 5. **Accessibility Resources** — sourced, labelled links to external organizations
60 | 
61 | No data leaves the browser. No account is required. The page prints offline.
62 | 
63 | The enterprise value is not just the tool — it is the engineering discipline IBM Bob applied to build it: requirements with testable acceptance criteria, a documented architecture, pure tested logic, XSS protection, an automated accessibility scan, a privacy and security review (BOB-017), and a deployment guide (BOB-018).
64 | 
65 | ---
66 | 
67 | ## Detailed solution
68 | 
69 | ### Human use case
70 | 
71 | A caregiver (parent, teacher, therapist) visits the app on any device. They fill in up to thirteen optional fields: the child's name or nickname, age range, whether it is a first flight, departure and destination, sensitivities (noise, crowds, transitions, waiting), communication preference (spoken, pictures, written), one free-text concern, a comfort item to bring (e.g. "blue blanket"), who the child is visiting (e.g. "Grandma"), a calm strategy for worried moments (e.g. "take slow breaths and squeeze my fidget"), and one exciting thing about the trip (e.g. "swimming in the pool").
72 | 
73 | One click produces all five outputs on the same page. The caregiver can print or save as PDF — no internet connection needed after page load. Nothing is stored; closing the tab clears all data.
74 | 
75 | ### Architecture
76 | 
77 | ```mermaid
78 | graph LR
79 |     A[index.html form] --> B[app/main.js readForm]
80 |     B --> C[src/journey/story.js buildStory]
81 |     B --> D[src/journey/journey.js buildJourney]
82 |     B --> E[src/journey/calmKit.js buildCalmKit]
83 |     B --> F[src/journey/parentChecklist.js buildParentChecklist]
84 |     B --> G[src/journey/resources.js RESOURCES]
85 |     C --> H[app/render.js escapeHtml + renderAll]
86 |     D --> H
87 |     E --> H
88 |     F --> H
89 |     G --> H
90 |     H --> I[#outputs section in DOM]
91 |     J[tests/*.test.js] -.->|Node.js, no browser| C
92 |     J -.->|Node.js, no browser| D
93 |     J -.->|Node.js, no browser| E
94 |     J -.->|Node.js, no browser| F
95 |     J -.->|Node.js, no browser| G
96 |     J -.->|jsdom| H
97 | ```
98 | 
99 | No network calls. No localStorage. `escapeHtml()` sanitizes every user-supplied value before `innerHTML` insertion.
100 | 
101 | ### Enterprise story (adoption path — not yet built)
102 | 
103 | A travel provider — airline, airport, or accessibility-focused travel app — could adopt Calm Skies as a white-labelled preparation experience:
104 | 
105 | - **Hosting:** drop the static files on any CDN or object store; no server runtime required
106 | - **Branding:** override CSS variables in `app/app.css`; no logic changes needed
107 | - **Content extension:** journey steps, resources and kit items are pure data in `src/journey/`; a content team can update them without touching rendering or test code
108 | - **Governance:** every content change requires a passing test suite (`npm test`) and produces a traceable commit
109 | - **Compliance burden is low** because no personal data is stored, no authentication is needed, and no backend is involved
110 | 
111 | These are adoption ideas, not built features. No airline or airport is affiliated with this project.
112 | 
113 | ### IBM Bob's SDLC role
114 | 
115 | Bob was the primary implementation tool across the full software development lifecycle:
116 | 
117 | | SDLC phase | What Bob did | Evidence |
118 | |------------|--------------|----------|
119 | | Requirements | Authored `docs/REQUIREMENTS.md` (37 IDs, testable criteria) | c487978 |
120 | | Architecture | Authored `docs/ARCHITECTURE.md` (file layout, data-flow, alternatives rejected) | c487978 |
121 | | Implementation | Wrote all application code: `index.html`, `app/`, `src/journey/`, `scripts/` | f61fd41–b5c0a07 |
122 | | Testing | Wrote 100 unit, integration, accessibility and security tests | b5c0a07–663b689 |
123 | | Accessibility review | Automated axe-core scan; 2 keyboard focus losses found in real-browser review outside Bob; Bob fixed both (BOB-010) | `tests/a11y.test.js`; 1286430 |
124 | | Security review | XSS vector found in design review outside Bob; Bob fixed it — added `escapeHtml`, NF6 tests (f61fd41, ff7b557); dev server network exposure found in code review outside Bob; Bob fixed it — localhost-only, strict public-file allow-list (d5367cc); encoded path traversal found by a probe outside Bob; Bob fixed it — decode-then-validate, regression tests (ae070d5) | f61fd41, ff7b557, d5367cc, ae070d5 |
125 | | Content review | 8 factual/wording defects found in review outside Bob; Bob fixed copy and added wording tests | b6799f2 |
126 | | Personalization | A.J. Aronoff's requirements (comfort item + visiting + calm strategy + exciting detail) implemented by Bob (BOB-019, BOB-023) | d567321, 663b689 |
127 | | Documentation | Authored architecture, requirements, plan, evidence log, accessibility report, responsible engineering review, deployment guide | c487978, d83a6be, 8bfc6a9 |
128 | 
129 | ### Responsible engineering
130 | 
131 | - No medical advice, diagnosis or treatment recommendations
132 | - No guarantees about airline, airport or TSA procedures (all wording uses "may" and "can")
133 | - Only the minimum data needed for generation is collected (13 fields, all optional except name)
134 | - All data stays in the browser session; no server storage, no accounts, no analytics
135 | - External resources are labelled with their source and marked as external links
136 | 
137 | ---
138 | 
139 | ## Assumptions and approach
140 | 
141 | - **Stack:** pure static HTML + CSS + JavaScript ES modules; no framework, no build step, no backend
142 | - **All journey logic is in pure functions** (`src/journey/`) testable in Node.js without a browser
143 | - **XSS protection:** all user-supplied text goes through `escapeHtml()` before any `innerHTML` insertion; NF6 tests cover the `<img onerror>` payload
144 | - **Accessibility:** axe-core/jsdom for structural rules; contrast and focus checked manually in a real browser; results in `docs/ACCESSIBILITY_REPORT.md`
145 | - **Provenance:** the submitted codebase was built during the Bobathon. It was informed by the team's prior Calm Skies concept, research and lived experience; no pre-event application code was used.
146 | - **Demo scenario:** "Sam", age 8–10, first flight JFK → MCO, sensitive to noise and crowds, communication preference: pictures, comfort item: "blue blanket", visiting: "Grandma", calm strategy: "take slow breaths and squeeze my fidget", exciting detail: "swimming in the pool"
147 | 
148 | ---
149 | 
150 | ## How IBM Bob was used
151 | 
152 | Every task below was implemented by IBM Bob (Agent mode). Commits link to the evidence.
153 | 
154 | | Task | Phase | What Bob did | Commit |
155 | |------|-------|--------------|--------|
156 | | BOB-001 | Requirements + Architecture + Plan | Authored REQUIREMENTS.md (37 req IDs), ARCHITECTURE.md, plan.md | c487978 |
157 | | BOB-002 | Scaffold | index.html, app/app.css, app/main.js, app/render.js (escapeHtml), scripts/serve.js, package.json, a11y test | f61fd41 |
158 | | BOB-002b | Security fix — path traversal | serve.js: decode-then-validate, 8 traversal regression tests | ae070d5 |
159 | | BOB-002a | Security fix — network exposure | serve.js: localhost-only, strict allow-list | d5367cc |
160 | | BOB-003 | Journey logic | buildStory() — 10 narrative steps, sensitivity-adapted | b5c0a07 |
161 | | BOB-003a | Content fix | US English, no-guarantee wording, factual accuracy, wording tests (8 defects found outside Bob) | b6799f2, 2d4365b |
162 | | BOB-003b | Wording test coverage | Wording test extended to cover all outputs | 2d4365b |
163 | | BOB-004 | Journey logic | buildJourney() — 10 steps with label/description/tip/symbol, tests | 234dc60 |
164 | | BOB-005 | Journey logic | buildCalmKit() — ≥8 items, disclaimer, tests | 73024d6 |
165 | | BOB-006 | Journey logic | buildParentChecklist() — beforeHome/perStage/notes, tests | 73024d6 |
166 | | BOB-007 | Journey logic | RESOURCES module — 6 entries, no fetch, lastChecked, tests | 697e430 |
167 | | BOB-008 | Render layer | Full renderAll() wiring all 5 outputs; journey navigator | ff7b557 |
168 | | BOB-009 | Integration | Demo-scenario smoke test; full suite tests green | ff7b557 |
169 | | BOB-010 | Accessibility hardening | Fixed 2 focus-loss defects; ACCESSIBILITY_REPORT.md; focus management tests | 1286430 |
170 | | BOB-001B | Docs reframe | Enterprise SDLC framing across README, REQUIREMENTS, ARCHITECTURE, plan | d83a6be |
171 | | BOB-001C | Docs accuracy | Attribution and claims accuracy: test count, provenance, review credits | 381f792 |
172 | | BOB-017 | Responsible engineering | Privacy & security review → docs/RESPONSIBLE_ENGINEERING.md | 8bfc6a9 |
173 | | BOB-018 | Deployment guide | GitHub Pages steps → DEPLOYMENT.md | 8bfc6a9 |
174 | | BOB-019 | Personalization (A.J.'s requirement) | Comfort item + visiting fields in form; story personalization; 8 new tests | d567321 |
175 | | BOB-021 | Wording accuracy | Mislabeled duplicate resource link + US spelling; found outside Bob while rendering demo pages | eef5423 |
176 | | BOB-021b | Docs accuracy | Test count and BOB-021 row | 8f396e1 |
177 | | BOB-022 | Demo video disclosure | Demo video + HeyGen disclosure added to README | 78aff3b |
178 | | BOB-023 | Social story elements (A.J.'s requirement) | calmStrategy + excitingDetail fields; 3 Calm Kit items (R16); "If it gets hard" checklist section (R17); 17 new tests (100 total) | 663b689 |
179 | | BOB-023b | Docs accuracy | README count and BOB-023 commit refs | eceff82 |
180 | | BOB-FINAL | Docs sync | Final sync of all docs to HEAD; US English fix; wording test extended to index.html | 0fe77c7 |
181 | | BOB-FINAL-b | Docs accuracy | Corrected test counts, US spelling throughout, broken doc paths | 71fb097 |
182 | | BOB-025 | Final README for judges | Requirement ID fix (R14–R17); README restructured for judges; evidence accuracy fixes | HEAD |
183 | 
184 | ### Four strongest evidence chains
185 | 
186 | **1 · Journey Builder P0 build**
187 | Requirements R10–R13 (Flight Story: ≥9 steps, sensitivity adapts, name in first para, first-flight reassurance) → Bob task BOB-003 → commit b5c0a07 → `node --test tests/story.test.js` → 8 pass, 0 fail. Full demo path (all 5 outputs) confirmed in BOB-009 → commit ff7b557 → `npm test` → 43 pass at that point.
188 | 
189 | **2 · Content accuracy remediation + wording test**
190 | 8 factual/wording defects (shoe-removal instruction, guarantee language, British spellings, inaccurate exit sign claim) found in review outside Bob → Bob task BOB-003a → commit b6799f2 → `npm test` → wording tests green. Regression prevented by 13 wording tests in `tests/wording.test.js`.
191 | 
192 | **3 · Path traversal: found outside Bob → Bob fix → regression tests**
193 | Encoded path traversal (20 payloads including `%2e%2e%2f`, `%252e%252e%252f`, `%5c`) found by a probe outside Bob → Bob task BOB-002b → commit ae070d5 (`decode-then-validate` in `scripts/serve.js`) → `npm test` → 18 serve tests pass, including 8 traversal regression cases.
194 | 
195 | **4 · A.J.'s personalization requirements (BOB-019, BOB-023)**
196 | A.J. Aronoff (team) supplied R8 (comfort item), R9 (visiting), R14 (calm strategy), R15 (exciting detail), R16 (Calm Kit items), R17 ("If it gets hard") → Bob tasks BOB-019 + BOB-023 → commits d567321, 663b689 → `npm test` → 100 pass, 0 fail at commit 663b689. Story personalization, kit label personalization, and XSS protection for all new fields verified.
197 | 
198 | ---
199 | 
200 | ## What's in this repository
201 | 
202 | ```
203 | index.html            Static app entry point
204 | app/                  app.css, main.js, render.js (escapeHtml + renderAll)
205 | src/journey/          Pure ES module functions: story, journey, calmKit, parentChecklist, resources
206 | tests/                100 tests: story, journey, calmKit, parentChecklist, resources, integration, a11y, serve, wording
207 | docs/                 REQUIREMENTS.md, ARCHITECTURE.md, plan.md, ACCESSIBILITY_REPORT.md,
208 |                       RESPONSIBLE_ENGINEERING.md, DEPLOYMENT.md, demo-script.md
209 | evidence/             BOBATHON_EVIDENCE.md — requirement → Bob activity → files → test → commit
210 | deliverables/         Guild.zip (submission package), demo video, bob_sessions/
211 | ```
212 | 
213 | Instructions to Bob are archived in the engineering repository (https://github.com/MarceloNYUSA1/bobathon-nyc-2026).
214 | 
215 | ---
216 | 
217 | ## Responsible engineering
218 | 
219 | - No medical advice, diagnosis or treatment recommendations in any generated text
220 | - No guarantees about airline, airport or TSA procedures
221 | - Only the minimum data needed for generation is collected; no email, location or biometric data
222 | - All data stays in the browser session; closing the tab clears everything
223 | - External resources are clearly labelled with their source organization name and marked as external links
224 | 
225 | ---
226 | 
227 | ## Tools used
228 | 
229 | - **IBM Bob** wrote all application code, tests, and the documentation files it committed
230 | - **Claude Code (Anthropic)** acted as a planning coach and reviewer; produced `STATUS.html` and internal dashboard records (not included in submission); instructions to Bob are archived in the engineering repository
231 | - **ChatGPT (OpenAI)** was used pre-event for strategy, option analysis and competition-readiness review
232 | - **Human contribution:** Marcelo chose the problem and framing and accepted trade-offs; the architecture was proposed by Bob and reviewed outside Bob
233 | - **Libraries (devDependencies only):** axe-core 4.9, jsdom 24 — used for automated accessibility testing; not in the production bundle
234 | - **HeyGen** — the demo video's narration uses an AI avatar; all app footage is real screen capture of this repository's application with fictional demo data
235 | 
236 | ---
237 | 
238 | ## Run it
239 | 
240 | ```
241 | npm install     # installs axe-core + jsdom (dev only)
242 | npm start       # http://127.0.0.1:8080 (localhost only)
243 | npm test        # node --test tests/*.test.js  →  100 tests, 0 failures
244 | ```
245 | 
246 | ---
247 | 
248 | ## Demo video
249 | 
250 | `CalmSkies-TeamGuild-demo.mp4` (2:38) is included in the submission package. Scenario: a fictional 8-year-old "Sam", first flight New York JFK → Orlando MCO.
251 | 
252 | ---
253 | 
254 | ## Team
255 | 
256 | Team Guild. Marcelo Lorenzetti: project lead (problem choice, framing, scope and trade-off decisions, acceptance, demo). A.J. Aronoff: Calm Skies concept and product requirements (social stories, two voices — one for the caregiver, one for the child — go-bag and travel-resource research), from which requirements R8/R9/R14–R17 and the content direction came.
257 | 
258 | ## License
259 | 
260 | MIT
261 |
```

### assistant · 9/29/2026, 21:23:57

Now I'll apply all 4 fixes:

### tool · tool `apply_diff` · 9/29/2026, 21:23:57

```json
{
  "path": "README.md",
  "diff": "<<<<<<< SEARCH\n:start_line:41\n-------\n| **Innovation & Creativity (35)** | Problem: no free, privacy-safe, offline-capable preparation tool adapts a flight narrative to a child's specific sensitivities. Solution: 5 personalized outputs from a single form click — not generic tips but a first-person story the child can read. IBM Bob as SDLC engine (not just autocomplete) across requirements → architecture → tests → accessibility → security → docs — that is the innovation. |\n=======\n| **Innovation & Creativity (35)** | Problem: we did not find a free, privacy-safe, offline-capable preparation tool that adapts a flight narrative to a child's specific sensitivities. Solution: 5 personalized outputs from a single form click — not generic tips but a first-person story the child can read. IBM Bob as SDLC engine (not just autocomplete) across requirements → architecture → tests → accessibility → security → docs — that is the innovation. |\n>>>>>>> REPLACE\n\n<<<<<<< SEARCH\n:start_line:43\n-------\n| **Technical Implementation (30)** | 100 unit + integration + accessibility + security tests (`npm test`). XSS protection on all user inputs via `escapeHtml()` (NF6). Path traversal decode-then-validate in `scripts/serve.js` (ae070d5). Automated axe-core scan + manual contrast/focus review (`docs/ACCESSIBILITY_REPORT.md`). Pure ES module architecture (no framework, no build step). Every commit links to a requirement ID and a passing test suite. |\n=======\n| **Technical Implementation (30)** | 100 unit + integration + accessibility + security tests (`npm test`). XSS protection on all user inputs via `escapeHtml()` (NF6). Path traversal decode-then-validate in `scripts/serve.js` (ae070d5). Automated axe-core scan + manual contrast/focus review (`docs/ACCESSIBILITY_REPORT.md`). Pure ES module architecture (no framework, no build step). Every Bob task links to requirement IDs and a passing test run (see How IBM Bob was used). |\n>>>>>>> REPLACE\n\n<<<<<<< SEARCH\n:start_line:30\n-------\n| Demo video inside the ZIP | `deliverables/Guild.zip → deliverables/CalmSkies-TeamGuild-demo.mp4` (2:38) | ✅ |\n=======\n| Demo video inside the ZIP | `Guild.zip → CalmSkies-TeamGuild-demo.mp4` (top level, 2:38) | ✅ |\n>>>>>>> REPLACE\n\n<<<<<<< SEARCH\n:start_line:27\n-------\n| `bob_sessions/` — exported Bob sessions for every registered member | `deliverables/Guild.zip → bob_sessions/` (14 sessions) | ✅ |\n=======\n| `bob_sessions/` — 14 IBM Bob sessions (Marcelo Lorenzetti's Bob tasks during the event), exported verbatim from Bob's local task database | `deliverables/Guild.zip → bob_sessions/` | ✅ |\n>>>>>>> REPLACE\n"
}
```

```text
Edited file: README.md

You do not need to re-read the file, as you have seen all changes.
Proceed with the task using these changes as the new baseline.

If the user's edits have addressed part of the task or changed the requirements, adjust your approach accordingly.

Patch of edit:

<patch>
@@ -23,12 +23,12 @@
 
 | Official requirement | Where to find it | Status |
 |----------------------|------------------|--------|
 | ONE ZIP named exactly as the registered team | `deliverables/Guild.zip` (team name: Guild) | ✅ |
-| `bob_sessions/` — exported Bob sessions for every registered member | `deliverables/Guild.zip → bob_sessions/` (14 sessions) | ✅ |
+| `bob_sessions/` — 14 IBM Bob sessions (Marcelo Lorenzetti's Bob tasks during the event), exported verbatim from Bob's local task database | `deliverables/Guild.zip → bob_sessions/` | ✅ |
 | `code_files/` | `deliverables/Guild.zip → code_files/` | ✅ |
 | `README.md` with Problem statement, Detailed solution, Assumptions / approach, How Bob was used | This file | ✅ |
-| Demo video inside the ZIP | `deliverables/Guild.zip → deliverables/CalmSkies-TeamGuild-demo.mp4` (2:38) | ✅ |
+| Demo video inside the ZIP | `Guild.zip → CalmSkies-TeamGuild-demo.mp4` (top level, 2:38) | ✅ |
 | Feedback form completed by every registered member | Completed on the submission portal by each member | ⏳ pending confirmation |
 | Upload to the Box folder | Upload via submission portal | ⏳ pending |
 | Deadline: Wednesday 30 Sep 2026, 3:00 PM ET | Targeting submission by 12:00 PM ET | ⏳ |
 
@@ -37,11 +37,11 @@
 ## How we address the judging criteria
 
 | Criterion (weight) | Evidence |
 |--------------------|----------|
-| **Innovation & Creativity (35)** | Problem: no free, privacy-safe, offline-capable preparation tool adapts a flight narrative to a child's specific sensitivities. Solution: 5 personalized outputs from a single form click — not generic tips but a first-person story the child can read. IBM Bob as SDLC engine (not just autocomplete) across requirements → architecture → tests → accessibility → security → docs — that is the innovation. |
+| **Innovation & Creativity (35)** | Problem: we did not find a free, privacy-safe, offline-capable preparation tool that adapts a flight narrative to a child's specific sensitivities. Solution: 5 personalized outputs from a single form click — not generic tips but a first-person story the child can read. IBM Bob as SDLC engine (not just autocomplete) across requirements → architecture → tests → accessibility → security → docs — that is the innovation. |
 | **Impact & Practicality (35)** | Runs in any browser, no install, no account. Prints offline; works after page load without a connection. Sensitivities, communication preference, comfort item, calm strategy and exciting detail are directly actionable for caregivers. White-label adoption path documented (`docs/ARCHITECTURE.md`, `DEPLOYMENT.md`). No medical advice, no guarantees, no data stored. |
-| **Technical Implementation (30)** | 100 unit + integration + accessibility + security tests (`npm test`). XSS protection on all user inputs via `escapeHtml()` (NF6). Path traversal decode-then-validate in `scripts/serve.js` (ae070d5). Automated axe-core scan + manual contrast/focus review (`docs/ACCESSIBILITY_REPORT.md`). Pure ES module architecture (no framework, no build step). Every commit links to a requirement ID and a passing test suite. |
+| **Technical Implementation (30)** | 100 unit + integration + accessibility + security tests (`npm test`). XSS protection on all user inputs via `escapeHtml()` (NF6). Path traversal decode-then-validate in `scripts/serve.js` (ae070d5). Automated axe-core scan + manual contrast/focus review (`docs/ACCESSIBILITY_REPORT.md`). Pure ES module architecture (no framework, no build step). Every Bob task links to requirement IDs and a passing test run (see How IBM Bob was used). |
 
 ---
 
 ## Problem statement

</patch>
```

### assistant · 9/29/2026, 21:23:57

Now commit and update outbox:

### tool · tool `execute_command` · 9/29/2026, 21:23:57

```json
{
  "command": "cd c:\\dev\\bobathon-nyc-2026; git add README.md; git commit -m \"docs: README claim accuracy (BOB-025b)\""
}
```

```text
[main b63d024] docs: README claim accuracy (BOB-025b)
 1 file changed, 4 insertions(+), 4 deletions(-)

Stderr:
warning: in the working copy of 'README.md', LF will be replaced by CRLF the next time Git touches it
```

### assistant · 9/29/2026, 21:23:57

### tool · tool `read_file` · 9/29/2026, 21:23:57

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

### assistant · 9/29/2026, 21:23:57

### tool · tool `execute_command` · 9/29/2026, 21:23:57

```json
{
  "command": "cd c:\\dev\\bobathon-nyc-2026; $time = (Get-Date).ToString(\"HH:mm\"); Add-Content -Path comms/outbox.md -Value \"TASK BOB-025b | done | 4 README claim fixes: Innovation row wording, Technical row commit→task language, video ZIP path corrected to top-level, bob_sessions row expanded with full description | b63d024\""
}
```

```text
Command completed with no output.
```

### assistant · 9/29/2026, 21:23:57

### tool · tool `execute_command` · 9/29/2026, 21:23:57

```json
{
  "command": "cd c:\\dev\\bobathon-nyc-2026; git add comms/outbox.md; git commit -m \"comms: outbox BOB-025b\""
}
```

```text
[main c1d7ecd] comms: outbox BOB-025b
 1 file changed, 1 insertion(+)

Stderr:
warning: in the working copy of 'comms/outbox.md', LF will be replaced by CRLF the next time Git touches it
```

### assistant · 9/29/2026, 21:23:57

Done. Four fixes applied to [`README.md`](README.md):

1. **Innovation row** — "no free…" → "we did not find a free…"
2. **Technical row** — "Every commit links to a requirement ID and a passing test suite" → "Every Bob task links to requirement IDs and a passing test run (see How IBM Bob was used)"
3. **Video row** — path corrected to `Guild.zip → CalmSkies-TeamGuild-demo.mp4` (top level)
4. **bob_sessions row** — expanded to "14 IBM Bob sessions (Marcelo Lorenzetti's Bob tasks during the event), exported verbatim from Bob's local task database"

Committed as `b63d024`, outbox updated in `c1d7ecd`.

