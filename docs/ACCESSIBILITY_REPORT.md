# Accessibility Report — Calm Skies Journey Builder

Version 1.0 · BOB-010 · 2025-09-30

This report documents what was checked, how it was checked, and what was not checked.
It does not claim full conformance. WCAG 2.2 is a complex standard; this report is honest about its scope.

---

## 1 · Automated checks (axe-core + jsdom, `npm test`)

**Tool:** axe-core 4.x, run in Node.js via jsdom  
**Rules checked:** `label`, `heading-order`, `image-alt`, `aria-required-attr`, `aria-valid-attr`  
**Scope:** the HTML shell (`index.html`) and the fully-rendered demo output (story, journey, kit, checklist, resources)  
**Result:** 0 violations (100 tests pass, including 2 focus-management tests added in BOB-010)

| Criterion | Rule(s) | Result |
|-----------|---------|--------|
| A1 · Form controls have labels | `label` | ✅ Automated pass |
| A2 · Heading hierarchy h1→h2→h3, no skips | `heading-order` | ✅ Automated pass |
| A8 · Images / symbols have alt text or aria-label | `image-alt` | ✅ Automated pass |
| ARIA attributes valid | `aria-required-attr`, `aria-valid-attr` | ✅ Automated pass |
| Focus lands on outputs heading after submit | custom assertion | ✅ Automated pass |
| Focus is not on `<body>` after last journey step | custom assertion | ✅ Automated pass |

**What jsdom cannot check:**  
Colour contrast, visible focus rings, real keyboard behaviour, screen-reader announcements,
`prefers-reduced-motion` CSS effects, print stylesheet, and visual rendering. Those items are listed in sections 2 and 3.

---

## 2 · Real-browser checks (Chromium, done outside Bob at commit ff7b557 and after fix BOB-010)

**Browser:** Chromium (desktop)  
**Tools:** axe DevTools browser extension, Chrome DevTools Colour Picker, manual keyboard walkthrough

| Criterion | How checked | Result |
|-----------|-------------|--------|
| A3 · Colour contrast ≥ 4.5:1 (text) / ≥ 3:1 (large) | Chrome DevTools Colour Picker on 14 colour pairs | ✅ Manually verified — minimum ratio observed: 5.99:1 |
| A4 · Visible focus indicator | Keyboard Tab through every interactive element | ✅ Manually verified — focus ring ≥ 2.4 px |
| A5 · Journey navigator keyboard-operable | Tab to Prev/Next, Enter/Space to activate | ✅ Manually verified |
| A6 · `prefers-reduced-motion` honoured | DevTools → Rendering → Emulate prefers-reduced-motion | ✅ Manually verified — transitions suppressed |
| A7 · Plain language, child copy ≤ Grade 6 | axe best-practice scan; manual read of story text | ✅ Manually verified |
| axe WCAG 2.0–2.2 A/AA full scan | axe DevTools on rendered demo | ✅ 0 violations |
| aria-live polite on journey step region | axe scan + manual check of DOM | ✅ Manually verified |
| Print stylesheet hides form | Chrome → Print Preview | ✅ Manually verified |

**Focus-loss defects found in this real-browser review (now fixed):**

1. **After "Build My Journey":** focus fell to `<body>` instead of the output section.  
   Fix: `renderAll()` now calls `heading.setAttribute('tabindex', '-1'); heading.focus()` on the first `<h2>` inside `#outputs`.  
   Status: **Implemented · Automated pass** (see test: *focus: after submit, activeElement is the first h2 in #outputs*)

2. **Last Airport Journey step:** clicking Next on step 10 of 10 set `disabled` on the focused button, dropping focus to `<body>`.  
   Fix: `wireJourneyNav()` now uses `aria-disabled="true"` + `tabindex="-1"` instead of `disabled`; focus is moved to "← Previous" when Next becomes disabled.  
   Status: **Implemented · Automated pass** (see test: *focus: after reaching last journey step, activeElement is not body*)

---

## 3 · Pending / not done

The following have not been checked and are not claimed as met.

| Item | Status |
|------|--------|
| Screen-reader testing with NVDA (Windows) | Pending |
| Screen-reader testing with VoiceOver (macOS/iOS) | Pending |
| 200% browser zoom — text reflow and no horizontal scroll | Pending |
| 320 px viewport reflow (WCAG 1.4.10 Reflow) | Pending |
| Testing with autistic users and their caregivers | Pending |
| Cognitive-load review by an accessibility specialist | Pending |
| Automated Flesch-Kincaid reading level measurement on story text | Pending |
| Mobile device (touch) usability | Pending |

---

## 4 · Design rationale

Calm Skies Journey Builder was designed with the following principles. These are design intentions, not clinical recommendations.

**Predictability.** Each section follows the same structure (heading → short prose → list or navigator). The journey uses the same 10-step sequence every time so a child can learn to expect it. Changes between uses are minimal unless the caregiver changes inputs.

**Reduced sensory load.** The colour palette uses low-saturation tones. No animations run unless explicitly triggered, and all transitions are disabled when `prefers-reduced-motion: reduce` is set. Emoji symbols are used sparingly as visual anchors, not as the sole carriers of meaning.

**Plain language.** Child-facing copy targets a Grade 6 reading level or below. Sentences are short and direct. Instructions avoid negatives ("do not…") where possible. Some autistic children respond better to concrete, literal descriptions; the story text avoids idioms and metaphors.

**Caregiver control.** The parent and caregiver are presented with a separate checklist and a Notes section. All generated content is presented as suggestion and starting point, not prescription. The disclaimer on the Calm Kit ("Suggestions only — not medical advice.") is permanent and cannot be hidden.

**Individual needs vary.** This report and the app use "some autistic children may…" rather than universal claims because sensory profiles, communication styles, and support needs differ greatly between individuals. No two children are the same, and no app can account for every preference.

---

*Checked by: IBM Bob (automated) and Marcelo (real-browser walkthrough). No screen-reader testing has been conducted.*
