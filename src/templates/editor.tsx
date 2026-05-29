import { type ComponentType, type ReactNode } from "react";
import { Link, useParams } from "react-router";
import { Shell, type ShellBreadcrumb, type ShellProps } from "@/templates/shell";
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
  /** Slug of a selectable leaf page — used in the URL. Folders omit it. */
  slug?: string;
  /** Leaf icon (defaults to Folder). */
  icon?: IconType;
  /** Show a published-style check badge on the right. */
  published?: boolean;
  /** Expandable children. Presence renders a chevron. */
  children?: EditorTreeItem[];
  /** Whether an expandable node is open (chevron down vs right). */
  expanded?: boolean;
};

/** Passed to a tab's content render function. */
export type EditorContentContext = { page?: EditorTreeItem };

export type EditorTab = {
  /** Slug used in the URL. */
  slug: string;
  label: string;
  icon: IconType;
  /**
   * Content area shown in the canvas when this tab is active. A function form
   * receives the active page so the content can reflect it.
   */
  content?: ReactNode | ((ctx: EditorContentContext) => ReactNode);
};

export type EditorProps = Omit<ShellProps, "children" | "breadcrumbs"> & {
  /** Base route, e.g. "/pages". The URL is `${basePath}/:pageId/:tab`. */
  basePath: string;
  /** Crumb prefix; the active page's label is appended automatically. */
  breadcrumbs?: ShellBreadcrumb[];
  /** Label of the split "new" button above the tree. */
  newLabel?: string;
  treeItems?: EditorTreeItem[];
  /** Right vertical view menu — each tab swaps the canvas content. */
  tabs?: EditorTab[];
};

const DEFAULT_TREE: EditorTreeItem[] = [
  {
    label: "Root",
    icon: Folder,
    expanded: true,
    children: [
      { label: "Home", slug: "home" },
      { label: "Coffees", children: [] },
      { label: "Articles", children: [] },
      { label: "About Us", slug: "about-us", published: true },
      { label: "Cafes", children: [] },
      { label: "Contacts", slug: "contacts", published: true },
      { label: "Navigation menu", slug: "navigation-menu" },
      {
        label: "Landing pages",
        expanded: true,
        children: [
          { label: "Coffee samples", slug: "coffee-samples", published: true },
        ],
      },
      { label: "Footer", children: [] },
      { label: "Specials", children: [] },
    ],
  },
];

const DEFAULT_TABS: EditorTab[] = [];

/** Flatten the tree to its selectable leaf pages, in document order. */
function collectPages(items: EditorTreeItem[]): EditorTreeItem[] {
  const out: EditorTreeItem[] = [];
  const walk = (list: EditorTreeItem[]) => {
    for (const item of list) {
      if (item.slug) out.push(item);
      if (item.children) walk(item.children);
    }
  };
  walk(items);
  return out;
}

function PublishedBadge() {
  return (
    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 border-black">
      <Check className="h-3 w-3" strokeWidth={3} />
    </span>
  );
}

function TreeNode({
  item,
  depth,
  activeSlug,
  hrefForPage,
}: {
  item: EditorTreeItem;
  depth: number;
  activeSlug: string;
  hrefForPage: (slug: string) => string;
}) {
  const Icon = item.icon ?? Folder;
  const hasChildren = Array.isArray(item.children);
  const isOpen = item.expanded && (item.children?.length ?? 0) > 0;
  const active = !!item.slug && item.slug === activeSlug;

  const row = (
    <div
      className={`flex items-center gap-2 rounded-xl px-2 py-1.5 ${
        active ? "bg-black text-white" : ""
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
  );

  return (
    <li>
      {item.slug ? <Link to={hrefForPage(item.slug)}>{row}</Link> : row}

      {isOpen && (
        <ul>
          {item.children!.map((child, i) => (
            <TreeNode
              key={`${child.label}-${i}`}
              item={child}
              depth={depth + 1}
              activeSlug={activeSlug}
              hrefForPage={hrefForPage}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

function TabPlaceholder({ page, tab }: { page?: string; tab?: string }) {
  return (
    <div className="flex h-full flex-col gap-4 p-6">
      <h1 className="text-2xl font-bold">{tab}</h1>
      <div className="flex flex-1 items-center justify-center rounded-xl border-2 border-dashed border-black">
        <span className="font-bold">
          {tab} view — {page ?? "—"}
        </span>
      </div>
    </div>
  );
}

export function Editor({
  basePath,
  breadcrumbs,
  newLabel = "NEW PAGE",
  treeItems = DEFAULT_TREE,
  tabs = DEFAULT_TABS,
  ...shellProps
}: EditorProps) {
  const params = useParams();

  const pages = collectPages(treeItems);
  const activePage = pages.find((p) => p.slug === params.pageId) ?? pages[0];
  // Default to the first tab that has real content, so a bare URL lands on a
  // meaningful view rather than an empty placeholder.
  const defaultTab = tabs.find((t) => t.content != null) ?? tabs[0];
  const activeTab = tabs.find((t) => t.slug === params.tab) ?? defaultTab;

  const pageSlug = activePage?.slug ?? pages[0]?.slug ?? "";
  const tabSlug = activeTab?.slug ?? tabs[0]?.slug ?? "";

  // Switching pages keeps the current tab; switching tabs keeps the page.
  const hrefForPage = (slug: string) => `${basePath}/${slug}/${tabSlug}`;
  const hrefForTab = (slug: string) => `${basePath}/${pageSlug}/${slug}`;

  const crumbs: ShellBreadcrumb[] = [
    ...(breadcrumbs ?? []),
    ...(activePage ? [{ label: activePage.label }] : []),
    ...(activeTab ? [{ label: activeTab.label }] : []),
  ];

  const tabContent =
    typeof activeTab?.content === "function"
      ? activeTab.content({ page: activePage })
      : activeTab?.content;

  return (
    // View menu present → tighten the gap to AIRA to 24px. fitHeight keeps the
    // tree + view menu fixed; only the canvas scrolls.
    <Shell
      {...shellProps}
      breadcrumbs={crumbs}
      tightRight={shellProps.tightRight ?? tabs.length > 0}
      fitHeight
    >
      <div className="flex h-full min-h-0">
        {/* Left tree panel */}
        <aside className="mr-1 flex w-[304px] shrink-0 flex-col gap-4 rounded-xl border-2 border-black bg-background p-3">
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

          {/* Tree — own scrollbar when it overflows the panel height */}
          <ul className="min-h-0 flex-1 overflow-auto">
            {treeItems.map((item, i) => (
              <TreeNode
                key={`${item.label}-${i}`}
                item={item}
                depth={0}
                activeSlug={pageSlug}
                hrefForPage={hrefForPage}
              />
            ))}
          </ul>
        </aside>

        {/* Center canvas — content of the active view-menu tab */}
        <div className="min-h-0 flex-1 overflow-auto rounded-xl border-2 border-black bg-background">
          {tabContent ?? (
            <TabPlaceholder page={activePage?.label} tab={activeTab?.label} />
          )}
        </div>

        {/* Right view menu */}
        {tabs.length > 0 && (
          <nav className="ml-4 flex w-[88px] shrink-0 flex-col gap-2 self-start rounded-xl border-2 border-black bg-background px-1 py-2">
            {tabs.map((tab, i) => {
              const Icon = tab.icon;
              const active = tab.slug === tabSlug;
              return (
                <Link
                  key={`${tab.slug}-${i}`}
                  to={hrefForTab(tab.slug)}
                  className="flex flex-col items-center gap-1.5 px-1 py-2 text-center leading-tight"
                >
                  <span
                    className={`grid h-11 w-11 place-items-center rounded-xl ${
                      active ? "bg-black text-white" : ""
                    }`}
                  >
                    <Icon className="h-5 w-5" strokeWidth={2.25} />
                  </span>
                  <span className={`text-xs ${active ? "font-bold" : ""}`}>
                    {tab.label}
                  </span>
                </Link>
              );
            })}
          </nav>
        )}
      </div>
    </Shell>
  );
}
