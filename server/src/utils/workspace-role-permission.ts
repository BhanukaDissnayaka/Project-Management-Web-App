import {
  WorkspacePermissionType,
  WorkspacePermissions,
  WorkspaceRoleType,
} from "../enums/workspace-role.enum";

export const WorkspaceRolePermissions: Record<
  WorkspaceRoleType,
  Array<WorkspacePermissionType>
> = {
  OWNER: [
    WorkspacePermissions.CREATE_WORKSPACE,
    WorkspacePermissions.EDIT_WORKSPACE,
    WorkspacePermissions.DELETE_WORKSPACE,
    WorkspacePermissions.MANAGE_WORKSPACE_SETTINGS,
    WorkspacePermissions.ADD_WORKSPACE_MEMBER,
    WorkspacePermissions.CHANGE_WORKSPACE_MEMBER_ROLE,
    WorkspacePermissions.REMOVE_WORKSPACE_MEMBER,
    WorkspacePermissions.CREATE_BOARD,
    WorkspacePermissions.VIEW_ALL_BOARDS,
    WorkspacePermissions.VIEW_ONLY,
  ],
  ADMIN: [
    WorkspacePermissions.MANAGE_WORKSPACE_SETTINGS,
    WorkspacePermissions.ADD_WORKSPACE_MEMBER,
    WorkspacePermissions.CHANGE_WORKSPACE_MEMBER_ROLE,
    WorkspacePermissions.REMOVE_WORKSPACE_MEMBER,
    WorkspacePermissions.CREATE_BOARD,
    WorkspacePermissions.VIEW_ALL_BOARDS,
    WorkspacePermissions.VIEW_ONLY,
  ],
  MEMBER: [
    WorkspacePermissions.VIEW_ALL_BOARDS,
    WorkspacePermissions.VIEW_ONLY,
  ],
};
