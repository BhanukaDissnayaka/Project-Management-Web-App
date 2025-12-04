import useBoardId from "@/hooks/useBoardId";
import { useGetBoardMembersQuery } from "../api/board-members.api";
import useWorkspaceId from "@/hooks/useWorkspaceId";
import BoardMemberCard from "./BoardMemberCard";
import MainLoader from "@/components/shared/MainLoader";
import { showErrorToast } from "@/lib/toastHandler";
import { useEffect } from "react";
import { isFetchBaseQueryError } from "@/utils/errorGuards";

function BoardMembersList() {
  const workspaceId = useWorkspaceId();
  const boardId = useBoardId();
  const { data, isFetching, error, isError } = useGetBoardMembersQuery({
    workspaceId,
    boardId,
  });
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
  const boardMembers = data?.boardMembers || [];
  const boardRoles = data?.boardRoles || [];

  return (
    <div>
      {isFetching && <MainLoader className="mt-5"></MainLoader>}
      {boardMembers.map((boardMember) => (
        <BoardMemberCard
          boardMember={boardMember}
          boardRoles={boardRoles}
          key={boardMember._id}
        ></BoardMemberCard>
      ))}
    </div>
  );
}

export default BoardMembersList;
