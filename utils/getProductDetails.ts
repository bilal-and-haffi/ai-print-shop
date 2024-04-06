import { PRINTIFY_BASE_URL } from "@/app/data/consts";

interface EssentialProductDetails {
  id: number;
  color: string;
  size: string;
}

interface Placeholder {
  position: string;
  height: number;
  width: number;
}

interface Options {
  color: string;
  size: string;
}

interface Variant {
  id: number;
  title: string;
  options: Options;
  placeholders: Placeholder[];
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
