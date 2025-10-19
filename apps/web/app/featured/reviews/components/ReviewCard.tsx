"use client";

import { Review } from "@furever/types";
import { Avatar, AvatarFallback, AvatarImage } from "@furever/ui/components/avatar";
import { Badge } from "@furever/ui/components/badge";
import { Button } from "@furever/ui/components/button";
import { Card, CardContent, CardHeader } from "@furever/ui/components/card";
import { format } from "date-fns";
import { Calendar, Edit, Star, Trash2 } from "lucide-react";
import { useState } from "react";

interface ReviewCardProps {
    review: Review;
    canEdit?: boolean;
    canDelete?: boolean;
    onEdit?: (review: Review) => void;
    onDelete?: (reviewId: number) => void;
}

export function ReviewCard({ review, canEdit = false, canDelete = false, onEdit, onDelete }: ReviewCardProps) {
    const [isDeleting, setIsDeleting] = useState(false);

    const formatDate = (dateStr: string) => {
        return format(new Date(dateStr), "MMM d, yyyy 'at' h:mm a");
    };

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star key={i} className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
        ));
    };

    const handleDelete = async () => {
        if (onDelete) {
            setIsDeleting(true);
            try {
                await onDelete(review.id);
            } finally {
                setIsDeleting(false);
            }
        }
    };

    return (
        <Card className="transition-all duration-200 hover:shadow-md">
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                            <AvatarImage
                                src={
                                    review.user.email
                                        ? `https://ui-avatars.com/api/?name=${encodeURIComponent(review.user.name)}&background=random`
                                        : undefined
                                }
                                alt={review.user.name}
                            />
                            <AvatarFallback className="bg-purple-100 text-purple-600">{review.user.name.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                            <h4 className="font-semibold text-gray-900">{review.user.name}</h4>
                            <p className="text-sm text-gray-500">{review.user.email}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                            {review.booking.status}
                        </Badge>
                        {(canEdit || canDelete) && (
                            <div className="flex items-center gap-1">
                                {canEdit && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => onEdit?.(review)}
                                        className="h-8 w-8 p-0 text-gray-400 hover:text-blue-600"
                                    >
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                )}
                                {canDelete && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={handleDelete}
                                        disabled={isDeleting}
                                        className="h-8 w-8 p-0 text-gray-400 hover:text-red-600"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </CardHeader>

            <CardContent className="pt-0">
                <div className="space-y-3">
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">{renderStars(review.rating)}</div>
                        <span className="text-sm font-medium text-gray-700">{review.rating}/5</span>
                    </div>

                    {review.comment && <p className="text-gray-700">{review.comment}</p>}

                    <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>Reviewed {formatDate(review.reviewed_at)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>Booking: {format(new Date(review.booking.booking_date), "MMM d, yyyy")}</span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
