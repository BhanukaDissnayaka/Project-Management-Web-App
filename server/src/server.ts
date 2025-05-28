import express from "express";
import authRouter from "./routes/auth.route";
import { connectDB } from "./config/db";
import { config } from "./config/app.config";

const app = express();
const BASE_PATH = config.BASE_PATH;

app.use(`${BASE_PATH}/auth/`, authRouter);

const startServer = async () => {
  await connectDB();
  app.listen(config.PORT, () => {
    console.log(`Server running on http://localhost:${config.PORT}`);
  });
};

startServer();
