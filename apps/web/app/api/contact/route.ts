import { FiveHundredError, ValidationError } from "@/app/shared/utils/error.utils";
import { server } from "@/app/shared/utils/http.server.utils";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Contact form validation schema
const contactSchema = z.object({
    name: z.string().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
    email: z.string().email("Please enter a valid email address"),
    phone: z.string().optional(),
    subject: z.string().min(1, "Subject is required").max(200, "Subject must be less than 200 characters"),
    message: z.string().min(10, "Message must be at least 10 characters").max(1000, "Message must be less than 1000 characters"),
});

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validate the request body
        const validationResult = contactSchema.safeParse(body);

        if (!validationResult.success) {
            return ValidationError(validationResult.error);
        }

        const { name, email, phone, subject, message } = validationResult.data;

        // Forward the request to the backend API
        const response = await (
            await server()
        ).post("/contact", {
            name,
            email,
            phone,
            subject,
            message,
        });

        return NextResponse.json({
            success: true,
            message: "Thank you for contacting us! We'll get back to you soon.",
            data: response.data,
        });
    } catch (error) {
        console.error("Contact API Error:", error);
        return FiveHundredError(error);
    }
}
