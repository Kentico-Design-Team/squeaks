import { Link } from "react-router";
import { Listing } from "@/templates/listing";
import { RowActions } from "@/components/custom/row-actions";
import { Activity, ListChecks, Users } from "lucide-react";

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
        { label: "Actions", align: "right", cellAlign: "right", width: "w-24" },
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
