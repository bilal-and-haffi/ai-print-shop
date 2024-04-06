import { ProductDetails } from "@/components/ProductDetails";
import { retrieveAProduct } from "../../../utils/retrieveAProduct";

export default async function ProductPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { size?: number; color?: number };
}) {
  const { size, color } = searchParams;
  const retrievedProduct = await retrieveAProduct(params.id);

  return (
    <ProductDetails
      retrievedProduct={retrievedProduct}
      withBuyNow={true}
      size={size}
      color={color}
    />
  );
}
