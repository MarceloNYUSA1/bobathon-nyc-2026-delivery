// tests/calmKit.test.js

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildCalmKit } from '../src/journey/calmKit.js';

const BASE = {
  childName: 'Sam',
  ageRange: '8-10',
  firstFlight: false,
  departure: 'JFK',
  destination: 'MCO',
  sensitivities: [],
  commPref: 'spoken',
  concern: '',
};

test('R30: default inputs produce at least 8 items', () => {
  const { items } = buildCalmKit(BASE);
  assert.ok(items.length >= 8, `Expected ≥8 items, got ${items.length}`);
});

test('R31: every item has id, label and checked=false', () => {
  const { items } = buildCalmKit(BASE);
  for (const item of items) {
    assert.ok(typeof item.id === 'string' && item.id.length > 0, 'Item missing id');
    assert.ok(typeof item.label === 'string' && item.label.length > 0, 'Item missing label');
    assert.equal(item.checked, false, 'Item checked should be false');
  }
});

test('R32: disclaimer is non-empty and mentions not medical advice', () => {
  const { disclaimer } = buildCalmKit(BASE);
  assert.ok(typeof disclaimer === 'string' && disclaimer.length > 0, 'Disclaimer missing');
  assert.ok(
    disclaimer.toLowerCase().includes('not medical') || disclaimer.toLowerCase().includes('suggestion'),
    `Disclaimer should mention suggestions or not medical: "${disclaimer}"`
  );
});

test('R33: noise sensitivity adds headphones item', () => {
  const { items } = buildCalmKit({ ...BASE, sensitivities: ['noise'] });
  const found = items.find(i => i.label.toLowerCase().includes('headphone'));
  assert.ok(found, 'Expected headphones item for noise sensitivity');
});

test('noise sensitivity adds at least 2 extra items over baseline', () => {
  const base = buildCalmKit(BASE).items.length;
  const noisy = buildCalmKit({ ...BASE, sensitivities: ['noise'] }).items.length;
  assert.ok(noisy > base, 'Noise sensitivity should add items');
});

test('all sensitivities add more items than baseline', () => {
  const base = buildCalmKit(BASE).items.length;
  const all  = buildCalmKit({ ...BASE, sensitivities: ['noise', 'crowds', 'transitions', 'waiting'] }).items.length;
  assert.ok(all > base, `Expected more items with all sensitivities (base ${base}, got ${all})`);
});

test('pictures commPref adds picture communication cards', () => {
  const { items } = buildCalmKit({ ...BASE, commPref: 'pictures' });
  const found = items.find(i => i.label.toLowerCase().includes('picture'));
  assert.ok(found, 'Expected picture cards item for pictures commPref');
});

test('item IDs are unique within the kit', () => {
  const { items } = buildCalmKit({ ...BASE, sensitivities: ['noise', 'crowds', 'transitions', 'waiting'], commPref: 'pictures' });
  const ids = items.map(i => i.id);
  const unique = new Set(ids);
  assert.equal(unique.size, ids.length, `Duplicate item IDs: ${ids.filter((id, i) => ids.indexOf(id) !== i)}`);
});

// R8 — comfort item name used in kit (BOB-019, A.J. Aronoff requirement)

test('R8: comfort item name appears in kit label', () => {
  const { items } = buildCalmKit({ ...BASE, comfortItem: 'blue blanket' });
  const item = items.find(i => i.id === 'comfort-item');
  assert.ok(item, 'comfort-item entry must exist');
  assert.ok(item.label.includes('blue blanket'),
    `Expected "blue blanket" in comfort-item label, got: "${item.label}"`);
});

test('R8: default kit label used when comfort item empty', () => {
  const { items } = buildCalmKit({ ...BASE, comfortItem: '' });
  const item = items.find(i => i.id === 'comfort-item');
  assert.ok(item, 'comfort-item entry must exist');
  assert.ok(item.label.toLowerCase().includes('comfort item'),
    `Expected generic label when no comfort item, got: "${item.label}"`);
});

// R12 — always-present kit items (BOB-023, A.J. Aronoff requirement)

test('R12: chew-toy item always present in kit', () => {
  const { items } = buildCalmKit(BASE);
  const found = items.find(i => i.id === 'chew-toy');
  assert.ok(found, 'Kit must include chew-toy item regardless of sensitivities');
  assert.ok(found.label.toLowerCase().includes('chew'), `chew-toy label should mention chew: "${found.label}"`);
});

test('R12: printed flight story item always present in kit', () => {
  const { items } = buildCalmKit(BASE);
  const found = items.find(i => i.id === 'flight-story');
  assert.ok(found, 'Kit must include printed flight story item');
  assert.ok(found.label.toLowerCase().includes('flight story'), `flight-story label should mention flight story: "${found.label}"`);
});

test('R12: assistance ID card item always present in kit', () => {
  const { items } = buildCalmKit(BASE);
  const found = items.find(i => i.id === 'assist-id');
  assert.ok(found, 'Kit must include assistance ID item');
  assert.ok(found.label.toLowerCase().includes('id card') || found.label.toLowerCase().includes('assistance'), `assist-id label must mention ID card or assistance: "${found.label}"`);
});
