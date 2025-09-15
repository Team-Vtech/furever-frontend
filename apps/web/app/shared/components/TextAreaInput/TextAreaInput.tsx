"use client";

import { ControlledInputProps } from "@/app/shared/types/general";
import { FieldValues, useController } from "react-hook-form";
import { Textarea } from "@furever/ui/components/textarea";

type TextAreaInputProps<T extends FieldValues> =
  React.ComponentProps<"textarea"> & ControlledInputProps<T>;

export function TextAreaInput<T extends FieldValues>(
  props: TextAreaInputProps<T>
) {
  const { name, control, rules, ...inputProps } = props;
  const { field } = useController({ control, name, rules });
  return <Textarea autoCapitalize="none" {...inputProps} {...field} />;
}
