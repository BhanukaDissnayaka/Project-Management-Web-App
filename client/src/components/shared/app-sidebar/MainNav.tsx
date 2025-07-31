import {
  SidebarGroup,
  SidebarMenuItem,
  SidebarMenu,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import useWorkspaceId from "@/hooks/useWorkspaceId";
import {
  LayoutDashboard,
  Settings,
  SquareKanban,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Link } from "react-router-dom";

type ItemType = {
  title: string;
  url: string;
  icon: LucideIcon;
};

export const MainNav = () => {
  const workspaceId = useWorkspaceId();
  const items: ItemType[] = [
    {
      title: "Dashboard",
      url: `/workspace/${workspaceId}`,
      icon: LayoutDashboard,
    },
    {
      title: "Boards",
      url: `/workspace/${workspaceId}/boards`,
      icon: SquareKanban,
    },
    {
      title: "Settings",
      url: `/workspace/${workspaceId}/settings`,
      icon: Settings,
    },
    //! Must check user has permission to settings
    {
      title: "Members",
      url: `/workspace/${workspaceId}/members`,
      icon: Users,
    },
  ];
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Application</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                className="font-semibold text-gray-text"
              >
                <Link to={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
