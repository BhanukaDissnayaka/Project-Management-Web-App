import {
  LogOut,
  MoreHorizontalIcon,
  Settings,
  Users,
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
import useBoardSettings from "../hooks/useBoardSettings";
import { useMemo } from "react";
import { useBoardPermissions } from "@/hooks/useBoardPermissions";
import { BoardPermissions } from "@/constant/permissions";
type BoardMenuType =
  | {
      title: string;
      icon: LucideIcon;
      url: string;
      action?: never;
    }
  | {
      title: string;
      icon: LucideIcon;
      action: () => void;
      url?: never;
    };

function BoardNav() {
  const workspaceId = useWorkspaceId();
  const boardId = useBoardId();
  const { onOpen } = useBoardSettings();
  const canEditBoard = useBoardPermissions(BoardPermissions.EDIT_BOARD);

  const boardMenu = useMemo(
    () =>
      [
        ...(canEditBoard
          ? [
              {
                title: "Settings",
                action: onOpen,
                icon: Settings,
              },
            ]
          : []),

        {
          title: "Members",
          url: `/workspace/${workspaceId}/boards/${boardId}/members`,
          icon: Users,
        },
      ] as BoardMenuType[],
    [onOpen, workspaceId, boardId]
  );

  function closeRadixMenus() {
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
  }

  const { data } = useGetBoardByIdAndWorkspaceQuery({ workspaceId, boardId });

  return (
    <header className="fixed top-0 left-0 h-[var(--board-nav-height)]  md:left-[var(--sidebar-width)] right-0   border-b shadow-b-sm flex items-center z-50 bg-sidebar">
      <div className="flex items-center justify-between w-full px-4">
        <div className="font-semibold text-xl pl-5">{data?.board.name}</div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreHorizontalIcon className="text-gray-text" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-70">
            {boardMenu.map((item) => (
              <div key={item.title}>
                {item.url ? (
                  <DropdownMenuItem>
                    <Link to={item.url} className="w-full">
                      <div className="flex gap-x-2">
                        <span>
                          <item.icon />
                        </span>
                        {item.title}
                      </div>
                    </Link>
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem
                    onSelect={(e) => {
                      e.preventDefault();
                      closeRadixMenus();
                      item.action?.();
                    }}
                  >
                    <button className="w-full flex gap-x-2 text-left">
                      <span>
                        <item.icon />
                      </span>
                      {item.title}
                    </button>
                  </DropdownMenuItem>
                )}
              </div>
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
