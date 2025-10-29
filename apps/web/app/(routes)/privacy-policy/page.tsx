import { Metadata } from "next";
import { MainLayout } from "../../shared/components/MainLayout";

export const metadata: Metadata = {
    title: "Privacy Policy - Furever",
    description: "Learn how Furever protects your privacy and handles your personal information.",
};

export default function PrivacyPolicyPage() {
    return (
        <MainLayout>
            <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-4xl">
                    <h1 className="mb-8 text-4xl font-bold text-gray-900">Privacy Policy</h1>

                    <div className="prose prose-lg max-w-none">
                        <p className="mb-8 text-lg text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>

                        <section className="mb-8">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-900">1. Introduction</h2>
                            <div className="space-y-4 text-gray-700">
                                <p>
                                    Furever ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we
                                    collect, use, disclose, and safeguard your information when you use our pet care service platform.
                                </p>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-900">2. Information We Collect</h2>
                            <div className="space-y-4 text-gray-700">
                                <h3 className="mb-3 mt-6 text-xl font-medium text-gray-900">Personal Information</h3>
                                <p>We collect information you provide directly to us, such as:</p>
                                <ul className="list-disc space-y-2 pl-6">
                                    <li>Name, email address, and phone number</li>
                                    <li>Billing and payment information</li>
                                    <li>Profile information and preferences</li>
                                    <li>Pet information (name, breed, age, medical conditions)</li>
                                    <li>Service requests and booking history</li>
                                    <li>Communications with us and service providers</li>
                                </ul>

                                <h3 className="mb-3 mt-6 text-xl font-medium text-gray-900">Automatically Collected Information</h3>
                                <p>We automatically collect certain information when you use our service:</p>
                                <ul className="list-disc space-y-2 pl-6">
                                    <li>Device information (IP address, browser type, operating system)</li>
                                    <li>Usage data (pages visited, time spent, features used)</li>
                                    <li>Location data (with your permission)</li>
                                    <li>Cookies and similar tracking technologies</li>
                                </ul>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-900">3. How We Use Your Information</h2>
                            <div className="space-y-4 text-gray-700">
                                <p>We use the information we collect to:</p>
                                <ul className="list-disc space-y-2 pl-6">
                                    <li>Provide, maintain, and improve our services</li>
                                    <li>Process transactions and send related information</li>
                                    <li>Connect you with qualified pet care service providers</li>
                                    <li>Send technical notices, updates, and support messages</li>
                                    <li>Respond to your comments and questions</li>
                                    <li>Monitor and analyze usage and trends</li>
                                    <li>Detect, prevent, and address technical issues</li>
                                    <li>Comply with legal obligations</li>
                                </ul>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-900">4. Information Sharing</h2>
                            <div className="space-y-4 text-gray-700">
                                <p>We may share your information in the following circumstances:</p>

                                <h3 className="mb-3 mt-6 text-xl font-medium text-gray-900">Service Providers</h3>
                                <p>
                                    We share necessary information with pet care service providers to facilitate service delivery, including your
                                    contact information and pet details.
                                </p>

                                <h3 className="mb-3 mt-6 text-xl font-medium text-gray-900">Third-Party Service Providers</h3>
                                <p>
                                    We may share information with trusted third parties who assist us in operating our platform, such as payment
                                    processors and analytics providers.
                                </p>

                                <h3 className="mb-3 mt-6 text-xl font-medium text-gray-900">Legal Requirements</h3>
                                <p>
                                    We may disclose information if required by law or to protect our rights, property, or safety, or that of our users
                                    or others.
                                </p>

                                <h3 className="mb-3 mt-6 text-xl font-medium text-gray-900">Business Transfers</h3>
                                <p>
                                    In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that
                                    transaction.
                                </p>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-900">5. Data Security</h2>
                            <div className="space-y-4 text-gray-700">
                                <p>
                                    We implement appropriate technical and organizational measures to protect your personal information against
                                    unauthorized access, alteration, disclosure, or destruction.
                                </p>
                                <ul className="list-disc space-y-2 pl-6">
                                    <li>Encryption of data in transit and at rest</li>
                                    <li>Regular security assessments and updates</li>
                                    <li>Access controls and authentication measures</li>
                                    <li>Employee training on data protection</li>
                                </ul>
                                <p>
                                    However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to
                                    protect your information, we cannot guarantee absolute security.
                                </p>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-900">6. Your Rights and Choices</h2>
                            <div className="space-y-4 text-gray-700">
                                <p>You have the right to:</p>
                                <ul className="list-disc space-y-2 pl-6">
                                    <li>Access and update your personal information</li>
                                    <li>Request deletion of your account and data</li>
                                    <li>Opt out of marketing communications</li>
                                    <li>Request a copy of your data</li>
                                    <li>Correct inaccurate information</li>
                                    <li>Withdraw consent for data processing</li>
                                </ul>

                                <h3 className="mb-3 mt-6 text-xl font-medium text-gray-900">Cookies and Tracking</h3>
                                <p>
                                    You can control cookies through your browser settings. However, disabling cookies may affect the functionality of
                                    our service.
                                </p>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-900">7. Data Retention</h2>
                            <div className="space-y-4 text-gray-700">
                                <p>
                                    We retain your personal information for as long as necessary to provide our services and fulfill the purposes
                                    outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.
                                </p>
                                <ul className="list-disc space-y-2 pl-6">
                                    <li>Account information: Until account deletion</li>
                                    <li>Transaction records: 7 years for tax and legal purposes</li>
                                    <li>Communication logs: 3 years</li>
                                    <li>Analytics data: 2 years</li>
                                </ul>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-900">8. Children's Privacy</h2>
                            <div className="space-y-4 text-gray-700">
                                <p>
                                    Our service is not intended for children under 13 years of age. We do not knowingly collect personal information
                                    from children under 13. If we become aware that we have collected personal information from a child under 13, we
                                    will take steps to delete such information.
                                </p>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-900">9. International Data Transfers</h2>
                            <div className="space-y-4 text-gray-700">
                                <p>
                                    Your information may be transferred to and processed in countries other than your country of residence. We ensure
                                    appropriate safeguards are in place to protect your information in accordance with this Privacy Policy.
                                </p>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-900">10. Changes to This Privacy Policy</h2>
                            <div className="space-y-4 text-gray-700">
                                <p>
                                    We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new
                                    Privacy Policy on this page and updating the "Last updated" date.
                                </p>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
