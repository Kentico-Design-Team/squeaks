import { Fragment, type ComponentType, type ReactNode } from "react";
import { Shell, type ShellProps } from "@/templates/shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Check,
  ChevronDown,
  ChevronRight,
  Folder,
  Plus,
  Search,
} from "lucide-react";

type IconType = ComponentType<{ className?: string; strokeWidth?: number }>;

export type EditorTreeItem = {
  label: string;
  /** Leaf icon (defaults to Folder). */
  icon?: IconType;
  /** Show a published-style check badge on the right. */
  published?: boolean;
  /** Black bg / white text — the currently open node. */
  active?: boolean;
  /** Expandable children. Presence renders a chevron. */
  children?: EditorTreeItem[];
  /** Whether an expandable node is open (chevron down vs right). */
  expanded?: boolean;
};

export type EditorTab = {
  label: string;
  icon: IconType;
  active?: boolean;
};

export type EditorProps = Omit<ShellProps, "children"> & {
  /** Label of the split "new" button above the tree. */
  newLabel?: string;
  treeItems?: EditorTreeItem[];
  /** Right vertical tab rail. */
  tabs?: EditorTab[];
  /** Content of the center canvas (empty by default). */
  children?: ReactNode;
};

const DEFAULT_TREE: EditorTreeItem[] = [
  {
    label: "Root",
    icon: Folder,
    expanded: true,
    children: [
      { label: "Home" },
      { label: "Coffees", children: [] },
      { label: "Articles", children: [] },
      { label: "About Us", published: true },
      { label: "Cafes", children: [] },
      { label: "Contacts", published: true },
      { label: "Navigation menu" },
      {
        label: "Landing pages",
        expanded: true,
        children: [{ label: "Coffee samples", active: true, published: true }],
      },
      { label: "Footer", children: [] },
      { label: "Specials", children: [] },
    ],
  },
];

const DEFAULT_TABS: EditorTab[] = [];

function PublishedBadge() {
  return (
    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 border-black">
      <Check className="h-3 w-3" strokeWidth={3} />
    </span>
  );
}

function TreeNode({ item, depth }: { item: EditorTreeItem; depth: number }) {
  const Icon = item.icon ?? Folder;
  const hasChildren = Array.isArray(item.children);
  const isOpen = item.expanded && (item.children?.length ?? 0) > 0;

  return (
    <li>
      <div
        className={`flex items-center gap-2 rounded-xl px-2 py-1.5 ${
          item.active ? "bg-black text-white" : ""
        }`}
        style={{ paddingLeft: `${depth * 18 + 8}px` }}
      >
        {hasChildren ? (
          <span className="grid h-4 w-4 shrink-0 place-items-center">
            {isOpen ? (
              <ChevronDown className="h-4 w-4" strokeWidth={2.5} />
            ) : (
              <ChevronRight className="h-4 w-4" strokeWidth={2.5} />
            )}
          </span>
        ) : (
          <span className="h-4 w-4 shrink-0" />
        )}
        <Icon className="h-4 w-4 shrink-0" strokeWidth={2.25} />
        <span className="flex-1 truncate">{item.label}</span>
        {item.published && <PublishedBadge />}
      </div>

      {isOpen && (
        <ul>
          {item.children!.map((child, i) => (
            <TreeNode key={`${child.label}-${i}`} item={child} depth={depth + 1} />
          ))}
        </ul>
      )}
    </li>
  );
}

export function Editor({
  newLabel = "NEW PAGE",
  treeItems = DEFAULT_TREE,
  tabs = DEFAULT_TABS,
  children,
  ...shellProps
}: EditorProps) {
  return (
    <Shell {...shellProps}>
      <div className="flex h-full min-h-0 gap-4">
        {/* Left tree panel */}
        <aside className="flex w-64 shrink-0 flex-col gap-4 rounded-xl border-2 border-black bg-background p-3">
          {/* Split "new" button */}
          <div className="flex">
            <Button
              variant="outline"
              className="h-10 flex-1 rounded-l-full rounded-r-none px-4 text-xs font-bold tracking-wide"
            >
              <Plus className="h-4 w-4" strokeWidth={2.5} />
              {newLabel}
            </Button>
            <Button
              variant="outline"
              aria-label="More options"
              className="-ml-0.5 h-10 rounded-l-none rounded-r-full px-2"
            >
              <ChevronDown className="h-4 w-4" strokeWidth={2.5} />
            </Button>
          </div>

          {/* Search */}
          <div className="relative">
            <Input
              placeholder="Search"
              className="h-10 rounded-full pl-4 pr-10"
            />
            <Search
              className="absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2"
              strokeWidth={2.25}
            />
          </div>

          {/* Tree */}
          <ul className="flex-1 overflow-auto">
            {treeItems.map((item, i) => (
              <TreeNode key={`${item.label}-${i}`} item={item} depth={0} />
            ))}
          </ul>
        </aside>

        {/* Center canvas */}
        <div className="min-h-0 flex-1 rounded-xl border-2 border-black bg-background">
          {children}
        </div>

        {/* Right vertical tab rail */}
        {tabs.length > 0 && (
          <nav className="flex w-20 shrink-0 flex-col gap-2 self-stretch">
            {tabs.map((tab, i) => {
              const Icon = tab.icon;
              return (
                <Fragment key={`${tab.label}-${i}`}>
                  <button
                    type="button"
                    className="flex flex-col items-center gap-1.5 px-1 py-2 text-center leading-tight"
                  >
                    <span
                      className={`grid h-11 w-11 place-items-center rounded-xl ${
                        tab.active ? "bg-black text-white" : ""
                      }`}
                    >
                      <Icon className="h-5 w-5" strokeWidth={2.25} />
                    </span>
                    <span className={`text-xs ${tab.active ? "font-bold" : ""}`}>
                      {tab.label}
                    </span>
                  </button>
                </Fragment>
              );
            })}
          </nav>
        )}
      </div>
    </Shell>
  );
}
