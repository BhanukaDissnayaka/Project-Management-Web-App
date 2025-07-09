import mongoose from "mongoose";
import UserModel, { UserDocument } from "../models/user.model";
import AccountModel from "../models/account.model";
import WorkspaceModel from "../models/workspace.model";
import WorkspaceRoleModel from "../models/workspace-role-permission.model";
import { WorkspaceRoles } from "../enums/workspace-role.enum";
import WorkspaceMemberModel from "../models/workspace-member.model";
import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from "../utils/appError";
import { ProviderEnum, ProviderEnumType } from "../enums/account-provider.enum";

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

export const registerUserService = async (body: {
  email: string;
  name: string;
  password: string;
}): Promise<UserDocument> => {
  const { email, name, password } = body;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const existingUser = await UserModel.findOne({ email }).session(session);
    if (existingUser) {
      throw new BadRequestException("Email already exists");
    }
    // 1. create a new user if it doesn't exist
    const user = new UserModel({
      email,
      name,
      password,
    });
    await user.save({ session });

    // 2. create a account for the new user
    const account = new AccountModel({
      userId: user._id,
      provider: ProviderEnum.EMAIL,
      providerId: email,
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

export const loginUserService = async ({
  email,
  password,
  provider = ProviderEnum.EMAIL,
}: {
  email: string;
  password: string;
  provider?: ProviderEnumType;
}): Promise<Omit<UserDocument, "password">> => {
  try {
    console.log(email, password);
    const account = await AccountModel.findOne({ provider, providerId: email });
    if (!account) {
      throw new NotFoundException("Invalid email or password");
    }
    const user = await UserModel.findById(account.userId);
    if (!user) {
      throw new NotFoundException("User not found for the given account");
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new UnauthorizedException("Invalid email olr password");
    }
    return user.omitPassword();
  } catch (err) {
    console.log(err);
    throw err;
  }
};
