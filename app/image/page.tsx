import { addToImageTable } from "@/db/image";
import { generateOpenAiImageUrl } from "@/lib/images/openai";
import { generateStableDiffusionImageUrl } from "@/lib/images/replicate";
import { CountryCode } from "@/lib/stripe/createCheckoutSession";
import { addOptionsToPrompt } from "@/lib/addOptionsToPrompt";
import { redirect, RedirectType } from "next/navigation";
import { track } from "@vercel/analytics/server";
import { postUrlImageToPrintify } from "@/lib/printify/image/postImageToPrintify";

export const maxDuration = 300;

export default async function GenerateImagePage({
    searchParams: { style, location, country, prompt: encodedPrompt },
}: {
    searchParams: {
        style: string;
        location: string;
        country: CountryCode;
        prompt: string;
    };
}) {
    track("Generate image page");
    const decodedPrompt = decodeURIComponent(encodedPrompt);
    console.log({ msg: "Image Page", decodedPrompt, style, location, country });

    if (!encodedPrompt) {
        console.error("Text is required", {
            style,
            location,
            country,
            encodedPrompt,
        });
        console.error({ decodedPrompt });
        return <div>Prompt is required</div>;
    }

    const isTestPrompt = decodedPrompt === "test prompt";

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
        `/product/T%20Shirt?country=${country}&imageId=${printifyImageId}&size=L&color=Black`,
        RedirectType.replace,
    );
}
