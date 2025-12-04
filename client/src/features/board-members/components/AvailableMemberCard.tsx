import MainLoader from "@/components/shared/MainLoader";
import type { AvailableWorkspaceMemberType } from "../types/board-members.type";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { InitialsAvatar } from "@/components/shared/InitialsAvatar";
import PermissionWrapper from "@/components/shared/BoardPermissionWrapper";
import { Button } from "@/components/ui/button";
import { BoardPermissions } from "@/constant/permissions";
import { UserCheck, UserRoundPlus } from "lucide-react";
import { useAddMemberToBoardMutation } from "../api/board-members.api";
import useWorkspaceId from "@/hooks/useWorkspaceId";
import useBoardId from "@/hooks/useBoardId";
import { showErrorToast, showSuccessToast } from "@/lib/toastHandler";
import { isFetchBaseQueryError } from "@/utils/errorGuards";

function AvailableMemberCard({
  member,
}: {
  member: AvailableWorkspaceMemberType;
}) {
  const workspaceId = useWorkspaceId();
  const boardId = useBoardId();
  const [addMemberToBoard, { isLoading }] = useAddMemberToBoardMutation();

  const addUserToBoardHandler = async (userId: string) => {
    try {
      await addMemberToBoard({
        workspaceId,
        boardId,
        targetUserId: userId,
      }).unwrap();
      showSuccessToast("User successfully added to Board");
    } catch (err) {
      if (isFetchBaseQueryError(err)) {
        if (
          typeof err.data === "object" &&
          err.data !== null &&
          "message" in err.data
        ) {
          const message = (err.data as { message: string }).message;
          showErrorToast(message);
        }
      }
    }
  };
  return (
    <div
      key={member._id}
      className="flex items-center justify-between gap-x-2 py-3 px-2"
    >
      {isLoading && (
        <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-10 flex items-center justify-center">
          <MainLoader></MainLoader>
        </div>
      )}

      <div className="flex items-center gap-x-2">
        {member.avatar ? (
          <Avatar className="w-10 h-10">
            <AvatarImage src={member.avatar} alt={member.name} />
            <AvatarFallback>{member.name[0]}</AvatarFallback>
          </Avatar>
        ) : (
          <InitialsAvatar name={member.name} />
        )}
        <p className="font-medium text-gray-text">{member.name}</p>
      </div>

      <PermissionWrapper requiredPermission={BoardPermissions.ADD_BOARD_MEMBER}>
        <Button
          variant="default"
          size="sm"
          className="cursor-pointer"
          disabled={member.isAlreadyMember || isLoading}
          onClick={() => addUserToBoardHandler(member.userId)}
        >
          {member.isAlreadyMember ? (
            <UserCheck strokeWidth={2.5} />
          ) : (
            <UserRoundPlus strokeWidth={2.5} />
          )}
        </Button>
      </PermissionWrapper>
    </div>
  );
}

export default AvailableMemberCard;
