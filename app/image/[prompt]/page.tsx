import { RedirectType, redirect } from "next/navigation";
import { postImageToPrintify } from "@/lib/printify/service";
import { addToImageTable } from "@/db/image";
import { generateOpenAiImageUrl } from "@/lib/images/openai";
import { generateStableDiffusionImageUrl } from "@/lib/images/replicate";

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

    let generatedImageUrl: string;
    if (model === ModelsEnum[0]) {
        generatedImageUrl = await generateOpenAiImageUrl(decodedPrompt);
    } else if (model === ModelsEnum[1]) {
        generatedImageUrl =
            await generateStableDiffusionImageUrl(decodedPrompt);
    } else {
        console.error("Invalid model", { model });
        return <div>Invalid model</div>;
    }

    const { id: printifyImageId } = await postImageToPrintify(
        generatedImageUrl,
        "generatedImage.png",
    );

    await addToImageTable({
        prompt: decodedPrompt,
        printifyImageId: printifyImageId,
        printifyImageUrl: generatedImageUrl,
    });

    redirect(`/product/${printifyImageId}`, RedirectType.replace);
}
