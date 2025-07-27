import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { UsAppSidebar } from "@/components/User - Sidebar";
import {
  Card,
  CardAction,
  //CardContent,
  CardDescription,
  //CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { equipmentService, type Equipment } from "@/services/equipmentService";

// Default equipment images for fallback
const defaultEquipmentImages = [
  "https://www.office-furniture-direct.co.uk/Cache/Images/MI003193-1-2048-2048.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnlMh-VQdsdzvvOJQPDHiQEsFGI7_pM_doLg&s",
  "https://www.duktigbrand.com/cdn/shop/products/PhotoRoom_20220221_233059.jpg?v=1653569973",
  "https://totmate.com/cdn/shop/products/TM2306A.S2222_1A_02ffbc9a-d767-4603-9542-b58aa811261d.jpg?v=1743443308",
  "https://soundprofessionals.com/wp-content/uploads/2021/12/SP-SPEAKERS-2-1-1.jpg",
];

export function UserEquipment() {
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadEquipment();
  }, []);

  const loadEquipment = async () => {
    try {
      const data = await equipmentService.getAllEquipment();
      setEquipment(data.items);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (index: number) => {
    return defaultEquipmentImages[index % defaultEquipmentImages.length];
  };

  if (loading) {
    return (
      <div>
        <SidebarProvider>
          <div className="fixed top-0">
            <UsAppSidebar />
            <SidebarTrigger className="size-10" />
          </div>
          <div className="flex items-center justify-center h-screen">
            <p>Loading equipment...</p>
          </div>
        </SidebarProvider>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center place-self-center h-full">
      <SidebarProvider>
        <div className="fixed top-0">
          <UsAppSidebar />
          <SidebarTrigger className="size-10" />
        </div>
        <div className="flex flex-col mt-12">
          {error && (
            <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}
          {equipment.length === 0 ? (
            <div className="text-center p-8">
              <p>No equipment available</p>
            </div>
          ) : (
            equipment.map((item, index) => (
              <Link to={"/u-eq2"} key={item.id}>
                <Card className="w-96 h-32 ml-0.5 mb-1.5">
                  <CardHeader>
                    <CardAction>
                      <img
                        className="inset-y-0 left-0 object-left size-24"
                        src={getImageUrl(index)}
                        alt={item.field}
                      />
                    </CardAction>
                    <CardTitle className="">{item.field}</CardTitle>
                    <CardDescription className="-mt-8">
                      Equipment ID: {item.id}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))
          )}
        </div>
      </SidebarProvider>
    </div>
  );
}
