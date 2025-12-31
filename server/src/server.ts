import express from "express";
import { connectDB } from "./config/db";
import { config } from "./config/app.config";
import authRoutes from "./routes/auth.route";
import "./config/passport.config";
import passport from "passport";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import cookieParser from "cookie-parser";
import isAuthenticated from "./middlewares/isAuthenticated.middleware";
import userRoutes from "./routes/user.route";
import workspaceRoutes from "./routes/workspace.route";
import boardRoutes from "./routes/board.route";
import cardRoutes from "./routes/card-list.route";

const app = express();
const BASE_PATH = config.BASE_PATH;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(passport.initialize());

app.use(
  cors({
    origin: config.FRONTEND_ORIGIN,
    credentials: true,
  })
);

app.use(`${BASE_PATH}/auth/`, authRoutes);
app.use(`${BASE_PATH}/user/`, isAuthenticated, userRoutes);
app.use(`${BASE_PATH}/workspace`, isAuthenticated, workspaceRoutes);
app.use(
  `${BASE_PATH}/workspace/:workspaceId/boards`,
  isAuthenticated,
  boardRoutes
);
app.use(
  `${BASE_PATH}/workspace/:workspaceId/boards/:boardId/lists`,
  isAuthenticated,
  cardRoutes
);
// global error handler - must be last
app.use(errorHandler);

const startServer = async () => {
  await connectDB();
  app.listen(config.PORT, () => {
    console.log(`Server running on http://localhost:${config.PORT}`);
  });
};

startServer();
