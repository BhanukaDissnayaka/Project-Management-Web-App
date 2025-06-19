import dotenv from "dotenv";

dotenv.config();

type AppConfig = {
  NODE_ENV: "development" | "production" | "test";
  PORT: number;
  BASE_PATH: string;
  MONGO_URI: string;
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  GOOGLE_CALLBACK_URL: string;
  FRONTEND_ORIGIN: string;
  FRONTEND_GOOGLE_CALLBACK_URL: string;
};

const appConfig = (): AppConfig => ({
  NODE_ENV: (process.env.NODE_ENV as AppConfig["NODE_ENV"]) || "development",
  PORT: parseInt(process.env.PORT || "5000", 10),
  BASE_PATH: "/api",
  MONGO_URI: process.env.MONGO_URI || "",
  JWT_SECRET: process.env.JWT_SECRET || "supersecret",
  JWT_EXPIRES_IN: "7d",
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || "",
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || "",
  GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL || "",
  FRONTEND_ORIGIN: process.env.FRONTEND_ORIGIN || "",
  FRONTEND_GOOGLE_CALLBACK_URL: process.env.FRONTEND_GOOGLE_CALLBACK_URL || "",
});

export const config = appConfig();
