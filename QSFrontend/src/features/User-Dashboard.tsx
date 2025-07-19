import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/User - Sidebar";

export function UserDashboard() {
  return (
    <div>
      <SidebarProvider>
        <div className="fixed top-0">
          <AppSidebar />
          <SidebarTrigger className="size-10" />
        </div>
      </SidebarProvider>
    </div>
  );
}
