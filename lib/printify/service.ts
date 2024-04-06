import { PRINTIFY_BASE_URL } from "@/app/data/consts";
import { v4 as uuidv4 } from "uuid";
import {
  AddressTo,
  EssentialProductDetails,
  LineItemBase,
  PrintifyImageResponse,
  PrintifyOrderExistingProductRequest,
  PrintifyOrderResponse,
  PrintifyProductRequest,
  RetrieveProductResponse,
  Variant,
} from "@/interfaces/PrintifyTypes";
import { getPromptFromImageId } from "@/db/image";

export async function constructPrintifyProductRequest({
  printifyImageId,
  printProviderId,
  blueprintId,
}: {
  printifyImageId: string;
  printProviderId: number;
  blueprintId: number;
}) {
  const variants = await fetchProductVariants(blueprintId, printProviderId);
  const variantIds = variants.map((variant) => variant.id);
  const prompt = await getPromptFromImageId(printifyImageId);

  const productRequest: PrintifyProductRequest = {
    blueprint_id: blueprintId,
    description: "",
    print_areas: [
      {
        variant_ids: variantIds,
        placeholders: [
          {
            position: "front",
            images: [
              {
                id: printifyImageId,
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
    title: prompt,
    variants: variantIds.map((variantId) => ({
      id: variantId,
      price: 1,
    })),
  };
  return productRequest;
}

export async function createPrintifyOrderForExistingProduct(
  line_items: LineItemBase[],
  shipping_method: number,
  address_to: AddressTo,
) {
  const endpoint = `${PRINTIFY_BASE_URL}/v1/shops/${process.env.SHOP_ID}/orders.json`;
  const body: PrintifyOrderExistingProductRequest = {
    external_id: uuidv4(),
    line_items,
    shipping_method,
    send_shipping_notification: true,
    address_to,
  };

  const options: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${process.env.PRINTIFY_API_TOKEN}`,
    },
    body: JSON.stringify(body),
  };
  console.log({ endpoint, options });
  const orderResponse = (await (
    await fetch(endpoint, options)
  ).json()) as PrintifyOrderResponse;

  console.log({ orderId: orderResponse.id });
  return orderResponse;
}

export async function retrieveAProduct(product_id: string) {
  const endpoint = `${PRINTIFY_BASE_URL}/v1/shops/${process.env.SHOP_ID}/products/${product_id}.json`;
  const response = await fetch(endpoint, {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${process.env.PRINTIFY_API_TOKEN}`,
    },
  });
  const product = (await response.json()) as RetrieveProductResponse;

  console.log({ product });

  return product;
}

export async function getOrderDetails(orderId: string) {
  const endpoint = `${PRINTIFY_BASE_URL}/v1/shops/${process.env.SHOP_ID}/orders/${orderId}.json`;
  const response = await fetch(endpoint, {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${process.env.PRINTIFY_API_TOKEN}`,
    },
  });
  const orderDetails = (await response.json()) as PrintifyOrderResponse;
  console.log({ orderDetails });
  return orderDetails;
}

export async function publishPrintifyProduct(product_id: string) {
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

export async function postImageToPrintify(
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

export async function createPrintifyProduct({
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
  console.log({ productRequest, productRequestString });

  const productResponse: any = await fetch(
    `${PRINTIFY_BASE_URL}/v1/shops/${process.env.SHOP_ID}/products.json`,
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
  console.log({ productData });
  return productData;
}

export async function fetchProductVariants(
  blueprintId: number,
  printProviderId: number,
): Promise<Variant[]> {
  const endpoint = `${PRINTIFY_BASE_URL}/v1/catalog/blueprints/${blueprintId}/print_providers/${printProviderId}/variants.json`;
  const options: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${process.env.PRINTIFY_API_TOKEN}`,
    },
  };
  const response = await (await fetch(endpoint, options)).json();
  return response.variants;
}

export function mapProductDetails(variant: Variant): EssentialProductDetails {
  return {
    id: variant.id,
    color: variant.options.color,
    size: variant.options.size,
  };
}
