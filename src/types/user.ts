import type { TeamWithRelations } from "./team";

export type User = {
  id: string;
  name: string;
  email_address: string;
  created_at: Date;
  updated_at: Date;
};

export type AuthUser = User & {
  teams: TeamWithRelations[];
};
