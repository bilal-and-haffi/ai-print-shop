// replace me with /v1/catalog/blueprints/{blueprint_id}/print_providers/{print_provider_id}/shipping.json

import { PRINTIFY_BASE_URL } from "@/app/data/consts";
import { envServer } from "@/lib/env/server";

export async function getUkShippingCostInCents({
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
    const { profiles } = shippingData;
    const ukProfile = profiles.find((profile: any) =>
        profile.countries.some((country: string) => country === "GB"),
    );
    const ukFirstItem = ukProfile.first_item;
    const costInCents = ukFirstItem.cost;

    if (ukFirstItem.currency !== "USD") {
        console.error({ shippingData, ukProfile, ukFirstItem, costInCents });
        throw new Error("Something wrong");
    }

    return costInCents;
}
