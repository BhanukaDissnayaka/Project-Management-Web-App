export type SearchDataType = {
  values: {
    searchValue: string;
  };
  workspaceId: string;
};
export type searchedUserType = {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  isMember: boolean;
};

export type SearchUserResponseType = {
  message: string;
  users: searchedUserType[];
};

export type AddUserToWorkspaceType = {
  workspaceId: string;
  userId: string;
};
export type AddUserToWorkspaceResponseType = {
  workspaceId: string;
  userId: string;
};
export type getWorkspaceMembersType = {
  searchValue: string;
  workspaceId: string;
  page: number;
  limit: number;
};

export type SearchedMemberType = {
  _id: string;
  userId: string;
  workspaceId: string;
  role: {
    _id: string;
    name: string;
  };
  joinedAt: string;
  user: {
    _id: string;
    name: string;
    email: string;
    profilePicture: string | null;
  };
};

export type getWorkspaceMembersResponseType = {
  message: string;
  members: SearchedMemberType[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  roles: RoleType[];
};

export type RoleType = {
  _id: string;
  name: string;
};

export type changeMemberRoleType = {
  workspaceId: string;
  roleId: string;
  memberId: string;
};

export type MemberWithRoleType = {
  _id: string;
  userId: string;
  workspaceId: string;
  role: {
    _id: string;
    name: string;
  };
};
export type changeMemberRoleResponseType = {
  message: string;
  member: MemberWithRoleType;
};

export type RemoveWorkspaceMemberType = {
  workspaceId: string;
  userId: string;
};

export type RemoveWorkspaceMemberResponseType = {
  message: string;
  member: {
    _id: string;
    userId: string;
    workspaceId: string;
    role: string;
  };
};
