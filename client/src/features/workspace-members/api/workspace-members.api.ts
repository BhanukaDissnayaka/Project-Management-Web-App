import { baseApi } from "@/api/baseApi";
import type {
  AddUserToWorkspaceResponseType,
  AddUserToWorkspaceType,
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
      providesTags: () => [{ type: "SearchUsersList" }],
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
      invalidatesTags: ["SearchUsersList"],
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
    }),
  }),
});

export const {
  useLazyGetSearchedUsersQuery,
  useAddUserToWorkspaceMutation,
  useGetWorkspaceMembersQuery,
  useChangeMemberRoleMutation,
} = workspaceMembersApi;
