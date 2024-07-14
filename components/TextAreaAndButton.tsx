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
import { InstructionsDialog } from "./InstructionsDialog";

const FormSchema = z.object({
    modelProvider: z.string().default("stable-diffusion"),
});

export function TextAreaAndButton() {
    const initalPrompt =
        envClient.NEXT_PUBLIC_ENV === "development" ? "test" : "";
    const [prompt, setPrompt] = useState<string>(initalPrompt);
    const [modelProvider, setModelProvider] =
        useState<string>("stable-diffusion");
    const [showConfirmationDialog, setShowConfirmationDialog] =
        useState<boolean>(false);
    const [alertReason, setAlertReason] = useState<string>("");

    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const router = useRouter();

    const continueToNextStep = () => {
        console.log(modelProvider);
        router.push(`/image/${prompt}?model=${modelProvider}`);
    };

    const submitGenerateText = async () => {
        if (prompt.trim() === "") return;

        const response = await checkPromptForCopyRight(prompt);

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
                                                    placeholder="Stability-ai - Stable Diffusion"
                                                    defaultValue="stable-diffusion"
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
                    placeholder="Be as descriptive as possible. Mention any desired art style, key elements, colors, lighting, and any specific emotions or themes you want to convey."
                    value={prompt}
                    onChange={onInputChanged}
                    className="h-48 resize-none rounded-lg"
                    autoFocus
                />
                <Button
                    onClick={submitGenerateText}
                    data-testid="Generate Image Button"
                >
                    Generate Image
                </Button>
                <InstructionsDialog />
            </div>
        </>
    );
}
