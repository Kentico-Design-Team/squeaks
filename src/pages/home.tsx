import { Link } from "react-router";
import { Shell } from "@/templates/shell";

const TEMPLATES: { path: string; name: string; desc: string }[] = [
  {
    path: "/listing-full-width",
    name: "Listing — full width",
    desc: "Listing template with callout, primary action, filters & pagination",
  },
  {
    path: "/listing-secondary",
    name: "Listing — secondary menu",
    desc: "Same listing with a left section-title secondary menu",
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
    path: "/pages",
    name: "Pages editor",
    desc: "Page tree + canvas + right tab rail",
  },
  {
    path: "/emails",
    name: "Emails editor",
    desc: "Email tree + canvas + email tab rail",
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
];

export default function Home() {
  return (
    <Shell
      breadcrumbs={[{ label: "Templates" }]}
      status=""
      actions={null}
      activeNav="content"
    >
      <div className="mx-auto max-w-3xl space-y-6 py-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Layout templates</h1>
          <p>
            Reusable wireframe layouts in <code>src/templates/</code>. Edit a
            template and every page that uses it updates. Pick one to preview:
          </p>
        </div>

        <ul className="grid gap-3 sm:grid-cols-2">
          {TEMPLATES.map((t) => (
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
      </div>
    </Shell>
  );
}
