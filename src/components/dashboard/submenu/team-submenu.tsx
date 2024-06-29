"use client";

import { SubmenuWrapper } from "./submenu-wrapper";

import { TabList } from "@/components/ui/tab-list";
import { useWorkspaceStore } from "@/stores/workspace";
import { useEffect } from "react";
import { getActiveItem } from "./get-active-item";
import { type SubmenuItem } from "./types";

interface TeamSubmenuProps {
  teamId: string;
}

export const TeamSubmenu = ({ teamId }: TeamSubmenuProps) => {
  const { setActiveProjectId, setActiveTeamId } = useWorkspaceStore();
  useEffect(() => setActiveTeamId(teamId), [teamId]);
  useEffect(() => setActiveProjectId(undefined), [teamId]);

  const basePath = `/${teamId}`;

  const items: SubmenuItem[] = [
    {
      id: "projects",
      label: "Projects",
      href: `${basePath}`,
      disabled: false,
    },
    {
      id: "monitoring",
      label: "Monitoring",
      href: `${basePath}/monitoring`,
      disabled: false,
    },
    {
      id: "network",
      label: "Network",
      href: `${basePath}/network`,
      disabled: false,
    },
    {
      id: "settings",
      label: "Settings",
      href: `${basePath}/settings`,
      disabled: false,
    },
  ];
  const activeItem = getActiveItem({ items });

  return (
    <SubmenuWrapper>
      <TabList
        itemClassName="max-md:text-[13px] max-md:py-[11px] max-md:px-2"
        items={items}
        activeItemId={activeItem?.id}
        className="px-1"
      />
    </SubmenuWrapper>
  );
};
