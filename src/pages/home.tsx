import { Link } from "react-router";
import { Shell } from "@/templates/shell";

type Entry = { path: string; name: string; desc: string };

// One entry per layout template in src/templates/ (shell is the chrome
// wrapper, not previewed on its own). Each links to a representative page.
const TEMPLATES: Entry[] = [
  {
    path: "/listing-full-width",
    name: "Listing",
    desc: "Listing template with callout, primary action, filters & pagination",
  },
  {
    path: "/content-hub",
    name: "Content hub",
    desc: "Folder tree navigator + listing table",
  },
  {
    path: "/overview",
    name: "Overview",
    desc: "Secondary menu + quick-tip callout + content region",
  },
  {
    path: "/pages/coffee-processing-techniques/content",
    name: "Editor",
    desc: "Tree + canvas + right view menu (URL-driven)",
  },
  {
    path: "/edit-form",
    name: "Edit form",
    desc: "Drill-down secondary nav + record edit form (max 66.66% wide)",
  },
];

// Standalone pages built on an existing template, not a template preview.
const PAGES: Entry[] = [
  {
    path: "/listing-secondary",
    name: "Listing — secondary menu",
    desc: "Listing with a left section-title secondary menu",
  },
  {
    path: "/emails",
    name: "Emails editor",
    desc: "Editor template with no tree — just the email view-menu rail",
  },
  {
    path: "/contacts",
    name: "Contacts",
    desc: "Listing example",
  },
  {
    path: "/activity-types",
    name: "Activity types",
    desc: "Drill-down secondary nav — open a row to nest deeper",
  },
  {
    path: "/secondary-nav-showcase",
    name: "Secondary nav — 4 levels deep",
    desc: "Drill-down secondary nav nested four levels, bordered boxes",
  },
  {
    path: "/bar-item",
    name: "Bar items & shelves",
    desc: "Collapsible rows with form bodies, drag handles, shelves",
  },
];

function CardGrid({ items }: { items: Entry[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map((t) => (
        <li key={t.path}>
          <Link
            to={t.path}
            className="block rounded-xl border-2 border-black p-4 hover:bg-black hover:text-white"
          >
            <div className="font-bold">{t.name}</div>
            <div className="text-sm">{t.desc}</div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function Home() {
  return (
    <Shell
      breadcrumbs={[{ label: "Templates" }]}
      status=""
      actions={null}
      activeNav="content"
    >
      <div className="mx-auto max-w-3xl space-y-10 py-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Layout templates</h1>
            <p>
              Reusable wireframe layouts in <code>src/templates/</code>. Edit a
              template and every page that uses it updates. Pick one to preview:
            </p>
          </div>
          <CardGrid items={TEMPLATES} />
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Pages</h1>
            <p>
              Standalone screens in <code>src/pages/</code>, each built on one of
              the templates above:
            </p>
          </div>
          <CardGrid items={PAGES} />
        </div>
      </div>
    </Shell>
  );
}
