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

export const cardListIdSchema = z
  .string()
  .trim()
  .min(1, { message: "Card List ID is required" })
  .refine((val) => isValidObjectId(val), {
    message: "Invalid Card List ID",
  });

export const updateCardListSchema = z
  .object({
    title: cardListTitleSchema.optional(),
    description: cardListDescriptionSchema,
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be updated",
  });
