import { Router } from "express";
import {
  createBoardController,
  getBoardsInWorkspaceController,
} from "../controllers/board.controller";

const boardRoutes = Router({ mergeParams: true });

boardRoutes.post("/create", createBoardController);
boardRoutes.get("/all", getBoardsInWorkspaceController);
export default boardRoutes;
