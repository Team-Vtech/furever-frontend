"use client";

import { ProviderRegistrationFormValues } from "@/app/(routes)/api/providers/register/register.schema";
import { Certificate } from "@furever/types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ProviderRegistrationContainer } from "../../containers/ProviderRegistrationContainer";
import { useProviderRegistrationMutation } from "../../hooks/use-provider-registration.hooks";

export function ProviderRegistrationScreen({ certificates }: { certificates: Certificate[] }) {
    const [error, setError] = useState("");
    const router = useRouter();
    const { data: session } = useSession();
    const providerRegistrationMutation = useProviderRegistrationMutation();

    const handleSubmit = async (data: ProviderRegistrationFormValues) => {
        setError("");

        try {
            // Parse gallery media object IDs from comma-separated string
            const processedData = {
                ...data,
                gallery_media_object_ids:
                    typeof data.gallery_media_object_ids === "string"
                        ? data.gallery_media_object_ids
                              .split(",")
                              .map((id) => parseInt(id.trim()))
                              .filter((id) => !isNaN(id))
                        : data.gallery_media_object_ids || [],
            };

            await providerRegistrationMutation.mutateAsync(processedData);
            // Success - redirect to success page
            router.push("/provider-registration-success");
        } catch (error: any) {
            console.error("Provider registration error:", error);
            if (error.response?.data?.errors) {
                // Handle validation errors
                const errorMessages = error.response.data.errors.map((err: any) => err.message).join(", ");
                setError(errorMessages);
            } else {
                setError(error.message || "An error occurred while submitting your registration");
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
            <ProviderRegistrationContainer
                user={session?.user ?? undefined}
                onSubmit={handleSubmit}
                isLoading={providerRegistrationMutation.isPending}
                error={error}
                certificates={certificates}
            />
        </div>
    );
}
