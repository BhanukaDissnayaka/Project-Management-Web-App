export type GetAvailableWorkspaceMembersType = {
  workspaceId: string;
  boardId: string;
};

export type AvailableWorkspaceMemberType = {
  _id: string;
  userId: string;
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
export type GetBoardMembersType = {
  workspaceId: string;
  boardId: string;
};
export type BoardMemberType = {
  _id: string;
  workspaceMemberId: string;
  userId: {
    _id: string;
    name: string;
    email: string;
    profilePicture: string;
  };
  boardId: string;
  role: {
    _id: string;
    name: string;
  };
  joinedAt: string;
  createdAt: string;
  updatedAt: string;
};
export type BoardRoleType = {
  _id: string;
  name: string;
};
export type GetBoardMembersResponseType = {
  message: string;
  boardMembers: BoardMemberType[];
  boardRoles: BoardRoleType[];
};
