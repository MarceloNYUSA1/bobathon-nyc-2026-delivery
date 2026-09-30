// tests/a11y.test.js
// Runs axe-core via jsdom on index.html.
// Checks: label, heading-order, image-alt, aria rules.
// Does NOT check colour contrast or focus indicators (not evaluable in jsdom).
// Also verifies the escapeHtml() XSS protection (NF6).

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';
import { runInContext } from 'node:vm';
import { JSDOM } from 'jsdom';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

// ── NF6: escapeHtml XSS test ───────────────────────────────────────────────

import { escapeHtml } from '../app/render.js';

test('NF6 escapeHtml: XSS payload is rendered as text', () => {
  const payload = '<img src=x onerror=alert(1)>';
  const escaped = escapeHtml(payload);
  // The escaped string must not contain an unescaped < or >, so it can't
  // be parsed as an HTML tag by the browser — even if the attribute name
  // "onerror" appears as harmless text.
  assert.ok(!escaped.includes('<img'), 'escaped string must not contain literal <img');
  assert.ok(escaped.includes('&lt;img'), 'escaped string must contain &lt;img');
  assert.ok(!escaped.includes('>'), 'escaped string must not contain literal >');
  assert.ok(escaped.includes('&gt;'), 'escaped string must contain &gt;');
});

test('NF6 escapeHtml: ampersands and quotes are escaped', () => {
  assert.equal(escapeHtml('a & b'), 'a &amp; b');
  assert.equal(escapeHtml('"hello"'), '&quot;hello&quot;');
  assert.equal(escapeHtml("it's"), 'it&#39;s');
});

// ── axe-core: structural accessibility checks ─────────────────────────────

/**
 * Helper: create a JSDOM with axe injected.
 * @param {string} html
 * @returns {{ dom: JSDOM, window: Window }}
 */
function makeAxeDom(html) {
  // runScripts is required to obtain a VM context for axe injection.
  const dom = new JSDOM(html, {
    runScripts: 'dangerously',
    url: 'http://localhost:8080',
  });
  const axeSource = readFileSync(
    resolve(ROOT, 'node_modules/axe-core/axe.min.js'),
    'utf8'
  );
  runInContext(axeSource, dom.getInternalVMContext());
  return { dom, window: dom.window };
}

const AXE_RULES = ['label', 'heading-order', 'image-alt', 'aria-required-attr', 'aria-valid-attr'];

async function runAxe(window) {
  const results = await window.axe.run(window.document, {
    runOnly: { type: 'rule', values: AXE_RULES },
  });
  return results.violations;
}

test('a11y: index.html shell has zero axe violations', async () => {
  const html = readFileSync(resolve(ROOT, 'index.html'), 'utf8');
  const { window } = makeAxeDom(html);
  const violations = await runAxe(window);
  if (violations.length > 0) {
    const msgs = violations.map(v => `[${v.id}] ${v.description}`).join('\n');
    assert.fail(`axe violations on shell:\n${msgs}`);
  }
  assert.equal(violations.length, 0);
});

test('a11y: demo scenario rendered output has zero axe violations', async () => {
  // Build rendered outputs using the journey modules (same as the browser would)
  const { buildStory }           = await import('../src/journey/story.js');
  const { buildJourney }         = await import('../src/journey/journey.js');
  const { buildCalmKit }         = await import('../src/journey/calmKit.js');
  const { buildParentChecklist } = await import('../src/journey/parentChecklist.js');
  const { RESOURCES }            = await import('../src/journey/resources.js');
  const { escapeHtml: esc }      = await import('../app/render.js');

  const demoInputs = {
    childName: 'Sam',
    ageRange: '8-10',
    firstFlight: true,
    departure: 'JFK',
    destination: 'MCO',
    sensitivities: ['noise', 'crowds'],
    commPref: 'written',
    concern: 'Sam gets anxious in crowds',
  };

  const story     = buildStory(demoInputs);
  const journey   = buildJourney(demoInputs);
  const kit       = buildCalmKit(demoInputs);
  const checklist = buildParentChecklist(demoInputs);

  // Build the story paragraphs
  const storyHtml = story.split('\n\n').filter(p => p.trim()).map(p => `<p>${esc(p.trim())}</p>`).join('');
  const journeyStepsHtml = journey.map((step, i) => `
    <div id="journey-step-${i}" role="region" aria-labelledby="step-label-${i}">
      <strong id="step-label-${i}">${esc(step.label)}</strong>
      <span>Step ${i+1} of ${journey.length}</span>
      <p>${esc(step.description)}</p>
      <p><strong>Tip:</strong> ${esc(step.tip)}</p>
    </div>`).join('');
  const kitItemsHtml = kit.items.map(item => `<li><label><input type="checkbox" id="kit-${esc(item.id)}"> ${esc(item.label)}</label></li>`).join('');
  const beforeHtml = checklist.beforeHome.map(item => `<li><label><input type="checkbox" id="before-${esc(item.id)}"> ${esc(item.label)}</label></li>`).join('');
  const stageHtml  = checklist.perStage.map(item => `<li><label><input type="checkbox" id="stage-${esc(item.id)}"> ${esc(item.label)}</label></li>`).join('');
  const resourcesHtml = RESOURCES.map(r => `
    <div class="resource-item">
      <a href="${esc(r.url)}" target="_blank" rel="noopener noreferrer">${esc(r.name)} <span aria-label="opens in new tab">↗</span></a>
      <p>${esc(r.description)}</p>
      <p>${esc(r.source)}</p>
    </div>`).join('');

  const outputHtml = `
    <section aria-labelledby="story-h"><h2 id="story-h">My Flight Story</h2>${storyHtml}</section>
    <section aria-labelledby="journey-h">
      <h2 id="journey-h">My Airport Journey</h2>
      <div aria-live="polite">${journeyStepsHtml}</div>
      <nav aria-label="Journey step navigation">
        <button aria-label="Previous step" disabled>← Previous</button>
        <button aria-label="Next step">Next →</button>
      </nav>
    </section>
    <section aria-labelledby="kit-h">
      <h2 id="kit-h">My Calm Kit</h2>
      <p role="note">${esc(kit.disclaimer)}</p>
      <ul>${kitItemsHtml}</ul>
    </section>
    <section aria-labelledby="checklist-h">
      <h2 id="checklist-h">Parent Checklist</h2>
      <h3>Before Leaving Home</h3><ul>${beforeHtml}</ul>
      <h3>At Each Stage</h3><ul>${stageHtml}</ul>
    </section>
    <section aria-labelledby="resources-h">
      <h2 id="resources-h">Accessibility Resources</h2>
      ${resourcesHtml}
    </section>`;

  const fullHtml = readFileSync(resolve(ROOT, 'index.html'), 'utf8')
    .replace('<section id="outputs" aria-live="polite" aria-label="Journey outputs" hidden>', `<section id="outputs" aria-live="polite" aria-label="Journey outputs">${outputHtml}`);

  const { window } = makeAxeDom(fullHtml);
  const violations = await runAxe(window);
  if (violations.length > 0) {
    const msgs = violations.map(v => `[${v.id}] ${v.description}: ${v.nodes.map(n => n.html).join('; ')}`).join('\n');
    assert.fail(`axe violations on demo output:\n${msgs}`);
  }
  assert.equal(violations.length, 0);
});

// ── Focus management tests (BOB-010) ─────────────────────────────────────────

test('focus: after submit, activeElement is the first h2 in #outputs', async () => {
  const { buildStory }           = await import('../src/journey/story.js');
  const { buildJourney }         = await import('../src/journey/journey.js');
  const { buildCalmKit }         = await import('../src/journey/calmKit.js');
  const { buildParentChecklist } = await import('../src/journey/parentChecklist.js');
  const { RESOURCES }            = await import('../src/journey/resources.js');
  const { renderAll }            = await import('../app/render.js');

  const indexHtml = readFileSync(resolve(ROOT, 'index.html'), 'utf8');
  const dom = new JSDOM(indexHtml, { runScripts: 'dangerously', url: 'http://localhost:8080' });
  const { document } = dom.window;

  // Inject the render module into the JSDOM context by running renderAll manually
  const demoInputs = {
    childName: 'Sam', ageRange: '8-10', firstFlight: true,
    departure: 'JFK', destination: 'MCO',
    sensitivities: ['noise'], commPref: 'written', concern: '',
  };
  const outputs = {
    story:     buildStory(demoInputs),
    journey:   buildJourney(demoInputs),
    kit:       buildCalmKit(demoInputs),
    checklist: buildParentChecklist(demoInputs),
    resources: RESOURCES,
  };

  // renderAll uses document.getElementById — we need to run it in JSDOM context.
  // We do this by evaluating the render logic against the JSDOM document.
  const { renderAll: renderAllDom } = await import('../app/render.js');

  // Override global document for the duration of the call
  const origDocument = global.document;
  global.document = document;
  try {
    renderAllDom(outputs);
  } finally {
    global.document = origDocument;
  }

  const outputsEl = document.getElementById('outputs');
  assert.ok(outputsEl, '#outputs section should exist');
  assert.ok(!outputsEl.hasAttribute('hidden'), '#outputs should be visible');

  const firstH2 = outputsEl.querySelector('h2');
  assert.ok(firstH2, 'first h2 in #outputs should exist');
  assert.equal(firstH2.getAttribute('tabindex'), '-1', 'first h2 should have tabindex=-1');
  assert.equal(document.activeElement, firstH2, 'focus should be on the first h2 in #outputs');
});

test('focus: after reaching last journey step, activeElement is not <body>', async () => {
  const { buildJourney } = await import('../src/journey/journey.js');
  const { wireJourneyNav } = await import('../app/render.js');

  const indexHtml = readFileSync(resolve(ROOT, 'index.html'), 'utf8');
  const dom = new JSDOM(indexHtml, { runScripts: 'dangerously', url: 'http://localhost:8080' });
  const { document } = dom.window;

  // Build a minimal journey nav in the JSDOM document
  const steps = buildJourney({ childName: 'Sam', ageRange: '8-10', firstFlight: false,
    departure: 'JFK', destination: 'MCO', sensitivities: [], commPref: 'spoken', concern: '' });
  const total = steps.length;

  // Create the nav buttons and step divs in the JSDOM document
  const container = document.createElement('div');
  for (let i = 0; i < total; i++) {
    const div = document.createElement('div');
    div.id = `journey-step-${i}`;
    if (i !== 0) div.setAttribute('hidden', '');
    container.appendChild(div);
  }
  const prevBtn = document.createElement('button');
  prevBtn.id = 'journey-prev';
  const nextBtn = document.createElement('button');
  nextBtn.id = 'journey-next';
  container.appendChild(prevBtn);
  container.appendChild(nextBtn);
  document.body.appendChild(container);

  const origDocument = global.document;
  global.document = document;
  try {
    wireJourneyNav(total);
    // Advance to the last step by clicking Next (total-1) times
    nextBtn.focus();
    for (let i = 0; i < total - 1; i++) {
      nextBtn.click();
    }
  } finally {
    global.document = origDocument;
  }

  // At the last step, nextBtn should be aria-disabled and focus should have moved to prevBtn
  assert.equal(nextBtn.getAttribute('aria-disabled'), 'true', 'Next should be aria-disabled on last step');
  assert.notEqual(document.activeElement, document.body, 'activeElement should not be <body>');
});

// R8/R9 — new field labels present in index.html (BOB-019, A.J. Aronoff requirement)

test('a11y: comfort-item and visiting fields are present and labelled', () => {
  const html = readFileSync(resolve(ROOT, 'index.html'), 'utf8');
  const dom = new JSDOM(html, { url: 'http://localhost:8080' });
  const { document } = dom.window;

  const comfortInput = document.getElementById('comfort-item');
  assert.ok(comfortInput, '#comfort-item input must exist');
  const comfortLabel = document.querySelector('label[for="comfort-item"]');
  assert.ok(comfortLabel, 'label[for="comfort-item"] must exist');
  assert.ok(comfortLabel.textContent.trim().length > 0, 'comfort-item label must have text');

  const visitingInput = document.getElementById('visiting');
  assert.ok(visitingInput, '#visiting input must exist');
  const visitingLabel = document.querySelector('label[for="visiting"]');
  assert.ok(visitingLabel, 'label[for="visiting"] must exist');
  assert.ok(visitingLabel.textContent.trim().length > 0, 'visiting label must have text');
});

// R10/R11 — new optional field labels present in index.html (BOB-023, A.J. Aronoff requirement)

test('a11y: calm-strategy and exciting-detail fields are present and labelled', () => {
  const html = readFileSync(resolve(ROOT, 'index.html'), 'utf8');
  const dom = new JSDOM(html, { url: 'http://localhost:8080' });
  const { document } = dom.window;

  const calmInput = document.getElementById('calm-strategy');
  assert.ok(calmInput, '#calm-strategy input must exist');
  const calmLabel = document.querySelector('label[for="calm-strategy"]');
  assert.ok(calmLabel, 'label[for="calm-strategy"] must exist');
  assert.ok(calmLabel.textContent.trim().length > 0, 'calm-strategy label must have text');

  const excitingInput = document.getElementById('exciting-detail');
  assert.ok(excitingInput, '#exciting-detail input must exist');
  const excitingLabel = document.querySelector('label[for="exciting-detail"]');
  assert.ok(excitingLabel, 'label[for="exciting-detail"] must exist');
  assert.ok(excitingLabel.textContent.trim().length > 0, 'exciting-detail label must have text');
});
