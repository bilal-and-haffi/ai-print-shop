import { getShippingData } from "./getShippingData";

export async function getUkShippingCostInCents({
    blueprint_id,
    print_provider_id,
}: {
    blueprint_id: number;
    print_provider_id: number;
}) {
    const shippingData = await getShippingData({
        blueprint_id,
        print_provider_id,
    });
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
