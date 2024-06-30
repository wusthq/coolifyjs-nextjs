import type { Project } from "@/types/project";
import type { TeamWithRelations } from "@/types/team";
import { create } from "zustand";

type Workspace = {
  teams: TeamWithRelations[];
  setTeams: (teams: TeamWithRelations[]) => void;

  activeTeamId: string | undefined;
  setActiveTeamId: (teamId: string | undefined) => void;
  getActiveTeam: () => TeamWithRelations | undefined;
  getTeamById: (teamId: string) => TeamWithRelations | undefined;

  activeProjectId: string | undefined;
  setActiveProjectId: (projectId: string | undefined) => void;
  getActiveProject: () => Project | undefined;
  getProjectById: (projectId: string) => Project | undefined;
};

export const useWorkspaceStore = create<Workspace>((set, get) => {
  return {
    teams: [],
    setTeams: (teams) => set({ teams }),

    activeTeamId: undefined,
    setActiveTeamId: (teamId) => set({ activeTeamId: teamId }),
    getActiveTeam: () => {
      const activeTeamId = get().activeTeamId;
      if (!activeTeamId) return undefined;
      return get().teams.find((team) => team.id === activeTeamId);
    },
    getTeamById: (teamId) => {
      const teams = get().teams;
      return teams.find((team) => team.id === teamId);
    },

    activeProjectId: undefined,
    setActiveProjectId: (projectId) => set({ activeProjectId: projectId }),
    getActiveProject: () => {
      const activeTeamId = get().activeTeamId;
      if (!activeTeamId) return undefined;

      const activeTeam = get().teams.find((team) => team.id === activeTeamId);
      if (!activeTeam) return undefined;

      const activeProjectId = get().activeProjectId;
      if (!activeProjectId) return undefined;

      return activeTeam.projects.find(
        (project) => project.id === activeProjectId,
      );
    },
    getProjectById: (projectId) => {
      const teams = get().teams;
      const team = teams.find((team) => team.id === projectId);
      if (!team) return undefined;

      return team.projects.find((project) => project.id === projectId);
    },
  };
});
