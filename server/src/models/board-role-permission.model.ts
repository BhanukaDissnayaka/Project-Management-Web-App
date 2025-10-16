import mongoose, { Document, Schema } from "mongoose";
import {
  BoardPermissionType,
  BoardPermissions,
  BoardRoleType,
  BoardRoles,
} from "../enums/board-role.enum";

export interface BoardRoleDocument extends Document {
  name: BoardRoleType;
  permissions: Array<BoardPermissionType>;
}

const BoardRoleSchema = new Schema<BoardRoleDocument>(
  {
    name: {
      type: String,
      enum: Object.values(BoardRoles),
      required: true,
      unique: true,
    },
    permissions: {
      type: [String],
      enum: Object.values(BoardPermissions),
      required: true,
      default: [],
    },
  },
  { timestamps: true }
);

const BoardRoleModel = mongoose.model<BoardRoleDocument>(
  "BoardRole",
  BoardRoleSchema
);
export default BoardRoleModel;
