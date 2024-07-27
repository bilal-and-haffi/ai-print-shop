'use server'
import { testImageBase64 } from "@/app/data/consts";
import { envServer } from "@/lib/env/server";
import { removeBackgroundFromImageUrl } from "remove.bg";


export async function removeBackgroundAndReturnBase64Image(
    url: string
): Promise<string> {
    if (envServer.VERCEL_ENV !== "production") {
        console.log(
            "Not removing background because not production and we only have 50 free credits a month"
        );
        return testImageBase64;
    }

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
