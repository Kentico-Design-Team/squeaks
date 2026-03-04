# Squeaks

Lo-fi prototyping with Claude Code. Describe an idea, get a navigable wireframe.

<!-- TODO: add screenshot -->

## Why

You don't need Figma to validate an idea. You don't need pixel-perfect designs to test a flow. You need something you can click through and say "yes, this is the right direction" or "no, let's try something else."

Squeaks is a starter kit for building lo-fi, navigable prototypes using Claude Code. Describe what you want — in plain text, ASCII wireframes, or a rough sketch — and Claude turns it into a real page you can click through in your browser. Everything stays black and white, uses a hand-drawn font, and looks intentionally unfinished so nobody mistakes it for a real product.

## How it works

1. Open this project with Claude Code
2. Describe a screen or paste an ASCII wireframe
3. Claude creates the page and wires up the route
4. Click through it in your browser, then iterate

Want to compare two approaches? Ask Claude to create `/v1/dashboard` and `/v2/dashboard` — then click between them.

## Getting started

```bash
# Clone the starter kit
git clone https://github.com/growthxai/squeaks.git my-prototype
cd my-prototype

# Install dependencies
yarn install

# Start the dev server
yarn dev
```

Open http://localhost:5173 and start prompting Claude.

## Example prompts

**From a description:**

> "Create a dashboard page with a sidebar nav, a header showing the project name, and a main area with 4 stat cards and a table of recent activity"

**From an ASCII wireframe:**

```
> "Build this as a page at /onboarding"
>
> +----------------------------------+
> |  Logo         Step 1 of 3        |
> +----------------------------------+
> |                                  |
> |   What's your company name?      |
> |   [________________________]     |
> |                                  |
> |   How many employees?            |
> |   ( ) 1-10                       |
> |   ( ) 11-50                      |
> |   ( ) 50+                        |
> |                                  |
> |          [Next →]                |
> +----------------------------------+
```

**Iterating on versions:**

> "Create a /v2/dashboard that uses a top nav instead of a sidebar, and puts the stats in a horizontal bar above the table"

## What's included

- **Vite + React 19 + TypeScript** — fast dev server, instant HMR
- **React Router** — client-side routing, no backend needed
- **Tailwind CSS v4** — utility-first styling
- **All Shadcn UI components** — buttons, cards, tables, dialogs, forms, etc.
- **Comic Neue font** — hand-drawn feel that says "this is a mockup"
- **Monochrome theme** — black, white, and grays only. No color distractions
- **Thick 2px borders** — wireframe aesthetic
- **No animations** — transitions and animations are disabled globally

## Project structure

```
src/
├── main.tsx                 # Routes — add new pages here
├── layout.tsx               # Shared nav + layout wrapper
├── app.css                  # Tailwind config + theme
├── pages/                   # Your prototype pages
│   └── home.tsx
├── components/
│   └── ui/                  # Shadcn components (don't modify)
├── hooks/                   # React hooks
└── lib/
    └── utils.ts             # cn() helper for class merging
```

## Adding pages

1. Create a component in `src/pages/`:

```tsx
// src/pages/dashboard.tsx
export default function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      {/* your wireframe here */}
    </div>
  );
}
```

2. Add a route in `src/main.tsx`:

```tsx
import Dashboard from "./pages/dashboard";

// Inside <Routes>
<Route path="/dashboard" element={<Dashboard />} />;
```

## Versioning ideas

Use URL prefixes to compare different approaches side by side:

```
/v1/dashboard    ← sidebar layout
/v2/dashboard    ← top nav layout
/v3/dashboard    ← minimal layout
```

Organize files to match:

```
src/pages/
├── v1/
│   └── dashboard.tsx
├── v2/
│   └── dashboard.tsx
└── v3/
    └── dashboard.tsx
```

When you're happy with a direction, promote it to the root route and delete the rest.

## License

MIT
