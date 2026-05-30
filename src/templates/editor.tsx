import { type ComponentType, type ReactNode, useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { Shell, type ShellBreadcrumb, type ShellProps } from "@/templates/shell";
import { useResizableTree } from "@/hooks/use-resizable-tree";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { SIDE_PANEL_POSITION_SIDE_MENU } from "@/components/custom/side-panel";
import {
  Check,
  ChevronDown,
  ChevronRight,
  Folder,
  Pencil,
  Plus,
  Search,
  X,
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

/**
 * Item in a tab's side menu — the second menu shown below the view menu.
 * Clicking it opens its content in the side panel overlay.
 */
export type EditorSideMenuItem = {
  /** Stable id used to track the open panel. */
  slug: string;
  label: string;
  icon: IconType;
  /** Panel content. A function form receives the active page. */
  content?: ReactNode | ((ctx: EditorContentContext) => ReactNode);
};

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
  /** Tab renders its own page heading, so the template omits the shared one. */
  ownHeading?: boolean;
  /**
   * Optional secondary menu shown below the view menu while this tab is active.
   * Each item opens the side panel. Tabs without it show only the view menu.
   */
  sideMenu?: EditorSideMenuItem[];
};

export type EditorProps = Omit<ShellProps, "children" | "breadcrumbs"> & {
  /** Base route, e.g. "/pages". The URL is `${basePath}/:pageId/:tab`. */
  basePath: string;
  /** Crumb prefix; the active page's label is appended automatically. */
  breadcrumbs?: ShellBreadcrumb[];
  /** Label of the split "new" button above the tree. */
  newLabel?: string;
  /**
   * Left tree panel. Optional — omit it (or pass an empty array) to hide the
   * panel entirely, e.g. an editor that doesn't browse a page hierarchy.
   */
  treeItems?: EditorTreeItem[];
  /** Right vertical view menu — each tab swaps the canvas content. */
  tabs?: EditorTab[];
};

const DEFAULT_TABS: EditorTab[] = [];

// Tree panel resize bounds. Default keeps the original 304px width.
const TREE_DEFAULT_WIDTH = 304;
const TREE_MIN_WIDTH = 240;
const TREE_MAX_WIDTH = 520;

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

/** Icon-tile + label used by both the view menu and the side menu. */
function MenuItemBody({
  icon: Icon,
  label,
  active,
}: {
  icon: IconType;
  label: string;
  active: boolean;
}) {
  return (
    <>
      <span
        className={`grid h-11 w-11 place-items-center rounded-xl ${
          active ? "bg-black text-white" : ""
        }`}
      >
        <Icon className="h-5 w-5" strokeWidth={2.25} />
      </span>
      {/* Match the shell left nav bar label size (text-sm / 14px). */}
      <span className={`text-sm ${active ? "font-bold" : ""}`}>{label}</span>
    </>
  );
}

function TabPlaceholder({ page, tab }: { page?: string; tab?: string }) {
  return (
    <div className="flex h-full flex-col gap-4 px-8 py-6">
      <h2 className="text-lg font-bold">{tab}</h2>
      <div className="flex flex-1 items-center justify-center rounded-xl border-2 border-dashed border-black">
        <span className="font-bold">
          {tab} view{page ? ` — ${page}` : ""}
        </span>
      </div>
    </div>
  );
}

export function Editor({
  basePath,
  breadcrumbs,
  newLabel = "NEW PAGE",
  treeItems,
  tabs = DEFAULT_TABS,
  ...shellProps
}: EditorProps) {
  const params = useParams();

  const { width: treeWidth, startResize } = useResizableTree({
    defaultWidth: TREE_DEFAULT_WIDTH,
    minWidth: TREE_MIN_WIDTH,
    maxWidth: TREE_MAX_WIDTH,
  });

  const hasTree = !!treeItems && treeItems.length > 0;
  const pages = collectPages(treeItems ?? []);
  const activePage = pages.find((p) => p.slug === params.pageId) ?? pages[0];
  // Default to the first tab that has real content, so a bare URL lands on a
  // meaningful view rather than an empty placeholder.
  const defaultTab = tabs.find((t) => t.content != null) ?? tabs[0];
  const activeTab = tabs.find((t) => t.slug === params.tab) ?? defaultTab;

  const pageSlug = activePage?.slug ?? pages[0]?.slug ?? "";
  const tabSlug = activeTab?.slug ?? tabs[0]?.slug ?? "";

  // Switching pages keeps the current tab; switching tabs keeps the page.
  // With no tree there's no page segment, so tabs live directly under basePath.
  const hrefForPage = (slug: string) => `${basePath}/${slug}/${tabSlug}`;
  const hrefForTab = (slug: string) =>
    pageSlug ? `${basePath}/${pageSlug}/${slug}` : `${basePath}/${slug}`;

  const crumbs: ShellBreadcrumb[] = [
    ...(breadcrumbs ?? []),
    ...(activePage ? [{ label: activePage.label }] : []),
    ...(activeTab ? [{ label: activeTab.label }] : []),
  ];

  const tabContent =
    typeof activeTab?.content === "function"
      ? activeTab.content({ page: activePage })
      : activeTab?.content;

  // Side menu (second menu below the view menu) + the side panel it opens.
  // No item is active until clicked; switching page or tab closes the panel.
  const sideMenu = activeTab?.sideMenu ?? [];
  const [openPanelSlug, setOpenPanelSlug] = useState<string | null>(null);
  useEffect(() => setOpenPanelSlug(null), [pageSlug, tabSlug]);

  const activeSideItem =
    sideMenu.find((item) => item.slug === openPanelSlug) ?? null;
  const sidePanelContent =
    typeof activeSideItem?.content === "function"
      ? activeSideItem.content({ page: activePage })
      : activeSideItem?.content;

  return (
    // View menu present → tighten the gap to AIRA to 24px. fitHeight keeps the
    // tree + view menu fixed; only the canvas scrolls.
    <Shell
      {...shellProps}
      breadcrumbs={crumbs}
      tightRight={shellProps.tightRight ?? tabs.length > 0}
      fitHeight
    >
      <div className="relative flex h-full min-h-0">
        {/* Left tree panel — optional; hidden when no treeItems are passed */}
        {hasTree && (
        <aside
          style={{ width: `${treeWidth}px` }}
          className="relative mr-1 flex shrink-0 flex-col gap-4 rounded-xl border-2 border-black bg-background p-3"
        >
          {/* Split "new" button */}
          <div className="flex">
            <Button
              variant="outline"
              className="h-10 flex-1 rounded-l-full rounded-r-none px-6 text-xs font-bold tracking-wide has-[>svg]:px-6"
            >
              <Plus className="h-4 w-4" strokeWidth={2.5} />
              {newLabel}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  aria-label="More options"
                  className="-ml-0.5 h-10 rounded-l-none rounded-r-full px-2"
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

          {/* Drag the right edge to resize. Mirrors the AIRA panel handle. */}
          <div
            onMouseDown={startResize}
            role="separator"
            aria-orientation="vertical"
            aria-label="Resize content tree"
            className="absolute top-0 bottom-0 right-0 z-10 w-2 translate-x-1/2 cursor-ew-resize"
          />
        </aside>
        )}

        {/* Center canvas — shared page heading + content of the active tab */}
        <div className="min-h-0 flex-1 overflow-auto rounded-xl border-2 border-black bg-background">
          {activePage && !activeTab?.ownHeading && (
            <div className="flex items-center gap-2 px-8 pt-8">
              <h1 className="text-base font-bold">{activePage.label}</h1>
              <button type="button" aria-label="Rename">
                <Pencil className="h-4 w-4" strokeWidth={2.25} />
              </button>
            </div>
          )}
          {tabContent ?? (
            <TabPlaceholder page={activePage?.label} tab={activeTab?.label} />
          )}
        </div>

        {/* Side panel — overlays the page when a side-menu item is open.
            648px wide; SIDE_PANEL_POSITION_SIDE_MENU docks it 8px left of the
            88px view-menu column (see side-panel.tsx for the shared geometry). */}
        {activeSideItem && (
          <div className={`${SIDE_PANEL_POSITION_SIDE_MENU} flex w-[648px] flex-col rounded-xl border-2 border-black bg-background`}>
            <header className="flex items-center justify-between px-6 py-4">
              <h2 className="text-xl font-bold">{activeSideItem.label}</h2>
              <button
                type="button"
                aria-label="Close panel"
                onClick={() => setOpenPanelSlug(null)}
              >
                <X className="h-5 w-5" strokeWidth={2.25} />
              </button>
            </header>
            <div className="min-h-0 flex-1 overflow-auto px-6 pb-6">
              {sidePanelContent ?? (
                <div className="flex h-full items-center justify-center rounded-xl border-2 border-dashed border-black">
                  <span className="font-bold">{activeSideItem.label} panel</span>
                </div>
              )}
            </div>
            <footer className="flex justify-end border-t-2 border-black px-6 py-4">
              <Button className="h-10 rounded-full px-6 text-xs font-bold tracking-wide">
                SAVE
              </Button>
            </footer>
          </div>
        )}

        {/* Right menus column — view menu, plus the tab's side menu below it */}
        {tabs.length > 0 && (
          <div className="ml-4 flex w-[88px] shrink-0 flex-col gap-4 self-start">
            <nav className="flex flex-col gap-1 rounded-xl border-2 border-black bg-background px-1 py-2">
              {tabs.map((tab, i) => (
                <Link
                  key={`${tab.slug}-${i}`}
                  to={hrefForTab(tab.slug)}
                  className="flex flex-col items-center gap-1.5 px-1 py-2 text-center leading-tight"
                >
                  <MenuItemBody
                    icon={tab.icon}
                    label={tab.label}
                    active={tab.slug === tabSlug}
                  />
                </Link>
              ))}
            </nav>

            {sideMenu.length > 0 && (
              <nav className="flex flex-col gap-1 rounded-xl border-2 border-black bg-background px-1 py-2">
                {sideMenu.map((item, i) => (
                  <button
                    key={`${item.slug}-${i}`}
                    type="button"
                    onClick={() => setOpenPanelSlug(item.slug)}
                    className="flex flex-col items-center gap-1.5 px-1 py-2 text-center leading-tight"
                  >
                    <MenuItemBody
                      icon={item.icon}
                      label={item.label}
                      active={item.slug === openPanelSlug}
                    />
                  </button>
                ))}
              </nav>
            )}
          </div>
        )}
      </div>
    </Shell>
  );
}
