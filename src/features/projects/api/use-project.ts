import { QUERY_KEYS } from "@/lib/api";
import { MOCK_PROJECTS } from "@/mock/projects";
import type { ProjectWithRelations } from "@/types/project";
import { useQuery } from "@tanstack/react-query";

export const useProject = ({
  projectId,
}: {
  projectId: string | undefined;
}) => {
  return useQuery({
    queryKey: [QUERY_KEYS.PROJECT, projectId],
    enabled: !!projectId,
    queryFn: async (): Promise<ProjectWithRelations | null> => {
      return MOCK_PROJECTS.find((project) => project.id === projectId) ?? null;
    },
  });
};
