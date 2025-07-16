import { baseApi } from "@/api/baseApi";
import type {
  CurrentUserResponseType,
  LoginResponseType,
  LoginType,
  RegisterResponseType,
  RegisterType,
} from "../types/auth.type";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<RegisterResponseType, RegisterType>({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
    }),
    login: builder.mutation<LoginResponseType, LoginType>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),
    getCurrentUser: builder.query<CurrentUserResponseType, void>({
      query: () => ({
        url: "/user/current",
        method: "GET",
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useGetCurrentUserQuery } =
  authApi;
