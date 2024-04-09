import OpenAI from "openai";

export const generateOpenAiImageUrl = async (prompt: string) => {
    const isTestPrompt = prompt === "test";
    if (isTestPrompt && process.env.NODE_ENV === "development") {
        console.log(
            "Test prompt detected. Returning test image. (Saving costs).",
        );
        const testImageUrl =
            "https://static.wikia.nocookie.net/dragonball/images/b/ba/Goku_anime_profile.png/revision/latest?cb=20220825041430";

        return testImageUrl;
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
        console.error(
            "API key not found. Please set the OPENAI_API_KEY in your .env file.",
        );
        throw new Error("API key not found");
    }

    const openai = new OpenAI({ apiKey });

    console.log("Generating image with openai...", { prompt });

    const model =
        process.env.NODE_ENV === "production" ? "dall-e-3" : "dall-e-2";

    const response = await openai.images.generate({
        prompt,
        model,
        n: 1,
        quality: "hd",
        response_format: "url",
        style: "natural",
    });

    const url = response.data[0].url!;
    console.log("Generated image:", { url });

    return url;
};
