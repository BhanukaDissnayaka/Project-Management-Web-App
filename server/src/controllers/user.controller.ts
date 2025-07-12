import { HTTPSTATUS } from "../config/http.config";
import { asyncHandler } from "../middlewares/asyncHandler";
import { Request, Response } from "express";

export const getCurrentUser = asyncHandler(
  async (req: Request, res: Response) => {
    res
      .status(HTTPSTATUS.OK)
      .json({ message: "User fetch successfully", user: req.user });
  }
);
