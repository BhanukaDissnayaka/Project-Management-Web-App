import { SignUp } from "@/components/pages/RegisterPage";
import { AUTH_ROUTES } from "./routePaths";

export const authenticationRoutePaths = [
  { path: AUTH_ROUTES.SIGN_UP, element: <SignUp /> },
];
