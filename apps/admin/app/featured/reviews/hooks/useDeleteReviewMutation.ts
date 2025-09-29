import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ReviewsClient } from "../clients/reviewsClient";

export function useDeleteReviewMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ReviewsClient.deleteReview,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["booking-reviews"] });
        },
    });
}
