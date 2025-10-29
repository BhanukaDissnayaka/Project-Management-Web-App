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
