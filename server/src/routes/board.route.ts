import { Router } from "express";
import {
  addMemberToBoardController,
  createBoardController,
  getAvailableMembersController,
  getBoardByIdAndWorkspaceController,
  getBoardMembersController,
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
boardRoutes.get("/:boardId/members", getBoardMembersController);

export default boardRoutes;
addMemberToBoardController;
