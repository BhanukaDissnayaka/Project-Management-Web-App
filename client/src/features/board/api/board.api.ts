import { baseApi } from "@/api/baseApi";
import type {
  CreateBoardResponseType,
  CreateBoardType,
  GetAllBoardsInWorkspaceResponseType,
  GetAllBoardsInWorkspaceType,
  GetBoardByIdAndWorkspaceResponseType,
  GetBoardByIdAndWorkspaceType,
  UpdateBoardResponseType,
  UpdateBoardType,
} from "../types/board.type";

export const boardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBoard: builder.mutation<CreateBoardResponseType, CreateBoardType>({
      query: ({ workspaceId, body }) => ({
        url: `workspace/${workspaceId}/boards/create`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Board", id: "LIST" }],
    }),
    getAllBoardsInWorkspace: builder.query<
      GetAllBoardsInWorkspaceResponseType,
      GetAllBoardsInWorkspaceType
    >({
      query: ({ workspaceId, page, search, pageSize }) => ({
        url: `workspace/${workspaceId}/boards/all`,
        method: "GET",
        params: { page, search, pageSize },
      }),
      providesTags: (result) =>
        result
          ? [
              { type: "Board", id: "LIST" },
              ...result.boards.map((b) => ({
                type: "Board" as const,
                id: b._id,
              })),
            ]
          : [{ type: "Board", id: "LIST" }],
    }),
    getBoardByIdAndWorkspace: builder.query<
      GetBoardByIdAndWorkspaceResponseType,
      GetBoardByIdAndWorkspaceType
    >({
      query: ({ workspaceId, boardId }) => ({
        url: `workspace/${workspaceId}/boards/${boardId}`,
        method: "GET",
      }),
      providesTags: (result, __, { boardId }) =>
        result
          ? [
              { type: "Board", id: boardId },
              { type: "Board", id: "LIST" },
            ]
          : [{ type: "Board", id: "LIST" }],
    }),

    updateBoard: builder.mutation<UpdateBoardResponseType, UpdateBoardType>({
      query: ({ workspaceId, boardId, body }) => ({
        url: `workspace/${workspaceId}/boards/${boardId}/update`,
        method: "POST",
        body,
      }),
      invalidatesTags: (_, __, { boardId }) => [
        { type: "Board", id: boardId },
        { type: "Board", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useCreateBoardMutation,
  useGetAllBoardsInWorkspaceQuery,
  useGetBoardByIdAndWorkspaceQuery,
  useUpdateBoardMutation,
} = boardApi;
