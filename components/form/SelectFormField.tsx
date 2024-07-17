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
}: {
    form: any;
    setFieldValue: Dispatch<SetStateAction<string | undefined>>;
    options: any[];
}) {
    return (
        <FormField
            control={form.control}
            name={"style"}
            render={() => (
                <FormItem>
                    <FormLabel>Style</FormLabel>
                    <Select
                        onValueChange={(value) => {
                            setFieldValue(value);
                        }}
                    >
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue
                                    placeholder={"Choose a style (optional)"}
                                />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {options.map((option) => (
                                <SelectItem key={option} value={option}>
                                    {option}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </FormItem>
            )}
        />
    );
}
