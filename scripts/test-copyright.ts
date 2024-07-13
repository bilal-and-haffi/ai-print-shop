// Run this with 'npx ts-node test-copyright.ts'
import OpenAI from "openai";

const OPENAI_API_KEY = "";

const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
});

async function checkPrompt(prompt: string): Promise<string> {
    // try {
    console.log("Checking prompt:", prompt);
    const response = await openai.chat.completions.create({
        // model: "gpt-3.5-turbo",
        model: "gpt-4o",
        messages: [
            {
                role: "system",
                content: `
                Determine if the following prompt is likely to result in copyrighted images and
                also score between 1-10 the likelihood and severity of copyright infringement.
                Reply with the YES or NO. If the answer is YES, also add the score and explain the reasoning.
                Favour NO if the prompt is request an abstract or general concept, or if it is a common theme in art.
                Favour YES if the prompt is requesting images with a specific named product, character, or scene.
                No need to give reasoning when the answer is NO. i.e just reply with 'NO'.
                i.e YES,6 - The prompt is likely to result in images that are similar to existing works. Give a conise explanation.`,
            },
            {
                role: "user",
                content: prompt,
            },
        ],
        temperature: 0.7,
        max_tokens: 64,
        top_p: 1,
    });

    const completion = response.choices[0].message.content?.trim();
    console.log({ completion });

    if (!completion) {
        // FIXME: Do a retry loop
        console.error("No response from openai for copyright check...");
        return "NO";
    }

    return completion;
}

const copy_prompt =
    "Create a pop art-style digital painting depicting Black Panther in a scene referencing Wakanda. Use bold, saturated colors.";

const normal_prompt =
    "Create an inspirational and [adjectives] typography art with [quotes, lyrics, words] arranged in [composition shapes] with creative use of [fonts, sizes, colors, styles, etc.].";

const normal_prompt2 =
    "Create innovative mixed media style digital art combining 3D, glitch art, and photography. Feature futuristic cityscapes with unexpected textures, layers, and dimensions.";

checkPrompt(copy_prompt).then((result) => {
    console.log(
        `Is the prompt likely to result in copyrighted images? ${result}`,
    );
});
