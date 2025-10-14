import { baseApi } from "@/api/baseApi";
import type {
  AddUserToWorkspaceResponseType,
  AddUserToWorkspaceType,
  RemoveWorkspaceMemberResponseType,
  RemoveWorkspaceMemberType,
  SearchDataType,
  SearchUserResponseType,
  changeMemberRoleResponseType,
  changeMemberRoleType,
  getWorkspaceMembersResponseType,
  getWorkspaceMembersType,
} from "../types/workspace-members.type";

const workspaceMembersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSearchedUsers: builder.query<SearchUserResponseType, SearchDataType>({
      query: ({ values, workspaceId }) => ({
        url: `user/workspaces/${workspaceId}/search-users`,
        method: "GET",
        params: { q: values.searchValue },
      }),
      providesTags: () => [{ type: "SearchUser", id: "LIST" }],
    }),

    addUserToWorkspace: builder.mutation<
      AddUserToWorkspaceResponseType,
      AddUserToWorkspaceType
    >({
      query: ({ workspaceId, userId }) => ({
        url: `workspace/${workspaceId}/members/`,
        method: "POST",
        body: { userId },
      }),
      invalidatesTags: [{ type: "SearchUser", id: "LIST" }],
    }),
    getWorkspaceMembers: builder.query<
      getWorkspaceMembersResponseType,
      getWorkspaceMembersType
    >({
      query: ({ searchValue, workspaceId, page, limit }) => ({
        url: `workspace/${workspaceId}/members`,
        method: "GET",
        params: { search: searchValue, page, limit },
      }),
      providesTags: () => [{ type: "WorkspaceMember", id: "LIST" }],
    }),
    changeMemberRole: builder.mutation<
      changeMemberRoleResponseType,
      changeMemberRoleType
    >({
      query: ({ workspaceId, roleId, memberId }) => ({
        url: `workspace/${workspaceId}/members/role`,
        method: "PUT",
        body: { roleId, memberId },
      }),
      invalidatesTags: [{ type: "WorkspaceMember", id: "LIST" }],
    }),
    removeWorkspaceMember: builder.mutation<
      RemoveWorkspaceMemberResponseType,
      RemoveWorkspaceMemberType
    >({
      query: ({ workspaceId, userId }) => ({
        url: `workspace/${workspaceId}/members/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "WorkspaceMember", id: "LIST" }],
    }),
  }),
});

export const {
  useLazyGetSearchedUsersQuery,
  useAddUserToWorkspaceMutation,
  useGetWorkspaceMembersQuery,
  useChangeMemberRoleMutation,
  useRemoveWorkspaceMemberMutation,
} = workspaceMembersApi;
