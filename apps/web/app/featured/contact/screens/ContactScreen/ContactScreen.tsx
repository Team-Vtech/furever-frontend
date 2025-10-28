"use client";

import { ContactForm } from "../../components/ContactForm/ContactForm";
import { ContactInfo } from "../../components/ContactInfo/ContactInfo";
import { FAQ } from "../../components/FAQ/FAQ";

export function ContactScreen() {
    return (
        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
                {/* Header */}
                <div className="mb-12 text-center">
                    <h1 className="mb-4 text-4xl font-bold text-gray-900">Contact Us</h1>
                    <p className="mx-auto max-w-2xl text-lg text-gray-600">
                        Have questions about our pet care services? We're here to help! Send us a message and we'll get back to you as soon as
                        possible.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Contact Information */}
                    <div className="lg:col-span-1">
                        <ContactInfo />
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <ContactForm />
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="mt-16">
                    <FAQ />
                </div>
            </div>
        </div>
    );
}
