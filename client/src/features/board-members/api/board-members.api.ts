import { baseApi } from "@/api/baseApi";
import type {
  AddMemberToBoardResponseType,
  AddMemberToBoardType,
  ChangeBoardMemberRoleResponseType,
  ChangeBoardMemberRoleType,
  GetAvailableWorkspaceMembersResponseType,
  GetAvailableWorkspaceMembersType,
  GetBoardMembersResponseType,
  GetBoardMembersType,
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
    getBoardMembers: builder.query<
      GetBoardMembersResponseType,
      GetBoardMembersType
    >({
      query: ({ workspaceId, boardId }) => ({
        url: `workspace/${workspaceId}/boards/${boardId}/members`,
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              { type: "BoardMember", id: "LIST" },
              ...result.boardMembers.map((m) => ({
                type: "BoardMember" as const,
                id: m._id,
              })),
            ]
          : [{ type: "BoardMember", id: "LIST" }],
    }),
    changeBoardMemberRole: builder.mutation<
      ChangeBoardMemberRoleResponseType,
      ChangeBoardMemberRoleType
    >({
      query: ({ workspaceId, boardId, userId, roleId }) => ({
        url: `workspace/${workspaceId}/boards/${boardId}/members/role`,
        method: "PUT",
        body: { userId, roleId },
      }),
      invalidatesTags: [{ type: "BoardMember", id: "LIST" }],
    }),
  }),
});
export const {
  useGetAvailableWorkspaceMembersQuery,
  useAddMemberToBoardMutation,
  useGetBoardMembersQuery,
  useChangeBoardMemberRoleMutation,
} = BoardMembersApi;
