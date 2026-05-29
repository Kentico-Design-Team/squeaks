import { EditForm } from "@/templates/edit-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Activity, ChevronDown, ListChecks, Users } from "lucide-react";

const SaveAction = (
  <Button className="h-10 rounded-full px-6 text-xs font-bold tracking-wide">
    SAVE
  </Button>
);

const Fields = (
  <>
    <div className="space-y-2">
      <label className="block font-bold">
        <span className="mr-0.5">*</span>Activity type name
      </label>
      <Input
        defaultValue="Click"
        className="h-10 rounded-full border-2 border-black px-4"
      />
    </div>

    <button type="button" className="flex items-center gap-1 font-bold">
      Identifiers
      <ChevronDown className="h-4 w-4" strokeWidth={2.25} />
    </button>

    <div className="space-y-2">
      <label className="block font-bold">Description</label>
      <Textarea
        defaultValue="The visitor performed a click on a watched page element."
        className="min-h-28 rounded-xl border-2 border-black p-4"
      />
    </div>

    <label className="flex items-center gap-2 font-bold">
      <Checkbox defaultChecked />
      Enabled
    </label>
  </>
);

export default function ActivityTypeGeneral() {
  return (
    <EditForm
      breadcrumbs={[
        { label: "Contact management" },
        { label: "Activity types", href: "/activity-types" },
        { label: "Click" },
        { label: "General" },
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
            { icon: ListChecks, label: "Activity types", href: "/activity-types" },
          ],
        },
      }}
      heading="General"
      recordTitle=""
      groupLabel=""
      formActions={SaveAction}
      // Drill-down secondary nav: the opened object "Click" nests inline
      // beneath the "Activity types" item it belongs to.
      secondaryNav={{
        title: "Contact management",
        items: [
          { label: "Contacts", href: "/contacts" },
          { label: "Activities" },
          {
            label: "Activity types",
            href: "/activity-types",
            children: {
              title: "Click",
              items: [
                {
                  label: "General",
                  href: "/activity-types/click",
                  active: true,
                },
              ],
            },
          },
        ],
      }}
      fields={Fields}
    />
  );
}
