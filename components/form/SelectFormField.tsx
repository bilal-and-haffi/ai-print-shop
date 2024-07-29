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
    value,
}: {
    form: any;
    setFieldValue: Dispatch<SetStateAction<string>>;
    options: any[];
    name: string;
    value: string;
}) {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({}) => (
                <FormItem className="w-full">
                    <Select
                        onValueChange={(value) => {
                            setFieldValue(value);
                        }}
                        defaultValue={value}
                    >
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue
                                    placeholder={`Choose a ${name.toLowerCase()}`}
                                    defaultValue={value}
                                />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {options.map((option) => (
                                <SelectItem
                                    key={option}
                                    value={option}
                                    onClick={(event) => event.stopPropagation()}
                                >
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
