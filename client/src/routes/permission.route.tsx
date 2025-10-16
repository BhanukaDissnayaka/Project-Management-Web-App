import MainLoader from "@/components/shared/MainLoader";
import type { WorkspacePermissionsType } from "@/constant/permissions";
import { usePermissions } from "@/hooks/usePermissions";
import useWorkspaceId from "@/hooks/useWorkspaceId";
import { Navigate } from "react-router-dom";

type PermissionRouteProps = {
  requiredPermissions: WorkspacePermissionsType | WorkspacePermissionsType[];
  children: React.ReactNode;
  message?: string;
};

const PermissionRoute = ({
  requiredPermissions,
  children,
  message = "You don’t have permission to access this page.",
}: PermissionRouteProps) => {
  const hasPermissions = usePermissions(requiredPermissions);
  const workspaceId = useWorkspaceId();
  if (hasPermissions === undefined) {
    return <MainLoader></MainLoader>;
  }

  if (!hasPermissions) {
    // Redirect to current workspace if no permission
    return (
      <Navigate
        to={`/workspace/${workspaceId}/forbidden?message=${message}`}
        replace
      />
    );
  }

  // User has permission, render children
  return <>{children}</>;
};

export default PermissionRoute;
