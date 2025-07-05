import express from "express";
import {
  handleGoogleCallback,
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
export default authRoutes;
