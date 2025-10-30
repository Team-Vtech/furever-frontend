"use client";
import { ControlledInputProps } from "@furever/types";
import { Label } from "@furever/ui/components/label";
import { FieldValues, useController } from "react-hook-form";

export interface CheckboxOption {
    value: string | number;
    label: string;
    disabled?: boolean;
}

type CheckboxGroupProps<T extends FieldValues> = ControlledInputProps<T> & {
    options: CheckboxOption[];
    disabled?: boolean;
    className?: string;
    orientation?: "vertical" | "horizontal";
    label?: string;
    required?: boolean;
};

export function CheckboxGroup<T extends FieldValues>(props: CheckboxGroupProps<T>) {
    const { name, control, rules, options, disabled, className, orientation = "vertical", label, required } = props;

    const {
        field,
        fieldState: { error },
    } = useController({ control, name, rules });
    const currentValues: (string | number)[] = Array.isArray(field.value) ? field.value : [];

    const handleCheckboxChange = (optionValue: string | number, checked: boolean) => {
        let newValues: (string | number)[];

        if (checked) {
            // Add to array if not already present
            if (!currentValues.includes(optionValue)) {
                newValues = [...currentValues, optionValue];
            } else {
                newValues = currentValues;
            }
        } else {
            // Remove from array
            newValues = currentValues.filter((value) => value !== optionValue);
        }

        field.onChange(newValues);
    };

    const containerClass = orientation === "horizontal" ? "flex flex-wrap gap-4" : "space-y-2";

    return (
        <div className={`${containerClass} ${className || ""} flex flex-col justify-between gap-y-2`}>
            {label && (
                <Label htmlFor={name} className="mb-1 flex gap-2 text-sm font-medium text-gray-700">
                    {label}
                    {required && <span className="text-red-600">*</span>}
                </Label>
            )}
            <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                {options.map((option) => {
                    const isChecked = currentValues.includes(option.value);
                    const checkboxId = `${String(name)}_${String(option.value)}`;
                    return (
                        <div key={String(option.value)} className="group col-span-1 flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id={checkboxId}
                                checked={isChecked}
                                onChange={(e) => handleCheckboxChange(option.value, e.target.checked)}
                                disabled={disabled || option.disabled}
                            />
                            <Label htmlFor={checkboxId} className="cursor-pointer text-sm font-medium text-gray-700 group-hover:text-purple-600">
                                {option.label}
                            </Label>
                        </div>
                    );
                })}
            </div>
            {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
        </div>
    );
}
