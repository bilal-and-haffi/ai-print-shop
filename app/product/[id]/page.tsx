import { ProductDetails } from "@/app/components/ProductDetails";
import { retrieveAProduct } from "../../../functions/retrieveAProduct";
import { PRINTIFY_BASE_URL } from "@/app/consts";
import { logWithTimestamp } from "@/functions/logWithTimeStamp";
import * as nav from "next/navigation";

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const retrievedProduct = await retrieveAProduct(params.id);
  await publishingSucceeded(params.id);

  return (
    <ProductDetails retrievedProduct={retrievedProduct} withBuyNow={true} />
  );
}

async function publishingSucceeded(product_id: string) {
  const endpoint = `${PRINTIFY_BASE_URL}/v1/shops/${process.env.SHOP_ID}/products/${product_id}/publishing_succeeded.json`;
  const body = JSON.stringify({
    external_id: product_id,
    handle: "http:www.example.com/product/" + product_id,
  });
  logWithTimestamp({ endpoint, body });
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${process.env.PRINTIFY_API_TOKEN}`,
      body,
    },
  });
  const publishingSucceededResponse = await response.json();
  logWithTimestamp({ publishingSucceededResponse });
}
