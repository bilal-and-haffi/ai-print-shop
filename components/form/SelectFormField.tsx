"use client";
import { Dispatch, SetStateAction } from "react";
import { FormField, FormItem, FormLabel, FormControl } from "../ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export function SelectFormField({
    form,
    setFieldValue,
    options,
    name,
}: {
    form: any;
    setFieldValue: Dispatch<SetStateAction<string | undefined>>;
    options: any[];
    name: string;
}) {
    return (
        <FormField
            control={form.control}
            name={name}
            render={() => (
                <FormItem>
                    <Select
                        onValueChange={(value) => {
                            setFieldValue(value);
                        }}
                    >
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue
                                    placeholder={`Select a ${name.toLowerCase()} (optional)`}
                                />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {options.map((option) => (
                                <SelectItem key={option} value={option}>
                                    <span className="text-muted-foreground">
                                        {name}
                                    </span>
                                    : {option}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </FormItem>
            )}
        />
    );
}
