import { isValidObjectId } from "mongoose";
import { z } from "zod";

export const cardListTitleSchema = z
  .string()
  .trim()
  .min(1, { message: "Name is required" })
  .max(255, { message: "Board name should be less than 255 characters" });

export const cardListDescriptionSchema = z.string().trim().optional();
export const createCardListSchema = z.object({
  title: cardListTitleSchema,
  description: cardListDescriptionSchema,
});
