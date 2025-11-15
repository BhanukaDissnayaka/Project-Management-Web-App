import { BoardPermissionType } from "../enums/board-role.enum";
import { BoardRoleDocument } from "../models/board-role-permission.model";
import { ForbiddenException } from "./appError";

export const checkBoardPermission = (
  role: BoardRoleDocument,
  requiredPermissions: BoardPermissionType[]
) => {
  const permissions = role.permissions;
  const hasPermission = requiredPermissions.every((permission) =>
    permissions.includes(permission)
  );
  if (!hasPermission) {
    throw new ForbiddenException(
      "You do not have the necessary permissions to perform this action"
    );
  }
};
