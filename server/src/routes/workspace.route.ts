import { Router } from "express";
import { getWorkspaceByIdController } from "../controllers/workspace.controller";

const workspaceRoutes = Router();

workspaceRoutes.get("/:id", getWorkspaceByIdController);

export default workspaceRoutes;
