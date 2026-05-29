import { Listing } from "@/templates/listing";
import { Activity, ListChecks, Trash2, Users } from "lucide-react";

const DeleteButton = () => (
  <button
    type="button"
    aria-label="Delete"
    className="grid h-9 w-9 place-items-center rounded-xl border-2 border-transparent hover:border-foreground"
  >
    <Trash2 className="h-4 w-4" strokeWidth={2.25} />
  </button>
);

export default function Contacts() {
  return (
    <Listing
      title="Contacts"
      breadcrumbs={[
        { label: "Contact management" },
        { label: "Contacts" },
      ]}
      status=""
      actions={null}
      activeNav="marketing"
      subNav={{
        marketing: {
          title: "Contact management",
          items: [
            { icon: Users, label: "Contacts", href: "/contacts" },
            { icon: Activity, label: "Activities" },
            { icon: ListChecks, label: "Activity types" },
          ],
        },
      }}
      secondaryNav={{
        title: "Contact management",
        items: [
          { label: "Contacts", href: "/contacts", active: true },
          { label: "Activities" },
          { label: "Activity types" },
        ],
      }}
      columns={[
        { label: "First name" },
        { label: "Last name", sorted: "asc" },
        { label: "Email address" },
        { label: "Email bounces" },
        { label: "Country" },
        { label: "Created" },
        { label: "Actions", cellAlign: "right" },
      ]}
      rows={[
        {
          id: 1,
          cells: [
            "",
            "Anonymous - 2026-05-29 06:28:10.526",
            "-",
            "",
            "",
            "05/29/2026 8:28 AM",
            <DeleteButton />,
          ],
        },
        {
          id: 2,
          cells: [
            "",
            "Anonymous - 2026-05-29 07:16:35.368",
            "-",
            "",
            "",
            "05/29/2026 9:16 AM",
            <DeleteButton />,
          ],
        },
      ]}
    />
  );
}
