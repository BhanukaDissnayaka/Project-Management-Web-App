import { baseApi } from "@/api/baseApi";
import type {
  CreateListResponseType,
  CreateListType,
} from "../types/list.type";

export const listApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createList: builder.mutation<CreateListResponseType, CreateListType>({
      query: ({ workspaceId, boardId, body }) => ({
        url: `workspace/${workspaceId}/boards/${boardId}/lists/create`,
        method: "POST",
        body,
      }),
      // todo - need to do optimistic updates here
    }),
  }),
});

export const { useCreateListMutation } = listApi;
