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

export function ImageGenerationForm({ country }: { country: CountryCode }) {
    const initalPrompt =
        envClient.NEXT_PUBLIC_ENV === "development" ? "test" : "";
    const [prompt, setPrompt] = useState<string>(initalPrompt);

    const [showConfirmationDialog, setShowConfirmationDialog] =
        useState<boolean>(false);
    const [alertReason, setAlertReason] = useState<string>("");

    const [style, setStyle] = useState<string | undefined>();
    const [location, setLocation] = useState<string | undefined>();

    const formFields = [
        {
            name: "Style",
            options: styleOptions,
            set: setStyle,
        },
        {
            name: "Location",
            options: locationOptions,
            set: setLocation,
        },
    ];

    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const router = useRouter();

    const continueToNextStep = () => {
        router.push(
            `/image/${prompt}?&style=${style}&location=${location}&country=${country}`,
        );
    };

    const generateImage = async () => {
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
        <div className="flex w-full flex-col items-center gap-4">
            <h1 className="text-2xl">Enter your idea</h1>
            {showConfirmationDialog && (
                <PromptConfirmationDialog
                    showConfirmationDialog={showConfirmationDialog}
                    setShowConfirmationDialog={setShowConfirmationDialog}
                    continueToNextStep={continueToNextStep}
                    alertReason={alertReason}
                />
            )}
            <Textarea
                ref={textAreaRef}
                placeholder="Example: An astronaut playing on an old arcade machine."
                value={prompt}
                onChange={onInputChanged}
                className="h-72 resize-none rounded-lg"
                autoFocus
            />
            <Form {...form}>
                {formFields.map((x) => {
                    const { name, options, set } = x;
                    return (
                        <SelectFormField
                            key={x.name}
                            form={form}
                            setFieldValue={set}
                            options={options as unknown as string[]}
                            name={name}
                        />
                    );
                })}
            </Form>
            <Button
                className="w-full"
                onClick={generateImage}
                data-testid="Generate Image Button"
                disabled={!prompt || !location || !style}
            >
                Generate Image
            </Button>
        </div>
    );
}
