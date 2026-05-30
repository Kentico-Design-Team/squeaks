import { MoreHorizontal, Pencil, Trash2, type LucideIcon } from "lucide-react";

/** The action kinds a table row can offer, keyed for reuse across pages. */
export type RowActionKind = "edit" | "delete" | "more";

const ACTIONS: Record<RowActionKind, { icon: LucideIcon; label: string }> = {
  edit: { icon: Pencil, label: "Edit" },
  delete: { icon: Trash2, label: "Delete" },
  more: { icon: MoreHorizontal, label: "More" },
};

export type RowActionsProps = {
  /** Which actions to show, in order. Defaults to edit + delete + more. */
  actions?: RowActionKind[];
};

/**
 * Right-aligned cluster of icon buttons for a table row's "Actions" column.
 * The flex wrapper keeps the buttons pinned right regardless of how many show,
 * so every listing aligns its actions consistently.
 */
export function RowActions({
  actions = ["edit", "delete", "more"],
}: RowActionsProps) {
  return (
    <div className="flex items-center justify-end gap-1">
      {actions.map((kind) => {
        const { icon: Icon, label } = ACTIONS[kind];
        return (
          <button
            key={kind}
            type="button"
            aria-label={label}
            className="grid h-9 w-9 place-items-center rounded-xl border-2 border-transparent hover:border-foreground"
          >
            <Icon className="h-4 w-4" strokeWidth={2.25} />
          </button>
        );
      })}
    </div>
  );
}
