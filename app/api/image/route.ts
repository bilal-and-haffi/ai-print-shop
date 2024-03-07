import { log } from "@/functions/log";
import { generateReplicateImageUrl } from "@/lib/images/replicate";

export async function POST(request: Request) {
  log("Received request to generate image");
  const { prompt } = await request.json()
  const url = await generateReplicateImageUrl(prompt);
  return Response.json({ url })
}