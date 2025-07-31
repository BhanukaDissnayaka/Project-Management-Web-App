import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { WorkspaceSwicher } from "./WorkspaceSwicher";
import { Separator } from "../../ui/separator";
import { MainNav } from "./MainNav";
import { NavBoard } from "./NavBoard";

export function AppSidebar() {
  return (
    <Sidebar className="border-none">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <WorkspaceSwicher />
              <Separator />
              <MainNav />
              <Separator />
              <NavBoard />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
