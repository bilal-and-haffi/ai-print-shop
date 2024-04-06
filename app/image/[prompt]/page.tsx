import { RedirectType, redirect } from "next/navigation";
import { generateImageUrl } from "@/lib/openai/generateImageUrl";
import { postImageToPrintify } from "@/lib/printify/service";
import { addToImageTable } from "@/db/image";

export const maxDuration = 300;

export default async function GenerateImagePage(params: {
  params: { prompt: string };
  searchParams: { generateNew?: string };
}) {
  const { prompt: encodedPrompt } = params.params;
  const decodedPrompt = decodeURIComponent(encodedPrompt);

  if (!encodedPrompt) {
    console.error("Text is required", { params });
    console.error({ decodedPrompt });
    return <div>Text is required</div>;
  }

  const openaiImageUrl = await generateImageUrl(decodedPrompt);

  const { id: printifyImageId } = await postImageToPrintify(
    openaiImageUrl,
    "generatedImage.png",
  );

  await addToImageTable({
    prompt: decodedPrompt,
    printifyImageId: printifyImageId,
    printifyImageUrl: openaiImageUrl,
  });

  redirect(`/product/tshirt/${printifyImageId}`, RedirectType.replace);
}
