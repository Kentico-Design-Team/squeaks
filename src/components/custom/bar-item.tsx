import {
  createContext,
  useContext,
  useState,
  type ComponentType,
  type DragEvent,
  type ReactNode,
} from "react";
import { ChevronDown, GripVertical, SquareArrowOutUpRight, Trash2, X } from "lucide-react";

/* ----------------------------- Shared helpers ---------------------------- */

type IconType = ComponentType<{ className?: string; strokeWidth?: number }>;

/** Controlled/uncontrolled open state — pass `open` to control, else internal. */
function useOpen(
  open: boolean | undefined,
  defaultOpen: boolean,
  onOpenChange?: (open: boolean) => void,
) {
  const [internal, setInternal] = useState(defaultOpen);
  const isControlled = open !== undefined;
  const value = isControlled ? open : internal;
  const set = (next: boolean) => {
    if (!isControlled) setInternal(next);
    onOpenChange?.(next);
  };
  return [value, () => set(!value)] as const;
}

/** Small square icon button used for the header affordances. */
function IconButton({
  icon: Icon,
  label,
  onClick,
  className = "",
}: {
  icon: IconType;
  label: string;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${className}`}
    >
      <Icon className="h-4 w-4" strokeWidth={2.25} />
    </button>
  );
}

/* ------------------------------ Drag & drop ------------------------------ */

type SortableCtx = {
  draggingId: string | null;
  overId: string | null;
  armedId: string | null;
  arm: (id: string) => void;
  disarm: () => void;
  itemProps: (id: string) => {
    draggable: boolean;
    onDragStart: (e: DragEvent) => void;
    onDragEnter: (e: DragEvent) => void;
    onDragOver: (e: DragEvent) => void;
    onDrop: (e: DragEvent) => void;
    onDragEnd: (e: DragEvent) => void;
  };
};

const SortableContext = createContext<SortableCtx | null>(null);

/** Wires a row's root + drag handle to the surrounding {@link BarItemList}. */
function useSortableItem(id?: string) {
  const ctx = useContext(SortableContext);
  if (!id || !ctx) return null;
  return {
    isDragging: ctx.draggingId === id,
    isOver: ctx.overId === id && ctx.draggingId !== id,
    rootProps: ctx.itemProps(id),
    handleProps: {
      // Native HTML5 drag only fires when the root is `draggable`; we arm it on
      // handle press so the rest of the row stays selectable/clickable.
      onMouseDown: () => ctx.arm(id),
      onMouseUp: () => ctx.disarm(),
    },
  };
}

export type BarItemListProps = {
  /** Item ids in their current display order. */
  items: string[];
  /** Called with the next order after a drop. */
  onReorder: (items: string[]) => void;
  /** Wrapper class — defaults to a small vertical gap. */
  className?: string;
  /** The {@link BarItem}/{@link Shelf} rows. Each must carry a matching `id`. */
  children: ReactNode;
};

/**
 * Reorderable container for {@link BarItem}s and {@link Shelf}es. Owns no data —
 * it reorders the `items` id list and reports the result via `onReorder`. Drag
 * is initiated from each row's handle.
 */
export function BarItemList({
  items,
  onReorder,
  className = "space-y-2",
  children,
}: BarItemListProps) {
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);
  const [armedId, setArmedId] = useState<string | null>(null);

  const reset = () => {
    setDraggingId(null);
    setOverId(null);
    setArmedId(null);
  };

  const move = (from: string, to: string) => {
    if (from === to) return;
    const next = items.slice();
    const fromIdx = next.indexOf(from);
    const toIdx = next.indexOf(to);
    if (fromIdx === -1 || toIdx === -1) return;
    next.splice(toIdx, 0, next.splice(fromIdx, 1)[0]);
    onReorder(next);
  };

  const ctx: SortableCtx = {
    draggingId,
    overId,
    armedId,
    arm: setArmedId,
    disarm: () => setArmedId(null),
    itemProps: (id) => ({
      draggable: armedId === id,
      // stopPropagation keeps a nested list's drag from also firing the parent
      // list's handlers (which would mark the enclosing shelf as "dragging").
      onDragStart: (e) => {
        e.stopPropagation();
        setDraggingId(id);
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/plain", id);
      },
      onDragEnter: (e) => {
        e.stopPropagation();
        if (draggingId && draggingId !== id) setOverId(id);
      },
      onDragOver: (e) => {
        if (draggingId) {
          e.stopPropagation();
          e.preventDefault();
        }
      },
      onDrop: (e) => {
        e.stopPropagation();
        e.preventDefault();
        if (draggingId) move(draggingId, id);
        reset();
      },
      onDragEnd: (e) => {
        e.stopPropagation();
        reset();
      },
    }),
  };

  return (
    <SortableContext.Provider value={ctx}>
      <div className={className}>{children}</div>
    </SortableContext.Provider>
  );
}

/** Drag handle — a grip that arms native dragging on the parent row. */
function DragHandle({
  handleProps,
}: {
  handleProps?: { onMouseDown: () => void; onMouseUp: () => void };
}) {
  return (
    <span
      aria-label="Drag to reorder"
      {...handleProps}
      className="grid h-8 w-8 shrink-0 cursor-grab place-items-center rounded-lg text-muted-foreground active:cursor-grabbing"
    >
      <GripVertical className="h-4 w-4" strokeWidth={2.25} />
    </span>
  );
}

/* -------------------------------- BarItem -------------------------------- */

export type BarItemProps = {
  /** Stable id — required for drag-to-reorder inside a {@link BarItemList}. */
  id?: string;
  /** Header label. */
  label: ReactNode;
  /** Muted secondary text shown after the label (e.g. "Reusable field schema"). */
  description?: ReactNode;
  /**
   * Trailing controls shown before the chevron — e.g. a visibility toggle or a
   * type badge. Interactive elements here are independent of the header toggle.
   */
  meta?: ReactNode;
  /** Show a drag handle on the left. Auto-hidden while the item is open. */
  draggable?: boolean;
  /** Renders a delete button on the left and calls this on click. */
  onDelete?: () => void;
  /** Delete-button icon. Defaults to a trash can. */
  deleteIcon?: IconType;
  /** Action buttons pinned to the bottom-right of the body (e.g. SAVE CHANGES). */
  actions?: ReactNode;
  /** Controlled open state. */
  open?: boolean;
  /** Initial open state when uncontrolled. */
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Body content. The inner form is constrained to a 480px max width. */
  children?: ReactNode;
};

/**
 * Collapsible row holding information or a form, with optional action buttons in
 * the bottom-right. Supports a left drag handle (hidden once opened) and a
 * delete button. Stack several inside a {@link BarItemList} to reorder them,
 * optionally grouped under a {@link Shelf}.
 */
export function BarItem({
  id,
  label,
  description,
  meta,
  draggable,
  onDelete,
  deleteIcon: DeleteIcon = Trash2,
  actions,
  open,
  defaultOpen = false,
  onOpenChange,
  children,
}: BarItemProps) {
  const [isOpen, toggle] = useOpen(open, defaultOpen, onOpenChange);
  const sortable = useSortableItem(id);

  return (
    <div
      data-slot="bar-item"
      data-state={isOpen ? "open" : "closed"}
      {...sortable?.rootProps}
      className={`overflow-hidden rounded-xl border-2 border-black bg-background ${
        sortable?.isDragging ? "opacity-50" : ""
      } ${sortable?.isOver ? "border-dashed" : ""}`}
    >
      <div
        data-slot="bar-item-header"
        className={`flex h-12 items-center gap-1 px-3 ${isOpen ? "bg-secondary" : ""}`}
      >
        {/* Once open the handle is hidden, but its slot is kept blank so the
            delete button and title stay put regardless of open/closed state. */}
        {draggable &&
          (isOpen ? (
            <span aria-hidden className="h-8 w-8 shrink-0" />
          ) : (
            <DragHandle handleProps={sortable?.handleProps} />
          ))}
        {onDelete && <IconButton icon={DeleteIcon} label="Delete" onClick={onDelete} />}

        {/* Label area — clicking anywhere across the flex space toggles. */}
        <button
          type="button"
          onClick={toggle}
          aria-expanded={isOpen}
          className="flex h-full min-w-0 flex-1 items-center gap-2 text-left"
        >
          <span className="truncate font-bold">{label}</span>
          {description && (
            <span className="truncate text-sm text-muted-foreground">{description}</span>
          )}
        </button>

        {meta}

        <IconButton
          icon={ChevronDown}
          label={isOpen ? "Collapse" : "Expand"}
          onClick={toggle}
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </div>

      {isOpen && (
        <div data-slot="bar-item-body" className="space-y-6 border-t-2 border-black p-8">
          <div className="max-w-[480px] space-y-6">{children}</div>
          {actions && <div className="flex justify-end gap-3">{actions}</div>}
        </div>
      )}
    </div>
  );
}

/* --------------------------------- Shelf --------------------------------- */

export type ShelfProps = {
  /** Stable id — required for drag-to-reorder inside a {@link BarItemList}. */
  id?: string;
  /** Header title. */
  title: ReactNode;
  /** Muted secondary text after the title (e.g. "Reusable field schema"). */
  description?: ReactNode;
  /** Show a drag handle on the left (stays visible while open). */
  draggable?: boolean;
  /** Renders a delete button on the left and calls this on click. */
  onDelete?: () => void;
  /** Renders an "open in detail" button (external-link icon) and calls this. */
  onOpen?: () => void;
  /** Controlled open state. */
  open?: boolean;
  /** Initial open state when uncontrolled. */
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Nested {@link BarItem}s. */
  children?: ReactNode;
};

/**
 * Tinted container that groups a set of {@link BarItem}s under a single titled,
 * collapsible header — used for reusable field schemas and similar bundles.
 */
export function Shelf({
  id,
  title,
  description,
  draggable,
  onDelete,
  onOpen,
  open,
  defaultOpen = true,
  onOpenChange,
  children,
}: ShelfProps) {
  const [isOpen, toggle] = useOpen(open, defaultOpen, onOpenChange);
  const sortable = useSortableItem(id);

  return (
    <div
      data-slot="shelf"
      data-state={isOpen ? "open" : "closed"}
      {...sortable?.rootProps}
      className={`overflow-hidden rounded-xl border-2 border-black ${
        isOpen ? "bg-secondary" : "bg-background"
      } ${sortable?.isDragging ? "opacity-50" : ""} ${
        sortable?.isOver ? "border-dashed" : ""
      }`}
    >
      <div data-slot="shelf-header" className="flex h-12 items-center gap-1 px-3">
        {draggable && <DragHandle handleProps={sortable?.handleProps} />}
        {onDelete && <IconButton icon={X} label="Remove" onClick={onDelete} />}
        {onOpen && (
          <IconButton icon={SquareArrowOutUpRight} label="Open" onClick={onOpen} />
        )}

        <button
          type="button"
          onClick={toggle}
          aria-expanded={isOpen}
          className="flex h-full min-w-0 flex-1 items-center gap-2 text-left"
        >
          <span className="truncate font-bold">{title}</span>
          {description && (
            <span className="truncate text-sm text-muted-foreground">{description}</span>
          )}
        </button>

        <IconButton
          icon={ChevronDown}
          label={isOpen ? "Collapse" : "Expand"}
          onClick={toggle}
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </div>

      {isOpen && (
        <div data-slot="shelf-body" className="space-y-2 border-t-2 border-black p-3">
          {children}
        </div>
      )}
    </div>
  );
}
