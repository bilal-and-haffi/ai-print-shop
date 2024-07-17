/* eslint-disable react/no-unescaped-entities */
"use client";
import {
    ChangeEvent,
    useState,
    KeyboardEvent,
    useRef,
    Dispatch,
    SetStateAction,
} from "react";
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

const imageStyles = [
    "Anime",
    "Abstract",
    "Cartoon",
    "Vintage",
    "Futuristic",
    "Minimalist",
    "Surreal",
    "Watercolor",
] as const;

const FormSchema = z.object({
    modelProvider: z.string().default("stable-diffusion"),
    style: z.enum(imageStyles).optional(),
});

export function ImageForm() {
    const initalPrompt =
        envClient.NEXT_PUBLIC_ENV === "development" ? "test" : "";
    const [prompt, setPrompt] = useState<string>(initalPrompt);
    const [modelProvider, setModelProvider] =
        useState<string>("stable-diffusion");
    const [showConfirmationDialog, setShowConfirmationDialog] =
        useState<boolean>(false);
    const [alertReason, setAlertReason] = useState<string>("");
    const [imageStyle, setImageStyle] = useState<string>();

    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const router = useRouter();

    const continueToNextStep = () => {
        console.log({ modelProvider });
        console.log({ imageStyle });
        router.push(
            `/image/${prompt}?model=${modelProvider}&imageStyle=${imageStyle}`,
        );
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
                    <SelectFormField
                        form={form}
                        setFieldValue={setImageStyle}
                    />
                </form>
            </Form>
            <Label htmlFor="prompt">Enter your prompt</Label>
            <Textarea
                ref={textAreaRef}
                placeholder="Be as descriptive as possible. Mention any desired art style, key elements, colors, lighting, and any specific emotions or themes you want to convey."
                value={prompt}
                onChange={onInputChanged}
                className="h-60 resize-none rounded-lg"
                autoFocus
            />
            <Button
                onClick={submitGenerateText}
                data-testid="Generate Image Button"
            >
                Generate Image
            </Button>
            <InstructionsDialog />
        </>
    );
}

function SelectFormField({
    form,
    setFieldValue,
}: {
    form: any;
    setFieldValue: Dispatch<SetStateAction<string | undefined>>;
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
                            {imageStyles.map((style) => (
                                <SelectItem key={style} value={style}>
                                    {style}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </FormItem>
            )}
        />
    );
}
