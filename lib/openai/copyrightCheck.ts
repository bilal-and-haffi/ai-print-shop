"use server";

import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function checkPromptForCopyRight(prompt: string): Promise<string> {
    const response = await openai.chat.completions.create({
        model: "gpt-4o", // TODO: Check pricing, but this performs better than gpt-3.5-turbo
        messages: [
            {
                role: "system",
                content: `
                Determine if the following prompt is likely to result in copyrighted images and
                also score between 1-10 the likelihood and severity of copyright infringement.
                Reply with the YES or NO. If the answer is YES, also add the score and explain the reasoning.
                Favour NO if the prompt is requesting an abstract or general concept, or if it is a common theme in art.
                Favour YES if the prompt is requesting images with a specific named product, character, or scene.
                No need to give reasoning when the answer is NO. i.e just reply with 'NO'.
                i.e YES,6 - The prompt is likely to result in images that are similar to existing works. Give a conise explanation.`,
            },
            {
                role: "user",
                content: prompt,
            },
        ],
        temperature: 0.2,
        max_tokens: 64,
        top_p: 1,
    });

    const completion = response.choices[0].message.content?.trim();

    if (!completion) {
        // FIXME: Do a retry loop
        console.error("No response from openai for copyright check...");
        return "NO";
    }

    return completion;
}
