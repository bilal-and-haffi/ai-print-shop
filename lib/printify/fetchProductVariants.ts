"use server";
import { PRINTIFY_BASE_URL } from "@/app/data/consts";
import { Variant } from "@/interfaces/Printify/Variant";
import { envServer } from "@/lib/env/server";

export async function fetchProductVariants(
    blueprintId: number,
    printProviderId: number,
): Promise<Variant[]> {
    console.log({
        msg: "Fetching product variants",
        blueprintId,
        printProviderId,
    });
    const endpoint = `${PRINTIFY_BASE_URL}/v1/catalog/blueprints/${blueprintId}/print_providers/${printProviderId}/variants.json`;
    const options: RequestInit = {
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${envServer.PRINTIFY_API_TOKEN}`,
        },
    };
    console.log({ endpoint, options });
    const response = await fetch(endpoint, options);
    console.log({ response });
    const responseJson = await response.json();
    console.log({ responseJson });
    return responseJson.variants;
}
