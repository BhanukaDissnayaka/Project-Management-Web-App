export type CreateListType = {
  workspaceId: string;
  boardId: string;
  body: { title: string; description?: string; position: number };
};
export type CardListType = {
  _id: string;
  title: string;
  description?: string;
  boardId?: string;
  workspaceId?: string;
  position: number;
  createdAt?: string;
  updatedAt?: string;
  isTemp?: boolean;
};

export type CreateListResponseType = {
  message: string;
  cardList: CardListType;
};
export type GetListsInBoardType = {
  workspaceId: string;
  boardId: string;
};
export type GetListsInBoardResponseType = {
  message: string;
  cardLists: CardListType[];
};
