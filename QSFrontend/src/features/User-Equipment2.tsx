import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { UsAppSidebar } from "@/components/User - Sidebar";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardAction,
  //CardContent,
  CardDescription,
  //CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  //DrawerClose,
  DrawerContent,
  DrawerDescription,
  //DrawerFooter,
  //DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

const items = [
  {
    id: 202453,
    loc: "Host",
    cond: "new",
    stat: "available",
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnlMh-VQdsdzvvOJQPDHiQEsFGI7_pM_doLg&s",
  },
  {
    id: 234567,
    loc: "Host",
    cond: "new",
    stat: "available",
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnlMh-VQdsdzvvOJQPDHiQEsFGI7_pM_doLg&s",
  },
  {
    id: 456543,
    loc: "205 room",
    cond: "used",
    stat: "taken",
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnlMh-VQdsdzvvOJQPDHiQEsFGI7_pM_doLg&s",
  },
  {
    id: 890877,
    loc: "Host",
    cond: "used",
    stat: "available",
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnlMh-VQdsdzvvOJQPDHiQEsFGI7_pM_doLg&s",
  },
  {
    id: 878787,
    loc: "204 room",
    cond: "broken",
    stat: "available",
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnlMh-VQdsdzvvOJQPDHiQEsFGI7_pM_doLg&s",
  },
  {
    id: 923456,
    loc: "Host",
    cond: "used",
    stat: "available",
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnlMh-VQdsdzvvOJQPDHiQEsFGI7_pM_doLg&s",
  },
  {
    id: 231234,
    loc: "210 room",
    cond: "new",
    stat: "taken",
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnlMh-VQdsdzvvOJQPDHiQEsFGI7_pM_doLg&s",
  },
];

export function UserEquipment2() {
  return (
    <div>
      <SidebarProvider>
        <div className="fixed top-0">
          <UsAppSidebar />
          <SidebarTrigger className="size-10" />
        </div>
        <div className="flex flex-col mt-12 z-0">
          <div className="text-center place-content-center justify-items-center">
            <Label className="font-medium text-lg">Chair</Label>
            <Label className="font-normal text-lg">Quantity: 300</Label>
          </div>
          <div className="flex flex-col mt-8">
            {items.map((item) => (
              <Drawer>
                <DrawerTrigger asChild>
                  <Card className="w-96 ml-0.5 h-28 mb-1.5">
                    <CardHeader>
                      <CardTitle>{item.id}</CardTitle>
                      <CardDescription>{item.loc}</CardDescription>
                      <CardAction>
                        <Checkbox className="w-5 h-5 mt-4 border-slate-300" />
                      </CardAction>
                    </CardHeader>
                  </Card>
                </DrawerTrigger>
                <DrawerContent className="justify-items-center pb-6 pt-4">
                  <DrawerTitle className="place-self-center mb-4">
                    {item.id}
                  </DrawerTitle>
                  <DrawerDescription className="flex flex-row mb-6 mt-3">
                    <img className="w-48" src={item.url} />
                    <div className="">
                      <Label className="mb-1">Condition: {item.cond}</Label>
                      <Label className="mb-1">Status: {item.stat}</Label>
                      <Label>Location: {item.loc}</Label>
                    </div>
                  </DrawerDescription>
                  <Button variant="default" className="w-28 place-self-center">
                    Request
                  </Button>
                </DrawerContent>
              </Drawer>
            ))}
          </div>
          <Button variant="default" className="z-10 fixed right-6 bottom-8">
            Request
          </Button>
        </div>
      </SidebarProvider>
    </div>
  );
}
