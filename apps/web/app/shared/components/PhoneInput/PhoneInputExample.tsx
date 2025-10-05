/**
 * PhoneInput Component Usage Example (Web App)
 * 
 * This example demonstrates how to use the controlled PhoneInput component
 * in the web app following the complete pattern with labels and error handling.
 */

"use client";

import { PhoneInput } from "@/app/shared/components/PhoneInput/PhoneInput";
import { Button } from "@furever/ui/components/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Schema for form validation
const contactFormSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    phoneNumber: z.string().min(1, "Phone number is required"),
    emergencyContact: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export function PhoneInputExample() {
    const { control, handleSubmit, formState: { errors } } = useForm<ContactFormData>({
        resolver: zodResolver(contactFormSchema),
        defaultValues: {
            name: "",
            phoneNumber: "",
            emergencyContact: "",
        },
    });

    const onSubmit = (data: ContactFormData) => {
        console.log("Form data:", data);
        // Handle form submission
    };

    return (
        <div className="max-w-md p-6 border rounded-lg">
            <h3 className="text-lg font-medium mb-4">Phone Input Example (Web)</h3>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Primary Phone Number */}
                <PhoneInput
                    control={control}
                    name="phoneNumber"
                    label="Phone Number"
                    placeholder="Enter your phone number"
                    description="We'll use this to contact you about bookings"
                    rules={{ required: "Phone number is required" }}
                />
                
                {/* Emergency Contact (Optional) */}
                <PhoneInput
                    control={control}
                    name="emergencyContact"
                    label="Emergency Contact"
                    placeholder="Enter emergency contact number"
                    description="Optional emergency contact for pet care"
                    optional
                    iconProps={{
                        name: "phone",
                        size: 16,
                        color: "gray",
                        position: "left"
                    }}
                />
                
                <Button type="submit" className="w-full">
                    Save Contact Information
                </Button>
            </form>
        </div>
    );
}