import { baseApi } from "@/api/baseApi";
import type {
  CreateListResponseType,
  CreateListType,
  GetListsInBoardResponseType,
  GetListsInBoardType,
  UpdateListResponseType,
  UpdateListType,
} from "../types/list.type";
import { showErrorToast } from "@/lib/toastHandler";

export const listApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createList: builder.mutation<CreateListResponseType, CreateListType>({
      query: ({ workspaceId, boardId, body }) => ({
        url: `workspace/${workspaceId}/boards/${boardId}/lists/create`,
        method: "POST",
        body,
      }),
      async onQueryStarted(
        { workspaceId, boardId, body },
        { dispatch, queryFulfilled }
      ) {
        const tempId = `temp-${Date.now()}`;
        const patchResult = dispatch(
          listApi.util.updateQueryData(
            "getListsInBoard",
            { workspaceId, boardId },
            (draft) => {
              draft.cardLists.push({
                _id: tempId,
                title: body.title,
                position: Number.MAX_SAFE_INTEGER,
                isTemp: true,
              });
            }
          )
        );
        try {
          const { data } = await queryFulfilled;
          dispatch(
            listApi.util.updateQueryData(
              "getListsInBoard",
              { workspaceId, boardId },
              (draft) => {
                const index = draft.cardLists.findIndex(
                  (list) => list._id === tempId
                );
                if (index !== -1) {
                  draft.cardLists[index] = data.cardList;
                }
              }
            )
          );
        } catch {
          patchResult.undo();
          showErrorToast("Failed to create list. Please try again.");
        }
      },
    }),

    getListsInBoard: builder.query<
      GetListsInBoardResponseType,
      GetListsInBoardType
    >({
      query: ({ workspaceId, boardId }) => ({
        url: `workspace/${workspaceId}/boards/${boardId}/lists`,
        method: "GET",
      }),
    }),
    updateList: builder.mutation<UpdateListResponseType, UpdateListType>({
      query: ({ workspaceId, boardId, listId, body }) => ({
        url: `workspace/${workspaceId}/boards/${boardId}/lists/${listId}/update`,
        method: "PUT",
        body,
      }),
      async onQueryStarted(
        { workspaceId, boardId, listId, body },
        { dispatch, queryFulfilled }
      ) {
        const patchResult = dispatch(
          listApi.util.updateQueryData(
            "getListsInBoard",
            { workspaceId, boardId },
            (draft) => {
              const list = draft.cardLists.find((list) => list._id === listId);
              if (list) {
                list.title = body.title ?? list.title;
                list.description = body.description ?? list.description;
              }
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
          showErrorToast("Failed to update list. Please try again.");
        }
      },
    }),
  }),
});

export const {
  useCreateListMutation,
  useGetListsInBoardQuery,
  useUpdateListMutation,
} = listApi;
