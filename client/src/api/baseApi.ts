import { createApi } from "@reduxjs/toolkit/query/react";
import { customFetchBaseQuery } from "./customFetchBaseQuery";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: customFetchBaseQuery,
  tagTypes: [
    "Auth",
    "User",
    "Workspace",
    "WorkspaceMember",
    "SearchUser",
    "Board",
    "AvailbleWorkspaceMembers",
  ],
  endpoints: () => ({}),
});
