import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { ForgotPasswordFormValues } from "../../../(routes)/api/auth/forgot-password/forgot-password.schema";
import { ChangePasswordFormValues } from "../../../(routes)/api/settings/password/password.schema";
import { PasswordClient } from "../clients/password.client";

export function useChangePasswordMutation() {
    return useMutation({
        mutationFn: (data: ChangePasswordFormValues) => PasswordClient.changePassword(data),
        onSuccess: (data) => {
            toast.success("Password changed successfully");
        },
        onError: (error: any) => {
            const message = error?.response?.data?.message || "Failed to change password";
            toast.error(message);
        },
    });
}

export function useForgotPasswordMutation() {
    return useMutation({
        mutationFn: (data: ForgotPasswordFormValues) => PasswordClient.forgotPassword(data),
        onSuccess: () => {
            toast.success("Password reset email sent successfully");
        },
        onError: (error: any) => {
            const message = error?.response?.data?.message || "Failed to send password reset email";
            toast.error(message);
        },
    });
}
