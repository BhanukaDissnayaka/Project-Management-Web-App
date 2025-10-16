import type { WorkspacePermissionsType } from "@/constant/permissions";

export type WorkspaceType = {
  _id: string;
  name: string;
  description: string;
  owner: string;
};

export type currentMemberType = {
  _id: string;
  userId: string;
  workspaceId: string;
  role: {
    _id: string;
    name: string;
    permissions: WorkspacePermissionsType[];
  };
  joinedAt: string;
  createdAt: string;
};

export type WorkspaceByIdResponseType = {
  workspace: WorkspaceType;
  currentMember: currentMemberType;
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

export type UpdateWorkspaceType = {
  workspaceId: string;
  body: {
    name: string;
    description: string;
  };
};
export type UpdateWorkspaceResponseType = {
  message: string;
  workspace: WorkspaceType;
};

export type DeleteWorkspaceType = {
  workspaceId: string;
};
export type DeleteWorkspaceResponseType = {
  message: string;
  currentWorkspace: string;
};
