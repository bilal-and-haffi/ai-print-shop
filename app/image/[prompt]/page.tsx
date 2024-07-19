import { RedirectType, redirect } from "next/navigation";
import { postImageToPrintify } from "@/lib/printify/service";
import { addToImageTable } from "@/db/image";
import { generateOpenAiImageUrl } from "@/lib/images/openai";
import { generateStableDiffusionImageUrl } from "@/lib/images/replicate";
import { modelOptions } from "@/app/data/modelOptions";

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

    console.log({ model, style, location });

    const styleString = style !== undefined ? `In this style: ${style}. ` : "";

    const locationString =
        location !== undefined ? `In this location: ${location}. ` : "";

    const concatenatedPrompt = styleString + locationString + decodedPrompt;

    console.log({ concatenatedPrompt });

    let generatedImageUrl: string;
    console.log({ modelOptions });

    if (isTestPrompt) {
        console.log(
            "Test prompt detected. Setting imageurl to test image. (Saving costs).",
        );
        const testImageUrl =
            "https://oaidalleapiprodscus.blob.core.windows.net/private/org-FLazZlTS0p7egMXaAKZzIe20/user-Z2REKmhVOXP6HYDZ7uA1smQ0/img-m55bSHBXCPoDrexVigKF1yMh.png?st=2024-07-18T12%3A44%3A35Z&se=2024-07-18T14%3A44%3A35Z&sp=r&sv=2023-11-03&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-07-18T13%3A18%3A42Z&ske=2024-07-19T13%3A18%3A42Z&sks=b&skv=2023-11-03&sig=S71zzbz719wDUpd47631EFSbG2AHy8p4zmZYZvrBurg%3D";
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

    const { id: printifyImageId } = await postImageToPrintify(
        generatedImageUrl,
        "generatedImage.png",
    );

    console.log({ printifyImageId });

    await addToImageTable({
        prompt: concatenatedPrompt,
        printifyImageId: printifyImageId,
        printifyImageUrl: generatedImageUrl,
    });

    redirect(`/product/${printifyImageId}`, RedirectType.replace);
}
