import { Router } from "express";
import {
  removeWorkspaceMemberController,
  addMemberToWorkspaceController,
  changeMemberRoleController,
  createWorkspaceController,
  getAllWorkspacesUserIsMemberController,
  getWorkspaceByIdController,
  getWorkspaceMembersController,
} from "../controllers/workspace.controller";

const workspaceRoutes = Router();

workspaceRoutes.post("/create/new", createWorkspaceController);

workspaceRoutes.post("/:id/members/", addMemberToWorkspaceController);

workspaceRoutes.put("/:id/members/role", changeMemberRoleController);

workspaceRoutes.get("/:id/members/", getWorkspaceMembersController);

workspaceRoutes.get("/all", getAllWorkspacesUserIsMemberController);

workspaceRoutes.delete("/:id/members/:userId", removeWorkspaceMemberController);

workspaceRoutes.get("/:id", getWorkspaceByIdController);

export default workspaceRoutes;
