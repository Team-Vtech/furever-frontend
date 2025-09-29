import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ReviewsClient } from "../clients/reviewsClient";

export function useCreateReviewMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ReviewsClient.createReview,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["booking-reviews"] });
        },
    });
}
