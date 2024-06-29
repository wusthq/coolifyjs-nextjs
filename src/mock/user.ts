import type { TeamWithRelations } from "@/types/team";
import type { User } from "@/types/user";
import { MockTeamsWithProjects } from "./teams";

export const MockUser: User = {
  id: "1",
  name: "John Doe",
  email_address: "john@example.com",
  created_at: new Date(),
  updated_at: new Date(),
};

export const MockUserWithTeams: User & { teams: TeamWithRelations[] } = {
  ...MockUser,
  teams: MockTeamsWithProjects,
};
