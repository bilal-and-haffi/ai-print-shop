/* eslint-disable react/no-unescaped-entities */
"use client";
import { ChangeEvent, useState, useRef } from "react";
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
import { SelectFormField } from "./form/SelectFormField";

const styleOptions = ["Anime", "Cartoon", "Futuristic", "Photograph"] as const;

const locationOptions = [
    "Dessert",
    "Fantasy Land",
    "Indoors",
    "Mars",
    "Outdoors",
    "Rural",
    "Space",
    "Underwater",
    "Urban",
] as const;

const FormSchema = z.object({
    modelProvider: z.string().default("stable-diffusion"),
    style: z.enum(styleOptions).optional(),
    locationOptions: z.enum(locationOptions).optional(),
});

export function ImageGenerationForm() {
    const initalPrompt =
        envClient.NEXT_PUBLIC_ENV === "development" ? "test" : "";
    const [prompt, setPrompt] = useState<string>(initalPrompt);

    const [showConfirmationDialog, setShowConfirmationDialog] =
        useState<boolean>(false);
    const [alertReason, setAlertReason] = useState<string>("");

    const [modelProvider, setModelProvider] =
        useState<string>("stable-diffusion");
    const [style, setStyle] = useState<string>();
    const [location, setLocation] = useState<string>();

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
        console.log({ modelProvider, style, location });

        router.push(
            `/image/${prompt}?model=${modelProvider}&style=${style}&location=${location}`,
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
            {showConfirmationDialog && (
                <PromptConfirmationDialog
                    showConfirmationDialog={showConfirmationDialog}
                    setShowConfirmationDialog={setShowConfirmationDialog}
                    continueToNextStep={continueToNextStep}
                    alertReason={alertReason}
                />
            )}
            <Label htmlFor="prompt">Enter your prompt</Label>
            <Textarea
                ref={textAreaRef}
                placeholder="Be as descriptive as possible. Mention any desired art style, key elements, colors, lighting, and any specific emotions or themes you want to convey."
                value={prompt}
                onChange={onInputChanged}
                className="h-60 resize-none rounded-lg"
                autoFocus
            />
            <Form {...form}>
                <form className="w-full space-y-4">
                    <FormField
                        control={form.control}
                        name="modelProvider"
                        render={({ field }) => (
                            <FormItem>
                                <Select
                                    onValueChange={(e) => {
                                        setModelProvider(e);
                                    }}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue
                                                placeholder="Generate image with: DALL-E 3"
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
