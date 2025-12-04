import { z } from "zod";
import { BoardColor } from "../enums/board.enum";
import { isValidObjectId } from "mongoose";
export const boardNameSchema = z
  .string()
  .trim()
  .min(1, { message: "Name is required" })
  .max(255, { message: "Board name should be less than 255 characters" });

export const boardDescriptionSchema = z.string().trim().optional();
export const bgColorSchema = z
  .nativeEnum(BoardColor, { message: "Invalid background color" })
  .optional();

export const createBoardSchema = z.object({
  name: boardNameSchema,
  description: boardDescriptionSchema,
  bgColor: bgColorSchema,
});
export const updateBoardSchema = z.object({
  name: boardNameSchema,
  description: boardDescriptionSchema,
  bgColor: bgColorSchema,
});

export const addMemberToBoardSchema = z.object({
  userId: z
    .string()
    .trim()
    .min(1, { message: "User ID is required" })
    .refine((val) => isValidObjectId(val), {
      message: "Invalid user ID",
    }),
});
