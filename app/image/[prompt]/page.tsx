import { postImageToPrintify } from "@/lib/printify/postImageToPrintify";
import { addToImageTable } from "@/db/image";
import { generateOpenAiImageUrl } from "@/lib/images/openai";
import { generateStableDiffusionImageUrl } from "@/lib/images/replicate";
import { CountryCode } from "@/lib/stripe/createCheckoutSession";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { addOptionsToPrompt } from "@/lib/addOptionsToPrompt";

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

    const { id: printifyImageId } = await postImageToPrintify(
        generatedImageUrl,
        "generatedImage.png",
    );

    await addToImageTable({
        prompt: concatenatedPrompt,
        printifyImageId: printifyImageId,
        printifyImageUrl: generatedImageUrl,
    });

    return (
        <div className="md:1/3 flex flex-col items-center gap-4">
            <Image
                src={generatedImageUrl}
                alt={"Generated Image"}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                unoptimized
                width={500}
                height={500}
            />
            <Link
                className="w-full md:w-3/5"
                href={`/product/${printifyImageId}?country=${country}`}
            >
                <Button className="w-full">Go to product</Button>
            </Link>
            <Link
                className="w-full md:w-3/5"
                href={`/image/removeBackground?url=${encodeURIComponent(generatedImageUrl)}`}
            >
                <Button className="w-full" variant={"secondary"}>Remove background</Button>
            </Link>
        </div>
    );
}
