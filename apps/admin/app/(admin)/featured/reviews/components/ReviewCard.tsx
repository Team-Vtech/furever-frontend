import React from "react";
import { Button } from "@furever/ui/components/button";
import { Separator } from "@furever/ui/components/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@furever/ui/components/dropdown-menu";
import { StarRating } from "./StarRating";
import { Review } from "../types/review.types";

interface ReviewCardProps {
  review: Review;
  onAction?: (action: string, reviewId: string) => void;
}

export function ReviewCard({ review, onAction }: ReviewCardProps) {
  const getAvatarColor = (name: string) => {
    const colors = [
      "bg-green-100 border-green-400",
      "bg-blue-100 border-blue-400",
      "bg-yellow-100 border-yellow-400",
      "bg-purple-100 border-purple-400",
      "bg-pink-100 border-pink-400",
      "bg-indigo-100 border-indigo-400",
      "bg-red-100 border-red-400",
      "bg-gray-100 border-gray-400",
    ];
    const index = name.length % colors.length;
    return colors[index];
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${getAvatarColor(review.customerName)}`}
            >
              {getInitials(review.customerName)}
            </div>

            <div className="flex-1 space-y-1">
              <h4 className="text-lg font-medium text-gray-900">
                {review.customerName}
              </h4>
              <p className="text-sm font-medium text-gray-500">
                {review.serviceName}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <StarRating rating={review.rating} size="sm" />
              <span className="text-sm font-medium text-gray-900">
                {review.rating}
              </span>
            </div>

            <span className="text-sm font-medium text-gray-500 text-right">
              {review.date}
            </span>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <svg
                    className="w-4 h-4 text-gray-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onAction?.("view", review.id)}>
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onAction?.("respond", review.id)}
                >
                  Respond
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onAction?.("flag", review.id)}
                  className="text-red-600"
                >
                  Flag Review
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <svg
                className="w-4 h-4 text-gray-900"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </Button>
          </div>
        </div>
      </div>
      <Separator />
    </div>
  );
}
