import { Link, useParams } from "react-router";
import { Listing, StatusBadge, TagBadge } from "@/templates/listing";
import type { SecondaryNavData } from "@/components/custom/secondary-nav";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";

const RowActions = () => (
  <div className="flex items-center justify-end gap-1">
    <button
      type="button"
      aria-label="Edit"
      className="grid h-9 w-9 place-items-center rounded-xl border-2 border-transparent hover:border-foreground"
    >
      <Pencil className="h-4 w-4" strokeWidth={2.25} />
    </button>
    <button
      type="button"
      aria-label="Delete"
      className="grid h-9 w-9 place-items-center rounded-xl border-2 border-transparent hover:border-foreground"
    >
      <Trash2 className="h-4 w-4" strokeWidth={2.25} />
    </button>
    <button
      type="button"
      aria-label="More"
      className="grid h-9 w-9 place-items-center rounded-xl border-2 border-transparent hover:border-foreground"
    >
      <MoreHorizontal className="h-4 w-4" strokeWidth={2.25} />
    </button>
  </div>
);

const EMAILS = [
  "mvonderlin@kentico.com",
  "lschuster@kentico.com",
  "phayes@kentico.com",
  "bcarroll@kentico.com",
  "twheeler@kentico.com",
  "rmccoy@kentico.com",
];

const COL_A = ["Tellus", "Faucibus", "Dapibus", "Consequat", "Lobortis", "Aliquam"];
const COL_B = ["Augue", "Nec", "Malesuada", "Id", "Praesent", "Vitae"];
const COL_C = ["Neque", "Aliquam", "Integer", "Tortor", "Cras", "Lectus"];

const TABS = [
  { slug: "overview", label: "Overview" },
  { slug: "general", label: "General" },
  { slug: "settings", label: "Settings" },
];

const BASE = "/listing-secondary";

export default function ListingSecondary() {
  // Drill state comes from the URL, so every page/sub-page is reflected there
  // (shareable links, working back button):
  //   /listing-secondary                 → the "Item 1" table
  //   /listing-secondary/3/overview      → object #3, Overview sub-page
  const { itemId, tab } = useParams();
  const openedId = itemId ? Number(itemId) : null;
  const opened =
    openedId && EMAILS[openedId - 1] ? EMAILS[openedId - 1] : null;
  const activeTab = TABS.find((t) => t.slug === tab) ?? TABS[0];

  const nav: SecondaryNavData = {
    title: "Section title",
    items: [
      {
        label: "Item 1",
        href: BASE,
        active: !opened,
        children: opened
          ? {
              title: opened,
              items: TABS.map((t) => ({
                label: t.label,
                href: `${BASE}/${openedId}/${t.slug}`,
                active: t.slug === activeTab.slug,
              })),
            }
          : undefined,
      },
      { label: "Item 2" },
      { label: "Item 3" },
      { label: "Item 4" },
    ],
  };

  // The body swaps with the navigation: the table is the "Item 1" page; opening
  // a row (or switching sub-tabs) shows that object's own page content instead.
  const body = opened ? (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold">{activeTab.label}</h1>
      <div className="grid min-h-96 place-items-center rounded-xl border-2 border-black text-muted-foreground">
        {activeTab.label} content
      </div>
    </div>
  ) : undefined;

  const breadcrumbs = opened
    ? [
        { label: "Listing" },
        { label: "Secondary menu" },
        { label: "Item 1" },
        { label: opened },
        { label: activeTab.label },
      ]
    : [{ label: "Listing" }, { label: "Secondary menu" }];

  return (
    <Listing
      title="Heading"
      heading="Heading"
      breadcrumbs={breadcrumbs}
      status=""
      actions={null}
      activeNav="content"
      searchPlaceholder="Search"
      secondaryNav={nav}
      content={body}
      callout={{
        label: "Friendly warning",
        headline: "Headline (optional)",
        body: "Body (mandatory)",
      }}
      primaryAction={{ label: "PRIMARY ACTION" }}
      showFilter
      appliedFilters={[
        "Content type: Article, Cafe, Image, Event, Blog post…",
        "Status: Published",
      ]}
      selectable
      columns={[
        { label: "Default column" },
        { label: "Default column" },
        { label: "Default column" },
        { label: "Default column" },
        { label: "Status" },
        { label: "Default column" },
        { label: "Actions", cellAlign: "right" },
      ]}
      rows={EMAILS.map((email, i) => ({
        id: i + 1,
        cells: [
          <Link
            to={`${BASE}/${i + 1}/overview`}
            className="text-left font-bold hover:underline"
          >
            {email}
          </Link>,
          COL_A[i],
          COL_B[i],
          COL_C[i],
          <StatusBadge />,
          <TagBadge />,
          <RowActions />,
        ],
      }))}
      pagination={{
        totalItems: 330,
        pages: [1, "…", 354, 355, 356, 357, "…", 8169],
        current: 356,
        perPage: 200,
        perPageOptions: [25, 50, 100, 200],
      }}
    />
  );
}
