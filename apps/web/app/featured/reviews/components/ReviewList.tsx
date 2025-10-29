"use client";

import { CreateReviewRequest, Review } from "@furever/types";
import { Button } from "@furever/ui/components/button";
import { Card, CardContent } from "@furever/ui/components/card";
import { Skeleton } from "@furever/ui/components/skeleton";
import { MessageSquare, Plus, Star } from "lucide-react";
import { useState } from "react";
import { ReviewCard } from "./ReviewCard";
import { ReviewForm } from "./ReviewForm";

interface ReviewListProps {
    reviews: Review[];
    isLoading?: boolean;
    canCreateReview?: boolean;
    canEditReview?: (review: Review) => boolean;
    canDeleteReview?: (review: Review) => boolean;
    onEdit?: (review: Review) => void;
    onDelete?: (reviewId: number) => void;
    bookingId?: string | number;
    onSubmitReview?: (data: CreateReviewRequest) => Promise<void>;
    onCancelReview?: () => void;
    isSubmittingReview?: boolean;
}

export function ReviewList({
    reviews,
    isLoading,
    canCreateReview = false,
    canEditReview,
    canDeleteReview,
    onEdit,
    onDelete,
    bookingId,
    onSubmitReview,
    onCancelReview,
    isSubmittingReview = false,
}: ReviewListProps) {
    const [showCreateForm, setShowCreateForm] = useState(false);

    if (isLoading) {
        return (
            <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                    <Card key={i}>
                        <CardContent className="p-6">
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <Skeleton className="h-10 w-10 rounded-full" />
                                    <div className="space-y-2">
                                        <Skeleton className="h-4 w-32" />
                                        <Skeleton className="h-3 w-24" />
                                    </div>
                                </div>
                                <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, j) => (
                                        <Skeleton key={j} className="h-4 w-4" />
                                    ))}
                                </div>
                                <Skeleton className="h-16 w-full" />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        );
    }

    const averageRating = reviews.length > 0 ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1) : 0;

    const ratingCounts = reviews.reduce(
        (acc, review) => {
            acc[review.rating] = (acc[review.rating] || 0) + 1;
            return acc;
        },
        {} as Record<number, number>,
    );

    return (
        <div className="space-y-6">
            {/* Review Summary */}
            <Card>
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-gray-900">{averageRating}</div>
                                <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`h-4 w-4 ${
                                                i < Math.round(Number(averageRating)) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                            }`}
                                        />
                                    ))}
                                </div>
                                <div className="text-sm text-gray-600">
                                    {reviews.length} review{reviews.length !== 1 ? "s" : ""}
                                </div>
                            </div>

                            <div className="space-y-1">
                                {[5, 4, 3, 2, 1].map((rating) => (
                                    <div key={rating} className="flex items-center gap-2 text-sm">
                                        <span className="w-3 text-right">{rating}</span>
                                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                        <div className="h-2 w-20 rounded-full bg-gray-200">
                                            <div
                                                className="h-2 rounded-full bg-yellow-400"
                                                style={{
                                                    width: `${reviews.length > 0 ? ((ratingCounts[rating] || 0) / reviews.length) * 100 : 0}%`,
                                                }}
                                            />
                                        </div>
                                        <span className="w-6 text-left text-gray-600">{ratingCounts[rating] || 0}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {canCreateReview && !showCreateForm && (
                            <Button onClick={() => setShowCreateForm(true)} className="flex items-center gap-2">
                                <Plus className="h-4 w-4" />
                                Write Review
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Reviews List */}
            {reviews.length === 0 ? (
                <Card>
                    <CardContent className="p-12 text-center">
                        <MessageSquare className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                        <h3 className="mb-2 text-lg font-medium text-gray-900">No reviews yet</h3>
                        <p className="mb-4 text-gray-500">Be the first to share your experience with this service.</p>
                        {canCreateReview && (
                            <Button onClick={() => setShowCreateForm(true)} className="flex items-center gap-2">
                                <Plus className="h-4 w-4" />
                                Write First Review
                            </Button>
                        )}
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-4">
                    {reviews.map((review) => (
                        <ReviewCard
                            key={review.id}
                            review={review}
                            canEdit={canEditReview?.(review) || false}
                            canDelete={canDeleteReview?.(review) || false}
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />
                    ))}
                </div>
            )}

            {/* Create Review Form */}
            {showCreateForm && bookingId && onSubmitReview && (
                <div className="border-t pt-6">
                    <ReviewForm
                        bookingId={bookingId}
                        onSubmit={onSubmitReview}
                        onCancel={() => {
                            setShowCreateForm(false);
                            onCancelReview?.();
                        }}
                        isLoading={isSubmittingReview}
                    />
                </div>
            )}
        </div>
    );
}
