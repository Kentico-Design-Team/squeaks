import type { ReactNode } from "react";
import { Link } from "react-router";
import { Shell, type ShellProps } from "@/templates/shell";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowUp, Search } from "lucide-react";

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

export type SecondaryNavItem = {
  label: string;
  href?: string;
  active?: boolean;
};

export type SecondaryNav = {
  title: string;
  items: SecondaryNavItem[];
};

export type ListingProps = Omit<ShellProps, "children"> & {
  title: string;
  searchPlaceholder?: string;
  columns: ListingColumn[];
  rows: ListingRow[];
  secondaryNav?: SecondaryNav;
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

export function Listing({
  title,
  searchPlaceholder = "Search",
  columns,
  rows,
  secondaryNav,
  ...shellProps
}: ListingProps) {
  return (
    <Shell {...shellProps}>
      <div className="flex gap-6">
        {secondaryNav && (
          <aside className="w-64 shrink-0 self-start rounded-xl border-2 border-black bg-background p-4">
            <div className="text-sm font-bold">{secondaryNav.title}</div>
            <ul className="mt-2 flex flex-col gap-1">
              {secondaryNav.items.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href ?? "#"}
                    className={`block rounded-xl px-3 py-2 ${
                      item.active
                        ? "bg-black text-white"
                        : "border-2 border-transparent hover:border-black"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        )}

        <div className="flex-1 space-y-6">
          <h1 className="text-2xl font-bold">{title}</h1>

          <div className="relative">
            <Input
              placeholder={searchPlaceholder}
              className="h-12 rounded-full border-2 border-black pl-6 pr-12"
            />
            <Search
              className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2"
              strokeWidth={2}
            />
          </div>

          <Table>
            <TableHeader>
              <TableRow>
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
        </div>
      </div>
    </Shell>
  );
}
