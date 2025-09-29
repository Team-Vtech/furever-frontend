import { Service } from "@furever/types";
import { Button } from "@furever/ui/components/button";

type BookingFooterProps = {
    service: Service;
};

export function BookingFooter({ service }: BookingFooterProps) {
    return (
        <div className="border-t border-gray-200 bg-white shadow-lg lg:border-0 lg:border-t-0 lg:bg-transparent lg:shadow-none">
            <div className="px-4 py-4 lg:px-0 lg:py-0">
                {/* Desktop Sidebar Layout */}
                <div className="hidden space-y-6 lg:block">
                    {/* Price Summary */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900">Book this service</h3>

                        {/* Service Duration */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Duration</label>
                            <select className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-purple-500 focus:ring-2 focus:ring-purple-500">
                                <option>1 hour - ₹{service?.price || 0}</option>
                                <option>2 hours - ₹{service?.price ? Number(service.price) * 2 : 0}</option>
                                <option>3 hours - ₹{service?.price ? Number(service.price) * 3 : 0}</option>
                            </select>
                        </div>

                        {/* Date Selection */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Select Date</label>
                            <input
                                type="date"
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-purple-500 focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        {/* Time Selection */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Select Time</label>
                            <select className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-purple-500 focus:ring-2 focus:ring-purple-500">
                                <option>9:00 AM</option>
                                <option>10:00 AM</option>
                                <option>11:00 AM</option>
                                <option>2:00 PM</option>
                                <option>3:00 PM</option>
                            </select>
                        </div>
                    </div>

                    {/* Price Breakdown */}
                    <div className="space-y-2 border-t border-gray-200 pt-4">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Service (2 hours)</span>
                            <span className="text-gray-900">$75.00</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Platform fee</span>
                            <span className="text-gray-900">$3.75</span>
                        </div>
                        <div className="flex justify-between border-t border-gray-200 pt-2">
                            <span className="font-semibold text-gray-900">Total</span>
                            <span className="font-semibold text-gray-900">$78.75</span>
                        </div>
                    </div>

                    {/* Book Now Button */}
                    <Button size="lg" className="w-full rounded-lg bg-purple-600 px-8 py-3 font-medium text-white shadow-md hover:bg-purple-700">
                        Book Now
                    </Button>

                    {/* Trust Indicators */}
                    <div className="space-y-2 text-center">
                        <p className="text-xs text-gray-500">✓ Verified provider</p>
                        <p className="text-xs text-gray-500">✓ Instant booking</p>
                        <p className="text-xs text-gray-500">✓ 24/7 support</p>
                    </div>
                </div>

                {/* Mobile Footer Layout */}
                <div className="flex items-center justify-between lg:hidden">
                    {/* Total Price */}
                    <div>
                        <p className="text-sm text-gray-500">Total Price (2 hours)</p>
                        <p className="text-xl font-bold text-gray-900">$78.75</p>
                    </div>

                    {/* Book Now Button */}
                    <Button size="lg" className="rounded-lg bg-purple-600 px-8 py-3 font-medium text-white shadow-md hover:bg-purple-700">
                        Book Now
                    </Button>
                </div>
            </div>
        </div>
    );
}
