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
import { PipelineStage } from "mongoose";

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
  return { workspace: workspace, currentMember };
};

export const getAllWorkspacesUserIsMemberService = async (userId: string) => {
  const memberships = await WorkspaceMemberModel.find({ userId })
    .populate("workspaceId")
    .select("-password")
    .exec();
  const workspaces = memberships.map((membership) => membership.workspaceId);
  return { workspaces };
};

export const getWorkspaceMembersService = async (
  search: string,
  workspaceId: string,
  pageNum: number,
  limitNum: number
) => {
  const workspace = await WorkspaceModel.findById(workspaceId);
  if (!workspace) {
    throw new NotFoundException("Workspace not found");
  }
  const pipeline: PipelineStage[] = [
    { $match: { workspaceId: new mongoose.Types.ObjectId(workspaceId) } },

    // Lookup user with only selected fields

    {
      $lookup: {
        from: "users",
        let: { userId: "$userId" },
        pipeline: [
          { $match: { $expr: { $eq: ["$_id", "$$userId"] } } },
          {
            $project: {
              _id: 1,
              name: 1,
              email: 1,
              profilePicture: 1,
            },
          },
        ],
        as: "user",
      },
    },
    { $unwind: "$user" },

    // Lookup role details
    {
      $lookup: {
        from: "workspaceroles", // adjust collection name if different
        let: { role: "$role" },
        pipeline: [
          { $match: { $expr: { $eq: ["$_id", "$$role"] } } },
          { $project: { _id: 1, name: 1 } },
        ],
        as: "role",
      },
    },
    { $unwind: "$role" },
  ];
  const keyword = search.trim();
  if (keyword) {
    pipeline.push({
      $match: {
        $or: [
          { "user.name": { $regex: keyword, $options: "i" } },
          { "user.email": { $regex: keyword, $options: "i" } },
        ],
      },
    });
  }
  const totalPipeline = [...pipeline, { $count: "count" }];
  const [{ count } = { count: 0 }] = await WorkspaceMemberModel.aggregate(
    totalPipeline
  );
  pipeline.push({ $sort: { "user.name": 1 } }); // ascending
  pipeline.push({ $skip: (pageNum - 1) * limitNum });
  pipeline.push({ $limit: limitNum });

  const members = await WorkspaceMemberModel.aggregate(pipeline);

  const roles = await WorkspaceRoleModel.find({}, { _id: 1, name: 1 });

  return {
    members,
    pagination: {
      total: count,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(count / limitNum),
    },
    roles,
  };
};

export const changeWorkspaceRoleService = async (
  workspaceId: string,
  memberId: string,
  roleId: string
) => {
  const workspace = await WorkspaceModel.findById(workspaceId);
  if (!workspace) throw new NotFoundException("Workspace not found");
  const role = await WorkspaceRoleModel.findById(roleId);
  if (!role) throw new NotFoundException("Workspace Role not found");

  const updatedMember = await WorkspaceMemberModel.findOneAndUpdate(
    { userId: memberId, workspaceId: workspaceId },
    { role: roleId },
    { new: true }
  )
    .populate("role", "_id name")
    .lean();
  return { member: updatedMember };
};

export const removeWorkspaceMemberService = async (
  workspaceId: string,
  userId: string
) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const workspace = await WorkspaceModel.findById(workspaceId);
    if (!workspace) throw new NotFoundException("Workspace not found");
    const deletedMember = await WorkspaceMemberModel.findOneAndDelete(
      {
        userId,
        workspaceId,
      },
      { session }
    );
    if (!deletedMember)
      throw new NotFoundException("Member not found in this workspace");
    await session.commitTransaction();
    return { deletedMember };
  } catch (err) {
    await session.abortTransaction();
    throw err;
  } finally {
    session.endSession();
  }
};
