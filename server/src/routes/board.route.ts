import { Router } from "express";
import {
  addMemberToBoardController,
  createBoardController,
  getAvailableMembersController,
  getBoardByIdAndWorkspaceController,
  getBoardsInWorkspaceController,
  updateBoardController,
} from "../controllers/board.controller";

const boardRoutes = Router({ mergeParams: true });

boardRoutes.post("/create", createBoardController);
boardRoutes.post("/:boardId/update", updateBoardController);
boardRoutes.post("/:boardId/members", addMemberToBoardController);
boardRoutes.get("/all", getBoardsInWorkspaceController);
boardRoutes.get("/:boardId", getBoardByIdAndWorkspaceController);
boardRoutes.get("/:boardId/available-members", getAvailableMembersController);

export default boardRoutes;
addMemberToBoardController;
