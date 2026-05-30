import { type ReactNode } from "react";
import { Link } from "react-router";
import { Shell, type ShellProps } from "@/templates/shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ArrowUp,
  ChevronDown,
  ChevronRight,
  Clock,
  FileEdit,
  Files,
  Filter,
  Folder,
  LayoutGrid,
  List,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  Trash2,
  TriangleAlert,
  X,
} from "lucide-react";
import { Callout } from "@/components/custom/callout";
import { useResizableTree } from "@/hooks/use-resizable-tree";
import { StatusBadge, TagBadge } from "@/templates/listing";

// Chips/filters are unified across the app — reuse the listing's components.
export { StatusBadge, TagBadge };

/* ---------------------------------- Tree --------------------------------- */

export type TreeNode = {
  label: string;
  active?: boolean;
  /** When set, the node renders an expand/collapse chevron. */
  children?: TreeNode[];
  /** Open by default (inert prototype — no real toggling). */
  open?: boolean;
};

export type TreeShortcut = {
  label: string;
  icon?: ReactNode;
  active?: boolean;
};

/* -------------------------------- Listing -------------------------------- */

export type ContentHubColumn = {
  label: string;
  sorted?: "asc" | "desc";
  align?: "left" | "center" | "right";
  cellAlign?: "left" | "center" | "right";
};

export type ContentHubRow = {
  id: string | number;
  cells: ReactNode[];
};

export type AppliedFilter = {
  label: string;
};

export type ContentHubProps = Omit<ShellProps, "children"> & {
  title?: string;
  /** Warning callout banner (rendered monochrome via the shared Callout). */
  callout?: { label?: string; headline?: string; body?: string };
  primaryAction?: string;
  searchPlaceholder?: string;
  appliedFilters?: AppliedFilter[];
  itemCount?: number;
  columns?: ContentHubColumn[];
  rows?: ContentHubRow[];
  /** Standalone shortcuts at the top (e.g. "All content items"). */
  shortcuts?: TreeShortcut[];
  /** Items under the collapsible "Smart folders" section. */
  smartFolders?: TreeShortcut[];
  /** Recursive folder tree under the "Folders" section. */
  folders?: TreeNode[];
};

// Tree navigator resize bounds. Default keeps the original 288px (w-72) width.
const TREE_DEFAULT_WIDTH = 288;
const TREE_MIN_WIDTH = 220;
const TREE_MAX_WIDTH = 480;

const TEXT_ALIGN: Record<NonNullable<ContentHubColumn["align"]>, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

const FLEX_ALIGN: Record<NonNullable<ContentHubColumn["align"]>, string> = {
  left: "justify-start",
  center: "justify-center",
  right: "justify-end",
};

/* ------------------------------- Defaults -------------------------------- */

const DEFAULT_SHORTCUTS: TreeShortcut[] = [
  {
    label: "All content items",
    icon: <Files className="h-4 w-4" strokeWidth={2.25} />,
    active: true,
  },
];

const DEFAULT_SMART_FOLDERS: TreeShortcut[] = [
  {
    label: "Content in draft",
    icon: <FileEdit className="h-4 w-4" strokeWidth={2.25} />,
  },
  {
    label: "Recently modified",
    icon: <Clock className="h-4 w-4" strokeWidth={2.25} />,
  },
];

const DEFAULT_FOLDERS: TreeNode[] = [
  { label: "News" },
  {
    label: "Articles",
    open: true,
    children: [
      { label: "Computer science" },
      { label: "Ecology" },
      {
        label: "Economics",
        open: true,
        children: [{ label: "2023" }, { label: "2024" }],
      },
    ],
  },
  { label: "Authors", children: [{ label: "Team" }] },
  { label: "Logos" },
];

const DEFAULT_COLUMNS: ContentHubColumn[] = [
  { label: "Default column", sorted: "asc" },
  { label: "Default column" },
  { label: "Default column" },
  { label: "Default column" },
  { label: "Default column" },
  { label: "Actions", cellAlign: "right" },
];

export const RowActions = () => (
  <span className="flex items-center justify-end gap-1">
    <button
      type="button"
      aria-label="More"
      className="grid h-8 w-8 place-items-center rounded-xl border-2 border-transparent hover:border-foreground"
    >
      <MoreHorizontal className="h-4 w-4" strokeWidth={2.25} />
    </button>
    <button
      type="button"
      aria-label="Delete"
      className="grid h-8 w-8 place-items-center rounded-xl border-2 border-transparent hover:border-foreground"
    >
      <Trash2 className="h-4 w-4" strokeWidth={2.25} />
    </button>
  </span>
);

const makeRow = (id: number, c1: string, c2: string, c3: string): ContentHubRow => ({
  id,
  cells: ["marekm@kentico.com", c1, c2, c3, <StatusBadge />, <RowActions />],
});

const DEFAULT_ROWS: ContentHubRow[] = [
  makeRow(1, "Tellus", "Augue", "Neque"),
  makeRow(2, "Faucibus", "Non", "Aliquam"),
  makeRow(3, "Dapibus", "Malesuada", "Integer"),
  makeRow(4, "Consequat", "Id", "Tortor"),
  makeRow(5, "Lobortis", "Praesent", "Cras"),
];

/* ----------------------------- Tree rendering ---------------------------- */

function TreeBranch({ node, depth }: { node: TreeNode; depth: number }) {
  const hasChildren = !!node.children?.length;
  const open = node.open ?? false;

  return (
    <li>
      <div
        className={`flex items-center gap-2 rounded-xl px-2 py-1.5 ${
          node.active
            ? "bg-black text-white"
            : "border-2 border-transparent hover:border-black"
        }`}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
      >
        {hasChildren ? (
          open ? (
            <ChevronDown className="h-4 w-4 shrink-0" strokeWidth={2.25} />
          ) : (
            <ChevronRight className="h-4 w-4 shrink-0" strokeWidth={2.25} />
          )
        ) : (
          <span className="h-4 w-4 shrink-0" />
        )}
        <Folder className="h-4 w-4 shrink-0" strokeWidth={2.25} />
        <span className="truncate">{node.label}</span>
      </div>

      {hasChildren && open && (
        <ul className="flex flex-col gap-1">
          {node.children!.map((child, i) => (
            <TreeBranch key={`${child.label}-${i}`} node={child} depth={depth + 1} />
          ))}
        </ul>
      )}
    </li>
  );
}

/** Collapsible section header in the left navigator (e.g. "Smart folders"). */
function TreeSection({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-between px-2 py-1.5">
      <span className="flex items-center gap-2 text-sm font-bold">
        <ChevronDown className="h-4 w-4 shrink-0" strokeWidth={2.25} />
        {label}
      </span>
      <button
        type="button"
        aria-label={`Add to ${label}`}
        className="grid h-7 w-7 place-items-center rounded-xl border-2 border-transparent hover:border-black"
      >
        <Plus className="h-4 w-4" strokeWidth={2.5} />
      </button>
    </div>
  );
}

/* -------------------------------- Template ------------------------------- */

export function ContentHub({
  title = "Heading",
  // Optional — only rendered when a page supplies it.
  callout,
  primaryAction = "PRIMARY ACTION",
  searchPlaceholder = "Search",
  appliedFilters = [
    { label: "Content type: Article, Code, Image, Event, Blog post…" },
    { label: "Status: Published" },
  ],
  itemCount = 232,
  columns = DEFAULT_COLUMNS,
  rows = DEFAULT_ROWS,
  shortcuts = DEFAULT_SHORTCUTS,
  smartFolders = DEFAULT_SMART_FOLDERS,
  folders = DEFAULT_FOLDERS,
  ...shellProps
}: ContentHubProps) {
  const { width: treeWidth, startResize } = useResizableTree({
    defaultWidth: TREE_DEFAULT_WIDTH,
    minWidth: TREE_MIN_WIDTH,
    maxWidth: TREE_MAX_WIDTH,
  });

  const shortcutClass = (active?: boolean) =>
    `flex items-center gap-2 rounded-xl px-2 py-1.5 ${
      active
        ? "bg-black text-white"
        : "border-2 border-transparent hover:border-black"
    }`;

  // fitHeight locks the page; the content column reaches into main's 24px
  // bottom padding (+16px) so the tree/listing sit 8px from the screen edge.
  return (
    <Shell {...shellProps} fitHeight>
      <div className="flex h-[calc(100%+16px)] flex-col gap-5">
        {/* Full-width header block above the tree + listing columns */}
        <h1 className="text-2xl font-bold">{title}</h1>

        {/* Callout banner */}
        {callout && (
          <Callout
            icon={TriangleAlert}
            label={callout.label}
            headline={callout.headline}
            body={callout.body}
          />
        )}

        {/* Action row: primary action + search + filter */}
        <div className="flex items-center gap-3">
          {/* Split button — primary action + a chevron segment for variants. */}
          <div className="flex shrink-0">
            <Button className="h-10 rounded-l-full rounded-r-none px-6 text-xs font-bold tracking-wide">
              {primaryAction}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  aria-label="More options"
                  className="h-10 rounded-l-none rounded-r-full border-l-2 border-l-white px-2"
                >
                  <ChevronDown className="h-4 w-4" strokeWidth={2.5} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                onCloseAutoFocus={(e) => e.preventDefault()}
              >
                <DropdownMenuItem>New folder</DropdownMenuItem>
                <DropdownMenuItem>Import…</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="relative flex-1">
            <Input
              placeholder={searchPlaceholder}
              className="h-10 rounded-full border-2 border-black pl-6 pr-12"
            />
            <Search
              className="absolute top-1/2 right-4 h-5 w-5 -translate-y-1/2"
              strokeWidth={2}
            />
          </div>
          <Button
            variant="outline"
            className="h-10 shrink-0 gap-2 rounded-full px-6 text-xs font-bold tracking-wide has-[>svg]:px-6"
          >
            <Filter className="h-4 w-4" strokeWidth={2.25} />
            FILTER
          </Button>
        </div>

        {/* Applied filters */}
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="font-bold">Applied filters</span>
          <button
            type="button"
            className="flex items-center gap-1 text-sm font-bold tracking-wide underline-offset-2 hover:underline"
          >
            <X className="h-3 w-3" strokeWidth={2.5} />
            CLEAR ALL
          </button>
          {appliedFilters.map((f) => (
            <Badge
              key={f.label}
              variant="outline"
              className="gap-1 rounded-full px-3 py-1 text-sm"
            >
              {f.label}
              <X className="h-3 w-3" strokeWidth={2.5} />
            </Badge>
          ))}
        </div>

        {/* Tree navigator (left) + listing (right) — fills the remaining
            height; the page itself never scrolls (Shell fitHeight). */}
        <div className="flex min-h-0 flex-1 gap-6">
          {/* LEFT — content tree navigator. Manually resizable (drag the right
              edge); the inner aside owns its own vertical scroll when the tree
              is taller than the viewport. */}
          <div
            className="relative shrink-0"
            style={{ width: `${treeWidth}px` }}
          >
          <aside className="h-full w-full overflow-y-auto rounded-xl border-2 border-black bg-background p-3">
            {/* Standalone shortcuts */}
            <ul className="flex flex-col gap-1">
              {shortcuts.map((s) => (
                <li key={s.label}>
                  <Link to="#" className={shortcutClass(s.active)}>
                    {s.icon}
                    <span className="truncate">{s.label}</span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="my-3 border-t-2 border-black" />

            {/* Smart folders section */}
            <TreeSection label="Smart folders" />
            <ul className="mt-1 flex flex-col gap-1">
              {smartFolders.map((s) => (
                <li key={s.label}>
                  <Link to="#" className={shortcutClass(s.active)}>
                    {s.icon}
                    <span className="truncate">{s.label}</span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="my-3 border-t-2 border-black" />

            {/* Folders section + recursive tree */}
            <TreeSection label="Folders" />
            <ul className="mt-1 flex flex-col gap-1">
              {folders.map((node, i) => (
                <TreeBranch key={`${node.label}-${i}`} node={node} depth={0} />
              ))}
            </ul>
          </aside>

            {/* Drag the right edge to resize. Mirrors the AIRA panel handle. */}
            <div
              onMouseDown={startResize}
              role="separator"
              aria-orientation="vertical"
              aria-label="Resize content tree"
              className="absolute top-0 bottom-0 right-0 z-10 w-2 translate-x-1/2 cursor-ew-resize"
            />
          </div>

          {/* RIGHT — listing area. Column layout so only the table body
              scrolls: the count row and pagination stay pinned. */}
          <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-5">
            {/* Item count + view toggles */}
            <div className="flex shrink-0 items-center justify-between">
              <span className="font-bold">{itemCount} items</span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  aria-label="Column settings"
                  className="grid h-9 w-9 place-items-center rounded-xl border-2 border-transparent hover:border-black"
                >
                  <Settings className="h-4 w-4" strokeWidth={2.25} />
                </button>
                <button
                  type="button"
                  aria-label="Grid view"
                  className="grid h-9 w-9 place-items-center rounded-xl border-2 border-transparent hover:border-black"
                >
                  <LayoutGrid className="h-4 w-4" strokeWidth={2.25} />
                </button>
                <button
                  type="button"
                  aria-label="List view"
                  className="grid h-9 w-9 place-items-center rounded-xl bg-black text-white"
                >
                  <List className="h-4 w-4" strokeWidth={2.25} />
                </button>
              </div>
            </div>

          {/* Data table — the only scroll area on the right; the header row
              stays pinned while the body scrolls under it. */}
          <Table containerClassName="min-h-0 flex-1 overflow-y-auto">
            <TableHeader className="sticky top-0 z-10 bg-background">
              <TableRow>
                <TableHead className="w-10">
                  <Checkbox aria-label="Select all" />
                </TableHead>
                {columns.map((col) => (
                  <TableHead key={col.label} className={TEXT_ALIGN[col.align ?? "left"]}>
                    <span
                      className={`flex items-center gap-1 ${FLEX_ALIGN[col.align ?? "left"]}`}
                    >
                      {col.label}
                      {col.sorted === "asc" && (
                        <ArrowUp className="h-3 w-3" strokeWidth={2.5} />
                      )}
                      {col.sorted === "desc" && (
                        <ArrowUp className="h-3 w-3 rotate-180" strokeWidth={2.5} />
                      )}
                    </span>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="w-10">
                    <Checkbox aria-label={`Select row ${row.id}`} />
                  </TableCell>
                  {row.cells.map((cell, i) => (
                    <TableCell
                      key={i}
                      className={
                        TEXT_ALIGN[
                          columns[i]?.cellAlign ?? columns[i]?.align ?? "left"
                        ]
                      }
                    >
                      {cell}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination — pinned below the scrolling table. */}
          <div className="flex shrink-0 items-center justify-between">
            <div className="flex items-center gap-1">
              {[1, "…", 556, 557, 558, "…", 3453].map((p, i) =>
                p === "…" ? (
                  <span key={`gap-${i}`} className="px-1">
                    …
                  </span>
                ) : (
                  <button
                    key={p}
                    type="button"
                    className={`grid h-9 min-w-9 place-items-center rounded-xl px-2 ${
                      p === 558
                        ? "bg-black text-white"
                        : "border-2 border-transparent hover:border-black"
                    }`}
                  >
                    {p}
                  </button>
                ),
              )}
              <button
                type="button"
                aria-label="Next page"
                className="grid h-9 w-9 place-items-center rounded-xl border-2 border-transparent hover:border-black"
              >
                <ChevronRight className="h-4 w-4" strokeWidth={2.25} />
              </button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Items per page</span>
              <Select defaultValue="20">
                <SelectTrigger className="h-10 rounded-full border-2 border-black px-4 font-bold">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[20, 50, 100, 200].map((opt) => (
                    <SelectItem key={opt} value={String(opt)}>
                      {opt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}
