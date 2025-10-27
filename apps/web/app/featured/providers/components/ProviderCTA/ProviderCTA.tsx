"use client";

import { Button } from "@furever/ui/components/button";
import { ArrowRight, Heart, Star, Users } from "lucide-react";
import Link from "next/link";

export function ProviderCTA() {
    return (
        <div className="rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 p-8 text-white">
            <div className="mx-auto max-w-4xl">
                <div className="grid items-center gap-8 md:grid-cols-2">
                    <div>
                        <h2 className="mb-4 text-3xl font-bold">Join Our Community of Pet Care Professionals</h2>
                        <p className="mb-6 text-lg text-purple-100">
                            Connect with pet owners who need your services. Build your business, set your own schedule, and make a difference in pets'
                            lives.
                        </p>
                        <div className="flex flex-col gap-4 sm:flex-row">
                            <Button asChild size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                                <Link href="/provider-register">
                                    Become a Provider
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-purple-600">
                                <Link href="/explore">Browse Services</Link>
                            </Button>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="text-center">
                            <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-white/20 p-4">
                                <Users className="h-8 w-8" />
                            </div>
                            <h3 className="text-lg font-semibold">1000+</h3>
                            <p className="text-sm text-purple-100">Active Providers</p>
                        </div>
                        <div className="text-center">
                            <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-white/20 p-4">
                                <Heart className="h-8 w-8" />
                            </div>
                            <h3 className="text-lg font-semibold">5000+</h3>
                            <p className="text-sm text-purple-100">Happy Pets</p>
                        </div>
                        <div className="text-center">
                            <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-white/20 p-4">
                                <Star className="h-8 w-8" />
                            </div>
                            <h3 className="text-lg font-semibold">4.9</h3>
                            <p className="text-sm text-purple-100">Average Rating</p>
                        </div>
                        <div className="text-center">
                            <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-white/20 p-4">
                                <ArrowRight className="h-8 w-8" />
                            </div>
                            <h3 className="text-lg font-semibold">24/7</h3>
                            <p className="text-sm text-purple-100">Support</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
