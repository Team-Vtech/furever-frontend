import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { ContactClient, ContactFormData } from "../clients/contact.client";

export function useContactMutation() {
    return useMutation({
        mutationFn: (data: ContactFormData) => ContactClient.submitContactForm(data),
        onSuccess: (response) => {
            toast.success(response.data.message || "Thank you for contacting us! We'll get back to you soon.");
        },
        onError: (error: any) => {
            const message = error?.response?.data?.message || "Failed to send message. Please try again.";
            toast.error(message);
        },
    });
}
