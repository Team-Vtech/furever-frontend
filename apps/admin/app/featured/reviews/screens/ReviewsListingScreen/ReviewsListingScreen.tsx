"use client";

import { BookingsClient } from "@/app/featured/bookings/clients/bookings.client";
import { DataTable } from "@/app/shared/components/DataTable/DataTable";
import { Booking } from "@furever/types";
import { Button } from "@furever/ui/components/button";
import Link from "next/link";
import { InsightsCard } from "../../components/InsightsCard";
import { OverallRatingCard } from "../../components/OverallRatingCard";
import { StarRating } from "../../components/StarRating";
import { useReviewListingScreenState } from "./hooks/useReviewListingScreenState";
import { useReviewStatistics } from "./hooks/useReviewStatistics";

export function ReviewsListingScreen() {
    const { data, isLoading } = useReviewListingScreenState();
    const { reviewStats } = useReviewStatistics();
    return (
        <>
            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-8">
                <OverallRatingCard
                    stats={{
                        overallRating: reviewStats?.overall_average_rating || 0,
                        starBreakdown: reviewStats?.ratings_breakdown || {
                            5: 0,
                            4: 0,
                            3: 0,
                            2: 0,
                            1: 0,
                        },
                        totalReviews: reviewStats?.total_reviewers || 0,
                    }}
                />
                <InsightsCard serviceStats={reviewStats?.most_reviewed_service ?? []} />
            </div>
            <DataTable
                data={data?.reviews || []}
                columns={[
                    {
                        header: "Customer",
                        cell: ({ row }) => (
                            <div className="flex items-center gap-2">
                                <span>{row.original.user.name}</span>
                            </div>
                        ),
                    },
                    {
                        accessorKey: "service",
                        header: "Service",
                        cell: ({ row }) => (
                            <div className="flex items-center gap-2">
                                <span>{row.original.booking.service.name}</span>
                            </div>
                        ),
                    },
                    {
                        accessorKey: "rating",
                        header: "Rating",
                        cell: ({ row }) => {
                            return <StarRating rating={row.original.rating} />;
                        },
                    },
                    {
                        id: "actions",
                        header: "Actions",
                        cell: ({ row }) => (
                            <Button size="sm" variant="outline" asChild>
                                <Link href={`/reviews/${row.original.id}`}>View</Link>
                            </Button>
                        ),
                    },
                ]}
                pagination={data?.pagination || undefined}
                isLoading={isLoading}
                filters={{
                    config: [
                        {
                            type: "dynamicSelect",
                            filterKey: "booking_id",
                            props: {
                                label: "Booking",
                                queryFn: BookingsClient.getBookings,
                                optionDisplayKey: (record) => {
                                    const booking = record as Booking;
                                    return booking.provider.business_name + " | " + booking.service.name;
                                },
                                queryKey: "listBookings",
                            },
                        },
                    ],
                    initialData: {
                        pet_type: "",
                    },
                }}
            />
        </>
    );
}
