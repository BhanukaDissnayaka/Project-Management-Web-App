import { baseApi } from "@/api/baseApi";
import type {
  AddMemberToBoardResponseType,
  AddMemberToBoardType,
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
    addMemberToBoard: builder.mutation<
      AddMemberToBoardResponseType,
      AddMemberToBoardType
    >({
      query: ({ workspaceId, boardId, targetUserId }) => ({
        url: `workspace/${workspaceId}/boards/${boardId}/members`,
        method: "POST",
        body: { userId: targetUserId },
      }),
      invalidatesTags: [{ type: "AvailbleWorkspaceMembers", id: "LIST" }],
    }),
  }),
});
export const {
  useGetAvailableWorkspaceMembersQuery,
  useAddMemberToBoardMutation,
} = BoardMembersApi;
