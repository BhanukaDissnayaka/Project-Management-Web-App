import BoardMemberModel from "../models/board-member.model";
import BoardModel from "../models/board.model";
import { ForbiddenException, NotFoundException } from "../utils/appError";

export const getMemberInBoardService = async (
  userId: string,
  boardId: string
) => {
  const board = await BoardModel.findById(boardId);
  if (!board) {
    throw new NotFoundException("Board not found");
  }
  const member = await BoardMemberModel.findOne({
    userId,
    boardId,
  }).populate("role");

  if (!member) {
    throw new ForbiddenException("You are not a member of this Board");
  }
  return { member };
};
