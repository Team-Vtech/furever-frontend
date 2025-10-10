import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { RegisterFormValues } from "@/app/(routes)/api/auth/register/register.schema";
import { AuthClient } from "../clients/auth.client";

export function useRegisterMutation() {
    return useMutation({
        mutationFn: (data: RegisterFormValues) => AuthClient.register(data),
        onSuccess: (data) => {
            toast.success("Account created successfully! Please check your email for verification.");
        },
        onError: (error: any) => {
            const message = error?.response?.data?.message || "Failed to create account. Please try again.";
            toast.error(message);
        },
    });
}