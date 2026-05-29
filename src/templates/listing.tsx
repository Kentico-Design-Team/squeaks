import type { ReactNode } from "react";
import { Shell, type ShellProps } from "@/templates/shell";
import {
  SecondaryNav,
  type SecondaryNavData,
} from "@/components/custom/secondary-nav";
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
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
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
  ListFilter,
  Search,
  TriangleAlert,
  X,
} from "lucide-react";

export type ListingColumn = {
  label: string;
  sorted?: "asc" | "desc";
  align?: "left" | "center" | "right";
  cellAlign?: "left" | "center" | "right";
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
  appliedFilters,
  selectable = false,
  pagination,
  content,
  ...shellProps
}: ListingProps) {
  const calloutNode = isCalloutObject(callout) ? (
    <div className="rounded-xl border-2 border-black bg-muted px-4 py-3">
      <div className="flex items-center gap-2 text-xs font-bold">
        <TriangleAlert className="h-4 w-4" strokeWidth={2.25} />
        {callout.label ?? "Friendly warning"}
      </div>
      {callout.headline && (
        <div className="mt-2 font-bold">{callout.headline}</div>
      )}
      {callout.body && <div className="mt-1">{callout.body}</div>}
    </div>
  ) : (
    callout
  );

  return (
    <Shell {...shellProps}>
      <div className="flex gap-6">
        {secondaryNav && <SecondaryNav nav={secondaryNav} />}

        <div className="flex-1 space-y-5">
          {content ?? (
            <>
          <h1 className="text-2xl font-bold">{heading ?? title}</h1>

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
              <Button
                variant="outline"
                className="h-10 shrink-0 gap-2 rounded-full px-6 text-xs font-bold tracking-wide"
              >
                <ListFilter className="h-4 w-4" strokeWidth={2.25} />
                FILTER
              </Button>
            )}
          </div>

          {/* Applied filters */}
          {appliedFilters && appliedFilters.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-bold">Applied filters</span>
              <button
                type="button"
                className="flex items-center gap-1 text-xs font-bold tracking-wide underline-offset-2 hover:underline"
              >
                <X className="h-3 w-3" strokeWidth={2.5} />
                CLEAR ALL
              </button>
              {appliedFilters.map((filter, i) =>
                typeof filter === "string" ? (
                  <Badge
                    key={i}
                    variant="outline"
                    className="gap-1 rounded-full px-3 py-1"
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
                    className={TEXT_ALIGN[col.align ?? "left"]}
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

          {/* Footer / pagination */}
          {pagination && (
            <div className="flex items-center justify-between gap-4 pt-2">
              <span className="shrink-0">
                {pagination.totalItems ?? rows.length} items
              </span>

              <Pagination className="mx-0 w-auto justify-center">
                <PaginationContent>
                  {(pagination.pages ?? [1]).map((page, i) => (
                    <PaginationItem key={`${page}-${i}`}>
                      {page === "…" ? (
                        <PaginationEllipsis />
                      ) : (
                        <PaginationLink
                          href="#"
                          isActive={page === pagination.current}
                        >
                          {page}
                        </PaginationLink>
                      )}
                    </PaginationItem>
                  ))}
                </PaginationContent>
              </Pagination>

              <div className="flex shrink-0 items-center gap-2">
                <span>Items per page</span>
                <Select defaultValue={String(pagination.perPage ?? 200)}>
                  <SelectTrigger className="h-10 rounded-full border-2 border-black px-4">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {(pagination.perPageOptions ?? [25, 50, 100, 200]).map(
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
