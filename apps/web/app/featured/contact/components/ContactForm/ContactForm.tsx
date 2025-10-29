"use client";

import { PhoneInput } from "@/app/shared/components/PhoneInput/PhoneInput";
import { TextAreaInput } from "@/app/shared/components/TextAreaInput/TextAreaInput";
import { TextInput } from "@/app/shared/components/TextInput/TextInput";
import { Button } from "@furever/ui/components/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@furever/ui/components/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useContactMutation } from "../../hooks/use-contact.hooks";

// Contact form validation schema
const contactFormSchema = z.object({
    name: z.string().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
    email: z.string().email("Please enter a valid email address"),
    phone: z.string().optional(),
    subject: z.string().min(1, "Subject is required").max(200, "Subject must be less than 200 characters"),
    message: z.string().min(10, "Message must be at least 10 characters").max(1000, "Message must be less than 1000 characters"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const defaultValues: ContactFormValues = {
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
};

export function ContactForm() {
    const contactMutation = useContactMutation();

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ContactFormValues>({
        resolver: zodResolver(contactFormSchema),
        defaultValues,
    });

    const onSubmit = async (data: ContactFormValues) => {
        try {
            await contactMutation.mutateAsync(data);
            reset();
        } catch (error) {
            console.error("Contact form error:", error);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
                <CardDescription>Fill out the form below and we'll get back to you within 24 hours.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <TextInput control={control} name="name" label="Full Name" placeholder="Enter your full name" required />
                        <TextInput control={control} name="email" type="email" label="Email Address" placeholder="Enter your email" required />
                    </div>

                    <PhoneInput control={control} name="phone" label="Phone Number" placeholder="Enter your phone number (optional)" />

                    <TextInput control={control} name="subject" label="Subject" placeholder="What is this about?" required />

                    <TextAreaInput control={control} name="message" label="Message" placeholder="Tell us how we can help you..." rows={6} required />

                    <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={contactMutation.isPending}>
                        {contactMutation.isPending ? "Sending..." : "Send Message"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
