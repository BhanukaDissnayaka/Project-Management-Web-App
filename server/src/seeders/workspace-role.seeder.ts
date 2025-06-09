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

    // clearing existing Workspace Roles
    await WorkspaceRoleModel.deleteMany({}, { session });

    for (const workspaceRoleName in WorkspaceRolePermissions) {
      const workspaceRole =
        workspaceRoleName as keyof typeof WorkspaceRolePermissions;
      const workspacePermissions = WorkspaceRolePermissions[workspaceRole];

      //check if the role is already exists
      const existingRole = await WorkspaceRoleModel.findOne({
        name: workspaceRole,
      }).session(session);
      if (!existingRole) {
        const newWorkspaceRole = new WorkspaceRoleModel({
          name: workspaceRole,
          permissions: workspacePermissions,
        });
        await newWorkspaceRole.save({ session });
        console.log(`Role ${workspaceRole} added with permissions.`);
      } else {
        console.log(`Role ${workspaceRole} already exists.`);
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
