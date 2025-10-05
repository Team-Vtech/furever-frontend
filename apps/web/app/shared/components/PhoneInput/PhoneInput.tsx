import { Label } from "@furever/ui/components/label";
import { PhoneInput as UIPhoneInput } from "@furever/ui/components/phone-input";
import { DynamicIcon, dynamicIconImports } from "lucide-react/dynamic";
import { ReactElement } from "react";
import { Control, Controller, FieldPath, FieldValues, RegisterOptions } from "react-hook-form";

interface PhoneInputProps<TFieldValues extends FieldValues = FieldValues> {
    control: Control<TFieldValues>;
    name: FieldPath<TFieldValues>;
    rules?: RegisterOptions<TFieldValues>;
    label?: string;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
    optional?: boolean;
    description?: string;
    iconProps?: {
        name: keyof typeof dynamicIconImports;
        size: number;
        color: string;
        className?: string;
        position?: "left" | "right";
    };
}

function PhoneInputComponent<TFieldValues extends FieldValues = FieldValues>({
    control,
    name,
    rules,
    label,
    placeholder,
    className = "",
    disabled = false,
    optional = false,
    description,
    iconProps = undefined,
    ...props
}: PhoneInputProps<TFieldValues>) {
    return (
        <Controller
            control={control}
            name={name}
            rules={rules}
            render={({ field, fieldState: { error } }) => (
                <div className="w-full">
                    {label && (
                        <Label htmlFor={name} className="mb-1 block text-sm font-medium text-gray-700">
                            {label}
                            {optional && <span className="ml-1 text-gray-400">(Optional)</span>}
                        </Label>
                    )}

                    {description && <p className="mb-1 text-xs text-gray-500">{description}</p>}

                    <div className="relative">
                        {iconProps ? iconProps.position == "left" ? <DynamicIcon {...iconProps} /> : null : null}
                        <UIPhoneInput
                            value={field.value || ""}
                            onChange={(value) => field.onChange(value || "")}
                            placeholder={placeholder}
                            disabled={disabled}
                            className={`${error ? "border-red-500" : "border-gray-300"} ${className}`.trim()}
                            {...props}
                        />
                        {iconProps ? iconProps.position == "right" ? <DynamicIcon {...iconProps} /> : null : null}
                    </div>

                    {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
                </div>
            )}
        />
    );
}

// Create the properly typed export
export const PhoneInput = PhoneInputComponent as <TFieldValues extends FieldValues = FieldValues>(props: PhoneInputProps<TFieldValues>) => ReactElement;