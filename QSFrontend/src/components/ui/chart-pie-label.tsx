"use client";

//import { TrendingUp } from "lucide-react";
import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { status: "returned", users: 275, fill: "var(--color-returned)" },
  { status: "approved", users: 200, fill: "var(--color-approved)" },
  { status: "expired", users: 187, fill: "var(--color-expired)" },
  { status: "expecting", users: 173, fill: "var(--color-expecting)" },
];

const chartConfig = {
  returned: {
    label: "Returned",
    color: "var(--chart-1)",
  },
  approved: {
    label: "Request approved",
    color: "var(--chart-2)",
  },
  expired: {
    label: "Expired returning date",
    color: "var(--chart-3)",
  },
  expecting: {
    label: "Expecting approving",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig;

export function ChartPieLabel() {
  return (
    <Card className="flex flex-col w-80 h-110 ml-9 mt-8">
      <CardHeader className="items-center pb-0">
        <CardTitle>Request Analythics</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square max-h-[250px] pb-0"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="users" label nameKey="browser" />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          70% of requests was returned on time
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
