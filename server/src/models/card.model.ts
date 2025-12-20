import { Schema, model, Types, Document } from "mongoose";
import {
  CardPriorities,
  CardPriorityType,
  CardStatuses,
  CardStatusType,
} from "../enums/card.enum";

export interface CardDocument extends Document {
  title: string;
  description?: string;
  boardId: Types.ObjectId;
  listId: Types.ObjectId;
  position: number;
  dueDate?: Date;
  priority: CardPriorityType;
  status: CardStatusType;
  assignees?: Types.ObjectId[];
  isArchived: boolean;
  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const cardSchema = new Schema<CardDocument>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
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
    listId: {
      type: Schema.Types.ObjectId,
      ref: "CardList",
      required: true,
      index: true,
    },
    position: {
      type: Number,
      required: true,
      index: true,
    },
    dueDate: {
      type: Date,
    },
    priority: {
      type: String,
      enum: Object.values(CardPriorities),
      required: true,
      default: CardPriorities.MEDIUM,
    },
    status: {
      type: String,
      enum: Object.values(CardStatuses),
      required: true,
      default: CardStatuses.NEW,
    },
    assignees: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    isArchived: {
      type: Boolean,
      default: false,
      index: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

cardSchema.index({ listId: 1, position: 1 }, { unique: true });

export const Card = model<CardDocument>("Card", cardSchema);
