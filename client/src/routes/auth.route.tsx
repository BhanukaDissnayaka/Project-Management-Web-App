import { Navigate, Outlet } from "react-router-dom";
import { useGetCurrentUserQuery } from "@/features/authentication/api/auth.api";

const AuthRoute = () => {
  const { data: authData, isLoading } = useGetCurrentUserQuery();
  const user = authData?.user;

  if (isLoading) return <h1>Login Page Loading</h1>;

  if (!user) return <Outlet />;

  // ! Todo - Handle the case where currentWorkspace is missing

  return <Navigate to={`workspace/${user.currentWorkspace?._id}`} replace />;
};

export default AuthRoute;
