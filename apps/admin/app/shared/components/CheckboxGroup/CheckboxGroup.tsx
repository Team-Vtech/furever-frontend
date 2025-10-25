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
        <div className={`${containerClass} ${className || ""} flex flex-col justify-between`}>
            {label && (
                <Label htmlFor={name} className="mb-1 flex gap-2 text-sm font-medium text-gray-700">
                    {label}
                    {required && <span className="text-red-600">*</span>}
                </Label>
            )}
            {options.map((option) => {
                const isChecked = currentValues.includes(option.value);
                const checkboxId = `${String(name)}_${String(option.value)}`;

                return (
                    <div key={String(option.value)} className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id={checkboxId}
                            checked={isChecked}
                            onChange={(e) => handleCheckboxChange(option.value, e.target.checked)}
                            disabled={disabled || option.disabled}
                            className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                        />
                        <Label htmlFor={checkboxId} className="cursor-pointer text-sm font-medium text-gray-700">
                            {option.label}
                        </Label>
                    </div>
                );
            })}
            {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
        </div>
    );
}
