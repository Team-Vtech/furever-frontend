import { Card } from "@furever/ui/components/card";
import { Progress } from "@furever/ui/components/progress";
import { ReviewStats } from "../types/review.types";
import { StarRating } from "./StarRating";

interface OverallRatingCardProps {
    stats: ReviewStats;
}

export function OverallRatingCard({ stats }: OverallRatingCardProps) {
    const getProgressValue = (count: number): number => {
        return stats.totalReviews > 0 ? (count / stats.totalReviews) * 100 : 0;
    };

    return (
        <Card className="border border-gray-200 bg-white p-12 shadow-sm">
            <div className="space-y-6">
                <h3 className="text-xl font-medium text-gray-900">Overall Rating</h3>

                <div className="flex items-baseline gap-4">
                    <span className="text-5xl font-bold text-purple-500">{stats.overallRating.toFixed(1)}</span>
                    <div className="flex flex-col gap-1">
                        <StarRating rating={stats.overallRating} size="md" />
                        <span className="text-sm text-gray-500">Based on {stats.totalReviews} reviews</span>
                    </div>
                </div>

                <div className="space-y-4">
                    <h4 className="text-lg font-medium text-gray-900">Star Breakdown</h4>

                    <div className="space-y-3">
                        {[5, 4, 3, 2, 1].map((star) => (
                            <div key={star} className="flex items-center gap-4">
                                <span className="w-12 text-sm text-gray-500">{star} Stars</span>
                                <div className="flex-1">
                                    <Progress
                                        value={getProgressValue(stats.starBreakdown[star as keyof typeof stats.starBreakdown])}
                                        className="h-2 bg-gray-200"
                                    />
                                </div>
                                <span className="w-6 text-right text-sm font-medium text-gray-700">
                                    {stats.starBreakdown[star as keyof typeof stats.starBreakdown]}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Card>
    );
}
