import { client } from "@/app/shared/utils/http.client.utils";
import { Contact, JsonResponse, PaginatedJsonResponse } from "@furever/types";
import { ENDPOINTS } from "../constants";

export const ContactsClient = {
    async getContacts({ queryKey }: { queryKey: string[] }) {
        const response = await client().get<
            PaginatedJsonResponse<{
                data: Contact[];
            }>
        >(ENDPOINTS.getContacts.url, {
            params: new URLSearchParams(queryKey[1]),
        });
        return response.data;
    },

    async getContact(id: string) {
        const response = await client().get<JsonResponse<Contact>>(`${ENDPOINTS.getContact.url}/${id}`);
        return response.data;
    },

    async markAsRead(id: string) {
        const response = await client().patch<JsonResponse<Contact>>(`${ENDPOINTS.markAsRead.url}/${id}/mark-read`);
        return response.data;
    },

    async markAsUnread(id: string) {
        const response = await client().patch<JsonResponse<Contact>>(`${ENDPOINTS.markAsUnread.url}/${id}/mark-unread`);
        return response.data;
    },
};
