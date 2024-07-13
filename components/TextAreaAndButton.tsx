/* eslint-disable react/no-unescaped-entities */
"use client";
import { ChangeEvent, useState, KeyboardEvent, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { envClient } from "@/lib/env/client";
import { Label } from "./ui/label";
import { checkPromptForCopyRight } from "@/lib/openai/copyrightCheck";
import { PromptConfirmationDialog } from "./PromptConfirmationDialog";

const FormSchema = z.object({
    modelProvider: z.string().default("openai"),
});

export function TextAreaAndButton() {
    const initalPrompt =
        envClient.NEXT_PUBLIC_ENV === "development" ? "test" : "";
    const [prompt, setPrompt] = useState<string>(initalPrompt);
    const [modelProvider, setModelProvider] = useState<string>("openai");
    const [showConfirmationDialog, setShowConfirmationDialog] =
        useState<boolean>(false);
    const [alertReason, setAlertReason] = useState<string>("");

    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const router = useRouter();

    const continueToNextStep = () => {
        router.push(`/image/${prompt}?model=${modelProvider}`);
    };

    const submitGenerateText = async () => {
        if (prompt.trim() === "") return;

        const response = await checkPromptForCopyRight(prompt);

        console.log(response);

        if (response === "NO") {
            continueToNextStep();
        } else {
            // response = "YES,8 - Reasoning...."
            const parsedReason = response.split("- ")[1];
            setAlertReason(parsedReason);
            setShowConfirmationDialog(true);
        }
    };

    const onInputChanged = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setPrompt(e.target.value);
    };

    const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            submitGenerateText();
            textAreaRef.current?.blur();
        }
    };

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });

    return (
        <>
            <div
                className="flex w-5/6 flex-col space-y-4 lg:w-1/2"
                id="form-container"
            >
                {showConfirmationDialog && (
                    <PromptConfirmationDialog
                        showConfirmationDialog={showConfirmationDialog}
                        setShowConfirmationDialog={setShowConfirmationDialog}
                        continueToNextStep={continueToNextStep}
                        alertReason={alertReason}
                    />
                )}
                <Form {...form}>
                    <form className="w-full">
                        <FormField
                            control={form.control}
                            name="modelProvider"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Image Generator</FormLabel>
                                    <Select
                                        onValueChange={(e) => {
                                            setModelProvider(e);
                                        }}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue
                                                    placeholder="OpenAI - DALL-E 3"
                                                    defaultValue="openai"
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="openai">
                                                OpenAI - DALL-E 3
                                            </SelectItem>
                                            <SelectItem value="stable-diffusion">
                                                Stability-ai - Stable Diffusion
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
                <Label htmlFor="prompt">Enter your prompt</Label>
                <Textarea
                    ref={textAreaRef}
                    placeholder="Enter your prompt here!"
                    value={prompt}
                    onChange={onInputChanged}
                    className="h-48 resize-none rounded-lg"
                    onKeyDown={onKeyDown}
                    autoFocus
                />
                <Button
                    onClick={submitGenerateText}
                    data-testid="Generate Image Button"
                >
                    Generate Image
                </Button>
                <div className="instructions w-full">
                    <h2 className="mb-2 text-lg font-bold">How It Works:</h2>
                    <ol className="list-inside list-decimal space-y-2 text-sm md:text-lg">
                        <li>
                            <strong>Enter Your Prompt:</strong> Type your idea
                            or description into the text box.
                        </li>
                        <li>
                            <strong>Generate Your Image:</strong> Click
                            'Generate Image'. AI will create an image based on
                            your prompt.
                        </li>
                        <li>
                            <strong>Choose Your Product:</strong> Select a
                            T-shirt, mug, or hoodie to see your design on it.
                        </li>
                        <li>
                            <strong>Purchase:</strong> Click 'Buy Now' and enter
                            your details to complete the purchase with Stripe.
                        </li>
                        <li>
                            <strong>Enjoy:</strong> Your custom item will be
                            printed and shipped to you. Enjoy or gift it!
                        </li>
                    </ol>
                </div>
            </div>
        </>
    );
}
