import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarDays, ListFilter, X, type LucideIcon } from "lucide-react";
import type { ListingColumn } from "@/templates/listing";

/**
 * One control in the filter side-panel. The set of fields a page passes should
 * mirror that page's table columns so the form matches the visible content.
 */
export type FilterField =
  | { type: "text"; label: string; placeholder?: string }
  | { type: "select"; label: string; options: string[]; placeholder?: string }
  | { type: "checkbox"; label: string; options: string[] }
  | { type: "daterange"; label: string };

export type SidePanelProps = {
  /** Form controls, in display order. */
  fields: FilterField[];
  /** Toolbar pill icon — ListFilter for listings, Filter for the content hub. */
  icon?: LucideIcon;
  /** Panel heading. */
  title?: string;
};

/** Shared rounded-pill styling used across the design system's inputs. */
const PILL = "h-10 rounded-full border-2 border-black px-5";

/**
 * Side-panel placement, shared across the system so every docked panel sits the
 * same way. A rounded panel inset 8px from the top and bottom of the viewport;
 * its right edge clears the AIRA rail (40px closed) / panel (var(--aira-panel)
 * open). Two horizontal placements, by what opens the panel:
 *
 * - `SIDE_PANEL_POSITION` — opened from outside the editor's side menu (e.g. a
 *   listing FILTER). Sits 8px from the AIRA rail/panel.
 * - `SIDE_PANEL_POSITION_SIDE_MENU` — opened from the editor's 88px view-menu
 *   column. Sits 8px to the left of that column (AIRA + 88 + 8).
 *
 * Pair either with a `w-[…]` on the panel; everything else (position, inset,
 * z-index, AIRA tracking) lives here.
 */
export const SIDE_PANEL_POSITION =
  "fixed inset-y-2 right-[48px] z-20 group-data-[aira-open=true]/shell:right-[calc(var(--aira-panel)+8px)]";

export const SIDE_PANEL_POSITION_SIDE_MENU =
  "fixed inset-y-2 right-[160px] z-20 group-data-[aira-open=true]/shell:right-[calc(var(--aira-panel)+120px)]";

/**
 * Derive a sensible default field set from table columns when a page doesn't
 * supply an explicit list: one text filter per meaningful column.
 */
export function filterFieldsFromColumns(
  columns: ListingColumn[],
): FilterField[] {
  return columns
    .filter((c) => c.label && c.label !== "Actions")
    .map((c) => ({ type: "text", label: c.label }) as FilterField);
}

function FieldControl({ field }: { field: FilterField }) {
  switch (field.type) {
    case "text":
      return (
        <Input
          placeholder={field.placeholder ?? `Filter by ${field.label.toLowerCase()}`}
          className={PILL}
        />
      );

    case "select":
      return (
        <Select>
          <SelectTrigger className={`${PILL} w-full font-bold`}>
            <SelectValue placeholder={field.placeholder ?? "Any"} />
          </SelectTrigger>
          <SelectContent>
            {field.options.map((opt) => (
              <SelectItem key={opt} value={opt}>
                {opt}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );

    case "checkbox":
      return (
        <div className="flex flex-col gap-2">
          {field.options.map((opt) => (
            <Label key={opt} className="font-normal">
              <Checkbox />
              {opt}
            </Label>
          ))}
        </div>
      );

    case "daterange":
      return (
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Input placeholder="From" className={`${PILL} pr-10`} />
            <CalendarDays
              className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2"
              strokeWidth={2}
            />
          </div>
          <div className="relative flex-1">
            <Input placeholder="To" className={`${PILL} pr-10`} />
            <CalendarDays
              className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2"
              strokeWidth={2}
            />
          </div>
        </div>
      );
  }
}

/**
 * The FILTER toolbar pill plus the side-panel it opens. A docked, rounded panel
 * inset 8px top/bottom that sits 8px from the AIRA rail/panel
 * (`SIDE_PANEL_POSITION`), rather than a full-bleed modal sheet.
 */
export function SidePanel({
  fields,
  icon: Icon = ListFilter,
  title = "Filter",
}: SidePanelProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setOpen(true)}
        className="h-10 shrink-0 gap-2 rounded-full px-6 text-xs font-bold tracking-wide has-[>svg]:px-6"
      >
        <Icon className="h-4 w-4" strokeWidth={2.25} />
        FILTER
      </Button>

      {open && (
        <div className={`${SIDE_PANEL_POSITION} flex w-[480px] flex-col rounded-xl border-2 border-black bg-background`}>
          <header className="flex items-center justify-between px-6 py-4">
            <h2 className="text-xl font-bold">{title}</h2>
            <button
              type="button"
              aria-label="Close panel"
              onClick={() => setOpen(false)}
            >
              <X className="h-5 w-5" strokeWidth={2.25} />
            </button>
          </header>

          <div className="min-h-0 flex-1 space-y-6 overflow-auto px-6 pb-6">
            {fields.map((field) => (
              <div key={field.label} className="space-y-2">
                <span className="text-sm font-bold">{field.label}</span>
                <FieldControl field={field} />
              </div>
            ))}
          </div>

          <footer className="flex justify-end gap-3 border-t-2 border-black px-6 py-4">
            <Button
              variant="outline"
              className="h-10 shrink-0 gap-2 rounded-full px-6 text-xs font-bold tracking-wide has-[>svg]:px-6"
            >
              <X className="h-3 w-3" strokeWidth={2.5} />
              CLEAR ALL
            </Button>
            <Button
              onClick={() => setOpen(false)}
              className="h-10 rounded-full px-6 text-xs font-bold tracking-wide"
            >
              APPLY FILTERS
            </Button>
          </footer>
        </div>
      )}
    </>
  );
}
