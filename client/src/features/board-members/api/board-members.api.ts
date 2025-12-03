import { baseApi } from "@/api/baseApi";
import type {
  GetAvailableWorkspaceMembersResponseType,
  GetAvailableWorkspaceMembersType,
} from "../types/board-members.type";

const BoardMembersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAvailableWorkspaceMembers: builder.query<
      GetAvailableWorkspaceMembersResponseType,
      GetAvailableWorkspaceMembersType
    >({
      query: ({ workspaceId, boardId }) => ({
        url: `workspace/${workspaceId}/boards/${boardId}/available-members`,
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              { type: "AvailbleWorkspaceMembers", id: "LIST" },
              ...result.members.map((m) => ({
                type: "AvailbleWorkspaceMembers" as const,
                id: m._id,
              })),
            ]
          : [{ type: "AvailbleWorkspaceMembers", id: "LIST" }],
    }),
  }),
});
export const { useGetAvailableWorkspaceMembersQuery } = BoardMembersApi;
