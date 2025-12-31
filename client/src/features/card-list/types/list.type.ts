export type CreateListType = {
  workspaceId: string;
  boardId: string;
  body: { title: string; description?: string; position: number };
};
export type CreateListResponseType = {
  message: string;
  cardList: {
    _id: string;
    title: string;
    description?: string;
    boardId: string;
    workspaceId: string;
    position: number;
    createdAt: string;
    updatedAt: string;
  };
};
