import { Types } from "mongoose";
import UserModel from "../models/user.model";
import WorkspaceMemberModel from "../models/workspace-member.model";

export const searchUsersService = async (
  query: string,
  workspaceId: string
) => {
  if (!query || typeof query !== "string") return [];

  // 1. Find all users that match to query
  const matchedUsers = await UserModel.find(
    { $text: { $search: query } },
    { score: { $meta: "textScore" } }
  )
    .sort({ score: { $meta: "textScore" } })
    .limit(10)
    .select("_id name email profilePicture");

  const userIds = matchedUsers.map((user) => user._id);

  // 2. Find which of these users are already members of the workspace
  const existingMembers = await WorkspaceMemberModel.find({
    userId: { $in: userIds },
    workspaceId: workspaceId,
  }).select("userId");

  const memberUserIds = new Set(
    existingMembers.map((m) => m.userId.toString())
  );

  // 3. Return result with `isMember` flag
  return matchedUsers.map((user) => ({
    _id: user._id,
    name: user.name,
    email: user.email,
    avatar: user.profilePicture,
    isMember: memberUserIds.has((user._id as Types.ObjectId).toString()),
  }));
};
