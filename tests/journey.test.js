// tests/journey.test.js

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildJourney } from '../src/journey/journey.js';

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

test('R20: buildJourney returns exactly 10 steps', () => {
  const steps = buildJourney(BASE);
  assert.equal(steps.length, 10, `Expected 10 steps, got ${steps.length}`);
});

test('R20: all 10 step labels are present', () => {
  const steps = buildJourney(BASE);
  const labels = steps.map(s => s.label);
  const expected = ['Home', 'Airport Arrival', 'Check-in', 'Security', 'Gate', 'Boarding', 'Flight', 'Landing', 'Baggage Claim', 'Exit'];
  for (const lbl of expected) {
    assert.ok(labels.includes(lbl), `Missing step label: "${lbl}"`);
  }
});

test('R22: each step has label, description, and tip', () => {
  const steps = buildJourney(BASE);
  for (const step of steps) {
    assert.ok(typeof step.label === 'string' && step.label.length > 0, `Step missing label: ${JSON.stringify(step)}`);
    assert.ok(typeof step.description === 'string' && step.description.length > 0, `Step missing description: ${step.label}`);
    assert.ok(typeof step.tip === 'string' && step.tip.length > 0, `Step missing tip: ${step.label}`);
  }
});

test('R22: noise sensitivity adds headphones/quiet to a step tip', () => {
  const steps = buildJourney({ ...BASE, sensitivities: ['noise'] });
  const noisySteps = steps.filter(s => s.tip.toLowerCase().includes('headphone') || s.tip.toLowerCase().includes('quiet'));
  assert.ok(noisySteps.length > 0, 'Expected at least one step tip to mention headphones or quiet for noise sensitivity');
});

test('R22: crowds sensitivity adds crowd-related tip to a step', () => {
  const steps = buildJourney({ ...BASE, sensitivities: ['crowds'] });
  const crowdSteps = steps.filter(s => s.tip.toLowerCase().includes('crowd') || s.tip.toLowerCase().includes('busy'));
  assert.ok(crowdSteps.length > 0, 'Expected at least one step tip to mention crowd or busy');
});

test('R23: pictures preference gives non-empty symbol on each step', () => {
  const steps = buildJourney({ ...BASE, commPref: 'pictures' });
  for (const step of steps) {
    assert.ok(step.symbol && step.symbol.length > 0, `Step "${step.label}" missing symbol for pictures preference`);
  }
});

test('R23: non-pictures preference gives empty symbol', () => {
  const steps = buildJourney({ ...BASE, commPref: 'written' });
  for (const step of steps) {
    assert.equal(step.symbol, '', `Step "${step.label}" should have empty symbol for written preference`);
  }
});

test('all sensitivities combined still returns 10 steps with non-empty tips', () => {
  const steps = buildJourney({ ...BASE, sensitivities: ['noise', 'crowds', 'transitions', 'waiting'] });
  assert.equal(steps.length, 10);
  for (const step of steps) {
    assert.ok(step.tip.length > 0, `Step "${step.label}" has empty tip`);
  }
});
