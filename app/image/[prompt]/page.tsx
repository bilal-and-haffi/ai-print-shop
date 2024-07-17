import { RedirectType, redirect } from "next/navigation";
import { postImageToPrintify } from "@/lib/printify/service";
import { addToImageTable } from "@/db/image";
import { generateOpenAiImageUrl } from "@/lib/images/openai";
import { generateStableDiffusionImageUrl } from "@/lib/images/replicate";

export const maxDuration = 300;
const ModelsEnum = ["openai", "stable-diffusion"] as const;

export default async function GenerateImagePage(params: {
    params: { prompt: string };
    searchParams: { model: string; style: string; location: string };
}) {
    const { prompt: encodedPrompt } = params.params;
    const decodedPrompt = decodeURIComponent(encodedPrompt);

    if (!encodedPrompt) {
        console.error("Text is required", { params });
        console.error({ decodedPrompt });
        return <div>Text is required</div>;
    }

    const { model, style, location } = params.searchParams;

    console.log({ model, style, location });

    const styleString =
        style !== "undefined" ? `In this style: ${style}. ` : "";

    const locationString =
        location !== undefined ? `In this location: ${location}. ` : "";

    const concatenatedPrompt = styleString + locationString + decodedPrompt;

    console.log({ concatenatedPrompt });

    let generatedImageUrl: string;
    console.log({ ModelsEnum });

    if (model === ModelsEnum[0]) {
        generatedImageUrl = await generateOpenAiImageUrl(concatenatedPrompt);
    } else if (model === ModelsEnum[1]) {
        generatedImageUrl =
            await generateStableDiffusionImageUrl(concatenatedPrompt);
    } else {
        console.error("Invalid model", { model });
        return <div>Invalid model</div>;
    }

    const { id: printifyImageId } = await postImageToPrintify(
        generatedImageUrl,
        "generatedImage.png",
    );

    await addToImageTable({
        prompt: concatenatedPrompt,
        printifyImageId: printifyImageId,
        printifyImageUrl: generatedImageUrl,
    });

    redirect(`/product/${printifyImageId}`, RedirectType.replace);
}
