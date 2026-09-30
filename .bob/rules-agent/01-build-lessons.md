# Build lessons (Agent mode only; verified on this machine in rehearsals)

## Shell and tests
- Commands run in Windows PowerShell 5.1: `&&` is a syntax error. Chain with `;`, or run the commands one at a time.
- `node --test tests/` fails here; use `node --test tests/*.test.js`.
- Tests must be deterministic and close stdin, or `node --test` hangs. Never write test output into real app data.
- A test only counts if you ran it and quote its result. Resolve file paths from `import.meta.url`, not the cwd.

## Honest evidence
- Record what Bob did in `evidence/BOBATHON_EVIDENCE.md`: requirement → Bob activity → files → test/validation → commit.
- Accessibility and privacy findings: state what was checked and how (tool, test or manual step), and what wasn't.

## Hooks and MCP (only if the plan uses them)
- `.bob/settings.json` hooks must be keyed by event: `{"hooks":{"PreToolUse":[{"hooks":[{"type":"command",
  "command":"node .bob/hooks/x.js","timeout":10}]}]}}`. A list format is silently ignored. PreToolUse exit 2 blocks;
  stderr is the reason Bob sees. Payload: `tool_name`, `tool_input` (`command` / `path` / `content`).
- `.bob/mcp.json`: always set `"cwd"` to the repo's absolute path; stdout is protocol only. After a server change the
  human presses ↻ in Settings → MCP and opens a new task.

## Budget and flow
- Bobcoins are limited: targeted edits, no broad exploration, no unnecessary subagents.
- Small commits, one per finished task (tests green first).
- Packaging order: review → README (4 required headings, Mermaid architecture, Tools used) → docs/demo-script.md →
  docs/submission.md → demo video → ZIP. Stretch goals only once P0 is done and the README draft exists.
