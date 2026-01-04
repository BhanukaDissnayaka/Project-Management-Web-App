import { Router } from "express";
import {
  createCardListController,
  getCardListsInBoardController,
  updateCardListController,
} from "../controllers/card-list.controller";

const cardRoutes = Router({ mergeParams: true });

cardRoutes.post("/create", createCardListController);
cardRoutes.get("/", getCardListsInBoardController);
cardRoutes.put("/:listId/update/", updateCardListController);

export default cardRoutes;
