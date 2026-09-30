// tests/resources.test.js

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { RESOURCES } from '../src/journey/resources.js';

test('R50: at least 5 resources are defined', () => {
  assert.ok(RESOURCES.length >= 5, `Expected ≥5 resources, got ${RESOURCES.length}`);
});

test('R50: each resource has name, description, source and lastChecked', () => {
  for (const r of RESOURCES) {
    assert.ok(typeof r.name === 'string' && r.name.length > 0, `Resource missing name: ${JSON.stringify(r)}`);
    assert.ok(typeof r.description === 'string' && r.description.length > 0, `Resource missing description: ${r.name}`);
    assert.ok(typeof r.source === 'string' && r.source.length > 0, `Resource missing source: ${r.name}`);
    assert.ok(typeof r.lastChecked === 'string' && r.lastChecked.length > 0, `Resource missing lastChecked: ${r.name}`);
  }
});

test('R50: resources with a URL have a valid https URL', () => {
  for (const r of RESOURCES) {
    if (r.url !== undefined) {
      assert.ok(typeof r.url === 'string' && r.url.length > 0, `Resource "${r.name}" has empty URL`);
      assert.ok(r.url.startsWith('https://'), `Resource "${r.name}" URL should start with https://`);
    }
  }
});

test('R50: all resource URLs are unique', () => {
  const urls = RESOURCES.filter(r => r.url).map(r => r.url);
  const unique = new Set(urls);
  assert.strictEqual(unique.size, urls.length,
    `Duplicate URLs found: ${urls.filter((u, i) => urls.indexOf(u) !== i).join(', ')}`);
});

test('R50: required organisations are represented', () => {
  const names = RESOURCES.map(r => r.name.toLowerCase() + ' ' + r.source.toLowerCase());
  const combined = names.join(' ');
  assert.ok(combined.includes('sunflower'), 'Missing Hidden Disabilities Sunflower');
  assert.ok(combined.includes('tsa'), 'Missing TSA Cares');
  assert.ok(combined.includes('social stori'), 'Missing Social Stories resource');
});

test('RESOURCES is importable without browser or fetch', () => {
  // Just importing and having a non-empty array is sufficient —
  // this test proves it runs under node:test with no DOM.
  assert.ok(Array.isArray(RESOURCES));
  assert.ok(RESOURCES.length > 0);
});
