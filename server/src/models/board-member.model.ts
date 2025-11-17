import mongoose, { Document, Mongoose, Schema } from "mongoose";
import { BoardDocument } from "./board.model";
import { BoardRoleDocument } from "./board-role-permission.model";

export interface BoardMemberDocument extends Document {
  userId: mongoose.Types.ObjectId;
  boardId: mongoose.Types.ObjectId;
  role: BoardRoleDocument;
  joinedAt: Date;
}

const BoardMemberSchema = new Schema<BoardMemberDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    boardId: {
      type: Schema.Types.ObjectId,
      ref: "Board",
      required: true,
    },
    role: {
      type: Schema.Types.ObjectId,
      ref: "BoardRole",
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

const BoardMemberModel = mongoose.model<BoardMemberDocument>(
  "BoardMember",
  BoardMemberSchema
);
export default BoardMemberModel;
