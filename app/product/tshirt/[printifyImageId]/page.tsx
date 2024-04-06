import {
  T_SHIRT_PRICE_IN_GBP,
  printCleverId,
  unisexHeavyCottonTeeBlueprintId,
} from "@/app/data/consts";
import { ProductDetails } from "@/components/ProductDetails";
import { Button } from "@/components/ui/button";
import {
  constructPrintifyProductRequest,
  createPrintifyProduct,
  retrieveAProduct,
} from "@/lib/printify/service";
import Link from "next/link";

export default async function TShirtPage({
  params,
  searchParams,
}: {
  params: { printifyImageId: string };
  searchParams: { size?: number; color?: number };
}) {
  const { printifyImageId } = params;
  const { size, color } = searchParams;
  console.log({ printifyImageId });

  const teeShirtProductRequest = await constructPrintifyProductRequest({
    printifyImageId: printifyImageId,
    printProviderId: printCleverId,
    blueprintId: unisexHeavyCottonTeeBlueprintId,
  });

  const { id: teeShirtPrintifyProductId } = await createPrintifyProduct(
    teeShirtProductRequest,
  );

  const retrievedProduct = await retrieveAProduct(teeShirtPrintifyProductId);

  return (
    <>
      <Link href={`/product/hoodie/${printifyImageId}`}>
        <Button>Hoodie</Button>
      </Link>
      <ProductDetails
        retrievedProduct={retrievedProduct}
        withBuyNow={true}
        size={size}
        color={color}
      />
    </>
  );
}
