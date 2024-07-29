export function addOptionsToPrompt({
    style,
    location,
    decodedPrompt,
}: {
    style: string;
    location: string;
    decodedPrompt: string;
}) {
    const styleString =
        style !== undefined && style !== "None"
            ? `In this style: ${style}. `
            : "";

    const locationString =
        location !== undefined && location !== "None"
            ? `In this location: ${location}. `
            : "";

    const concatenatedPrompt = styleString + locationString + decodedPrompt;

    return concatenatedPrompt;
}
