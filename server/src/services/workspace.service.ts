import { WorkspaceRoles } from "../enums/workspace-role.enum";
import UserModel from "../models/user.model";
import WorkspaceMemberModel from "../models/workspace-member.model";
import WorkspaceRoleModel from "../models/workspace-role-permission.model";
import WorkspaceModel from "../models/workspace.model";
import { NotFoundException, UnauthorizedException } from "../utils/appError";
import mongoose from "mongoose";

export const createWorkspaceService = async (
  userId: string,
  body: {
    name: string;
    description?: string | undefined;
  }
) => {
  const { name, description } = body;
  const user = await UserModel.findById(userId);
  if (!user) {
    throw new NotFoundException("User not found");
  }

  const ownerRole = await WorkspaceRoleModel.findOne({
    name: WorkspaceRoles.OWNER,
  });
  if (!ownerRole) {
    throw new NotFoundException("Owner role not found");
  }

  const workspace = new WorkspaceModel({
    name,
    description,
    owner: user._id,
  });
  workspace.save();

  const member = new WorkspaceMemberModel({
    userId: user._id,
    workspaceId: workspace._id,
    role: ownerRole._id,
    joinedAt: new Date(),
  });

  await member.save();
  user.currentWorkspace = workspace._id as mongoose.Types.ObjectId;
  await user.save();
  return {
    workspace,
  };
};

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
