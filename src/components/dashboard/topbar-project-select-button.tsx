"use client";

import { useWorkspaceStore } from "@/stores/workspace";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TopbarSelectButton } from "./topbar-select-button";

interface TopbarProjectSelectButtonProps {}

export const TopbarProjectSelectButton =
  ({}: TopbarProjectSelectButtonProps) => {
    const router = useRouter();

    const workspace = useWorkspaceStore();
    const activeTeam = workspace.getActiveTeam();
    const activeProject = workspace.getActiveProject();

    const projects = activeTeam?.projects ?? [];

    const handleRoute = (teamId: string, projectId?: string) => {
      if (!projectId) return router.push(`/${teamId}`);
      return router.push(`/${teamId}/${projectId}`);
    };

    const showProjectDropdown = activeTeam && activeProject;
    if (!showProjectDropdown) return null;

    return (
      <TopbarSelectButton
        options={projects.map((project) => ({
          id: project.id,
          value: project.name,
          onClick: () => handleRoute(activeTeam.id, project.id),
        }))}
        activeId={activeProject?.id}
        createButton={{
          onClick: () => {
            return router.push(`/${activeTeam.id}/new-project`);
          },
          label: "New Project",
        }}
      >
        <Link
          href={`/${activeTeam.id}/${activeProject.id}`}
          className="flex items-center text-[14px]"
        >
          {activeProject?.name}
        </Link>
      </TopbarSelectButton>
    );
  };
