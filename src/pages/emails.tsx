import { Editor } from "@/templates/editor";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  ChevronDown,
  Eye,
  FileText,
  LayoutGrid,
  Mail,
  Menu,
  Users,
} from "lucide-react";

const Actions = (
  <>
    <Button
      variant="outline"
      className="h-10 rounded-full px-6 text-xs font-bold tracking-wide"
    >
      SAVE
    </Button>
    <div className="flex">
      <Button className="h-10 rounded-l-full rounded-r-none px-6 text-xs font-bold tracking-wide">
        PUBLISH
      </Button>
      <Button
        aria-label="Publish options"
        className="-ml-0.5 h-10 rounded-l-none rounded-r-full px-2"
      >
        <ChevronDown className="h-4 w-4" strokeWidth={2.5} />
      </Button>
    </div>
  </>
);

export default function Emails() {
  return (
    <Editor
      workspace="Dancing Goat"
      activeNav="marketing"
      status="Saved"
      actions={Actions}
      breadcrumbs={[
        { label: "Dancing Goat Emails" },
        { label: "Newsletters" },
        { label: "Spring Coffee Sale" },
      ]}
      newLabel="NEW EMAIL"
      treeItems={[
        {
          label: "Root",
          icon: Mail,
          expanded: true,
          children: [
            { label: "Welcome series", children: [] },
            { label: "Spring Coffee Sale", icon: Mail, active: true, published: true },
            { label: "Monthly newsletter", icon: Mail, published: true },
            { label: "Abandoned cart", icon: Mail },
            { label: "Order confirmation", icon: Mail, published: true },
            { label: "Promotions", children: [] },
            { label: "Re-engagement", children: [] },
            { label: "Archive", children: [] },
          ],
        },
      ]}
      tabs={[
        { icon: Eye, label: "Preview" },
        { icon: FileText, label: "Content", active: true },
        { icon: LayoutGrid, label: "Email Builder" },
        { icon: BarChart, label: "Statistics" },
        { icon: Users, label: "Contact activities" },
        { icon: Menu, label: "Menu Item" },
        { icon: Menu, label: "Menu Item" },
      ]}
    />
  );
}
