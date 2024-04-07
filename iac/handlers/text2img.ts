import Replicate from "replicate";
import { APIGatewayEvent } from "aws-lambda";

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_KEY,
});

export async function generateReplicateImageUrl(
    prompt: string,
): Promise<string> {
    console.log("Generating image with replicate...", { prompt });
    let prediction = await replicate.predictions.create({
        version:
            "ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4",
        input: {
            width: 768,
            height: 768,
            prompt: `IMAGE PROMPT: ${prompt}`,
            refine: "expert_ensemble_refiner",
            scheduler: "K_EULER",
            lora_scale: 0.6,
            num_outputs: 1,
            guidance_scale: 7.5,
            apply_watermark: false,
            high_noise_frac: 0.8,
            negative_prompt: "",
            prompt_strength: 0.8,
            num_inference_steps: 25,
        },
    });
    prediction = await replicate.predictions.get(prediction.id);
    prediction = await replicate.wait(prediction, { interval: 1000 });
    return prediction.output[0];
}

export const handler = async (event: APIGatewayEvent) => {
    console.log("Received event", event);

    const reqBody = JSON.parse(event.body || "{}");

    console.log("Request body", reqBody);

    try {
        const imageUrl = await generateReplicateImageUrl(reqBody.prompt);
        return {
            statusCode: 200,
            body: JSON.stringify({
                imageUrl,
            }),
        };
    } catch (err) {
        console.log(err);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: "some error happened",
                error: err,
            }),
        };
    }
};
