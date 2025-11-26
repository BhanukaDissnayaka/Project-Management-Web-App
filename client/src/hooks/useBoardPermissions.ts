import type { BoardPermissionsType } from "@/constant/permissions";
import useWorkspaceId from "./useWorkspaceId";
import useBoardId from "./useBoardId";
import { useGetBoardByIdAndWorkspaceQuery } from "@/features/board/api/board.api";

export const useBoardPermissions = (
  permissions: BoardPermissionsType | BoardPermissionsType[]
): boolean => {
  const workspaceId = useWorkspaceId();
  const boardId = useBoardId();
  const { data, isLoading } = useGetBoardByIdAndWorkspaceQuery({
    workspaceId,
    boardId,
  });

  // Return false during loading or if no permissions found
  if (isLoading || !data?.currentBoardMember?.role?.permissions) {
    return false;
  }

  const boardMemberPermissions = data.currentBoardMember.role.permissions ?? [];
  if (Array.isArray(permissions)) {
    return permissions.every((perm) => boardMemberPermissions.includes(perm));
  }
  return boardMemberPermissions.includes(permissions);
};
