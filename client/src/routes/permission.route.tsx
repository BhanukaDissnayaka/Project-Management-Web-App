import MainLoader from "@/components/shared/MainLoader";
import type { WorkspacePermissionsType } from "@/constant/permissions";
import { useGetCurrentUserQuery } from "@/features/authentication/api/auth.api";
import { usePermissions } from "@/hooks/usePermissions";
import { Navigate } from "react-router-dom";

type PermissionRouteProps = {
  requiredPermissions: WorkspacePermissionsType | WorkspacePermissionsType[];
  children: React.ReactNode;
};

const PermissionRoute = ({
  requiredPermissions,
  children,
}: PermissionRouteProps) => {
  const { data: authData, isLoading } = useGetCurrentUserQuery();
  const user = authData?.user;
  const hasPermissions = usePermissions(requiredPermissions);

  if (isLoading || hasPermissions === undefined) {
    return <MainLoader></MainLoader>;
  }

  if (!user) {
    return <Navigate to="/sign-in" replace />;
  }

  if (!hasPermissions) {
    // Redirect to current workspace if no permission
    return <Navigate to={`/workspace/${user.currentWorkspace}`} replace />;
  }

  // User has permission, render children
  return <>{children}</>;
};

export default PermissionRoute;
