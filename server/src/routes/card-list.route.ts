import { Router } from "express";
import { createCardListController } from "../controllers/card-list.controller";

const cardRoutes = Router({ mergeParams: true });

cardRoutes.post("/create", createCardListController);

export default cardRoutes;
