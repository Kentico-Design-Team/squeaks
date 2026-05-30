import { Listing } from "@/templates/listing";
import { RowActions } from "@/components/custom/row-actions";
import { Activity, ListChecks, Users } from "lucide-react";

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
        { label: "Actions", align: "right", cellAlign: "right", width: "w-24" },
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
            <RowActions actions={["delete"]} />,
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
            <RowActions actions={["delete"]} />,
          ],
        },
      ]}
    />
  );
}
