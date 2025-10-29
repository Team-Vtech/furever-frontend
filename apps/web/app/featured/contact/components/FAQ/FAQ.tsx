import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@furever/ui/components/accordion";
import { HelpCircle } from "lucide-react";

const faqItems = [
    {
        question: "How quickly can I get pet care?",
        answer: "Most services can be booked same-day or within 24 hours, depending on provider availability. Emergency services are available 24/7.",
    },
    {
        question: "Are your providers insured?",
        answer: "Yes, all our service providers are fully insured and bonded. We also conduct thorough background checks before onboarding.",
    },
    {
        question: "What if I need to cancel?",
        answer: "You can cancel up to 24 hours before your service for a full refund. See our cancellation policy for more details.",
    },
    {
        question: "How do I become a provider?",
        answer: "Visit our provider registration page to start the application process. We'll guide you through verification and onboarding.",
    },
];

export function FAQ() {
    return (
        <div className="grid grid-cols-1 items-center justify-start gap-4 lg:grid-cols-12">
            <div className="flex flex-col items-start justify-start gap-4 lg:col-span-4 lg:items-start lg:justify-start">
                <div className="bg-primary/10 flex items-start gap-2 rounded-full p-2">
                    <HelpCircle className="text-primary h-6 w-6" />
                </div>
                <div className="flex flex-col items-start justify-start gap-2">
                    <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
                    <p className="text-gray-600">
                        Have questions about our pet care services? We're here to help! Send us a message and we'll get back to you as soon as
                        possible.
                    </p>
                </div>
            </div>
            <div className="lg:col-span-8 lg:mx-0">
                <Accordion type="single" collapsible className="space-y-4" orientation="horizontal">
                    {faqItems.map((item, index) => (
                        <AccordionItem key={index} value={`item-${index}`} className="rounded-lg border bg-white px-6">
                            <AccordionTrigger className="text-lg font-semibold text-gray-900 hover:no-underline">{item.question}</AccordionTrigger>
                            <AccordionContent>
                                <p className="text-gray-600">{item.answer}</p>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </div>
    );
}
