import OpenAI from "openai";
import { envServer } from "../env/server";

export const generateOpenAiImageUrls = async ({
    prompt,
    numberOfImages,
    style,
}: {
    prompt: string;
    numberOfImages: number;
    style: "natural" | "vivid";
}): Promise<string[]> => {
    const isTestPrompt = prompt === "test prompt";

    if (isTestPrompt) {
        console.log(
            "Test prompt detected. Returning test image. (Saving costs).",
        );
        const testImageUrl =
            "https://static.wikia.nocookie.net/dragonball/images/b/ba/Goku_anime_profile.png/revision/latest?cb=20220825041430";

        return new Array(numberOfImages).fill(testImageUrl);
    }

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
        n: numberOfImages,
        quality: "hd",
        response_format: "url",
        style,
    });

    const { data } = response;
    console.log({ data });

    const urls = data.map((datum) => datum.url!); // the '!' is questionable

    return urls;
};
