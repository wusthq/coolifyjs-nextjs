import { QUERY_KEYS } from "@/lib/api";
import { MOCK_TEAMS_WITH_PROJECTS } from "@/mock/teams";
import type { Project } from "@/types/project";
import { useQuery } from "@tanstack/react-query";

export const useProjects = ({ teamId }: { teamId: string }) => {
  return useQuery({
    queryKey: [QUERY_KEYS.PROJECTS, teamId],
    queryFn: async (): Promise<Project[]> => {
      return (
        MOCK_TEAMS_WITH_PROJECTS.find((team) => team.id === teamId)?.projects ??
        []
      );
    },
  });
};
