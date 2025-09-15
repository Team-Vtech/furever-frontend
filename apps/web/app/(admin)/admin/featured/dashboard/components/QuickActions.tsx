"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@furever/ui/components/card";
import { Button } from "@furever/ui/components/button";
import { CheckCircle, MessageSquare, BarChart3, LifeBuoy } from "lucide-react";
import { cn } from "@furever/ui/lib/utils";

interface QuickAction {
  id: string;
  title: string;
  icon: React.ReactNode;
}

interface QuickActionsProps {
  className?: string;
}

const quickActions: QuickAction[] = [
  {
    id: "update-profile",
    title: "Update Profile",
    icon: <CheckCircle className="h-6 w-6" />,
  },
  {
    id: "chat",
    title: "Chat with Pet Parent",
    icon: <MessageSquare className="h-6 w-6" />,
  },
  {
    id: "reports",
    title: "Financial Reports",
    icon: <BarChart3 className="h-6 w-6" />,
  },
  {
    id: "support",
    title: "Support",
    icon: <LifeBuoy className="h-6 w-6" />,
  },
];

export function QuickActions({ className }: QuickActionsProps) {
  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {quickActions.map((action) => (
            <Button
              key={action.id}
              variant="outline"
              className="h-24 flex flex-col gap-2 bg-gray-50/50 hover:bg-gray-100/50"
            >
              <div className="text-muted-foreground">{action.icon}</div>
              <span className="text-sm font-medium text-center">
                {action.title}
              </span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
