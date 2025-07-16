import type { UserType } from "@/types/api.type";

export type AuthStateType = {
  user: UserType | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
};

export type RegisterType = {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
};

export type RegisterResponseType = {
  message: string;
  user: UserType;
};

export type LoginType = {
  email: string;
  password: string;
};

export type LoginResponseType = {
  message: string;
  user: UserType;
};
export type CurrentUserResponseType = {
  message: string;
  user: UserType;
};
