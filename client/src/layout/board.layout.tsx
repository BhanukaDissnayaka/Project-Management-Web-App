import Forbidden from "@/components/shared/Forbidden";
import MainLoader from "@/components/shared/MainLoader";
import NotFound from "@/components/shared/NotFound";
import { useGetBoardByIdAndWorkspaceQuery } from "@/features/board/api/board.api";
import BoardNav from "@/features/board/components/BoardNav";
import useBoardId from "@/hooks/useBoardId";
import useWorkspaceId from "@/hooks/useWorkspaceId";
import { showErrorToast } from "@/lib/toastHandler";
import { isFetchBaseQueryError } from "@/utils/errorGuards";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

function BoardLayout() {
  const workspaceId = useWorkspaceId();
  const boardId = useBoardId();

  const { error, isError, isLoading, isFetching } =
    useGetBoardByIdAndWorkspaceQuery({ workspaceId, boardId });
  // Show toast for non-404 errors
  useEffect(() => {
    if (
      isError &&
      isFetchBaseQueryError(error) &&
      error.status !== 404 &&
      error.status !== 400
    ) {
      showErrorToast(error.message || "Something went wrong");
    }
  }, [error, isError]);

  // Show loader
  if (isLoading || isFetching) return <MainLoader />;

  // Render Forbidden Component if user is not a member of workspace
  if (isError && isFetchBaseQueryError(error) && error.status === 403) {
    return (
      <Forbidden message="You do not have permission to access this Board." />
    );
  }

  //  Render 404 component if workspace is not found or workspace id mallformed
  if (
    isError &&
    isFetchBaseQueryError(error) &&
    (error.status === 404 || error?.status === 400)
  ) {
    return <NotFound message="This Board does not exist" />;
  }
  return (
    <div>
      <BoardNav />
      <div className="pt-[var(--board-nav-height)] p-5  lg:px-15">
        <Outlet />
      </div>
    </div>
  );
}

export default BoardLayout;
