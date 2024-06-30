import type { TeamWithRelations } from "@/types/team";
import dayjs from "dayjs";

export const MockTeamsWithProjects: TeamWithRelations[] = [
  {
    id: 1,
    name: "Root",
    created_at: dayjs("2023-12-01").toDate(),
    updated_at: dayjs("2023-12-01").toDate(),
    projects: [
      {
        id: 1,
        uuid: "1",
        name: "frontend",
        description: "This is a description for the frontend project",
        team_id: 1,
        created_at: dayjs("2023-12-01").toDate(),
        updated_at: dayjs("2023-12-01").toDate(),
      },
    ],
  },
  {
    id: 2,
    name: "Marketing",
    created_at: dayjs("2023-12-01").toDate(),
    updated_at: dayjs("2023-12-01").toDate(),
    projects: [
      {
        id: 2,
        uuid: "2",
        name: "docs",
        description: null,
        team_id: 2,
        created_at: dayjs("2023-12-01").toDate(),
        updated_at: dayjs("2023-12-01").toDate(),
      },
      {
        id: 3,
        uuid: "3",
        name: "frontend",
        description: "This is a description for the frontend project",
        team_id: 3,
        created_at: dayjs("2023-12-01").toDate(),
        updated_at: dayjs("2023-12-01").toDate(),
      },
    ],
  },
];
