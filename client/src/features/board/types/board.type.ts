export type BoardType = {
  name: string;
  description: string | null;
  bgColor: string;
  workspace: string;
  createdBy: string;
  createdAt: Date;
};
export type CreateBoardType = {
  workspaceId: string;
  body: { name: string; description: string; bgColor?: string };
};
export type CreateBoardResponseType = {
  message: string;
  board: BoardType;
};
export type GetAllBoardsInWorkspaceType = {
  workspaceId: string;
  page: number;
  pageSize: number;
  search: string;
};

export type BoardCardType = {
  _id: string;
  name: string;
  description?: string;
  bgColor?: string;
  memberCount: number;
  updatedAt: string;
  createdAt: string;
};

export type GetAllBoardsInWorkspaceResponseType = {
  message: string;
  boards: BoardCardType[];
  pagination: {
    total: number;
    limit: number;
    page: number;
    totalPages: number;
  };
};
