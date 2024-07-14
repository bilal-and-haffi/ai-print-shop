"use client";

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
import { sendFeedbackEmail } from "@/lib/email/sendFeedbackEmailToBilal";

const formSchema = z.object({
    email: z.string().email(),
    message: z.string(),
});

async function copyToClipboardWithMeta(value: string) {
    navigator.clipboard.writeText(value);
}

export default function SupportPage() {
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            message: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const { email, message } = values;

        await sendFeedbackEmail(email, message);

        toast({
            title: "Feedback sent :)",
            duration: 1000,
        });

        form.reset();
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
                                    className="h-48 resize-none rounded-lg"
                                />
                            </FormControl>
                            <FormMessage />
                            <FormDescription>
                                We appreciate any feedback you have for us.
                            </FormDescription>
                        </FormItem>
                    )}
                />
                <Button className="w-full" type="submit">
                    Submit
                </Button>

                <Button
                    // asChild
                    type="button"
                    className="w-full "
                    onClick={() => {
                        copyToClipboardWithMeta(
                            "customer-service@ai-print-shop.com",
                        );
                        toast({
                            title: "Copied email to clipboard",
                            duration: 1000,
                        });
                    }}
                    variant={"link"}
                >
                    <p>
                        Alternatively, email us at:
                        customer-service@ai-print-shop.com (click to copy)
                    </p>
                </Button>
            </form>
        </Form>
    );
}
