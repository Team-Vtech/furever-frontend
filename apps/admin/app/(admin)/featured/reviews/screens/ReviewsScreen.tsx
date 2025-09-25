"use client";

import React, { useState } from "react";
import { Button } from "@furever/ui/components/button";
import { OverallRatingCard } from "../components/OverallRatingCard";
import { InsightsCard } from "../components/InsightsCard";
import { FilterSection } from "../components/FilterSection";
import { ReviewCard } from "../components/ReviewCard";
import { Pagination } from "../components/Pagination";
import {
  Review,
  ReviewStats,
  ServiceStats,
  PetTypeStats,
  ReviewFilters,
} from "../types/review.types";

// Mock data - In a real app this would come from API
const mockReviewStats: ReviewStats = {
  overallRating: 4.5,
  totalReviews: 8,
  starBreakdown: {
    5: 4,
    4: 3,
    3: 1,
    2: 0,
    1: 0,
  },
};

const mockServiceStats: ServiceStats[] = [
  { serviceName: "Dog Walking", reviewCount: 3 },
  { serviceName: "Grooming", reviewCount: 2 },
  { serviceName: "Cat Sitting", reviewCount: 2 },
  { serviceName: "Pet Taxi", reviewCount: 1 },
  { serviceName: "Obedience Training", reviewCount: 1 },
];

const mockPetTypeStats: PetTypeStats = {
  dogs: 63,
  cats: 37,
};

const mockReviews: Review[] = [
  {
    id: "1",
    customerName: "Emily R.",
    avatar: "/avatars/emily.jpg",
    serviceName: "Dog Walking (Daily)",
    rating: 5,
    date: "2024-07-28",
    petType: "dog",
  },
  {
    id: "2",
    customerName: "Mark T.",
    avatar: "/avatars/mark.jpg",
    serviceName: "Cat Sitting (Weekend)",
    rating: 5,
    date: "2024-07-25",
    petType: "cat",
  },
  {
    id: "3",
    customerName: "Sarah L.",
    avatar: "/avatars/sarah.jpg",
    serviceName: "Grooming (Full Package)",
    rating: 4,
    date: "2024-07-22",
    petType: "dog",
  },
  {
    id: "4",
    customerName: "David K.",
    avatar: "/avatars/david.jpg",
    serviceName: "Veterinary Checkup Coordination",
    rating: 5,
    date: "2024-07-19",
    petType: "dog",
  },
  {
    id: "5",
    customerName: "Jessica B.",
    avatar: "/avatars/jessica.jpg",
    serviceName: "Obedience Training (Basic)",
    rating: 3,
    date: "2024-07-15",
    petType: "dog",
  },
  {
    id: "6",
    customerName: "Michael P.",
    avatar: "/avatars/michael.jpg",
    serviceName: "Pet Taxi Service",
    rating: 5,
    date: "2024-07-10",
    petType: "cat",
  },
  {
    id: "7",
    customerName: "Linda G.",
    avatar: "/avatars/linda.jpg",
    serviceName: "Pet Sitting (Overnight)",
    rating: 1,
    date: "2024-07-05",
    petType: "dog",
  },
  {
    id: "8",
    customerName: "Chris W.",
    avatar: "/avatars/chris.jpg",
    serviceName: "Dog Grooming (Basic)",
    rating: 2,
    date: "2024-07-01",
    petType: "dog",
  },
];

export function ReviewsScreen() {
  const [filters, setFilters] = useState<ReviewFilters>({
    service: "all",
    petType: "all",
    rating: "all",
    dateRange: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 1; // For now, showing all reviews on one page

  const handleFiltersChange = (newFilters: ReviewFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      service: "all",
      petType: "all",
      rating: "all",
      dateRange: "",
    });
  };

  const handleApplyFilters = () => {
    // In a real app, this would trigger API call with filters
    console.log("Applying filters:", filters);
  };

  const handleReviewAction = (action: string, reviewId: string) => {
    console.log(`Action: ${action} on review: ${reviewId}`);
  };

  const handleExportReviews = () => {
    console.log("Exporting reviews...");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">
            Ratings & Reviews
          </h1>
          <Button
            onClick={handleExportReviews}
            className="px-6 bg-white text-gray-900 border border-gray-300 hover:bg-gray-50"
          >
            Export Reviews
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-8">
          <OverallRatingCard stats={mockReviewStats} />
          <InsightsCard
            serviceStats={mockServiceStats}
            petTypeStats={mockPetTypeStats}
          />
        </div>

        {/* Filter Section */}
        <FilterSection
          filters={filters}
          onFiltersChange={handleFiltersChange}
          onClearFilters={handleClearFilters}
          onApplyFilters={handleApplyFilters}
        />

        {/* Reviews List */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Recent Reviews ({mockReviews.length})
          </h2>

          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            {mockReviews.map((review) => (
              <ReviewCard
                key={review.id}
                review={review}
                onAction={handleReviewAction}
              />
            ))}
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}
