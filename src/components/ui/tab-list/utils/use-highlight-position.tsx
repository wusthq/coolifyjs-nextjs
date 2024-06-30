"use client";
import { useEffect, useMemo, useState } from "react";
import type { HighlightElementPosition } from "../highlighter";
import type { Orientation } from "../tab-list";

interface UseHighlightPositionProps {
  orientation: Orientation;
  itemId: string | undefined;
}
export const useHighlightPosition = ({
  orientation = "horizontal",
  itemId,
}: UseHighlightPositionProps) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return useMemo(() => {
    if (!mounted) return undefined;

    let position: HighlightElementPosition = {
      vertical: { top: 0, left: 0, width: "0px", height: "px" },
      horizontal: { left: 0, top: 0, width: "0px", height: "px" },
    };

    if (!itemId) return undefined;

    const el = document.getElementById(itemId.toString());
    if (!el) return undefined;

    const rect = el.getBoundingClientRect();

    position.vertical.top = el.offsetTop;
    position.vertical.left = el.offsetLeft;
    position.vertical.width = rect.width + "px";
    position.vertical.height = rect.height + "px";

    position.horizontal.left = el.offsetLeft;
    position.horizontal.top = el.offsetTop;
    position.horizontal.width = rect.width + "px";
    position.horizontal.height = rect.height + "px";

    return position;

    // eslint-disable-next-line
  }, [orientation, itemId, mounted]);
};
