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
        <div className="container mx-auto w-full">
            <div className="grid items-start gap-8 md:grid-cols-2">
                <div className="h-full rounded-2xl bg-gradient-to-br from-indigo-50 via-fuchsia-50 to-violet-50 p-6 text-left ring-1 ring-indigo-100/60">
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
                        <span>For pet care professionals</span>
                    </div>
                    <h1 className="mb-3 text-3xl font-extrabold leading-tight text-gray-900 sm:text-4xl">
                        Grow your business with
                        <span className="ml-2 bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">Furever</span>
                    </h1>
                    <p className="mb-6 max-w-prose text-base leading-relaxed text-gray-600">
                        Get discovered by pet parents, showcase certifications, and manage bookings — all in one place.
                    </p>

                    <ul className="mb-6 space-y-3 text-sm">
                        <li className="flex items-start gap-3">
                            <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-green-700">✓</span>
                            <span className="text-gray-700">Verified profile with certificates and reviews</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-green-700">✓</span>
                            <span className="text-gray-700">Easy scheduling and messaging</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-green-700">✓</span>
                            <span className="text-gray-700">No upfront costs — start free</span>
                        </li>
                    </ul>

                    <div className="flex flex-wrap items-center gap-3 text-xs">
                        <div className="inline-flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-1.5 text-gray-700 shadow-sm">
                            <span role="img" aria-label="shield">
                                🛡️
                            </span>
                            <span>Trusted by providers nationwide</span>
                        </div>
                        <div className="inline-flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-1.5 text-gray-700 shadow-sm">
                            <span role="img" aria-label="sparkles">
                                ✨
                            </span>
                            <span>Join in minutes</span>
                        </div>
                    </div>
                </div>

                <div className="rounded-lg bg-white p-8 shadow-lg">
                    <ProviderRegistrationForm user={user} onSubmit={onSubmit} isLoading={isLoading} error={error} certificates={certificates} />
                </div>
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
