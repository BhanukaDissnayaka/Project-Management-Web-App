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

export type getWorkspaceMembersResponseType = {
  message: string;
  members: {
    _id: string;
    userId: string;
    workspaceId: string;
    role: {
      _id: string;
      name: string;
    };
    joinedAt: string;
    createdAt: string;
    updatedAt: string;
    user: {
      _id: string;
      name: string;
      email: string;
      profilePicture: string | null;
    };
  }[];
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
