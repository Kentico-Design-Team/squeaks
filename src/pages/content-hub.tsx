import { ContentHub, RowActions, StatusBadge } from "@/templates/content-hub";
import {
  Clock,
  FileEdit,
  FileText,
  Files,
  Image as ImageIcon,
  Mail,
  Trash2,
} from "lucide-react";

const ITEMS: [string, string, string, string][] = [
  ["Tellus", "Article", "Dancing Goat", "05/29/2026 8:28 AM"],
  ["Faucibus", "Code snippet", "Dancing Goat", "05/28/2026 4:12 PM"],
  ["Dapibus", "Image", "Shared", "05/27/2026 9:03 AM"],
  ["Consequat", "Event", "Dancing Goat", "05/26/2026 1:47 PM"],
  ["Pharetra", "Blog post", "Shared", "05/25/2026 10:21 AM"],
  ["Sagittis", "Article", "Dancing Goat", "05/24/2026 3:55 PM"],
];

export default function ContentHubPage() {
  return (
    <ContentHub
      title="Content hub"
      workspace="Dancing Goat"
      breadcrumbs={[
        { label: "Dancing Goat Pages" },
        { label: "Coffee samples" },
        { label: "Coffee KX1 - Lesson 1" },
      ]}
      status="Saved"
      actions={null}
      activeNav="content"
      subNav={{
        content: {
          title: "Content management",
          items: [
            { icon: FileText, label: "Content hub", href: "/content-hub" },
            { icon: FileText, label: "Pages" },
            { icon: ImageIcon, label: "Media libraries" },
            { icon: Mail, label: "Emails" },
            { icon: Trash2, label: "Recycle bin" },
          ],
        },
      }}
      callout={{
        label: "Friendly warning",
        body: "Heads up — this content item is referenced by 4 pages and 2 emails. Changes you publish will be reflected everywhere.",
      }}
      primaryAction="NEW CONTENT ITEM"
      itemCount={232}
      appliedFilters={[
        { label: "Content type: Article, Code, Image, Event, Blog post…" },
        { label: "Status: Published" },
      ]}
      filterFields={[
        { type: "text", label: "Name" },
        {
          type: "checkbox",
          label: "Content type",
          options: ["Article", "Code snippet", "Image", "Event", "Blog post"],
        },
        {
          type: "select",
          label: "Workspace",
          options: ["Dancing Goat", "Shared"],
        },
        {
          type: "select",
          label: "Status",
          options: ["Published", "Draft", "Scheduled", "Unpublished"],
        },
        { type: "daterange", label: "Last modified" },
      ]}
      shortcuts={[
        {
          label: "All content items",
          active: true,
          icon: <Files className="h-4 w-4" strokeWidth={2.25} />,
        },
      ]}
      smartFolders={[
        {
          label: "Content in draft",
          icon: <FileEdit className="h-4 w-4" strokeWidth={2.25} />,
        },
        {
          label: "Recently modified",
          icon: <Clock className="h-4 w-4" strokeWidth={2.25} />,
        },
      ]}
      folders={[
        { label: "News" },
        {
          label: "Articles",
          open: true,
          children: [
            { label: "Computer science" },
            { label: "Ecology", active: true },
            {
              label: "Economics",
              open: true,
              children: [{ label: "2023" }, { label: "2024" }],
            },
          ],
        },
        { label: "Authors" },
        { label: "Logos" },
      ]}
      columns={[
        { label: "Name", sorted: "asc" },
        { label: "Content type" },
        { label: "Workspace" },
        { label: "Last modified" },
        { label: "Status" },
        { label: "Actions", align: "right", cellAlign: "right", width: "w-24" },
      ]}
      rows={ITEMS.map(([name, type, workspace, modified], i) => ({
        id: i + 1,
        cells: [name, type, workspace, modified, <StatusBadge />, <RowActions />],
      }))}
    />
  );
}
