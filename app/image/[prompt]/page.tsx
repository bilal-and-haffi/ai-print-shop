import { RedirectType, redirect } from "next/navigation";
import { postImageToPrintify } from "@/lib/printify/service";
import { addToImageTable } from "@/db/image";
import { generateOpenAiImageUrl } from "@/lib/images/openai";
import { generateStableDiffusionImageUrl } from "@/lib/images/replicate";
import { modelOptions } from "@/app/data/modelOptions";
import { addOptionsToPrompt } from "./addOptionsToPrompt";

export const maxDuration = 300;

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

    const isTestPrompt = decodedPrompt === "test prompt";

    const { model, style, location } = params.searchParams;

    const concatenatedPrompt = addOptionsToPrompt({
        style,
        location,
        decodedPrompt,
    });

    let generatedImageUrl: string;
    console.log({ modelOptions });

    if (isTestPrompt) {
        console.log(
            "Test prompt detected. Setting imageurl to test image. (Saving costs).",
        );
        const testImageUrl =
            "https://cdn.pixabay.com/photo/2014/06/03/19/38/test-361512_640.jpg";
        generatedImageUrl = testImageUrl;
    } else if (model === modelOptions[0]) {
        generatedImageUrl = await generateOpenAiImageUrl(concatenatedPrompt);
    } else if (model === modelOptions[1]) {
        generatedImageUrl =
            await generateStableDiffusionImageUrl(concatenatedPrompt);
    } else {
        console.error("Invalid model", { model });
        return <div>Invalid model</div>;
    }

    console.error({ generatedImageUrl });
    const { id: printifyImageId } = await postImageToPrintify(
        generatedImageUrl,
        "generatedImage.png",
    );

    console.error({ printifyImageId });

    await addToImageTable({
        prompt: concatenatedPrompt,
        printifyImageId: printifyImageId,
        printifyImageUrl: generatedImageUrl,
    });

    redirect(`/product/${printifyImageId}`, RedirectType.replace);
}
