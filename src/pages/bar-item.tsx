import { useState } from "react";
import { Shell } from "@/templates/shell";
import { SecondaryNav } from "@/components/custom/secondary-nav";
import { RecordColumn } from "@/components/custom/record-column";
import { BarItem, BarItemList, Shelf } from "@/components/custom/bar-item";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Eye,
  FileText,
  Image as ImageIcon,
  Mail,
  Pencil,
  Trash2,
} from "lucide-react";

/* ------------------------------- Helpers --------------------------------- */

function InfoPair({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-sm text-muted-foreground">{label}</div>
      <div>{value}</div>
    </div>
  );
}

function FieldLabel({ children }: { children: string }) {
  return <span className="text-sm font-bold">{children}</span>;
}

/** Visibility toggle + type badge, shown in a field row's header meta slot. */
function FieldMeta({ type }: { type: string }) {
  return (
    <>
      <button
        type="button"
        aria-label="Toggle visibility"
        className="grid h-8 w-8 shrink-0 place-items-center rounded-lg"
      >
        <Eye className="h-4 w-4" strokeWidth={2.25} />
      </button>
      <Badge className="border-2 text-sm">{type}</Badge>
    </>
  );
}

const SAVE = (
  <Button className="h-10 rounded-full px-6 text-xs font-bold tracking-wide">
    SAVE CHANGES
  </Button>
);

/* --------------------------------- Data ---------------------------------- */

const FIELD_TYPES: Record<string, string> = {
  EmailSubject: "Text",
  Content: "Rich text (HTML)",
  BannerLogo: "Pages and reusable content",
  SocialPlatforms: "Pages and reusable content",
};

const SEO_TYPES: Record<string, string> = {
  SEOFieldsTitle: "Text",
  SEOFieldsDescription: "Text",
  SEOFieldsAllowSearchIndexing: "Boolean (Yes/No)",
};

/* --------------------------------- Page ---------------------------------- */

export default function BarItemPage() {
  // Each list owns its order; BarItemList reorders these on drop.
  const [fields, setFields] = useState([
    "EmailSubject",
    "Content",
    "BannerLogo",
    "SEOFields",
    "SocialPlatforms",
  ]);
  const [seo, setSeo] = useState(Object.keys(SEO_TYPES));
  const [sections, setSections] = useState([
    "Information",
    "Membership access",
    "Permissions",
  ]);

  return (
    <Shell
      workspace="Dancing Goat Commerce"
      activeNav="content"
      status=""
      actions={null}
      breadcrumbs={[
        { label: "Content types", href: "/content-hub" },
        { label: "List of content types", href: "/content-hub" },
        { label: "Email" },
        { label: "Fields" },
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
    >
      <div className="flex gap-6">
        <SecondaryNav
          sticky
          nav={{
            title: "Content types",
            items: [
              {
                label: "List of content types",
                href: "/content-hub",
                children: {
                  title: "Email",
                  items: [
                    { label: "General" },
                    { label: "Fields", active: true },
                    { label: "Allowed in channels" },
                    { label: "Allowed templates" },
                  ],
                },
              },
              { label: "List of reusable field schemas" },
              { label: "Asset configurations" },
            ],
          }}
        />

        {/* Same column as the edit-form template (shared RecordColumn), but
            unbordered — the bar items sit directly at the content width. */}
        <RecordColumn
          heading="Fields"
          toolbar={
            <>
              <Button className="h-10 rounded-full px-6 text-xs font-bold tracking-wide">
                NEW FIELD
              </Button>
              <Button
                variant="outline"
                className="h-10 rounded-full px-6 text-xs font-bold tracking-wide"
              >
                ADD REUSABLE FIELD SCHEMA
              </Button>
            </>
          }
        >
          {/* Draggable, deletable field rows — grab a handle to reorder. */}
          <BarItemList items={fields} onReorder={setFields}>
              {fields.map((id) =>
                id === "SEOFields" ? (
                  <Shelf
                    key={id}
                    id={id}
                    title="SEOFields"
                    description="Reusable field schema"
                    draggable
                    onDelete={() => {}}
                    onOpen={() => {}}
                  >
                    <BarItemList items={seo} onReorder={setSeo}>
                      {seo.map((sid) => (
                        <BarItem
                          key={sid}
                          id={sid}
                          label={sid}
                          draggable
                          onDelete={() => {}}
                          meta={<FieldMeta type={SEO_TYPES[sid]} />}
                        />
                      ))}
                    </BarItemList>
                  </Shelf>
                ) : id === "Content" ? (
                  <BarItem
                    key={id}
                    id={id}
                    label={id}
                    draggable
                    onDelete={() => {}}
                    meta={<FieldMeta type={FIELD_TYPES[id]} />}
                    actions={SAVE}
                  >
                    <label className="block space-y-1">
                      <FieldLabel>Field name</FieldLabel>
                      <Input
                        defaultValue="Content"
                        className="h-10 rounded-full px-5"
                      />
                    </label>
                    <label className="block space-y-1">
                      <FieldLabel>Field description</FieldLabel>
                      <Input
                        placeholder="Describe this field…"
                        className="h-10 rounded-full px-5"
                      />
                    </label>
                  </BarItem>
                ) : (
                  <BarItem
                    key={id}
                    id={id}
                    label={id}
                    draggable
                    onDelete={() => {}}
                    meta={<FieldMeta type={FIELD_TYPES[id]} />}
                  />
                ),
              )}
            </BarItemList>

            {/* The "section info" flavour — labelled groups with read-only info
              pairs, editable inputs, and a save action. 16px gap below the title. */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold">Articles</h1>
                <button type="button" aria-label="Rename">
                  <Pencil className="h-4 w-4" strokeWidth={2.25} />
                </button>
              </div>
              <BarItemList items={sections} onReorder={setSections}>
                {sections.map((id) =>
                  id === "Information" ? (
                    <BarItem
                      key={id}
                      id={id}
                      label={id}
                      draggable
                      actions={SAVE}
                    >
                      <InfoPair label="Published" value="Yes" />
                      <InfoPair label="Content type" value="Articles section" />
                      <InfoPair
                        label="Created by"
                        value="Global Administrator"
                      />
                      <InfoPair label="Content item ID" value="121" />
                      <label className="block space-y-1">
                        <FieldLabel>Tree path slug</FieldLabel>
                        <Input
                          defaultValue="Articles"
                          className="h-10 rounded-full px-5"
                        />
                      </label>
                      <label className="block space-y-1">
                        <FieldLabel>Code name</FieldLabel>
                        <Input
                          defaultValue="Articles-j3dfhv8n"
                          className="h-10 rounded-full px-5"
                        />
                      </label>
                    </BarItem>
                  ) : (
                    <BarItem key={id} id={id} label={id} draggable />
                  ),
                )}
              </BarItemList>
            </div>
        </RecordColumn>
      </div>
    </Shell>
  );
}
