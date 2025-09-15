"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@furever/ui/components/card";
import { Button } from "@furever/ui/components/button";
import { Badge } from "@furever/ui/components/badge";
import { Progress } from "@furever/ui/components/progress";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@furever/ui/components/avatar";
import { cn } from "@furever/ui/lib/utils";

interface ProfileCompletionProps {
  className?: string;
}

export function ProfileCompletion({ className }: ProfileCompletionProps) {
  const completionPercentage = 75;

  return (
    <Card className={cn("bg-purple-50 border-purple-100", className)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold">
              Welcome back, Dr. Sarah Chen!
            </h3>
            <p className="text-muted-foreground">
              You&apos;re doing great! Complete your profile to unlock more
              features and connect with more pet parents.
            </p>
            <div className="flex items-center gap-4 mt-4">
              <div className="flex-1">
                <Progress value={completionPercentage} className="h-2" />
              </div>
              <span className="text-sm font-medium">
                {completionPercentage}%
              </span>
            </div>
            <Button size="sm" className="mt-4">
              Complete Profile
            </Button>
          </div>
          <Avatar className="h-20 w-20 border-4 border-green-200">
            <AvatarImage src="/api/placeholder/80/80" alt="Dr. Sarah Chen" />
            <AvatarFallback className="bg-green-100 text-green-800">
              SC
            </AvatarFallback>
          </Avatar>
        </div>
      </CardContent>
    </Card>
  );
}
