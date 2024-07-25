import { envServer } from "@/lib/env/server";
import Image from "next/image";
import { removeBackgroundFromImageUrl } from "remove.bg";

export default async function RemoveBackgroundPage(params: {
    searchParams: { url: string };
}) {
    const { url } = params.searchParams;
    console.log({ url });
    const removedBgBase64 = await removeBackground(url);
    return (
        <Image
            width={1000}
            height={1000}
            alt="Removed background image"
            src={`data:image/png;base64, ${removedBgBase64}`}
        />
    );
}

async function removeBackground(url: string): Promise<string> {
    try {
        const result = await removeBackgroundFromImageUrl({
            url,
            apiKey: envServer.REMOVE_BG_API_KEY,
            size: "preview",
        });

        return result.base64img;
    } catch (error) {
        console.error({ error });
        throw new Error("Error removing background");
    }
}
