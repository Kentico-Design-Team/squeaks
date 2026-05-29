import { EditForm } from "@/templates/edit-form";
import { FileText, Image as ImageIcon, Mail, Trash2 } from "lucide-react";

export default function EditFormPage() {
  return (
    <EditForm
      workspace="Dancing Goat Commerce"
      activeNav="content"
      status=""
      actions={null}
      breadcrumbs={[
        { label: "Content hub", href: "/content-hub" },
        { label: "List of content items", href: "/content-hub" },
        { label: "Ethiopia Yirgacheffe (draft)" },
        { label: "Content" },
      ]}
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
      heading="Content"
      recordTitle="Ethiopia Yirgacheffe (draft)"
      groupLabel="Product fields"
      secondaryNav={{
        title: "Content hub",
        items: [
          {
            label: "List of content items",
            href: "/content-hub",
            children: {
              title: "Ethiopia Yirgacheffe (draft)",
              items: [
                { label: "Content", active: true },
                { label: "Properties" },
                { label: "Used in" },
              ],
            },
          },
        ],
      }}
    />
  );
}
