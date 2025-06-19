import express from "express";
import { connectDB } from "./config/db";
import { config } from "./config/app.config";
import authRoutes from "./routes/auth.route";
import "./config/passport.config";
import passport from "passport";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler.middleware";

const app = express();
const BASE_PATH = config.BASE_PATH;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());

app.use(
  cors({
    origin: config.FRONTEND_ORIGIN,
    credentials: true,
  })
);

app.use(`${BASE_PATH}/auth/`, authRoutes);

// global error handler - must be last
app.use(errorHandler);

const startServer = async () => {
  await connectDB();
  app.listen(config.PORT, () => {
    console.log(`Server running on http://localhost:${config.PORT}`);
  });
};

startServer();
