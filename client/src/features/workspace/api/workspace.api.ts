import { baseApi } from "@/api/baseApi";
import type {
  AllWorkspaceResponseType,
  CreateWorkspaceResponseType,
  CreateWorkspaceType,
  UpdateWorkspaceResponseType,
  UpdateWorkspaceType,
  WorkspaceByIdResponseType,
} from "../types/workspace.type";

export const workspaceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getWorkspaceById: builder.query<WorkspaceByIdResponseType, string>({
      query: (workspaceId) => ({
        url: `workspace/${workspaceId}`,
        method: "GET",
      }),
      providesTags: (result, __, workspaceId) =>
        result
          ? [
              { type: "Workspace", id: workspaceId },
              { type: "Workspace", id: "LIST" },
            ]
          : [{ type: "Workspace", id: "LIST" }],
    }),

    // Get all workspaces of current user
    getAllWorkspacesUserIsMember: builder.query<AllWorkspaceResponseType, void>(
      {
        query: () => ({
          url: `workspace/all`,
          method: "GET",
        }),
        providesTags: (result) =>
          result
            ? [
                { type: "Workspace", id: "LIST" },
                ...result.workspaces.map((w) => ({
                  type: "Workspace" as const,
                  id: w._id,
                })),
              ]
            : [{ type: "Workspace", id: "LIST" }],
      }
    ),

    // create workspace
    createWorkspace: builder.mutation<
      CreateWorkspaceResponseType,
      CreateWorkspaceType
    >({
      query: (body) => ({
        url: `workspace/create/new`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Workspace", id: "LIST" }],
    }),

    updateWorkspace: builder.mutation<
      UpdateWorkspaceResponseType,
      UpdateWorkspaceType
    >({
      query: ({ workspaceId, body }) => ({
        url: `workspace/update/${workspaceId}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (_, __, { workspaceId }) => [
        { type: "Workspace", id: workspaceId },
        { type: "Workspace", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetWorkspaceByIdQuery,
  useGetAllWorkspacesUserIsMemberQuery,
  useCreateWorkspaceMutation,
  useUpdateWorkspaceMutation,
} = workspaceApi;
