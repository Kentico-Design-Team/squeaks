# Secondary navigation (drill-down)

Component: `@/components/custom/secondary-nav` (`SecondaryNav`). Used by the `listing` and `overview` templates via the `secondaryNav` prop.

## Rules

- One section header only (title + trailing rule). No duplicated section title, no subheadings. The page body has a single `<h1>`.
- A `children` section renders **inline directly beneath its parent item** (opening an object on the "Item 1" page inserts its section between Item 1 and Item 2), not appended at the end. Nest arbitrarily deep.
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
