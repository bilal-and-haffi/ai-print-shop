import { redirect } from "next/navigation";
import { generateStableDiffusionImageUrl } from "@/lib/images/replicate";
import { generateOpenAiImageUrls } from "@/lib/images/generateOpenAiImageUrl";
import { addToImageTable } from "@/db/image";
import { addToPromptTable } from "@/db/prompt";

export const maxDuration = 300;

const ModelsEnum = ["openai", "stable-diffusion"] as const;

export default async function GenerateImagePage(params: {
    params: { prompt: string };
    searchParams: { model: string };
}) {
    const { prompt: encodedPrompt } = params.params;
    const decodedPrompt = decodeURIComponent(encodedPrompt);

    if (!encodedPrompt) {
        console.error("Text is required", { params });
        console.error({ decodedPrompt });
        return <div>Text is required</div>;
    }

    const { model } = params.searchParams;

    let generatedImageUrls: string[];
    if (model === ModelsEnum[0]) {
        generatedImageUrls = await generateOpenAiImageUrls({
            prompt: decodedPrompt,
            numberOfImages: 4,
            style: "vivid",
        });
    } else if (model === ModelsEnum[1]) {
        generatedImageUrls = [
            await generateStableDiffusionImageUrl(decodedPrompt),
        ];
    } else {
        console.error("Invalid model", { model });
        return <div>Invalid model</div>;
    }

    const promptId = await addToPromptTable({ prompt: decodedPrompt });

    for (const imageUrl of generatedImageUrls) {
        await addToImageTable({ imageUrl, promptId });
    }

    redirect(`/select/${promptId}`);
}
