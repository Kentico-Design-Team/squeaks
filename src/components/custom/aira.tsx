import type { MouseEvent as ReactMouseEvent } from "react";
import {
  Image as ImageIcon,
  Menu,
  Send,
  Sparkles,
  SquarePen,
  X,
} from "lucide-react";
import { Input } from "@/components/ui/input";

export type AiraProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  width: number;
  onWidthChange: (width: number) => void;
};

export const AIRA_RAIL_WIDTH = 40;
export const AIRA_PANEL_DEFAULT_WIDTH = 400;
export const AIRA_PANEL_MIN_WIDTH = 320;
export const AIRA_PANEL_MAX_WIDTH = 800;

export function Aira({ open, onOpenChange, onWidthChange }: AiraProps) {
  const startResize = (e: ReactMouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const onMove = (ev: MouseEvent) => {
      const next = window.innerWidth - ev.clientX;
      onWidthChange(
        Math.max(AIRA_PANEL_MIN_WIDTH, Math.min(AIRA_PANEL_MAX_WIDTH, next)),
      );
    };
    const onUp = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => onOpenChange(true)}
        aria-label="Open AIRA"
        className="fixed top-0 right-0 bottom-0 z-30 flex w-[40px] flex-col items-center gap-3 border-l-2 border-black bg-background py-4"
      >
        <Sparkles className="h-5 w-5" strokeWidth={2.25} />
        <div className="flex flex-col items-center gap-1 text-base font-bold leading-none tracking-wide">
          <span>A</span>
          <span>I</span>
          <span>R</span>
          <span>A</span>
        </div>
      </button>
    );
  }

  return (
    <aside className="fixed top-0 right-0 bottom-0 z-40 flex w-[var(--aira-panel)] flex-col border-l-2 border-black bg-background">
      <div
        onMouseDown={startResize}
        role="separator"
        aria-orientation="vertical"
        aria-label="Resize AIRA panel"
        className="absolute top-0 bottom-0 left-0 z-10 w-2 -translate-x-1/2 cursor-ew-resize"
      />
      <header className="flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-3">
          <button type="button" aria-label="Menu">
            <Menu className="h-5 w-5" strokeWidth={2.25} />
          </button>
          <span className="text-base font-bold">AIRA</span>
        </div>
        <div className="flex items-center gap-3">
          <button type="button" aria-label="New chat">
            <SquarePen className="h-5 w-5" strokeWidth={2.25} />
          </button>
          <button type="button" aria-label="Close" onClick={() => onOpenChange(false)}>
            <X className="h-5 w-5 scale-125" strokeWidth={2.25} />
          </button>
        </div>
      </header>

      <div className="flex-1 space-y-4 overflow-auto px-6 py-6">
        <p className="font-bold">
          👋 Hi there, I&apos;m AIRA chat—your smart AI assistant!
        </p>
        <p>
          I can help you with day-to-day tasks in your life as a marketer—whether
          it&apos;s crafting your next newsletter, converting an email into a
          Facebook post, or coming up with ideas for your next campaign. I also
          know Xperience by Kentico pretty well, so don&apos;t hesitate to ask.
          I&apos;m here to help!
        </p>
        <p>Prompts you can try:</p>
        <ul className="list-disc space-y-1 pl-6">
          <li>Write an email from this blog post: (paste content)</li>
          <li>Improve the grammar in my article: (paste content)</li>
        </ul>
        <p>Or learn more about Xperience by Kentico:</p>
        <ul className="list-disc space-y-1 pl-6">
          <li>How can I add a form to a page?</li>
          <li>How can I pause a running automation?</li>
          <li>What is the Content Hub and how do I work with it?</li>
        </ul>
        <p>Just remember, I&apos;m an AI chat, so I can make mistakes 😇</p>
      </div>

      <div className="p-4">
        <div className="space-y-3 rounded-[20px] border-2 border-black px-4 py-3">
          <Input
            placeholder="Ask AIRA"
            className="h-8 border-0 px-0 shadow-none focus-visible:ring-0"
          />
          <div className="flex items-center justify-between">
            <button type="button" aria-label="Attach image">
              <ImageIcon className="h-5 w-5" strokeWidth={2.25} />
            </button>
            <button
              type="button"
              aria-label="Send"
              className="grid h-8 w-8 place-items-center rounded-full bg-black text-white"
            >
              <Send className="h-4 w-4" strokeWidth={2.25} />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
