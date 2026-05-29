import { useEffect, useState, type ComponentType, type ReactNode } from "react";
import { Link } from "react-router";
import { Aira, AIRA_PANEL_DEFAULT_WIDTH } from "@/components/aira";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ChevronDown,
  ChevronRight,
  Cloud,
  Copy,
  FileText,
  Globe,
  House,
  Image as ImageIcon,
  LayoutGrid,
  List,
  Mail,
  Menu,
  Puzzle,
  Search,
  Settings,
  Share2,
  Sparkle,
  Trash2,
  Users,
  User,
} from "lucide-react";

export type ShellBreadcrumb = {
  label: string;
  href?: string;
};

export type ShellNavId =
  | "content"
  | "marketing"
  | "development"
  | "configuration";

export type ShellSubNav = {
  title: string;
  items: { icon: ComponentType<{ className?: string; strokeWidth?: number }>; label: string; href?: string }[];
};

export type ShellProps = {
  children?: ReactNode;
  workspace?: string;
  breadcrumbs?: ShellBreadcrumb[];
  status?: string;
  actions?: ReactNode;
  activeNav?: ShellNavId;
  subNav?: Partial<Record<ShellNavId, ShellSubNav>>;
};

const NAV: { id: ShellNavId; label: string; icon: typeof Menu; href: string }[] =
  [
    { id: "content", label: "Content management", icon: Menu, href: "/" },
    {
      id: "marketing",
      label: "Digital marketing",
      icon: Share2,
      href: "/marketing",
    },
    {
      id: "development",
      label: "Development",
      icon: Sparkle,
      href: "/development",
    },
    {
      id: "configuration",
      label: "Configuration",
      icon: Settings,
      href: "/configuration",
    },
  ];

const DEFAULT_SUB_NAV: Record<ShellNavId, ShellSubNav> = {
  content: {
    title: "Content management",
    items: [
      { icon: FileText, label: "Pages" },
      { icon: FileText, label: "Articles" },
      { icon: ImageIcon, label: "Media libraries" },
      { icon: Trash2, label: "Recycle bin" },
    ],
  },
  marketing: {
    title: "Channels",
    items: [
      { icon: Mail, label: "Dancing Goat Emails" },
      { icon: FileText, label: "Dancing Goat Pages" },
      { icon: Cloud, label: "Headless" },
    ],
  },
  development: {
    title: "Development",
    items: [
      { icon: List, label: "Event log" },
      { icon: Puzzle, label: "Modules" },
      { icon: Settings, label: "System" },
    ],
  },
  configuration: {
    title: "Configuration",
    items: [
      { icon: Users, label: "Users" },
      { icon: Globe, label: "Sites" },
      { icon: Settings, label: "Settings" },
    ],
  },
};

const DEFAULT_ACTIONS = (
  <>
    <Button variant="outline" className="h-10 rounded-full px-6 text-xs font-bold tracking-wide">
      DISCARD
    </Button>
    <Button variant="outline" className="h-10 rounded-full px-6 text-xs font-bold tracking-wide">
      PUBLISH
    </Button>
    <Button className="h-10 rounded-full px-6 text-xs font-bold tracking-wide">SAVE</Button>
  </>
);

export function Shell({
  children,
  workspace = "Kentico",
  breadcrumbs,
  status = "Draft",
  actions = DEFAULT_ACTIONS,
  activeNav = "content",
  subNav,
}: ShellProps) {
  const [openNav, setOpenNav] = useState<ShellNavId | null>(null);
  const [view, setView] = useState<"list" | "grid">("list");
  const [airaOpen, setAiraOpen] = useState(false);
  const [airaWidth, setAiraWidth] = useState(AIRA_PANEL_DEFAULT_WIDTH);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--aira-panel",
      `${airaWidth}px`,
    );
  }, [airaWidth]);

  const crumbs = breadcrumbs ?? [
    { label: "Category 1" },
    { label: "Category 2" },
    { label: "Category 3" },
  ];

  const flyout = openNav
    ? { ...DEFAULT_SUB_NAV[openNav], ...(subNav?.[openNav] ?? {}) }
    : null;

  return (
    <>
      {/* Sidebar */}
      <aside className="fixed top-0 bottom-0 left-0 z-30 flex w-[96px] flex-col items-center justify-between bg-background px-2 py-4">
        <div className="flex w-full flex-col items-center">
          <Link to="/" aria-label="Home">
            <img
              src="/kentico-logo-bw.svg"
              alt="Kentico"
              width={40}
              height={40}
              className="h-10 w-10"
            />
          </Link>

          <nav className="mt-8 flex w-full flex-col items-center gap-3">
            {NAV.map((item) => {
              const Icon = item.icon;
              const active = openNav ? item.id === openNav : item.id === activeNav;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() =>
                    setOpenNav((curr) => (curr === item.id ? null : item.id))
                  }
                  className={`flex w-full flex-col items-center gap-1 px-1 text-center leading-tight ${
                    active ? "font-bold" : ""
                  }`}
                >
                  <span
                    className={`grid h-11 w-11 place-items-center rounded-xl ${
                      active ? "bg-black text-white" : ""
                    }`}
                  >
                    <Icon className="h-6 w-6" strokeWidth={2.25} />
                  </span>
                  <span className="break-words">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <button
          aria-label="Account"
          className="grid h-10 w-10 place-items-center rounded-full border-2 border-black"
        >
          <User className="h-5 w-5" strokeWidth={2.25} />
        </button>
      </aside>

      {/* Right rail — AIRA assistant (collapsible & resizable) */}
      <Aira
        open={airaOpen}
        onOpenChange={setAiraOpen}
        width={airaWidth}
        onWidthChange={setAiraWidth}
      />

      {/* Main grid: top bar + content, offset for sidebar and right rail */}
      <div
        data-aira-open={airaOpen}
        className="grid h-screen grid-cols-1 grid-rows-[72px_1fr] pl-[96px] pr-[120px] data-[aira-open=true]:pr-[calc(var(--aira-panel)+80px)]"
      >
      {/* Top bar */}
      <header className="flex items-center justify-between gap-4 px-4">
        <div className="flex items-center gap-4">
          <button className="flex h-10 items-center gap-2 rounded-xl border-2 border-black px-6 font-bold">
            {workspace}
            <ChevronDown className="h-4 w-4" strokeWidth={2.5} />
          </button>

          <div className="flex h-10 items-center gap-3 rounded-xl border-2 border-black px-4">
            <Link to="/" aria-label="Home">
              <House className="h-4 w-4" strokeWidth={2.25} />
            </Link>
            {crumbs.map((bc, i) => (
              <div key={i} className="flex items-center gap-3">
                <ChevronRight
                  className="h-4 w-4 text-muted-foreground"
                  strokeWidth={2.5}
                />
                {bc.href ? (
                  <Link to={bc.href} className="hover:underline">
                    {bc.label}
                  </Link>
                ) : (
                  <span>{bc.label}</span>
                )}
              </div>
            ))}
            {status && (
              <div className="ml-2 flex items-center gap-2">
                <Copy className="h-4 w-4" strokeWidth={2.25} />
                <span>{status}</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">{actions}</div>
      </header>

      {/* Main content */}
      <main className="overflow-auto px-4 py-6">{children}</main>
      </div>

      {/* Flyout drawer + overlay */}
      {flyout && (
        <>
          <div
            onClick={() => setOpenNav(null)}
            className="fixed inset-0 z-20 bg-black/50"
            aria-hidden
          />
          <aside className="fixed top-0 bottom-0 left-[96px] z-30 flex w-[400px] flex-col gap-6 border-r-2 border-black bg-background px-6 py-6">
            <div className="relative">
              <Search
                className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2"
                strokeWidth={2}
              />
              <Input
                placeholder="Search for all applications"
                className="h-11 rounded-full pl-11 pr-4"
              />
            </div>

            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">{flyout.title}</h2>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setView("list")}
                  aria-label="List view"
                  className={`grid h-8 w-8 place-items-center rounded-xl ${
                    view === "list" ? "bg-black text-white" : ""
                  }`}
                >
                  <List className="h-4 w-4" strokeWidth={2.25} />
                </button>
                <button
                  type="button"
                  onClick={() => setView("grid")}
                  aria-label="Grid view"
                  className={`grid h-8 w-8 place-items-center rounded-xl ${
                    view === "grid" ? "bg-black text-white" : ""
                  }`}
                >
                  <LayoutGrid className="h-4 w-4" strokeWidth={2.25} />
                </button>
              </div>
            </div>

            {view === "list" ? (
              <ul className="flex flex-col gap-1">
                {flyout.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.label}>
                      <Link
                        to={item.href ?? "#"}
                        onClick={() => setOpenNav(null)}
                        className="flex items-center gap-3 rounded-xl border-2 border-transparent px-2 py-2 hover:border-black"
                      >
                        <Icon className="h-5 w-5" strokeWidth={2.25} />
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <ul className="grid grid-cols-4 gap-2">
                {flyout.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.label}>
                      <Link
                        to={item.href ?? "#"}
                        onClick={() => setOpenNav(null)}
                        className="group flex flex-col items-center gap-2 p-2 text-center leading-tight"
                      >
                        <span className="grid h-12 w-12 place-items-center rounded-xl group-hover:bg-black group-hover:text-white">
                          <Icon className="h-7 w-7" strokeWidth={2} />
                        </span>
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </aside>
        </>
      )}
    </>
  );
}
