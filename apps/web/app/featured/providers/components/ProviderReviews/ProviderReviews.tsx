"use client";

import { Star } from "lucide-react";

interface Review {
    id: number;
    name: string;
    date: string;
    rating: number;
    text: string;
}

interface ProviderReviewsProps {
    reviews?: Review[];
}

export function ProviderReviews({ reviews }: ProviderReviewsProps) {
    // Mock reviews data - in the future this could come from props or an API
    const mockReviews: Review[] = reviews || [
        {
            id: 1,
            name: "Emily R.",
            date: "May 15, 2024",
            rating: 5,
            text: "Absolutely love Pawsome Pet Grooming! My terrier, Max, always comes back looking fantastic and smelling fresh. The staff are so gentle and truly care for the animals. Highly recommend their full groom service!",
        },
        {
            id: 2,
            name: "David S.",
            date: "April 28, 2024",
            rating: 5,
            text: "Great service overall. My cat, Luna, is usually very nervous but she seemed calm after her grooming. The prices are reasonable too. Only wish they were open on Wednesdays!",
        },
        {
            id: 3,
            name: "Sarah L.",
            date: "April 10, 2024",
            rating: 5,
            text: "My little poodle, Gigi, loves her spa days here! The blueberry facial is a fantastic add-on. The groomers always listen to my preferences and provide excellent cuts. Best groomer in town!",
        },
    ];

    return (
        <div className="mb-12">
            <h2 className="mb-8 text-3xl font-bold text-gray-900">Customer Reviews</h2>
            <div className="space-y-6">
                {mockReviews.map((review) => (
                    <div key={review.id} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                        <div className="flex items-start space-x-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200">
                                <span className="text-sm font-medium text-gray-600">{review.name.charAt(0)}</span>
                            </div>
                            <div className="flex-1">
                                <div className="mb-2 flex items-center space-x-2">
                                    <h4 className="font-semibold text-gray-900">{review.name}</h4>
                                    <span className="text-sm text-gray-500">{review.date}</span>
                                </div>
                                <div className="mb-3 flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`h-4 w-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                                        />
                                    ))}
                                </div>
                                <p className="text-gray-700">{review.text}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
