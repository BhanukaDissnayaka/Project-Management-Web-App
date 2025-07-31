import { asyncHandler } from "../middlewares/asyncHandler";
import { Request, Response } from "express";
import { getWorkspaceByIdService } from "../services/workspace.service";
import { HTTPSTATUS } from "../config/http.config";
import { workspaceIdSchema } from "../validation/workspace.validation";
import { getMemberInWorkspaceService } from "../services/member.service";

export const getWorkspaceByIdController = asyncHandler(
  async (req: Request, res: Response) => {
    const workspaceId = workspaceIdSchema.parse(req.params.id);
    const userId = req.user?._id;
    console.log(workspaceId, "userId:", userId);

    await getMemberInWorkspaceService(userId, workspaceId);
    const { workspace } = await getWorkspaceByIdService(userId, workspaceId);
    return res.status(HTTPSTATUS.OK).json({
      message: "Workspace fetched successfully",
      workspace,
    });
  }
);
