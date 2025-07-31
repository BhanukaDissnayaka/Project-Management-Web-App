export type WorkspaceType = {
  _id: string;
  name: string;
  description: string;
  owner: string;
  inviteCode: string;
};

export type WorkspaceByIdResponseType = {
  workspace: WorkspaceType;
  message: string;
};
