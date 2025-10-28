import { client } from "@/app/shared/utils/http.client.utils";
import { JsonResponse } from "@furever/types";

const http = client();

export interface ContactFormData {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
}

export const ContactClient = {
    async submitContactForm(data: ContactFormData) {
        return http.post<JsonResponse<{ message: string }>>("/api/contact", data);
    },
};
