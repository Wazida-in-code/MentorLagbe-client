import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useSession } from "@/lib/auth-client";

const menuItemsByRole = {
  student: [],

  tutor: [],
  admin: [],
};

export function DashboardSidebar() {
  const { data: session, isPending } = useSession();
  const role = session?.user?.role || "student";
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
        <SidebarGroup>
          <SidebarMenu>
            {
              // menuItemsByRole[role].map((item) => (
              //   <SidebarMenuItem key={item.id}>
              //     <SidebarMenuButton render={<a href={item.} />}>
              //       <item.icon />
              //       <span>{item.name}</span>
              //     </SidebarMenuButton>
              //   </SidebarMenuItem>
              // ))
            }
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
