import BoardMemberModel from "../models/board-member.model";
import BoardModel from "../models/board.model";
import WorkspaceMemberModel from "../models/workspace-member.model";
import { ForbiddenException, NotFoundException } from "../utils/appError";

export const getMemberInBoardService = async (
  userId: string,
  boardId: string,
  workspaceId: string
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
  const workspaceMember = await WorkspaceMemberModel.findOne({
    userId,
    workspaceId: workspaceId,
  });
  if (!workspaceMember) {
    throw new ForbiddenException("You are not a member of this workspace");
  }
  const boardMember = await BoardMemberModel.findOne({
    workspaceMemberId: workspaceMember._id,
    boardId,
  }).populate("role");

  if (!boardMember) {
    throw new ForbiddenException("You are not a member of this Board");
  }
  return { boardMember };
};
