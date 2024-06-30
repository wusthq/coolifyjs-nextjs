export type Project = {
  id: string;
  uuid: string;
  name: string;
  description: string | null;
  team_id: string;
  created_at: Date;
  updated_at: Date;
};

export type ProjectEnvironment = {
  id: string;
  name: string;
  project_id: string;
  created_at: Date;
  updated_at: Date;
  description: string | null;
};

export type ProjectApplication = {};

export type ProjectWithRelations = Project & {
  environments: ProjectEnvironment[];
};
