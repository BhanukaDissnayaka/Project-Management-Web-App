import { asyncHandler } from "../middlewares/asyncHandler";
import { Request, Response } from "express";
import { workspaceIdSchema } from "../validation/workspace.validation";
import { createBoardSchema } from "../validation/board.validation";
import { getMemberInWorkspaceService } from "../services/member.service";
import { checkWorkspacePermission } from "../utils/check-workspace-permission";
import { WorkspacePermissions } from "../enums/workspace-role.enum";
import {
  createBoardService,
  getBoardByIdAndWorkspaceService,
  getBoardsInWorkspaceService,
} from "../services/board.service";
import { HTTPSTATUS } from "../config/http.config";
import { getMemberInBoardService } from "../services/board-member.service";
import { BoardPermissions } from "../enums/board-role.enum";
import { checkBoardPermission } from "../utils/check-board-permission";

export const createBoardController = asyncHandler(
  async (req: Request, res: Response) => {
    const workspaceId = workspaceIdSchema.parse(req.params.workspaceId);
    const userId = req.user?._id;
    const body = createBoardSchema.parse(req.body);
    const { member } = await getMemberInWorkspaceService(userId, workspaceId);
    checkWorkspacePermission(member.role, [WorkspacePermissions.CREATE_BOARD]);
    const { board } = await createBoardService(userId, workspaceId, body);
    return res.status(HTTPSTATUS.CREATED).json({
      message: "Board created successfully",
      board,
    });
  }
);

export const getBoardsInWorkspaceController = asyncHandler(
  async (req: Request, res: Response) => {
    const workspaceId = workspaceIdSchema.parse(req.params.workspaceId);
    const userId = req.user?._id;
    const { member } = await getMemberInWorkspaceService(userId, workspaceId);
    checkWorkspacePermission(member.role, [
      WorkspacePermissions.VIEW_ALL_BOARDS,
    ]);
    const pageSize = parseInt(req.query.pageSize as string) || 8;
    const pageNumber = parseInt(req.query.page as string) || 1;
    const search = (req.query.search as string) || "";
    const { boards, totalBoards, totalPages, skip } =
      await getBoardsInWorkspaceService(
        workspaceId,
        pageSize,
        pageNumber,
        search
      );
    return res.status(HTTPSTATUS.OK).json({
      message: "Boards fetched successfully",
      boards,
      pagination: {
        total: totalBoards,
        limit: pageSize,
        page: pageNumber,
        totalPages,
        skip,
      },
    });
  }
);

export const getBoardByIdAndWorkspaceController = asyncHandler(
  async (req: Request, res: Response) => {
    const workspaceId = workspaceIdSchema.parse(req.params.workspaceId);
    const boardId = req.params.boardId;
    const userId = req.user?._id;
    const { member } = await getMemberInBoardService(userId, boardId);
    checkBoardPermission(member.role, [BoardPermissions.ADD_BOARD_MEMBER]);
    const { board, currentBoardMember } = await getBoardByIdAndWorkspaceService(
      workspaceId,
      boardId,
      userId
    );
    return res.status(HTTPSTATUS.OK).json({
      message: "Board fetched successfully",
      board,
      currentBoardMember,
    });
  }
);
