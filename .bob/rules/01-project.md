# Project rules (IBM Champions Bobathon NYC 2026 · team Guild · Calm Skies Travel)

- Project: **Calm Skies Journey Builder**, a new build from zero. It helps a caregiver prepare an autistic child for air
  travel: a few trip and preference inputs → My Flight Story, My Airport Journey, My Calm Kit, Parent Checklist and
  sourced accessibility resources. Calm Skies is the use case; the visible story is Bob across the SDLC.
- Timeline: **submission deadline Wed 30 Sep 3:00 PM ET**; we submit by Wed 12:00. Tue: build, test, docs. Wed morning:
  video, ZIP, submit.
- Official criteria: Innovation & Creativity 35 · Impact & Practicality 35 · Technical Implementation 30.
- Submission (portal): ONE ZIP named exactly as the registered team, containing `bob_sessions/` (exported Bob sessions of
  every member, used to judge Bob usage), `code_files/`, `README.md` (Problem statement · Detailed solution ·
  Assumptions / approach · How Bob was used) and the demo video. README must keep those 4 headings.
- The plan is `docs/plan.md`. Read it first and stay inside its scope.
- Responsible engineering (non-negotiable): no diagnosis, treatment or medical advice; no guarantees about airlines,
  airports or security; collect only what the journey needs, keep it in the browser session (no server storage, no
  accounts, no tracking); external resources are labelled and linked to their source, separate from generated guidance.
- Accessibility is part of "done": semantic HTML, labels, keyboard use, visible focus, heading order, contrast,
  reduced motion, plain language. Target WCAG 2.2 AA where achievable; never claim compliance that wasn't checked.
- Only synthetic data (demo: a fictional 9-year-old, first flight New York → Orlando). Never commit secrets.
- Stack: static web app (HTML, CSS, plain JavaScript ES modules, no framework, no backend). Journey logic in pure,
  tested functions (`node:test`); the DOM layer stays thin. As few dependencies as possible. Windows: use `node`.
- After each task: run the tests, commit, report (rule 02). Add a row to "How IBM Bob was used" in README.md.
- Keep replies short (up to 6 lines). Decide routine details yourself. Escalate only scope, architecture or criteria
  changes as `NEEDS_DECISION`. At most 3 attempts on the same defect.
- Done = implemented + tested + committed + working in the demo path.
