import { WorkspacePermissionType } from "../enums/workspace-role.enum";
import { WorkspaceRoleDocument } from "../models/workspace-role-permission.model";
import { ForbiddenException, UnauthorizedException } from "./appError";

export const checkWorkspacePermission = (
  role: WorkspaceRoleDocument,
  requiredPermissions: WorkspacePermissionType[]
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
