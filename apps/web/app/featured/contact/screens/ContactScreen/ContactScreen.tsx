"use client";

import { Mail } from "lucide-react";
import Image from "next/image";
import { ContactForm } from "../../components/ContactForm/ContactForm";
import { FAQ } from "../../components/FAQ/FAQ";

export function ContactScreen() {
    return (
        <div>
            <div className="container mx-auto mt-10">
                <div className="grid grid-cols-1 items-center gap-4 lg:grid-cols-2">
                    <div className="relative col-span-1 h-80 w-full overflow-hidden rounded-xl lg:h-full">
                        <Image src="/images/login.png" alt="Contact Us" fill className="object-cover" />
                        <div className="absolute inset-0 bg-black/50" />
                        <div className="absolute inset-0 flex flex-col items-start justify-center gap-4 px-6 lg:px-10">
                            <div className="bg-primary/10 flex items-center gap-2 rounded-full p-2">
                                <Mail className="h-6 w-6 text-white" />
                            </div>
                            <h1 className="text-3xl font-bold text-white lg:text-4xl">Contact Us</h1>
                            <p className="text-sm text-white lg:text-base">
                                Have questions about our pet care services? We're here to help! Send us a message and we'll get back to you as soon as
                                possible.
                            </p>
                        </div>
                    </div>
                    <div className="mt-10 lg:mt-0">
                        <ContactForm />
                    </div>
                </div>
            </div>
            <div className="p-section mt-16 bg-gray-50">
                <div className="container mx-auto">
                    <FAQ />
                </div>
            </div>
        </div>
    );
}
