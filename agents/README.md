# Per-person AI agent context files

Source-of-truth markdown profiles the ZAOstock bots load when answering on a teammate's behalf or summarizing their work. Each file captures the voice, current focus, and rules a bot must respect when speaking as that person.

## How these files are used

- **Bot voice**: when the bot drafts a tweet, reply, or note attributed to person X, it loads `<X>.md` and conditions output on it.
- **Self-portrait template**: `TEMPLATE.md` is the canonical structure. Iman starts the pattern by writing `Iman.md` first; everyone else copies the shape.
- **Versioning**: files live in this repo so updates flow through normal PR review. No hidden `active=true` gates.

## File list

| File | Owner | Status |
|---|---|---|
| TEMPLATE.md | n/a | seed structure |
| Iman.md | Iman Afrikah | self-write Wed (template + first profile) |
| FailOften.md | FailOften | needs draft |
| Shawn.md | Shawn (Web3Metal) | needs draft |
| Adam.md | Adam | needs draft |
| Zaal.md | Zaal | needs draft |

## Conventions

- Write in second person ("you do X") so the bot can read these as instructions.
- Keep each file under 300 lines.
- "Hard rules" section is the bot's non-negotiables (e.g. "never use emojis", "never sign messages with my full name").
- Every file ends with a `last-validated:` date. Bot will refuse to use a file that's been stale > 90 days.

## Adding a new person

1. Copy `TEMPLATE.md` to `<Name>.md`.
2. Fill all sections. Empty sections OK if section header includes `_intentionally blank_`.
3. Open PR. Reviewer = the person themselves (or Zaal as fallback).
4. Merge once approved.
