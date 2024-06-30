import type { ProjectWithRelations } from "@/types/project";

export const MOCK_PROJECTS: ProjectWithRelations[] = [
  {
    id: "1",
    uuid: "1",
    name: "frontend",
    description: "This is a description for the frontend project",
    team_id: "1",
    created_at: new Date(),
    updated_at: new Date(),
    environments: [
      {
        id: "1",
        name: "Development",
        project_id: "1",
        created_at: new Date(),
        updated_at: new Date(),
        description: null,
      },
    ],
  },
  {
    id: "2",
    uuid: "2",
    name: "docs",
    description: null,
    team_id: "2",
    created_at: new Date(),
    updated_at: new Date(),
    environments: [
      {
        id: "2",
        name: "Development",
        project_id: "2",
        created_at: new Date(),
        updated_at: new Date(),
        description: null,
      },
    ],
  },
  {
    id: "3",
    uuid: "3",
    name: "frontend",
    description: "This is a description for the frontend project",
    team_id: "2",
    created_at: new Date(),
    updated_at: new Date(),
    environments: [
      {
        id: "3",
        name: "Development",
        project_id: "3",
        created_at: new Date(),
        updated_at: new Date(),
        description: null,
      },
    ],
  },
];
