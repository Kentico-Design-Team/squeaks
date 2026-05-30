# Secondary navigation (drill-down)

Component: `@/components/custom/secondary-nav` (`SecondaryNav`). Used by the `listing`, `overview`, and `edit-form` templates via the `secondaryNav` prop. Fixed width **224px** (`w-56`) everywhere.

## Rules

- One section header only (title + trailing rule). No duplicated section title, no subheadings. The page body has a single `<h1>`.
- A `children` section renders **inline directly beneath its parent item** (opening an object on the "Item 1" page inserts its section between Item 1 and Item 2), not appended at the end. Nest arbitrarily deep.
- Each nested level is a **rounded, padded box outlined with a 2px black border** (no fill, no shading). Nesting reads as borders within borders. The root section has no box.
- **Left padding is always twice the right** at every level, including the root `<aside>` box. Keep the left padding as-is and halve the right (`pl-4`/`pr-2` on the root, `pl-3`/`pr-1.5` on nested boxes).
- **Sticky (opt-in).** Pass `sticky` to pin the nav to the top of the scroll container while the page scrolls (caps its height and scrolls internally if taller than the viewport). Used in the `edit-form` template.
- Opening an object (table row, card, …) attaches its section as `children` of the currently **active** item. The nested section's `title` is the opened object's own name.
- First sub-item is active by default when a level opens. The highlighted item is always the deepest current page — the parent un-highlights once you drill in.
- Body swaps with the nav: opening an object replaces the body with that object's own content; each sub-item shows different content (or a blank placeholder). In `listing`, pass the swapped body via the `content` prop (replaces heading/toolbar/table, keeps shell + nav). Breadcrumb grows with the drill path.
- **Every page/sub-page is reflected in the URL.** Drive the drill state from the route (path segments), not local state, so links are shareable and the back button works. E.g. `/listing-secondary` (table) → `/listing-secondary/3/overview` (object #3, Overview). Nav items and rows are `href`/`Link`s, and active state derives from the URL.
- Keep this behavior identical everywhere the secondary nav is used.

## Data shape

```ts
type SecondaryNavItem = {
  label: string;
  href?: string;
  active?: boolean;
  onClick?: () => void;
  children?: SecondaryNavSection; // nested level, rendered inline under this item
};
type SecondaryNavSection = { title: string; items: SecondaryNavItem[] };
type SecondaryNavData = SecondaryNavSection;
```

## Reference

- `src/components/custom/secondary-nav.tsx` — component
- `src/templates/listing.tsx` — `content` override
- `src/pages/listing-secondary.tsx` — interactive, state-driven
- `src/pages/activity-type-general.tsx` — declarative, real route
