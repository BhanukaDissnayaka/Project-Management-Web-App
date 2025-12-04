export type GetAvailableWorkspaceMembersType = {
  workspaceId: string;
  boardId: string;
};

export type AvailableWorkspaceMemberType = {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  workspaceRole: string;
  isAlreadyMember: boolean;
};
export type GetAvailableWorkspaceMembersResponseType = {
  message: string;
  members: AvailableWorkspaceMemberType[];
};

export type AddMemberToBoardType = {
  workspaceId: string;
  boardId: string;
  targetUserId: string;
};
export type AddedBoardMemberType = {
  workspaceMemberId: string;
  boardId: string;
  role: string;
  joinedAt: string;
};
export type AddMemberToBoardResponseType = {
  message: string;
  newMember: AddedBoardMemberType;
};
