import type { TeamWithRelations } from "@/types/team";
import dayjs from "dayjs";

export const MockTeamsWithProjects: TeamWithRelations[] = [
  {
    id: "1",
    name: "Root",
    created_at: dayjs("2023-12-01").toDate(),
    updated_at: dayjs("2023-12-01").toDate(),
    projects: [
      {
        id: "1",
        name: "frontend",
        created_at: dayjs("2023-12-01").toDate(),
        updated_at: dayjs("2023-12-01").toDate(),
      },
    ],
  },
  {
    id: "2",
    name: "Marketing",
    created_at: dayjs("2023-12-01").toDate(),
    updated_at: dayjs("2023-12-01").toDate(),
    projects: [
      {
        id: "2",
        name: "docs",
        created_at: dayjs("2023-12-01").toDate(),
        updated_at: dayjs("2023-12-01").toDate(),
      },
      {
        id: "3",
        name: "frontend",
        created_at: dayjs("2023-12-01").toDate(),
        updated_at: dayjs("2023-12-01").toDate(),
      },
    ],
  },
];
