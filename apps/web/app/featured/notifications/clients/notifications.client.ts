import { client } from "@/app/shared/utils/http.client.utils";
import { JsonResponse, Notification, NotificationResponse, NotificationStats } from "@furever/types";

export const NotificationsClient = {
    async getNotifications(params?: { page?: number; per_page?: number; unread_only?: boolean }) {
        const response = await client().get<JsonResponse<NotificationResponse>>("/api/notifications", {
            params,
        });
        return response.data;
    },

    async getNotificationStats() {
        const response = await client().get<JsonResponse<NotificationStats>>("/api/notifications/stats");
        return response.data;
    },

    async markAllAsRead() {
        const response = await client().patch<JsonResponse<void>>("/api/notifications/mark-all-read");
        return response.data;
    },

    async deleteNotification(id: string) {
        const response = await client().delete<JsonResponse<void>>(`/api/notifications/${id}`);
        return response.data;
    },

    async markAsRead(id: string) {
        const response = await client().patch<JsonResponse<Notification>>(`/api/notifications/${id}/read`);
        return response.data;
    },
};
