# Calm Skies Journey Builder — Demo Script

Team Guild · IBM Champions Bobathon NYC 2026

> **3-minute version** is the primary cut. Stretch notes at the end extend it to 5 minutes.
> Film the 3-minute version first; all 5-minute additions are additive.

---

## 3-Minute Version

### 0:00 — The problem (25 seconds)

*Narrate:*

> "Maria is preparing her 8-year-old son Sam for his first flight — New York JFK to Orlando. Sam is sensitive to noise and crowds and needs to know what's coming before it happens. There's no free, private, offline-capable preparation tool adapted to him. So Maria opens Calm Skies Journey Builder."

---

### 0:25 — One journey for "Sam" (55 seconds)

Fill in the demo scenario live:

- **Child's name:** Sam  
- **Age:** 8–10  
- **First flight:** Yes ✓  
- **Traveling from:** JFK  
- **Traveling to:** MCO  
- **Sensitivities:** Noise ✓ · Crowds ✓  
- **Communication:** Pictures  
- **Comfort item:** blue blanket  
- **Visiting:** Grandma  

Click **Build My Journey**.

> "All five sections appear instantly — no network call, no account."

Point to:
- **My Flight Story** — read the first sentence with Sam's name; show the "blue blanket" boarding line; show the "Grandma" arrival line.
- **My Airport Journey** — navigate 2–3 steps with keyboard only (Tab → Next → Enter). Show the crowd-sensitivity tip adapting.
- **My Calm Kit** — point to the "blue blanket" personalized item label.
- **Accessibility Resources** — each link labelled with its source organisation.

---

### 1:20 — Bob across the SDLC (60 seconds)

> "Every line of this was written by IBM Bob. Here's the SDLC chain."

**Step 1 — Requirement**  
Open `docs/REQUIREMENTS.md`. Point to R8 (comfort item) and R9 (visiting).  
> "A.J. Aronoff on our team supplied these requirements. Bob turned them into acceptance criteria."

**Step 2 — Code**  
Open `src/journey/story.js`.  
> "Bob wrote the logic. The boarding line and arrival line are conditional on the fields being filled."

**Step 3 — Review finding → Bob fix**  
> "A security probe outside Bob found an encoded path traversal: %2e%2e%2f could bypass the web root check."

Open `scripts/serve.js`.  
> "Bob fixed it: decode-then-validate. Commit ae070d5."

**Step 4 — `npm test`**  
Run in terminal:  
```
npm test
```
> "The full test suite passes — 0 failures. Including 8 traversal regression cases. Bob wrote them."

---

### 2:20 — Why it matters to a travel provider (25 seconds)

> "An airline or airport could adopt this as a white-labelled preparation experience. Drop the static files on any CDN — no server runtime needed. Override two CSS variables to rebrand. Update journey steps in src/journey/ and run npm test — every change is traceable: requirement → commit → test. And because nothing is stored server-side, the compliance burden is low."

Open browser Print Preview briefly:  
> "A family prints this the night before. No internet at the gate. Nothing stored."

---

### 2:45 — Close (15 seconds)

> "Can IBM Bob deliver an accessible, tested, secure and maintainable customer experience through a disciplined SDLC, from zero, in one event day? This is the answer."

---

## Stretch notes — extend to 5 minutes

Add these sections after 2:20 (travel provider section) to reach ~5 minutes:

### +1:00 — Architecture deep-dive (~3:20–4:10)

Open `docs/ARCHITECTURE.md`.

> "Bob started with architecture — file layout, data-flow diagram, two alternatives rejected with reasons. React rejected: adds a build step and hundreds of packages for a form-to-output tool. Backend rejected: directly violates the responsible-engineering rule — keep data in the browser session."

Show the data-flow ASCII diagram.

> "Every journey module is a pure function: same input, same output, no I/O, no DOM. That's why the full test suite runs in Node without a browser."

### +0:50 — Content accuracy story (~4:10–5:00)

Open `tests/wording.test.js`.

> "A content review outside Bob found 8 defects — wrong shoe-removal instruction at security, guarantee language like 'will help a lot', British spellings. Bob fixed the copy and wrote wording tests to prevent regression. These 13 tests now guard every output on every run."

Show one test assertion (e.g. `'will help a lot'` banned).

> "That's the SDLC in action: human review found the problem, Bob fixed it and locked it with a test."

---

*Script produced by IBM Bob as part of BOB-FINAL docs sync. Commit: this commit.*
