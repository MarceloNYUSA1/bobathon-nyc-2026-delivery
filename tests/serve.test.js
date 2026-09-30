// tests/serve.test.js
// Security tests for scripts/serve.js:
// - sensitive paths (/.git/config, /comms/outbox.md, /docs/, /evidence/) return 404
// - allowed paths (/, /app/app.css) return 200 or 404-for-missing-file (not 200 on sensitive)
// - encoded traversal payloads from BOB-002b Claude probe return 400 or 404, never file contents
// The server binds to 127.0.0.1 on a random port; we close it after.
//
// Raw traversal tests use node:http directly so the HTTP client does NOT
// normalise the URL before sending it (fetch() would normalise it).

import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import { createAppServer } from '../scripts/serve.js';

let server;
let port;

before(async () => {
  server = createAppServer();
  await new Promise(resolve => {
    // port 0 = OS assigns a random free port
    server.listen(0, '127.0.0.1', () => {
      port = server.address().port;
      resolve();
    });
  });
});

after(async () => {
  await new Promise(resolve => server.close(resolve));
});

/** Fetch using the standard fetch() client (normalises URLs — for clean paths). */
async function fetchStatus(path) {
  const res = await fetch(`http://127.0.0.1:${port}${path}`);
  return res.status;
}

/**
 * Send a raw HTTP/1.1 GET using node:http so the path is NOT normalised.
 * This is the only reliable way to test encoded traversal payloads.
 * Returns { status, body }.
 */
function rawGet(rawPath) {
  return new Promise((resolve, reject) => {
    const req = http.request(
      { hostname: '127.0.0.1', port, path: rawPath, method: 'GET' },
      res => {
        let body = '';
        res.setEncoding('utf8');
        res.on('data', chunk => { body += chunk; });
        res.on('end', () => resolve({ status: res.statusCode, body }));
      },
    );
    req.on('error', reject);
    req.end();
  });
}

// ── Sensitive paths must return 404 ──────────────────────────────────────────

test('serve: /.git/config returns 404', async () => {
  assert.equal(await fetchStatus('/.git/config'), 404);
});

test('serve: /comms/outbox.md returns 404', async () => {
  assert.equal(await fetchStatus('/comms/outbox.md'), 404);
});

test('serve: /docs/REQUIREMENTS.md returns 404', async () => {
  assert.equal(await fetchStatus('/docs/REQUIREMENTS.md'), 404);
});

test('serve: /evidence/BOBATHON_EVIDENCE.md returns 404', async () => {
  assert.equal(await fetchStatus('/evidence/BOBATHON_EVIDENCE.md'), 404);
});

test('serve: /scripts/serve.js returns 404', async () => {
  assert.equal(await fetchStatus('/scripts/serve.js'), 404);
});

test('serve: /package.json returns 404', async () => {
  assert.equal(await fetchStatus('/package.json'), 404);
});

// ── Path traversal — raw requests (BOB-002b probe payloads) ──────────────────
// Each must return 400 or 404 and must never serve .git/config content.

test('serve: slash-encoded traversal %2f never serves .git/config', async () => {
  const { status, body } = await rawGet('/app/..%2f.git%2fconfig');
  assert.ok(status === 400 || status === 404, `expected 400 or 404, got ${status}`);
  assert.ok(!body.includes('[core]'), 'must not serve .git/config contents');
});

test('serve: backslash-encoded traversal %5c never serves .git/config', async () => {
  const { status, body } = await rawGet('/app/%5c..%5c.git%5cconfig');
  assert.ok(status === 400 || status === 404, `expected 400 or 404, got ${status}`);
  assert.ok(!body.includes('[core]'), 'must not serve .git/config contents');
});

test('serve: dot-encoded traversal %2e%2e%2f returns 400 or 404', async () => {
  const { status, body } = await rawGet('/app/%2e%2e%2f.git%2fconfig');
  assert.ok(status === 400 || status === 404, `expected 400 or 404, got ${status}`);
  assert.ok(!body.includes('[core]'), 'must not serve .git/config contents');
});

test('serve: double-encoded traversal %252e%252e%252f returns 400 or 404', async () => {
  const { status, body } = await rawGet('/app/%252e%252e%252f.git%252fconfig');
  assert.ok(status === 400 || status === 404, `expected 400 or 404, got ${status}`);
  assert.ok(!body.includes('[core]'), 'must not serve .git/config contents');
});

test('serve: semicolon path traversal attempt returns 400 or 404', async () => {
  const { status, body } = await rawGet('/app/..;/.git/config');
  assert.ok(status === 400 || status === 404, `expected 400 or 404, got ${status}`);
  assert.ok(!body.includes('[core]'), 'must not serve .git/config contents');
});

test('serve: NUL byte in path returns 400 or 404', async () => {
  const { status, body } = await rawGet('/app/main%00.js');
  assert.ok(status === 400 || status === 404, `expected 400 or 404, got ${status}`);
  assert.ok(!body.includes('[core]'), 'must not serve .git/config contents');
});

test('serve: mixed-case encoded slash %2F returns 400 or 404', async () => {
  const { status, body } = await rawGet('/app/..%2F.git%2Fconfig');
  assert.ok(status === 400 || status === 404, `expected 400 or 404, got ${status}`);
  assert.ok(!body.includes('[core]'), 'must not serve .git/config contents');
});

// ── Legacy traversal (fetch-normalised) ──────────────────────────────────────

test('serve: path traversal attempt /app/../../comms/outbox.md returns 404', async () => {
  assert.equal(await fetchStatus('/app/../../comms/outbox.md'), 404);
});

// ── Allowed paths ─────────────────────────────────────────────────────────

test('serve: / returns 200 (index.html)', async () => {
  assert.equal(await fetchStatus('/'), 200);
});

test('serve: /index.html returns 200', async () => {
  assert.equal(await fetchStatus('/index.html'), 200);
});

test('serve: /app/app.css returns 200', async () => {
  assert.equal(await fetchStatus('/app/app.css'), 200);
});

test('serve: /app/main.js returns 200', async () => {
  assert.equal(await fetchStatus('/app/main.js'), 200);
});
