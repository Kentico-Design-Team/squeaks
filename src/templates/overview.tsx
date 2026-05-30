import type { ReactNode } from "react";
import { Link } from "react-router";
import { Shell, type ShellProps } from "@/templates/shell";
import { Button } from "@/components/ui/button";
import {
  SecondaryNav,
  type SecondaryNavData,
} from "@/components/custom/secondary-nav";
import { RecordColumn } from "@/components/custom/record-column";
import { Lightbulb } from "lucide-react";
import { Callout } from "@/components/custom/callout";

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

        {/* Right content column — shares RecordColumn's responsive width steps
            with the edit-form template. The callout sits between the heading and
            the action, so it can't use the toolbar slot; heading + body live here. */}
        <RecordColumn heading={title}>
          <div className="mt-4 flex flex-col gap-4">
            {/* Quick tip callout */}
            <Callout
              icon={Lightbulb}
              label={callout.label}
              headline={callout.title}
              body={callout.body}
            />

            {/* Primary action — 24px below it before the content region (gap-4 + mb-2). */}
            <div className="mb-2">
              <Button className="h-10 rounded-full px-6 text-xs font-bold tracking-wide">
                {primaryActionLabel}
              </Button>
            </div>

            {/* Large empty bordered region */}
            <div className="min-h-80 rounded-xl border-2 border-black">
              {children}
            </div>
          </div>
        </RecordColumn>
      </div>
    </Shell>
  );
}
