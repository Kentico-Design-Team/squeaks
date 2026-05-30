import { Editor, type EditorContentContext } from "@/templates/editor";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bell,
  Bold,
  Calendar,
  Check,
  ChevronDown,
  Code,
  Eye,
  FileText,
  FlaskConical,
  Folder,
  House,
  Image as ImageIcon,
  IndentDecrease,
  IndentIncrease,
  Italic,
  LayoutGrid,
  Link as LinkIcon,
  Link2,
  List,
  ListOrdered,
  MessageSquare,
  Pencil,
  Pilcrow,
  Redo2,
  Settings,
  SquareArrowOutUpRight,
  Underline,
  Undo2,
  X,
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
        CHANGE WORKFLOW STEP
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            aria-label="Workflow options"
            className="h-10 rounded-l-none rounded-r-full border-l-2 border-l-white px-2"
          >
            <ChevronDown className="h-4 w-4" strokeWidth={2.5} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          <DropdownMenuItem>Approve</DropdownMenuItem>
          <DropdownMenuItem>Reject</DropdownMenuItem>
          <DropdownMenuItem>Reassign…</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </>
);

function FieldLabel({
  children,
  required,
}: {
  children: string;
  required?: boolean;
}) {
  return (
    <span className="text-sm font-bold">
      {required && <span aria-hidden>*</span>}
      {children}
    </span>
  );
}

const TOOLBAR = [
  [Bold, Italic, Underline, Pilcrow],
  [ListOrdered, List, IndentIncrease, IndentDecrease],
  [AlignLeft, AlignCenter, AlignRight],
  [Code, ImageIcon, LinkIcon],
  [Undo2, Redo2],
];

function ContentTab({ page }: EditorContentContext) {
  const title = page?.label ?? "Untitled page";
  return (
    <div className="flex flex-col gap-6 px-[17%] pt-16 pb-8">
      {/* Page heading */}
      <div className="flex items-center gap-2">
        <h1 className="text-base font-bold">{title}</h1>
        <button type="button" aria-label="Rename">
          <Pencil className="h-4 w-4" strokeWidth={2.25} />
        </button>
      </div>

      {/* Title */}
      <label className="block space-y-1">
        <FieldLabel required>Title</FieldLabel>
        <Input defaultValue={title} className="h-10 rounded-full px-5" />
      </label>

      {/* Publish date */}
      <label className="block space-y-1">
        <FieldLabel required>Publish date</FieldLabel>
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Input defaultValue="9/9/2023" className="h-10 rounded-full pl-5 pr-12" />
            <Calendar
              className="absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2"
              strokeWidth={2.25}
            />
          </div>
          <button type="button" className="text-xs font-bold tracking-wide">
            TODAY
          </button>
        </div>
      </label>

      {/* Teaser */}
      <div className="space-y-1">
        <FieldLabel>Teaser</FieldLabel>
        <div className="space-y-4 rounded-[20px] border-2 border-black p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                className="h-10 rounded-full px-6 text-xs font-bold tracking-wide"
              >
                SELECT CONTENT ITEM
              </Button>
              <span className="text-sm">or</span>
              <Button
                variant="outline"
                className="h-10 rounded-full px-6 text-xs font-bold tracking-wide"
              >
                CREATE NEW
              </Button>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                aria-label="Grid view"
                className="grid h-8 w-8 place-items-center rounded-xl bg-black text-white"
              >
                <LayoutGrid className="h-4 w-4" strokeWidth={2.25} />
              </button>
              <button
                type="button"
                aria-label="List view"
                className="grid h-8 w-8 place-items-center rounded-xl"
              >
                <List className="h-4 w-4" strokeWidth={2.25} />
              </button>
            </div>
          </div>

          {/* Selected item card */}
          <div className="w-72 rounded-xl border-2 border-black p-2">
            <div className="relative">
              <div className="grid h-40 place-items-center rounded-lg border-2 border-black">
                <ImageIcon className="h-10 w-10" strokeWidth={1.75} />
              </div>
              <div className="absolute top-2 right-2 flex gap-1">
                <button
                  type="button"
                  aria-label="Open"
                  className="grid h-7 w-7 place-items-center rounded-lg border-2 border-black bg-background"
                >
                  <SquareArrowOutUpRight className="h-3.5 w-3.5" strokeWidth={2.25} />
                </button>
                <button
                  type="button"
                  aria-label="Remove"
                  className="grid h-7 w-7 place-items-center rounded-lg border-2 border-black bg-background"
                >
                  <X className="h-3.5 w-3.5" strokeWidth={2.25} />
                </button>
              </div>
            </div>
            <div className="mt-2 space-y-1">
              <div className="font-bold">Image</div>
              <div className="flex items-center gap-1.5 text-sm">
                <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full border-2 border-black">
                  <Check className="h-2.5 w-2.5" strokeWidth={3} />
                </span>
                <span className="truncate">(Articles) article-5@2x.jpg</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary */}
      <label className="block space-y-1">
        <FieldLabel required>Summary</FieldLabel>
        <Textarea
          defaultValue="Learn about the techniques of processing the products of coffee plants. Different methods are used in different parts of the world depending mainly on their weather conditions."
          className="min-h-24 rounded-[20px]"
        />
      </label>

      {/* Text — rich text editor */}
      <div className="space-y-1">
        <FieldLabel required>Text</FieldLabel>
        <div className="rounded-[20px] border-2 border-black">
          <div className="flex flex-wrap items-center gap-1 border-b-2 border-black p-2">
            {TOOLBAR.map((group, gi) => (
              <div key={gi} className="flex items-center gap-1">
                {gi > 0 && <span className="mx-1 h-5 w-px bg-black" />}
                {group.map((Icon, i) => (
                  <button
                    key={i}
                    type="button"
                    className="grid h-8 w-8 place-items-center rounded-lg"
                  >
                    <Icon className="h-4 w-4" strokeWidth={2.25} />
                  </button>
                ))}
              </div>
            ))}
          </div>
          <div className="space-y-4 p-4">
            <p>
              Before a ripe coffee plant transforms into a delicious cup lying on
              your table, it undergoes quite a journey. A journey full of possible
              pitfalls, which can, usually negatively, influence the coffee&apos;s
              final taste. What goes wrong at the very beginning cannot be made up
              for at the very end.
            </p>
            <p>
              The character and taste of a coffee are largely influenced by its
              origin, climate, the quality and type of soil and the botanical
              varieties of the coffee plant.
            </p>
            <p>
              The last two links of the chain—the roastery and the barista—cannot,
              in any way, improve the taste of the coffee. They are left with the
              difficult task of making the most its potential.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CommentsPanel() {
  return (
    <div className="space-y-6">
      <p className="text-muted-foreground">
        Leave notes for your teammates about this page. Comments are only visible
        in the editor and never published.
      </p>
      <div className="space-y-1">
        <FieldLabel>New comment</FieldLabel>
        <Textarea
          placeholder="Write a comment…"
          className="min-h-24 rounded-[20px]"
        />
      </div>
      <Button className="h-10 rounded-full px-6 text-xs font-bold tracking-wide">
        ADD COMMENT
      </Button>
    </div>
  );
}

function RemindersPanel() {
  return (
    <div className="space-y-6">
      <p className="text-muted-foreground">
        Schedule a reminder to revisit this page — for a content refresh, a
        seasonal update, or a fact check.
      </p>
      <label className="block space-y-1">
        <FieldLabel>Remind me on</FieldLabel>
        <div className="relative">
          <Input defaultValue="6/30/2026" className="h-10 rounded-full pl-5 pr-12" />
          <Calendar
            className="absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2"
            strokeWidth={2.25}
          />
        </div>
      </label>
      <label className="block space-y-1">
        <FieldLabel>Note</FieldLabel>
        <Textarea
          placeholder="What should be checked?"
          className="min-h-20 rounded-[20px]"
        />
      </label>
    </div>
  );
}

const PAGES_TREE = [
  {
    label: "Dancing Goat Pages",
    icon: Folder,
    expanded: true,
    children: [
      { label: "Home", slug: "home", icon: House, published: true },
      {
        label: "Articles",
        icon: Folder,
        published: true,
        expanded: true,
        children: [
          {
            label: "Coffee processing techniques",
            slug: "coffee-processing-techniques",
            icon: FileText,
            published: true,
          },
          {
            label: "Coffee Beverages Explained",
            slug: "coffee-beverages-explained",
            icon: FileText,
            published: true,
          },
          { label: "Donate with us", slug: "donate-with-us", icon: FileText, published: true },
          { label: "On Roasts", slug: "on-roasts", icon: FileText, published: true },
          {
            label: "Origins of Arabica Bourbon",
            slug: "origins-of-arabica-bourbon",
            icon: FileText,
            published: true,
          },
          {
            label: "The Resilient Robusta: A Closer Look",
            slug: "the-resilient-robusta",
            icon: FileText,
          },
          {
            label: "Which brewing fits you?",
            slug: "which-brewing-fits-you",
            icon: FileText,
            published: true,
          },
        ],
      },
      { label: "Products", icon: Folder, published: true, children: [] },
      { label: "Contacts", slug: "contacts", icon: FileText, published: true },
      { label: "Store", icon: Folder, published: true, children: [] },
      { label: "Landing pages", icon: Folder, children: [] },
      { label: "Specials", icon: Folder, children: [] },
      { label: "Navigation menu", icon: Folder, children: [] },
    ],
  },
];

export default function Pages() {
  return (
    <Editor
      basePath="/pages"
      workspace="Dancing Goat"
      activeNav="marketing"
      status="Draft (New version)"
      actions={Actions}
      breadcrumbs={[{ label: "Dancing Goat Pages" }]}
      newLabel="NEW PAGE"
      treeItems={PAGES_TREE}
      tabs={[
        { icon: Eye, slug: "preview", label: "Preview" },
        {
          icon: FileText,
          slug: "content",
          label: "Content",
          content: ContentTab,
          ownHeading: true,
          sideMenu: [
            { icon: MessageSquare, slug: "comments", label: "Comments", content: <CommentsPanel /> },
            { icon: Bell, slug: "reminders", label: "Reminders", content: <RemindersPanel /> },
          ],
        },
        { icon: LayoutGrid, slug: "page-builder", label: "Page Builder" },
        { icon: FlaskConical, slug: "experiment", label: "Experiment" },
        { icon: LinkIcon, slug: "used-in", label: "Used in" },
        { icon: Link2, slug: "urls", label: "URLs" },
        { icon: Settings, slug: "properties", label: "Properties" },
      ]}
    />
  );
}
