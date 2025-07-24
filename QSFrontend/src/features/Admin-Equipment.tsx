import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdAppSidebar } from "@/components/Admin-Sidebar";
import {
  Card,
  CardAction,
  //CardContent,
  CardDescription,
  //CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AddSVG } from "@/svg/AddSVG";
import { PencilSVG } from "@/svg/PencilSVG";
import {
  Drawer,
  //DrawerClose,
  DrawerContent,
  DrawerHeader,
  //DrawerDescription,
  //DrawerFooter,
  //DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
//import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const items = [
  {
    title: "Desk",
    quantity: "112",
    url: "https://www.office-furniture-direct.co.uk/Cache/Images/MI003193-1-2048-2048.jpg",
  },
  {
    title: "Chair",
    quantity: "111",
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnlMh-VQdsdzvvOJQPDHiQEsFGI7_pM_doLg&s",
  },
  {
    title: "Pen",
    quantity: "5",
    url: "https://www.duktigbrand.com/cdn/shop/products/PhotoRoom_20220221_233059.jpg?v=1653569973",
  },
  {
    title: "Shelf",
    quantity: "14",
    url: "https://totmate.com/cdn/shop/products/TM2306A.S2222_1A_02ffbc9a-d767-4603-9542-b58aa811261d.jpg?v=1743443308",
  },
  {
    title: "Multimedia set",
    quantity: "2",
    url: "https://soundprofessionals.com/wp-content/uploads/2021/12/SP-SPEAKERS-2-1-1.jpg",
  },
];

export function AdminEquipment() {
  return (
    <div>
      <SidebarProvider>
        <div className="fixed top-0">
          <AdAppSidebar />
          <SidebarTrigger className="size-10" />
        </div>
        <div className="flex flex-col mt-12">
          {items.map((item) => (
            <Drawer>
              <Card className="w-96 h-32 ml-0.5 mb-1.5" key={item.title}>
                <DrawerTrigger className="fixed right-4 -mt-4">
                  <div>
                    <PencilSVG />
                  </div>
                </DrawerTrigger>
                <CardHeader className="mr-8">
                  <CardAction className="flex flex-row gap-4">
                    <img className=" size-24" src={item.url} />
                  </CardAction>
                  <CardTitle className="">{item.title}</CardTitle>
                  <CardDescription className="-mt-8">
                    Quantity: {item.quantity}
                  </CardDescription>
                </CardHeader>
              </Card>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerHeader>
                    <DrawerTitle>Edit item</DrawerTitle>
                  </DrawerHeader>
                  <Input placeholder={item.title} className="mt-4" />
                  <Input className="mt-4" placeholder={item.quantity} />
                </DrawerHeader>
                <Button className="w-24 place-self-center mb-8 mt-4">
                  Confirm
                </Button>
              </DrawerContent>
            </Drawer>
          ))}
        </div>
        <div className="fixed bottom-6 right-4">
          <Drawer>
            <DrawerTrigger asChild>
              <Button className="w-20">
                <AddSVG />
                Add
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Add new item</DrawerTitle>
              </DrawerHeader>
              <DrawerHeader>
                <Input placeholder="Item name" className="mt-4" />
                <Input placeholder="Item quantity" className="mt-4" />
                <Input placeholder="Photo url" className="mt-4" />
              </DrawerHeader>
              <Button className="w-24 mt-4 mb-8 place-self-center">Add</Button>
            </DrawerContent>
          </Drawer>
        </div>
      </SidebarProvider>
    </div>
  );
}
