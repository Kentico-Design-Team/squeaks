import { Link } from "react-router";
import { Overview } from "@/templates/overview";

export default function OverviewPage() {
  return (
    <Overview
      title="Overview"
      breadcrumbs={[{ label: "AIRA" }, { label: "Usage" }]}
      status=""
      actions={null}
      activeNav="content"
      secondaryNav={{
        title: "Section title",
        items: [
          { label: "Item 1", href: "/overview", active: true },
          { label: "Item 2" },
          { label: "Item 3" },
          { label: "Item 4" },
        ],
      }}
      callout={{
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
      }}
      primaryActionLabel="PRIMARY ACTION"
    />
  );
}
