import type { UserType } from "@/types/api.type";

export type AuthStateType = {
  user: UserType | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
};
