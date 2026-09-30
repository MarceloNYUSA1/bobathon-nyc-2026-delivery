// tests/parentChecklist.test.js

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildParentChecklist } from '../src/journey/parentChecklist.js';

const BASE = {
  childName: 'Sam',
  ageRange: '8-10',
  firstFlight: false,
  departure: 'JFK',
  destination: 'MCO',
  sensitivities: [],
  commPref: 'written',
  concern: '',
};

test('R40: beforeHome has at least 6 items', () => {
  const { beforeHome } = buildParentChecklist(BASE);
  assert.ok(beforeHome.length >= 6, `Expected ≥6 beforeHome items, got ${beforeHome.length}`);
});

test('R40: perStage has at least 5 items', () => {
  const { perStage } = buildParentChecklist(BASE);
  assert.ok(perStage.length >= 5, `Expected ≥5 perStage items, got ${perStage.length}`);
});

test('R41: all items have id, label and checked=false', () => {
  const { beforeHome, perStage } = buildParentChecklist(BASE);
  for (const item of [...beforeHome, ...perStage]) {
    assert.ok(typeof item.id === 'string' && item.id.length > 0, 'Item missing id');
    assert.ok(typeof item.label === 'string' && item.label.length > 0, 'Item missing label');
    assert.equal(item.checked, false, 'Item checked should be false');
  }
});

test('R42: concern text is echoed in notes', () => {
  const concern = 'Sam gets very anxious waiting in lines';
  const { notes } = buildParentChecklist({ ...BASE, concern });
  assert.ok(notes.includes(concern), `Concern not echoed in notes. Notes: "${notes}"`);
});

test('R42: empty concern gives empty notes', () => {
  const { notes } = buildParentChecklist({ ...BASE, concern: '' });
  assert.equal(notes, '');
});

test('noise sensitivity adds headphone-related item to beforeHome', () => {
  const { beforeHome } = buildParentChecklist({ ...BASE, sensitivities: ['noise'] });
  const found = beforeHome.find(i => i.label.toLowerCase().includes('headphone'));
  assert.ok(found, 'Expected headphone item for noise sensitivity');
});

test('crowds sensitivity adds sunflower or crowd-related item to perStage', () => {
  const { perStage } = buildParentChecklist({ ...BASE, sensitivities: ['crowds'] });
  const found = perStage.find(i => i.label.toLowerCase().includes('sunflower') || i.label.toLowerCase().includes('crowd'));
  assert.ok(found, 'Expected sunflower/crowd item for crowds sensitivity');
});

test('firstFlight adds a talk item to beforeHome', () => {
  const { beforeHome } = buildParentChecklist({ ...BASE, firstFlight: true });
  const found = beforeHome.find(i => i.label.toLowerCase().includes('first flight') || i.label.toLowerCase().includes('first'));
  assert.ok(found, 'Expected first-flight prep item in beforeHome');
});

// R13 — "If it gets hard" section (BOB-023, A.J. Aronoff requirement)

test('R13: ifItGetsHard section is present', () => {
  const { ifItGetsHard } = buildParentChecklist(BASE);
  assert.ok(ifItGetsHard, '"If it gets hard" section must be present');
});

test('R13: ifItGetsHard note contains "not medical advice" and "every child is different"', () => {
  const { ifItGetsHard } = buildParentChecklist(BASE);
  assert.ok(ifItGetsHard.note.toLowerCase().includes('not medical advice'),
    'Note must say "not medical advice"');
  assert.ok(ifItGetsHard.note.toLowerCase().includes('every child is different'),
    'Note must say "every child is different"');
});

test('R13: ifItGetsHard has exactly 4 items', () => {
  const { ifItGetsHard } = buildParentChecklist(BASE);
  assert.equal(ifItGetsHard.items.length, 4, '"If it gets hard" must have 4 items');
});

test('R13: ifItGetsHard items include quieter spot, fewer words, comfort first, and rest/no blame', () => {
  const { ifItGetsHard } = buildParentChecklist(BASE);
  const labels = ifItGetsHard.items.map(i => i.label.toLowerCase());
  assert.ok(labels.some(l => l.includes('quiet')),      'Must include quieter spot tip');
  assert.ok(labels.some(l => l.includes('fewer words')), 'Must include fewer words tip');
  assert.ok(labels.some(l => l.includes('comfort')),    'Must include comfort item tip');
  assert.ok(labels.some(l => l.includes('rest')),       'Must include rest/no blame tip');
});
