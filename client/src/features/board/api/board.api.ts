import { baseApi } from "@/api/baseApi";
import type {
  CreateBoardResponseType,
  CreateBoardType,
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
  }),
});

export const { useCreateBoardMutation } = boardApi;
