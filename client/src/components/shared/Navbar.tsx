import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell } from "lucide-react";
import { TextWrapper } from "./TextWrapper";
import { useAppSelector } from "@/hooks/useAppSelector";
import { Link } from "react-router-dom";
import { InitialsAvatar } from "./InitialsAvatar";

const Navbar = () => {
  const user = useAppSelector((state) => state.auth.user);
  return (
    <div>
      <div className="w-full flex justify-between items-center py-2 px-5 border-b border-gray-boarder">
        <div>
          <p className="cursor-pointer text-xl font-bold text-blue-primary">
            ProjectPilot
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div>
            <span className="text-gray-text cursor-pointer">
              <Bell size={20} strokeWidth={1.3} />
            </span>
          </div>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger className="cursor-pointer">
                <InitialsAvatar name={user?.name || "User"} />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mr-1 min-w-[230px]">
                <DropdownMenuItem>
                  <div className="flex items-center gap-2">
                    <div>
                      <InitialsAvatar name={user?.name || "User"} />
                    </div>
                    <div>
                      <TextWrapper
                        fontWeight="semibold"
                        className="text-gray-text"
                      >
                        {user?.name}
                      </TextWrapper>
                      <TextWrapper fontSize="xs" className="text-gray-muted">
                        {user?.email}
                      </TextWrapper>
                    </div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <TextWrapper className="text-gray-text">
                    Manage profile
                  </TextWrapper>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <TextWrapper className="text-gray-text">
                    <Link to="/logout">Log out</Link>
                  </TextWrapper>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
