import { Metadata } from "next";
import { MainLayout } from "../../shared/components/MainLayout";

export const metadata: Metadata = {
    title: "Terms & Conditions - Furever",
    description: "Read our terms and conditions for using Furever pet care services.",
};

export default function TermsConditionsPage() {
    return (
        <MainLayout>
            <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-4xl">
                    <h1 className="mb-8 text-4xl font-bold text-gray-900">Terms & Conditions</h1>

                    <div className="prose prose-lg max-w-none">
                        <p className="mb-8 text-lg text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>

                        <section className="mb-8">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-900">1. Acceptance of Terms</h2>
                            <div className="space-y-4 text-gray-700">
                                <p>
                                    By accessing and using Furever ("the Service"), you accept and agree to be bound by the terms and provision of
                                    this agreement. If you do not agree to abide by the above, please do not use this service.
                                </p>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-900">2. Description of Service</h2>
                            <div className="space-y-4 text-gray-700">
                                <p>
                                    Furever is a platform that connects pet parents with qualified pet care service providers. Our services include
                                    but are not limited to:
                                </p>
                                <ul className="list-disc space-y-2 pl-6">
                                    <li>Pet walking and exercise services</li>
                                    <li>Pet sitting and boarding</li>
                                    <li>Pet grooming and spa services</li>
                                    <li>Pet training and behavioral services</li>
                                    <li>Pet transportation services</li>
                                    <li>Emergency pet care services</li>
                                </ul>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-900">3. User Accounts</h2>
                            <div className="space-y-4 text-gray-700">
                                <h3 className="mb-3 mt-6 text-xl font-medium text-gray-900">Account Registration</h3>
                                <p>
                                    To use our services, you must create an account and provide accurate, complete, and current information. You are
                                    responsible for maintaining the confidentiality of your account credentials.
                                </p>

                                <h3 className="mb-3 mt-6 text-xl font-medium text-gray-900">Account Responsibilities</h3>
                                <ul className="list-disc space-y-2 pl-6">
                                    <li>Provide accurate and up-to-date information</li>
                                    <li>Maintain the security of your password</li>
                                    <li>Notify us immediately of any unauthorized use</li>
                                    <li>Be responsible for all activities under your account</li>
                                </ul>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-900">4. Service Provider Requirements</h2>
                            <div className="space-y-4 text-gray-700">
                                <p>Service providers must meet the following requirements:</p>
                                <ul className="list-disc space-y-2 pl-6">
                                    <li>Pass background checks and verification processes</li>
                                    <li>Provide proof of insurance and bonding</li>
                                    <li>Complete required training and certifications</li>
                                    <li>Maintain professional standards and conduct</li>
                                    <li>Comply with all local laws and regulations</li>
                                </ul>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-900">5. Pet Parent Responsibilities</h2>
                            <div className="space-y-4 text-gray-700">
                                <p>Pet parents are responsible for:</p>
                                <ul className="list-disc space-y-2 pl-6">
                                    <li>Providing accurate information about their pets</li>
                                    <li>Ensuring pets are up-to-date on vaccinations</li>
                                    <li>Disclosing any behavioral issues or special needs</li>
                                    <li>Providing necessary supplies and equipment</li>
                                    <li>Being available for emergency contact</li>
                                </ul>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-900">6. Payment Terms</h2>
                            <div className="space-y-4 text-gray-700">
                                <h3 className="mb-3 mt-6 text-xl font-medium text-gray-900">Payment Processing</h3>
                                <p>
                                    All payments are processed securely through our platform. We accept major credit cards, debit cards, and digital
                                    payment methods.
                                </p>

                                <h3 className="mb-3 mt-6 text-xl font-medium text-gray-900">Service Fees</h3>
                                <p>
                                    Furever charges a service fee for facilitating connections between pet parents and service providers. This fee is
                                    clearly displayed before booking confirmation.
                                </p>

                                <h3 className="mb-3 mt-6 text-xl font-medium text-gray-900">Refunds</h3>
                                <p>Refund policies are outlined in our separate Cancellation & Refund Policy document.</p>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-900">7. Limitation of Liability</h2>
                            <div className="space-y-4 text-gray-700">
                                <p>
                                    Furever acts as an intermediary platform connecting pet parents with service providers. We are not directly
                                    responsible for the services provided by third-party providers.
                                </p>
                                <ul className="list-disc space-y-2 pl-6">
                                    <li>We do not guarantee the quality or outcome of services</li>
                                    <li>Service providers are independent contractors</li>
                                    <li>Pet parents use services at their own risk</li>
                                    <li>Our liability is limited to the service fees paid</li>
                                </ul>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-900">8. Prohibited Activities</h2>
                            <div className="space-y-4 text-gray-700">
                                <p>Users are prohibited from:</p>
                                <ul className="list-disc space-y-2 pl-6">
                                    <li>Providing false or misleading information</li>
                                    <li>Circumventing our payment system</li>
                                    <li>Harassing or abusing other users</li>
                                    <li>Using the service for illegal activities</li>
                                    <li>Violating any applicable laws or regulations</li>
                                    <li>Attempting to gain unauthorized access to our systems</li>
                                </ul>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-900">9. Privacy Policy</h2>
                            <div className="space-y-4 text-gray-700">
                                <p>
                                    Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Service, to
                                    understand our practices.
                                </p>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-900">10. Termination</h2>
                            <div className="space-y-4 text-gray-700">
                                <p>
                                    We may terminate or suspend your account immediately, without prior notice or liability, for any reason
                                    whatsoever, including without limitation if you breach the Terms.
                                </p>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-900">11. Changes to Terms</h2>
                            <div className="space-y-4 text-gray-700">
                                <p>
                                    We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is
                                    material, we will try to provide at least 30 days notice prior to any new terms taking effect.
                                </p>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
