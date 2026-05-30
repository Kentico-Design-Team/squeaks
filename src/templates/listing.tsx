import type { ReactNode } from "react";
import { Shell, type ShellProps } from "@/templates/shell";
import {
  SecondaryNav,
  type SecondaryNavData,
} from "@/components/custom/secondary-nav";
import { Callout } from "@/components/custom/callout";
import {
  SidePanel,
  filterFieldsFromColumns,
  type FilterField,
} from "@/components/custom/side-panel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
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
  Check,
  ChevronRight,
  Search,
  TriangleAlert,
  X,
} from "lucide-react";

export type ListingColumn = {
  label: string;
  sorted?: "asc" | "desc";
  align?: "left" | "center" | "right";
  cellAlign?: "left" | "center" | "right";
  /** Fixed column width (Tailwind class, e.g. "w-24"). Applied to head + cells. */
  width?: string;
};

export type ListingRow = {
  id: string | number;
  cells: ReactNode[];
};

export type ListingCallout = {
  /** Small label next to the icon, e.g. "Friendly warning". */
  label?: string;
  /** Bold headline line. */
  headline?: string;
  /** Body copy. */
  body?: string;
};

export type ListingPrimaryAction = {
  label: string;
  onClick?: () => void;
};

export type ListingPagination = {
  totalItems?: number;
  /** Sequence of page tokens. Use the string "…" to render an ellipsis. */
  pages?: (number | string)[];
  current?: number;
  perPage?: number;
  perPageOptions?: number[];
};

export type ListingProps = Omit<ShellProps, "children"> & {
  title: string;
  /** Large in-content heading shown above the toolbar. Defaults to `title`. */
  heading?: string;
  searchPlaceholder?: string;
  columns: ListingColumn[];
  rows: ListingRow[];
  secondaryNav?: SecondaryNavData;
  /** Notification / callout banner. Pass an object or a custom node. */
  callout?: ListingCallout | ReactNode;
  /** Solid primary action pill (inert). */
  primaryAction?: ListingPrimaryAction;
  /** Show the outline FILTER pill on the right of the toolbar. */
  showFilter?: boolean;
  /**
   * Fields for the filter side-panel opened by the FILTER pill. Pass a set that
   * mirrors the table columns; when omitted, a text filter is derived per column.
   */
  filterFields?: FilterField[];
  /** Applied-filter chips. Strings render as removable chips. */
  appliedFilters?: ReactNode[];
  /** Render a leading checkbox column for row selection. */
  selectable?: boolean;
  /** Footer pagination + items-per-page row. */
  pagination?: ListingPagination;
  /**
   * When set, replaces the heading/toolbar/table body — used to swap in an
   * opened item's own page content while keeping the shell + secondary nav.
   */
  content?: ReactNode;
};

const TEXT_ALIGN: Record<NonNullable<ListingColumn["align"]>, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

const FLEX_ALIGN: Record<NonNullable<ListingColumn["align"]>, string> = {
  left: "justify-start",
  center: "justify-center",
  right: "justify-end",
};

function isCalloutObject(value: unknown): value is ListingCallout {
  return (
    typeof value === "object" &&
    value !== null &&
    ("label" in value || "headline" in value || "body" in value)
  );
}

/** Outline "Enabled" status badge with a leading check. */
export function StatusBadge({ children = "Enabled" }: { children?: ReactNode }) {
  return (
    <Badge variant="outline" className="gap-1 rounded-full px-2 py-0.5">
      <Check className="h-3 w-3" strokeWidth={3} />
      {children}
    </Badge>
  );
}

/** Small rounded outline tag pill. */
export function TagBadge({ children = "Tag label" }: { children?: ReactNode }) {
  return (
    <Badge variant="outline" className="rounded-full px-2 py-0.5">
      {children}
    </Badge>
  );
}

export function Listing({
  title,
  heading,
  searchPlaceholder = "Search",
  columns,
  rows,
  secondaryNav,
  callout,
  primaryAction,
  showFilter = false,
  filterFields,
  appliedFilters,
  selectable = false,
  pagination,
  content,
  ...shellProps
}: ListingProps) {
  const calloutNode = isCalloutObject(callout) ? (
    <Callout
      icon={TriangleAlert}
      label={callout.label ?? "Friendly warning"}
      headline={callout.headline}
      body={callout.body}
    />
  ) : (
    callout
  );

  return (
    <Shell {...shellProps}>
      <div className="flex gap-6">
        {secondaryNav && <SecondaryNav nav={secondaryNav} />}

        <div className="flex-1 space-y-4">
          {content ?? (
            <>
          {/* 16px below the heading (space-y-4) — matches the other templates. */}
          <h1 className="text-base font-bold">{heading ?? title}</h1>

          {calloutNode}

          {/* Action toolbar */}
          <div className="flex items-center gap-3">
            {primaryAction && (
              <Button
                onClick={primaryAction.onClick}
                className="h-10 shrink-0 rounded-full px-6 text-xs font-bold tracking-wide"
              >
                {primaryAction.label}
              </Button>
            )}

            <div className="relative flex-1">
              <Input
                placeholder={searchPlaceholder}
                className="h-10 rounded-full border-2 border-black pl-6 pr-12"
              />
              <Search
                className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2"
                strokeWidth={2}
              />
            </div>

            {showFilter && (
              <SidePanel
                fields={filterFields ?? filterFieldsFromColumns(columns)}
              />
            )}
          </div>

          {/* Applied filters */}
          {appliedFilters && appliedFilters.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="font-bold">Applied filters</span>
              <button
                type="button"
                className="flex items-center gap-1 text-sm font-bold tracking-wide underline-offset-2 hover:underline"
              >
                <X className="h-3 w-3" strokeWidth={2.5} />
                CLEAR ALL
              </button>
              {appliedFilters.map((filter, i) =>
                typeof filter === "string" ? (
                  <Badge
                    key={i}
                    variant="outline"
                    className="gap-1 rounded-full px-3 py-1 text-sm"
                  >
                    {filter}
                    <X className="h-3 w-3" strokeWidth={2.5} />
                  </Badge>
                ) : (
                  <span key={i}>{filter}</span>
                ),
              )}
            </div>
          )}

          {/* Data table */}
          <Table>
            <TableHeader>
              <TableRow>
                {selectable && (
                  <TableHead className="w-10">
                    <Checkbox aria-label="Select all rows" />
                  </TableHead>
                )}
                {columns.map((col) => (
                  <TableHead
                    key={col.label}
                    className={`${TEXT_ALIGN[col.align ?? "left"]} ${col.width ?? ""}`}
                  >
                    <span
                      className={`flex items-center gap-1 ${FLEX_ALIGN[col.align ?? "left"]}`}
                    >
                      {col.label}
                      {col.sorted === "asc" && (
                        <ArrowUp className="h-3 w-3" strokeWidth={2.5} />
                      )}
                      {col.sorted === "desc" && (
                        <ArrowUp
                          className="h-3 w-3 rotate-180"
                          strokeWidth={2.5}
                        />
                      )}
                    </span>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  {selectable && (
                    <TableCell className="w-10">
                      <Checkbox aria-label={`Select row ${row.id}`} />
                    </TableCell>
                  )}
                  {row.cells.map((cell, i) => (
                    <TableCell
                      key={i}
                      className={`${
                        TEXT_ALIGN[
                          columns[i]?.cellAlign ?? columns[i]?.align ?? "left"
                        ]
                      } ${columns[i]?.width ?? ""}`}
                    >
                      {cell}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination — mirrors the content hub footer (no item count,
              custom page buttons + Next chevron, font-bold per-page select). */}
          {pagination && (
            <div className="flex items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-1">
                {(pagination.pages ?? [1]).map((page, i) =>
                  page === "…" ? (
                    <span key={`gap-${i}`} className="px-1">
                      …
                    </span>
                  ) : (
                    <button
                      key={`${page}-${i}`}
                      type="button"
                      className={`grid h-9 min-w-9 place-items-center rounded-xl px-2 ${
                        page === pagination.current
                          ? "bg-black text-white"
                          : "border-2 border-transparent hover:border-black"
                      }`}
                    >
                      {page}
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
                <Select defaultValue={String(pagination.perPage ?? 20)}>
                  <SelectTrigger className="h-10 rounded-full border-2 border-black px-4 font-bold">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {(pagination.perPageOptions ?? [20, 50, 100, 200]).map(
                      (opt) => (
                        <SelectItem key={opt} value={String(opt)}>
                          {opt}
                        </SelectItem>
                      ),
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
            </>
          )}
        </div>
      </div>
    </Shell>
  );
}
