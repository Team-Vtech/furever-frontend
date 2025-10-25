"use client";

import { RescheduleBookingRequest, rescheduleBookingRequestSchema } from "@/app/(routes)/api/bookings/reschedule.schema";
import { SelectInput } from "@/app/shared/components/SelectInput/SelectInput";
import { TextAreaInput } from "@/app/shared/components/TextAreaInput/TextAreaInput";
import { TextInput } from "@/app/shared/components/TextInput/TextInput";
import { Booking } from "@furever/types";
import { Button } from "@furever/ui/components/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@furever/ui/components/dialog";
import { Label } from "@furever/ui/components/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Calendar, Clock } from "lucide-react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { WorkingHoursCalendar } from "../../../components/WorkingHoursCalendar";
import { useRescheduleBookingMutation } from "../../../hooks/useBookings";
import { generateTimeSlots, isTimeSlotAvailable } from "../../../utils/time-slots.utils";

interface RescheduleBookingModalProps {
    booking: Booking;
    currentDate: string;
    currentTime: string;
    serviceDuration: number;
    children: React.ReactNode;
}

export function RescheduleBookingModal({ booking, currentDate, currentTime, serviceDuration, children }: RescheduleBookingModalProps) {
    const [open, setOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date(currentDate));
    const provider = useMemo(() => booking.provider, [booking]);
    const {
        handleSubmit,
        formState: { errors, isSubmitting },
        setValue,
        watch,
        control,
        reset,
    } = useForm<RescheduleBookingRequest>({
        resolver: zodResolver(rescheduleBookingRequestSchema),
        defaultValues: {
            booking_date: currentDate,
            booking_time: currentTime,
            reason: "",
        },
    });

    const rescheduleMutation = useRescheduleBookingMutation();

    // Handle calendar date selection
    const handleDateSelect = (date: Date | undefined) => {
        setSelectedDate(date);
        if (date) {
            setValue("booking_date", format(date, "yyyy-MM-dd"));
        } else {
            setValue("booking_date", "");
        }
    };

    // Generate available time slots based on selected date, working hours, and service duration
    const availableTimeSlots = useMemo(() => {
        const dateToUse = selectedDate || (watch("booking_date") ? new Date(watch("booking_date")) : null);

        if (!dateToUse || !provider?.working_hours || !serviceDuration) {
            return [];
        }

        const timeSlots = generateTimeSlots(dateToUse, provider.working_hours, serviceDuration);

        // Filter out past time slots for today
        return timeSlots.filter((slot) => isTimeSlotAvailable(slot.value, dateToUse));
    }, [selectedDate, watch("booking_date"), provider?.working_hours, serviceDuration]);

    // Get minimum date (today)
    const getMinDate = () => {
        const today = new Date();
        return today.toISOString().split("T")[0];
    };

    const onSubmit = async (data: RescheduleBookingRequest) => {
        try {
            await rescheduleMutation.mutateAsync({
                id: booking.id,
                data,
            });

            setOpen(false);
            reset({
                booking_date: currentDate,
                booking_time: currentTime,
                reason: "",
            });
            setSelectedDate(new Date(currentDate));
        } catch (error) {
            // Error handling is done in the mutation
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen} modal={true}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="max-h-[90vh] w-full !max-w-[80%] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center">
                        <Calendar className="mr-2 h-5 w-5" />
                        Reschedule Booking
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Date Selection */}
                    <div className="space-y-4">
                        {/* Calendar Section */}
                        {provider?.working_hours && provider.working_hours.length > 0 ? (
                            <WorkingHoursCalendar
                                workingHours={provider.working_hours}
                                selectedDate={selectedDate}
                                onDateSelect={handleDateSelect}
                                minDate={new Date()}
                                className="w-full border-none p-0 shadow-none"
                            />
                        ) : (
                            <div className="space-y-2">
                                <Label htmlFor="booking_date" className="text-sm font-medium text-gray-700">
                                    Date *
                                </Label>
                                <TextInput name="booking_date" control={control} type="date" min={getMinDate()} className="w-full" />
                                {errors.booking_date && <p className="text-sm text-red-600">{errors.booking_date.message}</p>}
                            </div>
                        )}
                    </div>

                    {/* Time Selection */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900">Select New Time</h3>
                            <div className="flex items-center text-sm text-gray-600">
                                <Clock className="mr-1 h-4 w-4" />
                                <span>{serviceDuration} minutes</span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="booking_time" className="text-sm font-medium text-gray-700">
                                Available Times *
                            </Label>
                            <SelectInput
                                name="booking_time"
                                control={control}
                                disabled={(!selectedDate && !watch("booking_date")) || availableTimeSlots.length === 0}
                                options={availableTimeSlots.map((slot) => ({
                                    value: slot.value,
                                    label: slot.label,
                                }))}
                                placeholder={
                                    !selectedDate && !watch("booking_date")
                                        ? "Please select a date first"
                                        : availableTimeSlots.length === 0
                                          ? "No available times for this date"
                                          : "Select time"
                                }
                                className="w-full"
                            />
                            {errors.booking_time && <p className="text-sm text-red-600">{errors.booking_time.message}</p>}
                            {serviceDuration && availableTimeSlots.length > 0 && (
                                <p className="text-xs text-gray-500">
                                    Times shown are start times. Your {serviceDuration}-minute service will end at the displayed end time.
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Reason */}
                    <div className="space-y-2">
                        <Label htmlFor="reason" className="text-sm font-medium text-gray-700">
                            Reason for Rescheduling *
                        </Label>
                        <TextAreaInput
                            name="reason"
                            control={control}
                            placeholder="Please provide a reason for rescheduling..."
                            rows={3}
                            className="w-full"
                        />
                        {errors.reason && <p className="text-sm text-red-600">{errors.reason.message}</p>}
                    </div>

                    <div className="flex justify-end space-x-2">
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isSubmitting || rescheduleMutation.isPending}>
                            {isSubmitting || rescheduleMutation.isPending ? "Rescheduling..." : "Reschedule"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
