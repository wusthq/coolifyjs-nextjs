import { QUERY_KEYS } from "@/lib/api";
import { MockTeamsWithProjects } from "@/mock/teams";
import type { Project } from "@/types/project";
import { useQuery } from "@tanstack/react-query";

export const useProjects = ({ teamId }: { teamId: number }) => {
  return useQuery({
    queryKey: [QUERY_KEYS.PROJECTS, teamId],
    queryFn: async (): Promise<Project[]> => {
      return (
        MockTeamsWithProjects.find((team) => team.id === teamId)?.projects ?? []
      );
    },
  });
};
