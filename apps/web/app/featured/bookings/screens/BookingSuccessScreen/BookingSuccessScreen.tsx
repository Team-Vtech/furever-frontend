"use client";

import { Button } from "@furever/ui/components/button";
import { ArrowRight, Calendar, CheckCircle } from "lucide-react";
import Link from "next/link";
import { MainLayout } from "../../../../shared/components/MainLayout";

export function BookingSuccessScreen() {
    return (
        <MainLayout>
            <div className="min-h-screen bg-gray-50">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
                    <div className="rounded-lg bg-white p-8 text-center shadow-sm">
                        {/* Success Icon */}
                        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                            <CheckCircle className="h-8 w-8 text-green-600" />
                        </div>

                        {/* Success Message */}
                        <h1 className="mb-4 text-3xl font-bold text-gray-900">Booking Confirmed!</h1>
                        <p className="mb-8 text-lg text-gray-600">
                            Your pet service booking has been successfully created. You'll receive a confirmation email shortly.
                        </p>

                        {/* Next Steps */}
                        <div className="mb-8 rounded-lg bg-blue-50 p-6 text-left">
                            <h3 className="mb-4 text-lg font-semibold text-blue-900">What's Next?</h3>
                            <ul className="space-y-2 text-blue-800">
                                <li className="flex items-center">
                                    <CheckCircle className="mr-3 h-4 w-4 text-blue-600" />
                                    Check your email for booking confirmation details
                                </li>
                                <li className="flex items-center">
                                    <CheckCircle className="mr-3 h-4 w-4 text-blue-600" />
                                    The service provider will contact you to confirm the appointment
                                </li>
                                <li className="flex items-center">
                                    <CheckCircle className="mr-3 h-4 w-4 text-blue-600" />
                                    You can view and manage your bookings in your account
                                </li>
                            </ul>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                            <Link href="/bookings">
                                <Button className="w-full bg-purple-600 hover:bg-purple-700 sm:w-auto">
                                    <Calendar className="mr-2 h-4 w-4" />
                                    View My Bookings
                                </Button>
                            </Link>
                            <Link href="/explore">
                                <Button variant="outline" className="w-full sm:w-auto">
                                    Book Another Service
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
