# Action controls

- Search inputs and the buttons next to them are always **40px** (`h-10`).
- Applies to: search field, PRIMARY ACTION, FILTER, NEW …, SAVE/PUBLISH, items-per-page select.
- Primary (solid) and secondary (outline) buttons are **pill** shaped
  (`rounded-full`) with **24px** left/right inner padding (`px-6`) — including
  FILTER. Split buttons pill only their outer edges; their icon-only segment
  keeps tight padding.
- **Split buttons** — the two segments sit flush (no gap/overlap). A **solid**
  split button divides its segments with a 2px **white** vertical line:
  `border-l-2 border-l-white` on the icon segment. An **outline** split button
  collapses its black borders into one line instead (`-ml-0.5` on the icon
  segment). Reference: `pages.tsx` (solid, CHANGE WORKFLOW STEP),
  `editor.tsx` (outline, NEW …).
- **Gotcha:** the Shadcn `Button` base style sets `has-[>svg]:px-3`, and its
  `:has(> svg)` selector outranks a plain `px-6` by specificity — so a button
  with an icon silently renders at 12px. Add `has-[>svg]:px-6` alongside `px-6`
  on icon + text buttons (e.g. FILTER) to keep the 24px padding.

- **Edit form — sticky action toolbar.** In the `edit-form` template the
  action toolbar (PUBLISH/SAVE) is **sticky to the top** while the page scrolls;
  the page `<h1>` heading/title above it is **not** sticky and scrolls away. The
  toolbar carries a `bg-background` (plus a `before:` strip covering the scroll
  container's top padding) so form content scrolls cleanly beneath it.

Implemented in: `src/templates/shell.tsx`, `listing.tsx`, `content-hub.tsx`, `editor.tsx`, `edit-form.tsx`.
