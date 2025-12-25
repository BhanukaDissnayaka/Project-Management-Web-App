import { Document, Types, Schema, model } from "mongoose";

export interface CardListDocument extends Document {
  title: string;
  description: string;
  boardId: Types.ObjectId;
  workspaceId: Types.ObjectId;
  position: number;
  createdBy: Types.ObjectId;
  isArchived: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const cardListSchema = new Schema<CardListDocument>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      default: "",
    },
    boardId: {
      type: Schema.Types.ObjectId,
      ref: "Board",
      required: true,
      index: true,
    },
    workspaceId: {
      type: Schema.Types.ObjectId,
      ref: "Workspace",
      required: true,
    },
    position: {
      type: Number,
      required: true,
      index: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    isArchived: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

cardListSchema.index({ boardId: 1, position: 1 }, { unique: true });

const CardListModel = model<CardListDocument>("CardList", cardListSchema);

export default CardListModel;
