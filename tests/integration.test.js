// tests/integration.test.js
// Smoke test: demo scenario (Sam, 8–10, first flight, JFK→MCO, noise+crowds, pictures)
// produces all 5 outputs with key content.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildStory }           from '../src/journey/story.js';
import { buildJourney }         from '../src/journey/journey.js';
import { buildCalmKit }         from '../src/journey/calmKit.js';
import { buildParentChecklist } from '../src/journey/parentChecklist.js';
import { RESOURCES }            from '../src/journey/resources.js';
import { escapeHtml }           from '../app/render.js';

const DEMO = {
  childName:      'Sam',
  ageRange:       '8-10',
  firstFlight:    true,
  departure:      'JFK',
  destination:    'MCO',
  sensitivities:  ['noise', 'crowds'],
  commPref:       'pictures',
  concern:        'Sam gets anxious waiting in lines',
  comfortItem:    'blue blanket',
  visiting:       'Grandma',
  calmStrategy:   'take slow breaths and squeeze my fidget',
  excitingDetail: 'swimming in the pool',
};

test('integration: all 5 outputs are produced for demo scenario', () => {
  const story     = buildStory(DEMO);
  const journey   = buildJourney(DEMO);
  const kit       = buildCalmKit(DEMO);
  const checklist = buildParentChecklist(DEMO);
  const resources = RESOURCES;

  // Output 1 — Flight Story
  assert.ok(story.includes('Sam'), 'Story must include child name');
  assert.ok(story.includes('headphone') || story.toLowerCase().includes('quiet'), 'Story must adapt for noise');
  assert.ok(story.toLowerCase().includes('first'), 'Story must include first-flight content');
  assert.ok(story.includes('JFK'), 'Story must include departure');
  assert.ok(story.includes('MCO'), 'Story must include destination');

  // Output 2 — Airport Journey
  assert.equal(journey.length, 10, 'Journey must have 10 steps');
  const noiseTips = journey.filter(s => s.tip.toLowerCase().includes('headphone') || s.tip.toLowerCase().includes('quiet'));
  assert.ok(noiseTips.length > 0, 'Journey must have noise-adapted tips');

  // Output 3 — Calm Kit
  assert.ok(kit.items.length >= 8, 'Kit must have ≥8 items');
  assert.ok(kit.items.find(i => i.label.toLowerCase().includes('headphone')), 'Kit must include headphones for noise');
  assert.ok(kit.disclaimer.length > 0, 'Kit must have disclaimer');
  const comfortKitItem = kit.items.find(i => i.id === 'comfort-item');
  assert.ok(comfortKitItem && comfortKitItem.label.includes('blue blanket'), 'Kit comfort item must use provided name');

  // Output 4 — Parent Checklist
  assert.ok(checklist.beforeHome.length >= 6, 'Checklist must have ≥6 before-home items');
  assert.ok(checklist.perStage.length >= 5, 'Checklist must have ≥5 per-stage items');
  assert.ok(checklist.notes.includes('anxious waiting in lines'), 'Checklist notes must echo concern');

  // Output 5 — Resources
  assert.ok(resources.length >= 5, 'Must have ≥5 resources');
  const allText = resources.map(r => r.name + r.source).join(' ').toLowerCase();
  assert.ok(allText.includes('sunflower'), 'Resources must include Hidden Disabilities Sunflower');
  assert.ok(allText.includes('tsa'), 'Resources must include TSA Cares');

  // R8/R9 — comfort item and visiting (A.J. Aronoff requirement)
  assert.ok(story.includes('I will hold my blue blanket.'), 'Story must include comfort item boarding line');
  assert.ok(story.includes('Then I will see Grandma.'), 'Story must include visiting line at end');

  // R10/R11 — calm strategy and exciting detail (BOB-023, A.J. Aronoff requirement)
  assert.ok(story.includes('If I feel worried, I can take slow breaths and squeeze my fidget.'),
    'Story must include calm strategy line');
  assert.ok(story.includes('I am excited about swimming in the pool.'),
    'Story must include exciting detail line');

  // R12 — three always-present kit items (A.J. Aronoff requirement)
  assert.ok(kit.items.find(i => i.id === 'chew-toy'),     'Kit must include chew-toy item');
  assert.ok(kit.items.find(i => i.id === 'flight-story'), 'Kit must include printed flight story item');
  assert.ok(kit.items.find(i => i.id === 'assist-id'),    'Kit must include assistance ID item');

  // R13 — "If it gets hard" section (A.J. Aronoff requirement)
  assert.ok(checklist.ifItGetsHard, '"If it gets hard" section must be present');
  assert.ok(checklist.ifItGetsHard.note.includes('not medical advice'),
    '"If it gets hard" note must state "not medical advice"');
  assert.ok(checklist.ifItGetsHard.items.length === 4,
    '"If it gets hard" section must have 4 items');
});

test('integration: XSS name is escaped in story output', () => {
  // buildStory returns plain text (not HTML) — escapeHtml applied by render layer
  const xssInputs = { ...DEMO, childName: '<script>alert(1)</script>' };
  const story = buildStory(xssInputs);
  // The plain text story embeds the name as-is; render.js escapes it
  // Check that escapeHtml neutralises it:
  const escaped = escapeHtml(story);
  assert.ok(!escaped.includes('<script>'), 'Escaped story must not contain <script> tag');
  assert.ok(escaped.includes('&lt;script&gt;'), 'Escaped story must have escaped script tag');
});
