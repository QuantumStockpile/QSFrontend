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

export function AdminEquipment() {
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingItem, setEditingItem] = useState<Equipment | null>(null);
  const [editedName, setEditedName] = useState("");
  const [newItemName, setNewItemName] = useState("");

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

  const handleEditItem = (item: Equipment) => {
    setEditingItem(item);
    setEditedName(item.field);
  };

  const handleUpdateItem = async () => {
    if (!editingItem) return;

    try {
      await equipmentService.updateEquipment(editingItem.id, {
        field: editedName,
      });
      await loadEquipment();
      setEditingItem(null);
      setEditedName("");
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleAddItem = async () => {
    if (!newItemName.trim()) return;

    try {
      await equipmentService.createEquipment({ field: newItemName });
      await loadEquipment();
      setNewItemName("");
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDeleteItem = async (id: number) => {
    try {
      await equipmentService.deleteEquipment(id);
      await loadEquipment();
    } catch (err: any) {
      setError(err.message);
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
            <AdAppSidebar />
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
          <AdAppSidebar />
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
              <Drawer key={item.id}>
                <Card className="w-96 h-32 ml-0.5 mb-1.5">
                  <DrawerTrigger
                    className="fixed right-4 -mt-4"
                    onClick={() => handleEditItem(item)}
                  >
                    <div>
                      <PencilSVG />
                    </div>
                  </DrawerTrigger>
                  <CardHeader className="mr-8">
                    <CardAction className="flex flex-row gap-4">
                      <img
                        className="size-24"
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
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>Edit item</DrawerTitle>
                  </DrawerHeader>
                  <DrawerHeader>
                    <Input
                      placeholder="Item name"
                      className="mt-4"
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                    />
                  </DrawerHeader>
                  <div className="flex gap-4 justify-center mb-8 mt-4">
                    <Button className="w-24" onClick={handleUpdateItem}>
                      Update
                    </Button>
                    <Button
                      className="w-24"
                      variant="destructive"
                      onClick={() => handleDeleteItem(item.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </DrawerContent>
              </Drawer>
            ))
          )}
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
                <Input
                  placeholder="Item name"
                  className="mt-4"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                />
              </DrawerHeader>
              <Button
                className="w-24 mt-4 mb-8 place-self-center"
                onClick={handleAddItem}
              >
                Add
              </Button>
            </DrawerContent>
          </Drawer>
        </div>
      </SidebarProvider>
    </div>
  );
}
