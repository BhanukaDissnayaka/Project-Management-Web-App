import { Router } from "express";
import {
  getCurrentUser,
  searchUsersController,
} from "../controllers/user.controller";

const userRoutes = Router();

userRoutes.get("/current", getCurrentUser);
userRoutes.get("/workspaces/:workspaceId/search-users", searchUsersController);
export default userRoutes;
