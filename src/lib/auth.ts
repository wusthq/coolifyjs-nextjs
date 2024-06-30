import { MOCK_USER_WITH_TEAMS } from "@/mock/user";
import type { AuthUser } from "@/types/user";

export const getCurrentUser = async (): Promise<AuthUser> => {
  return MOCK_USER_WITH_TEAMS;
};
