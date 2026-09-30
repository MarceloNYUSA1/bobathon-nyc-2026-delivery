// scripts/serve.js — static file server for local development only.
// Usage: node scripts/serve.js  (or: npm start)
// Binds to 127.0.0.1 ONLY — never accessible from the network.
// Only serves files inside the APP_ALLOW list; all other paths → 404.

import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, resolve, sep } from 'node:path';
import { posix } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(fileURLToPath(import.meta.url), '../../');

/** @type {number} Accept PORT env override for tests; default 8080. */
export const PORT = Number(process.env.SERVE_PORT) || 8080;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js':   'text/javascript; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.ico':  'image/x-icon',
  '.png':  'image/png',
  '.svg':  'image/svg+xml',
};

/**
 * Allow-listed path prefixes (relative, normalised, forward-slash).
 * Anything outside these prefixes returns 404.
 * No .git, no comms/, no docs/, no evidence/, no scripts/ exposed.
 */
const ALLOWED_PREFIXES = [
  '/index.html',
  '/app/',
  '/src/',
  '/assets/',
];

/**
 * Returns true if the normalised URL path is inside the allow-list.
 * @param {string} urlPath  e.g. "/app/main.js"
 */
function isAllowed(urlPath) {
  if (urlPath === '/' || urlPath === '/index.html') return true;
  return ALLOWED_PREFIXES.some(prefix => urlPath.startsWith(prefix));
}

/**
 * Safely resolve a URL path to a filesystem path.
 * Returns null (→ 400) on malformed encoding or suspicious bytes,
 * or the absolute resolved path if it passes all checks.
 *
 * Security steps (decode-then-validate, per BOB-002b fix):
 *  1. Decode the full path with decodeURIComponent → 400 on malformed input.
 *  2. Reject if the decoded path contains a backslash or a NUL byte.
 *  3. posix.normalize to collapse any remaining ../ sequences.
 *  4. Allow-list check on the normalised path.
 *  5. resolve(ROOT, '.' + path) and assert the result starts with ROOT + sep.
 *
 * @param {string} rawPath  The raw URL path (after stripping query string).
 * @returns {{ status: 400|404|'ok', filePath?: string, urlPath?: string }}
 */
function resolveRequestPath(rawPath) {
  // Step 1: decode entirely — reject malformed percent-sequences.
  let decoded;
  try {
    decoded = decodeURIComponent(rawPath);
  } catch {
    return { status: 400 };
  }

  // Step 2: reject backslashes and NUL bytes anywhere in the decoded path.
  if (decoded.includes('\x00') || decoded.includes('\\')) {
    return { status: 400 };
  }

  // Step 3: posix-normalise to collapse ../ sequences.
  let urlPath = posix.normalize(decoded);

  // Ensure leading slash is preserved after normalisation.
  if (!urlPath.startsWith('/')) urlPath = '/' + urlPath;

  if (urlPath === '/') urlPath = '/index.html';

  // Step 4: allow-list check on the clean path.
  if (!isAllowed(urlPath)) {
    return { status: 404 };
  }

  // Step 5: resolve to absolute path and verify containment.
  const filePath = resolve(ROOT, '.' + urlPath);
  if (!filePath.startsWith(ROOT + sep) && filePath !== ROOT) {
    return { status: 404 };
  }

  return { status: 'ok', filePath, urlPath };
}

/**
 * Create and return the HTTP server (does not listen — caller decides port).
 * Exported so tests can start/stop it on a random port.
 */
export function createAppServer() {
  return createServer(async (req, res) => {
    const rawPath = req.url.split('?')[0];
    const result = resolveRequestPath(rawPath);

    if (result.status === 400) {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.end('Bad request');
      return;
    }

    if (result.status === 404) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not found');
      return;
    }

    try {
      const data = await readFile(result.filePath);
      const mime = MIME[extname(result.filePath)] || 'application/octet-stream';
      res.writeHead(200, { 'Content-Type': mime });
      res.end(data);
    } catch {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not found');
    }
  });
}

// Only start listening when run directly (not when imported by tests).
if (process.argv[1] && resolve(process.argv[1]) === resolve(fileURLToPath(import.meta.url))) {
  createAppServer().listen(PORT, '127.0.0.1', () => {
    console.log(`Calm Skies running at http://127.0.0.1:${PORT}`);
  });
}
