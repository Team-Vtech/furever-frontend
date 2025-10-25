"use client";
import { SelectInput } from "@/app/shared/components/SelectInput";
import { TextAreaInput } from "@/app/shared/components/TextAreaInput/TextAreaInput";
import { TextInput } from "@/app/shared/components/TextInput/TextInput";
import { Button } from "@furever/ui/components/button";
import { Label } from "@furever/ui/components/label";
import { Clock, Plus, Trash2 } from "lucide-react";
import { Control, FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";
import { ProviderFormValues } from "../../../(routes)/api/providers/providers.schema";

interface WorkingHoursSectionProps {
    control: Control<ProviderFormValues>;
    register: UseFormRegister<ProviderFormValues>;
    watch: UseFormWatch<ProviderFormValues>;
    errors: FieldErrors<ProviderFormValues>;
    workingHourFields: Array<{ id: string }>;
    appendWorkingHour: (value: any) => void;
    removeWorkingHour: (index: number) => void;
}

export function WorkingHoursSection({
    control,
    register,
    watch,
    errors,
    workingHourFields,
    appendWorkingHour,
    removeWorkingHour,
}: WorkingHoursSectionProps) {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-gray-400" />
                    <h3 className="text-lg font-medium text-gray-900">Working Hours</h3>
                </div>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                        appendWorkingHour({
                            day_of_week: "monday",
                            start_time: "09:00",
                            end_time: "17:00",
                            is_closed: false,
                            notes: "",
                        })
                    }
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Working Day
                </Button>
            </div>

            {workingHourFields.map((field, index) => (
                <div key={field.id} className="space-y-4 rounded-lg border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                        <h4 className="text-md font-medium text-gray-900">Working Day {index + 1}</h4>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeWorkingHour(index)}
                            className="text-red-600 hover:text-red-700"
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <SelectInput
                                name={`working_hours.${index}.day_of_week`}
                                control={control}
                                placeholder="Select day"
                                className="mt-1"
                                label="Day of Week"
                                required
                                options={[
                                    { value: "monday", label: "Monday" },
                                    { value: "tuesday", label: "Tuesday" },
                                    { value: "wednesday", label: "Wednesday" },
                                    { value: "thursday", label: "Thursday" },
                                    { value: "friday", label: "Friday" },
                                    { value: "saturday", label: "Saturday" },
                                    { value: "sunday", label: "Sunday" },
                                ]}
                            />
                        </div>

                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id={`working_hours.${index}.is_closed`}
                                {...register(`working_hours.${index}.is_closed`)}
                                className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                            />
                            <Label htmlFor={`working_hours.${index}.is_closed`} className="text-sm font-medium text-gray-700">
                                Closed this day
                            </Label>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <TextInput
                                id={`working_hours.${index}.start_time`}
                                name={`working_hours.${index}.start_time`}
                                type="time"
                                control={control}
                                placeholder="09:00"
                                className="mt-1"
                                disabled={watch(`working_hours.${index}.is_closed`)}
                                label="Start Time"
                            />
                        </div>

                        <div>
                            <TextInput
                                id={`working_hours.${index}.end_time`}
                                name={`working_hours.${index}.end_time`}
                                type="time"
                                control={control}
                                placeholder="17:00"
                                className="mt-1"
                                disabled={watch(`working_hours.${index}.is_closed`)}
                                label="End Time"
                            />
                        </div>
                    </div>

                    <div>
                        <TextAreaInput
                            id={`working_hours.${index}.notes`}
                            name={`working_hours.${index}.notes`}
                            control={control}
                            placeholder="Add any notes about working hours"
                            rows={2}
                            className="mt-1"
                            label="Notes"
                        />
                    </div>
                </div>
            ))}

            {workingHourFields.length === 0 && (
                <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center">
                    <Clock className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                    <p className="text-gray-500">No working hours defined yet. Click "Add Working Day" to add one.</p>
                </div>
            )}
        </div>
    );
}
