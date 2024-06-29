"use client";

import { SubmenuWrapper } from "./submenu-wrapper";

import { TabList } from "@/components/ui/tab-list";
import { useWorkspaceStore } from "@/stores/workspace";
import { useEffect } from "react";
import { getActiveItem } from "./get-active-item";
import { type SubmenuItem } from "./types";

interface ProjectSubmenuProps {
  teamId: string;
  projectId: string;
}

export const ProjectSubmenu = ({ teamId, projectId }: ProjectSubmenuProps) => {
  const { setActiveProjectId, setActiveTeamId } = useWorkspaceStore();
  useEffect(() => setActiveTeamId(teamId), [teamId]);
  useEffect(() => setActiveProjectId(projectId), [projectId]);

  const basePath = `/${teamId}/${projectId}`;

  const items: SubmenuItem[] = [
    {
      id: "resources",
      label: "Resources",
      href: `${basePath}/resources`,
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
