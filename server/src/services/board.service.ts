import mongoose from "mongoose";
import { BoardRoles } from "../enums/board-role.enum";
import BoardMemberModel from "../models/board-member.model";
import BoardRoleModel from "../models/board-role-permission.model";
import BoardModel from "../models/board.model";
import UserModel, { UserDocument } from "../models/user.model";
import WorkspaceModel from "../models/workspace.model";
import { NotFoundException } from "../utils/appError";
import { BoardColorValueType } from "../enums/board.enum";
import WorkspaceMemberModel from "../models/workspace-member.model";

export const createBoardService = async (
  userId: string,
  workspaceId: string,
  body: {
    name: string;
    description?: string | undefined;
    bgColor?: BoardColorValueType | undefined;
  }
) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { name, description, bgColor } = body;
    const user = await UserModel.findById(userId).session(session);
    if (!user) {
      throw new NotFoundException("User not found");
    }
    const workspaceMember = await WorkspaceMemberModel.findOne({
      userId,
      workspaceId,
    });
    if (!workspaceMember) {
      throw new NotFoundException("You are not a member of this workspace");
    }
    const workspace = await WorkspaceModel.findById(workspaceId).session(
      session
    );
    if (!workspace) {
      throw new NotFoundException("Workspace Not Found");
    }
    const boardAdminRole = await BoardRoleModel.findOne({
      name: BoardRoles.BOARD_ADMIN,
    }).session(session);
    if (!boardAdminRole) {
      throw new NotFoundException("Admin role not found");
    }
    const board = new BoardModel({
      name,
      description,
      bgColor,
      workspace: workspace._id,
      createdBy: user._id,
    });
    await board.save({ session });
    const member = new BoardMemberModel({
      workspaceMemberId: workspaceMember._id,
      userId: user._id,
      boardId: board._id,
      role: boardAdminRole._id,
      joinedAt: new Date(),
    });
    await member.save({ session });
    await session.commitTransaction();
    session.endSession();
    return { board };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

export const getBoardsInWorkspaceService = async (
  workspaceId: string,
  pageSize: number,
  pageNumber: number,
  search: string
) => {
  const skip = (pageNumber - 1) * pageSize;

  const matchStage: any = {
    workspace: new mongoose.Types.ObjectId(workspaceId),
  };

  if (search.trim() !== "") {
    matchStage.$or = [
      { name: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }

  const boards = await BoardModel.aggregate([
    { $match: matchStage },
    { $sort: { updatedAt: -1 } },

    // Lookup members
    {
      $lookup: {
        from: "boardmembers",
        localField: "_id",
        foreignField: "boardId",
        as: "members",
      },
    },
    {
      $project: {
        name: 1,
        description: 1,
        bgColor: 1,
        memberCount: { $size: "$members" },
        createdAt: 1,
        updatedAt: 1,
      },
    },

    // Pagination stages
    { $skip: skip },
    { $limit: pageSize },
  ]);
  const totalBoards = await BoardModel.countDocuments(matchStage);

  return {
    boards,
    totalBoards,
    totalPages: Math.ceil(totalBoards / pageSize),
    skip,
  };
};

export const getBoardByIdAndWorkspaceService = async (
  workspaceId: string,
  boardId: string,
  userId: string
) => {
  const board = await BoardModel.findOne({
    _id: boardId,
    workspace: workspaceId,
  });
  if (!board) {
    throw new NotFoundException(
      "Board not found or does not belong to the specified workspace"
    );
  }
  const currentBoardMember = await BoardMemberModel.findOne({
    userId,
    boardId,
  }).populate("role");
  return { board, currentBoardMember };
};

export const updateBoardService = async (
  workspaceId: string,
  boardId: string,
  body: {
    name: string;
    description?: string;
    bgColor?: BoardColorValueType | undefined;
  }
) => {
  const { name, description, bgColor } = body;
  const board = await BoardModel.findOne({
    _id: boardId,
    workspace: workspaceId,
  });
  if (!board) {
    throw new NotFoundException(
      "Board not found or does not belong to the specified workspace"
    );
  }
  if (name) board.name = name;
  if (description) board.description = description;
  if (bgColor) board.bgColor = bgColor;
  await board.save();
  return { board };
};

export const getAvailableMembersService = async (
  workspaceId: string,
  boardId: string,
  search: string,
  pageSize: number,
  pageNumber: number
) => {
  const board = await BoardModel.findOne({
    _id: boardId,
    workspace: workspaceId,
  });
  if (!board) {
    throw new NotFoundException(
      "Board not found or does not belong to the specified workspace"
    );
  }
  const skip = (pageNumber - 1) * pageSize;

  const workspaceMembers = await WorkspaceMemberModel.find({
    workspaceId,
  })
    .skip(skip)
    .limit(pageSize)
    .populate<{ userId: UserDocument }>({
      path: "userId",
      select: "name email profilePicture",
      match: search
        ? {
            $or: [
              { name: { $regex: search, $options: "i" } },
              { email: { $regex: search, $options: "i" } },
            ],
          }
        : {},
    });
  const boardMembers = await BoardMemberModel.find({ boardId });
  const boardMemberIds = new Set(
    boardMembers.map((m) => String(m.workspaceMemberId))
  );
  const totalMembers = await WorkspaceMemberModel.countDocuments({
    workspaceId,
  });
  const result = workspaceMembers.map((wm) => ({
    userId: wm.userId._id,
    name: wm.userId.name,
    email: wm.userId.email,
    avatar: wm.userId.profilePicture,
    workspaceRole: wm.role,
    isAlreadyMember: boardMemberIds.has(String(wm._id)),
  }));
  return {
    members: result,
    totalMembers,
    totalPages: Math.ceil(totalMembers / pageSize),
    skip,
  };
};
