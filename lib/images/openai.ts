import OpenAI from "openai";

export const generateOpenAiImageUrl = async (prompt: string) => {
    const isTestPrompt = prompt === "test";
    if (isTestPrompt && process.env.NODE_ENV === "development") {
        console.log(
            "Test prompt detected. Returning test image. (Saving costs).",
        );
        const testImageUrl =
            "https://oaidalleapiprodscus.blob.core.windows.net/private/org-FLazZlTS0p7egMXaAKZzIe20/user-Z2REKmhVOXP6HYDZ7uA1smQ0/img-Mke4Q3XcO1B5GjrgROAatzbb.png?st=2024-04-07T11%3A41%3A24Z&se=2024-04-07T13%3A41%3A24Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-04-07T00%3A10%3A51Z&ske=2024-04-08T00%3A10%3A51Z&sks=b&skv=2021-08-06&sig=WaxW%2B2HslAXRRC7G66ZIRZJCZlEDE/E9s/ITowJ3IcA%3D";

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
