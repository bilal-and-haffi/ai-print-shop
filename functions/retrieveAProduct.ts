import { PRINTIFY_BASE_URL } from "@/app/consts";
import { logWithTimestamp } from "@/functions/logWithTimeStamp";
import { RetrieveProductResponse } from "@/interfaces/PrintifyTypes";

export async function retrieveAProduct(product_id: string) {
  const endpoint = `${PRINTIFY_BASE_URL}/v1/shops/${process.env.SHOP_ID}/products/${product_id}.json`;
  const response = await fetch(endpoint, {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${process.env.PRINTIFY_API_TOKEN}`,
    },
  });
  const retrievedProduct = (await response.json()) as RetrieveProductResponse;

  logWithTimestamp({ product: retrievedProduct });

  return retrievedProduct;
}
