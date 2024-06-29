"use client";

import { usePathname } from "next/navigation";
import { type SubmenuItem } from "./types";

export const getActiveItem = ({
  items,
}: {
  items: SubmenuItem[];
}): SubmenuItem | undefined => {
  const currentPath = usePathname();

  const findActiveItem = () => {
    let activeItem = items[0];
    if (items.length === 0) throw new Error("No items");

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (!item) continue;

      if (item.href.length === 0) continue;

      if (currentPath.startsWith(item.href)) {
        activeItem = item;
      }
    }

    return activeItem;
  };

  const activeItem = findActiveItem();
  return activeItem;
};
