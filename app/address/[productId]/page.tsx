import { PersonalDetailsForm } from "@/components/PersonalDetailsForm";

export default async function Page(params: { params: { productId: string } }) {
  const { productId } = params.params;

  if (!productId) {
    console.error("Product ID is required", { params });
    console.error({ productId });
    return <div>Product ID is required</div>;
  }

  return <PersonalDetailsForm productId={productId} />;
}
