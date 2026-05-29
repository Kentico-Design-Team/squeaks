import { Link } from "react-router";
import { Listing } from "@/templates/listing";
import { Activity, ListChecks, MoreHorizontal, Pencil, Trash2, Users } from "lucide-react";

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

const TYPES = [
  "Click",
  "Custom activity",
  "Data input",
  "Email click",
  "Form submission",
  "Landing page",
  "Member registration",
  "Page visit",
];

export default function ActivityTypes() {
  return (
    <Listing
      title="Activity types"
      heading="Activity types"
      breadcrumbs={[{ label: "Contact management" }, { label: "Activity types" }]}
      status=""
      actions={null}
      activeNav="marketing"
      subNav={{
        marketing: {
          title: "Contact management",
          items: [
            { icon: Users, label: "Contacts", href: "/contacts" },
            { icon: Activity, label: "Activities" },
            { icon: ListChecks, label: "Activity types", href: "/activity-types" },
          ],
        },
      }}
      searchPlaceholder="Search"
      primaryAction={{ label: "NEW ACTIVITY TYPE" }}
      secondaryNav={{
        title: "Contact management",
        items: [
          { label: "Contacts", href: "/contacts" },
          { label: "Activities" },
          { label: "Activity types", href: "/activity-types", active: true },
        ],
      }}
      columns={[
        { label: "Activity type name" },
        { label: "Actions", cellAlign: "right" },
      ]}
      rows={TYPES.map((name, i) => ({
        id: i + 1,
        cells: [
          <Link
            to={name === "Click" ? "/activity-types/click" : "#"}
            className="font-bold hover:underline"
          >
            {name}
          </Link>,
          <RowActions />,
        ],
      }))}
    />
  );
}
