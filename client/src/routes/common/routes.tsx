import { SignUp } from "@/pages/auth/sign-up";
import { AUTH_ROUTES, PROTECTED_ROUTES } from "./routePaths";
import { SignIn } from "@/pages/auth/sign-in";
import WorkspaceDashboard from "@/pages/workspace/WorkspaceDashboard";
import WorkspaceMembersPage from "@/pages/WorkspaceMembersPage";
import WorkspaceSettings from "@/pages/workspace/WorkspaceSettings";
import PermissionRoute from "../permission.route";
import { WorkspacePermissions } from "@/constant/permissions";
import Forbidden from "@/pages/forbidden";

export const authenticationRoutePaths = [
  { path: AUTH_ROUTES.SIGN_UP, element: <SignUp /> },
  { path: AUTH_ROUTES.SIGN_IN, element: <SignIn /> },
];
export const protectedRoutePaths = [
  { path: PROTECTED_ROUTES.WORKSPACE, element: <WorkspaceDashboard /> },
  {
    path: PROTECTED_ROUTES.MEMBERS,
    element: <WorkspaceMembersPage></WorkspaceMembersPage>,
  },
  {
    path: PROTECTED_ROUTES.WORKSPACE_SETTINGS,
    element: (
      <PermissionRoute
        message="only workspace owners and admins can view settings"
        requiredPermissions={WorkspacePermissions.EDIT_WORKSPACE}
      >
        <WorkspaceSettings></WorkspaceSettings>
      </PermissionRoute>
    ),
  },
  { path: PROTECTED_ROUTES.FORBIDDEN, element: <Forbidden></Forbidden> },
];
