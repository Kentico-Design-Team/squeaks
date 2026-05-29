# Header selectors (workspace & language)

Before the breadcrumbs, the shell header shows up to two dropdowns —
**workspace** (first) then **language** (second) — inside a **single** rounded
`border-2 border-black` container, **split in half** by a `border-l-2 border-black`
divider between the two segments. The language segment has a leading `Globe`
icon; both segments have a trailing `ChevronDown`.

**Every page shows at least the language.** There is no "Kentico" placeholder —
workspace is opt-in, language is the baseline:

- **Both** → one box, two segments split by the divider (page supports workspaces).
- **Language only** → a single language dropdown (the default; no divider).

API — `Shell` props (forwarded by `Editor` / `ContentHub` via `...shellProps`):

- `workspace?: string` — opt-in; omit for pages that don't support workspaces.
- `language?: string` — defaults to `"English"`. Pass `language=""` only for the
  rare non-multilingual page.

Reference: `src/templates/shell.tsx`. Live examples (both): `content-hub.tsx`,
`pages.tsx`, `emails.tsx`.
