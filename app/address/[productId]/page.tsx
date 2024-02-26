import { AddressForm } from "@/app/components/AddressForm";
import { PRINTIFY_BASE_URL } from "@/app/consts";
import { log } from "@/functions/log";
import {
  PrintifyShippingRequest,
  PrintifyShippingResponse,
} from "@/interfaces/PrintifyTypes";

export default async function Page(params: { params: { productId: string } }) {
  const { productId } = params.params;

  if (!productId) {
    console.error("Product ID is required", { params });
    console.error({ productId });
    return <div>Product ID is required</div>;
  }

  return <AddressForm productId={productId} />;
}
