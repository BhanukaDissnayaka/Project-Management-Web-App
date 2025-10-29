import { asyncHandler } from "../middlewares/asyncHandler";
import { Request, Response } from "express";
import { workspaceIdSchema } from "../validation/workspace.validation";
import { createBoardSchema } from "../validation/board.validation";
import { getMemberInWorkspaceService } from "../services/member.service";
import { checkWorkspacePermission } from "../utils/check-workspace-permission";
import { WorkspacePermissions } from "../enums/workspace-role.enum";
import { createBoardService } from "../services/board.service";
import { HTTPSTATUS } from "../config/http.config";

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
