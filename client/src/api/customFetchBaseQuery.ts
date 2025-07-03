import { baseURL } from "@/config/baseUrl.config";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  FetchBaseQueryError,
  BaseQueryFn,
  FetchArgs,
} from "@reduxjs/toolkit/query";
import type { CustomError } from "@/types/custom-error.type";

const baseQuery = fetchBaseQuery({
  baseUrl: baseURL,
  credentials: "include",
  timeout: 10000,
});

export const customFetchBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  CustomError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error) {
    const { status, data } = result.error as FetchBaseQueryError & {
      data?: any;
    };

    // Global handling for 401 Unauthorized
    if (
      status === 401 &&
      (data?.message === "Unauthorized" || data === "Unauthorized")
    ) {
      window.location.href = "/sign-up"; // typo fixed from "/sing-up"
    }
    return {
      error: {
        name: "CustomError",
        message: data?.message || "Something went wrong",
        errorCode: data?.errorCode || "UNKNOWN_ERROR",
        status: typeof status === "number" ? status : undefined,
        data,
      } as CustomError,
    };
  }

  return result;
};
