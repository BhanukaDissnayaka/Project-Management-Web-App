import { HTTPSTATUS } from "../config/http.config";
import { asyncHandler } from "../middlewares/asyncHandler";
import { Request, Response } from "express";
import { workspaceIdSchema } from "../validation/workspace.validation";
import { getMemberInWorkspaceService } from "../services/member.service";
import { checkWorkspacePermission } from "../utils/check-workspace-permission";
import { WorkspacePermissions } from "../enums/workspace-role.enum";
import { searchUsersService } from "../services/user.service";

export const getCurrentUser = asyncHandler(
  async (req: Request, res: Response) => {
    res
      .status(HTTPSTATUS.OK)
      .json({ message: "User fetch successfully", user: req.user });
  }
);

export const searchUsersController = asyncHandler(
  async (req: Request, res: Response) => {
    const workspaceId = workspaceIdSchema.parse(req.params.workspaceId);
    const query = req.query.q as string;
    const currentUserId = req.user?._id;

    const { member } = await getMemberInWorkspaceService(
      currentUserId,
      workspaceId
    );
    checkWorkspacePermission(member.role, [
      WorkspacePermissions.ADD_WORKSPACE_MEMBER,
    ]);

    const users = await searchUsersService(query, workspaceId);

    return res.status(200).json({
      message: "Users fetched successfully",
      users,
    });
  }
);
