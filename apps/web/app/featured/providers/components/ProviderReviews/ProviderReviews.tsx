"use client";

import { format } from "date-fns";
import { Star } from "lucide-react";

interface ProviderReview {
    id: number;
    booking_id: number;
    user_id: number;
    rating: number;
    comment: string;
    reviewed_at: string;
    user: {
        id: number;
        name: string;
        email: string;
    };
    created_at: string;
    updated_at: string;
}

interface ProviderReviewsProps {
    reviews?: ProviderReview[];
}

export function ProviderReviews({ reviews }: ProviderReviewsProps) {
    // Use actual reviews data from provider, fallback to empty array if none
    const displayReviews = reviews || [];

    return (
        <div className="mb-12">
            <h2 className="mb-8 text-3xl font-bold text-gray-900">Customer Reviews</h2>
            {displayReviews.length === 0 ? (
                <div className="rounded-lg border border-gray-200 bg-white p-8 text-center">
                    <p className="text-gray-500">No reviews yet. Be the first to review this provider!</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {displayReviews.map((review) => (
                        <div key={review.id} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                            <div className="flex items-start space-x-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200">
                                    <span className="text-sm font-medium text-gray-600">{review.user.name.charAt(0)}</span>
                                </div>
                                <div className="flex-1">
                                    <div className="mb-2 flex items-center space-x-2">
                                        <h4 className="font-semibold text-gray-900">{review.user.name}</h4>
                                        <span className="text-sm text-gray-500">{format(new Date(review.reviewed_at), "MMM d, yyyy")}</span>
                                    </div>
                                    <div className="mb-3 flex items-center">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`h-4 w-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                                            />
                                        ))}
                                    </div>
                                    <p className="text-gray-700">{review.comment}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
