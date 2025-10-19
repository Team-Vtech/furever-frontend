"use client";

import { Review } from "@furever/types";
import { Card, CardContent, CardHeader, CardTitle } from "@furever/ui/components/card";
import { format } from "date-fns";
import { Calendar, Star, User } from "lucide-react";

interface FeaturedReviewProps {
    review: Review;
}

export function FeaturedReview({ review }: FeaturedReviewProps) {
    const renderStars = (rating: number) => {
        return [...Array(5)].map((_, i) => (
            <Star key={i} className={`h-5 w-5 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
        ));
    };

    return (
        <Card className="border-yellow-200 bg-gradient-to-r from-yellow-50 to-orange-50">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                    <Star className="h-5 w-5 text-yellow-500" />
                    Featured Review
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {/* User Info and Rating */}
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-yellow-400 to-orange-400">
                                <User className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <p className="font-medium text-gray-900">{review.user.name}</p>
                                <p className="text-sm text-gray-500">{format(new Date(review.created_at), "MMM d, yyyy")}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1">{renderStars(review.rating)}</div>
                    </div>

                    {/* Review Comment */}
                    <div className="rounded-lg border border-yellow-200 bg-white p-4">
                        <p className="leading-relaxed text-gray-800">{review.comment}</p>
                    </div>

                    {/* Review Date */}
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="h-4 w-4" />
                        <span>Reviewed on {format(new Date(review.created_at), "EEEE, MMMM d, yyyy 'at' h:mm a")}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
