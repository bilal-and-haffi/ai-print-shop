import { envServer } from "@/lib/env/server";
import Image from "next/image";
import { removeBackgroundFromImageUrl } from "remove.bg";

export default async function RemoveBackgroundPage(params: {
    searchParams: { url: string };
}) {
    const { url } = params.searchParams;
    console.log({ url });
    const removedBackgroundImageUrl = await removeBackground(url);
    return (
        <Image
            alt="Removed background image"
            src={removedBackgroundImageUrl}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            unoptimized
            width={500}
            height={500}
        />
    );
}

async function removeBackground(url: string): Promise<string> {
    if (envServer.VERCEL_ENV !== "production") {
        console.log(
            "Not removing background because not production and we only have 50 free credits a month",
        );
        return url;
    }
    try {
        const result = await removeBackgroundFromImageUrl({
            url,
            apiKey: envServer.REMOVE_BG_API_KEY,
            size: "preview", // This limits to 500x500 quality. Need to buy credits for better quality
        });

        return `data:image/png;base64, ${result.base64img}`;
    } catch (error) {
        console.error({ error });
        throw new Error("Error removing background");
    }
}
