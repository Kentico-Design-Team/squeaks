import { type ReactNode } from "react";
import { Shell, type ShellProps } from "@/templates/shell";
import {
  SecondaryNav,
  type SecondaryNavData,
} from "@/components/custom/secondary-nav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Check,
  ChevronDown,
  Image as ImageIcon,
  Italic,
  LayoutGrid,
  Link as LinkIcon,
  List,
  ListOrdered,
  Pencil,
  Strikethrough,
  SquareArrowOutUpRight,
  Underline,
  X,
} from "lucide-react";

/* --------------------------------- Types --------------------------------- */

export type EditFormProps = Omit<ShellProps, "children"> & {
  /** Left drill-down secondary nav. */
  secondaryNav?: SecondaryNavData;
  /** Single page heading (active nav leaf), e.g. "Content". */
  heading?: string;
  /** Editable record title shown with a pencil, e.g. "Ethiopia Yirgacheffe (draft)". */
  recordTitle?: string;
  /** Bold group label above the fields, e.g. "Product fields". */
  groupLabel?: string;
  /**
   * Left-aligned action toolbar inside the content column, between the heading
   * and the form box. Defaults to a PUBLISH split button + a separate SAVE.
   */
  formActions?: ReactNode;
  /** Form body. Defaults to the product fields shown in the reference. */
  fields?: ReactNode;
};

/* ------------------------------- Helpers --------------------------------- */

function FieldLabel({ children, required }: { children: string; required?: boolean }) {
  return (
    <span className="text-sm font-bold">
      {required && <span aria-hidden>*</span>}
      {children}
    </span>
  );
}

const TOOLBAR = [
  [Bold, Italic, Underline, Strikethrough],
  [ListOrdered, List],
  [AlignLeft, AlignCenter, AlignRight],
  [LinkIcon, ImageIcon],
];

/** Rich-text editor field — toolbar, body, and a character/word footer. */
function RichTextField({
  label,
  body,
  characters,
  words,
}: {
  label: string;
  body: ReactNode;
  characters: number;
  words: number;
}) {
  return (
    <div className="space-y-1">
      <FieldLabel required>{label}</FieldLabel>
      <div className="rounded-[20px] border-2 border-black">
        <div className="flex flex-wrap items-center gap-1 border-b-2 border-black p-2">
          {TOOLBAR.map((group, gi) => (
            <div key={gi} className="flex items-center gap-1">
              {gi > 0 && <span className="mx-1 h-5 w-px bg-black" />}
              {group.map((Icon, i) => (
                <button
                  key={i}
                  type="button"
                  className="grid h-8 w-8 place-items-center rounded-lg"
                >
                  <Icon className="h-4 w-4" strokeWidth={2.25} />
                </button>
              ))}
            </div>
          ))}
        </div>
        <div className="space-y-4 p-4">{body}</div>
        <div className="flex justify-end gap-6 border-t-2 border-black px-4 py-2 text-sm text-muted-foreground">
          <span>Characters: {characters}</span>
          <span>Words: {words}</span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------- Defaults -------------------------------- */

const DEFAULT_FORM_ACTIONS = (
  <>
    {/* Split button — PUBLISH + an attached chevron segment (one control). */}
    <div className="flex shrink-0">
      <Button className="h-10 rounded-l-full rounded-r-none px-6 text-xs font-bold tracking-wide">
        PUBLISH
      </Button>
      <Button
        aria-label="Publish options"
        className="h-10 rounded-l-none rounded-r-full border-l-2 border-l-white px-2"
      >
        <ChevronDown className="h-4 w-4" strokeWidth={2.5} />
      </Button>
    </div>
    <Button
      variant="outline"
      className="h-10 rounded-full px-6 text-xs font-bold tracking-wide"
    >
      SAVE
    </Button>
  </>
);

const DEFAULT_FIELDS = (
  <>
    {/* Product name */}
    <label className="block space-y-1">
      <FieldLabel>Product name</FieldLabel>
      <Input defaultValue="Ethiopia Yirgacheffe (draft)" className="h-12 rounded-full px-5" />
    </label>

    {/* Product description */}
    <RichTextField
      label="Product description"
      characters={312}
      words={56}
      body={
        <>
          <p>
            Small to flowery aroma and taste the spicy sweet flavor in which you can
            relish all kinds of fruits — for example, peaches, apricots, or
            watermelon. You can also taste chocolate and nuts. Does this seem
            crazy? Oh, come on, it&apos;s Africa and its wildlife.
          </p>
          <p>
            The Ethiopia Yirgacheffe is prepared using the wash method. Coffee beans
            are peeled with a pulper, submerged in fermentation tanks, and finally
            rested on you-covered beds.
          </p>
        </>
      }
    />

    {/* Product image */}
    <div className="space-y-1">
      <FieldLabel>Product image</FieldLabel>
      <div className="space-y-4 rounded-[20px] border-2 border-black p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="h-10 rounded-full px-6 text-xs font-bold tracking-wide"
            >
              SELECT CONTENT ITEM
            </Button>
            <span className="text-sm">or</span>
            <Button
              variant="outline"
              className="h-10 rounded-full px-6 text-xs font-bold tracking-wide"
            >
              CREATE NEW
            </Button>
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              aria-label="Grid view"
              className="grid h-8 w-8 place-items-center rounded-xl bg-black text-white"
            >
              <LayoutGrid className="h-4 w-4" strokeWidth={2.25} />
            </button>
            <button
              type="button"
              aria-label="List view"
              className="grid h-8 w-8 place-items-center rounded-xl"
            >
              <List className="h-4 w-4" strokeWidth={2.25} />
            </button>
          </div>
        </div>

        {/* Selected item card */}
        <div className="w-72 rounded-xl border-2 border-black p-2">
          <div className="relative">
            <div className="grid h-40 place-items-center rounded-lg border-2 border-black">
              <ImageIcon className="h-10 w-10" strokeWidth={1.75} />
            </div>
            <div className="absolute right-2 top-2 flex gap-1">
              <button
                type="button"
                aria-label="Open"
                className="grid h-7 w-7 place-items-center rounded-lg border-2 border-black bg-background"
              >
                <SquareArrowOutUpRight className="h-3.5 w-3.5" strokeWidth={2.25} />
              </button>
              <button
                type="button"
                aria-label="Remove"
                className="grid h-7 w-7 place-items-center rounded-lg border-2 border-black bg-background"
              >
                <X className="h-3.5 w-3.5" strokeWidth={2.25} />
              </button>
            </div>
          </div>
          <div className="mt-2 space-y-1">
            <div className="font-bold">Image</div>
            <div className="flex items-center gap-1.5 text-sm">
              <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full border-2 border-black">
                <Check className="h-2.5 w-2.5" strokeWidth={3} />
              </span>
              <span className="truncate">Ethiopia Yirgacheffe (draft)</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Product price */}
    <label className="block space-y-1">
      <FieldLabel>Product price</FieldLabel>
      <Input defaultValue="3.5" className="h-12 rounded-full px-5" />
      <span className="text-sm text-muted-foreground">Enter price in US Dollar</span>
    </label>
  </>
);

/* -------------------------------- Template ------------------------------- */

export function EditForm({
  secondaryNav,
  heading = "Content",
  recordTitle = "Ethiopia Yirgacheffe (draft)",
  groupLabel = "Product fields",
  formActions = DEFAULT_FORM_ACTIONS,
  fields = DEFAULT_FIELDS,
  ...shellProps
}: EditFormProps) {
  return (
    <Shell {...shellProps}>
      <div className="flex gap-6">
        {secondaryNav && <SecondaryNav nav={secondaryNav} />}

        {/* Form column max-width steps with the viewport: 100% ≤1280px,
            83.33% on 1281–1919px, 66.66% ≥1920px. Above 1280px a 232px right
            gap is reserved outside that 100% (pr on the parent, % on the
            child); ≤1280px there's no right gap. */}
        <div className="min-w-0 flex-1 min-[1281px]:pr-[232px]">
          <div className="max-w-full space-y-6 min-[1281px]:max-w-[83.33%] min-[1920px]:max-w-[66.66%]">
            <h1 className="text-2xl font-bold">{heading}</h1>

            {/* Action toolbar — left-aligned, above the content box. */}
            {formActions && (
              <div className="flex items-center gap-3">{formActions}</div>
            )}

            {/* Content area — bordered box with 32px inner padding. */}
            <div className="space-y-6 rounded-xl border-2 border-black p-8">
              {recordTitle && (
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold">{recordTitle}</span>
                  <button type="button" aria-label="Rename">
                    <Pencil className="h-4 w-4" strokeWidth={2.25} />
                  </button>
                </div>
              )}

              {groupLabel && <h2 className="font-bold">{groupLabel}</h2>}

              {fields}
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}
