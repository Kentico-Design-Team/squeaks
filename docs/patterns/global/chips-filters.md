# Chips & filters

All chips/filters share one style — the listing template is the reference
(`src/templates/listing.tsx`). Reuse its components; don't fork them.

- **Status / tag badges** — outline pill, `rounded-full px-2 py-0.5`
  (`StatusBadge`, `TagBadge`). `StatusBadge` has a leading `Check`.
- **Applied-filter chips** — outline pill, `rounded-full px-3 py-1`, with a
  trailing `X` icon. Preceded by a bold "Applied filters" label and a
  `CLEAR ALL` button (leading `X`, hover underline). The whole applied-filters
  row is **14px** (`text-sm`) — label, CLEAR ALL, and chips.

Other templates import `StatusBadge` / `TagBadge` from the listing rather than
defining their own (e.g. `content-hub.tsx` re-exports them).
