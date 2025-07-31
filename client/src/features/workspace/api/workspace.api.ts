import { baseApi } from "@/api/baseApi";
import type { WorkspaceByIdResponseType } from "../types/workspace.type";

export const workspaceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getWorkspaceById: builder.query<WorkspaceByIdResponseType, string>({
      query: (workspaceId) => ({
        url: `workspace/${workspaceId}`,
        method: "GET",
      }),
      providesTags: (_, __, workspaceId) => [
        { type: "Workspace", id: workspaceId },
      ],
    }),
  }),
});

export const { useGetWorkspaceByIdQuery } = workspaceApi;
