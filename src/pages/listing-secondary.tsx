import { useParams } from "react-router";
import { Overview } from "@/templates/overview";
import type { SecondaryNavData } from "@/components/custom/secondary-nav";

const TABS = [
  { slug: "overview", label: "Overview" },
  { slug: "general", label: "General" },
  { slug: "settings", label: "Settings" },
];

const BASE = "/listing-secondary";

export default function ListingSecondary() {
  // Drill state comes from the URL, so every page/sub-page is reflected there
  // (shareable links, working back button):
  //   /listing-secondary                 → the "Item 1" page
  //   /listing-secondary/3/overview      → object #3, Overview sub-page
  const { itemId, tab } = useParams();
  const openedId = itemId ? Number(itemId) : null;
  const opened = openedId ? `Item ${openedId}` : null;
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

  // The body swaps with the navigation: the default page is "Item 1"; opening a
  // sub-tab shows that object's own page content instead.
  const body = opened ? (
    <div className="grid h-full min-h-80 place-items-center text-muted-foreground">
      {activeTab.label} content
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
    <Overview
      title={opened ? activeTab.label : "Heading"}
      breadcrumbs={breadcrumbs}
      status=""
      actions={null}
      activeNav="content"
      secondaryNav={nav}
      callout={{
        label: "Friendly warning",
        title: "Headline (optional)",
        body: "Body (mandatory)",
      }}
      primaryActionLabel="PRIMARY ACTION"
    >
      {body}
    </Overview>
  );
}
