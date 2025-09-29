import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ReviewsClient } from "../clients/reviewsClient";

export function useUpdateReviewMutation() {
    const queryClient = useQueryClient();
    const { mutateAsync: updateReview, isPending: isUpdating } = useMutation({
        mutationFn: ReviewsClient.updateReview,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["booking-reviews"] });
        },
    });

    return { updateReview, isUpdating };
}
