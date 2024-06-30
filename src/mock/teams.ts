import type { TeamWithRelations } from "@/types/team";
import dayjs from "dayjs";
import { MOCK_PROJECTS } from "./projects";

export const MOCK_TEAMS_WITH_PROJECTS: TeamWithRelations[] = [
  {
    id: "1",
    name: "Root",
    created_at: dayjs("2023-12-01").toDate(),
    updated_at: dayjs("2023-12-01").toDate(),
    projects: MOCK_PROJECTS.filter((project) => project.team_id === "1"),
  },
  {
    id: "2",
    name: "Marketing",
    created_at: dayjs("2023-12-01").toDate(),
    updated_at: dayjs("2023-12-01").toDate(),
    projects: MOCK_PROJECTS.filter((project) => project.team_id === "2"),
  },
];
