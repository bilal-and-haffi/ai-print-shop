"use server";

import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function checkPromptForIssues(prompt: string): Promise<string> {
    const response = await openai.chat.completions.create({
        model: "gpt-4o", // TODO: Check pricing, but this performs better than gpt-3.5-turbo
        messages: [
            {
                role: "system",
                content: `
                Determine if the following prompt is likely to result in:
                1. Copyrighted images (score 1-10 the likelihood and severity of copyright infringement).
                2. Content that violates terms of service (score 1-10 the likelihood and severity of TOS violation).

                Reply with 'NO' if neither applies.
                Reply with 'YES' if either applies, and provide the score and a concise explanation.
                Favor 'NO' if the prompt is requesting an abstract or general concept, or if it is a common theme in art.
                Favor 'YES' if the prompt is requesting images with a specific named product, character, or scene, or if it contains harmful, inappropriate, or restricted content.

                Example:
                - YES, 6 - The prompt is likely to result in images that are similar to existing works and might violate TOS due to explicit content.
                - NO
                `,
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
        console.error("No response from OpenAI for prompt check...");
        return "NO";
    }

    return completion;
}
