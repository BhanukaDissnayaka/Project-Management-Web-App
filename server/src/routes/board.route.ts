import { Router } from "express";
import {
  createBoardController,
  getAvailableMembersController,
  getBoardByIdAndWorkspaceController,
  getBoardsInWorkspaceController,
  updateBoardController,
} from "../controllers/board.controller";

const boardRoutes = Router({ mergeParams: true });

boardRoutes.post("/create", createBoardController);
boardRoutes.post("/:boardId/update", updateBoardController);
boardRoutes.get("/all", getBoardsInWorkspaceController);
boardRoutes.get("/:boardId", getBoardByIdAndWorkspaceController);
boardRoutes.get("/:boardId/available-memebers", getAvailableMembersController);

export default boardRoutes;
