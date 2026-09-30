// app/render.js — DOM render helpers
// Rule: user-supplied text MUST go through escapeHtml() before any innerHTML use.
// Prefer el.textContent for single-value text nodes.

/**
 * Escape user-supplied text so it is safe to insert via innerHTML.
 * Exported so tests can verify XSS protection (NF6).
 * @param {string} str
 * @returns {string}
 */
export function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ── Output 1: My Flight Story ───────────────────────────────────────────────

/**
 * @param {string} story  Plain-text output from buildStory()
 * @returns {string}      HTML string safe for innerHTML (user values escaped)
 */
function renderStory(story) {
  const paragraphs = story
    .split('\n\n')
    .filter(p => p.trim().length > 0)
    .map(p => `<p>${escapeHtml(p.trim())}</p>`)
    .join('\n');
  return `
    <section id="section-story" aria-labelledby="story-heading">
      <h2 id="story-heading">✈ My Flight Story</h2>
      ${paragraphs}
    </section>`;
}

// ── Output 2: My Airport Journey ────────────────────────────────────────────

/**
 * @param {import('../src/journey/journey.js').Step[]} steps
 * @returns {string} HTML string
 */
function renderJourney(steps) {
  const total = steps.length;
  // Build all step HTML; only the first is visible initially (toggled by JS)
  const stepsHtml = steps.map((step, i) => {
    const symbolHtml = step.symbol
      ? `<span class="step-symbol" aria-hidden="true">${escapeHtml(step.symbol)}</span> `
      : '';
    return `
      <div class="journey-step" id="journey-step-${i}" ${i === 0 ? '' : 'hidden'} role="region" aria-labelledby="step-label-${i}">
        <div class="step-header">
          ${symbolHtml}<strong id="step-label-${i}">${escapeHtml(step.label)}</strong>
          <span class="step-counter">Step ${i + 1} of ${total}</span>
        </div>
        <p>${escapeHtml(step.description)}</p>
        <p class="step-tip"><strong>Tip:</strong> ${escapeHtml(step.tip)}</p>
      </div>`;
  }).join('\n');

  return `
    <section id="section-journey" aria-labelledby="journey-heading">
      <h2 id="journey-heading">🗺 My Airport Journey</h2>
      <div id="journey-steps" aria-live="polite">
        ${stepsHtml}
      </div>
      <nav class="journey-nav" aria-label="Journey step navigation">
        <button class="btn-nav" id="journey-prev" aria-label="Previous step" disabled>← Previous</button>
        <button class="btn-nav" id="journey-next" aria-label="Next step">Next →</button>
      </nav>
    </section>`;
}

/**
 * Wire up the Journey step navigator after DOM insertion.
 * @param {number} totalSteps
 */
export function wireJourneyNav(totalSteps) {
  let current = 0;

  const prevBtn = document.getElementById('journey-prev');
  const nextBtn = document.getElementById('journey-next');

  function setAriaDisabled(btn, disabled) {
    if (disabled) {
      btn.setAttribute('aria-disabled', 'true');
      btn.setAttribute('tabindex', '-1');
    } else {
      btn.removeAttribute('aria-disabled');
      btn.removeAttribute('tabindex');
    }
  }

  function showStep(idx) {
    for (let i = 0; i < totalSteps; i++) {
      const el = document.getElementById(`journey-step-${i}`);
      if (!el) continue;
      if (i === idx) {
        el.removeAttribute('hidden');
      } else {
        el.setAttribute('hidden', '');
      }
    }
    const atFirst = idx === 0;
    const atLast  = idx === totalSteps - 1;
    // Use aria-disabled so buttons remain focusable but are announced as disabled.
    // Move focus to the other button if the currently-focused one becomes disabled.
    const focusedBtn = document.activeElement;
    setAriaDisabled(prevBtn, atFirst);
    setAriaDisabled(nextBtn, atLast);
    if (atLast && focusedBtn === nextBtn) prevBtn.focus();
    if (atFirst && focusedBtn === prevBtn) nextBtn.focus();
    current = idx;
  }

  prevBtn.addEventListener('click', () => {
    if (prevBtn.getAttribute('aria-disabled') === 'true') return;
    if (current > 0) showStep(current - 1);
  });
  nextBtn.addEventListener('click', () => {
    if (nextBtn.getAttribute('aria-disabled') === 'true') return;
    if (current < totalSteps - 1) showStep(current + 1);
  });

  // Initialise first step state
  setAriaDisabled(prevBtn, true);
  setAriaDisabled(nextBtn, totalSteps <= 1);
}

// ── Output 3: My Calm Kit ───────────────────────────────────────────────────

/**
 * @param {{ items: Array<{id:string, label:string}>, disclaimer: string }} kit
 * @returns {string} HTML string
 */
function renderCalmKit(kit) {
  const itemsHtml = kit.items.map((item, i) => `
    <li>
      <label>
        <input type="checkbox" id="kit-${escapeHtml(item.id)}" name="kit-item">
        ${escapeHtml(item.label)}
      </label>
    </li>`).join('\n');

  return `
    <section id="section-kit" aria-labelledby="kit-heading">
      <h2 id="kit-heading">🎒 My Calm Kit</h2>
      <p class="disclaimer" role="note">${escapeHtml(kit.disclaimer)}</p>
      <ul class="checklist">
        ${itemsHtml}
      </ul>
    </section>`;
}

// ── Output 4: Parent Checklist ──────────────────────────────────────────────

/**
 * @param {{ beforeHome: Array<{id:string,label:string}>, perStage: Array<{id:string,label:string}>, ifItGetsHard: {note:string, items: Array<{id:string,label:string}>}, notes: string }} checklist
 * @returns {string} HTML string
 */
function renderParentChecklist(checklist) {
  const beforeHtml = checklist.beforeHome.map(item => `
    <li>
      <label>
        <input type="checkbox" id="before-${escapeHtml(item.id)}" name="before-item">
        ${escapeHtml(item.label)}
      </label>
    </li>`).join('\n');

  const stageHtml = checklist.perStage.map(item => `
    <li>
      <label>
        <input type="checkbox" id="stage-${escapeHtml(item.id)}" name="stage-item">
        ${escapeHtml(item.label)}
      </label>
    </li>`).join('\n');

  let hardHtml = '';
  if (checklist.ifItGetsHard) {
    const hardItemsHtml = checklist.ifItGetsHard.items.map(item => `
    <li>
      <label>
        <input type="checkbox" id="hard-${escapeHtml(item.id)}" name="hard-item">
        ${escapeHtml(item.label)}
      </label>
    </li>`).join('\n');
    hardHtml = `
      <h3>If it gets hard</h3>
      <p class="checklist-note" role="note">${escapeHtml(checklist.ifItGetsHard.note)}</p>
      <ul class="checklist">
        ${hardItemsHtml}
      </ul>`;
  }

  const notesHtml = checklist.notes
    ? `<h3>Notes</h3><p class="checklist-notes">${escapeHtml(checklist.notes)}</p>`
    : '';

  return `
    <section id="section-checklist" aria-labelledby="checklist-heading">
      <h2 id="checklist-heading">📋 Parent Checklist</h2>
      <h3>Before Leaving Home</h3>
      <ul class="checklist">
        ${beforeHtml}
      </ul>
      <h3>At Each Stage</h3>
      <ul class="checklist">
        ${stageHtml}
      </ul>
      ${hardHtml}
      ${notesHtml}
    </section>`;
}

// ── Output 5: Accessibility Resources ──────────────────────────────────────

/**
 * @param {import('../src/journey/resources.js').Resource[]} resources
 * @returns {string} HTML string
 */
function renderResources(resources) {
  const itemsHtml = resources.map(r => {
    const nameHtml = r.url
      ? `<a href="${escapeHtml(r.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(r.name)} <span aria-label="opens in new tab">↗</span></a>`
      : `<span>${escapeHtml(r.name)}</span>`;
    return `
    <div class="resource-item">
      ${nameHtml}
      <p>${escapeHtml(r.description)}</p>
      <p class="resource-source">Source: ${escapeHtml(r.source)}</p>
    </div>`;
  }).join('\n');

  return `
    <section id="section-resources" aria-labelledby="resources-heading">
      <h2 id="resources-heading">🌻 Accessibility Resources</h2>
      <p>These links go to external organizations. They are listed as sources of information only — Calm Skies Journey Builder is not affiliated with them.</p>
      ${itemsHtml}
    </section>`;
}

// ── Main render entry point ─────────────────────────────────────────────────

/**
 * Render all 5 outputs into the #outputs section.
 * @param {{ story: string, journey: Step[], kit: object, checklist: object, resources: Resource[] }} outputs
 */
export function renderAll(outputs) {
  const el = document.getElementById('outputs');
  if (!el) return;

  el.innerHTML =
    renderStory(outputs.story) +
    renderJourney(outputs.journey) +
    renderCalmKit(outputs.kit) +
    renderParentChecklist(outputs.checklist) +
    renderResources(outputs.resources);

  el.removeAttribute('hidden');

  // Move focus to the outputs heading so screen-reader users land on results (A5 / WCAG 2.4.3).
  const heading = el.querySelector('h2');
  if (heading) {
    heading.setAttribute('tabindex', '-1');
    heading.focus();
  }

  // Wire the Journey navigator after DOM insertion
  wireJourneyNav(outputs.journey.length);
}
