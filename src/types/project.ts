export type Project = {
  id: number;
  uuid: string;
  name: string;
  description: string | null;
  team_id: number;
  created_at: Date;
  updated_at: Date;
};

export type ProjectEnvironment = {
  id: number;
  name: string;
  project_id: number;
  created_at: Date;
  updated_at: Date;
  description: string | null;
};

export type ProjectWithRelations = Project & {
  environments: ProjectEnvironment[];
};
