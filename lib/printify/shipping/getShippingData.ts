"use server";
import { PRINTIFY_BASE_URL } from "@/app/data/consts";
import { envServer } from "@/lib/env/server";

export async function getShippingData({
    blueprint_id,
    print_provider_id,
}: {
    blueprint_id: number;
    print_provider_id: number;
}) {
    const shippingResponse: any = await fetch(
        `${PRINTIFY_BASE_URL}/v1/catalog/blueprints/${blueprint_id}/print_providers/${print_provider_id}/shipping.json`,
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${envServer.PRINTIFY_API_TOKEN}`,
            },
        },
    );

    const shippingData = await shippingResponse.json();

    return shippingData;
}
