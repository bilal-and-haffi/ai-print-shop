import { postUrlImageToPrintify } from "@/lib/printify/postImageToPrintify";
import { addToImageTable } from "@/db/image";
import { generateOpenAiImageUrl } from "@/lib/images/openai";
import { generateStableDiffusionImageUrl } from "@/lib/images/replicate";
import { CountryCode } from "@/lib/stripe/createCheckoutSession";
import { addOptionsToPrompt } from "@/lib/addOptionsToPrompt";
import { redirect, RedirectType } from "next/navigation";

export const maxDuration = 300;

export default async function GenerateImagePage(params: {
    params: { prompt: string };
    searchParams: {
        style: string;
        location: string;
        country: CountryCode;
    };
}) {
    const { prompt: encodedPrompt } = params.params;
    const decodedPrompt = decodeURIComponent(encodedPrompt);

    if (!encodedPrompt) {
        console.error("Text is required", { params });
        console.error({ decodedPrompt });
        return <div>Text is required</div>;
    }

    const isTestPrompt = decodedPrompt === "test prompt";

    const { style, location, country } = params.searchParams;

    if (!country) {
        console.error({ country, msg: "No country, GenerateImagePage" });
    }

    const concatenatedPrompt = addOptionsToPrompt({
        style,
        location,
        decodedPrompt,
    });

    let generatedImageUrl: string;

    if (isTestPrompt) {
        console.log(
            "Test prompt detected. Setting imageurl to test image. (Saving costs).",
        );
        const testImageUrl =
            "https://cdn.pixabay.com/photo/2014/06/03/19/38/test-361512_640.jpg";
        generatedImageUrl = testImageUrl;
    } else {
        try {
            generatedImageUrl = await generateOpenAiImageUrl({
                prompt: concatenatedPrompt,
                quality: "hd",
            });
        } catch (error) {
            console.error({
                error,
                msg: "open ai gen failed so using stable diffusion",
            });
            generatedImageUrl =
                await generateStableDiffusionImageUrl(concatenatedPrompt);
        }
    }

    const { id: printifyImageId } = await postUrlImageToPrintify(
        generatedImageUrl,
        "generatedImage.png",
    );

    await addToImageTable({
        prompt: concatenatedPrompt,
        printifyImageId: printifyImageId,
        printifyImageUrl: generatedImageUrl,
    });

    redirect(
        `/product/${printifyImageId}?country=${country}`,
        RedirectType.replace,
    );
}
