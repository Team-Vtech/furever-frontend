"use client";

import { ProviderRegistrationFormValues } from "@/app/(routes)/api/providers/register/register.schema";
import { Certificate, User } from "@furever/types";
import { ProviderRegistrationForm } from "../components/ProviderRegistrationForm/ProviderRegistrationForm";

interface ProviderRegistrationContainerProps {
    user?: User;
    onSubmit: (data: ProviderRegistrationFormValues) => void;
    isLoading?: boolean;
    error?: string;
    certificates: Certificate[];
}

export function ProviderRegistrationContainer({ user, onSubmit, isLoading = false, error, certificates }: ProviderRegistrationContainerProps) {
    return (
        <div className="mx-auto w-full max-w-4xl">
            <div className="mb-8 text-center">
                <h1 className="mb-2 text-3xl font-bold text-gray-900">Become a Pet Care Provider</h1>
                <p className="text-lg text-gray-600">
                    Join our community of trusted pet care professionals and help pet owners find the best care for their furry friends.
                </p>
            </div>

            <div className="rounded-lg bg-white p-8 shadow-lg">
                <ProviderRegistrationForm user={user} onSubmit={onSubmit} isLoading={isLoading} error={error} certificates={certificates} />
            </div>

            <div className="mt-8 text-center text-sm text-gray-500">
                <p>
                    Already have an account?{" "}
                    <a href="/login" className="text-blue-600 hover:underline">
                        Sign in here
                    </a>
                </p>
            </div>
        </div>
    );
}
