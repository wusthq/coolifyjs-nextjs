"use client";

import { TabList, type TabListItem } from "@/components/ui/tab-list";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export const TopbarList = () => {
  const pathname = usePathname();

  const basePath = ``;
  const items: TabListItem[] = useMemo(
    () => [
      {
        id: "overview",
        label: "Overview",
        href: `${basePath}/`,
        disabled: false,
      },

      {
        id: "network",
        label: "Network",
        href: `${basePath}/network`,
        disabled: false,
      },
      {
        id: "monitoring",
        label: "Monitoring",
        href: `${basePath}/monitoring`,
        disabled: false,
      },
      {
        id: "settings",
        label: "Settings",
        href: `${basePath}/settings`,
        disabled: false,
      },
    ],
    [basePath],
  );

  const [selectedTabId, setSelectedTabId] = useState<string | undefined>(
    undefined,
  );
  useEffect(() => {
    const paths = pathname.split("/");
    let path = paths[1];
    if (path === "") {
      setSelectedTabId(items[0]?.id);
    } else {
      setSelectedTabId(path);
    }
  }, [pathname, items]);

  const selectedTab = items.find((item) => item.id === selectedTabId);

  return (
    <TabList
      orientation="horizontal"
      items={items}
      activeItemId={selectedTab?.id}
      listBorder={false}
      border={{ active: true, tracking: false }}
      highlight={{ active: false, tracking: true }}
      onSelectItem={(itemId) => setSelectedTabId(itemId)}
    />
  );
};
