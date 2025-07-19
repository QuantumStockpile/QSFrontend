import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/User - Sidebar";
import {
  Card,
  CardAction,
  //CardContent,
  CardDescription,
  //CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const items = [
  {
    title: "Desk",
    quantity: 112,
    url: "https://www.office-furniture-direct.co.uk/Cache/Images/MI003193-1-2048-2048.jpg",
  },
  {
    title: "Chair",
    quantity: 111,
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnlMh-VQdsdzvvOJQPDHiQEsFGI7_pM_doLg&s",
  },
  {
    title: "Pen",
    quantity: 5,
    url: "https://www.duktigbrand.com/cdn/shop/products/PhotoRoom_20220221_233059.jpg?v=1653569973",
  },
  {
    title: "Shelf",
    quantity: 14,
    url: "https://totmate.com/cdn/shop/products/TM2306A.S2222_1A_02ffbc9a-d767-4603-9542-b58aa811261d.jpg?v=1743443308",
  },
  {
    title: "Multimedia set",
    quantity: 2,
    url: "https://soundprofessionals.com/wp-content/uploads/2021/12/SP-SPEAKERS-2-1-1.jpg",
  },
];

export function UserEquipment() {
  return (
    <div>
      <SidebarProvider>
        <div className="fixed top-0">
          <AppSidebar />
          <SidebarTrigger className="size-10" />
        </div>
        <div className="flex flex-col mt-12">
          {items.map((item) => (
            <Card className="w-96 h-32 ml-0.5 mb-1.5" key={item.title}>
              <CardHeader>
                <CardAction>
                  <img
                    className="inset-y-0 left-0 object-left size-24"
                    src={item.url}
                  />
                </CardAction>
                <CardTitle className="">{item.title}</CardTitle>
                <CardDescription className="-mt-8">
                  Quantity: {item.quantity}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </SidebarProvider>
    </div>
  );
}
