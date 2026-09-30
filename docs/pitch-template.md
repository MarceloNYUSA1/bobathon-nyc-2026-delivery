# Pitch — Calm Skies Journey Builder

IBM Champions Bobathon NYC 2026 · Team Guild  
Judging criteria: Innovation & Creativity 35 · Impact & Practicality 35 · Technical Implementation 30

---

## Central question

> **Can IBM Bob turn a meaningful accessibility requirement into an accessible, tested, secure and maintainable customer experience through a disciplined SDLC?**

Calm Skies Journey Builder is the answer. It solves a real problem for autistic children and their families. And it demonstrates that IBM Bob can be trusted as an engineering partner across every phase of the SDLC — not just code generation.

---

## The problem (Impact & Practicality)

Air travel is one of the most stressful experiences for autistic children. The environment is loud, unpredictable, crowded and full of transitions. Families arrive without a preparation tool that is:

- **Private** — no account, no server, no data stored
- **Offline-capable** — works after page load, printable
- **Personalized** — adapts to the child's specific sensitivities, age and communication preference
- **Honest** — no medical advice, no guarantees, no false promises about what airports will offer

We did not find an existing free tool that meets all four criteria.

---

## The solution (Impact & Practicality)

Calm Skies Journey Builder is a static web application. A caregiver fills in up to 7 fields; one click produces five outputs:

| Output | What it does |
|--------|-------------|
| My Flight Story | First-person narrative, sensitivity-adapted |
| My Airport Journey | 10-step navigator, keyboard-operable |
| My Calm Kit | Packing checklist with medical-advice disclaimer |
| Parent Checklist | Before-departure and per-stage items |
| Accessibility Resources | Sourced links to TSA Cares, Hidden Disabilities Sunflower, DOT rights, Social Stories, Wings for Autism |

The page prints. Nothing is stored. Closing the tab clears all data.

**Demo scenario:** "Sam", age 8–10, first flight JFK → MCO, sensitive to noise and crowds, communication preference: pictures.

---

## IBM Bob's SDLC role (Technical Implementation)

Bob was the primary implementation tool across the full development lifecycle, not just code generation:

| Phase | Bob's contribution |
|-------|--------------------|
| Requirements | 37 requirement IDs with testable acceptance criteria |
| Architecture | File layout, data-flow, two alternatives rejected with reasoning |
| Implementation | All application code: HTML, CSS, JS, pure journey functions |
| Testing | 74 unit, integration, accessibility and security tests |
| Security review | XSS vector found in review outside Bob; Bob fixed it — escapeHtml + NF6 test (commit d5367cc); serve.js network exposure found in review outside Bob; Bob fixed it — localhost-only, strict public-file allow-list, decode-before-validate path handling, XSS escaping, regression tests for encoded and double-encoded traversal (commit ae070d5) |
| Content review | 8 factual/wording defects + encoded path traversal found in review outside Bob; Bob fixed copy and added wording tests (commits b6799f2, 2d4365b) |
| Accessibility review | Automated axe-core scan; 2 keyboard focus losses found in review outside Bob; fix planned (BOB-010) |
| Documentation | Requirements, architecture, plan, pitch, evidence log |
| Privacy/security review (planned) | Privacy and security review — BOB-017 |
| Deployment (planned) | DEPLOYMENT.md — BOB-018 |

**Evidence trail:** `evidence/BOBATHON_EVIDENCE.md` — every task links requirement → Bob activity → files → test result → commit.

---

## Innovation & Creativity

Three things make this submission distinctive:

1. **Bob as disciplined engineer, not prompt-and-paste.** Bob wrote the architecture document, rejected two alternatives with reasons, identified its own security defects after review, and maintained an evidence log. This is Bob across the SDLC.

2. **Governance by design.** Content is separated from logic (`src/journey/` vs `app/`). Every change requires a passing test suite. Requirement IDs trace to commits. A travel provider could onboard a content team without touching rendering code.

3. **Responsible-engineering-first.** The wording rules are enforced by tests: `tests/wording.test.js` scans every output for banned guarantee phrases, factual errors and wrong spellings. Accessibility is not a checkbox — it is part of the test suite and the evidence log.

---

## Enterprise adoption story (not built)

A travel provider — airline, airport, accessibility-focused travel app — could adopt Calm Skies by:

- Dropping the static files on any CDN (no server runtime)
- Overriding two CSS variables to rebrand
- Updating `src/journey/` content and running `npm test`

The design keeps compliance burden low: no personal data at rest, no authentication, no backend, no third-party scripts. These are adoption ideas, not built features.

---

## Scoring against criteria

| Criterion | Score | Claim |
|-----------|-------|-------|
| Innovation & Creativity (35) | — | Bob as full SDLC partner; governance-by-test; wording tests for responsible engineering |
| Impact & Practicality (35) | — | Real family use case; printable; privacy-safe; adoption path for travel providers |
| Technical Implementation (30) | — | 74 tests passing; axe-core a11y scan; XSS protection; localhost-only server; strict public-file allow-list; decode-before-validate path handling; pure functions; evidence log |

> Note: scores are for judges to assign. No self-scoring claim is made here.
