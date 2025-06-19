import mongoose from "mongoose";
import UserModel, { UserDocument } from "../models/user.model";
import AccountModel from "../models/account.model";
import WorkspaceModel from "../models/workspace.model";
import WorkspaceRoleModel from "../models/workspace-role-permission.model";
import { WorkspaceRoles } from "../enums/workspace-role.enum";
import WorkspaceMemberModel from "../models/workspace-member.model";
import { NotFoundException } from "../utils/appError";

export const loginOrCreateAccountService = async (data: {
  provider: string;
  displayName: string;
  providerId: string;
  picture?: string;
  email?: string;
}): Promise<UserDocument> => {
  const { providerId, provider, displayName, email, picture } = data;
  if (!email) {
    throw new NotFoundException("Email is required");
  }
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    let user = await UserModel.findOne({ email }).session(session);
    // 1. create a new user if it doesn't exist
    if (!user) {
      user = new UserModel({
        email,
        name: displayName,
        profilePicture: picture || null,
      });
      await user.save({ session });

      // 2. create a account for the new user
      const account = new AccountModel({
        userId: user._id,
        provider: provider,
        providerId: providerId,
      });
      await account.save({ session });

      // 3. Create a new workspace for the new user
      const workspace = new WorkspaceModel({
        name: `My Workspace`,
        description: `Workspace created for ${user.name}`,
        owner: user._id,
      });
      await workspace.save({ session });

      // 4. create a new workspace owner role for new user
      const workspaceOwnerRole = await WorkspaceRoleModel.findOne({
        name: WorkspaceRoles.OWNER,
      }).session(session);

      if (!workspaceOwnerRole) {
        throw new NotFoundException("Owner role not found");
      }
      const member = new WorkspaceMemberModel({
        userId: user._id,
        workspaceId: workspace._id,
        role: workspaceOwnerRole._id,
        joinedAt: new Date(),
      });
      await member.save({ session });

      // update the new user's current workspace
      user.currentWorkspace = workspace._id as mongoose.Types.ObjectId;
      await user.save({ session });
    }
    await session.commitTransaction();
    return user;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  } finally {
    session.endSession();
  }
};
