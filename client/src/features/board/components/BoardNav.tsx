import {
  LogOut,
  MoreHorizontalIcon,
  Settings,
  Tags,
  Users,
  Wallpaper,
  type LucideIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import useWorkspaceId from "@/hooks/useWorkspaceId";
import useBoardId from "@/hooks/useBoardId";
import { useGetBoardByIdAndWorkspaceQuery } from "../api/board.api";
type BoardMenuType = {
  title: string;
  url?: string;
  action?: string;
  icon: LucideIcon;
};

function BoardNav() {
  const workspaceId = useWorkspaceId();
  const boardId = useBoardId();

  const boardMenu: BoardMenuType[] = [
    {
      title: "Settings",
      url: `/workspace/${workspaceId}/boards/${boardId}/settings`,
      icon: Settings,
    },
    {
      title: "Members",
      url: `/workspace/${workspaceId}/boards/${boardId}/members`,
      icon: Users,
    },
    {
      title: " Change Background",
      icon: Wallpaper,
    },
    {
      title: "Labels",
      icon: Tags,
    },
  ];

  const { data } = useGetBoardByIdAndWorkspaceQuery({ workspaceId, boardId });

  return (
    <header className="fixed top-0 left-0 h-[var(--board-nav-height)]  md:left-[var(--sidebar-width)] right-0   border-b shadow-b-sm flex items-center z-50 bg-sidebar-primary-foreground">
      <div className="flex items-center justify-between w-full px-4">
        <div className="font-semibold text-xl pl-5">{data?.board.name}</div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreHorizontalIcon className="text-gray-text" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-70">
            {boardMenu.map((item) => (
              <DropdownMenuItem key={item.title}>
                {item.url ? (
                  <Link to={item.url} className="w-full">
                    <div className="flex gap-x-2">
                      <span>
                        <item.icon />
                      </span>
                      {item.title}
                    </div>
                  </Link>
                ) : (
                  <>
                    <span>
                      <item.icon />
                    </span>
                    {item.title}
                  </>
                )}
              </DropdownMenuItem>
            ))}

            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <span>
                <LogOut className="text-red-500" />
              </span>
              <p className="text-red-500"> Leave Board</p>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="bg-red-500 h-50"></div>
    </header>
  );
}

export default BoardNav;
