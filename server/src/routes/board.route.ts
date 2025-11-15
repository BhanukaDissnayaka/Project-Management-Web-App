import { Router } from "express";
import {
  createBoardController,
  getBoardByIdAndWorkspaceController,
  getBoardsInWorkspaceController,
} from "../controllers/board.controller";

const boardRoutes = Router({ mergeParams: true });

boardRoutes.post("/create", createBoardController);
boardRoutes.get("/all", getBoardsInWorkspaceController);
boardRoutes.get("/:boardId", getBoardByIdAndWorkspaceController);

export default boardRoutes;
