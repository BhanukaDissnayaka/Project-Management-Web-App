import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroupLabel,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../../ui/sidebar";
import { Check, ChevronsUpDown, Loader, Plus } from "lucide-react";
import { InitialsAvatar } from "../InitialsAvatar";
import { useEffect, useState } from "react";
import { TextWrapper } from "../TextWrapper";
import useWorkspaceId from "@/hooks/useWorkspaceId";
import { useNavigate } from "react-router-dom";
import { useGetAllWorkspacesUserIsMemberQuery } from "@/features/workspace/api/workspace.api";
type WorkspaceType = {
  _id: string;
  name: string;
};

export const WorkspaceSwicher = () => {
  const navigate = useNavigate();
  const workspaceId = useWorkspaceId();
  const { isMobile } = useSidebar();

  const { data, isLoading } = useGetAllWorkspacesUserIsMemberQuery();
  const workspaces = data?.workspaces;
  const [activeWorkspace, setActiveWorkspace] = useState<WorkspaceType>();

  useEffect(() => {
    if (workspaces?.length) {
      const workspace = workspaceId
        ? workspaces.find((ws) => ws._id === workspaceId)
        : workspaces[0];

      if (workspace) {
        setActiveWorkspace(workspace);
        if (!workspaceId) navigate(`/workspace/${workspace._id}`);
      }
    }
  }, [workspaceId, workspaces, navigate]);

  const onSelect = (workspace: WorkspaceType) => {
    setActiveWorkspace(workspace);
    navigate(`/workspace/${workspace._id}`);
  };
  return (
    <>
      <SidebarGroupLabel className="w-full justify-between pr-0">
        <span>Workspaces</span>
        <button className="flex size-5 items-center justify-center rounded-full border">
          <Plus className="size-3.5" />
        </button>
      </SidebarGroupLabel>
      <SidebarMenuItem>
        {isLoading ? (
          <Loader></Loader>
        ) : (
          <SidebarMenuButton
            size="lg"
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground bg-gray-10"
          >
            {activeWorkspace ? (
              <>
                <div className="flex justify-center ">
                  <InitialsAvatar name={activeWorkspace.name} size={35} />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {activeWorkspace.name}
                  </span>
                  <span className="truncate text-xs">Free</span>
                </div>
              </>
            ) : (
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  No Workspace selected
                </span>
              </div>
            )}
          </SidebarMenuButton>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuAction>
              <ChevronsUpDown cursor={"pointer"} />
            </SidebarMenuAction>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side={isMobile ? "bottom" : "right"}
            align="start"
            className="min-w-56 bg-popover"
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Workspaces
            </DropdownMenuLabel>
            {isLoading ? <Loader className="w-5 h-5 animate-spin" /> : null}
            {workspaces?.map((workspace) => (
              <DropdownMenuItem
                key={workspace._id}
                className="gap-2"
                onClick={() => onSelect(workspace)}
              >
                {" "}
                <div className="flex items-center justify-left gap-2  cursor-pointer">
                  <InitialsAvatar name={workspace.name} />
                  {workspace.name}
                </div>
                {workspace._id === workspaceId && (
                  <DropdownMenuShortcut className="tracking-normal !opacity-100">
                    <Check className="w-4 h-4" />
                  </DropdownMenuShortcut>
                )}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2 !cursor-pointer justify-left">
              <div className="flex items-center  gap-2 text-gray-text">
                <Plus />
                <TextWrapper fontWeight="semibold" className="leading-tight">
                  Add workspace
                </TextWrapper>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </>
  );
};
