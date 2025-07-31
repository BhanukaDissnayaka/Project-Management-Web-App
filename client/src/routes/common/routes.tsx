import { SignUp } from "@/pages/auth/sign-up";
import { AUTH_ROUTES, PROTECTED_ROUTES } from "./routePaths";
import { SignIn } from "@/pages/auth/sign-in";
import WorkspaceDashboard from "@/pages/workspace/WorkspaceDashboard";

export const authenticationRoutePaths = [
  { path: AUTH_ROUTES.SIGN_UP, element: <SignUp /> },
  { path: AUTH_ROUTES.SIGN_IN, element: <SignIn /> },
];
export const protectedRoutePaths = [
  { path: PROTECTED_ROUTES.WORKSPACE, element: <WorkspaceDashboard /> },
  ,
];
