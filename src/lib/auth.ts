import { MockUserWithTeams } from "@/mock/user";
import type { AuthUser } from "@/types/user";

export const getCurrentUser = async (): Promise<AuthUser> => {
  return MockUserWithTeams;
};
