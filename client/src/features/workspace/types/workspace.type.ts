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
export type AllWorkspaceResponseType = {
  workspaces: WorkspaceType[];
  message: string;
};
export type CreateWorkspaceType = {
  name: string;
  description: string;
};

export type CreateWorkspaceResponseType = {
  message: string;
  workspace: WorkspaceType;
};
