import { baseApi } from "@/api/baseApi";
import type {
  AllWorkspaceResponseType,
  CreateWorkspaceResponseType,
  CreateWorkspaceType,
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
        providesTags: [{ type: "Workspace", id: "LIST" }],
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
  }),
});

export const {
  useGetWorkspaceByIdQuery,
  useGetAllWorkspacesUserIsMemberQuery,
  useCreateWorkspaceMutation,
} = workspaceApi;
