import { ProductDetails } from "@/components/ProductDetails";
import { retrieveAProduct } from "../../../functions/retrieveAProduct";

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const retrievedProduct = await retrieveAProduct(params.id);

  return (
    <ProductDetails retrievedProduct={retrievedProduct} withBuyNow={true} />
  );
}
