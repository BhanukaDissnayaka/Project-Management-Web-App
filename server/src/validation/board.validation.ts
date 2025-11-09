import { z } from "zod";
import { BoardColor } from "../enums/board.enum";
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
