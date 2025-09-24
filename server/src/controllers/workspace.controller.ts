import { asyncHandler } from "../middlewares/asyncHandler";
import { Request, Response } from "express";
import {
  addMemberToWorkspaceService,
  changeWorkspaceRoleService,
  createWorkspaceService,
  getAllWorkspacesUserIsMemberService,
  getWorkspaceByIdService,
  getWorkspaceMembersService,
  removeWorkspaceMemberService,
} from "../services/workspace.service";
import { HTTPSTATUS } from "../config/http.config";
import {
  addMemberToWorkspaceSchema,
  changeMemberRoleSchema,
  createWorkspaceSchema,
  removeWorkspaceMemberSchema,
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

export const getWorkspaceMembersController = asyncHandler(
  async (req: Request, res: Response) => {
    const workspaceId = workspaceIdSchema.parse(req.params.id);
    const userId = req.user?._id;
    const { member } = await getMemberInWorkspaceService(userId, workspaceId);
    checkWorkspacePermission(member.role, [WorkspacePermissions.VIEW_ONLY]);
    const search = (req.query.search as string) || "";
    const pageNum = parseInt(req.query.page as string) || 1;
    const limitNum = parseInt(req.query.limit as string) || 10;

    const { members, pagination, roles } = await getWorkspaceMembersService(
      search,
      workspaceId,
      pageNum,
      limitNum
    );
    return res.status(HTTPSTATUS.OK).json({
      message: "Workspace members retrieved successfully",
      members,
      pagination,
      roles,
    });
  }
);

export const changeMemberRoleController = asyncHandler(
  async (req: Request, res: Response) => {
    const workspaceId = workspaceIdSchema.parse(req.params.id);
    const { roleId, memberId: targetMemberId } = changeMemberRoleSchema.parse(
      req.body
    );
    const userId = req.user?._id;
    const { member } = await getMemberInWorkspaceService(userId, workspaceId);
    checkWorkspacePermission(member.role, [
      WorkspacePermissions.CHANGE_WORKSPACE_MEMBER_ROLE,
    ]);
    const { member: targetMember } = await changeWorkspaceRoleService(
      workspaceId,
      targetMemberId,
      roleId
    );
    return res.status(HTTPSTATUS.OK).json({
      message: "Member Role changed successfully",
      member: targetMember,
    });
  }
);

export const removeWorkspaceMemberController = asyncHandler(
  async (req: Request, res: Response) => {
    const { id: workspaceId, userId: targetUserId } =
      removeWorkspaceMemberSchema.parse(req.params);
    const userId = req.user?._id;
    const { member } = await getMemberInWorkspaceService(userId, workspaceId);
    checkWorkspacePermission(member.role, [
      WorkspacePermissions.REMOVE_WORKSPACE_MEMBER,
    ]);
    const { deletedMember } = await removeWorkspaceMemberService(
      workspaceId,
      targetUserId
    );
    return res.status(HTTPSTATUS.OK).json({
      message: "Member removed successfully",
      member: deletedMember,
    });
  }
);
