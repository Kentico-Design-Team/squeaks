import { Listing } from "@/templates/listing";
import type { SecondaryNavData } from "@/components/custom/secondary-nav";

// Four levels of inline drill-down nesting, mirroring the reference mockup:
// each opened item nests its own bordered section directly beneath it, and the
// highlighted item is always the deepest current page.
const nav: SecondaryNavData = {
  title: "Section title",
  items: [
    {
      label: "Item 1",
      children: {
        title: "Section title",
        items: [
          {
            label: "Item 1",
            children: {
              title: "Section title",
              items: [
                {
                  label: "Item 1",
                  children: {
                    title: "Section title",
                    items: [
                      { label: "Item 1", active: true },
                      { label: "Item 2" },
                      { label: "Item 3" },
                      { label: "Item 4" },
                      { label: "Item 5" },
                      { label: "Item 6" },
                      { label: "Item 7" },
                      { label: "Item 8" },
                    ],
                  },
                },
                { label: "Item 2" },
                { label: "Item 3" },
              ],
            },
          },
          { label: "Item 2" },
          { label: "Item 3" },
        ],
      },
    },
    { label: "Item 2" },
    { label: "Item 3" },
  ],
};

export default function SecondaryNavShowcase() {
  return (
    <Listing
      title="Secondary navigation"
      activeNav="content"
      breadcrumbs={[
        { label: "Item 1" },
        { label: "Item 1" },
        { label: "Item 1" },
        { label: "Item 1" },
      ]}
      columns={[]}
      rows={[]}
      secondaryNav={nav}
      content={
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Item 1</h1>
          <p className="text-muted-foreground">
            Four levels deep. Each opened item nests its own bordered section
            directly beneath it; the highlighted item is the deepest current
            page.
          </p>
        </div>
      }
    />
  );
}
