/* eslint-disable react/no-unescaped-entities */
"use client";
import { ChangeEvent, useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { envClient } from "@/lib/env/client";
import { checkPromptForCopyRight } from "@/lib/openai/copyrightCheck";
import { PromptConfirmationDialog } from "./PromptConfirmationDialog";
import { SelectFormField } from "./form/SelectFormField";
import { CountryCode } from "@/lib/stripe/createCheckoutSession";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

const styleOptions = [
    "None",
    "Anime",
    "Cartoon",
    "Futuristic",
    "Photograph",
    "Pixel Art",
] as const;

const locationOptions = [
    "None",
    "Dessert",
    "Indoors",
    "Mars",
    "Outdoors",
    "Rural",
    "Space",
    "Underwater",
    "Urban",
] as const;

const FormSchema = z.object({
    style: z.enum(styleOptions),
    locationOptions: z.enum(locationOptions),
});

export function ImageGenerationForm({
    country,
    previousPrompt,
}: {
    country: CountryCode;
    previousPrompt?: string;
}) {
    const initalPrompt =
        previousPrompt ??
        (envClient.NEXT_PUBLIC_ENV === "development" ? "test prompt" : "");
    const [promptValue, setPromptValue] = useState<string>(initalPrompt);

    const [showConfirmationDialog, setShowConfirmationDialog] =
        useState<boolean>(false);
    const [alertReason, setAlertReason] = useState<string>("");

    const [style, setStyle] = useState<string>(styleOptions[0]);
    const [location, setLocation] = useState<string>(locationOptions[0]);

    const formFields = [
        {
            name: "Style",
            options: styleOptions,
            set: setStyle,
            value: style,
        },
        {
            name: "Location",
            options: locationOptions,
            set: setLocation,
            value: location,
        },
    ];

    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const router = useRouter();

    const continueToNextStep = () => {
        router.push(
            `/image/${promptValue}?&style=${style}&location=${location}&country=${country}`,
        );
    };

    const generateImage = async () => {
        if (promptValue.trim() === "") return;

        const response = await checkPromptForCopyRight(promptValue);

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
        setPromptValue(e.target.value);
    };

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });

    return (
        <div className="flex w-full flex-col gap-4">
            {showConfirmationDialog && (
                <PromptConfirmationDialog
                    showConfirmationDialog={showConfirmationDialog}
                    setShowConfirmationDialog={setShowConfirmationDialog}
                    continueToNextStep={continueToNextStep}
                    alertReason={alertReason}
                />
            )}
            <h1 className="text-2xl">Enter your image prompt</h1>
            <Textarea
                ref={textAreaRef}
                placeholder="Example: An astronaut playing on an old arcade machine."
                value={promptValue}
                onChange={onInputChanged}
                className="h-96 resize-none rounded-lg"
                autoFocus
            />

            <Button
                className="w-full"
                onClick={generateImage}
                data-testid="Generate Image Button"
                disabled={!promptValue || !location || !style}
            >
                Generate Image
            </Button>

            <Dialog>
                <DialogTrigger asChild className="w-full">
                    <Button variant={"secondary"}>Options</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Options</DialogTitle>
                        <DialogDescription>
                            These options will help make better images
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        {formFields.map((x) => {
                            const { name, options, set, value } = x;
                            return (
                                <SelectFormField
                                    key={x.name}
                                    form={form}
                                    setFieldValue={set}
                                    options={options as unknown as string[]}
                                    name={name}
                                    value={value}
                                />
                            );
                        })}
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
