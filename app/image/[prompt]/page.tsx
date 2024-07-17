import { RedirectType, redirect } from "next/navigation";
import { postImageToPrintify } from "@/lib/printify/service";
import { addToImageTable } from "@/db/image";
import { generateOpenAiImageUrl } from "@/lib/images/openai";
import { generateStableDiffusionImageUrl } from "@/lib/images/replicate";

export const maxDuration = 300;

export const ModelsEnum = ["openai", "stable-diffusion"] as const;

export default async function GenerateImagePage(params: {
    params: { prompt: string };
    searchParams: { model: string; imageStyle: string };
}) {
    const { prompt: encodedPrompt } = params.params;
    const decodedPrompt = decodeURIComponent(encodedPrompt);

    if (!encodedPrompt) {
        console.error("Text is required", { params });
        console.error({ decodedPrompt });
        return <div>Text is required</div>;
    }

    const { model, imageStyle } = params.searchParams;

    console.log({ imageStyle });

    const styleString =
        imageStyle !== "undefined" ? `In this style: ${imageStyle}.` : "";

    const concatenatedPrompt = styleString + decodedPrompt;

    console.log({ concatenatedPrompt });

    let generatedImageUrl: string;

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
