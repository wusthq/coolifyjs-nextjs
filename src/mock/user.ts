import type { TeamWithRelations } from "@/types/team";
import type { User } from "@/types/user";
import { MOCK_TEAMS_WITH_PROJECTS } from "./teams";

export const MOCK_USER: User = {
  id: "1",
  name: "John Doe",
  email_address: "john@example.com",
  created_at: new Date(),
  updated_at: new Date(),
};

export const MOCK_USER_WITH_TEAMS: User & { teams: TeamWithRelations[] } = {
  ...MOCK_USER,
  teams: MOCK_TEAMS_WITH_PROJECTS,
};
