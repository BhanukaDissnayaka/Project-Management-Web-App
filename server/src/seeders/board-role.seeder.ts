import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDB } from "../config/db";
import { BoardRolePermissions } from "../utils/board-role-permission";
import BoardRoleModel from "../models/board-role-permission.model";

dotenv.config();

const seedBoardRoles = async () => {
  console.log("Seeding Board Roles Started");
  try {
    await connectDB();
    const session = await mongoose.startSession();
    session.startTransaction();

    for (const boardRoleName in BoardRolePermissions) {
      const boardRole = boardRoleName as keyof typeof BoardRolePermissions;
      const boardPermissions = BoardRolePermissions[boardRole];

      // Update if exists, insert if not
      const result = await BoardRoleModel.updateOne(
        { name: boardRole },
        {
          $set: { permissions: boardPermissions },
        },
        { upsert: true, session }
      );

      if (result.upsertedCount > 0) {
        console.log(`Role ${boardRole} created with permissions.`);
      } else if (result.modifiedCount > 0) {
        console.log(`Role ${boardRole} updated with new permissions.`);
      } else {
        console.log(`Role ${boardRole} already up-to-date.`);
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

seedBoardRoles().catch((error) =>
  console.error("Error running seed script:", error)
);
