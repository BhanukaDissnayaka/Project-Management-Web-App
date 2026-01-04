import { Request, Response } from "express";
import { workspaceIdSchema } from "../validation/workspace.validation";
import {
  cardListIdSchema,
  createCardListSchema,
  updateCardListSchema,
} from "../validation/card-list.validation";
import { getMemberInBoardService } from "../services/board-member.service";
import { boardIdSchema } from "../validation/board.validation";
import { checkBoardPermission } from "../utils/check-board-permission";
import { BoardPermissions } from "../enums/board-role.enum";
import {
  createCardListService,
  getCardListsInBoardService,
  updateCardListService,
} from "../services/card-list.service";
import { HTTPSTATUS } from "../config/http.config";
import { asyncHandler } from "../middlewares/asyncHandler";

export const createCardListController = asyncHandler(
  async (req: Request, res: Response) => {
    const workspaceId = workspaceIdSchema.parse(req.params.workspaceId);
    const boardId = boardIdSchema.parse(req.params.boardId);
    const userId = req.user?._id;
    const body = createCardListSchema.parse(req.body);
    const { boardMember } = await getMemberInBoardService(
      userId,
      boardId,
      workspaceId
    );
    checkBoardPermission(boardMember.role, [BoardPermissions.CREATE_LIST]);
    const { cardList } = await createCardListService(
      userId,
      workspaceId,
      boardId,
      body
    );
    return res.status(HTTPSTATUS.OK).json({
      message: "Card list created successfully",
      cardList,
    });
  }
);

export const getCardListsInBoardController = asyncHandler(
  async (req: Request, res: Response) => {
    const workspaceId = workspaceIdSchema.parse(req.params.workspaceId);
    const boardId = boardIdSchema.parse(req.params.boardId);
    const userId = req.user?._id;
    const { boardMember } = await getMemberInBoardService(
      userId,
      boardId,
      workspaceId
    );
    checkBoardPermission(boardMember.role, [BoardPermissions.ADD_CARD_MEMBER]);
    const { cardLists } = await getCardListsInBoardService(
      workspaceId,
      boardId
    );
    return res.status(HTTPSTATUS.OK).json({
      message: "Card lists retrieved successfully",
      cardLists,
    });
  }
);

export const updateCardListController = asyncHandler(
  async (req: Request, res: Response) => {
    const workspaceId = workspaceIdSchema.parse(req.params.workspaceId);
    const boardId = boardIdSchema.parse(req.params.boardId);
    const listId = cardListIdSchema.parse(req.params.listId);
    const userId = req.user?._id;
    const body = updateCardListSchema.parse(req.body);
    const { boardMember } = await getMemberInBoardService(
      userId,
      boardId,
      workspaceId
    );
    checkBoardPermission(boardMember.role, [BoardPermissions.EDIT_LIST]);
    const { cardList } = await updateCardListService(
      workspaceId,
      boardId,
      listId,
      body
    );
    return res.status(HTTPSTATUS.OK).json({
      message: "Card list updated successfully",
      cardList,
    });
  }
);
