import { Card, CardContent, CardHeader, CardTitle } from "@furever/ui/components/card";

export function FAQ() {
    return (
        <>
            <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">How quickly can I get pet care?</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-600">
                            Most services can be booked same-day or within 24 hours, depending on provider availability. Emergency services are
                            available 24/7.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Are your providers insured?</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-600">
                            Yes, all our service providers are fully insured and bonded. We also conduct thorough background checks before onboarding.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">What if I need to cancel?</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-600">
                            You can cancel up to 24 hours before your service for a full refund. See our cancellation policy for more details.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">How do I become a provider?</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-600">
                            Visit our provider registration page to start the application process. We'll guide you through verification and
                            onboarding.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
