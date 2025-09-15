"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@furever/ui/components/card";
import { Badge } from "@furever/ui/components/badge";
import { Button } from "@furever/ui/components/button";
import { ChevronRight } from "lucide-react";
import { cn } from "@furever/ui/lib/utils";

interface Appointment {
  id: string;
  time: string;
  clientName: string;
  petName: string;
  petType: string;
  service: string;
  status: "confirmed" | "pending";
}

interface UpcomingAppointmentsProps {
  appointments: Appointment[];
  className?: string;
}

export function UpcomingAppointments({
  appointments,
  className,
}: UpcomingAppointmentsProps) {
  return (
    <Card className={cn("", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-semibold">
          Upcoming Appointments
        </CardTitle>
        <Badge
          variant="outline"
          className="bg-orange-100 text-orange-800 border-orange-200"
        >
          Sunday, 17
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        {appointments.map((appointment, index) => (
          <div
            key={appointment.id}
            className={cn(
              "flex items-center justify-between border-b border-border pb-4 last:border-b-0 last:pb-0"
            )}
          >
            <div className="space-y-1">
              <p className="font-medium">{appointment.time}</p>
              <p className="text-sm text-muted-foreground">
                {appointment.clientName} ({appointment.petName} (
                {appointment.petType}))
              </p>
            </div>
            <div className="text-right space-y-1">
              <p className="font-medium">{appointment.service}</p>
              <Badge
                variant={
                  appointment.status === "confirmed" ? "default" : "secondary"
                }
                className={cn(
                  appointment.status === "confirmed"
                    ? "bg-green-100 text-green-800 border-green-200"
                    : "bg-orange-100 text-orange-800 border-orange-200"
                )}
              >
                {appointment.status === "confirmed" ? "Confirmed" : "Pending"}
              </Badge>
            </div>
          </div>
        ))}
        <Button variant="outline" className="w-full mt-4" size="sm" asChild>
          <a href="/admin/appointments">
            View Full Schedule
            <ChevronRight className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}
