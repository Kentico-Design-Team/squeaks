import type { ReactNode } from "react";
import { Link } from "react-router";
import { Shell, type ShellProps } from "@/templates/shell";
import { Button } from "@/components/ui/button";
import {
  SecondaryNav,
  type SecondaryNavData,
} from "@/components/custom/secondary-nav";
import { Lightbulb } from "lucide-react";

export type OverviewCallout = {
  /** Small eyebrow label next to the lightbulb icon. */
  label?: string;
  /** Bold lead line of the callout. */
  title: string;
  /** Body paragraph (can include inline links via ReactNode). */
  body: ReactNode;
};

export type OverviewProps = Omit<ShellProps, "children"> & {
  title?: string;
  secondaryNav?: SecondaryNavData;
  callout?: OverviewCallout;
  primaryActionLabel?: string;
  /** Content rendered inside the large empty bordered region. */
  children?: ReactNode;
};

const DEFAULT_SECONDARY_NAV: SecondaryNavData = {
  title: "Section title",
  items: [
    { label: "Item 1", active: true },
    { label: "Item 2" },
    { label: "Item 3" },
    { label: "Item 4" },
  ],
};

const DEFAULT_CALLOUT: OverviewCallout = {
  label: "Quick tip",
  title: "What is AIRA, and how can it help you",
  body: (
    <>
      AIRA is an AI-powered assistant that helps users automate
      content-related tasks. To learn more about that particular AIRA
      features, see our{" "}
      <Link to="#" className="font-bold underline">
        documentation
      </Link>
      .
    </>
  ),
};

export function Overview({
  title = "Overview",
  secondaryNav = DEFAULT_SECONDARY_NAV,
  callout = DEFAULT_CALLOUT,
  primaryActionLabel = "PRIMARY ACTION",
  children,
  ...shellProps
}: OverviewProps) {
  return (
    <Shell {...shellProps}>
      <div className="flex gap-6">
        {/* Left secondary menu panel */}
        <SecondaryNav nav={secondaryNav} />

        {/* Right content column */}
        <div className="flex flex-1 flex-col gap-6">
          <h1 className="text-2xl font-bold">{title}</h1>

          {/* Quick tip callout */}
          <div className="flex gap-3 rounded-xl border-2 border-black p-4">
            <Lightbulb className="mt-0.5 h-5 w-5 shrink-0" strokeWidth={2.25} />
            <div className="space-y-1">
              {callout.label && (
                <div className="text-xs font-bold tracking-wide">
                  {callout.label}
                </div>
              )}
              <div className="font-bold">{callout.title}</div>
              <p className="text-muted-foreground">{callout.body}</p>
            </div>
          </div>

          {/* Primary action */}
          <div>
            <Button className="h-10 rounded-full px-6 text-xs font-bold tracking-wide">
              {primaryActionLabel}
            </Button>
          </div>

          {/* Large empty bordered region */}
          <div className="min-h-80 flex-1 rounded-xl border-2 border-black">
            {children}
          </div>
        </div>
      </div>
    </Shell>
  );
}
