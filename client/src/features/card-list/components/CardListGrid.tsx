import useBoardId from "@/hooks/useBoardId";
import { useGetListsInBoardQuery } from "../api/list.api";
import useWorkspaceId from "@/hooks/useWorkspaceId";
import CardList from "./CardList";
import { useEffect } from "react";
import { isFetchBaseQueryError } from "@/utils/errorGuards";
import { showErrorToast } from "@/lib/toastHandler";
import MainLoader from "@/components/shared/MainLoader";
import { BoardPermissions } from "@/constant/permissions";
import PermissionWrapper from "@/components/shared/BoardPermissionWrapper";
import CreateListCard from "./CreateCardList";

function CardListGrid() {
  const workspaceId = useWorkspaceId();
  const boardId = useBoardId();

  const { data, isError, error, isLoading } = useGetListsInBoardQuery({
    workspaceId,
    boardId,
  });
  const lists = data?.cardLists || [];

  useEffect(() => {
    if (isError && error && isFetchBaseQueryError(error)) {
      if (
        typeof error.data === "object" &&
        error.data !== null &&
        "message" in error.data
      ) {
        const message = (error.data as { message: string }).message;
        showErrorToast(message);
      }
    }
  }, [isError, error]);
  if (isLoading) return <MainLoader className="mt-10"></MainLoader>;

  return (
    <div>
      <div className="grid gap-4 p-6 items-start [grid-template-columns:repeat(auto-fill,minmax(250px,1fr))]">
        {lists.map((list) => (
          <CardList key={list._id} cardList={list} />
        ))}
        <PermissionWrapper requiredPermission={BoardPermissions.CREATE_LIST}>
          <CreateListCard />
        </PermissionWrapper>
      </div>
    </div>
  );
}
export default CardListGrid;
