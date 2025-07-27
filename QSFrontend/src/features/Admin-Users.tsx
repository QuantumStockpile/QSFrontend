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
import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";

import { SearchSVG } from "@/svg/SearchSVG";
import { useState, useEffect } from "react";
import { userService, type User } from "@/services/userService";

export function AdminUsers() {
  const [filter, setFilter] = useState("default");
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const userData = await userService.getAllUsers();
      setUsers(userData);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleElevateUser = async (userEmail: string) => {
    try {
      await userService.elevateUser(userEmail);
      // Reload users to reflect changes
      await loadUsers();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const filteredUsers = users.filter((user) => {
    if (searchQuery) {
      return (
        user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.role.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (filter === "admin") return user.role.description === "admin";
    if (filter === "user") return user.role.description === "user";
    return true;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading users...</p>
      </div>
    );
  }
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
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-34">
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="user">Users</SelectItem>
                    <SelectItem value="admin">Admins</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-row ml-2">
              <div className="-mr-2.5 mt-3">
                <SearchSVG />
              </div>
              <Input
                className="h-9.5 -ml-4 pl-8"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          {error && (
            <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}
          <div className="mt-12">
            {filteredUsers.map((user) => (
              <Card className="w-96 ml-0.5 mb-1.5" key={user.id}>
                <CardHeader>
                  <CardTitle className="">{user.username}</CardTitle>
                  <CardDescription className="">
                    <Label>{user.email}</Label>
                    <br />
                    <Label>Role: {user.role.description}</Label>
                    <br />
                    <Label>
                      Status: {user.is_active ? "Active" : "Inactive"}
                    </Label>
                  </CardDescription>
                </CardHeader>
                {user.role.description !== "admin" && (
                  <Button
                    className="w-28 -mb-2 -mt-2 place-self-center"
                    onClick={() => handleElevateUser(user.email)}
                  >
                    Make admin
                  </Button>
                )}
              </Card>
            ))}
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
}
