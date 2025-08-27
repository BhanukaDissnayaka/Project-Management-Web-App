import { WorkspaceRoles } from "../enums/workspace-role.enum";
import UserModel from "../models/user.model";
import WorkspaceMemberModel from "../models/workspace-member.model";
import WorkspaceRoleModel from "../models/workspace-role-permission.model";
import WorkspaceModel from "../models/workspace.model";
import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from "../utils/appError";
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
export const addMemberToWorkspaceService = async (
  userId: string,
  workspaceId: string
) => {
  // check workspace exit
  const workspace = await WorkspaceModel.findById(workspaceId);
  if (!workspace) {
    throw new NotFoundException("workspace not found");
  }

  // check user is exist
  const user = await UserModel.findById(userId);
  if (!user) {
    throw new NotFoundException("user not found");
  }

  // Check if user is already a member
  const existingMember = await WorkspaceMemberModel.findOne({
    userId,
    workspaceId: workspace._id,
  });
  if (existingMember) {
    throw new BadRequestException(
      "This user is already a member of this workspace"
    );
  }

  const role = await WorkspaceRoleModel.findOne({
    name: WorkspaceRoles.MEMBER,
  });
  if (!role) {
    throw new NotFoundException("Role not found");
  }

  // Add user to workspace as a member
  const newMember = new WorkspaceMemberModel({
    userId,
    workspaceId: workspace._id,
    role: role._id,
  });
  await newMember.save();

  return { workspaceId: workspace._id, role: role.name };
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
