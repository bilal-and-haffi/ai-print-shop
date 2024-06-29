import { PRINTIFY_BASE_URL } from "@/app/data/consts";
import { Variant } from "@/interfaces/PrintifyTypes";
import { envServer } from "@/lib/env/server";

export async function fetchProductVariants(
    blueprintId: number,
    printProviderId: number,
): Promise<Variant[]> {
    const endpoint = `${PRINTIFY_BASE_URL}/v1/catalog/blueprints/${blueprintId}/print_providers/${printProviderId}/variants.json`;
    const options: RequestInit = {
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${envServer.PRINTIFY_API_TOKEN}`,
        },
    };
    const response = await (await fetch(endpoint, options)).json();
    return response.variants;
}
