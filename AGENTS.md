# Squeaks — Claude Code Guide

## What this project is

A lo-fi prototyping tool. Users describe ideas (plain text, ASCII wireframes, screenshots) and you turn them into navigable wireframe pages. Think napkin sketches in the browser — not production UI.

**The goal is speed and clarity, not polish.**

## Stack

Vite + React 19 + TypeScript + React Router + Tailwind CSS v4 + Shadcn UI

No backend. No database. No API calls. Everything is frontend-only with static placeholder data.

## Core rules

- **Monochrome only** — black, white. No greys, no colors unless the user explicitly asks
- **Comic Neue font** — don't change it. It signals "this is a mockup"
- **Use Shadcn UI components** from `@/components/ui/` — don't install new UI libraries
- **Don't modify `src/components/ui/`** — these are Shadcn defaults
- **Placeholder data only** — use realistic fake data (names, numbers, dates), not "Lorem ipsum"
- **No real functionality** — no API calls, no auth, no databases, no localStorage persistence
- **No animations** — transitions and animations are disabled globally in CSS
- **Keep it simple** — flat components, minimal abstraction, no over-engineering

## File conventions

- **kebab-case** for all filenames: `project-dashboard.tsx`, not `ProjectDashboard.tsx`
- **Pages** go in `src/pages/` (or `src/pages/v1/`, `src/pages/v2/` for versions)
- **Routes** are defined in `src/main.tsx`
- **Shared components** (non-Shadcn) go in `src/components/`
- **Layout and nav** live in `src/layout.tsx`
- Use `@/` import alias for all project imports

## Routing

Use React Router (`react-router`). All routing is client-side.

**When adding a new page, always:**

1. Create the page component in `src/pages/`
2. Add the route in `src/main.tsx`
3. Add a nav link in `src/layout.tsx` if it's a top-level page

**Version pattern** — users often want to compare approaches:

```
/dashboard       ← version 1
/dashboard-v2    ← version 2 with different layout
```

Organize versioned pages in matching folders:

```
src/pages/
└── dashboard/
    └── dashboard.tsx
    └── dashboard-v2.tsx
```

## When the user shares a wireframe or idea

1. Create the page component in `src/pages/`
2. Add the route to `src/main.tsx`
3. Build the layout using Shadcn components (Card, Table, Button, Input, Tabs, etc.)
4. Use realistic placeholder text and data — real-sounding names, plausible numbers
5. Prioritize layout structure and information hierarchy over detail
6. Make interactive elements look clickable but they don't need to do anything
7. If the wireframe implies navigation between pages, create all the pages and link them

## What NOT to do

- Don't add colors, gradients, brand colors, or themes
- Don't install new npm packages unless absolutely necessary
- Don't build real functionality (forms that submit, data that persists, APIs)
- Don't create abstractions for one-off pages — copy-paste is fine for prototypes
- Don't add loading states, error boundaries, or edge case handling
- Don't add comments explaining obvious layout code
- Don't refactor or "clean up" prototype pages unless asked

## Templates & custom components

- **Layout templates** live in `src/templates/` — e.g. `shell` (app chrome — sidebar, top bar, AIRA rail), `listing`, `editor`. Check the folder for the full set. Build pages by wrapping content in a template; editing a template propagates to every page using it.
- **Custom (non-Shadcn) components** go in `src/components/custom/` — never in `src/components/ui/`.

## Design patterns

Explicitly-specified patterns and corrections are documented in `docs/patterns/` — one file per pattern, grouped by category, indexed in `docs/patterns/README.md`. Check the folder before re-implementing a pattern (e.g. secondary navigation drill-down).

**Whenever the user describes a new pattern, rule, or correction, document it there right away** — create or update the relevant file and add it to the README index — without waiting to be asked. Keep entries terse and record only specified rules, never an auto-catalog of the code.

## Available Shadcn components

All standard Shadcn UI components are installed and available at `@/components/ui/`:

Accordion, Alert, AlertDialog, AspectRatio, Avatar, Badge, Breadcrumb, Button, Calendar, Card, Carousel, Chart, Checkbox, Collapsible, Command, ContextMenu, Dialog, Drawer, DropdownMenu, Form, HoverCard, Input, InputOTP, Label, Menubar, NavigationMenu, Pagination, Popover, Progress, RadioGroup, Resizable, ScrollArea, Select, Separator, Sheet, Sidebar, Skeleton, Slider, Sonner, Switch, Table, Tabs, Textarea, Toast, Toggle, ToggleGroup, Tooltip

## Package manager

Use `npm`.

## Dev server

```bash
npm run dev     # Start at http://localhost:5173
npm run build   # Production build
```
