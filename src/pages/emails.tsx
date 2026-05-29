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
      basePath="/emails"
      workspace="Dancing Goat"
      activeNav="marketing"
      status="Saved"
      actions={Actions}
      breadcrumbs={[{ label: "Dancing Goat Emails" }]}
      newLabel="NEW EMAIL"
      treeItems={[
        {
          label: "Root",
          icon: Mail,
          expanded: true,
          children: [
            { label: "Welcome series", children: [] },
            { label: "Spring Coffee Sale", slug: "spring-coffee-sale", icon: Mail, published: true },
            { label: "Monthly newsletter", slug: "monthly-newsletter", icon: Mail, published: true },
            { label: "Abandoned cart", slug: "abandoned-cart", icon: Mail },
            { label: "Order confirmation", slug: "order-confirmation", icon: Mail, published: true },
            { label: "Promotions", children: [] },
            { label: "Re-engagement", children: [] },
            { label: "Archive", children: [] },
          ],
        },
      ]}
      tabs={[
        { icon: Eye, slug: "preview", label: "Preview" },
        { icon: FileText, slug: "content", label: "Content" },
        { icon: LayoutGrid, slug: "email-builder", label: "Email Builder" },
        { icon: BarChart, slug: "statistics", label: "Statistics" },
        { icon: Users, slug: "contact-activities", label: "Contact activities" },
        { icon: Menu, slug: "menu-item-1", label: "Menu Item" },
        { icon: Menu, slug: "menu-item-2", label: "Menu Item" },
      ]}
    />
  );
}
