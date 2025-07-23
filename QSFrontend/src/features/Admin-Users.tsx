import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdAppSidebar } from "@/components/Admin-Sidebar";
import {
  Card,
  //CardAction,
  //CardContent,
  CardDescription,
  //CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
//import { Button } from "@/components/ui/button";
import {
  Drawer,
  //DrawerClose,
  DrawerContent,
  //DrawerDescription,
  //DrawerFooter,
  //DrawerHeader,
  //DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  //SelectLabel,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";

const requests = [
  {
    title: "Desk",
    date: "02.03.1965",
    condition: "Expecting approving",
    color: "text-slate-500",
  },
  {
    title: "Multimedia set",
    date: "14.05.2025",
    condition: "Request approved",
    color: "text-green-600",
  },
  {
    title: "Pen",
    date: "04.04.2024",
    condition: "Returned",
    color: "text-black-900",
  },
  {
    title: "Desk",
    date: "10.07.2025",
    condition: "Request approved",
    color: "text-green-600",
  },
  {
    title: "Chair",
    date: "15.08.2025",
    condition: "Returned",
    color: "text-black-900",
  },
  {
    title: "Pencil",
    date: "13.10.2024",
    condition: "Expired returning date",
    color: "text-red-600",
  },
  {
    title: "Chair",
    date: "15.08.2025",
    condition: "Returned",
    color: "text-black-900",
  },
];

const items = [
  { name: "Todor P. Ivanov", role: "Teacher", requests: requests },
  { name: "Nikol M. Mirayeva", role: "Teacher", requests: requests },
  { name: "Ivan H. Hristianov", role: "Teacher", requests: requests },
  { name: "Maria L. Ulianova", role: "Student", requests: requests },
  { name: "Petar K. Nikolov", role: "Student", requests: requests },
];

export function AdminUsers() {
  return (
    <div>
      <SidebarProvider>
        <div className="fixed top-0">
          <AdAppSidebar />
          <SidebarTrigger className="size-10" />
        </div>
        <div className="mt-12">
          <div className="fixed flex flex-row ml-3 gap-4">
            <div className=" bg-white">
              <Select>
                <SelectTrigger className="w-34">
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="students">Students</SelectItem>
                    <SelectItem value="teachers">Teachers</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="mt-12">
            {items.map((item) => (
              <Drawer>
                <Card className="w-96 ml-0.5 h-32 mb-1.5" key={item.name}>
                  <CardHeader>
                    <CardTitle className="">{item.name}</CardTitle>
                    <CardDescription className="">
                      <Label>{item.role}</Label>
                      <DrawerTrigger>See requests</DrawerTrigger>
                    </CardDescription>
                  </CardHeader>
                </Card>
                <ScrollArea>
                  <DrawerContent>
                    {requests.map((request) => (
                      <Card
                        className="w-96 ml-0.5 h-32 mb-1.5"
                        key={request.title}
                      >
                        <CardHeader>
                          <CardTitle className="">{request.title}</CardTitle>
                          <CardDescription className="">
                            {request.date}
                          </CardDescription>
                          <Label className={request.color}>
                            {request.condition}
                          </Label>
                        </CardHeader>
                      </Card>
                    ))}
                  </DrawerContent>
                </ScrollArea>
              </Drawer>
            ))}
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
}
