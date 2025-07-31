import { baseApi } from "@/api/baseApi";
import type {
  AllWorkspaceResponseType,
  WorkspaceByIdResponseType,
} from "../types/workspace.type";

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

    // Get all workspaces of current user
    getAllWorkspacesUserIsMember: builder.query<AllWorkspaceResponseType, void>(
      {
        query: () => ({
          url: `workspace/all`,
          method: "GET",
        }),
        providesTags: [{ type: "WorkspaceList" }],
      }
    ),
  }),
});

export const {
  useGetWorkspaceByIdQuery,
  useGetAllWorkspacesUserIsMemberQuery,
} = workspaceApi;
