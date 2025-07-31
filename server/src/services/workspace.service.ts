import WorkspaceMemberModel from "../models/workspace-member.model";
import WorkspaceModel from "../models/workspace.model";
import { NotFoundException, UnauthorizedException } from "../utils/appError";

export const getWorkspaceByIdService = async (
  userId: string,
  workspaceId: string
) => {
  const workspace = await WorkspaceModel.findById(workspaceId);
  if (!workspace) {
    throw new NotFoundException("Workspace not found");
  }
  const currentMember = await WorkspaceMemberModel.findOne({
    userId,
    workspaceId,
  }).populate("role");

  if (!currentMember) {
    throw new UnauthorizedException("You are not a member of this workspace");
  }
  const workspaceWithCurrentMember = {
    ...workspace.toObject(),
    currentMember,
  };
  return { workspace: workspaceWithCurrentMember };
};

export const getAllWorkspacesUserIsMemberService = async (userId: string) => {
  const memberships = await WorkspaceMemberModel.find({ userId })
    .populate("workspaceId")
    .select("-password")
    .exec();
  const workspaces = memberships.map((membership) => membership.workspaceId);
  return { workspaces };
};
