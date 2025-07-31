import MainLoader from "@/components/shared/MainLoader";
import { useGetCurrentUserQuery } from "@/features/authentication/api/auth.api";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { data: authData, isLoading } = useGetCurrentUserQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const user = authData?.user;

  if (isLoading) {
    return <MainLoader />;
  }
  return user ? <Outlet /> : <Navigate to="/sign-in" replace />;
};

export default ProtectedRoute;
