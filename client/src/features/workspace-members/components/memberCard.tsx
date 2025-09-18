import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";
import { InitialsAvatar } from "../../../components/shared/InitialsAvatar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { UserRoundX } from "lucide-react";
import type {
  RoleType,
  SearchedMemberType,
} from "../types/workspace-members.type";
import { useChangeMemberRoleMutation } from "../api/workspace-members.api";
import { isFetchBaseQueryError } from "@/utils/errorGuards";
import { showErrorToast, showSuccessToast } from "@/lib/toastHandler";
import MainLoader from "@/components/shared/MainLoader";
import { useState } from "react";
import { timeAgo } from "@/utils/timeAgo";

function MemberCard({
  member,
  roles,
  workspaceId,
}: {
  member: SearchedMemberType;
  roles: RoleType[];
  workspaceId: string;
}) {
  const { user, role } = member;
  const [currentRole, setCurrentRole] = useState(role);
  const [changeMemberRole, { isLoading }] = useChangeMemberRoleMutation();

  const handleSelect = async (roleId: string) => {
    try {
      const res = await changeMemberRole({
        workspaceId,
        roleId,
        memberId: user._id,
      }).unwrap();
      setCurrentRole(res.member.role);
      showSuccessToast("Member's role changed successfully");
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
    <>
      {isLoading && (
        <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-10 flex items-center justify-center">
          <MainLoader></MainLoader>
        </div>
      )}
      <div className="flex items-center justify-between mt-2 mb-2">
        <div className="flex items-center space-x-3">
          <div>
            {user.profilePicture ? (
              <>
                <Avatar className="size-8 md:size-10">
                  <AvatarImage
                    className=""
                    src="https://github.com/shadcn.png"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </>
            ) : (
              <InitialsAvatar name={user.name} />
            )}
          </div>
          <div>
            <p className="text-gray-text font-semibold text-sm md:text-base">
              {user.name}
            </p>
            <p className="text-xs md:text-sm text-gray-text">
              {timeAgo(member.joinedAt)}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 md:space-x-5">
          <Select
            disabled={isLoading || role.name === "OWNER"}
            value={currentRole.name === "OWNER" ? undefined : currentRole._id}
            onValueChange={(roleId) => handleSelect(roleId)}
          >
            <SelectTrigger className="w-[110px]">
              <SelectValue placeholder={currentRole.name.toLowerCase()} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Role in</SelectLabel>

                {roles
                  .filter((r) => r.name !== "OWNER")
                  .map((role) => (
                    <SelectItem value={role._id} key={role._id}>
                      {role.name.toLowerCase()}
                    </SelectItem>
                  ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button variant="destructive" size="sm">
            <UserRoundX /> Remove
          </Button>
        </div>
      </div>
      <hr />
    </>
  );
}

export default MemberCard;
