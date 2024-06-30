"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useTeams } from "@/features/teams/api/use-teams";
import { useWorkspaceStore } from "@/stores/workspace";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TopbarSelectButton } from "./topbar-select-button";

interface TopbarTeamSelectButtonProps {
  compact?: boolean;
}

export const TopbarTeamSelectButton = ({
  compact = false,
}: TopbarTeamSelectButtonProps) => {
  const router = useRouter();
  const teams = useTeams();

  const workspace = useWorkspaceStore();
  const activeTeam = workspace.getActiveTeam();

  const handleRoute = (teamId?: string) => {
    if (!teamId) return router.push("/");

    router.push(`/${teamId}`);
  };

  if (teams.data?.length === 0) return null;

  return (
    <TopbarSelectButton
      options={(teams.data ?? []).map((team) => ({
        id: team.id.toString(),
        value: team.name,
        onClick: () => handleRoute(team.id),
      }))}
      activeId={activeTeam?.id.toString()}
      createButton={{
        onClick: () => {
          return router.push(`/new-team`);
        },
        label: "New Team",
      }}
    >
      <Link
        href={`/${activeTeam?.id}`}
        className="flex items-center gap-2 text-[14px]"
      >
        <Avatar className="h-6 w-6">
          {/* <AvatarImage src={activeTeam?.logo_url ?? undefined} /> */}
          <AvatarFallback className="text-semibold text-xs">
            {activeTeam?.name?.[0]}
          </AvatarFallback>
        </Avatar>

        {compact === false && activeTeam?.name}
      </Link>
    </TopbarSelectButton>
  );
};
