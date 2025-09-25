"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@furever/ui/components/card";
import { Button } from "@furever/ui/components/button";
import { Calendar } from "lucide-react";
import { cn } from "@furever/ui/lib/utils";

interface WeekDay {
  day: string;
  date: string;
  hasAppointments?: boolean;
  isToday?: boolean;
}

interface WeekAtGlanceProps {
  className?: string;
}

const weekDays: WeekDay[] = [
  { day: "Sun", date: "17", isToday: true, hasAppointments: false },
  { day: "Mon", date: "18", hasAppointments: true },
  { day: "Tue", date: "19", hasAppointments: false },
  { day: "Wed", date: "20", hasAppointments: true },
  { day: "Thu", date: "21", hasAppointments: false },
  { day: "Fri", date: "22", hasAppointments: true },
  { day: "Sat", date: "23", hasAppointments: false },
];

export function WeekAtGlance({ className }: WeekAtGlanceProps) {
  return (
    <Card className={cn("", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
        <CardTitle className="text-xl font-semibold">
          Week at a Glance
        </CardTitle>
        <Button variant="outline" size="icon">
          <Calendar className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-7 gap-2">
          {weekDays.map((day) => (
            <div
              key={day.date}
              className={cn(
                "text-center p-2 rounded-lg border",
                day.isToday && "bg-muted border-muted-foreground"
              )}
            >
              <p className="text-xs font-medium text-muted-foreground mb-1">
                {day.day}
              </p>
              <p className="text-lg font-medium">{day.date}</p>
              {day.hasAppointments && (
                <div className="w-2 h-2 bg-orange-400 rounded-full mx-auto mt-1" />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
