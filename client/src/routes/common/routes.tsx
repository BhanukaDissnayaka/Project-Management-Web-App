import { SignUp } from "@/pages/auth/sign-up";
import { AUTH_ROUTES } from "./routePaths";

export const authenticationRoutePaths = [
  { path: AUTH_ROUTES.SIGN_UP, element: <SignUp /> },
];
