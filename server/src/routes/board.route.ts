import { Router } from "express";
import { createBoardController } from "../controllers/board.controller";

const boardRoutes = Router({ mergeParams: true });

boardRoutes.post("/create", createBoardController);

export default boardRoutes;
