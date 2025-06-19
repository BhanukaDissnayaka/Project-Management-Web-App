import jwt from "jsonwebtoken";
import { config } from "../config/app.config";

export const generateToken = (payload: object) => {
  const token = jwt.sign(payload, config.JWT_SECRET, { expiresIn: "70y" });
  return token;
};
