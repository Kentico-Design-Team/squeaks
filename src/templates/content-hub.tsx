import { type ReactNode } from "react";
import { Link } from "react-router";
import { Shell, type ShellProps } from "@/templates/shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
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
  CheckCircle2,
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
  Trash2,
  TriangleAlert,
} from "lucide-react";

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
  /** Yellow-style callout banner copy (rendered monochrome). */
  callout?: { title: string; body?: string };
  primaryAction?: string;
  searchPlaceholder?: string;
  appliedFilters?: AppliedFilter[];
  itemCount?: number;
  columns?: ContentHubColumn[];
  rows?: ContentHubRow[];
  /** Top shortcuts above the Folders section. */
  shortcuts?: TreeShortcut[];
  /** Recursive folder tree under the "Folders" heading. */
  folders?: TreeNode[];
};

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
  { label: "Authors" },
  { label: "Logos" },
];

const DEFAULT_COLUMNS: ContentHubColumn[] = [
  { label: "Default column", sorted: "asc" },
  { label: "Default column" },
  { label: "Default column" },
  { label: "Default column" },
  { label: "Status" },
  { label: "Actions", cellAlign: "right" },
];

export const StatusBadge = ({ children = "Enabled" }: { children?: ReactNode }) => (
  <Badge className="gap-1 rounded-md px-2 py-0.5 font-bold">
    <CheckCircle2 className="h-3 w-3" strokeWidth={2.5} />
    {children}
  </Badge>
);

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

const makeRow = (id: number, email: string, c1: string, c2: string): ContentHubRow => ({
  id,
  cells: [email, c1, c2, "—", <StatusBadge />, <RowActions />],
});

const DEFAULT_ROWS: ContentHubRow[] = [
  makeRow(1, "marekm@kentico.com", "Tellus", "Augue"),
  makeRow(2, "marekm@kentico.com", "Faucibus", "Non"),
  makeRow(3, "marekm@kentico.com", "Dapibus", "Molesuada"),
  makeRow(4, "marekm@kentico.com", "Consequat", "Lobortis"),
  makeRow(5, "marekm@kentico.com", "Pharetra", "Vulputate"),
  makeRow(6, "marekm@kentico.com", "Sagittis", "Cursus"),
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

/* -------------------------------- Template ------------------------------- */

export function ContentHub({
  title = "Coffee KX1 - Lesson 1",
  callout = {
    title: "Friendly warning",
    body: "Heads up — this content item is referenced in several other places.",
  },
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
  folders = DEFAULT_FOLDERS,
  ...shellProps
}: ContentHubProps) {
  return (
    <Shell {...shellProps}>
      <div className="flex gap-6">
        {/* LEFT — content tree navigator */}
        <aside className="w-72 shrink-0 self-start rounded-xl border-2 border-black bg-background p-3">
          {/* Top shortcuts */}
          <ul className="flex flex-col gap-1">
            {shortcuts.map((s) => (
              <li key={s.label}>
                <Link
                  to="#"
                  className={`flex items-center gap-2 rounded-xl px-2 py-1.5 ${
                    s.active
                      ? "bg-black text-white"
                      : "border-2 border-transparent hover:border-black"
                  }`}
                >
                  {s.icon}
                  <span className="truncate">{s.label}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="my-3 border-t-2 border-black" />

          {/* Folders heading + add */}
          <div className="flex items-center justify-between px-2">
            <span className="text-sm font-bold">Folders</span>
            <button
              type="button"
              aria-label="Add folder"
              className="grid h-7 w-7 place-items-center rounded-xl border-2 border-transparent hover:border-black"
            >
              <Plus className="h-4 w-4" strokeWidth={2.5} />
            </button>
          </div>

          {/* Recursive tree */}
          <ul className="mt-1 flex flex-col gap-1">
            {folders.map((node, i) => (
              <TreeBranch key={`${node.label}-${i}`} node={node} depth={0} />
            ))}
          </ul>
        </aside>

        {/* RIGHT — listing area */}
        <div className="min-w-0 flex-1 space-y-5">
          <h1 className="text-2xl font-bold">{title}</h1>

          {/* Callout banner */}
          {callout && (
            <div className="flex items-start gap-3 rounded-xl border-2 border-black bg-muted px-4 py-3">
              <TriangleAlert className="mt-0.5 h-5 w-5 shrink-0" strokeWidth={2.25} />
              <div className="min-w-0">
                <div className="font-bold">{callout.title}</div>
                {callout.body && (
                  <p className="text-muted-foreground">{callout.body}</p>
                )}
              </div>
            </div>
          )}

          {/* Action row: primary action + search + filter */}
          <div className="flex items-center gap-3">
            <Button className="h-10 shrink-0 rounded-full px-6 text-xs font-bold tracking-wide">
              {primaryAction}
            </Button>
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
              className="h-10 shrink-0 gap-2 rounded-full px-6 text-xs font-bold tracking-wide"
            >
              <Filter className="h-4 w-4" strokeWidth={2.25} />
              FILTER
            </Button>
          </div>

          {/* Applied filters */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-muted-foreground">Applied filters:</span>
            <button
              type="button"
              className="rounded-full text-xs font-bold tracking-wide underline"
            >
              CLEAR ALL
            </button>
            {appliedFilters.map((f) => (
              <span
                key={f.label}
                className="flex items-center gap-2 rounded-full border-2 border-black bg-black px-4 py-1.5 text-white"
              >
                {f.label}
                <button type="button" aria-label="Remove filter" className="font-bold">
                  ×
                </button>
              </span>
            ))}
          </div>

          {/* Item count + view toggles */}
          <div className="flex items-center justify-between">
            <span className="font-bold">{itemCount} items</span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                aria-label="Add column"
                className="grid h-9 w-9 place-items-center rounded-xl border-2 border-transparent hover:border-black"
              >
                <Plus className="h-4 w-4" strokeWidth={2.25} />
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

          {/* Data table */}
          <Table>
            <TableHeader>
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

          {/* Pagination */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <button
                type="button"
                aria-label="Previous page"
                className="grid h-9 w-9 place-items-center rounded-xl border-2 border-transparent hover:border-black"
              >
                <ChevronRight className="h-4 w-4 rotate-180" strokeWidth={2.25} />
              </button>
              {[1, 2, 3].map((p) => (
                <button
                  key={p}
                  type="button"
                  className={`grid h-9 min-w-9 place-items-center rounded-xl px-2 ${
                    p === 1
                      ? "bg-black text-white"
                      : "border-2 border-transparent hover:border-black"
                  }`}
                >
                  {p}
                </button>
              ))}
              <span className="px-1">…</span>
              <button
                type="button"
                className="grid h-9 min-w-9 place-items-center rounded-xl border-2 border-transparent px-2 hover:border-black"
              >
                40
              </button>
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
              <button className="flex h-10 items-center gap-2 rounded-xl border-2 border-black px-3 font-bold">
                10
                <ChevronDown className="h-4 w-4" strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}
