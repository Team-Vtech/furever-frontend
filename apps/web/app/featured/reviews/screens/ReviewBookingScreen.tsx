"use client";

import { BookingsClient } from "@/app/featured/bookings/clients/bookings.client";
import { CreateReviewRequest, Review, UpdateReviewRequest } from "@furever/types";
import { Badge } from "@furever/ui/components/badge";
import { Button } from "@furever/ui/components/button";
import { Card, CardContent, CardHeader, CardTitle } from "@furever/ui/components/card";
import { Skeleton } from "@furever/ui/components/skeleton";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { AlertCircle, ArrowLeft, Calendar, CheckCircle, Clock, Heart, MapPin, Star, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ReviewsClient } from "../clients/reviews.client";
import { FeaturedReview } from "../components/FeaturedReview";
import { ReviewForm } from "../components/ReviewForm";
import { ReviewList } from "../components/ReviewList";

interface ReviewBookingScreenProps {
    bookingId: string;
}

export function ReviewBookingScreen({ bookingId }: ReviewBookingScreenProps) {
    const router = useRouter();
    const queryClient = useQueryClient();
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [editingReview, setEditingReview] = useState<Review | null>(null);

    // Fetch booking details
    const {
        data: bookingData,
        isLoading: bookingLoading,
        error: bookingError,
    } = useQuery({
        queryKey: ["booking", bookingId],
        queryFn: () => BookingsClient.getBooking(bookingId),
    });

    // Fetch reviews for the booking
    const {
        data: reviewsData,
        isLoading: reviewsLoading,
        error: reviewsError,
    } = useQuery({
        queryKey: ["reviews", bookingId],
        queryFn: () => ReviewsClient.getBookingReviews(bookingId),
    });

    // Create review mutation
    const createReviewMutation = useMutation({
        mutationFn: (data: CreateReviewRequest) => ReviewsClient.createReview(bookingId, data),
        onSuccess: () => {
            toast.success("Review submitted successfully!");
            queryClient.invalidateQueries({ queryKey: ["reviews", bookingId] });
            setShowCreateForm(false);
        },
        onError: (error) => {
            toast.error("Failed to submit review");
            console.error("Error creating review:", error);
        },
    });

    // Update review mutation
    const updateReviewMutation = useMutation({
        mutationFn: ({ reviewId, data }: { reviewId: number; data: UpdateReviewRequest }) => ReviewsClient.updateReview(bookingId, reviewId, data),
        onSuccess: () => {
            toast.success("Review updated successfully!");
            queryClient.invalidateQueries({ queryKey: ["reviews", bookingId] });
            setEditingReview(null);
        },
        onError: (error) => {
            toast.error("Failed to update review");
            console.error("Error updating review:", error);
        },
    });

    // Delete review mutation
    const deleteReviewMutation = useMutation({
        mutationFn: (reviewId: number) => ReviewsClient.deleteReview(bookingId, reviewId),
        onSuccess: () => {
            toast.success("Review deleted successfully!");
            queryClient.invalidateQueries({ queryKey: ["reviews", bookingId] });
        },
        onError: (error) => {
            toast.error("Failed to delete review");
            console.error("Error deleting review:", error);
        },
    });

    const booking = bookingData?.data;
    const reviews = reviewsData?.data || [];

    // Check if booking is completed
    const isBookingCompleted = booking?.status === "completed";
    const canCreateReview = isBookingCompleted && !reviews.some((review) => review.user_id === booking?.user_id);

    // Redirect if booking is not completed
    useEffect(() => {
        if (booking && !isBookingCompleted) {
            toast.error("You can only review completed bookings");
            router.push(`/bookings/${bookingId}`);
        }
    }, [booking, isBookingCompleted, bookingId, router]);

    const handleCreateReview = async (data: CreateReviewRequest) => {
        await createReviewMutation.mutateAsync(data);
    };

    const handleUpdateReview = async (data: UpdateReviewRequest) => {
        if (editingReview) {
            await updateReviewMutation.mutateAsync({ reviewId: editingReview.id, data });
        }
    };

    const handleDeleteReview = async (reviewId: number) => {
        await deleteReviewMutation.mutateAsync(reviewId);
    };

    const handleEditReview = (review: Review) => {
        setEditingReview(review);
        setShowCreateForm(false);
    };

    const canEditReview = (review: Review) => {
        return review.user_id === booking?.user_id;
    };

    const canDeleteReview = (review: Review) => {
        return review.user_id === booking?.user_id;
    };

    if (bookingLoading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <Skeleton className="mb-4 h-8 w-48" />
                        <Skeleton className="h-4 w-64" />
                    </div>
                    <div className="space-y-6">
                        <Skeleton className="h-64 w-full" />
                        <Skeleton className="h-32 w-full" />
                    </div>
                </div>
            </div>
        );
    }

    if (bookingError || !booking) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle className="text-center text-red-600">Error</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                        <AlertCircle className="mx-auto mb-4 h-12 w-12 text-red-500" />
                        <p className="mb-4 text-gray-600">Failed to load booking details. Please try again.</p>
                        <Button onClick={() => router.back()} variant="outline">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Go Back
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (!isBookingCompleted) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle className="text-center text-orange-600">Access Denied</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                        <AlertCircle className="mx-auto mb-4 h-12 w-12 text-orange-500" />
                        <p className="mb-4 text-gray-600">You can only review completed bookings. This booking is currently {booking.status}.</p>
                        <Button asChild>
                            <Link href={`/bookings/${bookingId}`}>
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                View Booking Details
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="mb-4 flex items-center gap-4">
                        <Button variant="ghost" size="sm" asChild>
                            <Link href={`/bookings/${bookingId}`}>
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Booking
                            </Link>
                        </Button>
                        <div className="flex items-center gap-2">
                            <Star className="h-6 w-6 text-yellow-500" />
                            <h1 className="text-3xl font-bold text-gray-900">Review Service</h1>
                        </div>
                    </div>
                    <p className="text-gray-600">Share your experience with this completed booking.</p>
                </div>

                {/* Booking Summary */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <CheckCircle className="h-5 w-5 text-green-500" />
                            Booking Summary
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <Calendar className="h-5 w-5 text-gray-400" />
                                    <div>
                                        <p className="text-sm text-gray-500">Booking Date</p>
                                        <p className="font-medium">{format(new Date(booking.booking_date), "EEEE, MMMM d, yyyy")}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Clock className="h-5 w-5 text-gray-400" />
                                    <div>
                                        <p className="text-sm text-gray-500">Time</p>
                                        <p className="font-medium">{booking.booking_time}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <MapPin className="h-5 w-5 text-gray-400" />
                                    <div>
                                        <p className="text-sm text-gray-500">Location</p>
                                        <p className="font-medium">
                                            {booking.provider.location.city}, {booking.provider.location.state}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <User className="h-5 w-5 text-gray-400" />
                                    <div>
                                        <p className="text-sm text-gray-500">Provider</p>
                                        <p className="font-medium">{booking.provider.business_name}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Heart className="h-5 w-5 text-gray-400" />
                                    <div>
                                        <p className="text-sm text-gray-500">Pet</p>
                                        <p className="font-medium">{booking.pet.name}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Star className="h-5 w-5 text-gray-400" />
                                    <div>
                                        <p className="text-sm text-gray-500">Service</p>
                                        <p className="font-medium">{booking.service.name}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 border-t pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">Total Amount</p>
                                    <p className="text-2xl font-bold text-green-600">${booking.total_price}</p>
                                </div>
                                <Badge variant="secondary" className="bg-green-100 text-green-800">
                                    {booking.status}
                                </Badge>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Featured Review Section */}
                {reviews.length > 0 && (
                    <div className="mb-8">
                        <FeaturedReview review={reviews[0]} />
                    </div>
                )}

                {/* Reviews Section */}
                <div className="space-y-6">
                    <ReviewList
                        reviews={reviews}
                        isLoading={reviewsLoading}
                        canCreateReview={canCreateReview}
                        canEditReview={canEditReview}
                        canDeleteReview={canDeleteReview}
                        onEdit={handleEditReview}
                        onDelete={handleDeleteReview}
                        onCreateReview={() => setShowCreateForm(true)}
                        bookingId={bookingId}
                        onSubmitReview={handleCreateReview}
                        onCancelReview={() => setShowCreateForm(false)}
                        isSubmittingReview={createReviewMutation.isPending}
                    />

                    {/* Edit Review Form */}
                    {editingReview && (
                        <ReviewForm
                            bookingId={bookingId}
                            review={editingReview}
                            onSubmit={handleUpdateReview}
                            onCancel={() => setEditingReview(null)}
                            isLoading={updateReviewMutation.isPending}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
