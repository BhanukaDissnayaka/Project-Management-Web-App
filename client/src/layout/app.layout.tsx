import { Outlet } from "react-router-dom";
import useWorkspaceId from "@/hooks/useWorkspaceId";
import { useGetWorkspaceByIdQuery } from "@/features/workspace/api/workspace.api";
import { showErrorToast } from "@/lib/toastHandler";
import { isFetchBaseQueryError } from "@/utils/errorGuards";
import { useEffect } from "react";
import NotFound from "@/components/shared/NotFound";
import MainLoader from "@/components/shared/MainLoader";
import Forbidden from "@/components/shared/Forbidden";

const AppLayout = () => {
  const workspaceId = useWorkspaceId();

  const { error, isError, isLoading } = useGetWorkspaceByIdQuery(workspaceId);

  // Show toast for non-404 errors
  useEffect(() => {
    if (
      isError &&
      isFetchBaseQueryError(error) &&
      error.status !== 404 &&
      error.status !== 400
    ) {
      showErrorToast(error.message || "Something went wrong");
      console.log(error);
    }
  }, [error, isError]);

  // Show loader
  if (isLoading) return <MainLoader />;

  // Render Forbidden Component if user is not a member of workspace
  if (isError && isFetchBaseQueryError(error) && error.status === 403) {
    return (
      <Forbidden message="You do not have permission to access this workspace." />
    );
  }

  //  Render 404 component if workspace is not found or workspace id mallformed
  if (
    isError &&
    isFetchBaseQueryError(error) &&
    (error.status === 404 || error?.status === 400)
  ) {
    return <NotFound message="This workspace does not exist" />;
  }

  return (
    <div className="w-full">
      <div className="px-3 lg:px-20 py-3">
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
