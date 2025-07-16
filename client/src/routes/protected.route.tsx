import { useGetCurrentUserQuery } from "@/features/authentication/api/auth.api";
import { Navigate, Outlet } from "react-router-dom";

const ProtecedRoute = () => {
  const { data: authData, isLoading } = useGetCurrentUserQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const user = authData?.user;

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return user ? <Outlet /> : <Navigate to="/sign-in" replace />;
};

export default ProtecedRoute;
