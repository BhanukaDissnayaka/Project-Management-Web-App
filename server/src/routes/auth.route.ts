import express from "express";
import {
  handleGoogleCallback,
  loginUserController,
  registerUserController,
} from "../controllers/auth.controller";
import passport from "passport";

const authRoutes = express.Router();

authRoutes.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

authRoutes.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/" }),
  handleGoogleCallback
);

authRoutes.post("/register", registerUserController);
authRoutes.post("/login", loginUserController);

export default authRoutes;
