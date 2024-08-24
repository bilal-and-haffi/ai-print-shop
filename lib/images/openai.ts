import OpenAI from "openai";
import { envServer } from "../env/server";

export const generateOpenAiImageUrl = async ({
    prompt,
    quality,
}: {
    prompt: string;
    quality: "hd" | "standard";
}) => {
    const apiKey = envServer.OPENAI_API_KEY;
    if (!apiKey) {
        console.error(
            "API key not found. Please set the OPENAI_API_KEY in your .env file.",
        );
        throw new Error("API key not found");
    }

    const openai = new OpenAI({ apiKey });

    console.log("Generating image with openai...", { prompt });

    const model =
        envServer.VERCEL_ENV === "production" ? "dall-e-3" : "dall-e-2";

    const response = await openai.images.generate({
        prompt,
        model,
        n: 1,
        quality,
        response_format: "url",
        style: "vivid",
    });

    const url = response.data[0].url;
    if (!url) {
        console.error("No url");
        throw new Error("No url");
    }
    console.log("Generated image:", { url });

    return url;
};
