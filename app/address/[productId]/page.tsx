import { PersonalDetailsForm } from "@/app/components/PersonalDetailsForm";
import { PRINTIFY_BASE_URL } from "@/app/data/consts";
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

  return <PersonalDetailsForm productId={productId} />;
}
