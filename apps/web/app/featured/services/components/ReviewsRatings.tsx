import { Button } from "@furever/ui/components/button";
import { Star, StarHalf } from "lucide-react";
import Image from "next/image";

interface Review {
    id: string;
    petName: string;
    petBreed: string;
    rating: number;
    comment: string;
    avatar: string;
}

export function ReviewsRatings() {
    const reviews: Review[] = [
        {
            id: "1",
            petName: "Buddy",
            petBreed: "Golden Retriever",
            rating: 5,
            comment: "Buddy always comes back looking fantastic! The staff is so gentle and friendly. Highly recommend!",
            avatar: "/provider-login-image-38aca3.png",
        },
        {
            id: "2",
            petName: "Daisy",
            petBreed: "Poodle",
            rating: 5,
            comment: "Daisy loves her spa days here. Her fur is always so soft and her haircut is perfect every time.",
            avatar: "/provider-login-image-38aca3.png",
        },
        {
            id: "3",
            petName: "Max",
            petBreed: "Beagle",
            rating: 4,
            comment: "Great service, Max looked very happy and clean. A bit pricey but worth it for the quality.",
            avatar: "/provider-login-image-38aca3.png",
        },
    ];

    const renderStars = (rating: number) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<Star key={i} className="h-4 w-4 fill-purple-600 text-purple-600" />);
        }

        if (hasHalfStar) {
            stars.push(<StarHalf key="half" className="h-4 w-4 fill-purple-600 text-purple-600" />);
        }

        const remainingStars = 5 - Math.ceil(rating);
        for (let i = 0; i < remainingStars; i++) {
            stars.push(<Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />);
        }

        return stars;
    };

    return (
        <div className="border-t border-gray-100 bg-white">
            <div className="p-6">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-900">Reviews & Ratings</h2>
                </div>

                {/* Overall Rating */}
                <div className="mb-6 flex items-center space-x-4">
                    <Star className="h-5 w-5 fill-purple-600 text-purple-600" />
                    <span className="text-lg font-bold text-gray-900">4.8</span>
                    <span className="text-sm text-gray-500">(125 Reviews)</span>
                </div>

                {/* Review Cards */}
                <div className="mb-6 space-y-4">
                    {reviews.map((review) => (
                        <div key={review.id} className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
                            {/* Reviewer Info */}
                            <div className="mb-3 flex items-center space-x-3">
                                <div className="relative flex h-10 w-10 items-center justify-center rounded-full border-2 border-orange-300 bg-orange-100">
                                    <Image src={review.avatar} alt={review.petName} className="rounded-full object-cover" fill />
                                </div>
                                <span className="font-semibold text-gray-900">
                                    {review.petName} ({review.petBreed})
                                </span>
                            </div>

                            {/* Review Text */}
                            <p className="mb-3 text-sm leading-relaxed text-gray-800">{review.comment}</p>

                            {/* Rating Stars */}
                            <div className="flex space-x-1">{renderStars(review.rating)}</div>
                        </div>
                    ))}
                </div>

                {/* See All Reviews Button */}
                <Button variant="outline" className="w-full border-purple-600 text-purple-600 hover:bg-purple-50">
                    See All Reviews
                </Button>
            </div>
        </div>
    );
}
