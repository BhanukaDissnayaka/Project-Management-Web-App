import { isValidObjectId } from "mongoose";
import { z } from "zod";

export const workspaceIdSchema = z
  .string()
  .trim()
  .min(1, { message: "Workspace ID is required" })
  .refine((val) => isValidObjectId(val), {
    message: "Invalid workspace ID",
  });
