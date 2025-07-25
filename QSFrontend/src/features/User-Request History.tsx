import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { UsAppSidebar } from "@/components/User - Sidebar";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { SearchSVG } from "@/svg/SearchSVG";
import { useState } from "react";

const parseFormattedDate = (dateString: string): number => {
  const [day, month, year] = dateString.split(".");
  return new Date(`${year}-${month}-${day}`).valueOf();
}; // a helper function for parsing the timedate

const items = [
  {
    title: "Desk",
    date: "02.03.1965",
    condition: "Expecting approving",
    color: "text-slate-500",
    key: "expecting",
  },
  {
    title: "Multimedia set",
    date: "14.05.2025",
    condition: "Request approved",
    color: "text-green-600",
    key: "approved",
  },
  {
    title: "Pen",
    date: "04.04.2024",
    condition: "Returned",
    color: "text-black-900",
    key: "returned",
  },
  {
    title: "Desk",
    date: "10.07.2025",
    condition: "Request approved",
    color: "text-green-600",
    key: "approved",
  },
  {
    title: "Chair",
    date: "15.08.2025",
    condition: "Returned",
    color: "text-black-900",
    key: "returned",
  },
  {
    title: "Pencil",
    date: "13.10.2024",
    condition: "Expired returning date",
    color: "text-red-600",
    key: "expired",
  },
];

export function UserHistory() {
  const [filter, setFilter] = useState("default");
  const [searchQuery, setSearchQuery] = useState("");
  const filteredItems = items
    .filter((item) => {
      // Item filtering
      if (filter === "approved") return item.key === "approved";
      if (filter === "expecting") return item.key === "expecting";
      if (filter === "returned") return item.key === "returned";
      if (filter === "expired") return item.key === "expired";

      if (searchQuery) {
        return (
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.date.includes(searchQuery) ||
          item.condition.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      return true; // Show all if no status filter is selected
    })
    .sort((a, b) => {
      // Time sorting
      if (filter === "newFirst") {
        return parseFormattedDate(b.date) - parseFormattedDate(a.date);
      }
      if (filter === "oldFirst") {
        return parseFormattedDate(a.date) - parseFormattedDate(b.date);
      }
      return 0; // Default order
    });
  return (
    <div>
      <SidebarProvider>
        <div className="fixed top-0">
          <UsAppSidebar />
          <SidebarTrigger className="size-10" />
        </div>
        <div className="flex flex-col mt-12">
          <div className="fixed flex flex-row ml-3 gap-4">
            <div className=" bg-white">
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-34">
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Sorted by time</SelectLabel>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="newFirst">New ones first</SelectItem>
                    <SelectItem value="oldFirst">Old ones first</SelectItem>
                  </SelectGroup>
                  <SelectGroup>
                    <SelectLabel>Sorted by status</SelectLabel>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="expecting">
                      Expecting approving
                    </SelectItem>
                    <SelectItem value="returned">Returned</SelectItem>
                    <SelectItem value="expired">
                      Expired returning date
                    </SelectItem>
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
          <div className="mt-12">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <Card
                  className="w-96 ml-0.5 h-32 mb-1.5"
                  key={`${item.key}-${item.date}`}
                >
                  <CardHeader>
                    <CardTitle>{item.title}</CardTitle>
                    <CardDescription>{item.date}</CardDescription>
                    <Label className={item.color}>{item.condition}</Label>
                  </CardHeader>
                </Card>
              ))
            ) : (
              <div className="w-96 ml-0.5 h-32 mb-1.5 flex items-center justify-center">
                <p>No items found matching your criteria</p>
              </div>
            )}
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
}
