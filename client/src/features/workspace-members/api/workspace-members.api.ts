import { baseApi } from "@/api/baseApi";
import type {
  AddUserToWorkspaceResponseType,
  AddUserToWorkspaceType,
  SearchDataType,
  SearchUserResponseType,
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
  }),
});

export const {
  useGetSearchedUsersQuery,
  useLazyGetSearchedUsersQuery,
  useAddUserToWorkspaceMutation,
} = workspaceMembersApi;
