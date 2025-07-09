import { SignUp } from "@/pages/auth/sign-up";
import { AUTH_ROUTES } from "./routePaths";
import { SignIn } from "@/pages/auth/sign-in";

export const authenticationRoutePaths = [
  { path: AUTH_ROUTES.SIGN_UP, element: <SignUp /> },
  { path: AUTH_ROUTES.SIGN_IN, element: <SignIn /> },
];
