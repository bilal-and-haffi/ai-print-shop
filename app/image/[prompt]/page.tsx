import { RedirectType, redirect } from "next/navigation";
import { PrintifyProductRequest } from "@/interfaces/PrintifyTypes";
import OpenAI from "openai";
import { log } from "@/utils/log";
import {
  createProduct,
  fetchProductVariants,
  postImageToPrintify,
} from "@/lib/printify/service";
import {
  printCleverId,
  unisexHeavyCottonTeeBlueprintId,
} from "@/app/data/consts";

export const maxDuration = 300;

export default async function ImagePage(params: {
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

  const url = await generateImageUrl(decodedPrompt);
  const image = await postImageToPrintify(url, "generatedImage.png");
  const [printProviderId, blueprintId] = [
    printCleverId,
    unisexHeavyCottonTeeBlueprintId,
  ];
  const variants = await fetchProductVariants(blueprintId, printProviderId);
  const variantIds = variants.map((variant) => variant.id);

  const teeShirtProductRequest = constructTeeShirtProductRequest({
    imageId: image.id,
    prompt: decodedPrompt,
    printProviderId,
    productVariantIds: variantIds,
    blueprintId,
  });
  const createProductResponse = await createProduct(teeShirtProductRequest);
  const productId = createProductResponse.id;

  redirect(`/product/${productId}`, RedirectType.replace);
}

const generateImageUrl: (prompt: string) => Promise<string> = async (
  prompt: string,
) => {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error(
      "API key not found. Please set the OPENAI_API_KEY in your .env file.",
    );
    throw new Error("API key not found");
  }

  const openai = new OpenAI({ apiKey });

  log("Generating image...", { prompt });

  const model = process.env.NODE_ENV === "production" ? "dall-e-3" : "dall-e-2";

  const response = await openai.images.generate({
    prompt,
    model,
    n: 1,
    quality: "hd",
    response_format: "url",
    style: "natural",
  });

  const url = response.data[0].url!;
  log("Generated image:", { url });

  return url;
};

function constructTeeShirtProductRequest({
  imageId,
  prompt,
  printProviderId,
  productVariantIds,
  blueprintId,
}: {
  imageId: string;
  prompt: string;
  printProviderId: number;
  productVariantIds: number[];
  blueprintId: number;
}) {
  const capitalisedPrompt = prompt.charAt(0).toUpperCase() + prompt.slice(1);
  const productRequest: PrintifyProductRequest = {
    blueprint_id: blueprintId,
    description:
      "Your new favorite t-shirt. Soft, comfortable, and high-quality.",
    print_areas: [
      {
        variant_ids: productVariantIds,
        placeholders: [
          {
            position: "front",
            images: [
              {
                id: imageId,
                x: 0.5,
                y: 0.5,
                scale: 1,
                angle: 0,
              },
            ],
          },
        ],
      },
    ],
    print_provider_id: printProviderId,
    title: capitalisedPrompt,
    variants: productVariantIds.map((variantId) => ({
      id: variantId,
      price: 1,
    })),
  };
  return productRequest;
}
