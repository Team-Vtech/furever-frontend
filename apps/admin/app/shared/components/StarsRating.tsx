import { Star } from "lucide-react";
import React from "react";

interface StarsRatingProps {
    rating: number;
    max?: number;
    className?: string;
}

export const StarsRating: React.FC<StarsRatingProps> = ({ rating, max = 5, className }) => {
    return (
        <div className={`flex items-center gap-1 ${className ?? ""}`}>
            {Array.from({ length: max }).map((_, i) => (
                <Star
                    key={i}
                    size={16}
                    className={i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                    fill={i < rating ? "currentColor" : "none"}
                />
            ))}
        </div>
    );
};
