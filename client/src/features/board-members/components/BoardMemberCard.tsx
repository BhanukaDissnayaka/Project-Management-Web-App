import { useState } from "react";
import type {
  BoardMemberType,
  BoardRoleType,
} from "../types/board-members.type";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { InitialsAvatar } from "@/components/shared/InitialsAvatar";
import { timeAgo } from "@/utils/timeAgo";
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
import PermissionWrapper from "@/components/shared/BoardPermissionWrapper";
import { BoardPermissions } from "@/constant/permissions";

function BoardMemberCard({
  boardMember,
  boardRoles,
}: {
  boardMember: BoardMemberType;
  boardRoles: BoardRoleType[];
}) {
  const { userId: user, role } = boardMember;
  const [currentRole] = useState(role);

  return (
    <>
      <div className="flex items-center justify-between mt-4 mb-2">
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
              {timeAgo(boardMember.joinedAt)}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 md:space-x-5">
          <PermissionWrapper
            requiredPermission={BoardPermissions.CHANGE_BOARD_MEMBER_ROLE}
          >
            <Select value={currentRole._id}>
              <SelectTrigger className="w-[100px] lg:w-[150px]">
                <SelectValue placeholder={currentRole.name.toLowerCase()} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Role in</SelectLabel>

                  {boardRoles.map((boardRole) => (
                    <SelectItem value={boardRole._id} key={boardRole._id}>
                      {boardRole.name.replace("_", " ").toLowerCase()}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </PermissionWrapper>

          <PermissionWrapper
            requiredPermission={BoardPermissions.CHANGE_BOARD_MEMBER_ROLE}
          >
            <Button className="cursor-pointer" variant="destructive" size="sm">
              <UserRoundX /> Remove
            </Button>
          </PermissionWrapper>
        </div>
      </div>
      <hr />
    </>
  );
}

export default BoardMemberCard;
