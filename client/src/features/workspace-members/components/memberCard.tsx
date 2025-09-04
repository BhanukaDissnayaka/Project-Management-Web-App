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
import type { RoleType } from "../types/workspace-members.type";

type ProfileCardType = {
  memberId: string;
  profilePic?: string | null;
  name: string;
  role: string;
  joinedAt?: string;
  roles: RoleType[];
};

function MemberCard({
  profilePic,
  name,
  role,
  joinedAt,
  roles,
}: ProfileCardType) {
  return (
    <>
      <div className="flex items-center justify-between mt-2 mb-2">
        <div className="flex items-center space-x-3">
          <div>
            {profilePic ? (
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
              <InitialsAvatar name={name} />
            )}
          </div>
          <div>
            <p className="text-gray-text font-semibold text-sm md:text-base">
              {name}
            </p>
            <p className="text-xs md:text-sm text-gray-text">{joinedAt}</p>
          </div>
        </div>

        <div className="flex items-center space-x-2 md:space-x-5">
          <Select>
            <SelectTrigger className="w-[110px]">
              <SelectValue placeholder={role.toLowerCase()} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Role in</SelectLabel>
                {roles.map((role) => (
                  <SelectItem value={role.name} key={role._id}>
                    {role.name?.toLowerCase()}
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
