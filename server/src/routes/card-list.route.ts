import { Router } from "express";
import {
  createCardListController,
  getCardListsInBoardController,
} from "../controllers/card-list.controller";

const cardRoutes = Router({ mergeParams: true });

cardRoutes.post("/create", createCardListController);
cardRoutes.get("/", getCardListsInBoardController);

export default cardRoutes;
