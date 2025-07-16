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

export type LoginType = {
  email: string;
  password: string;
};

export type AuthResponseBaseType = {
  message: string;
  user: UserType;
};

export type RegisterResponseType = AuthResponseBaseType;
export type LoginResponseType = AuthResponseBaseType;
export type CurrentUserResponseType = AuthResponseBaseType;
export type AuthPayloadType = AuthResponseBaseType;
