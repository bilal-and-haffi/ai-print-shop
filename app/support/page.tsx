"use client";

import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
    email: z.string().email(),
    message: z.string(),
});

async function copyToClipboardWithMeta(value: string) {
    navigator.clipboard.writeText(value);
}

export default function SupportPage() {
    const { toast } = useToast();

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    });

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log("Sending feedback email...");
        console.log({ values });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormLabel>Please enter your feedback below</FormLabel>
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder="Email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Textarea
                                    placeholder="Enter your message here..."
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                            <FormDescription>
                                We appreciate any feedback you have for us.
                            </FormDescription>
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>

                <Button
                    asChild
                    className="focus:shadow-outline w-full rounded-none focus:outline-none"
                    onClick={() => {
                        copyToClipboardWithMeta("ai-print-shop@mail.com");
                        toast({
                            title: "Copied email to clipboard",
                            duration: 1000,
                        });
                    }}
                >
                    <p>or contact us at ai-print-shop@mail.com</p>
                </Button>
            </form>
        </Form>
    );
}
