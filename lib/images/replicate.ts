import { log } from "console";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_KEY,
});

export const revalidate = 0;


export const generateReplicateImageUrl: (prompt: string) => Promise<string> = async (
  prompt: string,
) => {
  try {
    log("Generating image with prompt:", prompt);
    const output = await replicate.run(
      "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
      {
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
          num_inference_steps: 25
        }
      }
    ) as string[];
    log("output:", output);
    return output[0];
  } catch (error) {
    console.error("Error generating image:", error);
    throw new Error("Error generating image");
  }
}