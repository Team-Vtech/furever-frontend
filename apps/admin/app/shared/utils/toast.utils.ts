"use client";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const toastUtils = {
    success: {
        /** Show success toast for create operations */
        create: (entityName: string, message?: string) => toast.success(message || `${entityName} created successfully!`),
        /** Show success toast for update operations */
        update: (entityName: string, message?: string) => toast.success(message || `${entityName} updated successfully!`),
        /** Show success toast for delete operations */
        delete: (entityName: string, message?: string) => toast.success(message || `${entityName} deleted successfully!`),
        /** Show generic success toast */
        generic: (message: string) => toast.success(message),
    },
    error: {
        /** Show error toast for create operations */
        create: (entityName: string, error?: unknown) => {
            const message = getErrorMessage(error) || `Failed to create ${entityName.toLowerCase()}. Please try again.`;
            toast.error(message);
        },
        /** Show error toast for update operations */
        update: (entityName: string, error?: unknown) => {
            const message = getErrorMessage(error) || `Failed to update ${entityName.toLowerCase()}. Please try again.`;
            toast.error(message);
        },
        /** Show error toast for delete operations */
        delete: (entityName: string, error?: unknown) => {
            const message = getErrorMessage(error) || `Failed to delete ${entityName.toLowerCase()}. Please try again.`;
            toast.error(message);
        },
        /** Show generic error toast */
        generic: (message: string) => toast.error(message),
        /** Extract error message from error object and show toast */
        fromError: (error: unknown) => {
            const message = getErrorMessage(error) || "An unexpected error occurred";
            toast.error(message);
        },
    },
};

/**
 * Extract error message from various error types
 * @param error - Error object, string, or unknown type
 * @returns Extracted error message or null
 */
function getErrorMessage(error: unknown): string | null {
    if (!error) return null;

    // Handle Axios errors
    if (error instanceof AxiosError) {
        const response = error.response;
        if (response?.data?.message) {
            return response.data.message;
        }
        if (response?.data?.error) {
            return response.data.error;
        }
        return error.message;
    }

    // Handle standard errors
    if (error instanceof Error) {
        return error.message;
    }

    // Handle string errors
    if (typeof error === "string") {
        return error;
    }

    return null;
}
