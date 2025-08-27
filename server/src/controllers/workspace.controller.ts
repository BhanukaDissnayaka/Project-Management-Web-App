import { asyncHandler } from "../middlewares/asyncHandler";
import { Request, Response } from "express";
import {
  addMemberToWorkspaceService,
  createWorkspaceService,
  getAllWorkspacesUserIsMemberService,
  getWorkspaceByIdService,
} from "../services/workspace.service";
import { HTTPSTATUS } from "../config/http.config";
import {
  addMemberToWorkspaceSchema,
  createWorkspaceSchema,
  workspaceIdSchema,
} from "../validation/workspace.validation";
import { getMemberInWorkspaceService } from "../services/member.service";
import { checkWorkspacePermission } from "../utils/check-workspace-permission";
import { WorkspacePermissions } from "../enums/workspace-role.enum";

export const createWorkspaceController = asyncHandler(
  async (req: Request, res: Response) => {
    const body = createWorkspaceSchema.parse(req.body);
    const userId = req.user?._id;
    const { workspace } = await createWorkspaceService(userId, body);
    return res.status(HTTPSTATUS.CREATED).json({
      message: "Workspace created successfully",
      workspace,
    });
  }
);

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

export const getAllWorkspacesUserIsMemberController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;
    const { workspaces } = await getAllWorkspacesUserIsMemberService(userId);
    return res.status(HTTPSTATUS.OK).json({
      message: "User workspaces fetched successfully ",
      workspaces,
    });
  }
);

export const addMemberToWorkspaceController = asyncHandler(
  async (req: Request, res: Response) => {
    const workspaceId = workspaceIdSchema.parse(req.params.id);
    const userId = req.user?._id;
    const body = addMemberToWorkspaceSchema.parse(req.body);
    const { userId: targetUserId } = body;

    const { member } = await getMemberInWorkspaceService(userId, workspaceId);
    checkWorkspacePermission(member.role, [
      WorkspacePermissions.ADD_WORKSPACE_MEMBER,
    ]);

    await addMemberToWorkspaceService(targetUserId, workspaceId);
    return res.status(HTTPSTATUS.OK).json({
      message: "Member added to workspace successfully",
    });
  }
);
