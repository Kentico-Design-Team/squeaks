import type { ReactNode } from "react";
import { Link } from "react-router";

export type SecondaryNavItem = {
  label: string;
  href?: string;
  active?: boolean;
  onClick?: () => void;
  /**
   * Nested sub-navigation shown inline directly beneath THIS item when opened.
   * Its position is tied to the item it belongs to — opening an object on the
   * "Item 1" page reveals this section between Item 1 and Item 2. Nest as deep
   * as needed (object within object within object).
   */
  children?: SecondaryNavSection;
};

export type SecondaryNavSection = {
  /**
   * Header label — a section title at the root, or an opened object's own name
   * when nested (e.g. the clicked row's value).
   */
  title: string;
  items: SecondaryNavItem[];
};

export type SecondaryNavData = SecondaryNavSection;

function Item({ item }: { item: SecondaryNavItem }) {
  const className = `block rounded-xl px-3 py-2 text-left ${
    item.active
      ? "bg-black text-white"
      : "border-2 border-transparent hover:border-black"
  }`;

  if (item.href) {
    return (
      <Link to={item.href} onClick={item.onClick} className={className}>
        {item.label}
      </Link>
    );
  }
  if (item.onClick) {
    return (
      <button
        type="button"
        onClick={item.onClick}
        className={`${className} w-full`}
      >
        {item.label}
      </button>
    );
  }
  return <span className={`${className} cursor-default`}>{item.label}</span>;
}

function Section({
  section,
  depth = 0,
}: {
  section: SecondaryNavSection;
  /** Nesting level. 0 = root (no box); each deeper level is a bordered box. */
  depth?: number;
}) {
  const nested = depth > 0;

  return (
    <div
      className={
        nested ? "mt-2 rounded-xl border-2 border-black py-3 pl-3 pr-1.5" : ""
      }
    >
      <div className="flex items-center gap-2">
        <span className="whitespace-nowrap text-sm font-bold">
          {section.title}
        </span>
        <span className="h-px flex-1 bg-border" />
      </div>
      <ul className="mt-2 flex flex-col gap-1">
        {section.items.map((item) => (
          <li key={item.label}>
            <Item item={item} />
            {item.children && (
              <Section section={item.children} depth={depth + 1} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SecondaryNav({ nav }: { nav: SecondaryNavData }): ReactNode {
  return (
    <aside className="w-56 shrink-0 self-start rounded-xl border-2 border-black bg-background py-4 pl-4 pr-2">
      <Section section={nav} />
    </aside>
  );
}
