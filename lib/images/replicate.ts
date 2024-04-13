import { envServer } from "@/lib/env/server";

export async function generateStableDiffusionImageUrl(
    prompt: string,
): Promise<string> {
    const baseUrl = envServer.AI_GIFTS_API_URL as string;
    const resp = await fetch(`${baseUrl}/text2img`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            prompt: `IMAGE PROMPT: ${prompt}`,
        }),
    });

    const data = await resp.json();

    return data.imageUrl;
}
