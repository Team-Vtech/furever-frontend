"use client";

import { RescheduleBookingRequest, rescheduleBookingRequestSchema } from "@/app/(routes)/api/bookings/reschedule.schema";
import { SelectInput } from "@/app/shared/components/SelectInput/SelectInput";
import { TextAreaInput } from "@/app/shared/components/TextAreaInput/TextAreaInput";
import { TextInput } from "@/app/shared/components/TextInput/TextInput";
import { toastUtils } from "@/app/shared/utils/toast.utils";
import { Booking } from "@furever/types";
import { Button } from "@furever/ui/components/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@furever/ui/components/dialog";
import { Label } from "@furever/ui/components/label";
import { Skeleton } from "@furever/ui/components/skeleton";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Calendar, Clock, Loader2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { TimeSlotsClient } from "../../../clients/time-slots.client";
import { WorkingHoursCalendar } from "../../../components/WorkingHoursCalendar";
import { useRescheduleBookingMutation } from "../../../hooks/useBookings";

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

    // Fetch available time slots from API
    const dateToUse = selectedDate || (watch("booking_date") ? new Date(watch("booking_date")) : null);
    const formattedDate = dateToUse ? format(dateToUse, "yyyy-MM-dd") : null;

    const {
        data: availableTimeSlots = { available_slots: [], all_slots: [], date: "", day_of_week: "" },
        isLoading: isLoadingTimeSlots,
        error: timeSlotsError,
    } = useQuery({
        queryKey: ["time-slots", booking.provider_id, booking.service_id, formattedDate],
        queryFn: () =>
            TimeSlotsClient.getAvailableTimeSlots({
                provider_id: booking.provider_id,
                service_id: booking.service_id,
                date: formattedDate!,
            }),
        select: (data) => data.data,
        enabled: !!formattedDate,
        retry: 2,
        retryDelay: 1000,
    });

    // Get minimum date (today)
    const getMinDate = () => {
        const today = new Date();
        return today.toISOString().split("T")[0];
    };

    // Reset booking time when date changes (since we fetch new time slots from API)
    useEffect(() => {
        setValue("booking_time", "");
    }, [formattedDate, setValue]);

    // Show error toast when time slots fail to load
    useEffect(() => {
        if (timeSlotsError) {
            toastUtils.error.generic("Failed to load available time slots. Please try again.");
        }
    }, [timeSlotsError]);

    const onSubmit = async (data: RescheduleBookingRequest) => {
        try {
            await rescheduleMutation.mutateAsync({
                id: booking.id,
                data,
            });

            // Show success message
            toastUtils.success.update("Booking", "Booking rescheduled successfully!");

            // Close modal and reset form
            setOpen(false);
            reset({
                booking_date: currentDate,
                booking_time: currentTime,
                reason: "",
            });
            setSelectedDate(new Date(currentDate));
        } catch (error) {
            // Show error message
            toastUtils.error.update("Booking", error);
            console.error("Reschedule booking error:", error);
        }
    };

    return (
        <Dialog
            open={open}
            onOpenChange={(newOpen) => {
                setOpen(newOpen);
                if (!newOpen) {
                    // Reset form when modal is closed
                    reset({
                        booking_date: currentDate,
                        booking_time: currentTime,
                        reason: "",
                    });
                    setSelectedDate(new Date(currentDate));
                }
            }}
            modal={true}
        >
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="max-h-[90vh] w-full !max-w-[80%] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center">
                        <Calendar className="mr-2 h-5 w-5" />
                        Reschedule Booking
                    </DialogTitle>
                    <DialogDescription>Select a new date and time for your booking. Please provide a reason for rescheduling.</DialogDescription>
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
                            {isLoadingTimeSlots ? (
                                <Skeleton className="h-10 w-full rounded-md" />
                            ) : timeSlotsError ? (
                                <div className="flex h-10 w-full items-center justify-center rounded-md border border-red-200 bg-red-50 text-sm text-red-600">
                                    Failed to load time slots. Please try again.
                                </div>
                            ) : (
                                <SelectInput
                                    name="booking_time"
                                    control={control}
                                    disabled={(!selectedDate && !watch("booking_date")) || availableTimeSlots.available_slots.length === 0}
                                    options={availableTimeSlots.available_slots.map((slot) => ({
                                        value: slot.start_time,
                                        label: `${slot.start_time} - ${slot.end_time}`,
                                    }))}
                                    placeholder={
                                        !selectedDate && !watch("booking_date")
                                            ? "Please select a date first"
                                            : availableTimeSlots.available_slots.length === 0
                                              ? "No available times for this date"
                                              : "Select time"
                                    }
                                    className="w-full"
                                />
                            )}
                            {errors.booking_time && <p className="text-sm text-red-600">{errors.booking_time.message}</p>}
                            {serviceDuration && availableTimeSlots.available_slots.length > 0 && (
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
                            {(isSubmitting || rescheduleMutation.isPending) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {isSubmitting || rescheduleMutation.isPending ? "Rescheduling..." : "Reschedule"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
