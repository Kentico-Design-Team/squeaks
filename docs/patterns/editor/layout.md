# Editor layout

Three columns in the editor template: content tree · content area · view menu.

## Content tree (left)

- Width: **304px**.
- **4px** gap to the content area.
- Its own scrollbar when it overflows the panel height.

## Content area (canvas)

- Padding: **64px 17% 32px 17%** (`pt-16 pb-8 px-[17%]`).
- Scrolls independently: the tree and view menu stay fixed; only the canvas
  scrolls. Enabled by the `fitHeight` prop on `Shell`, which locks the page
  height so the inner panels manage their own scrolling.
