"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

import type { MouseEvent, ReactNode } from "react";
import { useState } from "react";

import { cn } from "@/lib/utils";
import ConditionalWrap from "../conditional-wrap";
import { Highlighter } from "./highlighter";
import { VERTICAL_LEFT_OFFSET } from "./utils/constants";
import { useHighlightPosition } from "./utils/use-highlight-position";

export interface TabListItem {
  id: string;
  href?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  label: ReactNode;
  disabled?: boolean;
}
export type Orientation = "vertical" | "horizontal";

interface TabListProps extends React.HTMLAttributes<HTMLDivElement> {
  items: TabListItem[];
  onSelectItem?: (itemId: string) => void;
  activeItemId?: string;
  orientation?: Orientation;
  listBorder?: boolean;
  itemClassName?: React.HTMLAttributes<HTMLDivElement>["className"];
  activeItemClassName?: React.HTMLAttributes<HTMLDivElement>["className"];

  border?: {
    active: boolean;
    tracking: boolean;
  };
  highlight?: {
    active: boolean;
    tracking: boolean;
  };
}

export function TabList({
  items,
  onSelectItem,
  activeItemId: forcedActiveItemId,
  orientation = "horizontal",
  className,
  itemClassName = "",
  listBorder = true,
  activeItemClassName = "",

  border = { active: true, tracking: false },
  highlight = { active: false, tracking: true },
  ...props
}: TabListProps) {
  const isVertical = orientation === "vertical";
  const isHorizontal = orientation === "horizontal";

  // Active item props
  const [internalActiveId, setActiveItemId] = useState<string | undefined>(
    undefined,
  );
  const activeItemId = forcedActiveItemId ?? internalActiveId;
  const activeHighlightPosition = useHighlightPosition({
    orientation,
    itemId: activeItemId,
  });

  // Hover item props
  const [hoverItemId, setHoverItemId] = useState<string | undefined>(undefined);
  const trackingHighlightPosition = useHighlightPosition({
    orientation,
    itemId: hoverItemId,
  });

  return (
    <div
      className={cn(
        "relative flex w-full text-[14px]",
        { "flex-col": orientation === "vertical" },
        className,
      )}
      onMouseLeave={() => setHoverItemId(undefined)}
      {...props}
    >
      {items.map((item) => {
        const itemId = item.id as unknown as string;

        const isActive = item.id === activeItemId;
        const isHovering = item.id === hoverItemId;
        const isDisabled = item.disabled;

        return (
          <div key={itemId} className="mb-[3px]">
            <ConditionalWrap
              condition={item.href !== undefined}
              wrap={(children) => (
                <Link href={item.href ?? ""}>{children}</Link>
              )}
            >
              <Button
                withoutStyling={true}
                onMouseEnter={() => setHoverItemId(item.id)}
                className={cn(
                  "relative z-[0] block whitespace-nowrap transition-colors",
                  {
                    "px-3 py-[14px]": isHorizontal,
                    "py-2 pr-12 text-left": isVertical,
                    "pointer-events-none cursor-default opacity-30": isDisabled,
                    "border-transparent text-foreground/60": !isActive,
                    "text-foreground": isHovering && !isActive,
                  },
                  itemClassName,
                  isActive && activeItemClassName,
                )}
                style={{
                  paddingLeft: isVertical ? VERTICAL_LEFT_OFFSET : undefined,
                }}
                id={itemId}
                asChild={item.href !== undefined}
                onClick={() => {
                  setActiveItemId(item.id);
                  if (onSelectItem) onSelectItem(item.id);
                }}
              >
                <span
                  className="absolute left-0 top-0 h-full w-full"
                  style={{
                    transform: `translateX(${isVertical ? -VERTICAL_LEFT_OFFSET : 0}px)`,
                  }}
                >
                  {item.label}
                </span>
              </Button>
            </ConditionalWrap>
          </div>
        );
      })}

      {/* Tracking highlighter */}
      <Highlighter
        border={border.tracking}
        highlight={highlight.tracking}
        position={trackingHighlightPosition}
        show={!!hoverItemId}
        orientation={orientation}
        zIndex="-2"
        borderClassName="border-muted"
        highlightClassName="bg-muted"
      />

      {/* Active highlighter */}
      <Highlighter
        border={border.active}
        highlight={highlight.active}
        position={activeHighlightPosition}
        show={!!activeItemId && !!activeHighlightPosition}
        orientation={orientation}
        borderClassName="border-primary"
        highlightClassName="shadow-sm bg-primary border"
      />

      {/* List border */}
      <div
        className={cn(
          "pointer-events-none absolute left-0 top-0 z-[-3] h-full w-full",
          {
            "border-r": isVertical,
            "border-b": isHorizontal,
            hidden: !listBorder,
          },
        )}
      ></div>
    </div>
  );
}
