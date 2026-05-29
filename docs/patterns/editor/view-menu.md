# Editor view menu

The right vertical rail in the editor template (`src/templates/editor.tsx`).

## Behaviour

- Switches the content view of the page selected in the content tree — each tab
  renders its own content area.
- URL-driven: both the selected page and the active tab live in the URL
  (`<basePath>/:pageId/:tab`). Switching pages keeps the current tab; switching
  tabs keeps the current page.

## Dimensions

- Width: **88px**.
- The border wraps its items — it is **not** full height (`self-start`).
- Inner padding: **4px** left/right (`px-1`), 8px top/bottom.

## Gaps

- **16px** from the content area.
- **24px** from the AIRA rail/panel — the only exception to the normal right gap
  (`120 − 40`). Enabled by the `tightRight` prop on `Shell`, which the editor
  sets automatically whenever it renders the view menu.
