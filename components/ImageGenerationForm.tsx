/* eslint-disable react/no-unescaped-entities */
"use client";
import { ChangeEvent, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { envClient } from "@/lib/env/client";
import { Label } from "./ui/label";
import { checkPromptForCopyRight } from "@/lib/openai/copyrightCheck";
import { PromptConfirmationDialog } from "./PromptConfirmationDialog";
import { SelectFormField } from "./form/SelectFormField";
import { modelOptions } from "../app/data/modelOptions";

const styleOptions = [
    "Photograph",
    "Anime",
    "Cartoon",
    "Futuristic",
    "None",
] as const;

const locationOptions = [
    "Space",
    "Dessert",
    "Fantasy Land",
    "Indoors",
    "Mars",
    "Outdoors",
    "Rural",
    "Underwater",
    "Urban",
    "None",
] as const;

const FormSchema = z.object({
    style: z.enum(styleOptions).default(styleOptions[0]),
    locationOptions: z.enum(locationOptions).default(locationOptions[0]),
    modelOptions: z.enum(modelOptions).default(modelOptions[0]),
});

export function ImageGenerationForm() {
    const initalPrompt =
        envClient.NEXT_PUBLIC_ENV === "development" ? "test" : "";
    const [prompt, setPrompt] = useState<string>(initalPrompt);

    const [showConfirmationDialog, setShowConfirmationDialog] =
        useState<boolean>(false);
    const [alertReason, setAlertReason] = useState<string>("");

    const [modelOption, setModelOptions] = useState<string>(modelOptions[0]);
    const [style, setStyle] = useState<string>(styleOptions[0]);
    const [location, setLocation] = useState<string>(locationOptions[0]);

    const formFields = [
        {
            name: "Model",
            options: modelOptions,
            set: setModelOptions,
        },
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
        console.log({ modelOption, style, location });

        router.push(
            `/image/${prompt}?model=${modelOption}&style=${style}&location=${location}`,
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
        <>
            <h1 className="text-3xl">Enter your idea</h1>
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
                className="h-48 resize-none rounded-lg"
                autoFocus
            />
            <Form {...form}>
                <form className="w-full space-y-4">
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
                </form>
            </Form>
            <Button onClick={generateImage} data-testid="Generate Image Button">
                Generate Image
            </Button>
        </>
    );
}
