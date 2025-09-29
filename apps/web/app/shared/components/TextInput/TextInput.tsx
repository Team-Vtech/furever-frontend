import { Label } from "@furever/ui/components/label";
import { Eye, EyeOff } from "lucide-react";
import { DynamicIcon, dynamicIconImports } from "lucide-react/dynamic";
import { ReactElement, useState } from "react";
import { Control, Controller, FieldPath, FieldValues, RegisterOptions } from "react-hook-form";

interface TextInputProps<TFieldValues extends FieldValues = FieldValues> {
    control: Control<TFieldValues>;
    name: FieldPath<TFieldValues>;
    rules?: RegisterOptions<TFieldValues>;
    label?: string;
    placeholder?: string;
    type?: "text" | "email" | "password" | "tel" | "url" | "number";
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

function TextInputComponent<TFieldValues extends FieldValues = FieldValues>({
    control,
    name,
    rules,
    label,
    placeholder,
    type = "text",
    className = "",
    disabled = false,
    optional = false,
    description,
    iconProps = undefined,
    ...props
}: TextInputProps<TFieldValues>) {
    const [showPassword, setShowPassword] = useState(false);
    const isPasswordType = type === "password";
    const inputType = isPasswordType && showPassword ? "text" : type;
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
                        <input
                            {...field}
                            {...props}
                            id={name}
                            type={inputType}
                            placeholder={placeholder}
                            disabled={disabled}
                            className={`w-full rounded-md border px-3 py-2 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 ${error ? "border-red-500" : "border-gray-300"} ${isPasswordType ? "pr-10" : ""} ${className} `.trim()}
                        />
                        {isPasswordType && (
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 flex items-center pr-3"
                                onClick={() => setShowPassword(!showPassword)}
                                tabIndex={-1}
                            >
                                {showPassword ? (
                                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                ) : (
                                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                )}
                            </button>
                        )}
                        {iconProps ? iconProps.position == "right" ? <DynamicIcon {...iconProps} /> : null : null}
                    </div>

                    {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
                </div>
            )}
        />
    );
}

// Create the properly typed export
export const TextInput = TextInputComponent as <TFieldValues extends FieldValues = FieldValues>(props: TextInputProps<TFieldValues>) => ReactElement;
