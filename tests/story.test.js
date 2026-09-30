// tests/story.test.js

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildStory } from '../src/journey/story.js';
import { escapeHtml } from '../app/render.js';

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

test('R10: story has at least 9 paragraphs (steps)', () => {
  const story = buildStory(BASE);
  const paragraphs = story.split('\n\n').filter(p => p.trim().length > 0);
  assert.ok(paragraphs.length >= 9, `Expected ≥9 paragraphs, got ${paragraphs.length}`);
});

test('R12: child name appears in the first paragraph', () => {
  const story = buildStory(BASE);
  const first = story.split('\n\n')[0];
  assert.ok(first.includes('Sam'), `Name "Sam" not found in first paragraph: "${first}"`);
});

test('R11: noise sensitivity adds headphones or quiet to story', () => {
  const story = buildStory({ ...BASE, sensitivities: ['noise'] });
  assert.ok(
    story.includes('headphones') || story.toLowerCase().includes('quiet'),
    'Expected "headphones" or "quiet" in noise-sensitive story'
  );
});

test('R11: crowds sensitivity adds crowd-related tip to story', () => {
  const story = buildStory({ ...BASE, sensitivities: ['crowds'] });
  assert.ok(
    story.toLowerCase().includes('crowd') || story.toLowerCase().includes('busy'),
    'Expected crowd-related tip in crowds-sensitive story'
  );
});

test('R13: first-flight flag adds first-time reassurance', () => {
  const story = buildStory({ ...BASE, firstFlight: true });
  assert.ok(
    story.includes('first time') || story.toLowerCase().includes('first flight') || story.toLowerCase().includes('first time'),
    'Expected "first time" or "first flight" in first-flight story'
  );
});

test('story without sensitivities still has ≥9 paragraphs', () => {
  const story = buildStory({ ...BASE, sensitivities: [] });
  const paragraphs = story.split('\n\n').filter(p => p.trim().length > 0);
  assert.ok(paragraphs.length >= 9, `Expected ≥9 paragraphs, got ${paragraphs.length}`);
});

test('story uses departure and destination in text', () => {
  const story = buildStory(BASE);
  assert.ok(story.includes('JFK'), 'Expected departure JFK in story');
  assert.ok(story.includes('MCO'), 'Expected destination MCO in story');
});

test('all four sensitivities combined still produce a valid story', () => {
  const story = buildStory({ ...BASE, sensitivities: ['noise', 'crowds', 'transitions', 'waiting'] });
  const paragraphs = story.split('\n\n').filter(p => p.trim().length > 0);
  assert.ok(paragraphs.length >= 9, `Expected ≥9 paragraphs, got ${paragraphs.length}`);
  assert.ok(story.includes('headphones') || story.toLowerCase().includes('quiet'));
});

// R8/R9 — comfort item + visiting personalization (BOB-019, A.J. Aronoff requirement)

test('R8: comfort item adds boarding line with item name', () => {
  const story = buildStory({ ...BASE, comfortItem: 'blue blanket' });
  assert.ok(story.includes('I will hold my blue blanket.'),
    'Story boarding step must include "I will hold my blue blanket."');
});

test('R8: comfort item line absent when empty', () => {
  const story = buildStory({ ...BASE, comfortItem: '' });
  assert.ok(!story.includes('I will hold my'),
    'Story must not contain comfort-item line when field is empty');
});

test('R9: visiting adds line near end with name', () => {
  const story = buildStory({ ...BASE, visiting: 'Grandma' });
  assert.ok(story.includes('Then I will see Grandma.'),
    'Story arrival step must include "Then I will see Grandma."');
});

test('R9: visiting line absent when empty', () => {
  const story = buildStory({ ...BASE, visiting: '' });
  assert.ok(!story.includes('Then I will see'),
    'Story must not contain visiting line when field is empty');
});

test('R8/R9 XSS: comfort item and visiting are plain text in story output', () => {
  const xssStory = buildStory({ ...BASE, comfortItem: '<script>bad()</script>', visiting: '<img src=x>' });
  const escaped = escapeHtml(xssStory);
  assert.ok(!escaped.includes('<script>'), 'escaped story must not contain literal <script>');
  assert.ok(!escaped.includes('<img'), 'escaped story must not contain literal <img>');
});

// R10/R11 — calm strategy + exciting detail (BOB-023, A.J. Aronoff requirement)

test('R10: calmStrategy adds "If I feel worried" line near boarding when provided', () => {
  const story = buildStory({ ...BASE, calmStrategy: 'take slow breaths' });
  assert.ok(story.includes('If I feel worried, I can take slow breaths.'),
    'Story must include calm strategy sentence when calmStrategy is set');
});

test('R10: calmStrategy line absent when empty', () => {
  const story = buildStory({ ...BASE, calmStrategy: '' });
  assert.ok(!story.includes('If I feel worried'),
    'Story must not contain calm strategy line when field is empty');
});

test('R11: excitingDetail adds "I am excited about" line before ending when provided', () => {
  const story = buildStory({ ...BASE, excitingDetail: 'swimming in the pool' });
  assert.ok(story.includes('I am excited about swimming in the pool.'),
    'Story must include exciting detail sentence when excitingDetail is set');
});

test('R11: excitingDetail line absent when empty', () => {
  const story = buildStory({ ...BASE, excitingDetail: '' });
  assert.ok(!story.includes('I am excited about'),
    'Story must not contain exciting detail line when field is empty');
});

test('R10/R11 XSS: calmStrategy and excitingDetail are plain text in story output', () => {
  const xssStory = buildStory({
    ...BASE,
    calmStrategy:   '<script>bad()</script>',
    excitingDetail: '<img src=x onerror=alert(1)>',
  });
  const escaped = escapeHtml(xssStory);
  assert.ok(!escaped.includes('<script>'), 'escaped story must not contain literal <script> from calmStrategy');
  assert.ok(!escaped.includes('<img'),     'escaped story must not contain literal <img> from excitingDetail');
});
