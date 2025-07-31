import WorkspaceMemberModel from "../models/workspace-member.model";
import WorkspaceModel from "../models/workspace.model";
import { ForbiddenException, NotFoundException } from "../utils/appError";

export const getMemberInWorkspaceService = async (
  userId: string,
  workspaceId: string
) => {
  const workspace = await WorkspaceModel.findById(workspaceId);
  if (!workspace) {
    throw new NotFoundException("Workspace not found");
  }
  const member = await WorkspaceMemberModel.findOne({
    userId,
    workspaceId,
  }).populate("role");

  if (!member) {
    throw new ForbiddenException("You are not a member of this workspace");
  }
  return { member };
};
