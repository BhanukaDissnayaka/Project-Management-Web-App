import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";
import { InitialsAvatar } from "../../../components/shared/InitialsAvatar";

type ProfileCardType = {
  profilePic?: string;
  name: string;
  lastActive?: string;
};

function ProfileCard({ profilePic, name, lastActive }: ProfileCardType) {
  return (
    <div className="flex items-center space-x-3">
      <div>
        {profilePic ? (
          <>
            <Avatar className="size-8 md:size-10">
              <AvatarImage className="" src="https://github.com/shadcn.png" />
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
        <p className="text-xs md:text-sm text-gray-text">{lastActive}</p>
      </div>
    </div>
  );
}

export default ProfileCard;
