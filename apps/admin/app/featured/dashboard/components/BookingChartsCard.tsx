"use client";

import { useState } from "react";
import { BarChart3 } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@furever/ui/components/card";
import { Button } from "@furever/ui/components/button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { BookingStatistics } from "../../../shared/types/models.types";

interface BookingChartsCardProps {
  statistics: BookingStatistics;
}

type TabType = "providers" | "services";

function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border rounded-lg p-3 shadow-md">
        <p className="text-sm font-medium">{label}</p>
        <p className="text-sm text-primary">
          Bookings: <span className="font-semibold">{payload[0].value}</span>
        </p>
      </div>
    );
  }
  return null;
}

export function BookingChartsCard({ statistics }: BookingChartsCardProps) {
  const [activeTab, setActiveTab] = useState<TabType>("providers");
  const { bookings_per_provider, bookings_per_service } = statistics;

  // Transform data for recharts
  const providerData = bookings_per_provider.map((p) => ({
    name: p.provider_name,
    count: p.count,
  }));

  const serviceData = bookings_per_service.map((s) => ({
    name: s.service_name,
    count: s.count,
  }));

  const currentData = activeTab === "providers" ? providerData : serviceData;
  const chartTitle =
    activeTab === "providers"
      ? "Bookings per Provider"
      : "Bookings per Service";

  return (
    <Card className="col-span-2">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Booking Analytics</CardTitle>
        <BarChart3 className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-muted p-1 rounded-lg">
          <Button
            variant={activeTab === "providers" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("providers")}
            className="flex-1"
          >
            Providers
          </Button>
          <Button
            variant={activeTab === "services" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("services")}
            className="flex-1"
          >
            Services
          </Button>
        </div>

        {/* Chart Content */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-muted-foreground">
            {chartTitle}
          </h4>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={currentData.slice(0, 8)} // Show top 8 items
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  interval={0}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="count"
                  fill="hsl(var(--primary))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
