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

const items = [
  {
    name: "Maria P. Petrova",
    title: "Desk",
    date: "02.03.1965",
    condition: "Expecting approving",
    color: "text-slate-500",
  },
  {
    name: "Kaloyan N. Ivanov",
    title: "Multimedia set",
    date: "14.05.2025",
    condition: "Request approved",
    color: "text-green-600",
  },
  {
    title: "Pen",
    name: "Petar M. Vasilev",
    date: "04.04.2024",
    condition: "Returned",
    color: "text-black-900",
  },
  {
    title: "Desk",
    name: "Elena T. Todorova",
    date: "10.07.2025",
    condition: "Request approved",
    color: "text-green-600",
  },
  {
    name: "Slavena P. Raicheva",
    title: "Chair",
    date: "15.08.2025",
    condition: "Returned",
    color: "text-black-900",
  },
  {
    name: "Ivan M. Ivanov",
    title: "Pencil",
    date: "13.10.2024",
    condition: "Expired returning date",
    color: "text-red-600",
  },
];

export function AdminHistory() {
  return (
    <div>
      <SidebarProvider>
        <div className="fixed top-0">
          <AdAppSidebar />
          <SidebarTrigger className="size-10" />
        </div>
        <div className="flex flex-col mt-12">
          <div className="fixed flex flex-row ml-3 gap-4">
            <div className=" bg-white">
              <Select>
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
                    <SelectItem value="expected">
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
              <Input className="h-9.5 -ml-4 pl-8" />
            </div>
          </div>
          <div className="mt-12">
            {items.map((item) => (
              <Card className="w-96 ml-0.5 h-32 mb-1.5" key={item.name}>
                <CardHeader>
                  <CardTitle className="">{item.name}</CardTitle>
                  <CardDescription className="-mb-1">
                    <Label>The request was made on {item.date}</Label>
                    <Label>Borrowed: {item.title}</Label>
                  </CardDescription>
                  <Label className={item.color}>{item.condition}</Label>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
}
