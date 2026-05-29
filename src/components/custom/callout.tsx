import type { ComponentType, ReactNode } from "react";

export type CalloutProps = {
  /** Leading icon (e.g. TriangleAlert for warnings, Lightbulb for tips). */
  icon: ComponentType<{ className?: string; strokeWidth?: number }>;
  /** Small eyebrow label next to the icon, e.g. "Friendly warning". */
  label?: ReactNode;
  /** Bold headline line. */
  headline?: ReactNode;
  /** Body copy (can include inline links via ReactNode). */
  body?: ReactNode;
};

/**
 * Bordered callout banner used for inline notices — friendly warnings, quick
 * tips, etc. The icon is the only thing that varies between variants.
 */
export function Callout({ icon: Icon, label, headline, body }: CalloutProps) {
  return (
    <div className="max-w-[494px] rounded-xl border-2 border-black px-4 py-3">
      <div className="flex items-center gap-2 text-xs font-bold tracking-wide">
        <Icon className="h-4 w-4" strokeWidth={2.25} />
        {label}
      </div>
      {headline && <div className="mt-2 font-bold">{headline}</div>}
      {body && <div className="mt-1">{body}</div>}
    </div>
  );
}
