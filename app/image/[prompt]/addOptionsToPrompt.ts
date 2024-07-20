export function addOptionsToPrompt({
    style,
    location,
    decodedPrompt,
}: {
    style: string;
    location: string;
    decodedPrompt: string;
}) {
    console.log({ decodedPrompt, style, location });

    const styleString =
        style !== undefined && style !== "None"
            ? `In this style: ${style}. `
            : "";

    const locationString =
        location !== undefined && location !== "None"
            ? `In this location: ${location}. `
            : "";

    const concatenatedPrompt = styleString + locationString + decodedPrompt;

    console.log({ concatenatedPrompt });

    return concatenatedPrompt;
}
