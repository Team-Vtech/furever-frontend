import { client } from "@/app/shared/utils/http.client.utils";
import { CreateReviewRequest, JsonResponse, Review, UpdateReviewRequest } from "@furever/types";

export const ReviewsClient = {
    async getBookingReviews(bookingId: string | number) {
        const response = await client().get<JsonResponse<Review[]>>(`/api/bookings/${bookingId}/reviews`);
        return response.data;
    },

    async createReview(bookingId: string | number, data: CreateReviewRequest) {
        const response = await client().post<JsonResponse<Review>>(`/api/bookings/${bookingId}/reviews`, data);
        return response.data;
    },

    async getReview(bookingId: string | number, reviewId: string | number) {
        const response = await client().get<JsonResponse<Review>>(`/api/bookings/${bookingId}/reviews/${reviewId}`);
        return response.data;
    },

    async updateReview(bookingId: string | number, reviewId: string | number, data: UpdateReviewRequest) {
        const response = await client().put<JsonResponse<Review>>(`/api/bookings/${bookingId}/reviews/${reviewId}`, data);
        return response.data;
    },

    async deleteReview(bookingId: string | number, reviewId: string | number) {
        const response = await client().delete<JsonResponse<void>>(`/api/bookings/${bookingId}/reviews/${reviewId}`);
        return response.data;
    },
};
