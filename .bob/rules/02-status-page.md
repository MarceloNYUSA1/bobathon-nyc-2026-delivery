# Reporting (Claude maintains STATUS.html; never edit it)

After every meaningful step, append one line to `comms/outbox.md`:
- `TASK <id> | <done|doing|blocked|cut> | <what, one sentence> | <evidence: commit, N/N tests, evidence-log line, or "not verified">`
- For a real decision: `DECISION | <title> | options: A…; B… | chosen: X | why: … | trade-off: … | revisit if: …`
- For a wrong earlier report: `CORRECTION | <what was wrong> | <what is true>`

No times, no percentages. Never report `done` without evidence. Report a missed checkpoint as `blocked`.
