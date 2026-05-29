import { Listing, StatusBadge, TagBadge } from "@/templates/listing";
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
  "mvonderlin@kentico.com",
  "mvonderlin@kentico.com",
  "mvonderlin@kentico.com",
  "mvonderlin@kentico.com",
  "mvonderlin@kentico.com",
];

const COL_A = ["Tellus", "Faucibus", "Dapibus", "Consequat", "Lobortis", "Aliquam"];
const COL_B = ["Augue", "Nec", "Malesuada", "Id", "Praesent", "Vitae"];
const COL_C = ["Neque", "Aliquam", "Integer", "Tortor", "Cras", "Lectus"];
const COL_D = [
  "Fermentum",
  "Condimentum",
  "Mollis",
  "Feugiat",
  "Placerat",
  "Posuere",
];

export default function ListingFullWidth() {
  return (
    <Listing
      title="Heading"
      heading="Heading"
      breadcrumbs={[{ label: "Listing" }, { label: "Full width" }]}
      status=""
      actions={null}
      activeNav="content"
      searchPlaceholder="Search"
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
        { label: "Default column" },
        { label: "Status" },
        { label: "Default column" },
        { label: "Actions", cellAlign: "right" },
      ]}
      rows={EMAILS.map((email, i) => ({
        id: i + 1,
        cells: [
          email,
          COL_A[i],
          COL_B[i],
          COL_C[i],
          COL_D[i],
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
