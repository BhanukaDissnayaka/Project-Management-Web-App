import {
  SidebarGroup,
  SidebarMenuItem,
  SidebarMenu,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

import { Link } from "react-router-dom";
import { InitialsAvatar } from "../InitialsAvatar";

export const NavBoard = () => {
  // Todo - Must replace these items with real api data
  const items: { _id: string; title: string; url: string }[] = [
    {
      _id: "1",
      title: "Board 1",
      url: "/workspace/1/boards/1",
    },
    {
      _id: "2",
      title: "Board 2",
      url: "/workspace/1/boards/1",
    },
    {
      _id: "3",
      title: "Board 3",
      url: "/workspace/3/boards/1",
    },
  ];

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Recent Boards</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item._id}>
              <SidebarMenuButton
                asChild
                className="font-semibold text-gray-text"
              >
                <Link to={item.url}>
                  <InitialsAvatar name={item.title} />
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
