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
    setFieldValue: Dispatch<SetStateAction<string>>;
    options: any[];
    name: string;
}) {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <Select
                        onValueChange={(value) => {
                            setFieldValue(value);
                        }}
                        defaultValue={field.value}
                    >
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue
                                    placeholder={`${name}: ${options[0]}`}
                                    defaultValue={field.value}
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
