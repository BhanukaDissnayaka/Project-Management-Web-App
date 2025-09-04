import dotenv from "dotenv";
import mongoose from "mongoose";
import WorkspaceRoleModel from "../models/workspace-role-permission.model";
import { WorkspaceRolePermissions } from "../utils/workspace-role-permission";
import { connectDB } from "../config/db";

dotenv.config();

const seedWorkspaceRoles = async () => {
  console.log("Seeding Workspace Roles Started");
  try {
    await connectDB();
    const session = await mongoose.startSession();
    session.startTransaction();

    for (const workspaceRoleName in WorkspaceRolePermissions) {
      const workspaceRole =
        workspaceRoleName as keyof typeof WorkspaceRolePermissions;
      const workspacePermissions = WorkspaceRolePermissions[workspaceRole];

      // Update if exists, insert if not
      const result = await WorkspaceRoleModel.updateOne(
        { name: workspaceRole },
        {
          $set: { permissions: workspacePermissions },
        },
        { upsert: true, session }
      );

      if (result.upsertedCount > 0) {
        console.log(`Role ${workspaceRole} created with permissions.`);
      } else if (result.modifiedCount > 0) {
        console.log(`Role ${workspaceRole} updated with new permissions.`);
      } else {
        console.log(`Role ${workspaceRole} already up-to-date.`);
      }
    }

    await session.commitTransaction();
    console.log("Transaction committed.");

    session.endSession();
    console.log("Session ended.");

    console.log("Seeding completed successfully.");
  } catch (error) {
    console.error("Error during seeding:", error);
  }
};

seedWorkspaceRoles().catch((error) =>
  console.error("Error running seed script:", error)
);
