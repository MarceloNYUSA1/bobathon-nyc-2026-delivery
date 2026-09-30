# Calm Skies Journey Builder — Requirements

Version 1.2 · BOB-001B (enterprise SDLC reframe)

> **Central question:** Can IBM Bob deliver an accessible, governed, tested, secure and maintainable customer experience — starting from zero — through a disciplined SDLC?
> This document distinguishes four concerns: (a) the human use case, (b) enterprise adoption, (c) Bob's SDLC role, (d) Bobathon submission gates.

---

## Functional Requirements

### Inputs

| ID | Requirement | Acceptance Criteria |
|----|-------------|---------------------|
| R1 | The app shall accept a child's first name or nickname (required). | Field is present, labelled, and a non-empty value is required before generation. |
| R2 | The app shall accept an age range (optional): "Under 5 / 5–7 / 8–10 / 11–13 / 14+". | Dropdown or radio present; no value pre-selected. |
| R3 | The app shall accept a "first flight?" yes/no toggle (optional, default no). | Control present; yes adds first-flight-specific copy to outputs. |
| R4 | The app shall accept departure and destination as free text (optional). | Two text fields present; values used in Story and Journey headings. |
| R5 | The app shall accept up to four sensitivity checkboxes: noise · crowds · transitions · waiting. | Each sensitivity alters at least one line of the Flight Story output. |
| R6 | The app shall accept a communication preference (spoken / pictures / written). | Selection changes cue style in the Airport Journey steps. |
| R7 | The app shall accept one free-text concern (optional, max 200 chars). | Concern echoed in the Parent Checklist "Notes" section. |
| R8 | The app shall accept a comfort item to bring (optional, max 60 chars, e.g. "blue blanket"). | Field present, labelled, and when filled adds a personalized line near boarding in the Flight Story and uses the item name in the Calm Kit. Source: A.J. Aronoff (team requirement). |
| R9 | The app shall accept who the child is visiting (optional, max 60 chars, e.g. "Grandma"). | Field present, labelled, and when filled adds a personalized line near the end of the Flight Story. Source: A.J. Aronoff (team requirement). |
| R14 | The app shall accept a calm strategy (optional, max 80 chars, e.g. "take slow breaths and squeeze my fidget"). | Field present, labelled; when filled adds "If I feel worried, I can <strategy>." near the security/boarding steps in the Flight Story; omitted when empty. Source: A.J. Aronoff (team requirement). |
| R15 | The app shall accept one exciting detail about the trip (optional, max 80 chars, e.g. "swimming in the pool"). | Field present, labelled; when filled adds "I am excited about <detail>." before the story's ending paragraph; omitted when empty. Source: A.J. Aronoff (team requirement). |
| R16 | Three additional Calm Kit items shall always be included: chewable jewelry, printed Flight Story, and assistance ID card. | All three items present in kit output regardless of sensitivities. Source: A.J. Aronoff (team requirement). |
| R17 | The Parent Checklist shall include a sub-section "If it gets hard" with a non-clinical disclaimer note and four practical tips. | Sub-section present; note reads "Ideas from families' experience — not medical advice. Every child is different."; four items present. Source: A.J. Aronoff (team requirement). |

### Output 1 — My Flight Story

| ID | Requirement | Acceptance Criteria |
|----|-------------|---------------------|
| R10 | The Story shall be a short, first-person narrative covering: leaving home → airport → check-in → security → gate → boarding → flight → landing → arrival. | At least 9 narrative steps present in output. |
| R11 | Each active sensitivity shall add at least one adaptive sentence. | Unit test: for noise=true, output contains the phrase "headphones" or "quiet". |
| R12 | The child's name shall appear in at least the first sentence. | Unit test: name present in first paragraph of story. |
| R13 | First-flight flag shall insert a reassurance sentence. | Unit test: first-flight=true → output contains "first time" or "first flight". |

### Output 2 — My Airport Journey

| ID | Requirement | Acceptance Criteria |
|----|-------------|---------------------|
| R20 | The Journey shall display 10 steps in sequence: Home · Airport Arrival · Check-in · Security · Gate · Boarding · Flight · Landing · Baggage Claim · Exit. | All 10 step labels rendered. |
| R21 | Steps shall be navigated one at a time with Previous / Next controls. | Keyboard-only navigation works (Tab to button, Enter/Space to activate). |
| R22 | Each step shall display a label, a simple description, and a relevant tip adapted to the active sensitivities. | Step object has `label`, `description`, `tip` properties; tip non-empty for each active sensitivity. |
| R23 | Communication-preference "pictures" shall display a Unicode symbol placeholder per step. | When preference=pictures, each step shows a symbol character. |

### Output 3 — My Calm Kit

| ID | Requirement | Acceptance Criteria |
|----|-------------|---------------------|
| R30 | The Kit shall list at least 8 item categories built from preferences. | Unit test: default preferences → ≥ 8 items. |
| R31 | Each item shall carry a checkable checkbox. | Each item renders as `<li>` with an `<input type="checkbox">`. |
| R32 | The Kit header shall display the disclaimer: "Suggestions only — not medical advice." | Static text present in rendered output. |
| R33 | Sensitivities shall add specific items (e.g. noise → noise-cancelling headphones). | Unit test: noise=true → kit contains "headphones". |

### Output 4 — Parent Checklist

| ID | Requirement | Acceptance Criteria |
|----|-------------|---------------------|
| R40 | The Checklist shall have two sections: "Before Leaving Home" (≥ 6 items) and "At Each Stage" (≥ 5 items). | Both sections present with item counts satisfied. |
| R41 | Each item shall be checkable. | Same pattern as R31. |
| R42 | If a free-text concern was entered, it shall appear in a "Notes" sub-section. | Unit test: concern text present in checklist output when provided. |

### Output 5 — Accessibility Resources

| ID | Requirement | Acceptance Criteria |
|----|-------------|---------------------|
| R50 | The app shall display at least 5 external resources: Hidden Disabilities Sunflower, TSA Cares, airline accessibility, airport accessibility, and Social Stories. | All 5 resources rendered with a visible link and source attribution. |
| R51 | Resources shall be visually distinct from generated content (separate section, different background). | Resources section uses a visually distinguishable container. |
| R52 | Every resource link shall open in a new tab with `rel="noopener noreferrer"`. | DOM attribute check passes. |

### General Functional

| ID | Requirement | Acceptance Criteria |
|----|-------------|---------------------|
| R60 | All 5 outputs shall be generated in one click after the form is complete. | Clicking "Build My Journey" renders all sections on the same page. |
| R61 | The app shall support browser print / save as PDF for offline use. | A `@media print` stylesheet hides the form and shows only outputs. |
| R62 | Outputs shall update if the user changes inputs and clicks "Build My Journey" again. | Re-running generation replaces previous output without a page reload. |

---

## Non-Functional Requirements

| ID | Requirement | Acceptance Criteria |
|----|-------------|---------------------|
| NF1 | No server calls or persistent storage. All state lives in the browser session only. | Network tab shows zero XHR/fetch requests during generation; no localStorage writes. |
| NF2 | No user accounts, no tracking, no analytics. | No cookies set; no third-party scripts loaded. |
| NF3 | Page load time < 3 s on a standard connection. | Lighthouse performance score ≥ 80. |
| NF4 | The app shall run as a single static HTML file deployable to any static host (GitHub Pages). | `index.html` + asset files only; no server-side runtime required. |
| NF5 | All journey logic shall live in pure JavaScript ES module functions with no DOM dependency. | Functions importable in Node.js test environment without a browser. |
| NF6 | All user-supplied text (name, departure, destination, concern) shall be escaped before insertion into HTML. | Unit test: input `<img src=x onerror=alert(1)>` renders as visible text, not as an HTML element. |

---

## Accessibility Requirements

| ID | Requirement | Acceptance Criteria |
|----|-------------|---------------------|
| A1 | All form controls shall have visible, programmatically associated labels. | axe-core scan returns zero "label" violations. |
| A2 | Heading hierarchy shall be logical (h1 → h2 → h3, no skips). | axe-core scan returns zero heading-order violations. |
| A3 | Colour contrast shall meet WCAG 2.2 AA (≥ 4.5:1 text, ≥ 3:1 large text). | Checked in a real browser using Chrome DevTools and axe DevTools; result recorded in `docs/ACCESSIBILITY_REPORT.md`. Not testable via jsdom. |
| A4 | All interactive elements shall have a visible focus indicator. | Checked manually in a real browser; result recorded in `docs/ACCESSIBILITY_REPORT.md`. Not detectable by jsdom. |
| A5 | The Journey step navigator shall be operable by keyboard alone. | Tab → buttons → Enter/Space advances/retreats steps. |
| A6 | The app shall respect `prefers-reduced-motion`; no essential information conveyed by motion. | CSS uses `@media (prefers-reduced-motion: reduce)` to suppress transitions. |
| A7 | Language shall be plain and direct; reading level ≤ Grade 6 for child-facing copy. | Flesch-Kincaid check on Story text. |
| A8 | All images and symbol placeholders shall have descriptive `alt` text or `aria-label`. | axe-core scan returns zero image-alt violations. |

---

## Responsible Engineering (Non-Negotiable)

| ID | Requirement | Acceptance Criteria |
|----|-------------|---------------------|
| RE1 | The app shall not provide diagnosis, treatment, or medical advice. | No medical claims in any generated text; disclaimer present on Calm Kit. |
| RE2 | The app shall not make guarantees about airline, airport, or TSA procedures. | No guarantee language; resource links disclaim they are external sources. |
| RE3 | Only the minimum data required to generate the journey is collected. | Only 7 input fields; no email, location, or biometric data. |
| RE4 | External resource links shall be clearly labelled with their source name and marked as external. | Each link shows the organisation name and "↗" or "opens in new tab" text. |
| RE5 | All demo data shall be synthetic. | No real child's name or real trip data in committed files. |

---

## Enterprise Adoption Requirements

These requirements describe what a travel provider (airline, airport, travel app) would need for adoption. Items marked **planned** are not yet built; they are documented here so the architecture supports them.

| ID | Requirement | Acceptance Criteria | Status |
|----|-------------|---------------------|--------|
| EA1 | Content separated from rendering logic so a provider can update journey steps and resources without touching `app/` or test code. | `src/journey/` modules contain only data + logic; zero DOM imports. | Done (P0) |
| EA2 | Every content or logic change is traceable: requirement ID → commit → passing test. | Git log links each commit to a task ID; no commit without a green test suite. | Done (P0) |
| EA3 | An accessibility statement is available documenting what was checked, how, and what was not checked. | `docs/ACCESSIBILITY_REPORT.md` exists and states tool, result and scope limits for each criterion. | Planned (BOB-010) |
| EA4 | A privacy notice text is available for embedding: what data is collected, where it is stored, how it is cleared. | Privacy notice text in `docs/RESPONSIBLE_ENGINEERING.md`. | Planned (BOB-017) |
| EA5 | A deployment guide exists so a provider can host the app on GitHub Pages or any CDN. | `DEPLOYMENT.md` covers step-by-step instructions and notes on ES module serving. | Planned (BOB-018) |
| EA6 | The app can be visually rebranded by overriding CSS custom properties only. | All colours and fonts defined as CSS variables in `app/app.css`; no hard-coded values in logic modules. | Done (P0) |

> These are requirements for adoption readiness, not production infrastructure. No backend, authentication, database or AI runtime is added.

---

## Bobathon Submission Requirements (Hard Release Gates)

These are fixed by the event rules. They do not change.

- ZIP named exactly as the registered team name
- Contains `bob_sessions/` (all members' exported Bob sessions)
- Contains `code_files/`
- Contains `README.md` with exactly these four headings: Problem statement · Detailed solution · Assumptions / approach · How Bob was used
- Contains the demo video (≤ 5 minutes, unconfirmed limit)
- Submitted by Wednesday 30 Sep 12:00 PM ET (3:00 PM ET hard deadline)

---

## Out of Scope

- User accounts, login, or profile persistence across sessions.
- Server-side rendering, databases, or any backend service.
- Real-time flight information, airline APIs, or booking integration.
- Multi-language support (English only for this submission).
- Native mobile app; responsive web is sufficient.
- Diagnosis, clinical assessment, or therapeutic recommendations.
- Personalization beyond the 7 input fields listed.
- Guaranteed accuracy of external resource links (links are provided as-is with source attribution).
