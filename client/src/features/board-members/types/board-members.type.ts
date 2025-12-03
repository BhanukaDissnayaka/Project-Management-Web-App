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
