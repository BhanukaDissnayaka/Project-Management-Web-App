import type { searchedUserType } from "../types/workspace-members.type";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { InitialsAvatar } from "@/components/shared/InitialsAvatar";
import { Button } from "@/components/ui/button";
import { UserCheck, UserRoundPlus } from "lucide-react";
import { useAddUserToWorkspaceMutation } from "../api/workspace-members.api";
import useWorkspaceId from "@/hooks/useWorkspaceId";
import { isFetchBaseQueryError } from "@/utils/errorGuards";
import { showErrorToast, showSuccessToast } from "@/lib/toastHandler";

function SearchedUserCard({ user }: { user: searchedUserType }) {
  console.log(user);
  const [addUserToWorkspace, { isLoading }] = useAddUserToWorkspaceMutation();
  const workspaceId = useWorkspaceId();

  const addUserToWorkspaceHandler = async (userId: string) => {
    try {
      await addUserToWorkspace({ workspaceId, userId }).unwrap();
      showSuccessToast("User successfully added to workspace");
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
      key={user._id}
      className="flex items-center justify-between gap-x-2 p-3"
    >
      <div className="flex items-center gap-x-2">
        {user.avatar ? (
          <Avatar className="w-10 h-10">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>
        ) : (
          <InitialsAvatar name={user.name} />
        )}
        <p className="font-medium text-gray-text">{user.name}</p>
      </div>

      <Button
        variant="default"
        size="sm"
        className="cursor-pointer"
        disabled={user.isMember || isLoading}
        onClick={() => addUserToWorkspaceHandler(user._id)}
      >
        {user.isMember ? (
          <UserCheck strokeWidth={2.5} />
        ) : (
          <UserRoundPlus strokeWidth={2.5} />
        )}
      </Button>
    </div>
  );
}

export default SearchedUserCard;
