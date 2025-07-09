import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler";
import { config } from "../config/app.config";
import { generateToken } from "../utils/jwt";
import { loginSchema, registerSchema } from "../validation/auth.validation";
import {
  loginUserService,
  registerUserService,
} from "../services/auth.service";
import { HTTPSTATUS } from "../config/http.config";

export const handleGoogleCallback = asyncHandler(
  async (req: Request, res: Response) => {
    const user = req.user;
    if (!user || !user._id || !user.email || !user.currentWorkspace) {
      return res.redirect(
        `${config.FRONTEND_GOOGLE_CALLBACK_URL}?status=failure`
      );
    }
    const token = generateToken({ userId: user._id, email: user.email });
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    return res.redirect(
      `${config.FRONTEND_ORIGIN}/workspace/${user.currentWorkspace}`
    );
  }
);

export const registerUserController = asyncHandler(
  async (req: Request, res: Response) => {
    const body = registerSchema.parse({
      ...req.body,
    });
    const user = await registerUserService(body);
    const token = generateToken({ userId: user._id, email: user.email });
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    return res.status(HTTPSTATUS.CREATED).json({
      message: "User created successfully",
      user,
    });
  }
);

export const loginUserController = asyncHandler(
  async (req: Request, res: Response) => {
    const body = loginSchema.parse({
      ...req.body,
    });
    const user = await loginUserService(body);
    const token = generateToken({ userId: user._id, email: user.email });
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    return res.status(HTTPSTATUS.OK).json({
      message: "Logged in successfully",
      user,
    });
  }
);
