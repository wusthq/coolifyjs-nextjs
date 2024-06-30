import { QUERY_KEYS } from "@/lib/api";
import { MockTeamsWithProjects } from "@/mock/teams";
import { useWorkspaceStore } from "@/stores/workspace";
import type { TeamWithRelations } from "@/types/team";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export const useTeams = () => {
  const teams = useQuery({
    queryKey: [QUERY_KEYS.TEAMS],
    queryFn: async (): Promise<TeamWithRelations[]> => {
      return MockTeamsWithProjects;
    },
  });

  const workspace = useWorkspaceStore();
  useEffect(() => {
    if (!teams.data) return;
    workspace.setTeams(teams.data);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teams.data]);

  return teams;
};
