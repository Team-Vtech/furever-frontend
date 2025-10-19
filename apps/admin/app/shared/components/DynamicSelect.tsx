import { QueryFunction, useQuery } from "@tanstack/react-query";

import { PaginatedJsonResponse } from "@furever/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@furever/ui/components/select";
import { Skeleton } from "@furever/ui/components/skeleton";
import { map } from "lodash";
import { Label } from "@furever/ui/components/label";

export type DynamicFilterAutoCompleteInputProps = Omit<typeof Select, "value" | "onChange" | "options" | "renderInput"> & {
    setValue: (value: string) => void;
    value?: string;
    queryKey: string;
    label: string;
    optionDisplayKey: string | ((record: unknown) => string);
    queryFn: QueryFunction<
        PaginatedJsonResponse<{
            data: any;
        }>,
        string[]
    >;
};

function DynamicFilterAutoCompleteInput({
    setValue,
    value,
    queryKey,
    label,
    optionDisplayKey = "name",
    queryFn,
}: DynamicFilterAutoCompleteInputProps) {
    const { data, isLoading: isLoading } = useQuery({
        queryKey: ["query-" + queryKey],
        queryFn,
        select(data) {
            return data.data.data;
        },
    });

    if (isLoading) {
        return <Skeleton className="h-10 w-full rounded-md" />;
    }

    return (
        <div className="w-full">
            {label && (
                <Label htmlFor={queryKey} className="text-sm font-medium text-gray-700">
                    {label}
                </Label>
            )}
            <Select value={value} onValueChange={(value: string) => setValue(value)}>
                <SelectTrigger className="w-full" value={value}>
                    <SelectValue placeholder={label} />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem key="all" value="all">
                        All
                    </SelectItem>
                    {map(data, (record) => {
                        return (
                            <SelectItem key={record.id} value={`${record.id}`}>
                                {typeof optionDisplayKey === "function" ? optionDisplayKey(record) : record[optionDisplayKey]}
                            </SelectItem>
                        );
                    })}
                </SelectContent>
            </Select>
        </div>
    );
}
export default DynamicFilterAutoCompleteInput;
