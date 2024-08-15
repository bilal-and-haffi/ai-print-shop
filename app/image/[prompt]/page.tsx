import { postUrlImageToPrintify } from "@/lib/printify/postImageToPrintify";
import { addToImageTable } from "@/db/image";
import { generateOpenAiImageUrl } from "@/lib/images/openai";
import { generateStableDiffusionImageUrl } from "@/lib/images/replicate";
import { CountryCode } from "@/lib/stripe/createCheckoutSession";
import { addOptionsToPrompt } from "@/lib/addOptionsToPrompt";
import { redirect, RedirectType } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft, RefreshCw } from "lucide-react";
import { ImageWithLoadingAndError } from "@/components/ImageWithLoadingAndError";

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
    const { style, location, country } = params.searchParams;
    const decodedPrompt = decodeURIComponent(encodedPrompt);
    console.log({ msg: "Image Page", decodedPrompt, style, location, country });

    if (!encodedPrompt) {
        console.error("Text is required", { params });
        console.error({ decodedPrompt });
        return <div>Text is required</div>;
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

    return (
        <div className="space-y-4">
            <div className="space-x-2">
                <Link
                    href={`/create?country=${country}&prompt=${encodedPrompt}`}
                >
                    <Button data-testid="Go back" variant={"outline"}>
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <a href={`/image/${encodedPrompt}?country=${country}`}>
                    <Button
                        data-testid="Generate new image with same prompt button"
                        variant={"outline"}
                    >
                        <RefreshCw className="h-4 w-4" />
                    </Button>
                </a>
            </div>
            <div>
                <ImageWithLoadingAndError
                    src={generatedImageUrl}
                    width={500}
                    height={500}
                />
            </div>
            <a
                href={`/product/T%20Shirt?country=${country}&imageId=${printifyImageId}&size=L&color=Black`}
            >
                <Button className="p-2">Continue</Button>
            </a>
        </div>
    );
}
