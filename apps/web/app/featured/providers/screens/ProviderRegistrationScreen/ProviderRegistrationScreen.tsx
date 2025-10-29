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
        <div className="min-h-screen px-4 py-12 sm:px-6 lg:px-8">
            <ProviderRegistrationContainer
                user={session?.user ?? undefined}
                onSubmit={handleSubmit}
                isLoading={providerRegistrationMutation.isPending}
                error={error}
                certificates={certificates}
            />
            {/* Why Furever Section */}
            <section className="mt-16">
                <div className="container mx-auto">
                    <div className="mb-8 text-center">
                        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Why Furever</h2>
                        <p className="mt-2 text-gray-600">We help pet parents connect with trustworthy providers and make caring for pets simple.</p>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-50 text-2xl">
                                <span role="img" aria-label="trust">
                                    🔒
                                </span>
                            </div>
                            <h3 className="mb-1 text-lg font-semibold text-gray-900">Trust & Safety</h3>
                            <p className="text-sm text-gray-600">Robust verification and reviews help ensure safe, reliable pet care experiences.</p>
                        </div>

                        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-50 text-2xl">
                                <span role="img" aria-label="verified">
                                    ⭐
                                </span>
                            </div>
                            <h3 className="mb-1 text-lg font-semibold text-gray-900">Verified Providers</h3>
                            <p className="text-sm text-gray-600">Showcase certifications and credentials so pet parents can book with confidence.</p>
                        </div>

                        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-50 text-2xl">
                                <span role="img" aria-label="seamless">
                                    🐾
                                </span>
                            </div>
                            <h3 className="mb-1 text-lg font-semibold text-gray-900">Seamless Booking</h3>
                            <p className="text-sm text-gray-600">Streamlined profiles, messaging, and scheduling make it easy to get started.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
