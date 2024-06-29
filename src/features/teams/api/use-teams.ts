import { QUERY_KEYS } from "@/lib/api";
import { MockTeamsWithProjects } from "@/mock/teams";
import type { TeamWithRelations } from "@/types/team";
import { useQuery } from "@tanstack/react-query";

export const useTeams = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.TEAMS],
    queryFn: async (): Promise<TeamWithRelations[]> => {
      return MockTeamsWithProjects;
    },
  });
};
