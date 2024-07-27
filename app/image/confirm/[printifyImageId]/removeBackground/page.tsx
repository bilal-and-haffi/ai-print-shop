import { Button } from "@/components/ui/button";
import { addToImageTable, getPromptFromImageId } from "@/db/image";
import { postBase64ImageToPrintify } from "@/lib/printify/postBase64ImageToPrintify";
import Image from "next/image";
import Link from "next/link";
import { removeBackgroundAndReturnBase64Image } from "../../../../../actions/removeBackgroundAndReturnBase64Image";

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

    const removedBackgroundImageBase64Contents =
        await removeBackgroundAndReturnBase64Image(url);

    const prompt = await getPromptFromImageId(printifyImageId);

    const { id: newPrintifyImageId, preview_url } =
        await postBase64ImageToPrintify(
            removedBackgroundImageBase64Contents,
            "generatedImage.png",
        );

    await addToImageTable({
        prompt,
        printifyImageId: newPrintifyImageId,
        printifyImageUrl: preview_url,
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
                className="w-full"
                href={`/product/${newPrintifyImageId}?country=${country}`}
            >
                <Button className="w-full">See products!</Button>
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
