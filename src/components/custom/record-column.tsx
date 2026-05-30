import type { ReactNode } from "react";

export type RecordColumnProps = {
  /** Bold page heading (16px). Scrolls away behind the cap as the page scrolls. */
  heading: ReactNode;
  /**
   * Left-aligned action toolbar, pinned above the content. Sticks to the top
   * edge while the page scrolls; its opaque band + 24px bottom padding keep
   * content scrolling cleanly under it. Omit for a column with no toolbar.
   */
  toolbar?: ReactNode;
  /**
   * Wrap the content in the standard bordered box (32px padding, 24px gaps).
   * Edit forms pass `true`; free-form columns (e.g. the bar-item field lists)
   * pass `false` and own their own spacing.
   */
  bordered?: boolean;
  children?: ReactNode;
};

/**
 * Narrow, scroll-aware content column shared by the edit-form template and the
 * bar-item page. Owns the responsive max-width steps, the sticky toolbar band,
 * and the invisible cap that hides scrolling content behind the toolbar — so
 * editing this one place propagates to every record-style page.
 *
 * Width steps with the viewport: 100% ≤1280px, 83.33% on 1281–1919px, 66.66%
 * ≥1920px. Above 1280px a 232px right gap is reserved outside that width (pr on
 * the parent, % on the child); ≤1280px there's no right gap.
 */
export function RecordColumn({
  heading,
  toolbar,
  bordered = false,
  children,
}: RecordColumnProps) {
  return (
    // -mt-6 pulls the column up into the shell's 24px top padding so the cap
    // below can fill that strip — otherwise scrolling content shows through it,
    // above the toolbar.
    <div className="-mt-6 min-w-0 flex-1 min-[1281px]:pr-[232px]">
      <div className="max-w-full min-[1281px]:max-w-[83.33%] min-[1920px]:max-w-[66.66%]">
        {/* Invisible top edge — an opaque cap pinned to the very top of the
            content area, level with the secondary-nav top edge. Fills the
            shell's top padding strip so the heading and content scroll up and
            vanish behind it instead of peeking above the toolbar. */}
        <div
          aria-hidden
          className="pointer-events-none sticky -top-6 z-20 h-6 bg-background"
        />

        <h1 className="text-base font-bold">{heading}</h1>

        {/* Action toolbar — left-aligned, above the content. Sticky: pins to
            the top edge while the page scrolls (the heading scrolls away behind
            the cap). The band's background + 24px bottom padding stay opaque, so
            content scrolls cleanly under it. mt-4 keeps the 16px gap from the
            heading. */}
        {toolbar && (
          <div className="sticky top-0 z-10 mt-4 bg-background pb-6">
            <div className="flex items-center gap-3">{toolbar}</div>
          </div>
        )}

        {bordered ? (
          <div className="space-y-6 rounded-xl border-2 border-black p-8">
            {children}
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
}
