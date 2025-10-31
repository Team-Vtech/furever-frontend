import { StarRating } from "@/app/featured/reviews/components/StarRating";
import { PageLayout } from "@/app/shared/components/PageLayout/PageLayout";
import { server } from "@/app/shared/utils/http.server.utils";
import { JsonResponse, ReviewBooking } from "@furever/types";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params;
    const review = await getReview(id);

    if (!review?.data?.data) {
        return {
            title: "Review Not Found",
            description: "The requested review could not be found",
        };
    }

    return {
        title: `Review #${review.data.data.id}`,
        description: `Rating ${review.data.data.rating} for booking #${review.data.data.booking.id}`,
    };
}

interface ReviewViewPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function ReviewViewPage({ params }: ReviewViewPageProps) {
    const { id } = await params;
    if (!id) {
        return notFound();
    }

    const review = await getReview(id);
    const reviewData = review?.data?.data;
    if (!reviewData) {
        return notFound();
    }

    const booking = reviewData.booking;
    const user = reviewData.user;
    const provider = booking.provider;
    const service = booking.service;

    return (
        <PageLayout title={`Review #${reviewData.id}`} breadcrumbs={[{ label: "Reviews", href: "/reviews" }, { label: `View #${reviewData.id}` }]}>
            <div className="grid grid-cols-1 gap-6">
                <div className="rounded-md border p-4">
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <div className="text-muted-foreground text-sm">Rating</div>
                            <StarRating rating={reviewData.rating} />
                        </div>
                        <div className="text-muted-foreground text-right text-sm">
                            Reviewed at: {new Date(reviewData.reviewed_at || reviewData.created_at).toLocaleString()}
                        </div>
                    </div>
                    <div className="mt-4">
                        <div className="text-muted-foreground text-sm">Comment</div>
                        <p className="mt-1 whitespace-pre-wrap">{reviewData.comment}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="rounded-md border p-4">
                        <div className="text-muted-foreground mb-2 text-sm">Booking</div>
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="font-medium">Booking #{booking.id}</div>
                                <div className="text-muted-foreground text-sm">{booking.booking_date}</div>
                            </div>
                            <Link className="text-primary underline" href={`/bookings/${booking.id}/view`}>
                                View booking
                            </Link>
                        </div>
                    </div>

                    <div className="rounded-md border p-4">
                        <div className="text-muted-foreground mb-2 text-sm">Customer</div>
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="font-medium">{user.name}</div>
                                <div className="text-muted-foreground text-sm">{user.email}</div>
                            </div>
                            <Link className="text-primary underline" href={`/users/${user.id}/edit`}>
                                View user
                            </Link>
                        </div>
                    </div>

                    {provider && (
                        <div className="rounded-md border p-4">
                            <div className="text-muted-foreground mb-2 text-sm">Provider</div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="font-medium">{provider.business_name}</div>
                                    <div className="text-muted-foreground text-sm">{provider.email}</div>
                                </div>
                                <Link className="text-primary underline" href={`/providers/${provider.id}/view`}>
                                    View provider
                                </Link>
                            </div>
                        </div>
                    )}

                    {service && (
                        <div className="rounded-md border p-4">
                            <div className="text-muted-foreground mb-2 text-sm">Service</div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="font-medium">{service.name}</div>
                                    <div className="text-muted-foreground text-sm">Service ID: {service.id}</div>
                                </div>
                                <Link className="text-primary underline" href={`/services/${service.id}/edit`}>
                                    View service
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </PageLayout>
    );
}

async function getReview(id: string) {
    return await (await server()).get<JsonResponse<ReviewBooking>>(`/admin/reviews/${id}`);
}
