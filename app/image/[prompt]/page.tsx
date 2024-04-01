import Link from "next/link";
import Image from "next/image";
import {
  PrintifyImageResponse,
  PrintifyProductRequest,
} from "@/interfaces/PrintifyTypes";
import OpenAI from "openai";
import { PRINTIFY_BASE_URL } from "@/app/consts";
import { log } from "@/functions/log";
import { sql } from "@vercel/postgres";

export const maxDuration = 300;
export const dynamic = "force-dynamic";

export default async function ImagePage(params: {
  params: { prompt: string };
}) {
  const { prompt: encodedPrompt } = params.params;

  const decodedPrompt = decodeURIComponent(encodedPrompt);

  if (!encodedPrompt) {
    console.error("Text is required", { params });
    console.error({ decodedPrompt });
    return <div>Text is required</div>;
  }

  const imageRow = await getImageFromDbWithPrompt(decodedPrompt);

  let url;
  let productId;

  if (imageRow) {
    // if image is found in DB - same prompt has been searched before
    log({ imageRow });
    url = imageRow.printify_image_url;
    productId = imageRow.printify_product_id;
  } else {
    log("Image not found in DB", { decodedPrompt });
    url = await generateImageUrl(decodedPrompt);
    const image = await postImageToPrintify(url, "generatedImage.png");

    const createProductResponse = await createProduct(
      constructTeeShirtProductRequest({
        imageId: image.id,
        prompt: decodedPrompt,
      }),
    );

    productId = createProductResponse.id;

    await addImageToDb(decodedPrompt, image.id, url, productId);
    await publishPrintifyProduct(productId); // needed???
  }

  return (
    <div>
      {url && (
        <Image src={url} alt="Generated Image" width={200} height={200} />
      )}
      {productId && <Link href={`/product/${productId}`}>Go to product</Link>}
    </div>
  );
}

interface ImageRow {
  id: number;
  prompt: string;
  printify_image_id: string;
  printify_image_url: string;
  printify_product_id: string;
}

import { z } from "zod";

const imageRowSchema = z.object({
  id: z.number(),
  prompt: z.string(),
  printify_image_id: z.string(),
  printify_image_url: z.string(),
  printify_product_id: z.string(),
});

async function getImageFromDbWithPrompt(
  prompt: string,
): Promise<ImageRow | null> {
  log({ prompt });
  const data = await sql`SELECT * FROM image WHERE prompt=${prompt};`;
  log({ data });
  const imageRow = data.rows;
  log({ imageRow });
  if (imageRow.length > 0) {
    return imageRowSchema.parse(imageRow[0]);
  }

  return null;
}

async function addImageToDb(
  prompt: string,
  printifyImageId: string,
  url: string,
  productId: string,
) {
  const addImageRow =
    await sql`INSERT INTO image (prompt, printify_image_id, printify_image_url, printify_product_id) VALUES (${prompt}, ${printifyImageId}, ${url}, ${productId});`;
  log({ addImageRow });
  return addImageRow;
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
  log({ endpoint, body });
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${process.env.PRINTIFY_API_TOKEN}`,
    },
    body,
  });
  const publishProductResponse = await response.json();
  log({ publishProductResponse });
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
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.error(
        "API key not found. Please set the OPENAI_API_KEY in your .env file.",
      );
      throw new Error("API key not found");
    }

    const openai = new OpenAI({ apiKey });

    log("Generating image...", { prompt });

    const response = await openai.images.generate({
      prompt,
      model: "dall-e-3",
      n: 1,
      quality: "hd",
      response_format: "url",
      style: "natural",
    });

    const url = response.data[0].url!;
    log("Generated image:", { url });

    return url;
  } catch (error) {
    console.error("Error generating image:", error);
    throw new Error("Error generating image");
  }
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
}: {
  imageId: string;
  prompt: string;
}) {
  const DIMONA_TEE_ID = 270;
  const BLACK_LARGE_TEE_VARIANT_ID = 38192;
  const UNISEX_SOFT_TEE_BLUEPRINT_ID = 145;
  const productRequest: PrintifyProductRequest = {
    blueprint_id: UNISEX_SOFT_TEE_BLUEPRINT_ID,
    description:
      "Your new favorite t-shirt. Soft, comfortable, and high-quality.",
    print_areas: [
      {
        variant_ids: [BLACK_LARGE_TEE_VARIANT_ID],
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
    print_provider_id: DIMONA_TEE_ID,
    title: "Your prompt: " + '"' + prompt + '"',
    variants: [
      {
        id: 38192,
        price: 2000,
      },
    ],
  };
  return productRequest;
}
