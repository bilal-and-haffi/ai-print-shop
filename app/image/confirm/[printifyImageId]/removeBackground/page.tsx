import { Button } from "@/components/ui/button";
import { addToImageTable, getPromptFromImageId } from "@/db/image";
import { envServer } from "@/lib/env/server";
import { postBase64ImageToPrintify } from "@/lib/printify/postBase64ImageToPrintify";
import Image from "next/image";
import Link from "next/link";
import { removeBackgroundFromImageUrl } from "remove.bg";

export default async function RemoveBackgroundPage({
    params: { printifyImageId },
    searchParams: { url, country },
}: {
    searchParams: { url: string; country: string };
    params: { printifyImageId: string };
}) {
    if (!url || !country) {
        throw new Error("Missing url or country");
    }

    const removedBackgroundImageBase64Contents = await removeBackgroundAndReturnBase64Image(url);

    const prompt = await getPromptFromImageId(printifyImageId);

    const { id: newPrintifyImageId } = await postBase64ImageToPrintify(
        removedBackgroundImageBase64Contents,
        "generatedImage.png",
    );

    await addToImageTable({
        prompt,
        printifyImageId: newPrintifyImageId,
        printifyImageUrl: url,
    });

    return (
        <div className="flex flex-col items-center gap-4">
            <Image
                alt="Removed background image"
                src={`data:image/png;base64, ${removedBackgroundImageBase64Contents}`}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                unoptimized
                width={500}
                height={500}
            />
            <Link
                className="w-full md:w-3/5"
                href={`/product/${newPrintifyImageId}?country=${country}`}
            >
                <Button className="w-full md:w-3/5">See products!</Button>
            </Link>
            <Link
                className="w-full"
                href={`/image/confirm/${printifyImageId}?url=${encodeURIComponent(url)}&country=${country}`}
            >
                <Button className="w-full" variant={"secondary"}>
                    Un Remove background
                </Button>
            </Link>
        </div>
    );
}

async function removeBackgroundAndReturnBase64Image(url: string): Promise<string> {
    // if (envServer.VERCEL_ENV !== "production") {
    //     console.log(
    //         "Not removing background because not production and we only have 50 free credits a month",
    //     );
    //     return url;
    // }
    try {
        const result = await removeBackgroundFromImageUrl({
            url,
            apiKey: envServer.REMOVE_BG_API_KEY,
            size: "preview", // This limits to 500x500 quality. Need to buy credits for better quality
        });

        console.log({ result });

        console.log(result.base64img);

        return `${result.base64img}`;
    } catch (error) {
        console.error({ error });
        throw new Error("Error removing background");
    }
}
