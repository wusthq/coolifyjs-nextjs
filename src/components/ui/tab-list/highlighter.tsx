"use client";

import { cn } from "@/lib/utils";
import type { Orientation } from "./tab-list";
import { ANIMATION_DURATION } from "./utils/constants";
import { getHighlightStyles } from "./utils/get-highlight-styles";
import { useDelayedBoolean } from "./utils/use-delayed-boolean";

export interface HighlightElementPosition {
  vertical: { top: number; left: number; width: string; height: string };
  horizontal: { top: number; left: number; width: string; height: string };
}

interface HighlighterProps {
  show: boolean;
  orientation: Orientation;
  canChangePosition?: boolean;
  position?: HighlightElementPosition;
  highlightClassName?: string;
  borderClassName?: string;
  transitionDuration?: `${string}ms`;
  zIndex?: `-${number}`;
  border: boolean;
  highlight: boolean;
}

export function Highlighter({
  show,
  orientation,
  position,
  highlightClassName,
  borderClassName,
  zIndex = `-1`,
  transitionDuration = `${ANIMATION_DURATION}ms`,
  border,
  highlight,
}: HighlighterProps) {
  const canAnimate = useDelayedBoolean(show, ANIMATION_DURATION);

  const { highlightStyles, borderStyles } = getHighlightStyles({
    show,
    orientation,
    position,
  });

  const baseClassName = cn("absolute left-0 top-0 will-change-transform", {
    "transition-none": !canAnimate,
    "transition-all": canAnimate,
  });

  return (
    <div
      className={cn(
        "pointer-events-none absolute left-0 top-0 h-full w-full transition-opacity",
        { "opacity-0": !show, "opacity-100": show },
      )}
      style={{ zIndex, transitionDuration }}
    >
      {/* Highlight */}
      <div
        className={cn(
          baseClassName,
          "rounded-lg",
          { hidden: !highlight },
          highlightClassName,
        )}
        style={{ ...highlightStyles, transitionDuration }}
      />

      {/* Border */}
      <div
        className={cn(baseClassName, { hidden: !border }, borderClassName)}
        style={{ ...borderStyles, transitionDuration }}
      />
    </div>
  );
}
