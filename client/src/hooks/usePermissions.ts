import { useGetWorkspaceByIdQuery } from "@/features/workspace/api/workspace.api";
import useWorkspaceId from "./useWorkspaceId";
import type { WorkspacePermissionsType } from "@/constant/permissions";

export const usePermissions = (
  permissions: WorkspacePermissionsType | WorkspacePermissionsType[]
) => {
  const workspaceId = useWorkspaceId();
  const { data, isLoading } = useGetWorkspaceByIdQuery(workspaceId);

  if (!data || isLoading) return undefined;

  const MemberPermissions = data?.currentMember.role.permissions ?? [];

  if (Array.isArray(permissions)) {
    return permissions.every((perm) => MemberPermissions.includes(perm));
  }
  return MemberPermissions.includes(permissions);
};
