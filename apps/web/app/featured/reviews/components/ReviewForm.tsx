"use client";

import { CreateReviewRequest, Review, UpdateReviewRequest } from "@furever/types";
import { Button } from "@furever/ui/components/button";
import { Card, CardContent, CardHeader, CardTitle } from "@furever/ui/components/card";
import { Label } from "@furever/ui/components/label";
import { Textarea } from "@furever/ui/components/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send, Star } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const reviewSchema = z.object({
    rating: z.number().min(1, "Rating is required").max(5, "Rating must be between 1 and 5"),
    comment: z.string().min(1, "Comment is required").max(500, "Comment must be less than 500 characters"),
});

type ReviewFormData = z.infer<typeof reviewSchema>;

interface ReviewFormProps {
    bookingId: string | number;
    review?: Review;
    onSubmit: (data: CreateReviewRequest | UpdateReviewRequest) => Promise<void>;
    onCancel?: () => void;
    isLoading?: boolean;
}

export function ReviewForm({ bookingId, review, onSubmit, onCancel, isLoading = false }: ReviewFormProps) {
    const [hoveredRating, setHoveredRating] = useState(0);
    const [selectedRating, setSelectedRating] = useState(review?.rating || 0);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<ReviewFormData>({
        resolver: zodResolver(reviewSchema),
        defaultValues: {
            rating: review?.rating || 0,
            comment: review?.comment || "",
        },
    });

    const watchedComment = watch("comment");

    const handleRatingClick = (rating: number) => {
        setSelectedRating(rating);
        setValue("rating", rating);
    };

    const handleFormSubmit = async (data: ReviewFormData) => {
        await onSubmit(data);
    };

    const renderStars = () => {
        return Array.from({ length: 5 }, (_, i) => {
            const starNumber = i + 1;
            const isActive = starNumber <= (hoveredRating || selectedRating);

            return (
                <button
                    key={i}
                    type="button"
                    className="focus:outline-none"
                    onClick={() => handleRatingClick(starNumber)}
                    onMouseEnter={() => setHoveredRating(starNumber)}
                    onMouseLeave={() => setHoveredRating(0)}
                >
                    <Star
                        className={`h-8 w-8 transition-colors ${
                            isActive ? "fill-yellow-400 text-yellow-400" : "text-gray-300 hover:text-yellow-300"
                        }`}
                    />
                </button>
            );
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-500" />
                    {review ? "Edit Review" : "Write a Review"}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
                    {/* Rating Section */}
                    <div className="space-y-2">
                        <Label htmlFor="rating" className="text-sm font-medium">
                            Rating *
                        </Label>
                        <div className="flex items-center gap-1">
                            {renderStars()}
                            <span className="ml-2 text-sm text-gray-600">{selectedRating > 0 && `${selectedRating}/5`}</span>
                        </div>
                        {errors.rating && <p className="text-sm text-red-600">{errors.rating.message}</p>}
                    </div>

                    {/* Comment Section */}
                    <div className="space-y-2">
                        <Label htmlFor="comment" className="text-sm font-medium">
                            Comment *
                        </Label>
                        <Textarea
                            id="comment"
                            placeholder="Share your experience with this service..."
                            className="min-h-[100px] resize-none"
                            {...register("comment")}
                        />
                        <div className="flex justify-between text-xs text-gray-500">
                            <span>
                                {errors.comment ? <span className="text-red-600">{errors.comment.message}</span> : "Tell us about your experience"}
                            </span>
                            <span>{watchedComment?.length || 0}/500</span>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3">
                        <Button type="submit" disabled={isSubmitting || isLoading} className="flex items-center gap-2">
                            {isSubmitting || isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                            {review ? "Update Review" : "Submit Review"}
                        </Button>

                        {onCancel && (
                            <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting || isLoading}>
                                Cancel
                            </Button>
                        )}
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
