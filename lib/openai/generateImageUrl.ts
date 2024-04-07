import OpenAI from "openai";

export const generateImageUrl: (prompt: string) => Promise<string> = async (
    prompt: string,
) => {
    const isTestPrompt = prompt === "test";
    if (isTestPrompt && process.env.NODE_ENV === "development") {
        console.log("Test prompt detected. Returning test image. (Saving costs).")
        return "https://oaidalleapiprodscus.blob.core.windows.net/private/org-FLazZlTS0p7egMXaAKZzIe20/user-Z2REKmhVOXP6HYDZ7uA1smQ0/img-zaG093GtAeO8KPmSgqiFL1bI.png?st=2024-04-07T11%3A13%3A54Z&se=2024-04-07T13%3A13%3A54Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-04-06T23%3A53%3A09Z&ske=2024-04-07T23%3A53%3A09Z&sks=b&skv=2021-08-06&sig=eKdZ0aCYdwQ/wJByR1RMgFpHIeXMKwOPMQa7f8IDPYg%3D";
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
        console.error(
            "API key not found. Please set the OPENAI_API_KEY in your .env file.",
        );
        throw new Error("API key not found");
    }

    const openai = new OpenAI({ apiKey });

    console.log("Generating image...", { prompt });

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
