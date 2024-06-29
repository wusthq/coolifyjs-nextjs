import type { CSSProperties } from "react";
import type { HighlightElementPosition } from "../highlighter";
import type { Orientation } from "../tab-list";
import { BORDER_WIDTH, HORIZONTAL_Y_OFFSET } from "./constants";

export const getHighlightStyles = ({
  show,
  orientation,
  position = undefined,
}: {
  show: boolean;
  orientation: Orientation;
  position?: HighlightElementPosition;
}): {
  highlightStyles: CSSProperties | undefined;
  borderStyles: CSSProperties | undefined;
} => {
  if (!show) return { highlightStyles: undefined, borderStyles: undefined };

  const values = position ?? {
    vertical: { top: 0, left: 0, width: "100%", height: "100%" },
    horizontal: { top: 0, left: 0, width: "100%", height: "100%" },
  };
  const { vertical, horizontal } = values;

  const isVertical = orientation === "vertical";

  const baseStyles: CSSProperties = {
    top: isVertical ? vertical.top : 0,
    left: isVertical ? 0 : horizontal.left,
    height: isVertical ? vertical.height : horizontal.height,
    width: isVertical ? "100%" : horizontal.width,
    translate: `translateX(${isVertical ? vertical.top : 0}px)`,
  };

  const highlightStyles: CSSProperties = {
    ...baseStyles,
    top: isVertical ? vertical.top : HORIZONTAL_Y_OFFSET / 2,
    left: isVertical ? -10 : horizontal.left,
    height: isVertical
      ? vertical.height
      : `calc(${horizontal.height} - ${HORIZONTAL_Y_OFFSET}px)`,
  };

  const borderStyles: CSSProperties = {
    ...baseStyles,
    top: isVertical ? vertical.top : HORIZONTAL_Y_OFFSET / 2 - BORDER_WIDTH,
    borderRightWidth: isVertical ? BORDER_WIDTH : undefined,
    borderBottomWidth: isVertical ? undefined : BORDER_WIDTH,
  };

  return { highlightStyles, borderStyles };
};
