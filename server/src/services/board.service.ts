import mongoose from "mongoose";
import { BoardRoles } from "../enums/board-role.enum";
import BoardMemberModel from "../models/board-member.model";
import BoardRoleModel from "../models/board-role-permission.model";
import BoardModel from "../models/board.model";
import UserModel from "../models/user.model";
import WorkspaceModel from "../models/workspace.model";
import { NotFoundException } from "../utils/appError";
import { BoardColorValueType } from "../enums/board.enum";

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
