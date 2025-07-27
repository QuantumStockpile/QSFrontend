import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdAppSidebar } from "@/components/Admin-Sidebar";
import { ChartPieLabel } from "@/components/ui/chart-pie-label";
import { Label } from "@/components/ui/label";

export function AdminDashboard() {
  return (
    <div>
      <SidebarProvider>
        <div className="fixed top-0">
          <AdAppSidebar />
          <SidebarTrigger className="size-10" />
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col w-80 ml-10 mt-12 ">
            <Label className="text-black font-medium mb-2 text-base">
              Usage Analythics
            </Label>
            <div className="bg-card text-card-foreground flex flex-col rounded-xl border pl-4 pr-2 pb-3 pt-3 shadow-sm">
              <Label className="font-normal text-base">texrt</Label>
            </div>
          </div>
          <ChartPieLabel />
        </div>
      </SidebarProvider>
    </div>
  );
}
