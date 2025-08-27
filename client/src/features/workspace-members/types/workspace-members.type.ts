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
