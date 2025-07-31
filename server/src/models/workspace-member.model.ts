import mongoose, { Document, Schema } from "mongoose";
import { WorkspaceRoleDocument } from "./workspace-role-permission.model";

export interface WorkspaceMemberDocument extends Document {
  userId: mongoose.Types.ObjectId;
  workspaceId: mongoose.Types.ObjectId;
  role: WorkspaceRoleDocument;
  joinedAt: Date;
}

const workspaceMemberSchema = new Schema<WorkspaceMemberDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    workspaceId: {
      type: Schema.Types.ObjectId,
      ref: "Workspace",
      required: true,
    },
    role: {
      type: Schema.Types.ObjectId,
      ref: "WorkspaceRole",
      required: true,
    },
    joinedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const WorkspaceMemberModel = mongoose.model<WorkspaceMemberDocument>(
  "WorkspaceMember",
  workspaceMemberSchema
);
export default WorkspaceMemberModel;
