import { isValidObjectId } from "mongoose";
import { string, z } from "zod";

export const workspaceIdSchema = z
  .string()
  .trim()
  .min(1, { message: "Workspace ID is required" })
  .refine((val) => isValidObjectId(val), {
    message: "Invalid workspace ID",
  });

export const nameSchema = z
  .string()
  .trim()
  .min(1, { message: "Name is required" })
  .max(255, { message: "workspace name should be less than 255 characters" });

export const descriptionSchema = z.string().trim().optional();

export const createWorkspaceSchema = z.object({
  name: nameSchema,
  description: descriptionSchema,
});

export const addMemberToWorkspaceSchema = z.object({
  userId: z
    .string()
    .trim()
    .min(1, { message: "User ID is required" })
    .refine((val) => isValidObjectId(val), {
      message: "Invalid user ID",
    }),
});

export const changeMemberRoleSchema = z.object({
  roleId: z.string().trim().min(1),
  memberId: z.string().trim().min(1, { message: "member id is required" }),
});

export const removeWorkspaceMemberSchema = z.object({
  id: workspaceIdSchema,
  userId: z
    .string()
    .trim()
    .min(1, { message: "member id is required" })
    .refine((val) => isValidObjectId(val), {
      message: "Invalid member ID",
    }),
});

export const updateWorkspaceSchema = z.object({
  name: nameSchema,
  description: descriptionSchema,
});
