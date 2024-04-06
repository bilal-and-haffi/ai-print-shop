import { PRINTIFY_BASE_URL } from "@/app/data/consts";
import { EssentialProductDetails, Variant } from "@/interfaces/PrintifyTypes";


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
