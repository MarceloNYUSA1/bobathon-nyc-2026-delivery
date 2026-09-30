// tests/wording.test.js
// Scans all 5 outputs for banned promise phrases, factual errors,
// and UK spellings. All checks run against the demo scenario.
// Also scans index.html labels and render.js strings for US English.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { buildStory }           from '../src/journey/story.js';
import { buildJourney }         from '../src/journey/journey.js';
import { buildCalmKit }         from '../src/journey/calmKit.js';
import { buildParentChecklist } from '../src/journey/parentChecklist.js';
import { RESOURCES }            from '../src/journey/resources.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const indexHtml  = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const renderJs   = readFileSync(join(__dirname, '..', 'app', 'render.js'), 'utf8');

const DEMO = {
  childName:     'Sam',
  ageRange:      '8-10',
  firstFlight:   true,
  departure:     'JFK',
  destination:   'MCO',
  sensitivities: ['noise', 'crowds', 'transitions', 'waiting'],
  commPref:      'written',
  concern:       '',
};

function storyText()   { return buildStory(DEMO); }
function journeyText() { return buildJourney(DEMO).map(s => s.label + ' ' + s.description + ' ' + s.tip).join(' '); }
function kitText() {
  const { items, disclaimer } = buildCalmKit(DEMO);
  return items.map(i => i.label).join(' ') + ' ' + disclaimer;
}
function checklistText() {
  const { beforeHome, perStage, notes } = buildParentChecklist(DEMO);
  return [...beforeHome, ...perStage].map(i => i.label).join(' ') + ' ' + notes;
}
function resourcesText() {
  return RESOURCES.map(r => r.name + ' ' + r.description).join(' ');
}
function allText() {
  return storyText() + ' ' + journeyText() + ' ' + kitText() + ' ' + checklistText() + ' ' + resourcesText();
}

// ── Banned promise phrases ────────────────────────────────────────────────

test('wording: no "will help a lot" guarantee phrase', () => {
  assert.ok(!allText().includes('will help a lot'), '"will help a lot" is a promise — use "can help"');
});

test('wording: no "always" guarantee', () => {
  assert.ok(!allText().toLowerCase().includes(' always '), '"always" should not appear as a guarantee');
});

test('wording: no "guarantee" word', () => {
  assert.ok(!allText().toLowerCase().includes('guarantee'), '"guarantee" should not appear');
});

// ── Factual accuracy ──────────────────────────────────────────────────────

test('wording: story does not instruct child to remove shoes', () => {
  assert.ok(!storyText().toLowerCase().includes('take off your shoes'),
    'Do not instruct shoe removal — TSA policy differs by age/situation');
});

test('wording: story does not say "put your bag and shoes on a tray"', () => {
  assert.ok(!storyText().toLowerCase().includes('shoes on a tray'),
    'Do not specify shoe tray procedure as fact');
});

test('wording: journey security step does not instruct shoe removal', () => {
  const steps = buildJourney(DEMO);
  const security = steps.find(s => s.label === 'Security');
  assert.ok(security, 'Security step must exist');
  const secText = (security.description + ' ' + security.tip).toLowerCase();
  assert.ok(!secText.includes('take off your shoes'),
    'Security step should not instruct shoe removal');
});

test('wording: exit step does not say "usually green"', () => {
  const steps = buildJourney(DEMO);
  const exit = steps.find(s => s.label === 'Exit');
  assert.ok(exit, 'Exit step must exist');
  const exitText = (exit.description + ' ' + exit.tip).toLowerCase();
  assert.ok(!exitText.includes('usually green'),
    'Exit sign color claim removed — not universally true in US');
});

test('wording: story ending contains "arrived" not "has begun"', () => {
  assert.ok(storyText().includes('arrived'),
    'Story ending must say "arrived" not "journey has begun"');
  assert.ok(!storyText().includes('has begun'),
    'Story must not say "journey has begun" after destination exit');
});

// ── Empty name handling ───────────────────────────────────────────────────

test('wording: empty name does not produce "My name is I"', () => {
  const story = buildStory({ ...DEMO, childName: '' });
  assert.ok(!story.includes('My name is I'),
    'Empty name must not produce "My name is I"');
});

test('wording: empty name story still has ≥9 paragraphs', () => {
  const story = buildStory({ ...DEMO, childName: '' });
  const paras = story.split('\n\n').filter(p => p.trim().length > 0);
  assert.ok(paras.length >= 9, `Expected ≥9 paragraphs with empty name, got ${paras.length}`);
});

// ── US English spellings ──────────────────────────────────────────────────

test('wording: no "aeroplane" (use "airplane")', () => {
  assert.ok(!allText().toLowerCase().includes('aeroplane'),
    'Use US English "airplane" not "aeroplane"');
});

test('wording: no "queue" (use "line")', () => {
  assert.ok(!allText().toLowerCase().includes('queue'),
    'Use US English "line" not "queue"');
});

test('wording: no "favourite" (use "favorite")', () => {
  assert.ok(!allText().toLowerCase().includes('favourite'),
    'Use US English "favorite" not "favourite"');
});

// ── index.html label US English ───────────────────────────────────────────

test('wording: index.html labels use US English "Traveling" not "Travelling"', () => {
  assert.ok(!indexHtml.includes('Travelling'),
    'index.html label must use US English "Traveling"');
});

test('wording: render.js resources intro uses US English "organizations" not "organisations"', () => {
  assert.ok(!renderJs.includes('organisations'),
    'render.js must use US English "organizations" not "organisations"');
});
