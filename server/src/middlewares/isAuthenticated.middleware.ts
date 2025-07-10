import { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "../utils/appError";
import jwt from "jsonwebtoken";
import { config } from "../config/app.config";
import UserModel from "../models/user.model";

const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token: string = req.cookies.jwt;
    if (!token) {
      throw new UnauthorizedException("Unauthorized - No Token Provided");
    }
    const decoded = jwt.verify(token, config.JWT_SECRET) as jwt.JwtPayload & {
      userId: string;
      email: string;
    };
    const user = await UserModel.findById(decoded.userId).select("-password");
    if (!user) {
      throw new UnauthorizedException(
        "Unauthorized.Unauthorized - User not found"
      );
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export default isAuthenticated;
