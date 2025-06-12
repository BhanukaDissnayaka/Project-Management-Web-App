import { Outlet, useLocation } from "react-router-dom";
import { isAuthRoute } from "./common/routePaths";

const AuthRoute = () => {
  const location = useLocation();
  const _isAuthRoute = isAuthRoute(location.pathname);

  // TODO: If this is not an auth route, render fallback UI like a dashboard loader
  if (!_isAuthRoute) return null;

  // TODO: Check if user is logged in
  // If user is not logged in, allow rendering child routes (login/register)
  // If user is logged in, redirect to current workspace

  return <Outlet />;
};

export default AuthRoute;
