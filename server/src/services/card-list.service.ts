import mongoose from "mongoose";
import { NotFoundException } from "../utils/appError";
import BoardModel from "../models/board.model";
import CardListModel from "../models/card-list.model";

export const createCardListService = async (
  userId: string,
  workspaceId: string,
  boardId: string,
  body: { title: string; description?: string }
) => {
  // Implementation for creating a card list
  const { title, description } = body;
  const board = await BoardModel.findOne({
    _id: boardId,
    workspace: workspaceId,
  });
  if (!board) {
    throw new NotFoundException(
      "Board not found or does not belong to the specified workspace"
    );
  }
  const lastList = await CardListModel.findOne({ boardId }).sort({
    position: -1,
  });
  const newPosition = lastList ? lastList.position + 1000 : 1000;

  const cardList = new CardListModel({
    title,
    description,
    boardId: board._id,
    workspaceId,
    position: newPosition,
    createdBy: userId,
  });
  await cardList.save();
  return { cardList };
};
export const getCardListsInBoardService = async (
  workspaceId: string,
  boardId: string
) => {
  const board = await BoardModel.findOne({
    _id: boardId,
    workspace: workspaceId,
  });

  if (!board) {
    throw new NotFoundException(
      "Board not found or does not belong to the specified workspace"
    );
  }
  const cardLists = await CardListModel.find({ boardId }).sort({ position: 1 });
  return { cardLists };
};

export const updateCardListService = async (
  workspaceId: string,
  boardId: string,
  listId: string,
  body: { title?: string; description?: string }
) => {
  // Implementation for updating a card list
  const { title, description } = body;
  const board = await BoardModel.findOne({
    _id: boardId,
    workspace: workspaceId,
  });
  if (!board) {
    throw new NotFoundException(
      "Board not found or does not belong to the specified workspace"
    );
  }
  const cardList = await CardListModel.findOne({ _id: listId, boardId });
  if (!cardList) {
    throw new NotFoundException(
      "List not found or does not belong to the specified board"
    );
  }
  if (title !== undefined) cardList.title = title;
  if (description !== undefined) cardList.description = description;
  await cardList.save();
  console.log("Updated Card List:", cardList);

  return { cardList };
};
