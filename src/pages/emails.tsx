import { Editor } from "@/templates/editor";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  BarChart,
  ChevronDown,
  Eye,
  FileText,
  LayoutGrid,
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
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            aria-label="Publish options"
            className="h-10 rounded-l-none rounded-r-full border-l-2 border-l-white px-2"
          >
            <ChevronDown className="h-4 w-4" strokeWidth={2.5} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          <DropdownMenuItem>Schedule publish…</DropdownMenuItem>
          <DropdownMenuItem>Save as draft</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
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
