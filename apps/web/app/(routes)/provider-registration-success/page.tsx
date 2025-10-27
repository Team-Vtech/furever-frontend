import { Button } from "@furever/ui/components/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Registration Successful - Furever",
    description: "Your provider registration has been submitted successfully.",
};

export default function ProviderRegistrationSuccessPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
                    <h2 className="mt-6 text-3xl font-bold text-gray-900">Registration Submitted!</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Thank you for your interest in becoming a pet care provider. Your registration has been submitted successfully.
                    </p>
                </div>

                <div className="rounded-lg bg-white p-6 shadow-lg">
                    <h3 className="mb-4 text-lg font-semibold text-gray-900">What happens next?</h3>
                    <ul className="space-y-3 text-sm text-gray-600">
                        <li className="flex items-start">
                            <div className="mr-3 mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-blue-500"></div>
                            <span>We'll review your application within 2-3 business days</span>
                        </li>
                        <li className="flex items-start">
                            <div className="mr-3 mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-blue-500"></div>
                            <span>You'll receive an email notification about the status</span>
                        </li>
                        <li className="flex items-start">
                            <div className="mr-3 mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-blue-500"></div>
                            <span>Once approved, you can start listing your services</span>
                        </li>
                    </ul>
                </div>

                <div className="space-y-4">
                    <Button asChild className="w-full">
                        <Link href="/">
                            <ArrowRight className="mr-2 h-4 w-4" />
                            Return to Home
                        </Link>
                    </Button>
                    <Button variant="outline" asChild className="w-full">
                        <Link href="/login">Sign In to Your Account</Link>
                    </Button>
                </div>

                <div className="text-center text-sm text-gray-500">
                    <p>
                        Questions? Contact us at{" "}
                        <a href="mailto:support@furever.com" className="text-blue-600 hover:underline">
                            support@furever.com
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
