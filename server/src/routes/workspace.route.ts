import { Router } from "express";
import {
  addMemberToWorkspaceController,
  createWorkspaceController,
  getAllWorkspacesUserIsMemberController,
  getWorkspaceByIdController,
  getWorkspaceMembersController,
} from "../controllers/workspace.controller";

const workspaceRoutes = Router();

workspaceRoutes.post("/create/new", createWorkspaceController);
workspaceRoutes.post("/:id/members/", addMemberToWorkspaceController);

workspaceRoutes.get("/:id/members/", getWorkspaceMembersController);

workspaceRoutes.get("/all", getAllWorkspacesUserIsMemberController);

workspaceRoutes.get("/:id", getWorkspaceByIdController);

export default workspaceRoutes;
