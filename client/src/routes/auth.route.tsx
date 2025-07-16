import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isAuthRoute } from "./common/routePaths";
import { useGetCurrentUserQuery } from "@/features/authentication/api/auth.api";

const AuthRoute = () => {
  const location = useLocation();
  const _isAuthRoute = isAuthRoute(location.pathname);

  const { data: authData, isLoading } = useGetCurrentUserQuery();
  const user = authData?.user;

  if (!_isAuthRoute && isLoading) return <h1>Loading</h1>;

  if (!user) return <Outlet />;

  // ! Todo - Handle the case where currentWorkspace is missing

  return <Navigate to={`workspace/${user.currentWorkspace?._id}`} replace />;
};

export default AuthRoute;
