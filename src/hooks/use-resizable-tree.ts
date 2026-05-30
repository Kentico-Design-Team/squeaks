import { useState, type MouseEvent as ReactMouseEvent } from "react";

/**
 * Manual resize for a left-anchored panel (e.g. the editor / content-hub
 * content tree). Mirrors the AIRA panel's drag behaviour, but the panel grows
 * to the right, so width tracks the pointer's rightward delta from grab.
 */
export function useResizableTree({
  defaultWidth,
  minWidth,
  maxWidth,
}: {
  defaultWidth: number;
  minWidth: number;
  maxWidth: number;
}) {
  const [width, setWidth] = useState(defaultWidth);

  const startResize = (e: ReactMouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = width;
    const onMove = (ev: MouseEvent) => {
      const next = startWidth + (ev.clientX - startX);
      setWidth(Math.max(minWidth, Math.min(maxWidth, next)));
    };
    const onUp = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  return { width, startResize };
}
