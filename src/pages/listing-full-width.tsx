import { Listing, StatusBadge, TagBadge } from "@/templates/listing";
import { RowActions } from "@/components/custom/row-actions";

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
      filterFields={[
        {
          type: "checkbox",
          label: "Content type",
          options: ["Article", "Cafe", "Image", "Event", "Blog post"],
        },
        {
          type: "select",
          label: "Status",
          options: ["Published", "Draft", "Scheduled", "Unpublished"],
        },
      ]}
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
        { label: "Actions", align: "right", cellAlign: "right", width: "w-24" },
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
