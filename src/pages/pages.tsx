import { Editor } from "@/templates/editor";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  Eye,
  FileText,
  FlaskConical,
  LayoutGrid,
  Link as LinkIcon,
  Link2,
  Settings,
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

export default function Pages() {
  return (
    <Editor
      workspace="Dancing Goat"
      activeNav="marketing"
      status="Saved"
      actions={Actions}
      breadcrumbs={[
        { label: "Dancing Goat Pages" },
        { label: "Coffee samples" },
        { label: "Coffee 101 - Lesson 1" },
      ]}
      newLabel="NEW PAGE"
      tabs={[
        { icon: Eye, label: "Preview" },
        { icon: FileText, label: "Content", active: true },
        { icon: LayoutGrid, label: "Page Builder" },
        { icon: FlaskConical, label: "Experiment" },
        { icon: LinkIcon, label: "Used in" },
        { icon: Link2, label: "URLs" },
        { icon: Settings, label: "Properties" },
      ]}
    />
  );
}
