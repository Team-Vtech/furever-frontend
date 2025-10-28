import { Metadata } from "next";
import { MainLayout } from "../../shared/components/MainLayout";

export const metadata: Metadata = {
    title: "Cancellation & Refund Policy - Furever",
    description: "Learn about our cancellation and refund policies for pet care services.",
};

export default function CancellationRefundPage() {
    return (
        <MainLayout>
            <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-4xl">
                    <h1 className="mb-8 text-4xl font-bold text-gray-900">Cancellation & Refund Policy</h1>

                    <div className="prose prose-lg max-w-none">
                        <p className="mb-8 text-lg text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>

                        <section className="mb-8">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-900">Service Cancellation</h2>
                            <div className="space-y-4 text-gray-700">
                                <p>
                                    We understand that plans can change, especially when it comes to your pet's care. Here's our cancellation policy
                                    to ensure fairness for both pet parents and service providers.
                                </p>

                                <h3 className="mb-3 mt-6 text-xl font-medium text-gray-900">Cancellation Timeframes</h3>
                                <ul className="list-disc space-y-2 pl-6">
                                    <li>
                                        <strong>More than 24 hours before service:</strong> Full refund, no cancellation fee
                                    </li>
                                    <li>
                                        <strong>12-24 hours before service:</strong> 50% refund, $10 cancellation fee
                                    </li>
                                    <li>
                                        <strong>Less than 12 hours before service:</strong> No refund, full service charge applies
                                    </li>
                                    <li>
                                        <strong>Emergency cancellations:</strong> Case-by-case basis, contact support immediately
                                    </li>
                                </ul>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-900">Refund Process</h2>
                            <div className="space-y-4 text-gray-700">
                                <p>Refunds are processed according to the original payment method used for the booking.</p>

                                <h3 className="mb-3 mt-6 text-xl font-medium text-gray-900">Refund Timeline</h3>
                                <ul className="list-disc space-y-2 pl-6">
                                    <li>
                                        <strong>Credit/Debit Cards:</strong> 3-5 business days
                                    </li>
                                    <li>
                                        <strong>PayPal:</strong> 1-3 business days
                                    </li>
                                    <li>
                                        <strong>Bank Transfers:</strong> 5-10 business days
                                    </li>
                                </ul>

                                <h3 className="mb-3 mt-6 text-xl font-medium text-gray-900">Refund Conditions</h3>
                                <ul className="list-disc space-y-2 pl-6">
                                    <li>Service provider no-show or late arrival (more than 30 minutes)</li>
                                    <li>Service not performed as described in the booking</li>
                                    <li>Pet safety concerns or inappropriate behavior by service provider</li>
                                    <li>Technical issues preventing service completion</li>
                                </ul>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-900">Provider Cancellations</h2>
                            <div className="space-y-4 text-gray-700">
                                <p>If a service provider cancels your booking, we will:</p>
                                <ul className="list-disc space-y-2 pl-6">
                                    <li>Notify you immediately via email and SMS</li>
                                    <li>Provide a full refund within 24 hours</li>
                                    <li>Help you find an alternative provider if available</li>
                                    <li>Offer priority booking for future services</li>
                                </ul>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-900">Special Circumstances</h2>
                            <div className="space-y-4 text-gray-700">
                                <h3 className="mb-3 mt-6 text-xl font-medium text-gray-900">Weather-Related Cancellations</h3>
                                <p>
                                    For safety reasons, services may be cancelled due to severe weather conditions. In such cases, we offer full
                                    refunds or rescheduling options.
                                </p>

                                <h3 className="mb-3 mt-6 text-xl font-medium text-gray-900">Pet Health Emergencies</h3>
                                <p>
                                    If your pet requires immediate medical attention, please contact us immediately. We will work with you to
                                    reschedule or provide appropriate refunds.
                                </p>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
