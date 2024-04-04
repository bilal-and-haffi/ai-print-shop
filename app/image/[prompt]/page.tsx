import { RedirectType, redirect } from "next/navigation";
import {
  PrintifyImageResponse,
  PrintifyProductRequest,
} from "@/interfaces/PrintifyTypes";
import OpenAI from "openai";
import { PRINTIFY_BASE_URL } from "@/app/data/consts";
import { log } from "@/functions/log";

export const maxDuration = 300;

export const products = {
  dimona: {
    id: 270,
    variants: {
      blackLarge: 38192,
    },
    blueprints: {
      unisexSoftTee: 145,
    },
  },
  printClever: {
    id: 72,
    variants: {
      blackLarge: 12124,
    },
    blueprints: {
      unisexHeavyCottonTee: 6,
    },
  },
};

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
  const createProductResponse = await createProduct(
    constructTeeShirtProductRequest({
      imageId: image.id,
      prompt: decodedPrompt,
      printProviderId: products.printClever.id,
      productVariantId: products.printClever.variants.blackLarge,
      blueprintId: products.printClever.blueprints.unisexHeavyCottonTee,
    }),
  );
  const productId = createProductResponse.id;

  await publishPrintifyProduct(productId); // needed???
  redirect(`/product/${productId}`, RedirectType.replace);
}

async function publishPrintifyProduct(product_id: string) {
  const endpoint = `${PRINTIFY_BASE_URL}/v1/shops/${process.env.SHOP_ID}/products/${product_id}/publish.json`;
  const body = JSON.stringify({
    title: true,
    description: true,
    images: true,
    variants: true,
    tags: true,
    keyFeatures: true,
    shipping_template: true,
  });

  await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${process.env.PRINTIFY_API_TOKEN}`,
    },
    body,
  });
}

async function postImageToPrintify(
  url: string,
  fileName: string,
): Promise<PrintifyImageResponse> {
  try {
    const imageRequest = {
      file_name: fileName,
      url: url,
    };
    const imageRequestString = JSON.stringify(imageRequest);
    const endpoint = `${PRINTIFY_BASE_URL}/v1/uploads/images.json`;

    const imageResponse = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${process.env.PRINTIFY_API_TOKEN}`,
      },
      body: imageRequestString,
    });

    const imageData: PrintifyImageResponse = await imageResponse.json();

    return imageData;
  } catch (error) {
    console.error("Error posting image to Printify", error);
    throw new Error("Error posting image to Printify");
  }
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

async function createProduct({
  blueprint_id,
  description,
  print_areas,
  print_provider_id,
  title,
  variants,
}: PrintifyProductRequest) {
  const productRequest: PrintifyProductRequest = {
    blueprint_id,
    description,
    print_areas,
    print_provider_id,
    title,
    variants,
  };
  const productRequestString = JSON.stringify(productRequest);
  log({ productRequest, productRequestString });

  const productResponse: any = await fetch(
    `https://api.printify.com/v1/shops/${process.env.SHOP_ID}/products.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.PRINTIFY_API_TOKEN}`,
      },
      body: productRequestString,
    },
  );
  const productData = await productResponse.json();
  log({ productData });
  return productData;
}

function constructTeeShirtProductRequest({
  imageId,
  prompt,
  printProviderId,
  productVariantId,
  blueprintId,
}: {
  imageId: string;
  prompt: string;
  printProviderId: number;
  productVariantId: number;
  blueprintId: number;
}) {
  const capitalisedPrompt = prompt.charAt(0).toUpperCase() + prompt.slice(1);
  const productRequest: PrintifyProductRequest = {
    blueprint_id: blueprintId,
    description:
      "Your new favorite t-shirt. Soft, comfortable, and high-quality.",
    print_areas: [
      {
        variant_ids: [productVariantId],
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
    variants: [
      {
        id: productVariantId,
        price: 1,
      },
    ],
  };
  return productRequest;
}
