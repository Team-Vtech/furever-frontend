"use client";

import { BookingsClient } from "@/app/featured/bookings/clients/bookings.client";
import { ServicesClient } from "@/app/featured/services/clients/services.client";
import { UsersClient } from "@/app/featured/users/clients/users.client";
import { DataTable } from "@/app/shared/components/DataTable/DataTable";
import { Booking, Service, User } from "@furever/types";
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
                        accessorKey: "booking",
                        header: "Booking",
                        cell: ({ row }) => (
                            <div className="flex items-center gap-2">
                                <Link href={`/bookings/${row.original.booking.id}/view`}>
                                    <span>{row.original.booking.id}</span>
                                </Link>
                            </div>
                        ),
                    },
                    {
                        header: "Customer",
                        cell: ({ row }) => (
                            <div className="flex items-center gap-2">
                                <Link href={`/users/${row.original.user.id}/view`}>
                                    <span>{row.original.user.name}</span>
                                </Link>
                            </div>
                        ),
                    },
                    {
                        accessorKey: "service",
                        header: "Service",
                        cell: ({ row }) => (
                            <div className="flex items-center gap-2">
                                <Link href={`/services/${row.original.booking.service.id}/edit`}>
                                    <span>{row.original.booking.service.name}</span>
                                </Link>
                            </div>
                        ),
                    },
                    {
                        accessorKey: "review",
                        header: "Review",
                        cell: ({ row }) => (
                            <div className="flex items-center gap-2">
                                <span>{row.original.comment}</span>
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
                        {
                            type: "dynamicSelect",
                            filterKey: "user_id",
                            props: {
                                label: "User",
                                queryFn: UsersClient.getUsers,
                                optionDisplayKey: (record) => {
                                    const user = record as User;
                                    return user.name;
                                },
                                queryKey: "listUsers",
                            },
                        },
                        {
                            type: "dynamicSelect",
                            filterKey: "service_id",
                            props: {
                                label: "Service",
                                queryFn: ServicesClient.getServices,
                                optionDisplayKey: (record) => {
                                    const service = record as Service;
                                    return service.name;
                                },
                                queryKey: "listServices",
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
