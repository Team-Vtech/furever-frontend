"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@furever/ui/components/card";
import { Button } from "@furever/ui/components/button";
import { Badge } from "@furever/ui/components/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@furever/ui/components/table";
import { Edit2, Pause, Trash2, Plus, ChevronRight } from "lucide-react";
import { cn } from "@furever/ui/lib/utils";

interface Service {
  id: string;
  name: string;
  category: string;
  price: number;
  status: "available" | "paused";
}

interface YourServicesProps {
  className?: string;
}

const services: Service[] = [
  {
    id: "1",
    name: "Full Grooming",
    category: "Dog Care",
    price: 75,
    status: "available",
  },
  {
    id: "2",
    name: "Vaccination",
    category: "Medical",
    price: 50,
    status: "available",
  },
  {
    id: "3",
    name: "Pet Sitting (Daily)",
    category: "Boarding",
    price: 40,
    status: "paused",
  },
];

export function YourServices({ className }: YourServicesProps) {
  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Your Services</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add New Service
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <Card key={service.id}>
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold">{service.name}</h3>
                    <Badge variant="outline" className="mt-1 bg-gray-50">
                      {service.category}
                    </Badge>
                  </div>
                  <p className="text-lg font-semibold">${service.price}</p>
                </div>

                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      "w-2 h-2 rounded-full",
                      service.status === "available"
                        ? "bg-green-500"
                        : "bg-red-500"
                    )}
                  />
                  <span className="text-sm text-muted-foreground capitalize">
                    {service.status}
                  </span>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Pause className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button variant="outline" className="w-full" asChild>
        <a href="/admin/services">
          Manage All Services
          <ChevronRight className="ml-2 h-4 w-4" />
        </a>
      </Button>
    </div>
  );
}
